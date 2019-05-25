const webpack = require('webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const config = require('./common.config.js');

module.exports = {
  ...config,
  mode: 'development',
  entry: [
    ...config.entry,
    'webpack-hot-middleware/client'
  ],
  output: {
    ...config.output,
    publicPath: '/',
  },
  plugins: [
    ...config.plugins,
    new ErrorOverlayPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devtool: 'eval-source-map',
};
