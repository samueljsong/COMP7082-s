import { mergeConfig } from 'vitest/config';
import vitestConfig from './vitest.config';

export default mergeConfig(vitestConfig, {
  // root level test directory contains all e2e tests
  test: {
    include: ['test/**/*.e2e-{test,spec}.{ts,js}'],
  },
});
