import React, { useState } from 'react';
import './NegotiationAssistant.css';
import UgcRateCalculator from './UgcRateCalculator';

const NegotiationAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    // --- Placeholder for API call ---
    // TODO: Replace with actual API call to OpenAI Assistant
    const assistantResponse = { sender: 'assistant', text: `Thinking about: ${input}` }; 
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500)); 
    setMessages(prevMessages => [...prevMessages, assistantResponse]);
    // --- End Placeholder ---

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="negotiation-assistant">
      <h2>Negotiation Assistant</h2>
      <p>Welcome to the Negotiation Assistant! This tool helps you prepare for and navigate negotiations with creators and brands.</p>
      
      <div className="negotiation-features">
        <div className="feature-card">
          <UgcRateCalculator />
        </div>
        
        <div className="feature-card">
          <h3>Script Templates</h3>
          <p>Access template scripts for common negotiation scenarios.</p>
        </div>
        
        <div className="feature-card">
          <h3>Contract Tips</h3>
          <p>Get advice on terms to include or avoid in your contracts.</p>
        </div>
      </div>

      <div className="chat-interface">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="chat-input-area">
          <textarea
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask the negotiation assistant..."
            rows="3"
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default NegotiationAssistant; 