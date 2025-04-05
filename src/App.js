import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation/Navigation';
import WelcomePage from './components/WelcomePage/WelcomePage';
import Tools from './components/Tools/Tools';
import Community from './components/Community/Community';
import Resources from './components/Resources/Resources';
import NegotiationAssistant from './components/NegotiationAssistant/NegotiationAssistant';
import RainCloudsBackground from './components/RainCloudsBackground';
import SunnyCloudBackground from './components/SunnyCloudBackground';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : true;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
    
    // Force dark mode styles on the navigation container
    const navElements = document.querySelectorAll('.nav-link');
    if (isDarkMode) {
      navElements.forEach(el => {
        el.style.color = 'white';
        el.style.fontWeight = 'bold';
        el.style.textShadow = '0 1px 2px rgba(0,0,0,0.5)';
      });
    }
  }, [isDarkMode]);

  return (
    <Router>
      <motion.div 
        className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Add cloud layers for light mode */}
        {!isDarkMode && (
          <>
            <div className="cloud-layer" style={{ zIndex: -5 }}></div>
            <div className="cloud-layer" style={{ zIndex: -4 }}></div>
            <div className="cloud-layer" style={{ zIndex: -3 }}></div>
          </>
        )}
        
        {isDarkMode ? <RainCloudsBackground /> : <SunnyCloudBackground />}
        <Navigation 
          isDarkMode={isDarkMode} 
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />
        
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/community" element={<Community />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/negotiation-assistant" element={<NegotiationAssistant />} />
        </Routes>
      </motion.div>
    </Router>
  );
}

export default App;
