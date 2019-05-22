const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const config = require('./common.config.js');

module.exports = {
  ...config,
  plugins: [
    ...config.plugins,
    new ErrorOverlayPlugin(),
  ]
};
