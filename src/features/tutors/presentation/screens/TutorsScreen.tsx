"use client";

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { TutorsList } from '@/components/tutors/TutorsList';
import { TutorsFilters } from '@/components/tutors/TutorsFilters';
import { TutorsSearchBar } from '@/components/tutors/TutorsSearchBar';
import { TutorsStats } from '@/components/tutors/TutorsStats';
import { useTutorsStore } from '@/store/tutorsStore';
import { sampleTutors } from '@/data/sampleTutors';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import FilterListIcon from '@mui/icons-material/FilterList';

export const TutorsScreen: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { 
    tutors, 
    filteredTutors, 
    addTutor, 
    searchQuery, 
    categoryFilter, 
    sortBy,
    clearFilters 
  } = useTutorsStore();
  const [isInitialized, setIsInitialized] = useState(false);

  // 샘플 데이터 로드 (개발용)
  useEffect(() => {
    if (!isInitialized && tutors.length === 0) {
      sampleTutors.forEach(tutor => {
        addTutor(tutor);
      });
      setIsInitialized(true);
    }
  }, [tutors.length, addTutor, isInitialized]);

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const getResultsText = () => {
    const total = filteredTutors.length;
    const hasFilters = searchQuery || categoryFilter !== 'all' || sortBy !== 'popular';
    
    if (hasFilters) {
      return `검색 결과 ${total}명의 튜터`;
    }
    return `총 ${total}명의 튜터`;
  };

  return (
    <MainLayout>
      <div className="py-8">
        <div className="max-w-7xl mx-auto">
          {/* 헤더 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <PersonSearchIcon className="text-primary" sx={{ fontSize: 32 }} />
              <h1 className="text-3xl font-bold text-gray-900">튜터 찾기</h1>
            </div>
            <p className="text-gray-600">전문 튜터들과 함께 새로운 스킬을 배워보세요.</p>
          </div>

          {/* 검색바 */}
          <div className="mb-6">
            <TutorsSearchBar />
          </div>

          {/* 통계 및 필터 버튼 */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex-1">
              <TutorsStats />
            </div>
            <div className="flex items-center gap-4">
              <p className="text-gray-600 font-medium">{getResultsText()}</p>
              <button
                onClick={toggleFilters}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  isFilterOpen 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <FilterListIcon sx={{ fontSize: 20 }} />
                필터
              </button>
              {(searchQuery || categoryFilter !== 'all' || sortBy !== 'popular') && (
                <button
                  onClick={clearFilters}
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  필터 초기화
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 필터 사이드바 */}
            <div className={`lg:col-span-1 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-8">
                <TutorsFilters />
              </div>
            </div>

            {/* 튜터 목록 */}
            <div className="lg:col-span-3">
              <TutorsList />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};