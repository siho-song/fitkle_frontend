"use client";
import React from 'react';
import { TutorSearchPageDesktop } from './desktop/TutorSearchPageDesktop';

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isDesktop;
}

export const TutorSearchScreen: React.FC = () => {
  const isDesktop = useIsDesktop();
  if (isDesktop) {
    return <TutorSearchPageDesktop />;
  }
  // 모바일 버전은 추후 구현
  return (
    <div className="flex items-center justify-center min-h-screen text-gray-400">
      모바일 검색 화면은 추후 지원 예정입니다.
    </div>
  );
}; 