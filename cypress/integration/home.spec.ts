describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display website name', () => {
    cy.get('h1').contains('Local Paste');
  });

  it('should get the website title', () => {
    cy.get('head title').should('contain', 'Welcome  | Local Paste');
  });
});
