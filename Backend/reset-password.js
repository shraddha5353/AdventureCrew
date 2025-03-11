const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://shraddhadeshpande64:Rani%406565@cluster0.6cqi0.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster0";


// Password validation function
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

router.post("/forgotpassword/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).send({ message: "All fields are required." });
  }

  // Validate password constraints
  if (!validatePassword(newPassword)) {
    return res.status(400).send({
      message:
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
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
