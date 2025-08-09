import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    viewportWidth: 1280,
    viewportHeight: 720,
  },

  env: {
    // Test user credentials - in a real project, use environment variables
    testUserEmail: "test@example.com",
    testUserPassword: "Test123!",
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
