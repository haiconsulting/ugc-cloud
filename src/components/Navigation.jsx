import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Logo from '../assets/logo.png';

function Navigation({ toggleDarkMode, isDarkMode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="nav-container">
            <div className="logo-container">
                <img src={Logo} alt="UGC Cloud Logo" className="logo" />
            </div>
            
            <div className="nav-controls">
                <Link to="/" className="home-button" aria-label="Go to Home">
                    <FaHome className="home-icon" />
                </Link>
                <button 
                    className="dark-mode-toggle"
                    onClick={toggleDarkMode}
                    aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
                <div className="menu-icon" onClick={toggleMenu}>
                    <div className={`menu-line ${isMenuOpen ? 'open' : ''}`}></div>
                    <div className={`menu-line ${isMenuOpen ? 'open' : ''}`}></div>
                    <div className={`menu-line ${isMenuOpen ? 'open' : ''}`}></div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="mobile-menu">
                    <Link to="/tools">Tools</Link>
                    <Link to="/community">Community</Link>
                    <Link to="/resources">Resources</Link>
                </div>
            )}
        </nav>
    );
}

export default Navigation; 