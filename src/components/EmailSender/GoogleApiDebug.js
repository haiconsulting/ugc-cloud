import React, { useState, useEffect } from 'react';

const GoogleApiDebug = () => {
  const [debugInfo, setDebugInfo] = useState({
    gapiLoaded: false,
    auth2Loaded: false,
    clientId: null,
    error: null
  });

  useEffect(() => {
    const checkGoogleApi = () => {
      try {
        const info = {
          gapiLoaded: !!window.gapi,
          auth2Loaded: !!(window.gapi && window.gapi.auth2),
          clientId: null,
          error: null
        };

        if (info.gapiLoaded && window.gapi.client) {
          info.clientLoaded = true;
        }

        setDebugInfo(info);
      } catch (error) {
        setDebugInfo(prev => ({
          ...prev,
          error: error.message
        }));
      }
    };

    checkGoogleApi();
    const intervalId = setInterval(checkGoogleApi, 2000);

    return () => clearInterval(intervalId);
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <h4 style={{ margin: '0 0 5px', fontSize: '14px' }}>Google API Debug</h4>
      <div>
        <strong>GAPI Loaded:</strong> {debugInfo.gapiLoaded ? '✅' : '❌'}
      </div>
      <div>
        <strong>Auth2 Loaded:</strong> {debugInfo.auth2Loaded ? '✅' : '❌'}
      </div>
      <div>
        <strong>Client Loaded:</strong> {debugInfo.clientLoaded ? '✅' : '❌'}
      </div>
      {debugInfo.error && (
        <div style={{ color: 'red', marginTop: '5px' }}>
          <strong>Error:</strong> {debugInfo.error}
        </div>
      )}
      <div style={{ marginTop: '5px', fontSize: '10px', opacity: 0.7 }}>
        This debug panel only appears in development mode
      </div>
    </div>
  );
};

export default GoogleApiDebug; 