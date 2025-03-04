import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import './OAuth2Callback.css';

/**
 * This component handles the OAuth2 callback from Google.
 * It should be rendered at the /oauth2callback route.
 */
const OAuth2Callback = () => {
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processOAuthCallback = async () => {
      try {
        // Get the auth code from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        if (error) {
          console.error('OAuth error:', error);
          setError(`Authentication failed: ${error}`);
          setIsProcessing(false);
          return;
        }

        if (!code) {
          setError('No authentication code received from Google');
          setIsProcessing(false);
          return;
        }

        // Store the code temporarily if needed for exchanging on your backend
        // In a client-only app, you'll generally not need to do this as the gapi library
        // will handle the token exchange for you
        console.log('Authentication successful, redirecting...');
        
        // Optional: you can store any data in localStorage or sessionStorage if needed
        sessionStorage.setItem('oauth_success', 'true');
        
        setIsProcessing(false);
      } catch (error) {
        console.error('Error processing OAuth callback:', error);
        setError('Failed to process authentication response');
        setIsProcessing(false);
      }
    };

    processOAuthCallback();
  }, []);

  if (!isProcessing) {
    // Redirect back to the email sender page
    return <Navigate to="/email-sender" replace />;
  }

  return (
    <div className="oauth-callback">
      <div className="loading-container">
        {error ? (
          <div className="error-message">
            <h2>Authentication Error</h2>
            <p>{error}</p>
            <button onClick={() => window.location.href = '/email-sender'}>
              Return to Email Sender
            </button>
          </div>
        ) : (
          <>
            <div className="spinner"></div>
            <p>Completing authentication, please wait...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default OAuth2Callback; 