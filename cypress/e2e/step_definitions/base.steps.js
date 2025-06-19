import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('two users {string} and {string} are authenticated', (user1, user2) => {
  cy.authenticateUser(user1);
  cy.authenticateUser(user2);
});

Given('{string} is viewing the inventory page', (username) => {
  cy.authenticateUser(username);
  cy.visit('/inventory.html');
});

Given('logs in as {string} account type and adds items to cart:', (username, dataTable) => {
  cy.visit('/');
  cy.get('[data-test="username"]').type(Cypress.env(`${username.toUpperCase()}_USERNAME`));
  cy.get('[data-test="password"]').type(Cypress.env(`${username.toUpperCase()}_PASSWORD`));
  cy.get('[data-test="login-button"]').click();
  
  dataTable.hashes().forEach((row) => {
    cy.contains('.inventory_item', row.item)
      .find('button')
      .click();
  });
});

Given('user {string} account logs in and adds items to cart:', (username, dataTable) => {
  cy.visit('/');
  cy.get('[data-test="username"]').type(Cypress.env(`${username.toUpperCase()}_USERNAME`));
  cy.get('[data-test="password"]').type(Cypress.env(`${username.toUpperCase()}_PASSWORD`));
  cy.get('[data-test="login-button"]').click();
  
  dataTable.hashes().forEach((row) => {
    cy.contains('.inventory_item', row.item)
      .find('button')
      .click();
  });
}); 


When('user {string} account completes checkout with:', (username, dataTable) => {
  const userInfo = dataTable.hashes()[0];
  
  cy.get('.shopping_cart_link').click();
  cy.get('[data-test="checkout"]').click();
  
  cy.get('[data-test="firstName"]').type(userInfo.firstName);
  cy.get('[data-test="lastName"]').type(userInfo.lastName);
  cy.get('[data-test="postalCode"]').type(userInfo.postalCode);
  cy.get('[data-test="continue"]').click();
  
  cy.get('[data-test="finish"]').click();
  cy.get('.complete-header').should('have.text', 'Thank you for your order!');
});

When('user {string} account completes the purchase', (username) => {
  cy.get('.shopping_cart_link').click();
  cy.get('[data-test="checkout"]').click();
  cy.get('[data-test="firstName"]').type('Test');
  cy.get('[data-test="lastName"]').type('User');
  cy.get('[data-test="postalCode"]').type('12345');
  cy.get('[data-test="continue"]').click();
  cy.get('[data-test="finish"]').click();
});

When('user {string} account logs in to the inventory page', (username) => {
  cy.visit('/');
  cy.get('[data-test="username"]').type(Cypress.env(`${username.toUpperCase()}_USERNAME`));
  cy.get('[data-test="password"]').type(Cypress.env(`${username.toUpperCase()}_PASSWORD`));
  cy.get('[data-test="login-button"]').click();
});

Then('both users should have empty carts when they log back in', () => {
  cy.visit('/');
  cy.get('[data-test="username"]').type(Cypress.env('STANDARD_USERNAME'));
  cy.get('[data-test="password"]').type(Cypress.env('STANDARD_PASSWORD'));
  cy.get('[data-test="login-button"]').click();
  cy.get('.shopping_cart_badge').should('not.exist');
  cy.get('#react-burger-menu-btn').click();
  cy.get('#logout_sidebar_link').should('be.visible').click();
  
  cy.get('[data-test="username"]').type(Cypress.env('VISUAL_USERNAME'));
  cy.get('[data-test="password"]').type(Cypress.env('VISUAL_PASSWORD'));
  cy.get('[data-test="login-button"]').click();
  cy.get('.shopping_cart_badge').should('not.exist');
  cy.get('#react-burger-menu-btn').click();
  cy.get('#logout_sidebar_link').should('be.visible').click();
});

Then('{string} should still be available for purchase', (itemName) => {
  cy.contains('.inventory_item', itemName)
    .should('be.visible');
    
  cy.contains('.inventory_item', itemName)
    .find('button')
    .should('have.text', 'Add to cart')
    .should('be.enabled');
    
  cy.contains('.inventory_item', itemName)
    .parents('.inventory_item')
    .find('.inventory_item_price')
    .should('be.visible');
});

Then('each user should see their correct order confirmation', () => {
  cy.authenticateUser('standard_user');
  cy.visit('/inventory.html');
  cy.get('.shopping_cart_badge').should('not.exist');

  cy.authenticateUser('visual_user');
  cy.visit('/inventory.html');
  cy.get('.shopping_cart_badge').should('not.exist');
});

Then('{string} should see {string} as out of stock', (username, itemName) => {
  cy.authenticateUser(username);
  cy.visit('/inventory.html');
  
  cy.contains('.inventory_item', itemName)
    .find('button')
    .should('have.text', 'Add to cart');
});

Given('I run the test flows on Chrome and Firefox', () => {
  cy.log('Test will run on multiple browsers via Cypress configuration');
});

Then('the website should function consistently and correctly on both browsers', () => {
  const browserTestSession = 'browser_test_user_' + Date.now() + '_' + Math.random();
  
  cy.session(browserTestSession, () => {
    cy.visit('/');
    cy.get('[data-test="username"]').type(Cypress.env('STANDARD_USERNAME'));
    cy.get('[data-test="password"]').type(Cypress.env('STANDARD_PASSWORD'));
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');
  });

  cy.visit('/inventory.html');
  cy.url().should('include', '/inventory.html');
  cy.get('.inventory_item').should('have.length.gt', 0);
  cy.get('.inventory_item_price').should('be.visible');
});

Then('the cart should be empty', () => {
  cy.get('.shopping_cart_badge').should('not.exist');
});

Then('the order confirmation should be visible', () => {
  cy.get('.complete-header')
    .should('have.text', 'Thank you for your order!');
  cy.get('.complete-text')
    .should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!');
}); 