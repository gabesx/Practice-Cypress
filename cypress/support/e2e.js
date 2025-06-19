// Import commands.js using ES2015 syntax:
import './commands'

// Reset application state before each test
beforeEach(() => {
  cy.window().then((win) => {
    win.sessionStorage.clear()
    win.localStorage.clear()
  })
}) 