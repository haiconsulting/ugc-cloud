import React from 'react';
import './NegotiationAssistant.css';

const NegotiationAssistant = () => {
  return (
    <div className="negotiation-assistant">
      <h2>Negotiation Assistant</h2>
      <p>Welcome to the Negotiation Assistant! This tool helps you prepare for and navigate negotiations with creators and brands.</p>
      
      <div className="negotiation-features">
        <div className="feature-card">
          <h3>Rate Calculation</h3>
          <p>Calculate fair rates based on platform, engagement, and deliverable type.</p>
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
    </div>
  );
};

export default NegotiationAssistant; 