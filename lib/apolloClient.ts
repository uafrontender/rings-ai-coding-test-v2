import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const fetchWithAbortSignal = async (input: RequestInfo | URL, init?: RequestInit) => {
  const { signal } = init || {};
  const response = await fetch(input, { ...init, signal });
  if (response.ok) {
    return response;
  } else {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://rickandmortyapi.com/graphql",
    fetch: fetchWithAbortSignal,
  }),
  cache: new InMemoryCache(),
});

export default client;
