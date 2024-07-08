import React from "react";
import Image from "next/image";
import { ICharacter } from "@/lib/Character.interface";
import { useSearch } from "@/lib/SearchContext";

interface IProps {
  character: ICharacter;
}

const CharacterItem: React.FC<IProps> = ({ character }) => {
  const { setSearchTerm } = useSearch();
  return (
    <li
      className="p-2 hover:bg-gray-200 cursor-pointer flex items-center"
      onClick={() => setSearchTerm(character.name)}
    >
      <Image src={character.image} width={48} height={48} alt={character.name} />
      <span className="ml-2">{character.name}</span>
    </li>
  );
};

export default CharacterItem;
