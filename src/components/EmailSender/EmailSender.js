import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import './EmailSender.css';
import { EmailService } from '../../services/emailService';
import { GOOGLE_CLIENT_ID, GMAIL_SCOPES, getRedirectUri } from '../../config/google';
import { emailTemplates } from '../../templates/emailTemplates';
import sampleCsv from './sample-recipients.csv';
// Only import the debug component in development mode
const GoogleApiDebug = process.env.NODE_ENV === 'development' 
  ? require('./GoogleApiDebug').default 
  : () => null;

const EmailSender = () => {
  const [emailTemplate, setEmailTemplate] = useState('');
  const [variables, setVariables] = useState(['name', 'email_address', 'company', 'industry']);
  const [currentVariable, setCurrentVariable] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [sendingProgress, setSendingProgress] = useState(0);
  const [emailSubject, setEmailSubject] = useState('Message from UGC Cloud');
  const [isGapiLoaded, setIsGapiLoaded] = useState(false);
  const [isGsiLoaded, setIsGsiLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Load the Google Identity Services (GIS) library
  useEffect(() => {
    const loadGoogleIdentityServices = () => {
      // Check if the script is already loaded
      if (window.google && window.google.accounts) {
        setIsGsiLoaded(true);
        setIsLoading(false);
        return;
      }

      // Check if Client ID is available
      if (!GOOGLE_CLIENT_ID) {
        console.error("Google Client ID is not configured");
        setError(process.env.NODE_ENV === 'development' 
          ? 'Google Client ID is missing. Please configure your .env file with REACT_APP_GOOGLE_CLIENT_ID.'
          : 'Authentication configuration error. Please contact support.');
        setIsLoading(false);
        return;
      }

      // Create and load the GSI script
      console.log("Loading Google Identity Services script...");
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Google Identity Services script loaded successfully");
        setIsGsiLoaded(true);
        setIsLoading(false);
      };
      script.onerror = () => {
        console.error("Error loading Google Identity Services script");
        setError('Failed to load Google authentication. Please check your internet connection and try again.');
        setIsLoading(false);
      };
      document.body.appendChild(script);
    };

    // Load the Google API client library (still needed for Gmail API)
    const loadGoogleApi = () => {
      // Check if the script is already loaded
      if (window.gapi) {
        setIsGapiLoaded(true);
        return;
      }

      // Create and load the script
      console.log("Loading Google API script...");
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Google API script loaded successfully");
        setIsGapiLoaded(true);
        
        // Initialize GAPI client (only for API access, not for auth)
        window.gapi.load('client', async () => {
          try {
            console.log("Initializing GAPI client...");
            await window.gapi.client.init({
              apiKey: process.env.REACT_APP_GOOGLE_API_KEY || null,
              discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest']
            });
            console.log("GAPI client initialized successfully");
          } catch (error) {
            console.error("Error initializing GAPI client:", error);
          }
        });
      };
      script.onerror = () => {
        console.error("Error loading Google API script");
        setError('Failed to load Google API. Please check your internet connection and try again.');
        setIsLoading(false);
      };
      document.body.appendChild(script);
    };

    loadGoogleIdentityServices();
    loadGoogleApi();
  }, []);

  const handleCredentialResponse = (response) => {
    console.log("Google Identity Services authentication successful");
    
    // The response contains a credential with a JWT token
    const token = response.credential;
    
    // Decode the JWT to get user information
    const decodedToken = parseJwt(token);
    
    setUser({
      name: decodedToken.name,
      email: decodedToken.email,
      imageUrl: decodedToken.picture
    });
    
    // Get access token for Gmail API
    if (window.google && window.google.accounts && window.google.accounts.oauth2) {
      window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: GMAIL_SCOPES.join(' '),
        callback: (tokenResponse) => {
          if (tokenResponse.error) {
            console.error("Error getting access token:", tokenResponse.error);
            setError('Failed to get access to your Gmail account. Please try again.');
            setIsSigningIn(false);
            return;
          }
          
          setAccessToken(tokenResponse.access_token);
          setIsAuthenticated(true);
          setIsLoading(false);
          setIsSigningIn(false);
        }
      }).requestAccessToken();
    } else {
      console.error("Google oauth2 client not available");
      setError('Google authentication service not available. Please refresh the page and try again.');
      setIsSigningIn(false);
    }
  };
  
  // Helper function to parse JWT token
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error("Error parsing JWT token:", e);
      return {};
    }
  };

  const signIn = () => {
    setIsSigningIn(true);
    
    if (!isGsiLoaded) {
      console.error("Google Identity Services not loaded yet");
      setError('Google authentication is not initialized yet. Please wait or refresh the page.');
      setIsSigningIn(false);
      return;
    }
    
    try {
      // Create the Google Sign-In button directly and make it visible
      const googleButtonContainer = document.getElementById('google-signin-button');
      if (googleButtonContainer) {
        // Clear any previous content
        googleButtonContainer.innerHTML = '';
        
        // Make the container visible
        googleButtonContainer.style.display = 'flex';
        googleButtonContainer.style.visibility = 'visible';
        
        // Initialize Google Identity Services
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true
        });
        
        // Render the Google Sign-In button (and make it actually visible this time)
        window.google.accounts.id.renderButton(
          googleButtonContainer, 
          { 
            type: 'standard',
            theme: 'filled_blue', 
            size: 'large',
            text: 'signin_with',
            shape: 'rectangular',
            logo_alignment: 'left',
            width: 240
          }
        );
        
        // Don't use the prompt for now as it's causing issues
        // window.google.accounts.id.prompt();
      } else {
        console.error("Google sign-in button container not found");
        setError('Unable to render sign-in button. Please refresh the page.');
        setIsSigningIn(false);
      }
    } catch (error) {
      console.error("Error during sign-in initialization:", error);
      setError(`Failed to initialize sign-in. Error: ${error.message}`);
      setIsSigningIn(false);
    }
  };

  const signOut = () => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect();
      
      setUser(null);
      setAccessToken(null);
      setIsAuthenticated(false);
      
      console.log("User signed out");
    }
  };

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split('\n');
        const parsedRecipients = lines.map(line => {
          const values = line.split(',');
          const recipient = {};
          variables.forEach((variable, index) => {
            recipient[variable] = values[index]?.trim() || '';
          });
          return recipient;
        });
        setRecipients(parsedRecipients);
      };
      reader.readAsText(file);
    }
  }, [variables]);

  const addVariable = (e) => {
    e.preventDefault();
    if (currentVariable && !variables.includes(currentVariable)) {
      setVariables([...variables, currentVariable]);
      setCurrentVariable('');
    }
  };

  const removeVariable = (variableToRemove) => {
    if (variableToRemove !== 'name' && variableToRemove !== 'email_address') {
      setVariables(variables.filter(v => v !== variableToRemove));
    }
  };

  const sendEmails = async () => {
    if (!isAuthenticated || !accessToken) {
      setError('You must be signed in with Gmail to send emails.');
      return;
    }

    setIsSending(true);
    setError('');
    setSendingProgress(0);

    try {
      const emailService = new EmailService(accessToken);
      
      const results = await emailService.sendBulkEmails({
        template: emailTemplate,
        subject: emailSubject,
        recipients,
        variables,
        onProgress: (progress) => setSendingProgress(progress)
      });

      alert(`Emails sent: ${results.successful} successful, ${results.failed} failed.`);
      
      // Log any errors for debugging
      if (results.errors.length > 0) {
        console.log('Email sending errors:', results.errors);
      }
    } catch (error) {
      console.error('Error sending emails:', error);
      setError('Failed to send emails. Please try again.');
    } finally {
      setIsSending(false);
      setSendingProgress(0);
    }
  };

  // Handle template selection
  const handleTemplateSelection = (templateKey) => {
    const template = emailTemplates[templateKey];
    if (template) {
      setEmailTemplate(template.body);
      setEmailSubject(template.subject);
    }
  };

  return (
    <>
      <motion.div
        className="email-sender"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {!isAuthenticated ? (
          <div className="auth-section">
            <h2>Sign in with Gmail to Send Emails</h2>
            <p>
              UGC Cloud needs access to your Gmail account to send emails on your behalf.
              Your credentials are secure and we don't store your password.
            </p>
            
            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Initializing Google Sign-in...</p>
              </div>
            ) : (
              <>
                {!isSigningIn ? (
                  <button 
                    onClick={signIn} 
                    className="login-btn"
                    disabled={!isGsiLoaded || isLoading}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="white"/>
                    </svg>
                    Sign in with Google
                  </button>
                ) : (
                  <div className="signin-spinner-only">
                    <div className="spinner"></div>
                  </div>
                )}
                
                {/* Container for the Google Sign-in button - will be populated by the Google API */}
                <div id="google-signin-button" className="google-signin-container" style={{display: 'none'}}></div>
                
                {process.env.NODE_ENV === 'development' && !isGsiLoaded && !error && (
                  <div className="dev-notice">
                    <h4>Developer Information</h4>
                    <p>To complete Gmail integration, follow these steps:</p>
                    <ol>
                      <li>Create a project in <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">Google Cloud Console</a></li>
                      <li>Enable the Gmail API</li>
                      <li>Create OAuth credentials (Web application type)</li>
                      <li>Add <code>{window.location.origin}</code> to authorized JavaScript origins</li>
                      <li>Add <code>{getRedirectUri()}</code> to authorized redirect URIs</li>
                      <li>Copy your Client ID and add it to your environment variables</li>
                    </ol>
                  </div>
                )}
              </>
            )}
            
            {error && <div className="error-message">{error}</div>}
          </div>
        ) : (
          <>
            <div className="user-info">
              <div className="user-profile">
                {user?.imageUrl && <img src={user.imageUrl} alt={user.name} className="profile-image" />}
                <div>
                  <p>Signed in as: <strong>{user?.email}</strong></p>
                  <button onClick={signOut} className="sign-out-btn">Sign Out</button>
                </div>
              </div>
            </div>

            <div className="template-selection">
              <h3>Choose a Template</h3>
              <p className="help-text">Select a pre-built template or create your own</p>
              <div className="template-grid">
                {Object.entries(emailTemplates).map(([key, template]) => (
                  <div 
                    key={key} 
                    className="template-card"
                    onClick={() => handleTemplateSelection(key)}
                  >
                    <h4>{template.name}</h4>
                    <p>Subject: {template.subject}</p>
                    <button className="use-template-btn">Use Template</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="template-section">
              <h3>Email Template</h3>
              <div className="subject-input">
                <label htmlFor="email-subject">Email Subject:</label>
                <input
                  type="text"
                  id="email-subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Enter subject line"
                />
              </div>
              <p className="help-text">
                Use {'{{'}<span>variable_name</span>{'}}'}  to insert variables. Available fields:
                {variables.map(v => ` {{${v}}}`)}
              </p>
              <textarea
                value={emailTemplate}
                onChange={(e) => setEmailTemplate(e.target.value)}
                placeholder="Enter your email template here..."
                rows="10"
              />
            </div>

            <div className="variables-section">
              <h3>Dynamic Fields</h3>
              <div className="add-variable-form">
                <input
                  type="text"
                  value={currentVariable}
                  onChange={(e) => setCurrentVariable(e.target.value)}
                  placeholder="Add new field"
                />
                <button onClick={addVariable}>Add</button>
              </div>
              <div className="variables-list">
                {variables.map(variable => (
                  <div key={variable} className="variable-tag">
                    {variable}
                    {variable !== 'name' && variable !== 'email_address' && (
                      <button 
                        onClick={() => removeVariable(variable)}
                        className="remove-variable"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="recipients-section">
              <h3>Recipients</h3>
              <p className="help-text">
                Upload a CSV or TXT file with recipient information. The file should have columns matching your dynamic fields, 
                with each recipient on a new line.
              </p>
              <div className="csv-sample">
                <a href={sampleCsv} download="sample-recipients.csv" className="download-sample">
                  Download Sample CSV
                </a>
              </div>
              <div className="file-upload">
                <input
                  type="file"
                  accept=".txt,.csv"
                  onChange={handleFileUpload}
                  id="recipients-file"
                />
                <label htmlFor="recipients-file">
                  Upload Recipients File (.txt or .csv)
                </label>
              </div>
              {recipients.length > 0 && (
                <div className="recipients-preview">
                  <h4>Loaded {recipients.length} recipients</h4>
                  <div className="recipients-table">
                    <table>
                      <thead>
                        <tr>
                          {variables.map(v => (
                            <th key={v}>{v}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {recipients.slice(0, 5).map((recipient, index) => (
                          <tr key={index}>
                            {variables.map(v => (
                              <td key={v}>{recipient[v]}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {recipients.length > 5 && (
                      <p>And {recipients.length - 5} more...</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {error && <div className="error-message">{error}</div>}

            {isSending && (
              <div className="sending-progress">
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${sendingProgress}%` }}></div>
                </div>
                <p>Sending emails: {sendingProgress}% complete</p>
              </div>
            )}

            <button
              className="send-button"
              onClick={sendEmails}
              disabled={isSending || !recipients.length || !emailTemplate}
            >
              {isSending ? 'Sending...' : 'Send Emails'}
            </button>
          </>
        )}
      </motion.div>
      {process.env.NODE_ENV === 'development' && <GoogleApiDebug />}
    </>
  );
};

export default EmailSender; 