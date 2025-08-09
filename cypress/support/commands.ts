// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// Custom command for logging in
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  
  // Wait for the login form to be visible
  cy.get('input[id="email"]').should('be.visible');
  
  // Fill in the login form
  cy.get('input[id="email"]').type(email);
  cy.get('input[id="password"]').type(password, { log: false });
  
  // Click the login button
  cy.get('button[type="submit"]').click();
  
  // Verify successful login by checking for a dashboard element
  cy.url().should('include', '/dashboard');
});

// Custom command for logging out
Cypress.Commands.add('logout', () => {
  // Click the logout button - adjust the selector based on your app's UI
  cy.get('[data-cy="user-menu"]').click();
  cy.get('[data-cy="logout-button"]').click();
  
  // Verify we're back at the login page
  cy.url().should('include', '/login');
});

// Custom command to check for accessibility issues
Cypress.Commands.add('checkA11yWithLogs', () => {
  cy.injectAxe();
  cy.checkA11y(
    {
      // Run the check on the whole page
      include: [['body']],
      // Skip these elements that might have dynamic content
      exclude: [
        ['[data-cy=dynamic-content]'],
      ],
    },
    {
      // Configure the rules to skip
      rules: {
        'color-contrast': { enabled: false }, // Disable color contrast checking
        'region': { enabled: false } // Disable region checking for now
      }
    },
    (violations) => {
      // Log each accessibility violation
      violations.forEach((violation) => {
        const nodes = violation.nodes.map(({ target, html }) => ({
          target: target[0],
          html
        }));
        
        cy.log(
          `[A11Y] ${violation.help} (${violation.id}) - ${violation.impact}`,
          nodes
        );
      });
    },
    false // Don't fail the test on accessibility violations
  );
});

// Add TypeScript support for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      logout(): Chainable<void>;
      checkA11yWithLogs(): Chainable<void>;
    }
  }
}
