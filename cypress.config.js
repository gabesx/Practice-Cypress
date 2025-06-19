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
  projectId: "ois1wk",
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/features/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents,
    env: {
      stepDefinitions: 'cypress/e2e/step_definitions/**/*.js'
    },
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    viewportWidth: 1280,
    viewportHeight: 720,
    experimentalSessionAndOrigin: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    chromeWebSecurity: false,
    retries: {
      runMode: 2,
      openMode: 0
    }
  },
}); 