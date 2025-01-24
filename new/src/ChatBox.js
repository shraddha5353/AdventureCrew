import React, { useState } from 'react';
import './ChatBox.css';

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track if the chat box is open or not
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', text: 'Hi! How may I help you today?' },
  ]);
  const [currentStep, setCurrentStep] = useState('main'); // Tracks the current step (main, sub-options)

  const mainOptions = ['Restaurants', 'Hotels', 'Pilgrims'];
  const subOptions = {
    Restaurants: ['5-Star', '4-Star', '3-Star'],
    Hotels: ['1-Bedroom Accommodation', '2-Bedroom Accommodation'],
    Pilgrims: ['Most Famous', 'Oldest'],
  };

  const suggestions = {
    '5-Star': [
      'Hotel Taj Coromandel, Chennai',
      'The Leela Palace, Chennai',
      'ITC Grand Chola, Chennai',
    ],
    '4-Star': [
      'GRT Grand, Chennai',
      'The Residency, Coimbatore',
      'Heritage Madurai, Madurai',
    ],
    '3-Star': [
      'Grand Palace Hotel, Yercaud',
      'Hotel Park Plaza, Salem',
      'Hotel Sangam, Thanjavur',
    ],
    '1-Bedroom Accommodation': [
      'OYO 12345 Luxury Rooms, Coimbatore',
      'Treebo Trend Akshaya, Trichy',
      'FabHotel Royal Castle, Erode',
    ],
    '2-Bedroom Accommodation': [
      'MGM Beach Resorts, Chennai',
      'Ideal River View Resort, Thanjavur',
      'Sterling Resorts, Ooty',
    ],
    'Most Famous': [
      'Meenakshi Temple, Madurai',
      'Brihadeeswara Temple, Thanjavur',
    ],
    Oldest: [
      'Shore Temple, Mahabalipuram',
      'Kapaleeshwarar Temple, Chennai',
    ],
  };

  // Handle user selection
  const handleOptionClick = (option) => {
    if (currentStep === 'main') {
      setChatHistory((prev) => [
        ...prev,
        { type: 'user', text: option },
        { type: 'bot', text: `Here are the options for ${option}: `},
      ]);
      setCurrentStep(option);
    } else if (subOptions[currentStep].includes(option)) {
      setChatHistory((prev) => [
        ...prev,
        { type: 'user', text: option },
        { type: 'bot', text:`Here are some suggestions for ${option}:` },
        ...suggestions[option].map((item) => ({ type: 'bot', text: `- ${item}` })),
        { type: 'bot', text: 'You can now return to the main menu or explore more options.' },
      ]);
      setCurrentStep('main');
    }
  };

  // Render options dynamically
  const renderOptions = () => {
    if (currentStep === 'main') {
      return mainOptions.map((option) => (
        <button key={option} className="chat-option-button" onClick={() => handleOptionClick(option)}>
          {option}
        </button>
      ));
    }
    if (subOptions[currentStep]) {
      return subOptions[currentStep].map((option) => (
        <button key={option} className="chat-option-button" onClick={() => handleOptionClick(option)}>
          {option}
        </button>
      ));
    }
    return null;
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
                className={`chat-message ${message.type === 'bot' ? 'bot-message' : 'user-message'}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="chat-box-options">
            {renderOptions()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;














