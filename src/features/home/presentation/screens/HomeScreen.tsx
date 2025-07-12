"use client";
import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { NewHeroSection } from '@/components/home/NewHeroSection';
import { AppPromotionSection } from '@/components/home/AppPromotionSection';
import { PopularTutorsSection } from '@/components/home/PopularTutorsSection';
import { StudentReviewsSection } from '@/components/home/StudentReviewsSection';

export const HomeScreen: React.FC = () => {
  return (
    <MainLayout disableContainer={false}>
      {/* 새로운 히어로 섹션 - 슬로건 및 검색바 */}
      <NewHeroSection />
      
      {/* 앱 소개 및 마케팅 배너 */}
      <AppPromotionSection />
      
      {/* 카테고리별 인기 튜터 */}
      <PopularTutorsSection />
      
      {/* 수강생 후기 */}
      <StudentReviewsSection />
    </MainLayout>
  );
}; 