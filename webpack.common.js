import path from 'path';
import nodeExternals from 'webpack-node-externals';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

let outputPath = path.resolve(__dirname, 'dist');

// windows adding forwards slashes in beginning of resolved path, breaking build
// why windows :(
if (process.platform === 'win32') {
  outputPath = outputPath.substring(3);
}

export default {
  entry: {
    app: './src/index.ts',
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [{ test: /\.ts$/, use: 'ts-loader', exclude: '/node_modules/' }],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.cjs',
    clean: true,
  },
};
