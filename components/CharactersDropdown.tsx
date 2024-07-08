"use client";
import React, { useEffect, useState } from "react";
import { ICharacter } from "@/lib/Character.interface";

import { useSearch } from "@/lib/SearchContext";
import { fetchCharacters } from "./ServerAutocomplete";
import CharacterItem from "./CharacterItem";
import { ApolloError } from "@apollo/client";
import SkeletonLoader from "./SkeletonLoader";

const CharactersDropdown = () => {
  const { searchTerm } = useSearch();
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      if (searchTerm.length === 0) {
        setCharacters([]);
        return;
      }

      try {
        setIsLoading(true);
        const results = await fetchCharacters(searchTerm, signal);
        setCharacters(results);
      } catch (error) {
        // Log non-AbortError errors only
        if (!(error instanceof ApolloError) || error.message.trim() !== "The operation was aborted.") {
          console.error("Fetch error:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [searchTerm]);

  const renderResults = () => {
    if (isLoading) {
      return <SkeletonLoader />;
    }

    if (characters.length === 0) {
      return <li className="p-2">No characters found</li>;
    }

    return characters.map((character) => <CharacterItem key={character.id} character={character} />);
  };

  return (
    <ul className="absolute bg-white border-gray-600 border-2 -mt-2 w-full max-h-96 overflow-y-auto rounded-b-lg">
      {renderResults()}
    </ul>
  );
};

export default CharactersDropdown;
