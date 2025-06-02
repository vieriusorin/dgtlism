// Content Security Policy helper
export const CSPDirectives = {
  // Strict CSP for production
  production: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'", // Remove in production if possible
      'https://cdn.jsdelivr.net',
      'https://unpkg.com'
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Needed for Tailwind
      'https://fonts.googleapis.com'
    ],
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com'
    ],
    'img-src': [
      "'self'",
      'data:',
      'https:'
    ],
    'connect-src': [
      "'self'",
      process.env.REACT_APP_API_URL
    ],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"]
  },

  // Relaxed CSP for development
  development: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'", // Needed for development
      'localhost:*',
      '127.0.0.1:*'
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'",
      'localhost:*'
    ],
    'connect-src': [
      "'self'",
      'localhost:*',
      'ws://localhost:*',
      'wss://localhost:*'
    ],
    'img-src': ["'self'", 'data:', 'https:', 'http:'],
    'font-src': ["'self'", 'data:', 'https:']
  }
};

// Generate CSP header string
export const generateCSPHeader = (environment = 'production') => {
  const directives = CSPDirectives[environment] || CSPDirectives.production;
  
  return Object.entries(directives)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ');
}; 