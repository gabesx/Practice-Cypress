const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

Given('I am on the Sauce Demo login page', () => {
  cy.visit('/');
  cy.get('.login_logo').should('be.visible');
});

When('I login as {string} with {string}', (username, password) => {
  cy.get('[data-test="username"]').should('be.visible').clear().type(username);
  cy.get('[data-test="password"]').should('be.visible').clear().type(password);
  cy.get('[data-test="login-button"]').should('be.visible').click();
});

Then('I should be logged in successfully', () => {
  cy.url().should('include', '/inventory.html');
  cy.get('.shopping_cart_link').should('be.visible');
  cy.get('.title').should('have.text', 'Products');
}); 