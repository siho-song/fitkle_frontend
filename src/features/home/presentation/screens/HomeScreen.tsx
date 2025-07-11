"use client";
import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Section } from '@/components/layouts/Section';
import { OnePointHeroSection } from '@/components/home/OnePointHeroSection';
import { QuickLessonSection } from '@/components/home/QuickLessonSection';
import { CategoryLessonSection } from '@/components/home/CategoryLessonSection';
import { SuccessStorySection } from '@/components/home/SuccessStorySection';

export const HomeScreen: React.FC = () => {
  return (
    <MainLayout disableContainer>
      {/* 원포인트 레슨 히어로 섹션 */}
      <Section>
        <OnePointHeroSection />
      </Section>
      
      {/* 빠른 레슨 섹션 */}
      <Section>
        <QuickLessonSection />
      </Section>
      
      {/* 카테고리별 레슨 */}
      <Section>
        <CategoryLessonSection />
      </Section>
      
      {/* 성공 스토리 */}
      <Section disableContainer>
        <SuccessStorySection />
      </Section>
    </MainLayout>
  );
}; 