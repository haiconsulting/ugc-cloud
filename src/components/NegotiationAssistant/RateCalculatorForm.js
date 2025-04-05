import React, { useState, useEffect } from 'react';
import './RateCalculatorForm.css'; // We'll create this file next

const RateCalculatorForm = () => {
  const [platform, setPlatform] = useState('instagram');
  const [followers, setFollowers] = useState('');
  const [engagementRate, setEngagementRate] = useState('');
  const [contentType, setContentType] = useState('post');
  const [usageRights, setUsageRights] = useState('limited');
  const [calculatedRate, setCalculatedRate] = useState(null);

  // Placeholder calculation logic
  useEffect(() => {
    if (followers && engagementRate) {
      // Very basic placeholder logic - NEEDS REFINEMENT
      let baseRate = 50; // Base starting point
      if (platform === 'tiktok') baseRate = 40;
      if (platform === 'youtube') baseRate = 70;

      let followerFactor = (parseInt(followers, 10) / 1000) * 2; // $2 per 1k followers
      let engagementFactor = 1 + (parseFloat(engagementRate) / 100); // Adjust by engagement %

      let contentMultiplier = 1;
      if (contentType === 'video') contentMultiplier = 1.5;
      if (contentType === 'story') contentMultiplier = 0.8;

      let usageMultiplier = 1;
      if (usageRights === 'perpetual') usageMultiplier = 2;
      if (usageRights === 'exclusive') usageMultiplier = 1.8;


      const rate = baseRate + followerFactor * engagementFactor * contentMultiplier * usageMultiplier;
      setCalculatedRate(rate.toFixed(2));

    } else {
      setCalculatedRate(null); // Reset if inputs are missing
    }
  }, [platform, followers, engagementRate, contentType, usageRights]);

  const handleFollowersChange = (e) => {
    // Allow only numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    setFollowers(value);
  };

   const handleEngagementChange = (e) => {
    // Allow numbers and one decimal point
    const value = e.target.value;
     if (/^\d*\.?\d*$/.test(value)) {
       setEngagementRate(value);
     }
  };


  return (
    <div className="rate-calculator-form">
      <h3>Rate Calculator</h3>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="platform">Platform:</label>
          <select id="platform" value={platform} onChange={(e) => setPlatform(e.target.value)}>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
            {/* Add other platforms as needed */}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="followers">Follower Count:</label>
          <input
             type="text" // Use text to allow custom validation
             id="followers"
             value={followers}
             onChange={handleFollowersChange}
             placeholder="e.g., 10000"
           />
        </div>

        <div className="form-group">
          <label htmlFor="engagement">Engagement Rate (%):</label>
           <input
             type="text" // Use text to allow custom validation
             id="engagement"
             value={engagementRate}
             onChange={handleEngagementChange}
             placeholder="e.g., 3.5"
           />
        </div>

        <div className="form-group">
          <label htmlFor="contentType">Content Type:</label>
          <select id="contentType" value={contentType} onChange={(e) => setContentType(e.target.value)}>
            <option value="post">Post</option>
            <option value="story">Story</option>
            <option value="video">Video (e.g., Reel, Short)</option>
            {/* Add other types */}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="usageRights">Usage Rights:</label>
          <select id="usageRights" value={usageRights} onChange={(e) => setUsageRights(e.target.value)}>
            <option value="limited">Limited Time</option>
            <option value="perpetual">Perpetual</option>
            <option value="exclusive">Exclusive Use</option>
             {/* Add other rights */}
          </select>
        </div>
      </div>

      {calculatedRate !== null && (
        <div className="calculated-rate">
          <h4>Estimated Rate:</h4>
          <p>${calculatedRate}</p>
        </div>
      )}
       <p className="disclaimer">Note: This is a rough estimate. Actual rates depend on many factors.</p>
    </div>
  );
};

export default RateCalculatorForm; 