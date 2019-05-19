const fs = require('fs');
const {
  parsed: {
    PAGE_LANG,
    BUILD_PATH,
    SOURCE_PATH,
    ASSETS_PATH,
    HOST,
    PORT
  }
} = require('dotenv').config();
const { NODE_ENV } = process.env;
const APP_PATH = fs.realpathSync(process.cwd());

module.exports = {
  APP_PATH,
  NODE_ENV,
  BUILD_PATH,
  SOURCE_PATH,
  ASSETS_PATH,
  HOST,
  PORT
};
