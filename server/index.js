import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLModule } from '@graphql-modules/core';
import path from 'path';

import config from '../config/webpack/dev.config.js';
import paths from '../config/tools/paths';
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

// app.get('*', (req, res) => {
//   res.sendFile(path.join(paths.build, 'index.html'));
// });

app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: false
  })
);

app.use(webpackHotMiddleware(compiler));

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port }, () => {
  console.log(`\n  🚀  App ready on port ${port}\n`); // eslint-disable-line
});
