describe('Booking page Automation testing page', () => {
        // Prevent React hydration errors from failing tests
        Cypress.on('uncaught:exception', (err) => {
          if (
            err.message.includes('Minified React error #418') ||
            err.message.includes('Minified React error #423')
          ) {
            return false; // ignore these specific errors
          }
        });
      
        beforeEach(() => {
          cy.visit('https://automationintesting.online/');
        });
      
        it('should load successfully', () => {
          cy.url().should('include', 'automationintesting.online');
        });
      
        it('should display the correct page title', () => {
          cy.get('img.hotel-logoUrl')
            .should('be.visible')
            .and('have.attr', 'alt', 'Hotel logoUrl');
        });
      
      });