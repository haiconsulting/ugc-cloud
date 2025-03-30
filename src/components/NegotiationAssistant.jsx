import React, { useState } from 'react';

const NegotiationAssistant = () => {
  const [brandOffer, setBrandOffer] = useState('');
  const [usualRate, setUsualRate] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNegotiate = async () => {
    setLoading(true);
    setError('');
    setAdvice('');

    const negotiationContext = `
      Brand Offer: ${brandOffer}
      Usual Rate: ${usualRate}
      Additional Details: ${additionalDetails}
    `;

    try {
      const response = await fetch('/negotiation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ context: negotiationContext })
      });

      const data = await response.json();

      if (response.ok) {
        setAdvice(data.advice);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="negotiation-assistant">
      <h2>Negotiation Assistant</h2>
      <div className="form-group">
        <label>Brand’s Offer</label>
        <input
          type="text"
          value={brandOffer}
          onChange={(e) => setBrandOffer(e.target.value)}
          placeholder="e.g. $500 for a single UGC video"
        />
      </div>
      <div className="form-group">
        <label>Your Usual Rate</label>
        <input
          type="text"
          value={usualRate}
          onChange={(e) => setUsualRate(e.target.value)}
          placeholder="e.g. $750 for a single UGC video"
        />
      </div>
      <div className="form-group">
        <label>Additional Details or Constraints</label>
        <textarea
          value={additionalDetails}
          onChange={(e) => setAdditionalDetails(e.target.value)}
          placeholder="e.g. timeline, deliverables, usage rights, etc."
        />
      </div>

      <button onClick={handleNegotiate} disabled={loading}>
        {loading ? 'Generating Advice...' : 'Get Negotiation Advice'}
      </button>

      {error && <p className="error-message">{error}</p>}
      {advice && (
        <div className="advice-section">
          <h3>AI Negotiation Advice:</h3>
          <p>{advice}</p>
        </div>
      )}
    </div>
  );
};

export default NegotiationAssistant;
