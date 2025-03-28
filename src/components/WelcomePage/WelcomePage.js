import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

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
      <div className="section-container primary">
        <div className="content-container">
          <div className="hero-section">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome to UGC Cloud
            </motion.h1>
            
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
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="section-container secondary">
        <div className="content-container">
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
        <div className="content-container">
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