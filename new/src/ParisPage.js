// src/ParisPage.js
import React from 'react';
import './ParisPage.css'; // Import the CSS file
import ChatBoxParis from './ChatBoxParis'; // Import the ChatBoxParis component

const ParisPage = () => {
  const handleBookNowClick = () => {
    console.log('Booking initiated. Redirecting to payment gateway...');
    window.location.href = '/payment'; // Redirect to the payment page
  };

  return (
    <div className="explore-paris-container">
      <div className="explore-paris-content">
        <h1>Explore Paris</h1>
        <p>
          Paris, the capital of France, is one of the most iconic cities in the world. Known for its landmarks like the Eiffel Tower, 
          the Louvre Museum, and the Notre-Dame Cathedral, Paris offers a mix of art, culture, history, and exceptional cuisine.
        </p>

        <div className="local-cuisine">
          <h2>Experience Paris' Cuisine</h2>
          <p>
            Paris is a haven for food lovers, with classic French dishes like croissants, escargot, coq au vin, and crème brûlée. The city 
            is also famous for its cafés and patisseries.
          </p>
        </div>

        <div className="guide-section">
          <h2>Book a Local Guide</h2>
          <div className="guide-card">
            <h3>Guide Name: Mme. Sophie</h3>
            <p>Fee: €100 Per Day</p>
            <button className="book-now-button" onClick={handleBookNowClick}>
              Book Now
            </button>
          </div>
        </div>

        <ChatBoxParis />
      </div>
    </div>
  );
};

export default ParisPage;