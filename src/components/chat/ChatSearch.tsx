"use client";

import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface ChatSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearchSubmit: () => void;
  currentMatch: number;
  totalMatches: number;
  onPreviousMatch: () => void;
  onNextMatch: () => void;
  onClose: () => void;
}

export function ChatSearch({ 
  searchTerm, 
  onSearchChange,
  onSearchSubmit,
  currentMatch,
  totalMatches,
  onPreviousMatch,
  onNextMatch,
  onClose
}: ChatSearchProps) {
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

  // 컴포넌트가 마운트되면 검색창에 포커스
  useEffect(() => {
    inputRef?.focus();
  }, [inputRef]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchTerm.trim()) {
        if (totalMatches > 0) {
          // 이미 검색 결과가 있으면 탐색
          if (e.shiftKey) {
            onPreviousMatch();
          } else {
            onNextMatch();
          }
        } else {
          // 검색 결과가 없으면 새로 검색
          onSearchSubmit();
        }
      } else {
        // 검색어가 없으면 새로 검색
        onSearchSubmit();
      }
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="px-6 py-3 border-b border-gray-200">
      <div className="flex items-center gap-3">
        {/* 검색 입력 */}
        <div className="flex-1 relative">
          <input
            ref={setInputRef}
            type="text"
            placeholder="메시지 검색... (Enter: 다음, Shift+Enter: 이전, Esc: 닫기)"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-2 pl-10 pr-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-white"
          />
          <button
            onClick={() => {
              if (searchTerm.trim() && totalMatches > 0) {
                onNextMatch();
              } else {
                onSearchSubmit();
              }
            }}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer flex items-center justify-center"
            title="검색"
          >
            <SearchIcon sx={{ fontSize: 16 }} />
          </button>
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer flex items-center justify-center"
              title="검색어 지우기"
            >
              <ClearIcon sx={{ fontSize: 16 }} />
            </button>
          )}
        </div>

        {/* 검색 결과 표시 및 탐색 */}
        {searchTerm && totalMatches > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <button
                onClick={onPreviousMatch}
                disabled={totalMatches === 0}
                className="p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded transition-colors"
                title="이전 결과 (Shift+Enter)"
              >
                <KeyboardArrowUpIcon sx={{ fontSize: 16 }} />
              </button>
              <button
                onClick={onNextMatch}
                disabled={totalMatches === 0}
                className="p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded transition-colors"
                title="다음 결과 (Enter)"
              >
                <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}