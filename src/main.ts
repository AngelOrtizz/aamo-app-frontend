import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Suppress ResizeObserver errors in production
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    if (args[0]?.message?.includes('ResizeObserver loop completed with undelivered notifications')) {
      return;
    }
    originalError.apply(console, args);
  };
  
  // Handle ResizeObserver errors globally
  window.addEventListener('error', (e) => {
    if (e.message?.includes('ResizeObserver loop completed with undelivered notifications')) {
      e.preventDefault();
    }
  });
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
