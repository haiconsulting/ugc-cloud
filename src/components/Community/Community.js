import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CreatePost from '../CreatePost/CreatePost';
import PostDetailsModal from '../PostDetailsModal/PostDetailsModal';
import { getFromStorage, saveToStorage, LOCAL_STORAGE_KEYS, backupData, importData } from '../../utils/localStorage';
import './Community.css';

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const storedPosts = getFromStorage(LOCAL_STORAGE_KEYS.POSTS);
    if (storedPosts) {
      setPosts(storedPosts);
    }
  }, []);

  const handleCreatePost = (newPost) => {
    const postWithMetadata = {
      id: Date.now(),
      author: "Current User",
      avatar: "https://placeholder.com/150x150",
      likes: 0,
      views: 0,
      ...newPost
    };

    const updatedPosts = [postWithMetadata, ...posts];
    saveToStorage(LOCAL_STORAGE_KEYS.POSTS, updatedPosts);
    setPosts(updatedPosts);
    setShowCreatePost(false);
  };

  const handleBackup = () => {
    backupData();
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const success = await importData(LOCAL_STORAGE_KEYS.POSTS, file);
      if (success) {
        const storedPosts = getFromStorage(LOCAL_STORAGE_KEYS.POSTS);
        if (storedPosts) {
          setPosts(storedPosts);
        }
      }
    }
  };

  return (
    <motion.div
      className="community-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="community-header">
        <div className="header-content">
          <h2>UGC Creator Community</h2>
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
              id="import-posts-json"
            />
            <label htmlFor="import-posts-json" className="import-btn">
              Import Data
            </label>
            <button 
              className="create-post-btn"
              onClick={() => setShowCreatePost(true)}
            >
              Create Post
            </button>
          </div>
        </div>
      </div>

      <div className="posts-grid">
        {posts.map(post => (
          <motion.div
            key={post.id}
            className="post-card"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedPost(post)}
            style={{ cursor: 'pointer' }}
          >
            <div className="post-header">
              <img src={post.avatar} alt={post.author} className="author-avatar" />
              <div className="post-meta">
                <h3>{post.title}</h3>
                <p className="author-name">By {post.author}</p>
              </div>
            </div>
            
            <p className="post-excerpt">{post.content}</p>
            
            <div className="post-stats">
              <span className="stat">
                <i className="far fa-heart"></i> {post.likes}
              </span>
              <span className="stat">
                <i className="far fa-eye"></i> {post.views}
              </span>
              <span className="post-date">{post.date}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedPost && (
        <PostDetailsModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}

      {showCreatePost && (
        <CreatePost
          onClose={() => setShowCreatePost(false)}
          onSubmit={handleCreatePost}
        />
      )}
    </motion.div>
  );
};

export default Community; 