import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DocumentCreator from '../DocumentCreator/DocumentCreator';
import TemplateGenerator from '../TemplateGenerator/TemplateGenerator';
import EmailSender from '../EmailSender/EmailSender';
import UGCChatbot from '../UGCChatbot/UGCChatbot';
import NegotiationAssistant from '../NegotiationAssistant/NegotiationAssistant';
import RateCalculator from '../RateCalculator/RateCalculator';
import './Tools.css';

// Define tool configurations including emojis and titles
const toolConfig = [
  { key: 'creator', emoji: '📄', title: 'Document Creator', component: DocumentCreator },
  { key: 'generator', emoji: '✨', title: 'Template Generator', component: TemplateGenerator },
  { key: 'emailer', emoji: '📧', title: 'Email Sender', component: EmailSender },
  { key: 'chatbot', emoji: '🤖', title: 'UGC Assistant', component: UGCChatbot },
  { key: 'negotiation', emoji: '🤝', title: 'Negotiation Assistant', component: NegotiationAssistant },
  { key: 'calculator', emoji: '🧮', title: 'Rate Calculator', component: RateCalculator },
];

const Tools = () => {
  // Set the default active tab, e.g., the first tool
  const [activeTab, setActiveTab] = useState(toolConfig[0].key);

  // Find the component to render based on the activeTab
  const ActiveComponent = toolConfig.find(tool => tool.key === activeTab)?.component;

  return (
    <motion.div
      className="tools-layout-container" // Renamed for clarity
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Vertical Sidebar */}
      <nav className="tools-sidebar">
        {toolConfig.map((tool) => (
          <button
            key={tool.key}
            className={`sidebar-icon ${activeTab === tool.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tool.key)}
            title={tool.title} // Use title attribute for basic tooltip
            aria-label={tool.title} // For accessibility
          >
            {tool.emoji}
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <div className="tools-content-area">
        {/* Render the active component */}
        {ActiveComponent && <ActiveComponent />}
        {!ActiveComponent && (
            <div className="tool-pane-placeholder">
                 <h2>Select a tool</h2>
                 <p>Choose a tool from the sidebar to get started.</p>
             </div>
        )}
      </div>
    </motion.div>
  );
};

export default Tools; 