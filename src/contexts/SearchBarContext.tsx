"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchBarContextType {
  isHeroSearchVisible: boolean;
  setIsHeroSearchVisible: (visible: boolean) => void;
}

const SearchBarContext = createContext<SearchBarContextType | undefined>(undefined);

export const SearchBarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isHeroSearchVisible, setIsHeroSearchVisible] = useState(true);

  return (
    <SearchBarContext.Provider value={{ isHeroSearchVisible, setIsHeroSearchVisible }}>
      {children}
    </SearchBarContext.Provider>
  );
};

export const useSearchBarContext = () => {
  const context = useContext(SearchBarContext);
  if (context === undefined) {
    throw new Error('useSearchBarContext must be used within a SearchBarProvider');
  }
  return context;
};