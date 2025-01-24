import React, { useState } from 'react';
import './ChatBox.css';

const Parischatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', text: 'Hi! How may I help you with Delhi today?' },
  ]);
  const [currentStep, setCurrentStep] = useState('main');

  const mainOptions = ['Restaurants', 'Hotels', 'Pilgrims'];
  const subOptions = {
    Restaurants: ['5-Star', '4-Star', '3-Star'],
    Hotels: ['1-Bedroom Accommodation', '2-Bedroom Accommodation'],
    Pilgrims: ['Most Famous', 'Oldest'],
  };
  const suggestions = {
    '5-Star': ['Le Meurice', 'Four Seasons Hotel George V', 'Ritz Paris'],
    '4-Star': ['Hotel La Comtesse', 'Maison Mère', 'Hotel Les Matins de Paris'],
    '3-Star': ['Hotel du Mont Blanc', 'Hotel Luxia', 'Hotel des Arts'],
    '1-Bedroom Accommodation': [
      'Airbnb near Eiffel Tower',
      'Côté Cour Apartment, Marais',
    ],
    '2-Bedroom Accommodation': [
      'Luxury Stay in Champs-Élysées',
      'Seine River Apartment, Notre Dame',
    ],
    'Most Famous': ['Notre Dame Cathedral', 'Sacré-Cœur Basilica'],
    Oldest: ['Saint-Germain-des-Prés Abbey', 'Pantheon, Paris'],
  };
  

  const handleOptionClick = (option) => {
    if (currentStep === 'main') {
      setChatHistory((prev) => [
        ...prev,
        { type: 'user', text: option },
        { type: 'bot', text: `Here are the options for ${option}: ` },
      ]);
      setCurrentStep(option);
    } else if (subOptions[currentStep].includes(option)) {
      setChatHistory((prev) => [
        ...prev,
        { type: 'user', text: option },
        { type: 'bot', text: `Here are some suggestions for ${option}:` },
        ...suggestions[option].map((item) => ({ type: 'bot', text: `- ${item}` })),
        { type: 'bot', text: 'You can now return to the main menu or explore more options.' },
      ]);
      setCurrentStep('main');
    }
  };

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

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chat-box-container">
      {!isOpen ? (
        <button className="chat-box-link" onClick={toggleChatBox}>
          Chat with us
        </button>
      ) : (
        <div className="chat-box">
          <div className="chat-box-header">
            <span>Chat with us</span>
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
          <div className="chat-box-options">{renderOptions()}</div>
        </div>
      )}
    </div>
  );
};

export default Parischatbox;
