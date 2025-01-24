// src/DelhiPage.js
import React from 'react';
import './DelhiPage.css'; // Import the CSS file
import ChatBoxDelhi from './ChatBoxDelhi'; // Import the ChatBox component

const DelhiPage = () => {
  const handleBookNowClick = () => {
    console.log('Booking initiated. Redirecting to payment gateway...');
    window.location.href = '/payment'; // Redirect to the payment page
  };

  return (
    <div className="delhi-page">
      <div className="explore-delhi-container">
        <h1>Explore Delhi</h1>
        <p>
          Delhi, the capital of India, is a vibrant city known for its blend of history and modernity. The city is famous for its grand architecture,
          such as the Red Fort, Qutub Minar, and Humayun’s Tomb. A visit to Delhi offers an experience of diverse cultures, bustling markets, and
          a fascinating history that spans centuries.
        </p>

        <div className="local-cuisine">
          <h2>Experience Delhi's Cuisine</h2>
          <p>
            Delhi is known for its street food and diverse culinary offerings, including chaat, butter chicken, kebabs, and much more. The food scene
            here is a true reflection of the city's rich cultural heritage.
          </p>
        </div>

        <div className="guide-section">
          <h2>Book a Local Guide</h2>
          <div className="guide-card">
            <h3>Guide Name: Mr. Raj</h3>
            <p>Fee: ₹3500 Per Day</p>
            <button className="book-now-button" onClick={handleBookNowClick}>
              Book Now
            </button>
          </div>
        </div>

        <ChatBoxDelhi />
      </div>
    </div>
  );
};

export default DelhiPage;