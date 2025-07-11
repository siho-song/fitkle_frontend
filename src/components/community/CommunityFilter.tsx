"use client";

import React, { useState } from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { CATEGORIES } from '@/constants/categories';
import { POST_TYPES } from '@/constants/postTypes';

const sortOptions = [
  { id: 'latest', name: '최신순', icon: <AccessTimeIcon sx={{ fontSize: 17 }}/> },
  { id: 'views', name: '조회순', icon: <TrendingUpIcon sx={{ fontSize: 17 }}/> },
  { id: 'likes', name: '좋아요순', icon: <TrendingUpIcon sx={{ fontSize: 17 }}/> },
  { id: 'comments', name: '댓글순', icon: <QuestionAnswerIcon sx={{ fontSize: 17 }}/> }
];

interface CommunityFilterProps {
  onCategoryChange?: (categoryId: string) => void;
  onTypeChange?: (typeId: string) => void;
  onSortChange?: (sortId: string) => void;
}

export function CommunityFilter({ 
  onCategoryChange, 
  onTypeChange, 
  onSortChange 
}: CommunityFilterProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const [activeSort, setActiveSort] = useState('latest');

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange?.(categoryId);
  };

  const handleTypeClick = (typeId: string) => {
    setActiveType(typeId);
    onTypeChange?.(typeId);
  };

  const handleSortClick = (sortId: string) => {
    setActiveSort(sortId);
    onSortChange?.(sortId);
  };

  return (
    <div className="bg-white sticky top-0 z-10">
      <div className="py-8">
        {/* 카테고리 필터 */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">카테고리</h3>
          <div className="flex flex-wrap gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm font-medium hover:scale-105 active:scale-95 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/25'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="text-lg">{category.emoji}</span>
                <span className="font-semibold">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 게시글 타입과 정렬 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* 게시글 타입 */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-800">타입</span>
            <div className="flex gap-2">
              {POST_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeClick(type.id)}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-medium transition-all duration-200 hover:scale-105 ${
                    activeType === type.id
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100 bg-gray-50'
                  }`}
                >
                  <span className={`${activeType === type.id ? 'text-white' : type.color}`}>
                    {type.icon}
                  </span>
                  <span className="font-bold">{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 정렬 옵션 */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-800">정렬</span>
            <div className="flex gap-2 ">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSortClick(option.id)}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-medium transition-all duration-200 hover:scale-105 ${
                    activeSort === option.id
                      ? 'bg-gray-900 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100 bg-gray-50'
                  }`}
                >
                  <span className="text-sm">{option.icon}</span>
                  <span className='font-bold'> {option.name} </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}