const { PRODUCTION } = require('./const');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  exec: true,
  sourceMap: (PRODUCTION ? false : 'inline'),
  minimize: PRODUCTION,
  plugins: [
    autoprefixer,
    PRODUCTION && cssnano({
      autoprefixer: true,
      preset: ['default', {
        discardComments: {
          removeAll: true
        }
      }]
    })
  ]
};
