const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ComponentDirectoryPlugin = require('component-directory-webpack-plugin');
const FaviconWebpackPlugin = require('favicons-webpack-plugin');

const paths = require('../paths');
const {
  PRODUCTION,
  PAGE_LANG,
  PAGE_TITLE,
  PROTOCOL,
  HOST,
  PORT,
  DO_SPACE_NS,
  DO_SPACE_NAME
} = require('../const');

module.exports = {
  entry: [
    `${paths.client}/index.js`
  ],
  output: {
    path: paths.build,
    filename: 'js/[name].js?v=[hash:5]',
  },
  resolve: {
    modules: [
      'node_modules',
      paths.client
    ],
    alias: {
      config: paths.config,
      quill: `${paths.modules}/quill`,
      'quill-css': `${paths.modules}/quill/dist/quill.core.css`,
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils'
    },
    plugins: [
      new ComponentDirectoryPlugin()
    ],
    extensions: ['.js', '.jsx', '.css']
  },
  module: {
    noParse: /node_modules\/quill\/dist/,
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: {
          exclude: [
            paths.modules
          ],
          test: [
            /\.quill\.js$/,
          ]
        }
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              }
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
          'stylus-loader'
        ]
      },
      {
        test: /\.svg$/,
        exclude: paths.modules,
        oneOf: [
          {
            issuer: /\.jsx?$/,
            use: [
              {
                loader: 'babel-loader'
              },
              {
                loader: 'preact-svg-loader',
              }
            ]
          },
          {
            loader: 'file-loader',
            options: {
              name: 'static/[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/[name].[ext]',
            outputPath: 'images/'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(PRODUCTION),
      PROTOCOL: JSON.stringify(PROTOCOL),
      HOST: JSON.stringify(HOST),
      PORT: JSON.stringify(PORT),
      DO_SPACE_NS: JSON.stringify(DO_SPACE_NS),
      DO_SPACE_NAME: JSON.stringify(DO_SPACE_NAME)
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: `${paths.assets}/*.css`,
        to: paths.build
      },
      {
        from: `${paths.assets}/fonts`,
        to: `${paths.build}/fonts`
      },
      {
        from: `${paths.assets}/logo.svg`,
        to: paths.build
      },
      {
        from: `${paths.assets}/manifest.json`,
        to: paths.build
      }
    ]),
    new HtmlWebpackPlugin({
      lang: PAGE_LANG,
      title: PAGE_TITLE,
      filename: 'index.html',
      template: `${paths.assets}/index.html`,
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
    new FaviconWebpackPlugin(`${paths.assets}/logo.svg`),
    new MiniCssExtractPlugin({
      filename: PRODUCTION ? '[name].[hash].css' : '[name].css',
      chunkFilename: PRODUCTION ? '[id].[hash].css' : '[id].css',
    }),
    new webpack.NamedModulesPlugin(),
  ]
};
