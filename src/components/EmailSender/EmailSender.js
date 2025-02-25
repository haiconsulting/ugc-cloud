import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import './EmailSender.css';

const EmailSender = () => {
  const [emailTemplate, setEmailTemplate] = useState('');
  const [variables, setVariables] = useState(['name', 'email_address']);
  const [currentVariable, setCurrentVariable] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

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
    setIsSending(true);
    setError('');

    try {
      // Simulate email sending
      for (const recipient of recipients) {
        let personalizedEmail = emailTemplate;
        variables.forEach(variable => {
          const value = recipient[variable] || '';
          personalizedEmail = personalizedEmail.replace(
            new RegExp(`{{${variable}}}`, 'g'), 
            value
          );
        });
        console.log(`Sending email to ${recipient.email_address}:`, personalizedEmail);
      }

      alert('Emails sent successfully! (Demo)');
    } catch (error) {
      console.error('Error sending emails:', error);
      setError('Failed to send emails. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.div
      className="email-sender"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="template-section">
        <h3>Email Template</h3>
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

      <button
        className="send-button"
        onClick={sendEmails}
        disabled={isSending || !recipients.length || !emailTemplate}
      >
        {isSending ? 'Sending...' : 'Send Emails (Demo)'}
      </button>
    </motion.div>
  );
};

export default EmailSender; 