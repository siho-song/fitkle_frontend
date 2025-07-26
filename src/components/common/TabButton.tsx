"use client";

import React from 'react';

interface TabButtonProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export function TabButton({ children, isActive, onClick, className = '' }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold
        transition-all duration-200 relative whitespace-nowrap cursor-pointer
        ${isActive
          ? 'bg-primaryLight text-black border-gray-300'
          : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}