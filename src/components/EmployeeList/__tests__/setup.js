import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";

// Create and configure the Apollo Client
const httpLink = new HttpLink({
  uri: "https://localhost:4000/",
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export { apolloClient };
