import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.ts',
  },
  component: {
    specPattern: 'cypress/component/**/*.cy.tsx',
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
