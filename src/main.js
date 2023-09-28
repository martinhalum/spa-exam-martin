import { ApolloClient, InMemoryCache } from "@apollo/client/core";

import App from "./App.svelte";

const client = new ApolloClient({
  uri: "http://localhost:4000/", // Replace with your GraphQL server URL
  cache: new InMemoryCache(),
});

const app = new App({
  target: document.body,
  props: {
    client: client,
  },
});

export default app;
