import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSaveProfile = () => {
    alert("Profile saved successfully!");
  };

  return (
    <div className="settings">
      <h2>Settings</h2>

      {/* Profile Settings */}
      <div className="settings-section">
        <h3>Profile</h3>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={profile.phone}
            onChange={handleProfileChange}
          />
        </div>
        <button className="save-button" onClick={handleSaveProfile}>
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default Settings;
