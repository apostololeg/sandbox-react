import express from 'express';
import webpack from 'webpack';
import cookieParser from 'cookie-parser';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import historyApiFallback from 'connect-history-api-fallback';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLModule } from '@graphql-modules/core';

import config from '../config/webpack/dev.config.js';
import modules from './modules';
import permissions from './permissions';

const { prisma } = require('./prisma/client/');

const port = 3000;
const app = express();
const compiler = webpack(config);

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
server.applyMiddleware({ app, path: '/graphql' });

app.use(historyApiFallback());
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

app.listen({ port }, () => {
  console.log(`\n  🚀  App ready on port ${port}\n`); // eslint-disable-line
});
