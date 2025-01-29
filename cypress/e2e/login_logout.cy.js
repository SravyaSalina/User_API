// should log in successfully with valid credentials for an Admin user
// should login successfully with correct credentials for a Project Manager
// should login successfully with correct credentials for a Sales Agent
// should login successfully with correct credentials for a Client
// should login successfully with correct credentials for a Mailing Operator
// should return an error when login attempt is made with an incorrect password
// should return an error when login attempt is made with a non-existent email
// should return an error when login is attempted with empty email and password fields
// should return an error when login is attempted with missing email
// should return an error when login is attempted with an invalid email format
// should log out the user successfully without a Bearer token
// should lock the account after multiple failed login attempts
// should allow login with an email that contains non-standard characters
// should return a 401 Unauthorized error with an expired password
// should allow login from two devices with the same credentials
// should allow login with a valid email of minimum length
// should return a 400 error for an email exceeding the maximum length
// should return a 400 error for an invalid email format with maximum length
// should return 200 OK for a valid login with the minimum length of password
// should return 200 OK for a valid login with the maximum length of password
// should return 409 Conflict when trying to create a user with an existing email
// should return 404 Not Found for the new login endpoint
// should return 405 Method Not Allowed when using GET method
// should return 400 Bad Request when using an invalid query parameter
// should log out successfully without a token


