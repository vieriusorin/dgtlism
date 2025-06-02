// CSRF Token Management
class CSRFProtection {
  constructor() {
    this.token = null;
    this.tokenExpiry = null;
  }

  // Get CSRF token from meta tag or API
  async getToken() {
    if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.token;
    }

    try {
      // Option 1: From meta tag (if server-rendered)
      const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      
      if (metaToken) {
        this.token = metaToken;
        this.tokenExpiry = Date.now() + (30 * 60 * 1000); // 30 minutes
        return this.token;
      }

      // Option 2: From API endpoint
      const response = await fetch('/api/csrf-token', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch CSRF token');
      }

      const data = await response.json();
      this.token = data.token;
      this.tokenExpiry = Date.now() + (30 * 60 * 1000);
      
      return this.token;
    } catch (error) {
      console.error('CSRF token fetch failed:', error);
      throw new Error('Security token unavailable');
    }
  }

  // Add CSRF token to request headers
  async getHeaders(additionalHeaders = {}) {
    const token = await this.getToken();
    
    return {
      'X-CSRF-Token': token,
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      ...additionalHeaders
    };
  }

  // Invalidate token (on logout, etc.)
  invalidateToken() {
    this.token = null;
    this.tokenExpiry = null;
  }
}

export const csrfProtection = new CSRFProtection(); 