// Custom command for login
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/')
  cy.get('[data-test="username"]').type(username)
  cy.get('[data-test="password"]').type(password)
  cy.get('[data-test="login-button"]').click()
})

// Store session data in closure to maintain state between steps
!Cypress.env('userSessionCookies') && Cypress.env('userSessionCookies', {})

// Helper function to wait for and store user session
const waitUntilTokensExist = (username) => {
  cy.getAllCookies().then((cookies) => {
    const tokenStore = Cypress.env('userSessionCookies')
    if (!tokenStore[username]) {
      tokenStore[username] = { cookies }
    }
  })
}

// Command to authenticate and store user session
Cypress.Commands.add('authenticateUser', (username) => {
  const password = 'secret_sauce'
  
  cy.session(username, () => {
    cy.visit('/')
    cy.get('[data-test="username"]').type(username)
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', '/inventory.html')
  })

  // Store cookies after successful login
  waitUntilTokensExist(username)
})

// Custom command for checkout process
Cypress.Commands.add('fillCheckoutInfo', (firstName, lastName, postalCode) => {
  cy.get('[data-test="firstName"]').type(firstName)
  cy.get('[data-test="lastName"]').type(lastName)
  cy.get('[data-test="postalCode"]').type(postalCode)
  cy.get('[data-test="continue"]').click()
})

// Custom command to add item to cart
Cypress.Commands.add('addToCart', (itemName) => {
  cy.get('.inventory_item')
    .contains(itemName)
    .parents('.inventory_item')
    .find('button')
    .click()
})

// Custom command to verify item in cart
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

// Command to switch the active API request user
Cypress.Commands.add('switchAPIRequestUser', (username) => {
  Cypress.log({ message: `Switching API request user to: ${username}` })
  Cypress.env('apiRequestUser', username)
})

// Helper to get authentication headers for current API request user
const getAuthenticationHeaders = () => {
  const currentUser = Cypress.env('apiRequestUser')
  const { cookies } = Cypress.env('userSessionCookies')[currentUser]
  
  // Convert cookies to header format
  const cookieString = cookies
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ')
  
  return {
    'Content-Type': 'application/json',
    Cookie: cookieString
  }
}

// Command to send authenticated API request
Cypress.Commands.add('sendAuthenticatedRequest', (options) => {
  return cy.request({
    ...options,
    headers: {
      ...getAuthenticationHeaders(),
      ...options.headers
    }
  })
}) 