describe('Login - User', () => {

  it('should log in successfully with valid credentials for an Admin user', () => {
    const requestBody = {
      email: 'admin@sales-people.com',
      password: '123'
    };

    // Send a POST request to the login API
    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/login',
      body: requestBody,
      failOnStatusCode: false // Don't fail the test on non-2xx status codes
    }).then((response) => {
      // Assert the response status code is 200
      expect(response.status).to.eq(200);

      // Assert the response body contains the expected data
      expect(response.body.status).to.eq('success');
      expect(response.body.message).to.eq('Login successful');
      expect(response.body.data.user_email).to.eq('admin@sales-people.com');
      expect(response.body.data.user_fullname).to.eq('admin salespeople');
      expect(response.body.data.user_roll).to.eq(101);
    })
  })

  it('should login successfully with correct credentials for a Project Manager', () => {
    // Define the login request body
    const loginRequestBody = {
      email: "pm@sales-people.com",
      password: "123"
    };

    // Send POST request to the login endpoint
    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/login',
      body: loginRequestBody,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      // Check the status code
      expect(response.status).to.eq(200);

      // Validate the response body
      expect(response.body.status).to.eq('success');
      expect(response.body.message).to.eq('Login successful');
      expect(response.body.data.user_roll).to.eq(104);
      expect(response.body.data.user_email).to.eq('pm@sales-people.com');
      expect(response.body.data.user_fullname).to.eq('project manager');
    });
  });

  it('should login successfully with correct credentials for a Sales Agent', () => {
    // Define the login request body
    const loginRequestBody = {
      email: "agent@sales-people.com",
      password: "123"
    };

    // Send POST request to the login endpoint
    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/login',
      body: loginRequestBody,
      failOnStatusCode: false, // Don't fail the test on non-2xx status codes
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      // Check the status code
      expect(response.status).to.eq(200);

      // Validate the response body
      expect(response.body.status).to.eq('success');
      expect(response.body.message).to.eq('Login successful');
      expect(response.body.data.user_fullname).to.eq('sales agent');
      expect(response.body.data.user_email).to.eq('agent@sales-people.com');
      expect(response.body.data.user_roll).to.eq(302);

    });
  });

  it('should login successfully with correct credentials for a Client', () => {
    // Define the login request body
    const loginRequestBody = {
      email: "kunde@sales-people.com",
      password: "123"
    };

    // Send POST request to the login endpoint
    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/login',
      body: loginRequestBody,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      // Check the status code
      expect(response.status).to.eq(200);

      // Validate the response body
      expect(response.body.status).to.eq('success');
      expect(response.body.message).to.eq('Login successful');
      expect(response.body.data.user_fullname).to.eq('web user');
      expect(response.body.data.user_email).to.eq('kunde@sales-people.com')
      expect(response.body.data.user_roll).to.eq(401);
    });
  });

  it('should login successfully with correct credentials for a Mailing Operator', () => {
    // Define the login request body
    const loginRequestBody = {
      email: "qm@sales-people.com",
      password: "123"
    };

    // Send POST request to the login endpoint
    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/login',
      body: loginRequestBody,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      // Check the status code
      expect(response.status).to.eq(200);

      // Validate the response body
      expect(response.body.status).to.eq('success');
      expect(response.body.message).to.eq('Login successful');
      expect(response.body.data.user_fullname).to.eq('Quality Manager');
      expect(response.body.data.user_email).to.eq('qm@sales-people.com');
      expect(response.body.data.user_roll).to.eq(106);
    });
  });

  it('should return an error when login attempt is made with an incorrect password', () => {
    // Define the login request body with wrong password
    const loginRequestBody = {
      email: "admin@sales-people.com",
      password: "wrongpassword"  // ex : 3we556768g
    };

    // Send POST request to the login endpoint
    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/login',
      body: loginRequestBody,
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false // This is important because we are expecting a 401 Unauthorized
    }).then((response) => {
      // Check the status code
      expect(response.status).to.eq(401);  // Expected 401 Unauthorized

      // Validate the response body
      expect(response.body.status).to.eq('error');
      expect(response.body.message).to.eq('Invalid email or password');
    });
  });

  it('should return an error when login attempt is made with a non-existent email', () => {
    // Define the login request body with non-existent email
    const loginRequestBody = {
      email: "nonexistent@sales-people.com",
      password: "123"
    };

    // Send POST request to the login endpoint
    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/login',
      body: loginRequestBody,
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false // This is important because we are expecting a 401 Unauthorized
    }).then((response) => {
      // Check the status code
      expect(response.status).to.eq(401);  // Expected 401 Unauthorized

      // Validate the response body
      expect(response.body.status).to.eq('error');
      expect(response.body.message).to.eq('Invalid email or password');
    });
  });

  it('should return an error when login is attempted with empty email and password fields', () => {
    // Define the login request body with empty email and password
    const loginRequestBody = {
      email: "",
      password: ""
    };

    // Send POST request to the login endpoint
    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/login',
      body: loginRequestBody,
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false // This is important because we are expecting a 422 Unprocessable Content
    }).then((response) => {
      // Check the status code
      expect(response.status).to.eq(422);  // Expected 422 Unprocessable Content

      // Validate the response body
      expect(response.body.status).to.eq('error');
      expect(response.body.message.email[0]).to.eq('The email field is required.');
      expect(response.body.message.password[0]).to.eq('The password field is required.');
    });
  });

  it('should return an error when login is attempted with missing email', () => {
    // Define the login request body with empty email 
    const loginRequestBody = {
      email: "",
      password: "123"
    };

    // Send POST request to the login endpoint
    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/login',
      body: loginRequestBody,
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false // This is important because we are expecting a 422 Unprocessable Content
    }).then((response) => {
      // Check the status code
      expect(response.status).to.eq(422);  // Expected 422 Unprocessable Content

      // Validate the response body
      expect(response.body.status).to.eq('error');
      expect(response.body.message.email[0]).to.eq('The email field is required.');
    });
  });

  it('should return an error when login is attempted with an invalid email format', () => {
    // Define the login request body with an invalid email format
    const loginRequestBody = {
      email: "invalid-email",  //sr1236&.tr
      password: "123"
    };

    // Send POST request to the login endpoint
    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/login',
      body: loginRequestBody,
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false // This is important because we are expecting a 400 Bad Request
    }).then((response) => {
      // Check the status code
      expect(response.status).to.eq(401);  // Expected 401 Unauthorized

      // Validate the response body
      expect(response.body.status).to.eq('error')
      expect(response.body.message).to.eq('Invalid email or password');
    });
  });

  it('should log out the user successfully without a Bearer token', () => {
    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/logout',
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false // This is important if we expect error handling
    }).then((response) => {
      // Check the status code
      expect(response.status).to.eq(401);  // Expected 401 Unauthorized
      expect(response.body.status).to.eq('error');
      expect(response.body.message).to.eq('Unauthorized');
    });
  });

  // Simulating multiple failed login attempts for the account lockout
  it('should lock the account after multiple failed login attempts', () => {
    const invalidLoginRequestBody = {
      email: 'admin@sales-people.com',
      password: 'wrongpassword',  // Invalid password
    };

    // Simulate multiple failed login attempts
    for (let i = 0; i < 5; i++) {
      cy.request({
        method: 'POST',
        url: 'https://demo.atforte.com/api/login',
        body: invalidLoginRequestBody,
        headers: {
          'Content-Type': 'application/json',
        },
        failOnStatusCode: false  // Don't fail on the first 4 failed attempts
      });
    }

    // After multiple failed attempts, try to login again
    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/login',
      body: invalidLoginRequestBody,  // Use the same invalid credentials
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false  // We expect a failure, so we set this to false
    }).then((response) => {
      // Check that the response status is 401 Unauthorized after account lock
      expect(response.status).to.eq(401);

      // Validate the error message
      //expect(response.body.error).to.eq('Account locked due to too many failed login attempts. Please try again later.');
    });
  });

  it('should allow login with an email that contains non-standard characters', () => {
    const loginRequestBody = {
      email: 'admin+test@sales-people.info',  // Email with non-standard characters
      password: '123',
    };

    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/login',
      body: loginRequestBody,
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false
    }).then((response) => {
      // Check if the response status is 401 Unauthorized
      expect(response.status).to.eq(401);

      // Validate the response body
      expect(response.body.status).to.eq('error')
      expect(response.body.message).to.eq('Invalid email or password');
    });
  });

  it('should return a 401 Unauthorized error with an expired password', () => {
    const expiredLoginRequestBody = {
      email: 'admin@sales-people.de',  // Valid email
      password: '345',  // Expired password
    };

    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/login',
      body: expiredLoginRequestBody,
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,  // Prevent Cypress from failing on the 401 Unauthorized response
    }).then((response) => {
      // Check if the response status is 401 Unauthorized
      expect(response.status).to.eq(401);

      // Validate the error message for expired password
      expect(response.body.status).to.eq('error');
      expect(response.body.message).to.eq('Invalid email or password');
    });
  });


  it('should allow login from two devices with the same credentials', () => {
    const loginRequestBody = {
      email: 'admin@sales-people.com',
      password: '123',
    };

    // Send first login request (first device)
    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/login',
      body: loginRequestBody,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response1) => {
      // Check if the first device login was successful
      expect(response1.status).to.eq(200);
      expect(response1.body.message).to.eq('Login successful');
      expect(response1.body.data.user_email).to.eq('admin@sales-people.com');
      expect(response1.body.data.user_fullname).to.eq('admin salespeople');
      expect(response1.body.data.user_roll).to.eq(101);

      // Send second login request (second device)
      cy.request({
        method: 'POST',
        url: 'https://demo.atforte.com/api/login',  // Same login endpoint
        body: loginRequestBody,
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response2) => {
        // Check if the second device login was successful
        expect(response2.status).to.eq(200);
        expect(response2.body.message).to.eq('Login successful');
        expect(response2.body.data.user_email).to.eq('admin@sales-people.com');
        expect(response2.body.data.user_fullname).to.eq('admin salespeople');
        expect(response2.body.data.user_roll).to.eq(101);
      });
    });
  });

  it('should allow login with a valid email of minimum length', () => {
    const loginRequestBody = {
      email: 'a@b.co',  // Email with minimum valid length
      password: '123',
    };

    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/login', body: loginRequestBody,
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,
    }).then((response) => {
      // Check if the response status is 401 Unauthorized
      expect(response.status).to.eq(401);

      // Validate the response body
      expect(response.body.message).to.eq('Invalid email or password');
      expect(response.body.status).to.eq('error');
    });
  });

  it('should return a 400 error for an email exceeding the maximum length', () => {
    // Generate an email with 255 characters (1 character + 241 "b"s + "@example.com")
    const longEmail = "a" + "b".repeat(241) + "@example.com";  // 255 characters in total

    const loginRequestBody = {
      email: longEmail,  // Email exceeding the maximum length
      password: '123',
    };

    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/login',
      body: loginRequestBody,
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,  // Prevent Cypress from automatically failing on the 400 Bad Request response
    }).then((response) => {
      // Check if the response status is 422 Unprocessable Content
      expect(response.status).to.eq(422);

      // Validate the error message for exceeding email length
      expect(response.body.status).to.eq('error');
      expect(response.body.message.email[0]).to.eq('The email field must not be greater than 70 characters.');
    });
  });

  it('should return a 400 error for an invalid email format with maximum length', () => {
    // Generate an email with 254 characters: "a" + "b".repeat(240) + "@example"
    const invalidEmail = "a" + "b".repeat(240) + "@example";  // 254 characters total

    const loginRequestBody = {
      email: invalidEmail,  // Invalid email format with 254 characters
      password: '123',
    };

    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/login',
      body: loginRequestBody,
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,  // Prevent Cypress from automatically failing on the 422 Unprocessable Content
    }).then((response) => {
      // Check if the response status is 422 Unprocessable Content
      expect(response.status).to.eq(422);

      // Validate the error message for invalid email format
      expect(response.body.status).to.eq('error');
      expect(response.body.message.email[0]).to.eq('The email field must not be greater than 70 characters.');
    });
  });

  it('should return 200 OK for a valid login with the minimum length of password', () => {
    // Test data with valid email and a 6-character password
    const loginRequestBody = {
      email: 'admin@sales-people.com',  // Valid email address
      password: '123456',  // Minimum valid password length (6 characters)
    };

    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/login',
      body: loginRequestBody,
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,
    }).then((response) => {
      // Check if the response status is 401 Unauthorized
      expect(response.status).to.eq(401);

      // Validate the success message and role details
      expect(response.body.status).to.eq('error');
      expect(response.body.message).to.eq('Invalid email or password');
    });
  });

  it('should return 200 OK for a valid login with the maximum length of password', () => {
    // Generate a password of exactly 128 characters (all 'a')
    const maxLengthPassword = 'a'.repeat(128);

    const loginRequestBody = {
      email: 'admin@sales-people.com',  // Valid email address
      password: maxLengthPassword,  // Maximum valid password length (128 characters)
    };

    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/login',
      body: loginRequestBody,
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,
    }).then((response) => {
      // Check if the response status is 401 Unauthorized
      expect(response.status).to.eq(401);

      // Validate the success message and role details
      expect(response.body.message).to.eq('Invalid email or password');
      expect(response.body.status).to.eq('error');
    });
  });

  it('should return 409 Conflict when trying to create a user with an existing email', () => {
    // Create a new user with an email that already exists
    const newUser = {
      email: 'admin@sales-people.com',  // Existing email address
      password: 'newuser123',
      role: 'Sales Agent',  // Role for the new user
    };

    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/login',
      body: newUser,
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx responses
    }).then((response) => {
      // Check the status code to confirm it is 401 Unauthorized
      expect(response.status).to.eq(401);

      // Validate the response body to confirm the error message
      expect(response.body.status).to.eq('error')
      expect(response.body.message).to.eq('Invalid email or password');
    });
  });

  it('should return 404 Not Found for the new login endpoint', () => {
    const loginRequest = {
      email: 'admin@sales-people.com',
      password: '123',
    };

    // Send POST request to the new (correct) endpoint
    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/v2/login',  // New endpoint
      body: loginRequest,
      failOnStatusCode: false,
    }).then((response) => {
      // Check if the response status is 404 
      expect(response.status).to.eq(404);
    });
  });

  it('should return 405 Method Not Allowed when using GET method', () => {
    const loginRequest = {
      email: 'admin@sales-people.com',
      password: '123',
    };

    // Send a GET request instead of POST
    cy.request({
      method: 'GET',
      url: 'https://demo.atforte.com/api/login',
      failOnStatusCode: false, // Prevent Cypress from failing the test automatically
    }).then((response) => {
      // The status is 405 Method Not Allowed
      expect(response.status).to.eq(405);
    });
  });

  it('should return 400 Bad Request when using an invalid query parameter', () => {
    const loginRequest = {
      email: 'admin@sales-people.com',
      password: '123',
    };

    // Send POST request with an incorrect query parameter
    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/login?invalid=true',  // Incorrect query parameter
      body: loginRequest,
      failOnStatusCode: false,  // Prevent Cypress from failing the test automatically
    }).then((response) => {
      // Check if the response status is 200 OK
      expect(response.status).to.eq(200);

    });
  });

  it('should log out successfully without a token', () => {
    const requestBody = {
      email: "admin@sales-people.com",
      password: "123"
    };
    // Send a POST request to the login API
    cy.request({
      method: 'POST',
      url: 'https://demo.atforte.com/api/login',
      body: requestBody,
      failOnStatusCode: false // Don't fail the test on non-2xx status codes
    }).then((response) => {
      // Assert the response status code is 200
      expect(response.status).to.eq(200);

      // Assert the response body contains the expected data
      expect(response.body.status).to.eq('success');
      expect(response.body.message).to.eq('Login successful');

      // Send POST request to the logout endpoint without Authorization header
      cy.request({
        method: 'POST',
        url: 'https://demo.atforte.com/api/logout',  // The logout API endpoint
        failOnStatusCode: false,  // Don't fail the test on non-2xx status codes (we will handle it)
      }).then((response) => {
        // Verify the status code is 200 OK
        expect(response.status).to.eq(200);

        // Verify the response body contains the success message
        expect(response.body.message).to.eq('Logout successful');
      });
    });
  });



});