import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleCardClick = (destination) => {
    navigate(destination);  // Navigate to the selected destination
  };

  return (
    <div className="App">
      {/* Navbar */}
      <header className="nav">
        <div className="brand-logo">Explore Treks</div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Embark on Your Next Adventure</h1>
          <p>Discover the best treks and travel destinations around the world.</p>
          <button className="btn" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div
          className="feature"
          onClick={() => handleCardClick("/top-destinations")} // Navigate to Top Destinations
        >
          <img
            src="https://img.icons8.com/ios-filled/100/0077b6/map.png"
            alt="Top Destinations Icon"
          />
          <h3>Top Destinations</h3>
          <p>Handpicked spots that offer unforgettable experiences.</p>
        </div>

        <div
          className="feature"
          onClick={() => handleCardClick("/guided-tours")} // Navigate to Guided Tours
        >
          <img
            src="https://img.icons8.com/ios-filled/100/0077b6/compass.png"
            alt="Guided Tours Icon"
          />
          <h3>Guided Tours</h3>
          <p>Expert guides to make your journey hassle-free.</p>
        </div>

        <div
          className="feature"
          onClick={() => handleCardClick("/adventure-awaits")} // Navigate to Adventure Awaits
        >
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.tHhd34qaX3bjj2_lK3ILywAAAA&pid=Api&P=0&h=180"
            alt="Adventure Awaits Icon"
          />
          <h3>Adventure Awaits</h3>
          <p>Thrilling activities for adrenaline junkies.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        &copy; 2024 Explore Treks | Built with ❤️ for adventure lovers. <br />
        <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
      </footer>
    </div>
  );
};

export default Home;
