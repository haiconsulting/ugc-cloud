import React from 'react';
import { motion } from 'framer-motion';
import './ResourceDetailsModal.css';

const ResourceDetailsModal = ({ resource, onClose }) => {
  return (
    <div className="resource-details-overlay" onClick={onClose}>
      <motion.div 
        className="resource-details-modal"
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <div className="modal-header">
          <h2>{resource.title}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-content">
          <div className="resource-image">
            <img src={resource.thumbnail} alt={resource.title} />
          </div>

          <div className="resource-info">
            <div className="info-section">
              <h3>Description</h3>
              <p>{resource.description}</p>
            </div>

            <div className="info-section">
              <h3>Details</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="label">Type:</span>
                  <span className="value">{resource.type}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Price:</span>
                  <span className="value">${resource.price}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Author:</span>
                  <span className="value">{resource.author}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Date Added:</span>
                  <span className="value">{new Date(resource.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Tags</h3>
              <div className="tags-container">
                {resource.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="stats-section">
              <div className="stat">
                <i className="far fa-download"></i>
                <span>{resource.downloads} Downloads</span>
              </div>
              <div className="stat">
                <i className="far fa-eye"></i>
                <span>{resource.views} Views</span>
              </div>
              <div className="stat">
                <i className="far fa-heart"></i>
                <span>{resource.likes} Likes</span>
              </div>
            </div>

            <button className="purchase-button">
              Purchase Resource - ${resource.price}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResourceDetailsModal; 