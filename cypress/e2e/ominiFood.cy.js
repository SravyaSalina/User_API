describe('Testcases of Omini Food Page', () => {
    it('Open the main page', () => {
      cy.viewport(1280, 720)  
      cy.visit('http://localhost:5500/omnifood/omni.html');
      // to scroll the page slowly down small increments with ieration
      for(let i=0; i<10; i++){
        // scrollTo(positions, options) //scrollTo(horizontal, vertical)
        cy.scrollTo(0, (i * 800))
        cy.wait(500);
      }

      cy.get('a[href="#how"]').contains('How it works').click();
      cy.wait(500);
      cy.get('a[href="#meals"]').click();
      cy.wait(500);
      cy.get('a[href="#testimonials"]').click();
      cy.wait(500);
      cy.get('a[href="#cta"]').contains('Try for free').click();
      cy.get('#full-name').type('Testing');
      cy.get('#email').type('test123@gmail.com');
      cy.get('#select-where').select(1);
      cy.get('.btn').contains('Sign up now').click();
    });

    it('Start Eating well', () => {
      cy.visit('http://localhost:5500/omnifood/omni.html');
      cy.get('a[href="#cta"]').contains('Start eating Well').click();
    });

    it('Invalid test scenarios with invalid credentials', () => {
      cy.visit('http://localhost:5500/omnifood/omni.html');
      cy.get('a[href="#cta"]').contains('Try for free').click();
      cy.get('#full-name').type('1123er45tffgy654ef4');
      cy.get('#email').type('test12367yu');
      cy.get('#select-where').select(5);
      cy.get('.btn').contains('Sign up now').click();
    })

    it('Sign up now with out any data', () => {
      cy.visit('http://localhost:5500/omnifood/omni.html');
      cy.get('a[href="#cta"]').contains('Try for free').click();
      cy.get('.btn').contains('Sign up now').click();
    })

    it('Sign up now without filling drop down', () => {
      cy.visit('http://localhost:5500/omnifood/omni.html');
      cy.get('a[href="#cta"]').contains('Try for free').click();
      cy.get('#full-name').type('1123er45tffgy654ef4');
      cy.get('#email').type('test123@gmail.com');
      cy.get('.btn').contains('Sign up now').click();
    })
  });
  