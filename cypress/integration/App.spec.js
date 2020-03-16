
describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });

    it ('the bottom bar actually appears', () => {
        cy.visit ('/')
        cy.get("[data-cy=filterButton]").should("contain", "FILTER");
    })

  });