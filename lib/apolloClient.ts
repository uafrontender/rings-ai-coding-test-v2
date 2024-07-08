import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const customFetch = (input: RequestInfo | URL, init?: RequestInit) => {
  const { signal } = init || {};

  return fetch(input, { ...init, signal }).then((response) => {
    if (response.ok) {
      return response;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  });
};

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://rickandmortyapi.com/graphql",
    fetch: customFetch,
  }),
  cache: new InMemoryCache(),
  queryDeduplication: false,
});

export default client;
