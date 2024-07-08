import { ICharacter } from "@/lib/Character.interface";
import { gql, TypedDocumentNode } from "@apollo/client";

interface Data {
  characters: {
    results: ICharacter[];
  };
}

interface Variables {
  name: string;
}

export const SEARCH_CHARACTERS_QUERY: TypedDocumentNode<Data, Variables> = gql`
  query SearchCharacters($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
        image
        gender
      }
    }
  }
`;
