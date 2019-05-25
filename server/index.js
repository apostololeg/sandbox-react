import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import historyApiFallback from 'connect-history-api-fallback';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLModule } from '@graphql-modules/core';

import config from '../config/webpack/dev.config.js';
import modules from './modules';
import permissions from './permissions';

const port = 3000;
const app = express();
const compiler = webpack(config);

const { schema, context } = new GraphQLModule({
  name: 'app',
  imports: modules,
  resolversComposition: permissions,
});
const server = new ApolloServer({ schema, context });

app.use(historyApiFallback())
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: false,
  logLevel: 'trace',
}));
app.use(webpackHotMiddleware(compiler));

server.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log(`\n  🚀  App ready on port ${port}\n`); // eslint-disable-line
});
