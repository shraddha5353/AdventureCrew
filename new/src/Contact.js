import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setTimeout(() => {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      }, 1000);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <div className="contact-container">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>We'd love to hear from you! Reach out using the form or contact details below:</p>
          <ul>
            <li>
              <strong>Email:</strong> adventurecrewt5@gmail.com
            </li>
            <li>
              <strong>Phone:</strong> 9346049173
            </li>
            <li>
              <strong>Address:</strong> BVRIT Hyderabad
            </li>
          </ul>
        </div>
        <div className="contact-form">
          <h3>Send Us a Message</h3>
          {isSubmitted ? (
            <div className="success-message">Thank you for your message! We'll get back to you soon.</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message:</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
