import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isVisible, closeSidebar }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle logout functionality
  const handleLogout = () => {
    // Clear user data (e.g., remove token from local storage or reset state)
    localStorage.removeItem("userToken"); // Example of clearing token

    // Navigate to the home page
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className={`sidebar ${isVisible ? "visible" : ""}`}>
      <ul>
        <li>
          <Link to="/dashboard" onClick={closeSidebar}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/booking" onClick={closeSidebar}>
            Bookings
          </Link>
        </li>
        <li>
          <Link to="/settings" onClick={closeSidebar}>
            Settings
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={closeSidebar}>
            Contact Us
          </Link>
        </li>
        {/* Logout Link */}
        <li>
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault(); // Prevent default navigation
              handleLogout(); // Call logout logic
              closeSidebar(); // Close the sidebar
            }}
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
