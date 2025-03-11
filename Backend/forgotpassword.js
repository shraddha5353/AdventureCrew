const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const { sendOtpEmail } = require("./mailer"); // Adjust path if necessary

// MongoDB Connection URI
const uri = "mongodb+srv://shraddhadeshpande64:Rani%406565@cluster0.6cqi0.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster0";


// POST route for sending OTP
router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
    const db = client.db("project"); // Replace "project" with your database name
    const collection = db.collection("registration"); // Replace "registration" with your collection name

    // Find user by email
    const user = await collection.findOne({ email });

    if (!user) {
      client.close();
      return res.status(404).json({ message: "User not found." });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP:", otp, "for email:", email);

    // Store OTP in the database
    await collection.updateOne({ email }, { $set: { otp, otpCreatedAt: new Date() } });

    // Send OTP email
    await sendOtpEmail(email, otp);

    client.close();

    // Respond with success message
    res.status(200).json({ message: "OTP sent successfully." });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ message: "Failed to send OTP." });
  }
});

// POST route for validating OTP
router.post("/validate-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).send({ message: "Email and OTP are required." });
  }

  try {
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
    const db = client.db("project");
    const collection = db.collection("registration");

    // Check if the user exists and OTP matches
    const user = await collection.findOne({ email });

    if (!user) {
      client.close();
      return res.status(404).send({ message: "User not found." });
    }

    if (user.otp !== otp) {
      client.close();
      return res.status(400).send({ message: "Invalid OTP." });
    }

    // Check if OTP is expired (valid for 10 minutes)
    const otpAge = (new Date() - new Date(user.otpCreatedAt)) / 60000; // In minutes
    if (otpAge > 10) {
      client.close();
      return res.status(400).send({ message: "OTP expired. Please request a new one." });
    }

    client.close();
    res.status(200).send({ message: "OTP validated successfully." });
  } catch (err) {
    console.error("Error validating OTP:", err);
    res.status(500).send({ message: "Failed to validate OTP." });
  }
});

// POST route for resetting the password
router.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).send({ message: "All fields are required." });
  }

  try {
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
    const db = client.db("project");
    const collection = db.collection("registration");

    // Find user by email and check OTP
    const user = await collection.findOne({ email });

    if (!user) {
      client.close();
      return res.status(404).send({ message: "User not found." });
    }

    if (user.otp !== otp) {
      client.close();
      return res.status(400).send({ message: "Invalid OTP." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    await collection.updateOne(
      { email },
      { $set: { password: hashedPassword }, $unset: { otp: "" } } // Optionally remove OTP after use
    );

    client.close();
    return res.status(200).send({ message: "Password reset successful." });
  } catch (err) {
    console.error("Error during password reset:", err);
    res.status(500).send({ message: "Failed to reset password." });
  }
});

module.exports = router;
