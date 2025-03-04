import axios from 'axios';

export class GmailService {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  async sendEmail(to, subject, body) {
    try {
      // Create email in RFC 5322 format
      const email = [
        `From: me`,
        `To: ${to}`,
        `Subject: ${subject}`,
        'Content-Type: text/html; charset=utf-8',
        'MIME-Version: 1.0',
        '',
        body
      ].join('\r\n');

      // Use a safe version of btoa for potential Unicode characters
      const safeBase64 = (str) => {
        // First we escape the string using encodeURIComponent to get the UTF-8 encoding of the characters,
        // then we convert the percent encodings into raw bytes, and finally feed it to btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => 
          String.fromCharCode('0x' + p1)
        ));
      };

      const encodedEmail = safeBase64(email)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      // Send email using Gmail REST API
      const response = await axios.post(
        'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
        {
          raw: encodedEmail
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  // Helper method for Unicode-safe base64 encoding
  utf8ToBase64(str) {
    // First convert the string to UTF-8 bytes
    const utf8Encoder = new TextEncoder();
    const utf8Bytes = utf8Encoder.encode(str);
    
    // Convert the UTF-8 bytes to base64
    let base64 = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const byteLength = utf8Bytes.byteLength;
    const byteRemainder = byteLength % 3;
    const mainLength = byteLength - byteRemainder;
    
    // Process 3 bytes at a time
    for (let i = 0; i < mainLength; i += 3) {
      const chunk = (utf8Bytes[i] << 16) | (utf8Bytes[i + 1] << 8) | utf8Bytes[i + 2];
      base64 += chars[(chunk >> 18) & 63] + chars[(chunk >> 12) & 63] + chars[(chunk >> 6) & 63] + chars[chunk & 63];
    }
    
    // Handle remaining bytes
    if (byteRemainder === 1) {
      const chunk = utf8Bytes[mainLength];
      base64 += chars[(chunk >> 2) & 63] + chars[(chunk << 4) & 63] + '==';
    } else if (byteRemainder === 2) {
      const chunk = (utf8Bytes[mainLength] << 8) | utf8Bytes[mainLength + 1];
      base64 += chars[(chunk >> 10) & 63] + chars[(chunk >> 4) & 63] + chars[(chunk << 2) & 63] + '=';
    }
    
    return base64;
  }
} 