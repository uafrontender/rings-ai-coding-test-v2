"use client";
import CharactersDropdown from "./CharactersDropdown";
import { useSearch } from "@/lib/SearchContext";

export default function ClientAutocomplete() {
  const { searchTerm, setSearchTerm } = useSearch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    name.length < 1 ? setSearchTerm("") : setSearchTerm(name);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className="border p-2"
        placeholder="Search for a character..."
      />
      {searchTerm && <CharactersDropdown />}
    </div>
  );
}
