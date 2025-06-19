# Sauce Demo E2E Test Suite

This project is for practicing on e2e tests for the Sauce Demo website using Cypress and Cucumber.

## Prerequisites
- [Node.js](https://nodejs.org/)
- npm (comes with Node.js)
- Git
- Operating System use in this practice
  * macOS

## Project Setup

1. Create a new directory for your project:
```bash
mkdir sauce-demo-tests
cd sauce-demo-tests
```

2. Initialize a new Node.js project:
```bash
npm init -y
```

3. Install Cypress and required dependencies:
```bash
npm install cypress --save-dev

# Install Cucumber preprocessor for BDD
npm install @badeball/cypress-cucumber-preprocessor --save-dev

# Install esbuild preprocessor
npm install @bahmutov/cypress-esbuild-preprocessor --save-dev
```

4. Open Cypress to generate the initial folder structure:
```bash
npx cypress open
```

5. Create necessary directories if they don't exist:
```bash
mkdir -p cypress/e2e/features
mkdir -p cypress/e2e/step_definitions
```

6. Clone this repository (if you want to use existing tests):
```bash
git clone <repository-url>
cd <project-directory>
```

7. Install all project dependencies:
```bash
npm install
```

## Project Structure

```
├── cypress/
│   ├── e2e/
│   │   ├── features/
│   │   │   ├── login.feature
│   │   │   └── shopping_cart.feature
│   │   └── step_definitions/
│   │       ├── login.steps.js
│   │       └── shopping_cart.steps.js
│   ├── support/   
│   └── fixtures/      
├── cypress.config.js
├── cypress.env.json
└── package.json
```

## Configuration Files Setup
1. Create `cypress.config.js`:
```bash
touch cypress.config.js
```

Add the following content:
```javascript
const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );
  return config;
}

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/features/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents,
    baseUrl: 'https://www.saucedemo.com',
    env: {
      stepDefinitions: 'cypress/e2e/step_definitions/**/*.js'
    }
  },
});
```

2. Create `cypress.env.json`:
```bash
touch cypress.env.json
```

Add the following content:
```json
{
  "BASE_URL": "https://www.saucedemo.com",
  
  "STANDARD_USERNAME": "standard_user",
  "STANDARD_PASSWORD": "secret_sauce",
  
  "LOCKED_OUT_USERNAME": "locked_out_user",
  "LOCKED_OUT_PASSWORD": "secret_sauce",
  
  "PROBLEM_USERNAME": "problem_user",
  "PROBLEM_PASSWORD": "secret_sauce",
  
  "PERFORMANCE_GLITCH_USERNAME": "performance_glitch_user",
  "PERFORMANCE_GLITCH_PASSWORD": "secret_sauce",
  
  "ERROR_USERNAME": "error_user",
  "ERROR_PASSWORD": "secret_sauce",
  
  "VISUAL_USERNAME": "visual_user",
  "VISUAL_PASSWORD": "secret_sauce"
}
```

## Test Scenarios Practice

1. **Shopping Cart Flow - Backpack and T-Shirt**
   - Login with standard user
   - Add "Sauce Labs Backpack" to cart
   - Add "Sauce Labs Bolt T-Shirt" to cart
   - Verify items in cart
   - Complete checkout process
   - Verify prices and total
   - Confirm order completion

2. **Shopping Cart Flow - Backpack and Fleece Jacket**
   - Login with standard user
   - Add "Sauce Labs Backpack" to cart
   - Add "Sauce Labs Fleece Jacket" to cart
   - Verify items in cart
   - Complete checkout process
   - Verify prices and total
   - Confirm order completion

3. **Product Sorting - Name (A to Z)**
   - Login with standard user
   - Select "Name (A to Z)" from sort dropdown
   - Verify products are correctly sorted alphabetically ascending
   - Validate first and last items in the sorted list
   - Verify sorting persists after page refresh

4. **Product Sorting - Name (Z to A)**
   - Login with standard user
   - Select "Name (Z to A)" from sort dropdown
   - Verify products are correctly sorted alphabetically descending
   - Validate first and last items in the sorted list
   - Verify sorting persists after page refresh

5. **Product Sorting - Price (Low to High)**
   - Login with standard user
   - Select "Price (low to high)" from sort dropdown
   - Verify products are correctly sorted by price ascending
   - Validate cheapest and most expensive items
   - Verify price format and currency

6. **Product Sorting - Price (High to Low)**
   - Login with standard user
   - Select "Price (high to low)" from sort dropdown
   - Verify products are correctly sorted by price descending
   - Validate most expensive and cheapest items
   - Verify price format and currency

7. **Concurrent User Checkout**
   - Simulate two different users (standard_user and visual_user)
   - Both users add different items to cart simultaneously
   - Verify each user's cart remains independent
   - Complete checkout process for both users
   - Verify order confirmations for both users

8. **Cross-Browser Compatibility**
   - Execute all test scenarios in Chrome and Firefox
   - Verify consistent behavior across browsers:
     * Login functionality
     * Product sorting
     * Cart operations
     * Checkout process
   - Compare performance metrics between browsers
   - Validate UI consistency

Each test scenario includes:
- Pre-conditions and setup
- Step-by-step verification
- Error handling
- Post-conditions cleanup
- Cross-browser validation where applicable

## Running Tests

1. Open Cypress Test Runner (Interactive Mode):
```bash
npx cypress open
```

2. Run all tests in headless mode:
```bash
npx cypress run
```

3. Run specific feature file:
```bash
npx cypress run --spec "cypress/e2e/features/login.feature"
npx cypress run --spec "cypress/e2e/features/shopping_cart.feature"
```

4. Run tests with specific tags:
```bash
npx cypress run --env grepTags=@smoke
npx cypress run --env grepTags=@regression
```

5. Run tests in a specific browser:
```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
```

## Test Reports

Cypress automatically generates test reports after each run in the `cypress/reports` directory.

## Debugging

1. Use `cy.debug()` in your test code to pause execution
2. Use `cy.log()` for logging information during test execution
3. Check screenshots and videos in `cypress/screenshots` and `cypress/videos` after test failures

## Common Issues and Solutions

1. If Cypress is not installed properly:
```bash
npm install cypress --save-dev
```

2. If you get Cucumber preprocessor errors:
```bash
npm install @badeball/cypress-cucumber-preprocessor --save-dev
npm install @bahmutov/cypress-esbuild-preprocessor --save-dev
```

3. Clear Cypress cache:
```bash
npx cypress cache clear
```

## Best Practices
1. Use data-test attributes for element selection
2. Keep tests independent
3. Use background steps for common setup
4. Use appropriate waiting strategies
5. Follow page object pattern for better maintenance

## Contributing
1. Create a new branch for your feature
2. Write tests following the existing patterns
3. Ensure all tests pass
4. Submit a pull request

## Additional Resources
- [Cypress Documentation](https://docs.cypress.io)
- [Cypress Installation Guide](https://docs.cypress.io/app/get-started/install-cypress)
- [Cucumber Documentation](https://cucumber.io/docs)
- [Sauce Demo Website](https://www.saucedemo.com) 