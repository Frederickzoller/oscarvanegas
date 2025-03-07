"use client"

import { useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';

export default function ErrorHandler({ children }) {
  useEffect(() => {
    // Add global error handler for uncaught errors
    const originalError = console.error;
    console.error = (...args) => {
      // Check if this is a wallet extension error
      const errorString = args.join(' ');
      if (
        errorString.includes('chrome-extension') || 
        errorString.includes('Converting circular structure to JSON')
      ) {
        // Just log it without crashing
        console.log('Suppressed extension error:', args);
        return;
      }
      // Otherwise, use the original error handler
      originalError.apply(console, args);
    };

    // Add global error handler for unhandled promise rejections
    const handleUnhandledRejection = (event) => {
      const errorString = event.reason?.toString() || '';
      if (
        errorString.includes('chrome-extension') || 
        errorString.includes('Converting circular structure to JSON')
      ) {
        // Prevent the default handling (which would crash the app)
        event.preventDefault();
        console.log('Suppressed extension promise rejection:', event.reason);
      }
    };
    
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Add global error handler for uncaught exceptions
    const handleError = (event) => {
      const errorString = event.error?.toString() || '';
      if (
        errorString.includes('chrome-extension') || 
        errorString.includes('Converting circular structure to JSON')
      ) {
        // Prevent the default handling (which would crash the app)
        event.preventDefault();
        console.log('Suppressed extension error:', event.error);
      }
    };
    
    window.addEventListener('error', handleError, { capture: true });

    return () => {
      // Clean up
      console.error = originalError;
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError, { capture: true });
    };
  }, []);

  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
} 