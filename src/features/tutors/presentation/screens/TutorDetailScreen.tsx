"use client";

import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { TutorDetailHeader } from '@/components/tutors/detail/TutorDetailHeader';
import { TutorDetailInfo } from '@/components/tutors/detail/TutorDetailInfo';
import { TutorDetailPortfolio } from '@/components/tutors/detail/TutorDetailPortfolio';
import { TutorDetailReviews } from '@/components/tutors/detail/TutorDetailReviews';
import { TutorDetailBooking } from '@/components/tutors/detail/TutorDetailBooking';
import { useTutorsStore } from '@/store/tutorsStore';
import { useEffect, useState } from 'react';
import { TutorItem } from '@/types';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Link from 'next/link';

interface TutorDetailScreenProps {
  tutorId: string;
}

export const TutorDetailScreen: React.FC<TutorDetailScreenProps> = ({ tutorId }) => {
  const { tutors } = useTutorsStore();
  const [tutor, setTutor] = useState<TutorItem | null>(null);

  useEffect(() => {
    const foundTutor = tutors.find(t => t.id === tutorId);
    setTutor(foundTutor || null);
  }, [tutorId, tutors]);

  if (!tutor) {
    return (
      <MainLayout>
        <div className="py-16 text-center">
          <PersonSearchIcon className="mx-auto text-gray-300 mb-4" sx={{ fontSize: 64 }} />
          <h2 className="text-2xl font-bold text-gray-500 mb-2">튜터를 찾을 수 없습니다</h2>
          <p className="text-gray-400 mb-6">
            요청하신 튜터 정보가 존재하지 않거나 삭제되었습니다.
          </p>
          <Link 
            href="/tutors"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            튜터 목록으로 돌아가기
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 메인 콘텐츠 */}
            <div className="lg:col-span-2 space-y-8">
              <TutorDetailHeader tutor={tutor} />
              <TutorDetailInfo tutor={tutor} />
              <TutorDetailPortfolio tutor={tutor} />
              <TutorDetailReviews tutor={tutor} />
            </div>
            
            {/* 사이드바 - 예약 */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <TutorDetailBooking tutor={tutor} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};