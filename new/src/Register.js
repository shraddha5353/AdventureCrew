import axios from "axios";
import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Register.css";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      message: "", // For success or error message
      messageType: "", // "success" or "error"
      redirectToLogin: false,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { fullName, email, phoneNumber, password, confirmPassword } = this.state;

    try {
      const response = await axios.post("http://localhost:3001/register", {
        fullName,
        email,
        phoneNumber,
        password,
        confirmPassword,
      });

      // Show success message and prepare for redirection
      this.setState({
        message: "Registration successful! Redirecting to login...",
        messageType: "success",
        redirectToLogin: true,
      });

      // Simulate a delay before redirection
      setTimeout(() => {
        this.setState({ redirectToLogin: true });
      }, 2000); // 2 seconds
    } catch (error) {
      this.setState({
        message: error.response?.data?.message || "Failed to register user.",
        messageType: "error",
      });
    }
  };

  render() {
    if (this.state.redirectToLogin) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="register-container">
        {/* Video Background */}
        <video className="video-background" autoPlay loop muted>
          <source src="/videos/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="form-card">
          <h1>Welcome to TravelMate</h1>
          <p>Create your account and start your journey!</p>

          {/* Message Box */}
          {this.state.message && (
            <div
              className={`message-box ${this.state.messageType}`}
              role="alert"
            >
              {this.state.message}
            </div>
          )}

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={this.state.fullName}
                onChange={this.handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="Create a password"
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
            <button type="submit" className="register-btn">
              Register
            </button>
          </form>

          <p className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    );
  }
}
