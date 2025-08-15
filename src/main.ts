import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Global error handler for ResizeObserver errors
if (typeof window !== 'undefined') {
  // Suppress ResizeObserver console errors
  const originalError = console.error;
  console.error = (...args: any[]) => {
    if (
      args[0]?.message?.includes('ResizeObserver loop completed with undelivered notifications') ||
      (typeof args[0] === 'string' && args[0].includes('ResizeObserver loop completed'))
    ) {
      return;
    }
    originalError.apply(console, args);
  };
  
  // Handle ResizeObserver errors globally
  window.addEventListener('error', (e) => {
    if (e.message?.includes('ResizeObserver loop completed with undelivered notifications')) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  // Handle unhandled promise rejections for ResizeObserver
  window.addEventListener('unhandledrejection', (e) => {
    if (e.reason?.message?.includes('ResizeObserver loop completed')) {
      e.preventDefault();
    }
  });
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
