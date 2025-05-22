import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the login page', () => {
  cy.visit('/');
  cy.get('svg.wc-block-customer-account__account-icon')
    .parent('a')
    .should('be.visible')
    .click();
  cy.get('.woocommerce-form-login', { timeout: 10000 }).should('be.visible');
});

Given('I click on the login button', () => {
  cy.get('svg.wc-block-customer-account__account-icon')
    .parent('a')
    .should('be.visible')
    .click();
  cy.get('.woocommerce-form-login', { timeout: 10000 }).should('be.visible');
});

When('I enter valid credentials', () => {
  cy.get('input[name="username"]')
    .should('be.visible')
    .clear()
    .type(Cypress.env('USERNAME'), { log: false });
  
  cy.get('input[name="password"]')
    .should('be.visible')
    .clear()
    .type(Cypress.env('PASSWORD'), { log: false });
  
  cy.get('button.woocommerce-button.button.woocommerce-form-login__submit')
    .should('be.visible')
    .click();
});

When('I enter invalid credentials', () => {
  cy.get('input[name="username"]')
    .should('be.visible')
    .clear()
    .type('invalid_user');
  
  cy.get('input[name="password"]')
    .should('be.visible')
    .clear()
    .type('wrong_password');
  
  cy.get('button.woocommerce-button.button.woocommerce-form-login__submit')
    .should('be.visible')
    .click();
});

When('I log in as {string} to Wholesale Test Site', (role) => {
  const roleKey = role.replace(/\s+/g, '_').toUpperCase();
  const username = Cypress.env(`${roleKey}_USERNAME`);
  const password = Cypress.env(`${roleKey}_PASSWORD`);

  if (!username || !password) {
    throw new Error(`Missing credentials for role: ${role}`);
  }

  cy.get('input[name="username"]')
    .should('be.visible')
    .clear()
    .type(username, { log: false });
  
  cy.get('input[name="password"]')
    .should('be.visible')
    .clear()
    .type(password, { log: false });
  
  cy.get('button.woocommerce-button.button.woocommerce-form-login__submit')
    .should('be.visible')
    .click();
});

When('I log out as administrator', () => {
  cy.visit('/')
  cy.get('svg.wc-block-customer-account__account-icon')
    .parent('a')
    .should('be.visible')
    .click();
  
  cy.contains('Log out')
    .should('be.visible')
    .click();
  
  cy.get('.woocommerce-form-login', { timeout: 10000 })
    .should('be.visible');
});

When('I log out', () => {
  cy.get('svg.wc-block-customer-account__account-icon')
    .parent('a')
    .should('be.visible')
    .click();
  
  cy.contains('Log out')
    .should('be.visible')
    .click();
  
  cy.get('.woocommerce-form-login', { timeout: 10000 })
    .should('be.visible');
});

Then('I should be logged in successfully', () => {
  cy.get('body').then(($body) => {
    if ($body.find('h1.wp-block-post-title:contains("Akun Saya")').length) {
      cy.get('h1.wp-block-post-title').should('contain', 'Akun Saya');
    } else {
      cy.get('p').should('contain', 'Akun Saya');
    }
  });
});

Then('I should see an error message', () => {
  cy.get('.wc-block-components-notice-banner__content', { timeout: 10000 })
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      cy.log('Error message text:', text);
      expect(
        text.includes('not registered on this site') ||
        text.includes('incorrect') ||
        text.includes('Invalid username')
      ).to.be.true;
    });
}); 