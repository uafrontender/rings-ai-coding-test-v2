"use client";
import CharactersDropdown from "./CharactersDropdown";
import { useSearch } from "@/lib/SearchContext";

export default function ClientAutocomplete() {
  const { searchTerm, setSearchTerm, setIsActive, isActive } = useSearch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    name.length < 1 ? setSearchTerm("") : setSearchTerm(name);
  };

  return (
    <div className="relative w-full max-w-96">
      <input
        name="autocomplete"
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onFocus={() => setIsActive(true)}
        onBlur={() => setTimeout(() => setIsActive(false), 200)}
        className="px-2 py-3 w-full text-lg rounded-lg border-2 border-gray-400 focus:border-gray-600 outline-none"
        placeholder="Type to search for a character..."
      />
      {searchTerm.length > 0 && isActive && <CharactersDropdown />}
    </div>
  );
}
