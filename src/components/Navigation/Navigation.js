import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navigation.css';
import './DarkModeNav.css';
import './NavigationFix.css';

const Navigation = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
      if (isMenuOpen) setIsMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, isMenuOpen]);

  useEffect(() => {
    console.log("Dark mode logo path:", `${process.env.PUBLIC_URL}/logo-dark.png`);
    console.log("Light mode logo path:", `${process.env.PUBLIC_URL}/logo.png`);
    console.log("Current mode:", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  const linkVariants = {
    hover: { 
      scale: 1.05,
      color: isDarkMode ? "#87CEEB" : "#2196F3",
      transition: { type: "spring", stiffness: 300, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  const themeToggleVariants = {
    light: { rotate: 0, backgroundColor: "rgba(255, 210, 0, 0.2)" },
    dark: { rotate: 180, backgroundColor: "rgba(100, 100, 255, 0.15)" }
  };

  // Define direct styles for dark mode navigation
  const darkModeStyles = {
    navLink: {
      color: 'white',
      textShadow: '0 1px 2px rgba(0,0,0,0.5)',
      fontWeight: 'bold'
    },
    navContainer: {
      background: 'rgba(26, 26, 46, 0.95)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6)'
    },
    navLogo: {
      filter: 'brightness(2) contrast(1.2)'
    }
  };

  // Log for debugging
  console.log("Current dark mode state:", isDarkMode);

  return (
    <motion.nav 
      className={`navigation ${visible ? '' : 'nav-hidden'}`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
      style={isDarkMode ? darkModeStyles.navContainer : {}}
    >
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <img 
              src={isDarkMode 
                ? `${process.env.PUBLIC_URL}/DarkModeLogo.png` 
                : `${process.env.PUBLIC_URL}/logo.png`} 
              alt="Logo"
              className="nav-logo"
              style={isDarkMode ? darkModeStyles.navLogo : {}}
            />
          </Link>
        </div>

        <div className="nav-links">
          {['tools', 'community', 'resources'].map((item) => (
            <motion.div
              key={item}
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
              className="nav-link-container"
            >
              <Link 
                to={`/${item}`} 
                className={`nav-link ${location.pathname === `/${item}` ? 'active' : ''}`}
                style={isDarkMode ? darkModeStyles.navLink : {}}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                {location.pathname === `/${item}` && (
                  <motion.div 
                    className="active-indicator"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="nav-controls">
          <motion.button 
            className="theme-toggle"
            onClick={toggleDarkMode}
            variants={themeToggleVariants}
            animate={isDarkMode ? "dark" : "light"}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <motion.div
              className="toggle-icon"
              initial={false}
              animate={{ rotateZ: isDarkMode ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDarkMode ? '🌧️' : '☀️'}
            </motion.div>
          </motion.button>

          <div className="mobile-menu">
            <motion.button 
              className="hamburger-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <motion.span animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 8 : 0 }} />
              <motion.span animate={{ opacity: isMenuOpen ? 0 : 1 }} />
              <motion.span animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -8 : 0 }} />
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="mobile-nav-links"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {['tools', 'community', 'resources'].map((item) => (
              <motion.div
                key={item}
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
                className="mobile-nav-link-container"
              >
                <Link 
                  to={`/${item}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className={location.pathname === `/${item}` ? 'active' : ''}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;