import React, { useState, useEffect, useRef } from 'react';
import './DiabetesChatbot.css';

const DiabetesChatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your Diabetes Care Assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Knowledge base for the chatbot
  const knowledgeBase = {
    greetings: ["hi", "hello", "hey"],
    bloodSugar: ["blood sugar", "glucose", "hypoglycemia", "hyperglycemia"],
    diet: ["diet", "eat", "food", "nutrition", "carbs", "carbohydrates"],
    exercise: ["exercise", "workout", "physical activity"],
    medication: ["medication", "insulin", "metformin", "pills"],
    symptoms: ["symptoms", "feel dizzy", "thirsty", "urinate"],
    emergency: ["emergency", "help", "urgent", "feel bad"],
    reminders: ["reminder", "remind", "schedule"]
  };

  const botResponses = {
    greetings: "Hello! How can I assist you with your diabetes management today?",
    bloodSugar: "Managing blood sugar levels is crucial. The normal range is typically 80-130 mg/dL before meals and <180 mg/dL after meals. Always consult your doctor for personalized targets.",
    diet: "A balanced diet for diabetes includes vegetables, whole grains, lean proteins, and healthy fats. Limit sugary foods and refined carbs. Consider speaking with a dietitian for a personalized meal plan.",
    exercise: "Regular exercise (150 minutes/week of moderate activity) helps control blood sugar. Always check your levels before and after exercise, and keep fast-acting carbs handy.",
    medication: "Always take medications as prescribed. Never skip doses without consulting your doctor. If you're having side effects, contact your healthcare provider.",
    symptoms: "Common diabetes symptoms include increased thirst, frequent urination, fatigue, and blurred vision. If you're experiencing severe symptoms, seek medical attention immediately.",
    emergency: "If you're experiencing confusion, extreme thirst, rapid breathing, or very high/low blood sugar readings that don't improve, seek emergency medical care immediately.",
    reminders: "I can remind you to check your blood sugar, take medication, or schedule doctor appointments. What would you like me to remind you about?",
    default: "I'm sorry, I didn't understand that. Could you rephrase or ask about diabetes management, diet, exercise, medication, or symptoms?"
  };

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle user input
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Process user message and generate bot response
  const getBotResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    for (const [category, keywords] of Object.entries(knowledgeBase)) {
      if (keywords.some(keyword => lowerCaseMessage.includes(keyword))) {
        return botResponses[category];
      }
    }
    
    return botResponses.default;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = { text: getBotResponse(inputValue), sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
    }, 800);
  };

  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      {!isOpen ? (
        <button className="chatbot-button" onClick={toggleChat}>
          <img src="https://cdn-icons-png.flaticon.com/512/2518/2518180.png" alt="Chat" width="40" />
        </button>
      ) : (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Diabetes Care Assistant</h3>
            <button className="close-button" onClick={toggleChat}>×</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="chatbot-input">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your message..."
              autoFocus
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DiabetesChatbot;