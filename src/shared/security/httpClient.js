import { csrfProtection } from './csrf';

// Secure HTTP client with CSRF protection
class SecureHttpClient {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || '';
    this.timeout = 10000; // 10 seconds
  }

  // Input sanitization
  sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    return input
      .replace(/[<>]/g, '') // Remove potential XSS characters
      .trim()
      .slice(0, 1000); // Limit input length
  }

  // Validate URL to prevent open redirects
  validateURL(url) {
    try {
      const urlObj = new URL(url, window.location.origin);
      
      // Only allow same origin or explicitly allowed domains
      const allowedDomains = [
        window.location.hostname,
        'api.yourdomain.com',
        'cdn.yourdomain.com'
      ];
      
      return allowedDomains.includes(urlObj.hostname);
    } catch {
      return false;
    }
  }

  // Secure fetch wrapper
  async secureRequest(endpoint, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      // Validate endpoint
      if (!this.validateURL(`${this.baseURL}${endpoint}`)) {
        throw new Error('Invalid endpoint URL');
      }

      // Get CSRF headers for state-changing requests
      let headers = options.headers || {};
      
      if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method?.toUpperCase())) {
        headers = await csrfProtection.getHeaders(headers);
      }

      // Sanitize request body
      let body = options.body;
      if (body && typeof body === 'object') {
        body = JSON.stringify(this.sanitizeObjectInputs(body));
      }

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
        body,
        credentials: 'same-origin',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Check for security headers in response
      this.validateResponseHeaders(response);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      
      throw error;
    }
  }

  // Recursively sanitize object inputs
  sanitizeObjectInputs(obj) {
    const sanitized = {};
    
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        sanitized[key] = this.sanitizeInput(value);
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeObjectInputs(value);
      } else {
        sanitized[key] = value;
      }
    }
    
    return sanitized;
  }

  // Validate security headers
  validateResponseHeaders(response) {
    const requiredHeaders = [
      'x-content-type-options',
      'x-frame-options',
      'x-xss-protection'
    ];

    const missingHeaders = requiredHeaders.filter(
      header => !response.headers.get(header)
    );

    if (missingHeaders.length > 0) {
      console.warn('Missing security headers:', missingHeaders);
    }
  }

  // Convenience methods
  async get(endpoint, options = {}) {
    return this.secureRequest(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint, data, options = {}) {
    return this.secureRequest(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data, options = {}) {
    return this.secureRequest(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint, options = {}) {
    return this.secureRequest(endpoint, { ...options, method: 'DELETE' });
  }
}

export const httpClient = new SecureHttpClient(); 