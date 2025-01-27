const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const { sendOtpEmail } = require("./mailer"); // Adjust path if necessary

// MongoDB Connection URI
const uri = "mongodb://localhost:27017";

// POST route for sending OTP
router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
    const db = client.db("project");
    const collection = db.collection("registration");

    const user = await collection.findOne({ email });

    if (!user) {
      client.close();
      return res.status(404).json({ message: "User not found." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    console.log("Generated OTP:", otp, "for email:", email);

    await collection.updateOne({ email }, { $set: { otp, otpCreatedAt: new Date() } });

    await sendOtpEmail(email, otp);

    client.close();

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

    const user = await collection.findOne({ email });

    if (!user) {
      client.close();
      console.log("User not found:", email);
      return res.status(404).send({ message: "User not found." });
    }

    // Debug logs for validation
    console.log("Stored OTP:", user.otp, "Entered OTP:", otp);
    console.log("Stored OTP (trimmed):", user.otp.trim());
console.log("Entered OTP (trimmed):", otp.trim());
    if (user.otp.trim() !== otp.trim()) {
      client.close();
      console.log("OTP mismatch for email:", email);
      return res.status(400).send({ message: "Invalid OTP. Please try again." });
    }

    const otpAge = (new Date() - new Date(user.otpCreatedAt)) / 60000; // Calculate OTP age in minutes
    console.log("OTP Age (in minutes):", otpAge);

    if (otpAge > 10) {
      client.close();
      return res.status(400).send({ message: "OTP expired. Please request a new one." });
    }

    client.close();
    console.log("OTP validated successfully for email:", email);
    return res.status(200).send({ message: "OTP validated successfully." });
  } catch (err) {
    console.error("Error during OTP validation:", err);
    res.status(500).send({ message: "Failed to validate OTP." });
  }
});

// POST route for resetting the password
router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).send({ message: "Email and new password are required." });
  }

  try {
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
    const db = client.db("project");
    const collection = db.collection("registration");

    const user = await collection.findOne({ email });

    if (!user) {
      client.close();
      return res.status(404).send({ message: "User not found." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await collection.updateOne({ email }, { $set: { password: hashedPassword, otp: null, otpCreatedAt: null } });

    client.close();
    res.status(200).send({ message: "Password reset successfully." });
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).send({ message: "Failed to reset password." });
  }
});

module.exports = router;
