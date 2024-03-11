import { merge } from 'webpack-merge';
import webpackCommon from './webpack.common.js';
import path from 'path';
import webpack from 'webpack';

export default merge(webpackCommon, {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
