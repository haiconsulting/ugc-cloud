import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './CreatePost.css';

const CreatePost = ({ onClose, onSubmit }) => {
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    tags: [],
    currentTag: ''
  });

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && postData.currentTag.trim()) {
      e.preventDefault();
      setPostData({
        ...postData,
        tags: [...postData.tags, postData.currentTag.trim()],
        currentTag: ''
      });
    }
  };

  const removeTag = (tagToRemove) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...postData,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      views: 0
    });
    onClose();
  };

  return (
    <div className="create-post-overlay" onClick={onClose}>
      <motion.div 
        className="create-post-modal"
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <div className="modal-header">
          <h2>Create a Post</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={postData.title}
              onChange={(e) => setPostData({ ...postData, title: e.target.value })}
              placeholder="Enter your post title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={postData.content}
              onChange={(e) => setPostData({ ...postData, content: e.target.value })}
              placeholder="Share your thoughts, experiences, or questions..."
              rows="6"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              id="tags"
              value={postData.currentTag}
              onChange={(e) => setPostData({ ...postData, currentTag: e.target.value })}
              onKeyPress={handleTagInput}
              placeholder="Add tags (press Enter to add)"
            />
            <div className="tags-container">
              {postData.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => removeTag(tag)}
                    className="remove-tag"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Publish Post
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreatePost; 