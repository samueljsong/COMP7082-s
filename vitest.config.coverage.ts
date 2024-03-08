import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts', 'test/**/*.e2e-{test,spec}.{ts,js}'],
    coverage: {
      include: ['src/**/*.{controller,service,middleware}.ts'],
      exclude: ['src/**/__mocks__'],
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
