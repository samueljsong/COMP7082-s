import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

export default defineConfig({
  plugins: [swc.vite()],
  test: {
    include: ['src/tests/**/*.{spec,test}.ts'],
    reporters: ['verbose'],
    setupFiles: ['src/tests/helpers/setup.ts'],
  },
});
