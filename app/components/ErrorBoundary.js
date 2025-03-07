"use client"

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.log('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Check if the error is from a browser extension
      const errorString = this.state.error?.toString() || '';
      const isExtensionError = errorString.includes('chrome-extension://') || 
                              errorString.includes('Converting circular structure to JSON');
      
      // If it's an extension error, just render the children anyway
      if (isExtensionError) {
        // Reset the error state so the app can continue
        this.setState({ hasError: false, error: null });
        return this.props.children;
      }
      
      // For other errors, show a fallback UI
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Something went wrong.</h2>
          <p>Please try refreshing the page.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            style={{
              padding: '8px 16px',
              background: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 