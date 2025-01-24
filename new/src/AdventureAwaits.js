// AdventureAwaits.js
import React from "react";
import "./AdventureAwaits.css";

const adventures = [
  { name: "Skydiving", description: "Feel the rush of adrenaline as you jump from 10,000 feet." },
  { name: "Mountain Climbing", description: "Scale the heights of the world's highest mountains." },
  { name: "Whitewater Rafting", description: "Navigate through the wild rapids of the world's most challenging rivers." },
];

function AdventureAwaits() {
  return (
    <div className="adventure-awaits">
      <h2>Adventure Awaits</h2>
      <div className="adventure-cards">
        {adventures.map((adventure, index) => (
          <div key={index} className="adventure-card">
            <h3>{adventure.name}</h3>
            <p>{adventure.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdventureAwaits;
