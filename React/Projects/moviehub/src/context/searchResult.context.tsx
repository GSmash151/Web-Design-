// src/context/searchResult.context.tsx
import { createContext, useState } from "react";

// Define a type for your search data if possible.
// For now, using 'any' for flexibility, but a more specific type is better.
interface SearchResultContextType {
  searchText: string;
  searchData: any | null; // searchData can be any type or null
  setSearchData: (data: any | null) => void;
  setSearchText: (text: string) => void;
}

export const SearchResultContext = createContext<SearchResultContextType>({
  searchText: "",
  searchData: null, // Initialize as null
  setSearchData: () => {},
  setSearchText: () => {},
});

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState<any | null>(null); // Initialize as null

  const value = { searchText, searchData, setSearchData, setSearchText };

  return (
    <SearchResultContext.Provider value={value}>
      {children}
    </SearchResultContext.Provider>
  );
};