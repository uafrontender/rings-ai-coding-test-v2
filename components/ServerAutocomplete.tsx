import client from "@/lib/apolloClient";
import { SEARCH_CHARACTERS_QUERY } from "../graphql/queries";

export const fetchCharacters = async (name: string, signal: AbortSignal) => {
  const { data } = await client.query({
    query: SEARCH_CHARACTERS_QUERY,
    variables: { name },
    context: { fetchOptions: { signal } },
  });
  return data.characters.results;
};
