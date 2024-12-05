import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DocumentCreator from '../DocumentCreator/DocumentCreator';
import TemplateGenerator from '../TemplateGenerator/TemplateGenerator';
import EmailSender from '../EmailSender/EmailSender';
import UGCChatbot from '../UGCChatbot/UGCChatbot';
import './Tools.css';

const Tools = () => {
  const [activeTab, setActiveTab] = useState('creator');

  return (
    <motion.div
      className="tools-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="tools-tabs">
        <button
          className={`tab-button ${activeTab === 'creator' ? 'active' : ''}`}
          onClick={() => setActiveTab('creator')}
        >
          Document Creator
        </button>
        <button
          className={`tab-button ${activeTab === 'generator' ? 'active' : ''}`}
          onClick={() => setActiveTab('generator')}
        >
          Template Generator
        </button>
        <button
          className={`tab-button ${activeTab === 'emailer' ? 'active' : ''}`}
          onClick={() => setActiveTab('emailer')}
        >
          Email Sender
        </button>
        <button
          className={`tab-button ${activeTab === 'chatbot' ? 'active' : ''}`}
          onClick={() => setActiveTab('chatbot')}
        >
          UGC Assistant
        </button>
      </div>

      <div className="tools-content">
        {activeTab === 'creator' && <DocumentCreator />}
        {activeTab === 'generator' && <TemplateGenerator />}
        {activeTab === 'emailer' && <EmailSender />}
        {activeTab === 'chatbot' && <UGCChatbot />}
      </div>
    </motion.div>
  );
};

export default Tools; 