import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    include: ['src/tests/**/*.{spec,test}.ts'],
    setupFiles: ['src/tests/helpers/setup.ts'],
  },
});
