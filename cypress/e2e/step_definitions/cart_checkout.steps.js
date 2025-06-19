const { When, Then } = require('@badeball/cypress-cucumber-preprocessor');

When('I add the following items to cart:', (dataTable) => {
  dataTable.hashes().forEach((row) => {
    cy.get('.inventory_item')
      .contains(row.item)
      .parents('.inventory_item')
      .find('button')
      .click();
  });
});

Then('the shopping cart badge should show {string}', (count) => {
  cy.get('.shopping_cart_badge')
    .should('be.visible')
    .and('have.text', count);
});

When('I click on shopping cart', () => {
  cy.get('.shopping_cart_link').click();
});

Then('I should see the following items in cart:', (dataTable) => {
  dataTable.hashes().forEach((row) => {
    cy.get('.cart_item')
      .contains(row.item)
      .should('be.visible');
    
    cy.get('.cart_item')
      .contains(row.item)
      .parents('.cart_item')
      .find('.inventory_item_price')
      .should('have.text', row.price);
  });
});

Then('the total price should be {string}', (total) => {
  let sum = 0;
  cy.get('.inventory_item_price').each(($price) => {
    sum += parseFloat($price.text().replace('$', ''));
  }).then(() => {
    expect(sum.toFixed(2)).to.equal(total.replace('$', ''));
  });
});

When('I proceed to checkout', () => {
  cy.get('[data-test="checkout"]').click();
});

When('I fill in the following information:', (dataTable) => {
  const userInfo = dataTable.hashes()[0];
  cy.get('[data-test="firstName"]').type(userInfo.firstName);
  cy.get('[data-test="lastName"]').type(userInfo.lastName);
  cy.get('[data-test="postalCode"]').type(userInfo.postalCode);
});

When('I click continue', () => {
  cy.get('[data-test="continue"]').click();
});

Then('I should see the checkout overview', () => {
  cy.url().should('include', '/checkout-step-two.html');
  cy.get('.summary_info').should('be.visible');
});

Then('the total amount should match cart total', () => {
  cy.get('.summary_subtotal_label').then(($subtotal) => {
    const subtotalText = $subtotal.text();
    const subtotalAmount = parseFloat(subtotalText.match(/\$([0-9.]+)/)[1]);
    
    cy.get('.summary_tax_label').then(($tax) => {
      const taxText = $tax.text();
      const taxAmount = parseFloat(taxText.match(/\$([0-9.]+)/)[1]);
      
      cy.get('.summary_total_label').then(($total) => {
        const totalText = $total.text();
        const totalAmount = parseFloat(totalText.match(/\$([0-9.]+)/)[1]);
        
        const expectedTotal = Number((subtotalAmount + taxAmount).toFixed(2));
        const actualTotal = Number(totalAmount.toFixed(2));
        expect(actualTotal).to.equal(expectedTotal);
      });
    });
  });
});

When('I click finish', () => {
  cy.get('[data-test="finish"]').click();
});

Then('I should see the order confirmation message', () => {
  cy.url().should('include', '/checkout-complete.html');
  cy.get('.complete-header')
    .should('be.visible')
    .and('have.text', 'Thank you for your order!');
}); 