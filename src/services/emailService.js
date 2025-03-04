import { GmailService } from './gmailService';

export class EmailService {
  constructor(accessToken) {
    this.gmailService = new GmailService(accessToken);
  }

  /**
   * Sends an email to a single recipient
   * 
   * @param {string} to - Recipient email address
   * @param {string} subject - Email subject
   * @param {string} body - Email body (HTML allowed)
   * @returns {Promise<Object>} - Response from the Gmail API
   */
  async sendEmail(to, subject, body) {
    return this.gmailService.sendEmail(to, subject, body);
  }

  /**
   * Processes a template with variables and sends to multiple recipients
   * 
   * @param {Object} options - The options for bulk email sending
   * @param {string} options.template - Email template with variable placeholders
   * @param {string} options.subject - Email subject line
   * @param {Array<Object>} options.recipients - Array of recipient objects with variables
   * @param {Array<string>} options.variables - Array of variable names to replace in the template
   * @param {Function} options.onProgress - Callback function for progress updates (percent: number)
   * @returns {Promise<Object>} - Results of the bulk email operation
   */
  async sendBulkEmails({
    template,
    subject,
    recipients,
    variables,
    onProgress
  }) {
    const results = {
      total: recipients.length,
      successful: 0,
      failed: 0,
      errors: []
    };

    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i];
      
      // Skip recipients without email address
      if (!recipient.email_address) {
        results.failed++;
        results.errors.push({
          recipient,
          error: "Missing email address"
        });
        continue;
      }

      try {
        // Process template with variables
        let personalizedEmail = template;
        variables.forEach(variable => {
          const value = recipient[variable] || '';
          personalizedEmail = personalizedEmail.replace(
            new RegExp(`{{${variable}}}`, 'g'), 
            value
          );
        });

        // Send email
        await this.sendEmail(
          recipient.email_address,
          subject,
          personalizedEmail
        );
        
        results.successful++;
      } catch (error) {
        results.failed++;
        results.errors.push({
          recipient,
          error: error.message || "Unknown error"
        });
      }

      // Report progress
      if (onProgress && typeof onProgress === 'function') {
        const percentComplete = Math.round(((i + 1) / recipients.length) * 100);
        onProgress(percentComplete);
      }
    }

    return results;
  }
} 