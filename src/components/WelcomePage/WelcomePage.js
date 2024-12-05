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
      <div className="welcome-content">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Welcome to UGC Cloud
        </motion.h1>
        
        <motion.div 
          className="welcome-description"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p>
            Welcome to the future of user-generated content. UGC Cloud is a thriving community 
            of creators sharing their exceptional work with the world. Our platform ensures that 
            creators are fairly compensated while making quality content accessible to all.
          </p>
          
          <p>
            When you use resources from our platform, 90% of the revenue goes directly to the 
            creator. The remaining 10% helps us maintain and improve the platform, ensuring a 
            sustainable ecosystem for everyone.
          </p>

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
        </motion.div>

        <motion.button
          className="get-started-btn"
          onClick={handleGetStarted}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </div>

      <motion.div 
        className="samples-section"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2>Featured Resources</h2>
        <div className="samples-grid">
          {sampleResources.map((sample, index) => (
            <motion.div 
              key={index}
              className="sample-card"
              whileHover={{ y: -5 }}
            >
              <img src={sample.preview} alt={sample.title} />
              <h3>{sample.title}</h3>
              <p>{sample.description}</p>
              <div className="sample-stats">
                <span><i className="far fa-heart"></i> {sample.likes}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="reviews-section"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h2>What Our Community Says</h2>
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <motion.div 
              key={index}
              className="review-card"
              whileHover={{ y: -5 }}
            >
              <div className="review-header">
                <img src={review.avatar} alt={review.name} />
                <div>
                  <h4>{review.name}</h4>
                  <p>{review.role}</p>
                </div>
              </div>
              <p className="review-content">{review.content}</p>
              <div className="review-rating">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomePage; 