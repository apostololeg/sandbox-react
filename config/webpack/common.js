const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ComponentDirectoryPlugin = require('component-directory-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');

const paths = require('../paths');
const {
  PRODUCTION,
  PAGE_LANG,
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
      quill: `${paths.modules}/quill`
    },
    plugins: [
      new ComponentDirectoryPlugin()
    ],
    extensions: ['.js', '.jsx']
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
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
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
                loader: 'svg-react-loader',
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
      PROTOCOL: JSON.stringify(PROTOCOL),
      HOST: JSON.stringify(HOST),
      PORT: JSON.stringify(PORT),
      DO_SPACE_NS: JSON.stringify(DO_SPACE_NS),
      DO_SPACE_NAME: JSON.stringify(DO_SPACE_NAME)
    }),
    new CleanWebpackPlugin(['build'], {
      root: paths.root
    }),
    new CopyPlugin([
      {
        from: `${paths.assets}/common.css`,
        to: paths.build
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
    new MiniCssExtractPlugin({
      filename: PRODUCTION ? '[name].[hash].css' : '[name].css',
      chunkFilename: PRODUCTION ? '[id].[hash].css' : '[id].css',
    }),
    new webpack.NamedModulesPlugin()
  ]
};
