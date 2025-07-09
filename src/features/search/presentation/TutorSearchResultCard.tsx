"use client";

import React from 'react';
import { TutorSearchResultItem } from '../domain/entities/tutorSearchResultItem';
import Image from 'next/image';

interface TutorSearchResultCardProps {
  tutor: TutorSearchResultItem;
  onClick?: () => void;
}

export const TutorSearchResultCard: React.FC<TutorSearchResultCardProps> = ({ tutor, onClick }) => {
  // 뱃지 조건
  const badges: { label: string; color: string }[] = [];
  if (tutor.rating >= 4.8) badges.push({ label: '고평점', color: 'bg-blue-100 text-blue-600 border-blue-300' });
  if (tutor.employmentCount > 200) badges.push({ label: '인기', color: 'bg-green-100 text-green-600 border-green-300' });
  if (tutor.careerYears >= 10) badges.push({ label: '베테랑', color: 'bg-orange-100 text-orange-600 border-orange-300' });

  return (
    <div
      className="group p-5 bg-white rounded-xl border border-gray-100 shadow-sm flex gap-5 items-start hover:shadow-lg transition cursor-pointer"
      onClick={onClick}
    >
      {/* 프로필 이미지 */}
      <Image
        src={tutor.profileImageUrl}
        alt={tutor.name}
        width={80}
        height={80}
        className="w-20 h-20 rounded-xl object-cover bg-gray-100 flex-shrink-0"
      />
      {/* 정보 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-lg text-gray-900 truncate">{tutor.name}</span>
          {badges.map(badge => (
            <span
              key={badge.label}
              className={`ml-1 px-2 py-0.5 rounded border text-xs font-semibold ${badge.color}`}
            >
              {badge.label}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
          <span className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="font-bold text-gray-800">{tutor.rating.toFixed(1)}</span>
            <span>({tutor.ratingCount})</span>
          </span>
          <span>|</span>
          <span>{tutor.employmentCount}회 고용</span>
          <span>|</span>
          <span>경력 {tutor.careerYears}년</span>
        </div>
        <div className="text-gray-700 text-sm line-clamp-2">{tutor.description}</div>
      </div>
    </div>
  );
}; 