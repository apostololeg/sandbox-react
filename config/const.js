const {
  parsed: {
    PEM_DIR,
    PROTOCOL,
    HOST,
    PORT,
    PAGE_LANG,
    JWT_SECRET,
    AWS_SECRET,
    AWS_KEY_ID,
    COOKIE_TOKEN_NAME,
    DO_SPACE_NS,
    DO_SPACE_NAME
  }
} = require('dotenv').config();

const { NODE_ENV } = process.env;
const PRODUCTION = NODE_ENV === 'production';

const env = {
  PRODUCTION,
  PEM_DIR,
  PROTOCOL,
  HOST,
  PORT,
  PAGE_LANG,
  JWT_SECRET,
  AWS_SECRET,
  AWS_KEY_ID,
  COOKIE_TOKEN_NAME,
  DO_SPACE_NS,
  DO_SPACE_NAME
};

if (!PRODUCTION) {
  Object.assign(env, {
    PROTOCOL: 'http://',
    HOST: 'localhost',
    PORT: ':3000'
  });
}

module.exports = env;
