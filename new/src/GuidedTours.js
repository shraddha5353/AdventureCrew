// GuidedTours.js
import React from "react";
import "./GuidedTours.css";

const tours = [
  { name: "Himalayan Trek", description: "A challenging trek through the majestic Himalayas with expert guides." },
  { name: "Amazon Rainforest", description: "Explore the lush Amazon with experienced naturalists guiding you." },
  { name: "Swiss Alps", description: "Hike the breathtaking Swiss Alps with professional guides and breathtaking views." },
];

function GuidedTours() {
  return (
    <div className="guided-tours">
      <h2>Guided Tours</h2>
      <div className="tour-cards">
        {tours.map((tour, index) => (
          <div key={index} className="tour-card">
            <h3>{tour.name}</h3>
            <p>{tour.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GuidedTours;
