import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import OtpSent from "./OtpSent";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Booking from "./Booking";
import Contact from "./Contact";
import Settings from "./Settings";
import Place from "./Place";
import TamiNaduPage from "./TamiNaduPage";
import DelhiPage from "./DelhiPage";
import ParisPage from "./ParisPage";
import Payment from "./Payment";
import AdventureAwaits from "./AdventureAwaits"; // Import the Payment component
import GuidedTours from "./GuidedTours"; 
import TopDestinations from "./TopDestinations"; 

import "./App.css";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authToken"); // Check authentication
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const Layout = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  return (
    <>
      {/* Navbar only renders once here */}
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="layout">
        <Sidebar isVisible={isSidebarVisible} closeSidebar={closeSidebar} />
        {isSidebarVisible && (
          <div
            className={`overlay ${isSidebarVisible ? "visible" : ""}`}
            onClick={closeSidebar}
          ></div>
        )}
        <main className="main-content">{children}</main>
      </div>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp-sent" element={<OtpSent />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/place"
            element={
              <ProtectedRoute>
                <Layout>
                  <Place />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Layout>
                  <Booking />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Layout>
                  <Contact />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Layout>
                  <Payment /> {/* Payment component inside protected layout */}
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Place Pages */}
          <Route path="/tamilnadu" element={<TamiNaduPage />} />
          <Route path="/delhi" element={<DelhiPage />} />
          <Route path="/paris" element={<ParisPage />} />
          {/* Destination Pages */}
          <Route path="/top-destinations" element={<TopDestinations />} />
          <Route path="/guided-tours" element={<GuidedTours />} />
          <Route path="/adventure-awaits" element={<AdventureAwaits />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
