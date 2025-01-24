import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './Place.css'; // Importing the CSS file for styling

const Place = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  // Function to handle Explore button click and navigate to the respective page
  const handleExplore = (place) => {
    if (place === "Tamil Nadu") {
      navigate('/tamilnadu'); // Navigate to Tamil Nadu page
    } else if (place === "Delhi") {
      navigate('/delhi'); // Navigate to Delhi page
    } else if (place === "Paris") {
      navigate('/paris'); // Navigate to Paris page
    }
  };

  return (
    <div className="place-container">
      <h1>Explore the Beautiful Places</h1>
      <div className="stat-cards">
        <div className="card">
          <img 
            src="https://tripsonwheels.com/wp-content/uploads/2018/08/famoustemple.jpg" 
            alt="Tamil Nadu" 
            className="card-image" 
          />
          <h2>Tamil Nadu</h2>
          <p>Famous for its rich culture, temples, and scenic beauty.</p>
          <button 
            className="explore-button" 
            onClick={() => handleExplore("Tamil Nadu")}
          >
            Explore
          </button>
        </div>

        <div className="card">
          <img 
            src="https://www.mistay.in/travel-blog/content/images/2020/07/travel-4813658_1920.jpg" 
            alt="Delhi" 
            className="card-image" 
          />
          <h2>Delhi</h2>
          <p>Known for its rich history, monuments, and vibrant culture.</p>
          <button 
            className="explore-button" 
            onClick={() => handleExplore("Delhi")}
          >
            Explore
          </button>
        </div>

        <div className="card">
          <img 
            src="https://media.timeout.com/images/105473116/image.jpg" 
            alt="Paris" 
            className="card-image" 
          />
          <h2>Paris</h2>
          <p>Home to iconic landmarks like the Eiffel Tower, rich art, and romance.</p>
          <button 
            className="explore-button" 
            onClick={() => handleExplore("Paris")}
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default Place;

