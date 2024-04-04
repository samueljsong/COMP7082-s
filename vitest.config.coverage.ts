import { mergeConfig } from 'vitest/config';
import vitestConfig from './vitest.config';

export default mergeConfig(vitestConfig, {
  test: {
    include: ['src/**/*.spec.ts'],
    reporters: ['verbose'],
    setupFiles: ['src/tests/helpers/setup.ts'],
    coverage: {
      include: ['src/**/*.{controller,service,middleware}.ts'],
      exclude: ['src/**/__mocks__'],
      enabled: true,
      thresholds: {
        lines: 80,
        branches: 80,
        statements: 80,
        functions: 80,
      },
    },
  },
});
