import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

// swc plugin needed to solve input validation (default esbuild does not support TS decorators)

export default defineConfig({
  plugins: [swc.vite()],
});
