"use client";

import React, { useState } from 'react';
import { useTutorsStore } from '@/store/tutorsStore';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export function TutorsSearchBar() {
  const { searchQuery, setSearchQuery } = useTutorsStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localQuery.trim());
  };

  const handleClear = () => {
    setLocalQuery('');
    setSearchQuery('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    
    // 실시간 검색 (디바운싱 없이)
    if (value.trim() === '') {
      setSearchQuery('');
    }
  };

  const popularSearches = [
    '프로그래밍', '디자인', '영어', '요리', '운동', '음악', '사진'
  ];

  return (
    <div className="w-full">
      {/* 검색 입력창 */}
      <form onSubmit={handleSubmit} className="relative mb-4">
        <div className="relative">
          <SearchIcon 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
            sx={{ fontSize: 24 }} 
          />
          <input
            type="text"
            value={localQuery}
            onChange={handleInputChange}
            placeholder="어떤 분야의 튜터를 찾고 계신가요? (예: 프로그래밍, 디자인, 영어...)"
            className="w-full pl-12 pr-12 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white shadow-sm"
          />
          {localQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ClearIcon sx={{ fontSize: 24 }} />
            </button>
          )}
        </div>
      </form>

      {/* 인기 검색어 */}
      {!searchQuery && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500 font-medium">인기 검색어:</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => {
                setLocalQuery(term);
                setSearchQuery(term);
              }}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      )}

      {/* 검색 결과 표시 */}
      {searchQuery && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>검색어:</span>
          <span className="px-2 py-1 bg-primary text-white rounded-md font-medium">
            {searchQuery}
          </span>
          <button
            onClick={handleClear}
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            검색 초기화
          </button>
        </div>
      )}
    </div>
  );
}