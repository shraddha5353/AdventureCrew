import React, { useState } from 'react';
import './ChatBox.css';

const Delhichatbox = () => {
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
    '5-Star': [
      'The Oberoi, New Delhi',
      'Taj Mahal Hotel, New Delhi',
      'The Leela Palace, New Delhi',
    ],
    '4-Star': [
      'Radisson Blu, Dwarka',
      'The Claridges, New Delhi',
      'WelcomHotel Sheraton, Saket',
    ],
    '3-Star': [
      'Hotel City Star, Paharganj',
      'The Park Inn, Karol Bagh',
      'Bloomrooms, Janpath',
    ],
    '1-Bedroom Accommodation': [
      'OYO Townhouse 77, Saket',
      'FabHotel Ashirwad Residency, Connaught Place',
    ],
    '2-Bedroom Accommodation': [
      'The Lodhi, New Delhi',
      'ITC Maurya, Chanakyapuri',
    ],
    'Most Famous': [
      'Akshardham Temple',
      'Lotus Temple',
    ],
    Oldest: [
      'Jama Masjid',
      'Humayun’s Tomb',
    ],
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

export default Delhichatbox;

