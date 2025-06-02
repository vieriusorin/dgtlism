import React, { createContext, useContext, useEffect, useState } from 'react';
import { csrfProtection } from '../security/csrf';
import { generateCSPHeader } from '../security/contentSecurityPolicy';

const SecurityContext = createContext({});

export const useSecurityContext = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurityContext must be used within SecurityProvider');
  }
  return context;
};

export const SecurityProvider = ({ children }) => {
  const [isSecurityInitialized, setIsSecurityInitialized] = useState(false);
  const [securityStatus, setSecurityStatus] = useState({
    csrfProtected: false,
    cspEnabled: false,
    httpsEnforced: false
  });

  useEffect(() => {
    const initializeSecurity = async () => {
      try {
        // Initialize CSRF protection
        await csrfProtection.getToken();
        setSecurityStatus(prev => ({ ...prev, csrfProtected: true }));

        // Check HTTPS in production
        const httpsEnforced = process.env.NODE_ENV === 'production' 
          ? window.location.protocol === 'https:' 
          : true;
        setSecurityStatus(prev => ({ ...prev, httpsEnforced }));

        // Set CSP (if supported)
        if ('securityPolicy' in document) {
          const cspHeader = generateCSPHeader(process.env.NODE_ENV);
          setSecurityStatus(prev => ({ ...prev, cspEnabled: true }));
        }

        setIsSecurityInitialized(true);
      } catch (error) {
        console.error('Security initialization failed:', error);
      }
    };

    initializeSecurity();
  }, []);

  // Security violation handler
  const handleSecurityViolation = (violationType, details) => {
    console.warn(`Security violation detected: ${violationType}`, details);
    
    // In production, you might want to report this to your security monitoring
    if (process.env.NODE_ENV === 'production') {
      // Report to security monitoring service
      fetch('/api/security-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          violation: violationType,
          details,
          timestamp: Date.now(),
          userAgent: navigator.userAgent.substring(0, 200)
        })
      }).catch(() => {}); // Fail silently
    }
  };

  const value = {
    isSecurityInitialized,
    securityStatus,
    handleSecurityViolation,
    csrfProtection
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
}; 