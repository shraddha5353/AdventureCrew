import React, { useState } from "react";
import "./ChatBox.css";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { type: "bot", text: "Hi! How may I assist you today?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle sending messages to the backend with location context
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
  
    const userMessage = { type: "user", text: userInput };
    setChatHistory((prev) => [...prev, userMessage]);
    setUserInput("");
    setLoading(true);
  
    // Dynamically get the location (hardcoded for now, can be set dynamically)
    const currentLocation = "Delhi";
  
    try {
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput, location: currentLocation }),
      });
  
      const data = await response.json();
      console.log("💬 AI Response:", data); // Debugging to check response
  
      setChatHistory((prev) => [
        ...prev,
        { type: "bot", text: data.reply || `Sorry, I couldn't find information on ${currentLocation}.` },
      ]);
    } catch (error) {
      console.error("🚨 Error communicating with AI:", error);
      setChatHistory((prev) => [...prev, { type: "bot", text: "Error processing request." }]);
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle chat box visibility
  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chat-box-container">
      {!isOpen ? (
        <button className="chat-box-link" onClick={toggleChatBox}>
          Chat with Us
        </button>
      ) : (
        <div className="chat-box">
          <div className="chat-box-header">
            <span>Chat with Us</span>
            <button onClick={toggleChatBox}>X</button>
          </div>
          <div className="chat-box-history">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.type === "bot" ? "bot-message" : "user-message"}`}
              >
                {message.text}
              </div>
            ))}
            {loading && <div className="bot-message">Thinking...</div>}
          </div>
          <div className="chat-box-input">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
