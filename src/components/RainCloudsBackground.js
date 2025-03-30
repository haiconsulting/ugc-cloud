import React, { useEffect, useState } from 'react';
import './RainCloudsBackground.css';

function RainCloudsBackground() {
  const [offset, setOffset] = useState(0);
  
  // Parallax scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Dark gradient sky background */}
      <div className="dark-sky-gradient"></div>
      
      {/* Parallax clouds container */}
      <div className="parallax-container">
        <div 
          className="clouds-container"
          style={{ transform: `translateY(${offset * 0.2}px)` }}
        >
          <div className="cloud cloud-back">
            <div className="rain"></div>
            <div className="rain"></div>
            <div className="rain"></div>
            <div className="rain"></div>
            <div className="rain"></div>
          </div>
          <div className="cloud cloud-mid" style={{ transform: `translateY(${offset * 0.1}px)` }}>
            <div className="rain"></div>
            <div className="rain"></div>
            <div className="rain"></div>
            <div className="rain"></div>
            <div className="rain"></div>
          </div>
          <div className="cloud cloud-front" style={{ transform: `translateY(${offset * 0.05}px)` }}>
            <div className="rain"></div>
            <div className="rain"></div>
            <div className="rain"></div>
            <div className="rain"></div>
            <div className="rain"></div>
          </div>
          <div className="cloud cloud-distant">
            <div className="rain"></div>
            <div className="rain"></div>
            <div className="rain"></div>
            <div className="rain"></div>
            <div className="rain"></div>
          </div>
          <div className="cloud cloud-near">
            <div className="rain"></div>
            <div className="rain"></div>
            <div className="rain"></div>
            <div className="rain"></div>
            <div className="rain"></div>
          </div>
        </div>
      </div>
      
      {/* Lightning effects */}
      <div className="lightning-container">
        <div className="lightning"></div>
        <div className="lightning"></div>
        <div className="lightning"></div>
      </div>
      
      {/* Rain particles overlay */}
      <div className="rain-overlay"></div>
    </>
  );
}

export default RainCloudsBackground; 