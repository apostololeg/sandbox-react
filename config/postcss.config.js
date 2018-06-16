const { NODE_ENV } = require('./tools/constants');

module.exports = {
    exec: true,
    sourceMap: (NODE_ENV === 'production' ? false : 'inline'),
    plugins: [
        (NODE_ENV === 'production') && require('cssnano')({
            autoprefixer: true,
            preset: ['default', {
                discardComments: {
                    removeAll: true
                }
            }]
        })
    ]
};
