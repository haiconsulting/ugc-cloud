# Deployment Guide for UGC Cloud Email Sender

This guide will walk you through the process of deploying the UGC Cloud Email Sender application to production with working Gmail integration.

## Prerequisites

- A Google Cloud Platform account
- Access to your hosting platform (e.g., Vercel, Netlify, AWS, etc.)
- Your domain name (if applicable)

## 1. Google Cloud Platform Setup

### Creating a Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your Project ID for future reference

### Enabling the Gmail API

1. In your Google Cloud project, navigate to "APIs & Services" > "Library"
2. Search for "Gmail API" and select it
3. Click "Enable" to activate the API for your project

### Setting Up OAuth Credentials

1. Navigate to "APIs & Services" > "Credentials"
2. Click "Create Credentials" and select "OAuth client ID"
3. Choose "Web application" as the application type
4. Give your OAuth client a name (e.g., "UGC Cloud Email Sender")
5. Add your production domain to "Authorized JavaScript origins":
   - Example: `https://your-app-domain.com`
6. Add your OAuth redirect URI to "Authorized redirect URIs":
   - Example: `https://your-app-domain.com/oauth2callback`
7. Click "Create"
8. Note your Client ID and Client Secret (though the client secret is not needed for client-side apps)

## 2. Environment Variables Setup

### For Vercel/Netlify/Similar Platforms

Add the following environment variables in your hosting platform's dashboard:

- `REACT_APP_PROD_GOOGLE_CLIENT_ID` - Your Google OAuth Client ID

### For Traditional Hosting

Create a `.env.production` file in your project root (do not commit this to version control):

```
REACT_APP_PROD_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

## 3. Building for Production

```bash
# Install dependencies if you haven't already
npm install

# Create a production build
npm run build
```

The build output will be in the `build` directory, ready for deployment.

## 4. Deploying to Production

### For Vercel

```bash
# Install Vercel CLI if not already installed
npm install -g vercel

# Deploy
vercel --prod
```

### For Netlify

```bash
# Install Netlify CLI if not already installed
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### For Traditional Hosting

Upload the contents of the `build` directory to your web server.

## 5. Setting Up Routes

Ensure your hosting platform is configured to handle client-side routing. This is crucial for the OAuth redirect to work properly.

### For Vercel/Netlify

Create a `vercel.json` or `netlify.toml` file to configure redirects:

#### Vercel (`vercel.json`):
```json
{
  "routes": [
    { "src": "/oauth2callback", "dest": "/index.html" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

#### Netlify (`netlify.toml`):
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### For Traditional Hosting

Configure your web server to redirect all requests to index.html:

#### Apache (.htaccess):
```
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

#### Nginx:
```
location / {
  try_files $uri $uri/ /index.html;
}
```

## 6. Testing OAuth Flow

1. Navigate to your deployed application
2. Click "Sign in with Google"
3. Complete the Google authentication flow
4. Verify that you are redirected back to your application and signed in

## 7. Troubleshooting

### OAuth Redirect Issues

- Verify that your redirect URI exactly matches what's configured in Google Cloud Console
- Check that your web server is properly handling the redirect to your React application
- Look at the browser console for any error messages

### API Access Issues

- Ensure the Gmail API is enabled in your Google Cloud Console
- Verify that you're using the correct scopes in your application

### CORS Issues

- Make sure your domain is correctly listed in the authorized JavaScript origins

## 8. Security Considerations

- Never commit your OAuth Client ID to version control
- Use environment variables for sensitive configuration
- Consider implementing additional security measures like CSRF protection

## Support

If you encounter issues with the deployment, please refer to:

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [React Router Documentation](https://reactrouter.com/en/main)
- Your hosting platform's documentation

If problems persist, please contact UGC Cloud support for assistance. 