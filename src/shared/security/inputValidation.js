// Input validation and sanitization
export class InputValidator {
  // Email validation
  static validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const maxLength = 254; // RFC 5321 limit
    
    if (!email || typeof email !== 'string') {
      throw new Error('Email is required and must be a string');
    }
    
    if (email.length > maxLength) {
      throw new Error('Email is too long');
    }
    
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
    
    return email.toLowerCase().trim();
  }

  // Name validation
  static validateName(name, field = 'Name') {
    if (!name || typeof name !== 'string') {
      throw new Error(`${field} is required and must be a string`);
    }
    
    const cleaned = name.trim();
    
    if (cleaned.length < 1) {
      throw new Error(`${field} cannot be empty`);
    }
    
    if (cleaned.length > 100) {
      throw new Error(`${field} is too long (max 100 characters)`);
    }
    
    // Allow letters, spaces, hyphens, apostrophes
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    if (!nameRegex.test(cleaned)) {
      throw new Error(`${field} contains invalid characters`);
    }
    
    return cleaned;
  }

  // Message validation
  static validateMessage(message) {
    if (!message || typeof message !== 'string') {
      throw new Error('Message is required and must be a string');
    }
    
    const cleaned = message.trim();
    
    if (cleaned.length < 10) {
      throw new Error('Message must be at least 10 characters');
    }
    
    if (cleaned.length > 5000) {
      throw new Error('Message is too long (max 5000 characters)');
    }
    
    // Basic XSS prevention
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi
    ];
    
    for (const pattern of xssPatterns) {
      if (pattern.test(cleaned)) {
        throw new Error('Message contains invalid content');
      }
    }
    
    return cleaned;
  }

  // URL validation
  static validateURL(url, allowedDomains = []) {
    try {
      const urlObj = new URL(url);
      
      // Only allow HTTPS in production
      if (process.env.NODE_ENV === 'production' && urlObj.protocol !== 'https:') {
        throw new Error('Only HTTPS URLs are allowed');
      }
      
      // Check allowed domains
      if (allowedDomains.length > 0 && !allowedDomains.includes(urlObj.hostname)) {
        throw new Error('Domain not allowed');
      }
      
      return url;
    } catch (error) {
      throw new Error('Invalid URL format');
    }
  }
} 