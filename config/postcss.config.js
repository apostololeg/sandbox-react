const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const { PRODUCTION } = require('./const');

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
