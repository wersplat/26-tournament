// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err) => {
  console.error('Uncaught exception in test:', err);
  // Return false to prevent the error from failing the test
  return false;
});

// Add custom commands here
// For example:
// Cypress.Commands.add('login', (email, password) => { ... })
