import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('I clear the cart', () => {
  cy.visit('/?page_id=8');
  cy.get('body').then($body => {
    function removeAll() {
      if ($body.find('.wc-block-cart-item__remove-link').length) {
        cy.get('.wc-block-cart-item__remove-link').each($el => {
          cy.wrap($el).click({ force: true });
        });
        cy.wait(500);
        cy.reload();
        cy.get('body').then($body2 => {
          if ($body2.find('.wc-block-cart-item__remove-link').length) {
            removeAll();
          }
        });
      }
    }
    removeAll();
  });
  cy.contains('Your cart is currently empty').should('exist');
});

When('I add the product to the cart', () => {
  cy.get('button.single_add_to_cart_button').should('be.visible').click();
});

When('I open the cart', () => {
  cy.get('button, a, svg.wc-block-mini-cart__icon').first().click({ force: true });
});

When('navigate to cart page', () => {
  cy.visit('/?page_id=8');
  cy.wait(5000);
});

When('clear the cart via API', () => {
  cy.visit('/?page_id=8');
  cy.document().then(doc => {
    const nonce = doc.querySelector('meta[name="wp-api-nonce"]')?.content;
    cy.request('GET', '/index.php?rest_route=/wc/store/v1/cart').then((response) => {
      const items = response.body.items;
      if (items.length) {
        const requests = items.map(item => ({
          path: '/wc/store/v1/cart/remove-item',
          data: { key: item.key },
          method: 'POST'
        }));
        cy.request({
          method: 'POST',
          url: '/index.php?rest_route=/wc/store/v1/batch',
          body: { requests },
          headers: {
            'X-WP-Nonce': nonce
          }
        });
      }
    });
  });
});

Then('I should see the cart price as {string}, regular {string}, sale {string}', (wholesale, regular, sale) => {
  if (wholesale !== 'no wholesale price') {
    let expectedWholesale;
    if (wholesale.trim().endsWith('%')) {
      const percent = parseFloat(wholesale);
      const regularNum = Number(regular);
      expectedWholesale = Math.round(regularNum * (1 - percent / 100));
    } else {
      expectedWholesale = Number(wholesale);
    }
    cy.get('.wc-block-mini-cart_items .wc-block-cart-item__price, .wc-block-cart-item__price')
      .should('contain', `Rp${expectedWholesale.toLocaleString('id-ID')}`);
  } else {
    const saleNum = Number(sale);
    cy.get('.wc-block-mini-cart_items .wc-block-cart-item__price, .wc-block-cart-item__price')
      .should('contain', `Rp${saleNum.toLocaleString('id-ID')}`);
  }
});