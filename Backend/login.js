const express = require("express");
const bcrypt = require("bcryptjs"); // Import bcryptjs for password hashing comparison
const router = express.Router();
const { MongoClient } = require("mongodb");

// MongoDB Connection URI
const uri = "mongodb://localhost:27017";

// POST route for logging in a user
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required." });
  }

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
    const db = client.db("project"); // Replace "project" with your database name
    const collection = db.collection("registration"); // Replace "registration" with your collection name

    // Check if user exists
    const existingUser = await collection.findOne({ email });

    if (!existingUser) {
      client.close();
      return res.status(404).send({ message: "User does not exist. Please register first." });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, existingUser.password); // bcrypt comparison

    if (!isMatch) {
      client.close();
      return res.status(401).send({ message: "Invalid password." });
    }

    client.close();

    // Successful login
    res.status(200).send({
      message: "Login successful.",
      user: {
        id: existingUser._id,
        fullName: existingUser.fullName,
        email: existingUser.email,
        phoneNumber: existingUser.phoneNumber,
      },
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send({ message: "Internal server error." });
  }
});

module.exports = router;
