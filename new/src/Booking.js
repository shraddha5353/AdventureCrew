import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.css";

const Bookings = () => {
  const navigate = useNavigate();
  const [newBooking, setNewBooking] = useState({
    name: "",
    date: "",
    source: "",
    destination: "",
  });

  const [messages, setMessages] = useState(""); // For success/failure messages
  const [myBookings, setMyBookings] = useState([]); // To display added bookings

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking({ ...newBooking, [name]: value });
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Handle form submission (add booking)
  const handleAddBooking = (e) => {
    e.preventDefault();

    // Save the new booking in local state
    setMyBookings([...myBookings, newBooking]);
    setMessages("Booking added successfully!");

    // Clear the form after submission
    setNewBooking({
      name: "",
      date: "",
      source: "",
      destination: "",
    });
  };

  // Handle booking cancellation
  const handleCancelBooking = (index) => {
    const updatedBookings = myBookings.filter((_, i) => i !== index);
    setMyBookings(updatedBookings);
    setMessages("Booking cancelled successfully!");
  };

  // Button click handlers (navigate to the respective location page)
  const handleLocationClick = (location) => {
    if (location === "Paris") {
      navigate("/paris"); // Navigate to the Paris description page
    } else if (location === "Delhi") {
      navigate("/delhi"); // Navigate to the Delhi description page
    } else if (location === "Tamil Nadu") {
      navigate("/tamilnadu"); // Navigate to the Tamil Nadu description page
    }
  };

  // Add the 'bookings-page' class to the body when this page is active
  useEffect(() => {
    document.body.classList.add("bookings-page");

    // Clean up when the component is unmounted or route changes
    return () => {
      document.body.classList.remove("bookings-page");
    };
  }, []);

  return (
    <div className="bookings">
      <h2>Add a Booking</h2>
      <form onSubmit={handleAddBooking}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newBooking.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="date"
          value={newBooking.date}
          onChange={handleInputChange}
          min={today} // Restrict date to today and future dates
          required
        />
        <input
          type="text"
          name="source"
          placeholder="Source"
          value={newBooking.source}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={newBooking.destination}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Booking</button>
      </form>

      {messages && <p className="message">{messages}</p>}

      <h3>My Bookings</h3>
      {myBookings.length > 0 ? (
        <div className="bookings-list">
          {myBookings.map((booking, index) => (
            <div key={index} className="booking-item">
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Source:</strong> {booking.source}</p>
              <p><strong>Destination:</strong> {booking.destination}</p>
              <button onClick={() => handleCancelBooking(index)}>
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings added yet.</p>
      )}
    </div>
  );
};

export default Bookings;