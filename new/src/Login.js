import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State for success/error message
  const [isError, setIsError] = useState(false); // State to track if it's an error message
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      if (response.data.message === "Login successful.") {
        setIsError(false); // Indicate it's a success message
        setMessage(response.data.message);

        // Save user details to localStorage or session storage
        localStorage.setItem("authToken", response.data.token); // Assuming API sends a token
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect to dashboard after a short delay
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setIsError(true); // Indicate it's an error message
        setMessage(response.data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      setIsError(true); // Indicate it's an error message
      setMessage(error.response?.data?.message || "Failed to log in.");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setIsError(true);
      setMessage("Please enter your email before requesting an OTP.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/forgotpassword", { email });
      setIsError(false); // Indicate it's a success message
      setMessage(response.data.message || "OTP sent to your email.");
      navigate("/otp-sent"); // Redirect to the OTP Sent page
    } catch (error) {
      setIsError(true); // Indicate it's an error message
      setMessage(error.response?.data?.message || "Failed to send OTP.");
    }
  };

  return (
    <div className="login-container">
      {/* Video Background */}
      <video className="video-background" autoPlay loop muted>
        <source src="/videos/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="form-card">
        <h1>Welcome Back to TravelMate</h1>
        <p>Login to continue your journey!</p>
        {message && (
          <div className={`message ${isError ? "error" : "success"}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>

        <p className="forgot-password-link">
          <button onClick={handleForgotPassword}>Forgot Password?</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
