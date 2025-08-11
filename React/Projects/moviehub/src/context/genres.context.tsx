// src/context/genres.context.tsx

import React, { createContext, useState } from "react";

type GenresContextType = {
  genres: number | null;
  setGenres: (data: number) => void;
};

// ✅ Export context and provider separately
export const GenresContext = createContext<GenresContextType>({
  genres: null,
  setGenres: () => {},
});

export const GenresProvider = ({ children }: { children: React.ReactNode }) => {
  const [genres, setGenres] = useState<number | null>(null);

  return (
    <GenresContext.Provider value={{ genres, setGenres }}>
      {children}
    </GenresContext.Provider>
  );
};
