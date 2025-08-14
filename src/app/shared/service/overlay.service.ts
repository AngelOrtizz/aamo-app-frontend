import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  constructor() {
    this.injectOverlayFix();
  }

  private injectOverlayFix(): void {
    // Inject CSS to completely disable overlay backdrops including tooltips and snackbars
    const style = document.createElement('style');
    style.textContent = `
      .cdk-overlay-backdrop,
      .cdk-overlay-backdrop.cdk-overlay-backdrop-showing,
      .cdk-overlay-dark-backdrop,
      .mat-tooltip-backdrop,
      .mat-overlay-backdrop,
      .mat-snack-bar-backdrop {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        background: transparent !important;
        pointer-events: none !important;
        backdrop-filter: none !important;
      }
      
      /* Ensure tooltips don't create backdrops */
      .mat-tooltip-panel {
        backdrop-filter: none !important;
      }
      
      /* Prevent any overlay from darkening the screen */
      .cdk-overlay-container * {
        backdrop-filter: none !important;
        background-color: transparent !important;
      }
      
      /* Enhanced snackbar error styling - MUST be red */
      .error-snackbar,
      .mat-snack-bar-container .error-snackbar {
        background-color: #ef4444 !important;
        color: white !important;
        border-radius: 8px !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        font-weight: 500 !important;
        border: 2px solid #dc2626 !important;
      }
      
      /* Enhanced snackbar success styling - MUST be green */
      .success-snackbar,
      .mat-snack-bar-container .success-snackbar {
        background-color: #22c55e !important;
        color: white !important;
        border-radius: 8px !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        font-weight: 500 !important;
        border: 2px solid #16a34a !important;
      }
      
      .mat-snack-bar-container {
        z-index: 1002 !important;
      }
      
      /* Force all backdrops to be completely transparent */
      .cdk-global-overlay-wrapper .cdk-overlay-backdrop,
      .cdk-overlay-container .cdk-overlay-backdrop {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        background: transparent !important;
        backdrop-filter: none !important;
      }
    `;
    document.head.appendChild(style);

    // Also monitor for dynamic backdrop creation and remove them aggressively
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            // Remove any backdrop elements
            const backdrops = node.querySelectorAll('.cdk-overlay-backdrop, .mat-tooltip-backdrop, .mat-overlay-backdrop, .mat-snack-bar-backdrop');
            backdrops.forEach(backdrop => {
              (backdrop as HTMLElement).style.display = 'none';
              (backdrop as HTMLElement).style.opacity = '0';
              (backdrop as HTMLElement).style.visibility = 'hidden';
              (backdrop as HTMLElement).style.pointerEvents = 'none';
              (backdrop as HTMLElement).style.background = 'transparent';
              (backdrop as HTMLElement).style.backdropFilter = 'none';
            });
            
            // Also check if the node itself is a backdrop
            if (node.classList.contains('cdk-overlay-backdrop') || 
                node.classList.contains('mat-tooltip-backdrop') ||
                node.classList.contains('mat-overlay-backdrop') ||
                node.classList.contains('mat-snack-bar-backdrop')) {
              (node as HTMLElement).style.display = 'none';
              (node as HTMLElement).style.opacity = '0';
              (node as HTMLElement).style.visibility = 'hidden';
              (node as HTMLElement).style.pointerEvents = 'none';
              (node as HTMLElement).style.background = 'transparent';
              (node as HTMLElement).style.backdropFilter = 'none';
            }
            
            // Ensure snackbar errors stay red
            if (node.classList.contains('error-snackbar') || 
                node.querySelector('.error-snackbar')) {
              const errorSnackbar = node.classList.contains('error-snackbar') ? node : node.querySelector('.error-snackbar');
              if (errorSnackbar) {
                (errorSnackbar as HTMLElement).style.backgroundColor = '#ef4444';
                (errorSnackbar as HTMLElement).style.color = 'white';
              }
            }
            
            // Ensure success snackbars stay green
            if (node.classList.contains('success-snackbar') || 
                node.querySelector('.success-snackbar')) {
              const successSnackbar = node.classList.contains('success-snackbar') ? node : node.querySelector('.success-snackbar');
              if (successSnackbar) {
                (successSnackbar as HTMLElement).style.backgroundColor = '#22c55e';
                (successSnackbar as HTMLElement).style.color = 'white';
                (successSnackbar as HTMLElement).style.border = '2px solid #16a34a';
              }
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}
