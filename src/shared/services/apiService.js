import { httpClient } from '../security/httpClient';
import { InputValidator } from '../security/inputValidation';

class ApiService {
  // Contact form submission
  async submitContactForm(formData) {
    try {
      // Validate data before sending
      const validatedData = {
        name: InputValidator.validateName(formData.name),
        email: InputValidator.validateEmail(formData.email),
        message: InputValidator.validateMessage(formData.message)
      };

      const response = await httpClient.post('/api/contact', validatedData);
      return await response.json();
    } catch (error) {
      console.error('Contact form submission failed:', error);
      throw new Error('Failed to submit contact form');
    }
  }

  // Newsletter subscription
  async subscribeNewsletter(email) {
    try {
      const validatedEmail = InputValidator.validateEmail(email);
      const response = await httpClient.post('/api/newsletter', { email: validatedEmail });
      return await response.json();
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
      throw new Error('Failed to subscribe to newsletter');
    }
  }

  // Fetch blog posts securely
  async getBlogPosts(page = 1, limit = 10) {
    try {
      const response = await httpClient.get(`/api/blog?page=${page}&limit=${limit}`);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
      throw new Error('Failed to load blog posts');
    }
  }

  // Analytics tracking (secure)
  async trackEvent(eventName, eventData = {}) {
    try {
      // Sanitize event data
      const sanitizedData = Object.entries(eventData).reduce((acc, [key, value]) => {
        if (typeof value === 'string') {
          acc[key] = value.slice(0, 100); // Limit string length
        } else if (typeof value === 'number') {
          acc[key] = value;
        }
        return acc;
      }, {});

      await httpClient.post('/api/analytics', {
        event: eventName,
        data: sanitizedData,
        timestamp: Date.now()
      });
    } catch (error) {
      // Fail silently for analytics
      console.warn('Analytics tracking failed:', error);
    }
  }
}

export const apiService = new ApiService(); 