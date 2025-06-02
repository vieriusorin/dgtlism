import React from 'react';

class SecurityErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorType: null };
  }

  static getDerivedStateFromError(error) {
    // Categorize security-related errors
    const securityKeywords = ['csrf', 'xss', 'security', 'token', 'unauthorized'];
    const isSecurityError = securityKeywords.some(keyword => 
      error.message.toLowerCase().includes(keyword)
    );

    return {
      hasError: true,
      errorType: isSecurityError ? 'security' : 'general'
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log security errors for monitoring
    if (this.state.errorType === 'security') {
      console.error('Security error detected:', error, errorInfo);
      
      // In production, report to security monitoring
      if (process.env.NODE_ENV === 'production') {
        fetch('/api/security-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            error: error.message,
            stack: error.stack,
            errorInfo,
            timestamp: Date.now()
          })
        }).catch(() => {});
      }
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.state.errorType === 'security') {
        return (
          <div className='min-h-screen bg-black text-white flex items-center justify-center p-6'>
            <div className='max-w-md text-center space-y-4'>
              <h2 className='text-2xl font-bold text-red-400'>Security Notice</h2>
              <p className='text-gray-300'>
                A security issue was detected. Please refresh the page and try again.
              </p>
              <button 
                onClick={() => window.location.reload()}
                className='px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors'
              >
                Refresh Page
              </button>
            </div>
          </div>
        );
      }

      // General error fallback
      return (
        <div className='min-h-screen bg-black text-white flex items-center justify-center p-6'>
          <div className='max-w-md text-center space-y-4'>
            <h2 className='text-2xl font-bold'>Something went wrong</h2>
            <p className='text-gray-300'>Please refresh the page and try again.</p>
            <button 
              onClick={() => this.setState({ hasError: false })}
              className='px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors'
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SecurityErrorBoundary; 