import React, { useEffect, useContext } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  
  // Create parallax effect values for content elements
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.2]);
  const heroY = useTransform(scrollY, [0, 300], [0, 100]);
  
  const sampleResources = [
    {
      title: "Professional Email Pack",
      description: "20+ customizable email templates",
      preview: "https://placeholder.com/300x200",
      likes: 245
    },
    {
      title: "Social Media Bundle",
      description: "Instagram and TikTok content templates",
      preview: "https://placeholder.com/300x200",
      likes: 189
    },
    // Add more samples
  ];

  const reviews = [
    {
      name: "Sarah Miller",
      role: "UGC Creator",
      avatar: "https://placeholder.com/50x50",
      content: "UGC Cloud has transformed how I create and share content. The tools are intuitive and the community is incredibly supportive.",
      rating: 5
    },
    {
      name: "James Wilson",
      role: "Digital Marketer",
      avatar: "https://placeholder.com/50x50",
      content: "The resource quality is outstanding. I've found amazing templates that have saved me hours of work.",
      rating: 5
    },
    // Add more reviews
  ];

  const handleGetStarted = () => {
    navigate('/tools');
  };

  return (
    <motion.div 
      className="welcome-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="cloud-filter-container">
        <svg xmlns="http://www.w3.org/2000/svg">
          <filter id="cloud-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" seed="1" />
            <feDisplacementMap in="SourceGraphic" scale="5" />
            <feGaussianBlur stdDeviation="3.5" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="5" intercept="-1.6" />
            </feComponentTransfer>
          </filter>
        </svg>
      </div>
      
      <div className="section-container primary">
        <motion.div 
          className="content-container glass-morphism"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <div className="hero-section">
            <motion.div
              className="cloud-text-container"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="cloud-text">Welcome to UGC Cloud</h1>
            </motion.div>
            
            <motion.div 
              className="hero-description"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p>
                The future of user-generated content starts here. UGC Cloud is a thriving 
                community where creators share their exceptional work with the world. Our 
                platform empowers brands and businesses with high-quality, authentic content 
                while ensuring creators have the tools and opportunities to succeed.
              </p>
              <p>
                With powerful tools, seamless collaboration, and a dynamic creator network, 
                UGC Cloud makes it easy to discover, manage, and integrate user-generated 
                content into your marketing strategy.
              </p>
              
              <motion.div
                className="cta-button-container"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <button 
                  className="cta-button get-started-btn" 
                  onClick={handleGetStarted}
                >
                  Get Started Now
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <div className="section-container secondary">
        <div className="content-container glass-morphism">
          <div className="features-section">
            <h2 className="section-heading">Platform Features</h2>
            <div className="spacer"></div>
            
            <div className="features-grid">
              <div className="feature-card">
                <i className="fas fa-tools"></i>
                <h3>Professional Tools</h3>
                <p>Access premium tools for content creation and management</p>
              </div>
              
              <div className="feature-card">
                <i className="fas fa-users"></i>
                <h3>Creator Community</h3>
                <p>Connect with fellow creators and share experiences</p>
              </div>
              
              <div className="feature-card">
                <i className="fas fa-box-open"></i>
                <h3>Resource Library</h3>
                <p>Browse and download high-quality UGC resources</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="section-container accent">
        <div className="content-container glass-morphism">
          <div className="testimonials-section">
            <h2 className="testimonials-heading">What Creators Are Saying</h2>
            <div className="divider"></div>
            
            {/* You can add testimonials content here */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomePage; 