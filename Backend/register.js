const express = require("express");
const bcrypt = require("bcryptjs"); // Import bcryptjs for password hashing
const router = express.Router();
const { MongoClient } = require("mongodb");
const { sendConfirmationEmail } = require("./mailer");

// MongoDB Connection URI
const uri ="mongodb+srv://shraddhadeshpande64:Rani%406565@cluster0.6cqi0.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster0";


// Password validation function
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Phone number validation function
const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\d{10}$/; // Matches exactly 10 digits
  return phoneRegex.test(phoneNumber);
};

// POST route for registering a user
router.post("/", async (req, res) => {
  const { fullName, email, phoneNumber, password, confirmPassword } = req.body;

  // Basic validation
  if (!fullName || !email || !phoneNumber || !password || !confirmPassword) {
    return res.status(400).send({ message: "All fields are required." });
  }
  if (!validatePhoneNumber(phoneNumber)) {
    return res.status(400).send({ message: "Phone number must be exactly 10 digits." });
  }
  if (password !== confirmPassword) {
    return res.status(400).send({ message: "Passwords do not match." });
  }

  // Validate password constraints
  if (!validatePassword(password)) {
    return res.status(400).send({
      message:
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
    const db = client.db("project");
    const collection = db.collection("registration");

    // Check if user with the email already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      client.close();
      return res.status(400).send({ message: "Email is already registered." });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds for bcrypt

    // Insert new user with hashed password
    const newUser = {
      fullName,
      email,
      phoneNumber,
      password: hashedPassword, // Store the hashed password
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await collection.insertOne(newUser);
    client.close();

    // Send confirmation email
    await sendConfirmationEmail(newUser.email, newUser.fullName);

    // Send success response
    res.status(201).send({ message: "Registration successful." });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).send({ message: "Failed to register user." });
  }
});

module.exports = router;
