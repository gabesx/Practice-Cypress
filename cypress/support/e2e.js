// Import commands.js using ES2015 syntax:
import './commands'

beforeEach(() => {
  cy.window().then((win) => {
    win.sessionStorage.clear()
    win.localStorage.clear()
  })
}) 