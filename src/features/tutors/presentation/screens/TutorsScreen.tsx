"use client";

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { TutorsList } from '@/components/tutors/TutorsList';
import { TutorsSearchBar } from '@/components/tutors/TutorsSearchBar';
import { TutorsHorizontalFilters } from '@/components/tutors/TutorsHorizontalFilters';
import { useTutorsStore } from '@/store/tutorsStore';
import { sampleTutors } from '@/data/sampleTutors';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

export const TutorsScreen: React.FC = () => {
  const { 
    tutors, 
    filteredTutors, 
    addTutor, 
    searchQuery, 
    categoryFilter, 
    sortBy
  } = useTutorsStore();
  const [isInitialized, setIsInitialized] = useState(false);

  // 샘플 데이터 로드 (개발용)
  useEffect(() => {
    if (!isInitialized && tutors.length === 0) {
      console.log('Loading sample tutors:', sampleTutors.length);
      // 중복을 방지하기 위해 배치로 추가
      const addAllTutors = () => {
        sampleTutors.forEach(tutor => {
          // 이미 존재하는지 확인
          const existingTutor = tutors.find(t => t.id === tutor.id);
          if (!existingTutor) {
            addTutor(tutor);
          }
        });
      };
      addAllTutors();
      setIsInitialized(true);
      console.log('Sample tutors loaded');
    }
  }, [isInitialized]); // dependency 최소화

  // 디버깅용
  useEffect(() => {
    console.log('TutorsScreen - tutors count:', tutors.length);
    console.log('TutorsScreen - filteredTutors count:', filteredTutors.length);
  }, [tutors.length, filteredTutors.length]);


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

          {/* 가로 필터 바 */}
          <div className="mb-6">
            <TutorsHorizontalFilters />
          </div>

          {/* 결과 수 표시 */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600 font-medium">{getResultsText()}</p>
          </div>

          {/* 튜터 목록 */}
          <div>
            <TutorsList />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};