import express from 'express';
import webpack from 'webpack';
import cookieParser from 'cookie-parser';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import historyApiFallback from 'connect-history-api-fallback';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLModule } from '@graphql-modules/core';

import config from '../config/webpack/dev.config.js';
import paths from '../config/tools/paths';
import modules from './modules';
import permissions from './permissions';

require('dotenv').config();

const isDev = process.env.NODE_ENV === 'development';
const { prisma } = require('./prisma/client/');

const port = isDev ? 3000 : 80;
const app = express();

const { schema } = new GraphQLModule({
  name: 'app',
  imports: modules,
  resolversComposition: permissions,
});
const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res, db: prisma })
});

app.use(cookieParser());
app.use(historyApiFallback());
server.applyMiddleware({ app, path: '/graphql' });

if (isDev) {
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      errors: true,
      warnings: true,
      modules: false,
      chunks: false,
      children: false,
    },
    logLevel: 'trace',
  }));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static(paths.build));
}

app.listen({ port }, () => {
  console.log(`\n  🚀  App ready on port ${port}\n`); // eslint-disable-line
});
