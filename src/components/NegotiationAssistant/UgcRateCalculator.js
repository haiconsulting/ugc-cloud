import React, { useState, useEffect } from 'react';
import './UgcRateCalculator.css'; // We'll create this CSS file next

const UgcRateCalculator = () => {
  // --- State for Inputs ---
  const [creatorTier, setCreatorTier] = useState('intermediate');
  const [contentPackage, setContentPackage] = useState('');
  const [videoLength, setVideoLength] = useState(''); // Optional, maybe based on package
  const [conceptOrigin, setConceptOrigin] = useState('brand');
  const [usageRights, setUsageRights] = useState({
    organic: { checked: false, duration: '' },
    paid: { checked: false, duration: '' },
    website: { checked: false, duration: '' },
    email: { checked: false, duration: '' },
  });
  const [exclusivity, setExclusivity] = useState('non-exclusive');
  const [rawFootage, setRawFootage] = useState('no');
  const [revisions, setRevisions] = useState('1');
  const [turnaroundTime, setTurnaroundTime] = useState('standard');

  // --- State for Output ---
  const [calculatedRate, setCalculatedRate] = useState(null);

  // --- Handlers ---
  const handleUsageRightsChange = (e) => {
    const { name, checked } = e.target;
    setUsageRights(prev => ({
      ...prev,
      [name]: { ...prev[name], checked: checked },
    }));
  };

  const handleUsageDurationChange = (e) => {
    const { name, value } = e.target;
    const key = name.replace('Duration', ''); // e.g., 'organicDuration' -> 'organic'
    setUsageRights(prev => ({
      ...prev,
      [key]: { ...prev[key], duration: value },
    }));
  };

  // --- Placeholder Calculation Logic ---
  useEffect(() => {
    // TODO: Implement actual calculation logic based on state inputs
    // This is just a placeholder to show the structure
    if (contentPackage && creatorTier) { // Basic check if some core info is present
        // Replace this with real calculation
        const pseudoRate = 150 + (Object.values(usageRights).filter(r => r.checked).length * 50);
        setCalculatedRate(pseudoRate.toFixed(2));
    } else {
        setCalculatedRate(null);
    }
  }, [creatorTier, contentPackage, videoLength, conceptOrigin, usageRights, exclusivity, rawFootage, revisions, turnaroundTime]);

  return (
    <div className="ugc-rate-calculator">
      <h3>UGC Content Rate Estimator</h3>
      <p className="description">Estimate rates for content based on specifics, usage, and quality.</p>

      <div className="form-section">
        {/* --- Creator & Content --- */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="creatorTier">Creator Tier:</label>
            <select id="creatorTier" value={creatorTier} onChange={(e) => setCreatorTier(e.target.value)}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="experienced">Experienced</option>
              <option value="top">Top Tier</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="conceptOrigin">Concept Origin:</label>
            <select id="conceptOrigin" value={conceptOrigin} onChange={(e) => setConceptOrigin(e.target.value)}>
              <option value="brand">Brand Provided</option>
              <option value="creator">Creator Developed</option>
            </select>
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="contentPackage">Content Package Deliverables:</label>
          <textarea
            id="contentPackage"
            rows="3"
            value={contentPackage}
            onChange={(e) => setContentPackage(e.target.value)}
            placeholder="e.g., 1 x 30s TikTok video, 3 x lifestyle photos"
          />
        </div>

        {/* --- Content Specifics --- */}
        <div className="form-row">
           <div className="form-group">
            <label htmlFor="videoLength">Video Length (if applicable):</label>
            <select id="videoLength" value={videoLength} onChange={(e) => setVideoLength(e.target.value)}>
                <option value="">N/A</option>
                <option value="upto15">Up to 15s</option>
                <option value="15-30s">15-30s</option>
                <option value="30-60s">30-60s</option>
                <option value="60s+">60s+</option>
            </select>
            </div>
             <div className="form-group">
                 <label htmlFor="rawFootage">Raw Footage Included:</label>
                 <select id="rawFootage" value={rawFootage} onChange={(e) => setRawFootage(e.target.value)}>
                 <option value="no">No</option>
                 <option value="yes">Yes</option>
                 </select>
             </div>
        </div>

        {/* --- Usage Rights --- */}
        <div className="form-group full-width">
          <label>Usage Rights (Select all that apply):</label>
          <div className="usage-rights-grid">
            {Object.keys(usageRights).map((key) => (
              <div key={key} className="usage-right-item">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name={key}
                    checked={usageRights[key].checked}
                    onChange={handleUsageRightsChange}
                  />
                  {key.charAt(0).toUpperCase() + key.slice(1).replace('paid', 'Paid Social Ads').replace('organic', 'Organic Social')}
                </label>
                {/* Optional Duration Input - Simple text for now */}
                <input
                  type="text"
                  name={`${key}Duration`}
                  value={usageRights[key].duration}
                  onChange={handleUsageDurationChange}
                  placeholder="Duration (e.g., 6 months)"
                  disabled={!usageRights[key].checked} // Only enable if checked
                  className="duration-input"
                />
              </div>
            ))}
          </div>
        </div>

        {/* --- Terms & Delivery --- */}
         <div className="form-row">
             <div className="form-group">
                 <label htmlFor="exclusivity">Exclusivity:</label>
                 <select id="exclusivity" value={exclusivity} onChange={(e) => setExclusivity(e.target.value)}>
                 <option value="non-exclusive">Non-Exclusive</option>
                 <option value="exclusive">Exclusive</option>
                 </select>
             </div>
            <div className="form-group">
                <label htmlFor="revisions">Revisions Included:</label>
                <select id="revisions" value={revisions} onChange={(e) => setRevisions(e.target.value)}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                 <option value="3">3+</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="turnaroundTime">Turnaround Time:</label>
                <select id="turnaroundTime" value={turnaroundTime} onChange={(e) => setTurnaroundTime(e.target.value)}>
                <option value="standard">Standard</option>
                <option value="rush">Rush</option>
                </select>
            </div>
         </div>

      </div>

      {/* --- Output Display --- */}
      {calculatedRate !== null && (
        <div className="calculated-rate-output">
          <h4>Estimated Rate:</h4>
          <p>${calculatedRate}</p>
        </div>
      )}
      <p className="disclaimer">Note: This is an estimated rate. Actual rates depend on specific project scope, negotiation, and other factors.</p>

    </div>
  );
};

export default UgcRateCalculator; 