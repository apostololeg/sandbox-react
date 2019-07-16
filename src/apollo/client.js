import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3000/graphql',
    credentials: 'include'
  }),
  cache: new InMemoryCache({
    addTypename: false
  })
});

export default client;
