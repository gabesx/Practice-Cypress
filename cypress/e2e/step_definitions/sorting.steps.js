const { When, Then } = require('@badeball/cypress-cucumber-preprocessor');

When('I select sorting option {string}', (option) => {
  cy.get('[data-test="product-sort-container"]')
    .should('be.visible')
    .select(option);
});

Then('products should be sorted alphabetically ascending', () => {
  cy.get('.inventory_item_name').then($items => {
    const itemNames = [...$items].map(el => el.innerText);
    const sortedNames = [...itemNames].sort();
    expect(itemNames).to.deep.equal(sortedNames);
  });
});

Then('products should be sorted alphabetically descending', () => {
  cy.get('.inventory_item_name').then($items => {
    const itemNames = [...$items].map(el => el.innerText);
    const sortedNames = [...itemNames].sort().reverse();
    expect(itemNames).to.deep.equal(sortedNames);
  });
});

Then('products should be sorted by price ascending', () => {
  cy.get('.inventory_item_price').then($prices => {
    const prices = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).to.deep.equal(sortedPrices);
  });
});

Then('products should be sorted by price descending', () => {
  cy.get('.inventory_item_price').then($prices => {
    const prices = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).to.deep.equal(sortedPrices);
  });
});

Then('the first product should be {string}', (productName) => {
  cy.get('.inventory_item_name')
    .first()
    .should('have.text', productName);
});

Then('the last product should be {string}', (productName) => {
  cy.get('.inventory_item_name')
    .last()
    .should('have.text', productName);
});

Then('the first product should cost {string}', (price) => {
  cy.get('.inventory_item_price')
    .first()
    .should('have.text', price);
});

Then('the last product should cost {string}', (price) => {
  cy.get('.inventory_item_price')
    .last()
    .should('have.text', price);
}); 