const { NODE_ENV } = require('./tools/constants');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  exec: true,
  sourceMap: (NODE_ENV === 'production' ? false : 'inline'),
  plugins: [
    autoprefixer,
    (NODE_ENV === 'production') && cssnano({
      autoprefixer: true,
      preset: ['default', {
        discardComments: {
          removeAll: true
        }
      }]
    })
  ]
};
