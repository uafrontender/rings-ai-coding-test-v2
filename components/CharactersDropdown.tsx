"use client";
import React, { useEffect, useState } from "react";
import { ICharacter } from "@/lib/Character.interface";

import { useSearch } from "@/lib/SearchContext";
import { fetchCharacters } from "./ServerAutocomplete";
import CharacterItem from "./CharacterItem";

const CharactersDropdown = () => {
  const { searchTerm } = useSearch();
  const [characters, setCharacters] = useState<ICharacter[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (searchTerm) {
      const fetchData = async () => {
        try {
          const results = await fetchCharacters(searchTerm, signal);
          setCharacters(results);
        } catch (error) {
          console.log("Fetch error:", error);
        }
      };
      fetchData();
    } else {
      setCharacters([]);
    }

    return () => {
      controller.abort();
    };
  }, [searchTerm]);

  return (
    <ul className="absolute bg-white border mt-1 w-full max-h-60 overflow-y-auto">
      {characters.map((character) => (
        <CharacterItem key={character.id} character={character} />
      ))}
    </ul>
  );
};

export default CharactersDropdown;
