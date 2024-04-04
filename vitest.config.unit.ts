import { mergeConfig } from 'vitest/config';
import vitestConfig from './vitest.config';

export default mergeConfig(vitestConfig, {
  test: {
    include: ['src/**/*.spec.ts', '!src/tests/**/*.spec.ts'],
    reporters: ['verbose'],
  },
});
