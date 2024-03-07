import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      include: ['src/**/*.ts'],
      enabled: true,
      thresholds: {
        lines: 30,
        branches: 30,
        statements: 30,
        functions: 30,
      },
    },
  },
});
