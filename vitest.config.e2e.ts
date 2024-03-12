import { defineConfig, mergeConfig } from 'vitest/config';

export default defineConfig({
  // root level test directory contains all e2e tests
  test: {
    include: ['test/**/*.e2e-{test,spec}.{ts,js}'],
  },
});
