import { defineConfig } from 'vitest/config';

export default defineConfig({
  // file pattern to look for to run tests on
  test: {
    include: ['src/**/*.spec.ts'],
  },
  // shorten import paths
  resolve: {
    alias: {
      /* auth: '/src/auth' */
    },
  },
});
