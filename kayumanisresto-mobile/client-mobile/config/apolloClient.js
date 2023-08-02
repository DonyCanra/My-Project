import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://challenge-pt2-ph3.donycanra.online/",
  cache: new InMemoryCache(),
});

export default client;
