describe('Project Manager API Test Cases', () => {
    const email = 'pm@sales-people.com';  // User email for valid login
    const password = '123';  // User password for valid login

    const invalidEmail = 'pm@sales-people.com';  // Invalid email for testing
    const invalidPassword = '12345';  // Invalid password for testing

    // Run valid login before every test case
    beforeEach(() => {
        // Valid login before each test
        cy.login(email, password);  // Default isValid = true
    });

    it('should login successfully with valid credentials for Project Manager with remaining agents', () => {
        cy.request({
            method: 'GET',
            url: 'https://demo.atforte.com/api/remainingagents/1',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            // Check the status code
            expect(response.status).to.eq(200);
            // Validate the response body
            expect(response.body.status).to.eq('success');
            expect(response.body.message).to.eq('List of Users not in Project');
            expect(response.body.data[0].user_id).to.eq(307);
            expect(response.body.data[0].user_firstname).to.eq('Abiramy');
            expect(response.body.data[0].user_lastname).to.eq('Heeß');
            expect(response.body.data[0].user_email).to.eq('a.heess@sales-people.de');
        });
    })

    it('should return a 404 status code for an invalid API endpoint', () => {
        cy.request({
            method: 'GET',  // HTTP method (can be GET, POST, PUT, DELETE, etc.)
            url: 'https://demo.atforte.com/api/remainingagents/54==', // remainingagents/@#$  // Invalid endpoint
            failOnStatusCode: false  // This is important to prevent Cypress from failing the test automatically
        }).then((response) => {
            // Check for the correct 404 status code (Not Found)
            expect(response.status).to.eq(404);

            // Validate the response body (assuming the API sends a message about the invalid endpoint)
            expect(response.body.status).to.eq('error');
            expect(response.body.message).to.eq('Endpoint not found');
        });
    })

    it('should login successfully with valid credentials for a Project Manager', () => {
        cy.request({
            method: 'GET',
            url: 'https://demo.atforte.com/api/projectleads/2',
            headers: {
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
        }).then((response) => {
            // Check the status code
            expect(response.status).to.eq(200);
            // Validate the response body
            expect(response.body.status).to.eq('success');
            expect(response.body.message).to.eq('All project leads');
            expect(response.body.data[0].projectlead_id).to.eq(10);
            expect(response.body.data[0].lead_id).to.eq(11);
            expect(response.body.data[0].lead_order).to.eq(1);
            expect(response.body.data[0].lead_type).to.eq('HIGHEST');
            expect(response.body.data[0].lead_name).to.eq('Teilnahme');
            expect(response.body.data[0].projectlead_status).to.eq('ACTIVE');
        });
    });

    it('should return an error when login attempt is made with an incorrect password', () => {
        // Perform invalid login
        cy.login(invalidEmail, invalidPassword, false);  // isValid = false for invalid login

        cy.request({
            method: 'GET',
            url: 'https://demo.atforte.com/api/projectleads/2',
            headers: {
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
        }).then((response) => {
            // Check the status code
            expect(response.status).to.eq(401);
            // Validate the response body
            expect(response.body.status).to.eq('success');
            expect(response.body.message).to.eq('All project leads');
            expect(response.body.data[0].projectlead_id).to.eq(10);
            expect(response.body.data[0].lead_id).to.eq(11);
            expect(response.body.data[0].lead_order).to.eq(1);
            expect(response.body.data[0].lead_type).to.eq('HIGHEST');
            expect(response.body.data[0].lead_name).to.eq('Teilnahme');
            expect(response.body.data[0].projectlead_status).to.eq('ACTIVE');
        });
    });

    it('should return 404 status when project_id is missing in the URL', () => {
        cy.request({
            method: 'GET',
            url: 'https://demo.atforte.com/api/remainingagents/',
            failOnStatusCode: false,
        }).then((response) => {
            // Check the status code
            expect(response.status).to.eq(404);
        })

    })

    it('should return 400 Bad Request when an invalid project_id format (Non-Numeric) is provided', () => {
        cy.request({
            method: 'GET',
            url: 'https://demo.atforte.com/api/remainingagents/wertyui',
            headers: {
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
        }).then((response) => {
            // Check the status code
            expect(response.status).to.eq(400);
            // Validate the response body
            expect(response.body.status).to.eq('success');
            expect(response.body.message).to.eq('List of Users not in Project');
            expect(response.body.data[0].user_id).to.eq(307);
            expect(response.body.data[0].user_firstname).to.eq('Abiramy');
            expect(response.body.data[0].user_lastname).to.eq('Heeß');
            expect(response.body.data[0].user_email).to.eq('a.heess@sales-people.de');
        })
    });

    it('should return 405 Method Not Allowed when POST method is used for GET endpoint', () => {
        cy.request({
            method: 'POST',   // Method changing from GET to POST
            url: 'https://demo.atforte.com/api/remainingagents/1',
            headers: {
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
        }).then((response) => {
            // Method Not Allowed
            expect(response.status).to.eq(405);
        })
    })

    it('should return a 405 Method Not Allowed when GET request is sent with a body', () => {
        cy.request({
            method: 'GET',
            url: 'https://demo.atforte.com/api/remainingagents/1',
            body: {

            },
            headers: {
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
        }).then((response) => {
            // Method Not Allowed
            expect(response.status).to.eq(405);  // but getting 200 OK
        })
    })

    it('should return 400 Bad Request when path parameter is given as a placeholder', () => {
        cy.request({
            method: 'GET',
            url: 'https://demo.atforte.com/api/remainingagents/{project_id}',
            headers: {
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
        }).then((response) => {
            // Expect the status to be 400 or 404 for invalid project_id placeholder
            expect(response.status).to.eq(400);    // but getting 200 OK

        })
    })

    it('should return 401 Unauthorized when login fails and protected resource is accessed', () => {

        cy.login(invalidEmail, invalidPassword, false);  // isValid = false for invalid login

        cy.request({
            method: 'GET',
            url: 'https://demo.atforte.com/api/remainingagents/{project_id}',   // https://demo.atforte.com/api/remainingagents/1
            headers: {
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
        }).then((response) => {
            // Check the status code
            expect(response.status).to.eq(401);   // but getting 200 OK
    })
})



})



