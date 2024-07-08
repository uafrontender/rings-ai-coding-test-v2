"use client";
import { createContext, useContext, useMemo, useState } from "react";

export const SearchContext = createContext<{
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  isActive: boolean;
  setIsActive: (value: boolean) => void;
}>({
  searchTerm: "",
  setSearchTerm: (value: string) => {
    console.warn("setSearchTerm called but not yet implemented.");
  },
  isActive: false,
  setIsActive: (value: boolean) => {
    console.warn("setIsActive called but not yet implemented.");
  },
});

interface ISearchContextProvider {
  children: React.ReactNode;
}

export const SearchContextProvider: React.FC<ISearchContextProvider> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isActive, setIsActive] = useState<boolean>(false);

  const contextValue = useMemo(
    () => ({
      searchTerm,
      setSearchTerm,
      isActive,
      setIsActive,
    }),
    [isActive, searchTerm]
  );

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
};

export function useSearch() {
  const context = useContext(SearchContext);

  if (!context) throw new Error("useSearch must be used inside a `SearchProvider`");

  return context;
}
