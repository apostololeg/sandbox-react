import { ApolloServer } from 'apollo-server-express';
import { GraphQLModule } from '@graphql-modules/core';

import context from './contexts';
import modules from './modules';
import permissions from './permissions';

const { prisma: db } = require('./prisma/client/');

const { schema } = new GraphQLModule({
  name: 'app',
  imports: modules,
  resolversComposition: permissions
});

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => context({ req, res, db })
});

export default function(app) {
  server.applyMiddleware({ app, path: '/graphql', cors: false });
}
