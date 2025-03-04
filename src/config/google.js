// Get client ID from environment variables based on environment
export const GOOGLE_CLIENT_ID = process.env.NODE_ENV === 'production' 
  ? process.env.REACT_APP_PROD_GOOGLE_CLIENT_ID 
  : process.env.REACT_APP_GOOGLE_CLIENT_ID;

// Only used if you need server-side functionality (not needed for most client-only implementations)
export const GOOGLE_CLIENT_SECRET = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_PROD_GOOGLE_CLIENT_SECRET
  : process.env.REACT_APP_GOOGLE_CLIENT_SECRET;

// OAuth scopes required for sending emails
export const GMAIL_SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.compose',
  'profile',
  'email'
];

// Get the current domain for OAuth redirect (handles both development and production)
export const getRedirectUri = () => {
  const domain = window.location.origin;
  return `${domain}/oauth2callback`;
};

// Instructions for configuring OAuth:
/*
Development Environment:
1. Create a project in Google Cloud Console (https://console.cloud.google.com/)
2. Enable the Gmail API
3. Create OAuth credentials (Web application type)
4. Add http://localhost:3000 to the authorized JavaScript origins
5. Add http://localhost:3000/oauth2callback to the authorized redirect URIs
6. Create a .env.local file in your project root with:
   REACT_APP_GOOGLE_CLIENT_ID=your-development-client-id.apps.googleusercontent.com

Production Environment:
1. In the same Google Cloud Console project, add your production domain 
   (e.g., https://yourapp.com) to the authorized JavaScript origins
2. Add your production redirect URI (e.g., https://yourapp.com/oauth2callback) 
   to the authorized redirect URIs
3. Configure your production environment variables:
   REACT_APP_PROD_GOOGLE_CLIENT_ID=your-production-client-id.apps.googleusercontent.com

Note: You can use the same client ID for both environments, but it's recommended to use 
separate ones for security and tracking purposes.
*/ 