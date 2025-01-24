// src/ExploreTamilNadu.js
import React from 'react';
import './TamilNaduPage.css'; // Import Tamil Nadu-specific styles
import ChatBox from './ChatBox'; // Import the ChatBox component

const TamilNaduPage = () => {
  const handleBookNowClick = () => {
    console.log('Booking initiated. Redirecting to payment gateway...');
    window.location.href = '/payment'; // Redirect to the payment page
  };

  return (
    <div className="tamilnadu-page">
      <div className="explore-tamilnadu-container">
        <h1>Explore Tamil Nadu</h1>
        <p>
          Tamil Nadu, located in the southern part of India, is famous for its ancient temples, rich culture, and beautiful landscapes.
          Known for its Dravidian architecture, temples like the Meenakshi Temple in Madurai, and the vibrant culture that spans centuries,
          Tamil Nadu is a must-visit destination.
        </p>
        <div className="local-cuisine">
          <h2>Experience Tamil Nadu's Cuisine</h2>
          <p>
            Tamil Nadu offers a wide variety of traditional dishes, including dosas, idlis, sambars, and more. The cuisine is characterized
            by its use of rice, lentils, and an assortment of spices.
          </p>
        </div>
        <div className="guide-section">
          <h2>Book a Local Guide</h2>
          <div className="guide-card">
            <h3>Guide Name: Mr. Arvind</h3>
            <p>Fee: ₹3500 Per Day</p>
            <button className="book-now-button" onClick={handleBookNowClick}>
              Book Now
            </button>
          </div>
        </div>
        <ChatBox />
      </div>
    </div>
  );
};

export default TamilNaduPage;