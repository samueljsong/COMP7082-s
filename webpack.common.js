import path from 'path';
import nodeExternals from 'webpack-node-externals';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

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
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
