import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  })
});

export default client;
