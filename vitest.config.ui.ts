import { mergeConfig } from 'vitest/config';
import vitestConfig from './vitest.config';

export default mergeConfig(vitestConfig, {
  test: {
    include: ['src/**/*.spec.ts'],
    setupFiles: ['src/tests/helpers/setup.ts'],
    coverage: {
      include: ['src/**/*.{controller,service,middleware}.ts'],
      exclude: ['src/**/__mocks__'],
      enabled: true,
    },
  },
});
