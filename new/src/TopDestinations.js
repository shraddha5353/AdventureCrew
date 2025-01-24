// TopDestinations.js
import React from "react";
import "./TopDestinations.css";

const TopDestinations = () => {
  return (
    <section className="top-destinations">
      <h2>Top Destinations</h2>
      <div className="destination-cards">
        <div className="destination-card">
          <img src="https://wallpaperaccess.com/full/504997.jpg" alt="Tamilnadu" />
          <h3>Tamilnadu</h3>
          <p>A place full of rich culture and scenic beauty.</p>
        </div>
        <div className="destination-card">
          <img src="http://wallpapercave.com/wp/wp1891587.jpg" alt="Delhi" />
          <h3>Delhi</h3>
          <p>The vibrant capital of India.</p>
        </div>
        <div className="destination-card">
          <img src="https://wallpaperaccess.com/full/51375.jpg" alt="Paris" />
          <h3>Paris</h3>
          <p>The city of lights and love.</p>
        </div>
        {/* You can add more destinations below */}
        <div className="destination-card">
          <img src="https://tse4.mm.bing.net/th?id=OIP.44obXX9WlCtibQLAuUhnBQHaEo&pid=Api&P=0&h=180" alt="London" />
          <h3>London</h3>
          <p>Famous for its culture, history, and landmarks.</p>
        </div>
        <div className="destination-card">
          <img src="https://tse2.mm.bing.net/th?id=OIP.pxHOXzs6JmqEFKSMkgPjuwHaEK&pid=Api&P=0&h=180" alt="New York" />
          <h3>New York</h3>
          <p>The city that never sleeps, with endless possibilities.</p>
        </div>
      </div>
    </section>
  );
};

export default TopDestinations;
