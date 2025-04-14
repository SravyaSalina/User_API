describe('Web driver university Testsuite',() => {
    it('login to Contact Us page', () => {
        cy.visit('https://webdriveruniversity.com/Contact-Us/contactus.html');
        cy.get("input[name='first_name']").type('Sravya');
        cy.get("input[name='last_name']").type('Salina');
        cy.get("input[name='email']").type('test123@gmail.com');
        cy.get("textarea[name='message']").type('Testing example');
        cy.get("input[type='submit']").click();
        cy.contains('Thank You for your Message!').should('be.visible');
    })

    it('login to TO-DO LIST page', () => {
        cy.visit('https://webdriveruniversity.com/To-Do-List/index.html');
        // Adding items to the todo list
        cy.get("input[type='text']").type('2345678456789').type('{enter}'); 
        cy.get("input[type='text']").type('qwertysasdfghjk ertyui ertyuio dfghjk 123456789 !@~#$%^&*()_+}{:">?<|\ertdfyguuy bnytuyjk').type('{enter}'); 
        cy.get("input[type='text']").type('wertyuhgfdgh').type('{enter}'); 
    })

    it('deleting a record from the todo list', () => {
        cy.visit('https://webdriveruniversity.com/To-Do-List/index.html');
        // adding a TO DO List 
        cy.get("input[type='text']").type('2345678456789').type('{enter}'); 
        cy.get("input[type='text']").type('qwertyuiopasdfghjklzxcvbnm12347890654321').type('{enter}'); 
        cy.get("input[type='text']").type('#$%^&*()({}":?|+_@!~').type('{enter}'); 
        // Deleting a records from the list
        cy.get('#container > ul > li:nth-child(1) > span > i').click({ force: true }); 
        cy.get('#container > ul > li:nth-child(3) > span > i').click({ force: true });
        cy.get('#container > ul > li:nth-child(5) > span > i').click({ force: true });
    })
})