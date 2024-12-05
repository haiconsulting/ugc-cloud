import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import './UploadResource.css';

const UploadResource = ({ onClose, onSubmit }) => {
  const [resourceData, setResourceData] = useState({
    title: '',
    description: '',
    price: '',
    type: 'template',
    thumbnail: null,
    resourceFile: null,
    tags: [],
    currentTag: '',
    author: 'Anonymous'
  });

  const [dragActive, setDragActive] = useState({
    thumbnail: false,
    resource: false
  });

  const handleDrag = useCallback((e, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(prev => ({ ...prev, [type]: true }));
    } else if (e.type === "dragleave") {
      setDragActive(prev => ({ ...prev, [type]: false }));
    }
  }, []);

  const handleFileUpload = (file, type) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResourceData(prev => ({
          ...prev,
          [type]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = useCallback((e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(prev => ({ ...prev, [type]: false }));

    const file = e.dataTransfer.files[0];
    if (file) {
      if (type === 'thumbnail' && file.type.startsWith('image/')) {
        handleFileUpload(file, 'thumbnail');
      } else if (type === 'resource') {
        handleFileUpload(file, 'resourceFile');
      }
    }
  }, []);

  const handleFileInput = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file, type === 'thumbnail' ? 'thumbnail' : 'resourceFile');
    }
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && resourceData.currentTag.trim()) {
      e.preventDefault();
      setResourceData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.currentTag.trim()],
        currentTag: ''
      }));
    }
  };

  const removeTag = (tagToRemove) => {
    setResourceData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resourceData.thumbnail || !resourceData.resourceFile) {
      return;
    }
    
    const submissionData = {
      ...resourceData,
      price: parseFloat(resourceData.price) || 0,
      date: new Date().toISOString(),
      tags: resourceData.tags.filter(tag => tag.trim() !== '')
    };
    
    delete submissionData.currentTag; // Remove the currentTag field
    onSubmit(submissionData);
  };

  return (
    <div className="upload-resource-overlay" onClick={onClose}>
      <motion.div 
        className="upload-resource-modal"
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <div className="modal-header">
          <h2>Upload Resource</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="upload-form">
          {/* Rest of your form JSX remains the same */}
          <div className="form-group">
            <label htmlFor="type">Resource Type</label>
            <select
              id="type"
              value={resourceData.type}
              onChange={(e) => setResourceData(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="template">Template</option>
              <option value="course">Course</option>
              <option value="asset">Asset</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={resourceData.title}
              onChange={(e) => setResourceData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter resource title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={resourceData.description}
              onChange={(e) => setResourceData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your resource..."
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (USD)</label>
            <input
              type="number"
              id="price"
              min="0"
              step="0.01"
              value={resourceData.price}
              onChange={(e) => setResourceData(prev => ({ ...prev, price: e.target.value }))}
              placeholder="Enter price"
              required
            />
          </div>

          <div className="form-group">
            <label>Thumbnail</label>
            <div 
              className={`drop-zone ${dragActive.thumbnail ? 'drag-active' : ''}`}
              onDragEnter={e => handleDrag(e, 'thumbnail')}
              onDragLeave={e => handleDrag(e, 'thumbnail')}
              onDragOver={e => handleDrag(e, 'thumbnail')}
              onDrop={e => handleDrop(e, 'thumbnail')}
            >
              {resourceData.thumbnail ? (
                <div className="preview">
                  <img 
                    src={resourceData.thumbnail} 
                    alt="Thumbnail preview" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setResourceData(prev => ({ ...prev, thumbnail: null }))}
                    className="remove-file"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <p>Drag & drop thumbnail image or</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleFileInput(e, 'thumbnail')}
                    id="thumbnail-input"
                    className="file-input"
                  />
                  <label htmlFor="thumbnail-input" className="file-input-label">
                    Browse Files
                  </label>
                </>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Resource File</label>
            <div 
              className={`drop-zone ${dragActive.resource ? 'drag-active' : ''}`}
              onDragEnter={e => handleDrag(e, 'resource')}
              onDragLeave={e => handleDrag(e, 'resource')}
              onDragOver={e => handleDrag(e, 'resource')}
              onDrop={e => handleDrop(e, 'resource')}
            >
              {resourceData.resourceFile ? (
                <div className="file-preview">
                  <p>File ready for upload</p>
                  <button 
                    type="button" 
                    onClick={() => setResourceData(prev => ({ ...prev, resourceFile: null }))}
                    className="remove-file"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <p>Drag & drop resource file or</p>
                  <input
                    type="file"
                    onChange={e => handleFileInput(e, 'resource')}
                    id="resource-input"
                    className="file-input"
                  />
                  <label htmlFor="resource-input" className="file-input-label">
                    Browse Files
                  </label>
                </>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              id="tags"
              value={resourceData.currentTag}
              onChange={(e) => setResourceData(prev => ({ ...prev, currentTag: e.target.value }))}
              onKeyPress={handleTagInput}
              placeholder="Add tags (press Enter to add)"
            />
            <div className="tags-container">
              {resourceData.tags.map((tag, index) => (
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
            <button 
              type="submit" 
              className="submit-button"
              disabled={!resourceData.thumbnail || !resourceData.resourceFile}
            >
              Upload Resource
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UploadResource;