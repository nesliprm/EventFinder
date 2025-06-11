import { createContext, useState, useContext } from "react";

export const SearchContext = createContext({});
SearchContext.displayName = "SearchContext";

export const SearchContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchContextProvider");
  }
  return context;
};
