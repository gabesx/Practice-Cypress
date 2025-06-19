# Sauce Demo E2E Test Suite

This is my practice project for learning end-to-end testing on the Sauce Demo website using Cypress and Cucumber.

## What You'll Need

- [Node.js](https://nodejs.org/) installed on your computer
- npm (comes with Node.js)
- Git
- I used macOS for this project

## Getting Started

1. First, create a folder for your project:
```bash
mkdir sauce-demo-tests
cd sauce-demo-tests
```

2. Set up a new Node.js project:
```bash
npm init -y
```

3. Install the tools we need:
```bash
npm install cypress --save-dev

# Install Cucumber
npm install @badeball/cypress-cucumber-preprocessor --save-dev

# Install esbuild preprocessor
npm install @bahmutov/cypress-esbuild-preprocessor --save-dev
```

4. Open Cypress to create the basic folder structure:
```bash
npx cypress open
```

5. Create the folders we need:
```bash
mkdir -p cypress/e2e/features
mkdir -p cypress/e2e/step_definitions
```

6. If you want to use my existing tests, clone this repo:
```bash
git clone <repository-url>
cd <project-directory>
```

7. Install everything:
```bash
npm install
```

## How the Project is Organized

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

## Setting Up the Configuration Files

1. Create the main Cypress config file:
```bash
touch cypress.config.js
```

Put this inside:
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

2. Create the environment file:
```bash
touch cypress.env.json
```

Add this content:
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

**Important**: Never commit your actual credentials to git! The `cypress.env.json` file is already in `.gitignore` to keep your secrets safe.

## What I Built

I created tests for these main scenarios:

1. **Buying a Backpack and T-Shirt**
   - Log in as a regular user
   - Add the backpack to cart
   - Add the t-shirt to cart
   - Check that both items are in the cart
   - Go through checkout
   - Make sure the prices add up correctly
   - Confirm the order went through

2. **Buying a Backpack and Fleece Jacket**
   - Same flow as above but with different items
   - Tests the jacket instead of the t-shirt

3. **Sorting Products by Name (A to Z)**
   - Log in and sort the product list alphabetically
   - Check that items are in the right order
   - Verify the first and last items make sense

4. **Sorting Products by Name (Z to A)**
   - Same as above but reverse alphabetical order

5. **Sorting by Price (Cheapest First)**
   - Sort products from lowest to highest price
   - Check that the cheapest item comes first
   - Verify the most expensive item is last

6. **Sorting by Price (Most Expensive First)**
   - Same as above but most expensive first

7. **Two Users Shopping at the Same Time**
   - Simulate two different people using the site
   - Both add items to their carts
   - Make sure each person's cart stays separate
   - Both complete their purchases successfully
   - This scenario is achieved through parallel execution in our CI pipeline:
     - Uses different user accounts (standard_user and visual_user) configured in environment variables
     - Tests run simultaneously across multiple CI machines
     - Implemented using GitHub Actions with parallel execution
     - Each user session is isolated using Cypress's session management
     - Can be run locally using: `npx cypress run --record --group 2x-chrome --browser chrome --parallel`

8. **Testing in Different Browsers**
   - Run all the tests in Chrome
   - Run all the tests in Firefox
   - Make sure everything works the same way in both

## Running the Tests

1. Open Cypress to run tests interactively:
```bash
npx cypress open
```

2. Run all tests headless:
```bash
npx cypress run
```

3. Run just one specific test file:
```bash
npx cypress run --spec "cypress/e2e/features/shopping_cart.feature"
npx cypress run --spec "cypress/e2e/features/sorting.feature"
```

4. Run specific groups of tests using tags:
```bash
# Just the quick tests
npx cypress run --env TAGS='@smoke'

# All the checkout tests
npx cypress run --env TAGS='@checkout'

# Run all regression tags
npx cypress run --env TAGS='@regression'

# Tests for specific users
npx cypress run --env TAGS='@standard_user'
npx cypress run --env TAGS='@visual_user'

# Tests that involve multiple users
npx cypress run --env TAGS='@parallel'
npx cypress run --env TAGS='@multi_user'

# Tests for specific features
npx cypress run --env TAGS='@cart'
npx cypress run --env TAGS='@sorting'
npx cypress run --env TAGS='@inventory'

# Combine multiple tags
npx cypress run --env TAGS='@smoke and @checkout'
npx cypress run --env TAGS='@standard_user and @smoke'

# Skip certain types of tests
npx cypress run --env TAGS='not @parallel'
npx cypress run --env TAGS='@regression and not @parallel'
```

5. Run tests in different browsers:
```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
```

6. Change how the tests run:
```bash
# Use a different website URL
npx cypress run --config baseUrl=https://www.saucedemo.com

# Change the screen size
npx cypress run --config viewportWidth=1280,viewportHeight=720

# Turn off video recording
npx cypress run --config video=false
```

## What Happens After Tests Run

Cypress creates reports automatically in the `cypress/reports` folder.

## When Things Go Wrong

1. Use `cy.debug()` in your test code to pause and see what's happening
2. Use `cy.log()` to print messages during the test
3. Check the screenshots and videos in `cypress/screenshots` and `cypress/videos` if tests fail

## Common Problems and How to Fix Them

1. If Cypress won't install:
```bash
npm install cypress --save-dev
```

2. If you get errors about Cucumber:
```bash
npm install @badeball/cypress-cucumber-preprocessor --save-dev
npm install @bahmutov/cypress-esbuild-preprocessor --save-dev
```

3. If things get weird, clear the cache:
```bash
npx cypress cache clear
```

## Tips for Writing Good Tests

1. Use data-test attributes when you can - they're more reliable
2. Keep tests independent - each test should work on its own
3. Use background steps for things you do in every test (like logging in)
4. Don't use hard waits - let Cypress wait for elements to appear
5. Organize your code well - it makes it easier to fix things later

## Want to Help?

1. Create a new branch for your changes
2. Write tests that follow the same style as the existing ones
3. Make sure all tests pass
4. Send a pull request

## Useful Links

- [Cypress Documentation](https://docs.cypress.io)
- [Cypress Installation Guide](https://docs.cypress.io/app/get-started/install-cypress)
- [Cucumber Documentation](https://cucumber.io/docs)
- [Sauce Demo Website](https://www.saucedemo.com)

## Continuous Integration Setup

This project is configured to run in CI using GitHub Actions with parallel test execution. Here's how it's set up:

### Basic CI Configuration

1. **Installation in CI**:
   ```bash
   npm install cypress --save-dev
   ```

2. **Running Tests**:
   ```bash
   npx cypress run
   ```

### Parallel Test Execution

We use parallel test execution to run multiple instances of Cypress at the same time, which helps:
- Reduce total test run time
- Run the same tests across different browsers simultaneously
- Execute simultaneous user scenarios in isolation

Our setup includes:
- Chrome tests running on 2 machines (`2x-chrome`)
- Firefox tests running on 2 machines (`2x-firefox`)
- Electron tests running on 4 machines (`4x-electron`)

### Recording Results

Tests are recorded to Cypress Cloud using:
```bash
cypress run --record --key <record_key> --parallel
```

This provides:
- Test run recordings and screenshots
- Parallel test execution dashboard
- Test failure debugging tools
- Cross-browser test results

### Environment Variables

The following environment variables are configured in CI:
```bash
CYPRESS_RECORD_KEY=<your-key>
STANDARD_USERNAME=<username>
STANDARD_PASSWORD=<password>
VISUAL_USERNAME=<username>
VISUAL_PASSWORD=<password>
```

For more details on CI setup, refer to the [Cypress CI documentation](https://docs.cypress.io/app/continuous-integration/overview). 