"use client";

import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Section } from '@/components/layouts/Section';
import { FeedbackHeroSection } from '@/components/home/FeedbackHeroSection';
import { TutorShowcaseSection } from '@/components/home/TutorShowcaseSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { FeedbackExampleSection } from '@/components/home/FeedbackExampleSection';

export const FeedbackHomeScreen: React.FC = () => {
  return (
    <MainLayout disableContainer>
      {/* 피드백 플랫폼 히어로 섹션 */}
      <Section>
        <FeedbackHeroSection />
      </Section>
      
      {/* 튜터 소개 섹션 */}
      <Section>
        <TutorShowcaseSection />
      </Section>
      
      {/* 이용 방법 섹션 */}
      <Section disableContainer>
        <HowItWorksSection />
      </Section>
      
      {/* 실제 피드백 사례 */}
      <Section>
        <FeedbackExampleSection />
      </Section>
    </MainLayout>
  );
};