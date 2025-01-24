import React, { useState } from "react";
import Sidebar from "./Sidebar"; // Import Sidebar
import Place from "./Place"; // Import Place Component
import "./App.css"; // Or any other relevant CSS file

const Dashboard = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false); // State to track sidebar visibility

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible((prevState) => !prevState);
  };

  // Function to close the sidebar when a link is clicked
  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <div className="dashboard">
      {/* Sidebar only */}
      <Sidebar isVisible={isSidebarVisible} closeSidebar={closeSidebar} />

      {/* Place component goes here */}
      <div className="content">
        <Place /> {/* Render the Place component */}
      </div>
    </div>
  );
};

export default Dashboard;
