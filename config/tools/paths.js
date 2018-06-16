const path = require('path');
const {
  APP_PATH,
  BUILD_PATH,
  SOURCE_PATH,
  ASSETS_PATH
} = require('./constants');

function resolvePath(relativePath) {
  return path.resolve(APP_PATH, relativePath);
}

module.exports = {
    root:    APP_PATH,
    src: resolvePath(SOURCE_PATH),
    modules: resolvePath('node_modules'),
    build:   resolvePath(BUILD_PATH),
    assets:  resolvePath(ASSETS_PATH)
}
