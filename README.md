# UGC Cloud Email Sender

A React component for sending personalized emails to multiple recipients using the Gmail API.

## Features

- 🔐 Google OAuth Authentication
- 📧 Send emails to multiple recipients
- 🔄 Personalization using template variables
- 📝 Rich text editor for email composition
- 📎 File attachment support (coming soon)
- 📊 Email sending statistics

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- A Google Cloud project with the Gmail API enabled

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ugc-cloud.git
cd ugc-cloud
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the project root with your Google OAuth Client ID:
```
REACT_APP_DEV_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

### Google API Setup (Development)

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Gmail API for your project
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/oauth2callback`
5. Copy the Client ID to your `.env.local` file

### Running the Development Server

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Usage

### Signing In

1. Navigate to the Email Sender page
2. Click "Sign in with Google"
3. Follow the prompts to authorize the application to access your Gmail account

### Sending Emails

1. Upload a CSV file containing recipient data with headers
2. Compose your email using the rich text editor
3. Add personalization using template variables (e.g., `{{firstName}}`, `{{company}}`)
4. Review your email and send!

### CSV Format

Your CSV file should include the following headers:
- `email` (required): The recipient's email address
- Any other fields you want to use for personalization

Example:
```
email,firstName,lastName,company
john.doe@example.com,John,Doe,ACME Inc.
jane.smith@example.com,Jane,Smith,XYZ Corp.
```

## Production Deployment

For instructions on deploying this application to production, please see the [Deployment Guide](DEPLOYMENT.md).

## Development

### Project Structure

```
src/
├── components/
│   ├── EmailSender/         # Main email sender component
│   │   ├── EmailSender.js
│   │   └── EmailSender.css
│   └── Auth/                # Authentication components
│       ├── OAuth2Callback.js
│       └── OAuth2Callback.css
├── services/
│   ├── gmailService.js      # Gmail API interactions
│   └── emailService.js      # Email processing logic
├── config/
│   └── google.js            # Google API configuration
└── App.js                   # Main application component
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Google Gmail API](https://developers.google.com/gmail/api)
- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)