const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ComponentDirectoryPlugin = require('component-directory-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');

// const SentryPlugin = require('@sentry/webpack-plugin');
const extractStyle = new ExtractTextPlugin("[name].[hash].css");

const paths = require('../tools/paths');
const { PAGE_LANG } = require('../tools/constants');

module.exports = {
  entry: [
    `${paths.src}/index.js`
  ],
  output: {
    path: paths.build,
    filename: 'js/[name].js?v=[hash:5]',
  },
  resolve: {
    modules: [
      'node_modules',
      paths.src
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    plugins: [
      new ComponentDirectoryPlugin()
    ],
    extensions: ['.js', '.jsx', '.json', '.styl']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        use: extractStyle.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                // minimize: true,
                // importLoaders: 1,
                // sourceMap: false,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: './config/postcss.config.js'
                }
              }
            },
            {
              loader: 'stylus-loader',
              options: {
                sourceMap: false
              }
            }
          ]
        })
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'react-svg-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: paths.root
    }),
    new CopyPlugin([
      {
        from: `${paths.assets}/common.css`,
        to: paths.build
      },
      {
        from: `${paths.assets}/fonts`,
        to: `${paths.build}/fonts`
      },
      {
        from: `${paths.assets}/logo.svg`,
        to: paths.build
      }
    ]),
    new HtmlWebpackPlugin({
      lang: PAGE_LANG,
      filename: 'index.html',
      template: `${paths.assets}/index.html`,
      chunksSortMode: 'dependency',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new WebappWebpackPlugin({
      logo: `${paths.assets}/logo.svg`,
      favicons: {
        appName: 'sandbox',
        appDescription: 'My spaceship',
        developerName: 'apostol',
        background: '#fff',
        theme_color: '#333'
      }
    }),
    extractStyle,
    new webpack.NamedModulesPlugin(),
    // new SentryPlugin({
    //   include: './dist',
    //   ignore: ['node_modules', 'webpack.config.js'],
    // })
  ]
};
