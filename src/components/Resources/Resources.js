import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import UploadResource from '../UploadResource/UploadResource';
import { getFromStorage, saveToStorage, LOCAL_STORAGE_KEYS, backupData, importData } from '../../utils/localStorage';
import './Resources.css';
import ResourceDetailsModal from '../ResourceDetailsModal/ResourceDetailsModal';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  // Load resources from local storage on component mount
  useEffect(() => {
    const storedResources = getFromStorage(LOCAL_STORAGE_KEYS.RESOURCES);
    if (storedResources) {
      setResources(storedResources);
    }
  }, []);

  const handleResourceUpload = (resourceData) => {
    const newResource = {
      ...resourceData,
      id: Date.now(),
      downloads: 0,
      views: 0,
      likes: 0,
      date: new Date().toISOString()
    };

    const updatedResources = [newResource, ...resources];
    saveToStorage(LOCAL_STORAGE_KEYS.RESOURCES, updatedResources);
    setResources(updatedResources);
    setShowUploadModal(false);
  };

  const filteredResources = activeCategory === 'all'
    ? resources
    : resources.filter(resource => resource.type === activeCategory);

  const handleBackup = () => {
    backupData();
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const success = await importData(LOCAL_STORAGE_KEYS.RESOURCES, file);
      if (success) {
        // Reload resources
        const storedResources = getFromStorage(LOCAL_STORAGE_KEYS.RESOURCES);
        if (storedResources) {
          setResources(storedResources);
        }
      }
    }
  };

  return (
    <motion.div
      className="resources-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="resources-header">
        <div className="header-content">
          <h2>Creator Resources</h2>
          <div className="header-actions">
            <button 
              className="backup-btn"
              onClick={handleBackup}
            >
              Backup Data
            </button>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: 'none' }}
              id="import-json"
            />
            <label htmlFor="import-json" className="import-btn">
              Import Data
            </label>
            <button 
              className="upload-resource-btn"
              onClick={() => setShowUploadModal(true)}
            >
              Upload Resource
            </button>
          </div>
        </div>
        <div className="category-filters">
          <button 
            className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          <button 
            className={`category-btn ${activeCategory === 'template' ? 'active' : ''}`}
            onClick={() => setActiveCategory('template')}
          >
            Templates
          </button>
          <button 
            className={`category-btn ${activeCategory === 'course' ? 'active' : ''}`}
            onClick={() => setActiveCategory('course')}
          >
            Courses
          </button>
          <button 
            className={`category-btn ${activeCategory === 'asset' ? 'active' : ''}`}
            onClick={() => setActiveCategory('asset')}
          >
            Assets
          </button>
        </div>
      </div>

      <div className="resources-grid">
        {filteredResources.map(resource => (
          <motion.div
            key={resource.id}
            className="resource-card"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedResource(resource)}
            style={{ cursor: 'pointer' }}
          >
            <img 
              src={resource.thumbnail} 
              alt={resource.title} 
              className="resource-thumbnail" 
            />
            <div className="resource-content">
              <h3>{resource.title}</h3>
              <p className="resource-description">{resource.description}</p>
              <div className="resource-meta">
                <span className="price">${resource.price}</span>
                <span className="author">By {resource.author || 'Anonymous'}</span>
              </div>
              <div className="resource-stats">
                <span><i className="far fa-download"></i> {resource.downloads}</span>
                <span><i className="far fa-eye"></i> {resource.views}</span>
                <span><i className="far fa-heart"></i> {resource.likes}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedResource && (
        <ResourceDetailsModal
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
        />
      )}

      {showUploadModal && (
        <UploadResource
          onClose={() => setShowUploadModal(false)}
          onSubmit={handleResourceUpload}
        />
      )}
    </motion.div>
  );
};

export default Resources;