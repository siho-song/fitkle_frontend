"use client";

import React from 'react';
import { useTutorsStore } from '@/store/tutorsStore';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import CategoryIcon from '@mui/icons-material/Category';
import WifiIcon from '@mui/icons-material/Wifi';

export function TutorsStats() {
  const { tutors, filteredTutors } = useTutorsStore();

  const stats = {
    totalTutors: tutors.length,
    filteredTutors: filteredTutors.length,
    averageRating: tutors.length > 0 
      ? (tutors.reduce((sum, tutor) => sum + tutor.rating, 0) / tutors.length).toFixed(1)
      : '0',
    onlineTutors: tutors.filter(tutor => tutor.isOnline).length,
    categories: Array.from(new Set(tutors.map(tutor => tutor.category))).length
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
        <div className="flex items-center justify-center mb-2">
          <PersonIcon className="text-primary" sx={{ fontSize: 20 }} />
        </div>
        <div className="text-2xl font-bold text-gray-900">{stats.totalTutors}</div>
        <div className="text-sm text-gray-600">전체 튜터</div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
        <div className="flex items-center justify-center mb-2">
          <StarIcon className="text-yellow-500" sx={{ fontSize: 20 }} />
        </div>
        <div className="text-2xl font-bold text-gray-900">{stats.averageRating}</div>
        <div className="text-sm text-gray-600">평균 평점</div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
        <div className="flex items-center justify-center mb-2">
          <CategoryIcon className="text-purple-500" sx={{ fontSize: 20 }} />
        </div>
        <div className="text-2xl font-bold text-gray-900">{stats.categories}</div>
        <div className="text-sm text-gray-600">전문 분야</div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
        <div className="flex items-center justify-center mb-2">
          <WifiIcon className="text-blue-500" sx={{ fontSize: 20 }} />
        </div>
        <div className="text-2xl font-bold text-gray-900">{stats.onlineTutors}</div>
        <div className="text-sm text-gray-600">온라인 수업</div>
      </div>
    </div>
  );
}