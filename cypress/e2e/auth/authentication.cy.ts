describe('Authentication and Leaderboard Flow', () => {
  beforeEach(() => {
    // Clear session storage and cookies before each test
    cy.clearCookies();
    cy.clearLocalStorage();
    
    // Mock API responses
    cy.intercept('POST', '**/auth/v1/token?grant_type=password', {
      statusCode: 200,
      body: {
        access_token: 'test-access-token',
        refresh_token: 'test-refresh-token',
        user: {
          id: 'test-user-id',
          email: 'test@example.com',
          user_metadata: {
            name: 'Test User'
          }
        }
      }
    }).as('loginRequest');
    
    cy.intercept('GET', '**/rest/v1/players*', {
      statusCode: 200,
      fixture: 'players.json'
    }).as('getPlayers');
    
    // Start from the login page before each test
    cy.visit('/login');
  });

  it('should allow a user to log in and view the leaderboard', () => {
    // Verify we're on the login page
    cy.url().should('include', '/login');
    cy.get('h1').should('contain', 'Sign In');
    
    // Fill in the login form
    const email = Cypress.env('testUserEmail') || 'test@example.com';
    const password = Cypress.env('testUserPassword') || 'Test123!';
    
    cy.get('input[id="email"]').type(email);
    cy.get('input[id="password"]').type(password, { log: false });
    
    // Submit the form
    cy.get('button[type="submit"]').click();
    
    // Wait for the login request to complete
    cy.wait('@loginRequest');
    
    // Verify we're redirected to the dashboard
    cy.url().should('include', '/dashboard');
    
    // Wait for the players data to load
    cy.wait('@getPlayers');
    
    // Verify the leaderboard is displayed
    cy.get('[data-cy="leaderboard"]').should('be.visible');
    
    // Verify player data is displayed
    cy.get('[data-cy="player-row"]').should('have.length.greaterThan', 0);
    
    // Test sorting functionality
    cy.get('[data-cy="sort-by-rp"]').click();
    cy.get('[data-cy="player-rp"]').then(($rps) => {
      // Convert the RP strings to numbers and check they're in descending order
      const rps = $rps.map((_, el) => parseInt(el.innerText.replace(/,/g, ''))).get();
      const sortedRps = [...rps].sort((a, b) => b - a);
      expect(rps).to.deep.equal(sortedRps);
    });
    
    // Test pagination
    cy.get('[data-cy="next-page"]').click();
    cy.get('[data-cy="current-page"]').should('contain', '2');
    
    // Test filtering
    cy.get('[data-cy="filter-tier"]').select('gold');
    cy.get('[data-cy="player-tier"]').each(($el) => {
      expect($el.text().toLowerCase()).to.equal('gold');
    });
    
    // Logout
    cy.get('[data-cy="user-menu"]').click();
    cy.get('[data-cy="logout-button"]').click();
    
    // Verify we're back at the login page
    cy.url().should('include', '/login');
  });

  it('should show an error for invalid login', () => {
    // Test with invalid credentials
    cy.get('input[id="email"]').type('invalid@example.com');
    cy.get('input[id="password"]').type('wrongpassword', { log: false });
    
    // Mock a failed login
    cy.intercept('POST', '**/auth/v1/token?grant_type=password', {
      statusCode: 400,
      body: {
        error: 'invalid_grant',
        error_description: 'Invalid login credentials'
      }
    }).as('failedLogin');
    
    cy.get('button[type="submit"]').click();
    
    // Wait for the failed login request
    cy.wait('@failedLogin');
    
    // Verify error message is displayed
    cy.get('[data-cy="error-message"]')
      .should('be.visible')
      .and('contain', 'Invalid login credentials');
      
    // Verify we're still on the login page
    cy.url().should('include', '/login');
  });
});
