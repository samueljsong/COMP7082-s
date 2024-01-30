const { merge } = require('webpack-merge');
const webpackCommon = require('./webpack.common');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(webpackCommon, {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
