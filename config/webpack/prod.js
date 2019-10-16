const merge = require('webpack-merge');
const common = require('./common.js');
const paths = require('../paths');

const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const zopfli = require('@gfx/zopfli');
const OfflinePlugin = require('offline-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
// const SentryPlugin = require('@sentry/webpack-plugin');

module.exports = merge(common, {
  plugins: [
    new HtmlWebpackPartialsPlugin({
      path: `${paths.assets}/analytics.html`,
      location: 'body',
      priority: 'low'
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 0,
      minRatio: 1,
      compressionOptions: {
        level: 11,
        numiterations: 15,
      },
      algorithm: zopfli.gzip
    }),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 0,
      minRatio: 1,
    }),
    // new SentryPlugin({
    //   include: './dist',
    //   ignore: ['node_modules', 'webpack.config.js'],
    // })
    new OfflinePlugin()
  ]
});
