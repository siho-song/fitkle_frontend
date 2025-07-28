"use client";
import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { SearchBarProvider } from '@/contexts/SearchBarContext';
import { NewHeroSection } from '@/components/home/NewHeroSection';
import { ServiceHighlightSection } from '@/components/home/ServiceHighlightSection';
import { MatchingProcessSection } from '@/components/home/MatchingProcessSection';
import { ChatLearningSection } from '@/components/home/ChatLearningSection';
import { FeaturedTutorsSection } from '@/components/home/FeaturedTutorsSection';
import { StudentReviewsSection } from '@/components/home/StudentReviewsSection';

export const HomeScreen: React.FC = () => {
  return (
    <SearchBarProvider>
      <MainLayout disableContainer={true}>
        <div className="space-y-8">
          {/* 메인 히어로 섹션 - 서비스 소개 및 검색 */}
          <NewHeroSection />
          
          {/* 서비스 핵심 가치 홍보 섹션 */}
          <ServiceHighlightSection />
          
          {/* 매칭 프로세스 시각화 - 5단계 프로세스 */}
          <MatchingProcessSection />
          
          {/* 1:1 채팅 학습의 장점 */}
          <ChatLearningSection />
          
          {/* 추천 튜터 섹션 - 매칭 중심 */}
          <FeaturedTutorsSection />
          
          {/* 수강생 후기 */}
          <StudentReviewsSection />
        </div>
      </MainLayout>
    </SearchBarProvider>
  );
};