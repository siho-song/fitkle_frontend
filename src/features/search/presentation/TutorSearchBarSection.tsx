"use client";

import React, { useState } from 'react';

interface TutorSearchBarSectionProps {
  sortValue?: '리뷰 많은 순' | '평점 높은 순' | '경력 많은 순';
  categoryValue?: string;
  categories: string[];
  onSortChange: (value: '리뷰 많은 순' | '평점 높은 순' | '경력 많은 순' | undefined) => void;
  onCategoryChange: (value: string | undefined) => void;
  onSearch: (query: string) => void;
  className?: string;
}

export const TutorSearchBarSection: React.FC<TutorSearchBarSectionProps> = ({
  sortValue,
  categoryValue,
  categories,
  onSortChange,
  onCategoryChange,
  onSearch,
  className = '',
}) => {
  const [search, setSearch] = useState('');

  return (
    <div className={`flex flex-wrap items-center gap-4 mb-8 ${className}`}>
      {/* 카테고리 드롭다운 */}
      <select
        className="px-3 py-2 rounded border text-sm min-w-[120px]"
        value={categoryValue || ''}
        onChange={e => onCategoryChange(e.target.value || undefined)}
      >
        <option value="">카테고리</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      {/* 정렬 드롭다운 */}
      <select
        className="px-3 py-2 rounded border text-sm min-w-[120px]"
        value={sortValue || ''}
        onChange={e => onSortChange(e.target.value as unknown as '리뷰 많은 순' | '평점 높은 순' | '경력 많은 순' | undefined)}
      >
        <option value="">정렬</option>
        <option value="리뷰 많은 순">리뷰 많은 순</option>
        <option value="평점 높은 순">평점 높은 순</option>
        <option value="경력 많은 순">경력 많은 순</option>
      </select>
      {/* 검색창 */}
      <input
        className="px-3 py-2 rounded border text-sm w-64"
        placeholder="튜터명, 설명 검색"
        value={search}
        onChange={e => setSearch(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') onSearch(search); }}
      />
      <button
        className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
        onClick={() => onSearch(search)}
      >
        검색
      </button>
    </div>
  );
}; 