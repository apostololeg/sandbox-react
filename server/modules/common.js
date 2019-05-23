import gql from 'graphql-tag';
import { GraphQLModule } from '@graphql-modules/core';

export default new GraphQLModule({
  name: 'common',
  typeDefs: gql`
    type Query {
      serverTime: String
    }
  `,
  resolvers: {
    Query: {
      serverTime: () => new Date(),
    },
  }
});
