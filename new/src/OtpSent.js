import React, { useState } from "react";
import axios from "axios";
import "./OtpSent.css"; 
//import "./otp-password-reset.css";// Optional CSS for styling

const OtpSent = () => {
  const [step, setStep] = useState("otp"); // Tracks the current step ("otp" or "password")
  const [email, setEmail] = useState(""); // Stores the user's email
  const [otp, setOtp] = useState(""); // Stores the entered OTP
  const [newPassword, setNewPassword] = useState(""); // Stores the new password
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirms the new password
  const [message, setMessage] = useState(""); // Displays success or error messages

  // Function to validate OTP
  const validateOtp = async () => {
    try {
      const response = await axios.post("http://localhost:3001/forgotpassword/validate-otp", {
        email,
        otp,
      });
      setMessage(response.data.message);
      setStep("password"); // Move to the password reset step
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  // Function to reset the password
  // Function to reset the password
const resetPassword = async () => {
  // Password validation regex (same as the backend)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(newPassword)) {
    setMessage(
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
    return;
  }

  if (newPassword !== confirmPassword) {
    setMessage("Passwords do not match.");
    return;
  }

  try {
    const response = await axios.post("http://localhost:3001/forgotpassword/reset-password", {
      email,
      otp,
      newPassword,
    });
    setMessage(response.data.message);
  } catch (error) {
    setMessage(error.response?.data?.message || "Failed to reset password.");
  }
};


  return (
    <div className="otp-sent-container">
      <h1 className="title">{step === "otp" ? "Validate OTP" : "Reset Password"}</h1>
      {message && <p className="message">{message}</p>}
      
      {step === "otp" ? (
        <div className="otp-validation-form">
          <p className="form-description">Enter the OTP sent to your email:</p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="input-field"
          />
          <button onClick={validateOtp} className="submit-button">Validate OTP</button>
        </div>
      ) : (
        <div className="password-reset-form">
          <p className="form-description">Enter your new password:</p>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-field"
          />
          <button onClick={resetPassword} className="submit-button">Reset Password</button>
        </div>
      )}
    </div>
  );
};
  

export default OtpSent;
