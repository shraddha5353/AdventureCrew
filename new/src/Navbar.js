import React from "react";
import "./Navbar.css";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <h1>AdventureCrew</h1>
    </nav>
  );
};

export default Navbar;

