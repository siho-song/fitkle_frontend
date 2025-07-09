"use client";
import React from 'react';
// 실제 구현은 아래 컴포넌트에서 진행
import { TutorProfileSetupPageDesktop } from './desktop/TutorProfileSetupPageDesktop';
import { TutorProfileSetupPageMobile } from './mobile/TutorProfileSetupPageMobile';

// 반응형 분기 유틸(예시)
function useIsDesktop() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 1024;
}

export const TutorProfileSetupScreen: React.FC = () => {
  const isDesktop = useIsDesktop();
  return isDesktop ? <TutorProfileSetupPageDesktop /> : <TutorProfileSetupPageMobile />;
}; 