"use client";

import React from 'react';

interface HighlightedTextProps {
  text: string;
  searchTerm: string;
  isCurrentMatch?: boolean;
}

export function HighlightedText({ text, searchTerm, isCurrentMatch = false }: HighlightedTextProps) {
  if (!searchTerm || !text) {
    return <span>{text}</span>;
  }

  const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) => {
        if (!part) return null;
        
        const isMatch = part.toLowerCase() === searchTerm.toLowerCase();
        if (isMatch) {
          return (
            <span
              key={index}
              className={`${
                isCurrentMatch 
                  ? 'bg-orange-300 text-black font-semibold' 
                  : 'bg-yellow-200 text-black'
              } px-0.5 rounded`}
              data-search-match="true"
            >
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}