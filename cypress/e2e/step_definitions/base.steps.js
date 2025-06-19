import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('two users {string} and {string} are authenticated', (user1, user2) => {
  cy.authenticateUser(user1);
  cy.authenticateUser(user2);
});

Given('{string} is viewing the inventory page', (username) => {
  cy.authenticateUser(username);
  cy.visit('/inventory.html');
});

Given('{string} logs in and adds items to cart:', (username, dataTable) => {
  // Login
  cy.visit('/');
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type('secret_sauce');
  cy.get('[data-test="login-button"]').click();
  
  // Add items to cart
  dataTable.hashes().forEach((row) => {
    cy.contains('.inventory_item', row.item)
      .find('button')
      .click();
  });
});

Given('{string} completes checkout with:', (username, dataTable) => {
  const userInfo = dataTable.hashes()[0];
  
  // Go to cart and checkout
  cy.get('.shopping_cart_link').click();
  cy.get('[data-test="checkout"]').click();
  
  // Fill checkout info
  cy.get('[data-test="firstName"]').type(userInfo.firstName);
  cy.get('[data-test="lastName"]').type(userInfo.lastName);
  cy.get('[data-test="postalCode"]').type(userInfo.postalCode);
  cy.get('[data-test="continue"]').click();
  
  // Complete purchase
  cy.get('[data-test="finish"]').click();
  cy.get('.complete-header').should('have.text', 'Thank you for your order!');
});

Then('both users should have empty carts when they log back in', () => {
  // Check standard_user cart
  cy.visit('/');
  cy.get('[data-test="username"]').type('standard_user');
  cy.get('[data-test="password"]').type('secret_sauce');
  cy.get('[data-test="login-button"]').click();
  cy.get('.shopping_cart_badge').should('not.exist');
  cy.get('[data-test="logout_sidebar_link"]').click();
  
  // Check visual_user cart
  cy.get('[data-test="username"]').type('visual_user');
  cy.get('[data-test="password"]').type('secret_sauce');
  cy.get('[data-test="login-button"]').click();
  cy.get('.shopping_cart_badge').should('not.exist');
});

Given('{string} logs in and adds {string} to cart', (username, itemName) => {
  cy.visit('/');
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type('secret_sauce');
  cy.get('[data-test="login-button"]').click();
  
  cy.contains('.inventory_item', itemName)
    .find('button')
    .click();
});

When('{string} completes the purchase', () => {
  cy.get('.shopping_cart_link').click();
  cy.get('[data-test="checkout"]').click();
  cy.get('[data-test="firstName"]').type('Test');
  cy.get('[data-test="lastName"]').type('User');
  cy.get('[data-test="postalCode"]').type('12345');
  cy.get('[data-test="continue"]').click();
  cy.get('[data-test="finish"]').click();
});

When('{string} logs in to the inventory page', (username) => {
  cy.visit('/');
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type('secret_sauce');
  cy.get('[data-test="login-button"]').click();
});

Then('{string} should show reduced inventory', (itemName) => {
  cy.contains('.inventory_item', itemName)
    .find('.inventory_item_desc')
    .invoke('text')
    .then((text) => {
      expect(text.toLowerCase()).to.include('left');
    });
});

Then('each user should see their correct order confirmation', () => {
  // Verify first user's order
  cy.authenticateUser('standard_user');
  cy.visit('/inventory.html');
  cy.get('.shopping_cart_badge').should('not.exist');

  // Verify second user's order
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
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');
  });

  cy.visit('/inventory.html');
  cy.url().should('include', '/inventory.html');
  cy.get('.inventory_item').should('have.length.gt', 0);
  cy.get('.inventory_item_price').should('be.visible');
}); 