const {
  parsed: {
    PAGE_LANG,
    HOST,
    PORT,
    JWT_SECRET,
    AWS_SECRET,
    AWS_KEY_ID,
    COOKIE_TOKEN_NAME,
    DO_SPACE_NS,
    DO_SPACE_NAME
  }
} = require('dotenv').config();

const { NODE_ENV } = process.env;

module.exports = {
  PAGE_LANG,
  NODE_ENV,
  HOST,
  PORT,
  JWT_SECRET,
  AWS_SECRET,
  AWS_KEY_ID,
  COOKIE_TOKEN_NAME,
  DO_SPACE_NS,
  DO_SPACE_NAME
};
