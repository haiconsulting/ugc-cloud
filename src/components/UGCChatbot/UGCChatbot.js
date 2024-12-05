import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { chatbotService } from '../../services/chatbotService';
import './UGCChatbot.css';

const UGCChatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your UGC Assistant. I can help you with content creation, strategy, and best practices. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatbotService.sendMessage(input, messages);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response
      }]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getSuggestions = () => [
    "How do I price my UGC?",
    "What equipment do I need to start?",
    "Tips for negotiating with brands",
    "Best practices for TikTok UGC",
    "How to create a UGC portfolio"
  ];

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  return (
    <motion.div
      className="chatbot-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="chat-messages">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              className={`message ${message.role}`}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              {message.role === 'assistant' && (
                <div className="assistant-avatar">
                  🤖
                </div>
              )}
              <div className="message-content">
                {message.role === 'assistant' ? (
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                ) : (
                  message.content
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              className="message assistant"
              variants={messageVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="assistant-avatar">
                🤖
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="suggestions">
        {input === '' && (
          <div className="suggestions-grid">
            {getSuggestions().map((suggestion, index) => (
              <motion.button
                key={index}
                className="suggestion-btn"
                onClick={() => handleSuggestionClick(suggestion)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="chat-input-form">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about UGC..."
          disabled={isLoading}
          rows="1"
          className="chat-input"
        />
        <motion.button
          type="submit"
          disabled={!input.trim() || isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send
        </motion.button>
      </form>
    </motion.div>
  );
};

export default UGCChatbot; 