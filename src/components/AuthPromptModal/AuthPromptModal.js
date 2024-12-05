import React from 'react';
import { motion } from 'framer-motion';
import './AuthPromptModal.css';

const AuthPromptModal = ({ onClose, onLogin }) => {
  return (
    <div className="auth-prompt-overlay" onClick={onClose}>
      <motion.div 
        className="auth-prompt-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <h2>Join Our Community</h2>
        <p>Please subscribe to access our full range of features:</p>
        <ul>
          <li>Professional UGC creation tools</li>
          <li>Community discussions and networking</li>
          <li>Premium resource library</li>
          <li>Expert support and guidance</li>
        </ul>
        <div className="auth-prompt-buttons">
          <button className="primary-button" onClick={onLogin}>
            Sign In
          </button>
          <button className="secondary-button" onClick={onClose}>
            Maybe Later
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPromptModal; 