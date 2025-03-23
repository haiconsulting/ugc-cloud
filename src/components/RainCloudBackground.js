import React from 'react';
import './RainCloudsBackground.css';

function RainCloudBackground() {
  return (
    <>
      <div className="clouds-container">
        <div className="cloud"></div>
        <div className="cloud"></div>
        <div className="cloud"></div>
        <div className="cloud"></div>
        <div className="cloud"></div>
      </div>
      <div className="lightning-container">
        <div className="lightning"></div>
        <div className="lightning"></div>
        <div className="lightning"></div>
      </div>
    </>
  );
}

export default RainCloudBackground; 