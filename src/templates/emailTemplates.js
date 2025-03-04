export const emailTemplates = {
  basic: {
    name: "Basic Introduction",
    subject: "Hello from {{name}} at UGC Cloud",
    body: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
    }
    .header {
      padding: 20px 0;
      text-align: center;
      border-bottom: 1px solid #eee;
    }
    .content {
      padding: 20px 0;
    }
    .footer {
      padding: 20px 0;
      text-align: center;
      border-top: 1px solid #eee;
      font-size: 12px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="header">
    <h2>Hello from UGC Cloud</h2>
  </div>
  <div class="content">
    <p>Hi {{name}},</p>
    <p>I hope this email finds you well. I'm reaching out from UGC Cloud, a platform dedicated to helping content creators like yourself succeed.</p>
    <p>We noticed your work in the {{industry}} industry and thought our services might be a good fit for your needs.</p>
    <p>Would you be available for a quick 15-minute call to discuss how we might be able to help {{company}} reach its content goals?</p>
    <p>Looking forward to connecting!</p>
    <p>Best regards,<br>{{name}}</p>
  </div>
  <div class="footer">
    <p>UGC Cloud - Empowering Content Creators Worldwide</p>
    <p>This email was sent to {{email_address}}</p>
  </div>
</body>
</html>
    `
  },
  
  followUp: {
    name: "Follow-up After Meeting",
    subject: "Follow-up: Our conversation about UGC Cloud",
    body: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
    }
    .header {
      padding: 20px 0;
      text-align: center;
      border-bottom: 1px solid #eee;
    }
    .content {
      padding: 20px 0;
    }
    .footer {
      padding: 20px 0;
      text-align: center;
      border-top: 1px solid #eee;
      font-size: 12px;
      color: #777;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #2196F3;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h2>Thank You for Your Time</h2>
  </div>
  <div class="content">
    <p>Hi {{name}},</p>
    <p>Thank you for taking the time to speak with me today about UGC Cloud and how we can help {{company}} with your content strategy.</p>
    <p>As discussed, here are the key points we covered:</p>
    <ul>
      <li>Creating engaging content tailored to your {{industry}} audience</li>
      <li>Streamlining your content production process</li>
      <li>Measuring the impact of your content initiatives</li>
    </ul>
    <p>I've attached the resources we discussed to this email. Please let me know if you have any questions.</p>
    <p>Would you like to schedule a follow-up meeting to discuss next steps?</p>
    <a href="#" class="button">Schedule Follow-up</a>
    <p>Looking forward to working with you!</p>
    <p>Best regards,<br>{{name}}</p>
  </div>
  <div class="footer">
    <p>UGC Cloud - Empowering Content Creators Worldwide</p>
    <p>This email was sent to {{email_address}}</p>
  </div>
</body>
</html>
    `
  },
  
  promotion: {
    name: "Promotional Offer",
    subject: "Special Offer for {{company}} from UGC Cloud",
    body: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
    }
    .header {
      padding: 20px 0;
      text-align: center;
      border-bottom: 1px solid #eee;
      background-color: #f5f5f5;
    }
    .content {
      padding: 20px 0;
    }
    .offer {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      margin: 20px 0;
      border: 1px solid #eee;
    }
    .offer h3 {
      color: #2196F3;
    }
    .cta-button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #2196F3;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      margin: 20px 0;
      font-weight: bold;
    }
    .footer {
      padding: 20px 0;
      text-align: center;
      border-top: 1px solid #eee;
      font-size: 12px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="header">
    <h2>Special Offer Just for You</h2>
  </div>
  <div class="content">
    <p>Hi {{name}},</p>
    <p>We value {{company}} as a leader in the {{industry}} industry, which is why we wanted to extend this exclusive offer to you.</p>
    
    <div class="offer">
      <h3>Limited Time Offer</h3>
      <p>Get 20% off your first month of UGC Cloud Premium when you sign up before the end of the month.</p>
      <p>Use code: <strong>UGCPREMIUM20</strong></p>
      <a href="#" class="cta-button">Claim Your Discount</a>
    </div>
    
    <p>With UGC Cloud Premium, you'll get:</p>
    <ul>
      <li>Advanced analytics and reporting</li>
      <li>Priority support from our team of experts</li>
      <li>Access to exclusive {{industry}}-specific content templates</li>
      <li>Collaboration tools for your entire team</li>
    </ul>
    
    <p>This offer is only available for a limited time, so don't miss out!</p>
    <p>Best regards,<br>{{name}}</p>
  </div>
  <div class="footer">
    <p>UGC Cloud - Empowering Content Creators Worldwide</p>
    <p>This email was sent to {{email_address}}</p>
    <p>If you no longer wish to receive promotional emails, <a href="#">unsubscribe here</a>.</p>
  </div>
</body>
</html>
    `
  }
}; 