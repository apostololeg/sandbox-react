import { ApolloServer } from 'apollo-server';
import { GraphQLModule } from '@graphql-modules/core';

import modules from './modules';
import permissions from './permissions';

const { schema, context } = new GraphQLModule({
   name: 'app',
   imports: modules,
   resolversComposition: permissions,
});
const server = new ApolloServer({ schema, context });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`); // eslint-disable-line
});
