"use client";

import React from 'react';
import { TutorSearchResultItem } from '../domain/entities/tutorSearchResultItem';
import { TutorSearchResultCard } from './TutorSearchResultCard';

interface TutorSearchResultListProps {
  tutorList: TutorSearchResultItem[];
  isLoading?: boolean;
  onCardClick?: (tutor: TutorSearchResultItem) => void;
  className?: string;
}

export const TutorSearchResultList: React.FC<TutorSearchResultListProps> = ({
  tutorList,
  isLoading = false,
  onCardClick,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {tutorList.map((tutor) => (
        <TutorSearchResultCard
          key={tutor.id}
          tutor={tutor}
          onClick={() => onCardClick?.(tutor)}
        />
      ))}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
      {tutorList.length === 0 && !isLoading && (
        <div className="text-center text-gray-400 py-12">검색 결과가 없습니다.</div>
      )}
    </div>
  );
}; 