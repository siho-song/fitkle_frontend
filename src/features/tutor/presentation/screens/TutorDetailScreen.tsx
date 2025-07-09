"use client";
import React, { useEffect } from 'react';
import { Tutor } from '../../domain/entities/tutor';
// import { useTutorDetail } from '../providers/useTutorDetail'; // 실제 구현시 커스텀 훅 사용
import { TutorDetailPageDesktop } from './desktop/TutorDetailPageDesktop';
import { TutorDetailPageMobile } from './mobile/TutorDetailPageMobile';

// 반응형 분기 유틸(예시)
function useIsDesktop() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 1024;
}

// 임시 mock 상태 (실제 구현시 useTutorDetail 등으로 대체)
interface TutorDetailState {
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
  tutorDetail?: Tutor;
}

export const TutorDetailScreen: React.FC<{ tutorId: string }> = ({ tutorId }) => {
  // 실제 구현시 아래 커스텀 훅으로 대체
  const [state, setState] = React.useState<TutorDetailState>({ isLoading: false, hasError: false });
  const isDesktop = useIsDesktop();

  useEffect(() => {
    // TODO: tutorId로 데이터 fetch (React Query 등)
    setState({ isLoading: false, hasError: false, tutorDetail: undefined });
  }, [tutorId]);

  if (state.isLoading) {
    return <div className="flex items-center justify-center h-96"><span>로딩중...</span></div>;
  }
  if (state.hasError) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <span className="text-red-500 text-2xl mb-2">에러 발생</span>
        <span>{state.errorMessage || '튜터 정보를 불러올 수 없습니다.'}</span>
        <button
          className="mt-4 px-4 py-2 bg-primary text-white rounded cursor-pointer hover:bg-primary/80"
          onClick={() => { /* 재시도 로직 */ }}
        >
          다시 시도
        </button>
      </div>
    );
  }
  if (!state.tutorDetail) {
    return <div className="flex items-center justify-center h-96">튜터 정보가 없습니다.</div>;
  }
  return isDesktop
    ? <TutorDetailPageDesktop tutor={state.tutorDetail} />
    : <TutorDetailPageMobile tutor={state.tutorDetail} />;
}; 