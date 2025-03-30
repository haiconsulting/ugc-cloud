/**
 * Apply button styling classes to existing buttons
 * This can be imported and called in App.js or index.js
 */
export const applyButtonStyles = () => {
  // Apply primary button styles
  document.querySelectorAll(
    '.get-started-btn, .backup-btn, .import-btn, .create-post-btn, ' +
    '.category-btn, .tab-button.active, .submit-button, .purchase-button, ' +
    '.login-btn, .action-button, .select-plan-button, .preview-button'
  ).forEach(button => {
    button.classList.add('btn-primary', 'btn-rounded', 'btn-ripple');
  });

  // Apply secondary button styles
  document.querySelectorAll(
    '.button-secondary, .cancel-button, .share-button'
  ).forEach(button => {
    button.classList.add('btn-secondary', 'btn-rounded');
  });
  
  // Apply pill style to specific buttons
  document.querySelectorAll(
    '.login-btn, .get-started-btn'
  ).forEach(button => {
    button.classList.remove('btn-rounded');
    button.classList.add('btn-pill');
  });
}; 