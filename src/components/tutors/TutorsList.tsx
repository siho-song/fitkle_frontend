"use client";

import React from 'react';
import { useTutorsStore } from '@/store/tutorsStore';
import { TutorCard } from './TutorCard';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Link from 'next/link';

export function TutorsList() {
  const { filteredTutors, searchQuery, categoryFilter } = useTutorsStore();

  if (filteredTutors.length === 0) {
    const getEmptyMessage = () => {
      if (searchQuery) {
        return `"${searchQuery}"에 대한 검색 결과가 없습니다.`;
      }
      if (categoryFilter !== 'all') {
        return `"${categoryFilter}" 카테고리에 등록된 튜터가 없습니다.`;
      }
      return '등록된 튜터가 없습니다.';
    };

    return (
      <div className="text-center py-16">
        <PersonSearchIcon className="mx-auto text-gray-300 mb-4" sx={{ fontSize: 64 }} />
        <h3 className="text-xl font-semibold text-gray-500 mb-2">{getEmptyMessage()}</h3>
        <p className="text-gray-400 mb-6">
          다른 검색어나 필터 조건을 시도해보세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            href="/search"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            전체 검색하기
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            새로고침
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTutors.map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
      
      {/* 페이지네이션이나 무한스크롤을 여기에 추가할 수 있습니다 */}
      {filteredTutors.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {filteredTutors.length}명의 튜터를 찾았습니다
          </p>
        </div>
      )}
    </div>
  );
}