import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navigation.css';

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

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const linkVariants = {
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
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
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.nav 
      className={`navigation ${visible ? '' : 'nav-hidden'}`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="nav-brand"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <img 
          src={`${process.env.PUBLIC_URL}/favicon.ico`} 
          alt="UGC Cloud Logo" 
          className="nav-logo"
        />
        <h1>UGC Cloud</h1>
      </motion.div>

      <div className="nav-links">
        {['tools', 'community', 'resources'].map((item) => (
          <motion.div
            key={item}
            variants={linkVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link 
              to={`/${item}`} 
              className={`nav-link ${location.pathname === `/${item}` ? 'active' : ''}`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          </motion.div>
        ))}
      </div>
      
      <motion.button 
        className="theme-toggle"
        onClick={toggleDarkMode}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        {isDarkMode ? '🌙' : '☀️'}
      </motion.button>

      <div className="mobile-menu">
        <motion.button 
          className="hamburger-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <span></span>
          <span></span>
          <span></span>
        </motion.button>
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
              >
                <Link 
                  to={`/${item}`} 
                  onClick={() => setIsMenuOpen(false)}
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