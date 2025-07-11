"use client";

import React, { useState } from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { CATEGORIES, getCategoryById } from '@/constants/categories';

const categoryExtendedInfo = [
  { 
    id: 'all', 
    count: '850+',
    description: '모든 분야'
  },
  { 
    id: 'cooking', 
    count: '340+',
    description: '요리 · 베이킹 · 음료'
  },
  { 
    id: 'fitness', 
    count: '280+',
    description: '헬스 · 요가 · 홈트'
  },
  { 
    id: 'music', 
    count: '230+',
    description: '기타 · 피아노 · 드럼'
  }
];

const popularQuestions = [
  { category: 'cooking', question: "파스타 면이 계속 퍼져요", answers: 23 },
  { category: 'music', question: "기타 F코드 소리가 안나요", answers: 31 },
  { category: 'fitness', question: "스쿼트 자세 맞나요?", answers: 18 }
];

interface CategoryNavigationBarProps {
  onCategoryChange?: (categoryId: string) => void;
}

export function CategoryNavigationBar({ onCategoryChange }: CategoryNavigationBarProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange?.(categoryId);
  };

  const filteredQuestions = activeCategory === 'all' 
    ? popularQuestions 
    : popularQuestions.filter(q => q.category === activeCategory);

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          어떤 분야가 궁금하세요?
        </h2>
        <p className="text-gray-600">카테고리를 선택하면 관련 질문들을 볼 수 있어요</p>
      </div>

      {/* 카테고리 바 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {CATEGORIES.map((category) => {
          const extendedInfo = categoryExtendedInfo.find(info => info.id === category.id);
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                activeCategory === category.id
                  ? 'border-primary bg-primary/10 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="text-3xl mb-2">{category.emoji}</div>
              <h3 className={`font-bold mb-1 ${
                activeCategory === category.id ? 'text-primary' : 'text-gray-900'
              }`}>
                {category.name}
              </h3>
              <p className="text-xs text-gray-500 mb-1">{extendedInfo?.description || category.description}</p>
              <div className={`text-sm font-semibold ${
                activeCategory === category.id ? 'text-primary' : 'text-gray-600'
              }`}>
                {extendedInfo?.count || '0+'} 질문
              </div>
            </button>
          );
        })}
      </div>

      {/* 인기 질문들 */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUpIcon className="text-red-500" />
          <h3 className="text-xl font-bold text-gray-900">
            {activeCategory === 'all' ? '전체 인기 질문' : `${getCategoryById(activeCategory)?.name} 인기 질문`}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQuestions.map((item, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="text-lg">{getCategoryById(item.category)?.emoji}</div>
                <span className="text-xs text-gray-500 font-medium">
                  {getCategoryById(item.category)?.name}
                </span>
              </div>
              <p className="text-gray-900 font-medium mb-2">"{item.question}"</p>
              <div className="text-xs text-gray-500">
                {item.answers}개의 답변
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}