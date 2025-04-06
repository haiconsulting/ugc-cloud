import React, { useState } from 'react';
import './RateCalculator.css'; // Import the CSS file

const RateCalculator = () => {
  // State for form inputs
  const [creatorTier, setCreatorTier] = useState('Intermediate');
  const [conceptOrigin, setConceptOrigin] = useState('Brand Provided');
  const [deliverables, setDeliverables] = useState('');
  const [videoLength, setVideoLength] = useState('N/A');
  // Add more state variables as needed for other fields (e.g., usage rights, exclusivity)

  // Placeholder for calculation logic
  const calculateRate = () => {
    // TODO: Implement rate calculation logic based on state variables
    console.log('Calculating rate with:', {
      creatorTier,
      conceptOrigin,
      deliverables,
      videoLength,
      // ... other factors
    });
    // Display the result somewhere
  };

  return (
    <div className="rate-calculator-container">
      <h2>UGC Content Rate Estimator</h2>
      <p className="subtitle">Estimate rates for content based on specifics, usage, and quality.</p>

      <div className="calculator-form">
        {/* Creator Tier */}
        <div className="form-group">
          <label htmlFor="creatorTier">Creator Tier:</label>
          <select
            id="creatorTier"
            value={creatorTier}
            onChange={(e) => setCreatorTier(e.target.value)}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Pro">Pro</option>
          </select>
        </div>

        {/* Concept Origin */}
        <div className="form-group">
          <label htmlFor="conceptOrigin">Concept Origin:</label>
          <select
            id="conceptOrigin"
            value={conceptOrigin}
            onChange={(e) => setConceptOrigin(e.target.value)}
          >
            <option value="Brand Provided">Brand Provided</option>
            <option value="Creator Pitched">Creator Pitched</option>
            <option value="Collaborative">Collaborative</option>
          </select>
        </div>

        {/* Content Package Deliverables */}
        <div className="form-group">
          <label htmlFor="deliverables">Content Package Deliverables:</label>
          <textarea
            id="deliverables"
            rows="4"
            placeholder="e.g., 1 x 30s TikTok video, 3 x lifestyle photos"
            value={deliverables}
            onChange={(e) => setDeliverables(e.target.value)}
          />
        </div>

        {/* Video Length */}
        <div className="form-group">
          <label htmlFor="videoLength">Video Length (if applicable):</label>
          <select
            id="videoLength"
            value={videoLength}
            onChange={(e) => setVideoLength(e.target.value)}
          >
            <option value="N/A">N/A</option>
            <option value="< 15s">&lt; 15s</option>
            <option value="15s - 30s">15s - 30s</option>
            <option value="30s - 60s">30s - 60s</option>
            <option value="> 60s">&gt; 60s</option>
          </select>
        </div>

        {/* --- Add other form fields here based on the full design --- */}
        {/* e.g., Usage Rights, Exclusivity, Raw Footage, etc. */}


        {/* Submit Button (or display results dynamically) */}
        {/*
        <button type="button" onClick={calculateRate} className="calculate-button">
          Estimate Rate
        </button>
        */}

        {/* Results Area */}
        {/*
        <div className="calculator-results">
          <h3>Estimated Rate:</h3>
          <p>Rate will appear here...</p>
        </div>
        */}
      </div>
    </div>
  );
};

export default RateCalculator; 