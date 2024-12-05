import axios from 'axios';

class ChatbotService {
  constructor() {
    this.apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    this.apiUrl = 'https://api.openai.com/v1/chat/completions';
  }

  async sendMessage(message, previousMessages) {
    try {
      const systemPrompt = `You are a UGC (User Generated Content) expert assistant. You help creators with:
      1. Content creation strategies
      2. Pricing guidelines
      3. Equipment recommendations
      4. Platform-specific best practices
      5. Client negotiation tips
      6. Portfolio development
      7. Industry trends
      
      Format your responses using proper markdown:
      - Use # for main headings
      - Use ## for subheadings
      - Use - for bullet points
      - Use numbered lists where appropriate
      - Use **bold** for emphasis
      - Use \`code\` for technical terms
      - Use > for important tips or quotes
      - Add --- for horizontal rules where needed
      - Add line breaks between sections
      - Maintain proper markdown hierarchy
      
      Keep responses concise, practical, and actionable. Use examples where helpful.`;

      const response = await axios.post(
        this.apiUrl,
        {
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            ...previousMessages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            { role: "user", content: message }
          ],
          temperature: 0.7,
          max_tokens: 500
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Clean up the response formatting
      let formattedResponse = response.data.choices[0].message.content;
      
      // Ensure proper line breaks around headings
      formattedResponse = formattedResponse
        .replace(/\n(#+ )/g, '\n\n$1')
        .replace(/(#+ .*)\n(?!#|\n)/g, '$1\n\n')
        // Ensure proper line breaks around lists
        .replace(/\n(- |\d+\. )/g, '\n\n$1')
        // Ensure proper line breaks around blockquotes
        .replace(/\n(>)/g, '\n\n$1')
        // Ensure proper line breaks around horizontal rules
        .replace(/\n(---)/g, '\n\n$1\n\n')
        // Remove excessive line breaks
        .replace(/\n{3,}/g, '\n\n');

      return formattedResponse;
    } catch (error) {
      console.error('Error in chatbot service:', error);
      throw new Error('Failed to get response from AI assistant');
    }
  }
}

export const chatbotService = new ChatbotService(); 