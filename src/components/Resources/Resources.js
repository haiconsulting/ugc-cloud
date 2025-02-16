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
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  const handlePreview = (template) => {
    // Create a new window/tab with the template preview
    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(template.content || 'Preview not available');
    previewWindow.document.close();
  };

  const handleDownload = (template) => {
    // Create a blob with the template content
    const blob = new Blob([template.content || ''], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary link element and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = template.fileName || 'template.html';
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'templates', label: 'Templates' },
    { id: 'courses', label: 'Courses' },
    { id: 'assets', label: 'Assets' }
  ];

  const emailTemplates = [
    {
      id: 1,
      title: "Professional Outreach Template",
      description: "A professional template for reaching out to potential clients",
      fileName: "outreach-template.html",
      category: "templates",
      type: "email",
      content: `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Professional Outreach Template</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6;">
    <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto;">
        <tr>
            <td style="padding: 20px;">
                <h2 style="color: #333;">Professional Outreach</h2>
                <p style="color: #666;">Your template content here...</p>
            </td>
        </tr>
    </table>
</body>
</html>`
    },
    // Add your other templates here
  ];

  const renderEmailTemplate = (template) => {
    return (
      <motion.div 
        key={template.id}
        className="template-card"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <h3>{template.title}</h3>
        <p>{template.description}</p>
        <div className="template-actions">
          <button 
            className="preview-btn"
            onClick={() => handlePreview(template)}
          >
            Preview
          </button>
          <button 
            className="download-btn"
            onClick={() => handleDownload(template)}
          >
            Download HTML
          </button>
        </div>
      </motion.div>
    );
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