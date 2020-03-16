
describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });

    it ('the bottom bar actually appears', () => {
        cy.visit ('/')
        cy.get("[data-cy=filterButton]").should("contain", "FILTER");
    })

    it ('shows the filter screen after clicking the FILTER button', () => {
        cy.visit ('/')
        cy.get("[data-cy=filterButton]").click()
        cy.get("[data-cy=filterView]").should("contain", "Filter Options");
    })

  });