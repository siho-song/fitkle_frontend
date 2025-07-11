"use client";

import React, { useState } from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Section } from '@/components/layouts/Section';
import { ImprovedHeroSection } from '@/components/home/ImprovedHeroSection';
import { CategoryNavigationBar } from '@/components/home/CategoryNavigationBar';
import { TopTutorsSection } from '@/components/home/TopTutorsSection';
import { RecentSolvedSection } from '@/components/home/RecentSolvedSection';

export const ImprovedHomeScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // 여기서 튜터 필터링 로직을 추가할 수 있습니다
  };

  return (
    <MainLayout disableContainer>
      {/* 히어로 섹션 - "5분 안에 궁금한 거 하나만 해결하세요" */}
      <Section>
        <ImprovedHeroSection />
      </Section>
      
      {/* 카테고리 바 - 요리, 운동, 악기, 언어, 디자인, 코딩 등 */}
      <Section>
        <CategoryNavigationBar onCategoryChange={handleCategoryChange} />
      </Section>
      
      {/* 인기 튜터 8명 - 평점순 상위 튜터들 */}
      <Section disableContainer>
        <TopTutorsSection />
      </Section>
      
      {/* 최근 해결된 질문들 - Before/After 형태의 실제 사례 */}
      <Section>
        <RecentSolvedSection />
      </Section>
    </MainLayout>
  );
};