import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import './PaywallModal.css';

const PaywallModal = () => {
  const { handlePayment } = useAuth();

  const plans = [
    {
      name: 'Monthly',
      price: 29.99,
      features: [
        'Access to all tools',
        'Unlimited downloads',
        'Community access',
        'Priority support'
      ]
    },
    {
      name: 'Annual',
      price: 299.99,
      features: [
        'All Monthly features',
        '2 months free',
        'Early access to new features',
        'Custom branding options'
      ],
      popular: true
    }
  ];

  return (
    <div className="paywall-overlay">
      <motion.div 
        className="paywall-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Unlock Full Access</h2>
        <p className="paywall-subtitle">Choose a plan that works for you</p>

        <div className="plans-container">
          {plans.map((plan) => (
            <motion.div 
              key={plan.name}
              className={`plan-card ${plan.popular ? 'popular' : ''}`}
              whileHover={{ y: -5 }}
            >
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <h3>{plan.name}</h3>
              <div className="price">
                <span className="currency">$</span>
                <span className="amount">{plan.price}</span>
              </div>
              <ul className="features-list">
                {plan.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
              <button 
                className="select-plan-button"
                onClick={handlePayment}
              >
                Select Plan
              </button>
            </motion.div>
          ))}
        </div>

        <div className="guarantee">
          <p>30-day money-back guarantee • Cancel anytime</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PaywallModal; 