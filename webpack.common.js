const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
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
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
