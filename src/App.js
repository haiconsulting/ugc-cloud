import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation/Navigation';
import WelcomePage from './components/WelcomePage/WelcomePage';
import Tools from './components/Tools/Tools';
import Community from './components/Community/Community';
import Resources from './components/Resources/Resources';
import RainCloudBackground from './components/RainCloudBackground';
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
  }, [isDarkMode]);

  return (
    <Router basename="/ugc-cloud">
      <motion.div 
        className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isDarkMode ? <RainCloudBackground /> : <SunnyCloudBackground />}
        <Navigation 
          isDarkMode={isDarkMode} 
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />
        
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/community" element={<Community />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </motion.div>
    </Router>
  );
}

export default App;
