Cypress.Commands.add('login', (username, password) => {
  cy.visit('/')
  cy.get('[data-test="username"]').type(username)
  cy.get('[data-test="password"]').type(password)
  cy.get('[data-test="login-button"]').click()
})

!Cypress.env('userSessionCookies') && Cypress.env('userSessionCookies', {})

const waitUntilTokensExist = (username) => {
  cy.getAllCookies().then((cookies) => {
    const tokenStore = Cypress.env('userSessionCookies')
    if (!tokenStore[username]) {
      tokenStore[username] = { cookies }
    }
  })
}

Cypress.Commands.add('authenticateUser', (username) => {
  const envUsername = Cypress.env(`${username.toUpperCase()}_USERNAME`) || username;
  const password = Cypress.env(`${username.toUpperCase()}_PASSWORD`) || 'secret_sauce';
  
  cy.session(username, () => {
    cy.visit('/')
    cy.get('[data-test="username"]').type(envUsername)
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', '/inventory.html')
  })

  waitUntilTokensExist(username)
})

Cypress.Commands.add('fillCheckoutInfo', (firstName, lastName, postalCode) => {
  cy.get('[data-test="firstName"]').type(firstName)
  cy.get('[data-test="lastName"]').type(lastName)
  cy.get('[data-test="postalCode"]').type(postalCode)
  cy.get('[data-test="continue"]').click()
})

Cypress.Commands.add('addToCart', (itemName) => {
  cy.get('.inventory_item')
    .contains(itemName)
    .parents('.inventory_item')
    .find('button')
    .click()
})

Cypress.Commands.add('verifyItemInCart', (itemName, price) => {
  cy.get('.cart_item')
    .contains(itemName)
    .should('be.visible')
  
  if (price) {
    cy.get('.cart_item')
      .contains(itemName)
      .parents('.cart_item')
      .find('.inventory_item_price')
      .should('have.text', price)
  }
})

Cypress.Commands.add('switchAPIRequestUser', (username) => {
  Cypress.log({ message: `Switching API request user to: ${username}` })
  Cypress.env('apiRequestUser', username)
})

const getAuthenticationHeaders = () => {
  const currentUser = Cypress.env('apiRequestUser')
  const { cookies } = Cypress.env('userSessionCookies')[currentUser]
  
  const cookieString = cookies
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ')
  
  return {
    'Content-Type': 'application/json',
    Cookie: cookieString
  }
}

Cypress.Commands.add('sendAuthenticatedRequest', (options) => {
  return cy.request({
    ...options,
    headers: {
      ...getAuthenticationHeaders(),
      ...options.headers
    }
  })
}) 