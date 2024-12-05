import React from 'react';
import { motion } from 'framer-motion';
import './PostDetailsModal.css';

const PostDetailsModal = ({ post, onClose }) => {
  return (
    <div className="post-details-overlay" onClick={onClose}>
      <motion.div 
        className="post-details-modal"
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <div className="modal-header">
          <div className="author-info">
            <img src={post.avatar} alt={post.author} className="author-avatar" />
            <div>
              <h2>{post.title}</h2>
              <p className="author-name">By {post.author}</p>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-content">
          <div className="post-content">
            <p>{post.content}</p>
          </div>

          <div className="post-footer">
            <div className="post-stats">
              <div className="stat">
                <i className="far fa-heart"></i>
                <span>{post.likes} Likes</span>
              </div>
              <div className="stat">
                <i className="far fa-eye"></i>
                <span>{post.views} Views</span>
              </div>
              <div className="stat">
                <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="post-actions">
              <button className="action-button like-button">
                <i className="far fa-heart"></i> Like
              </button>
              <button className="action-button share-button">
                <i className="far fa-share-square"></i> Share
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PostDetailsModal; 