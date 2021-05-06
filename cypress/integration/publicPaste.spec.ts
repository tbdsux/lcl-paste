describe('Using the Editor with', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('shows error if clicked `Create Paste` with no filename', () => {
    cy.get('#create-update-btn').click();

    // might be an anti-pattern but it works wahhaha
    cy.wait(2000).getToastMessage(['Creating paste...', '"filename" is not allowed to be empty']);
  });
});
