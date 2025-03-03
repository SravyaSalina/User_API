// ***********************************************
// This example commands.js shows you how to
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

// cypress/support/index.js

import './commands';  // This imports the commands.js file, which contains the custom cy.login


// cypress/support/commands.js

Cypress.Commands.add('login', (email, password, isValid = true) => {

    const loginUrl = 'https://demo.atforte.com/api/login';
  
    // Send login request
    cy.request({
      method: 'POST',
      url: loginUrl,
      failOnStatusCode: false,  // This will prevent the test from failing on status codes like 400 or 401
      body: {
        email: email,
        password: password,
      },
    }).then((response) => {
      // Handle valid login response
      if (isValid) {
        expect(response.status).to.eq(200); // Successful login should return 200
        expect(response.body.status).to.eq('success');
      } else {
        // Handle invalid login response
        expect(response.status).to.be.oneOf([400, 401]); // Invalid login should return 400 or 401
        expect(response.body.status).to.eq('error');
        expect(response.body.message).to.eq('Invalid email or password');  
      }
    });
  });
  

  
  
  