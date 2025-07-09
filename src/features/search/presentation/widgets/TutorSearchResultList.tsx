import React from 'react';
import { TutorSearchResultItem } from '../../domain/entities/tutorSearchResultItem';
import { TutorSearchResultCard } from './TutorSearchResultCard';

interface TutorSearchResultListProps {
  tutorList: TutorSearchResultItem[];
  isLoading: boolean;
  onCardClick?: (id: string) => void;
}

export const TutorSearchResultList: React.FC<TutorSearchResultListProps> = ({ tutorList, isLoading, onCardClick }) => {
  if (isLoading) {
    return <div className="py-10 text-center text-gray-400">로딩 중...</div>;
  }
  if (!tutorList || tutorList.length === 0) {
    return <div className="py-10 text-center text-gray-400">검색 결과가 없습니다.</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      {tutorList.map((tutor) => (
        <TutorSearchResultCard
          key={tutor.id}
          tutor={tutor}
          onClick={() => onCardClick?.(tutor.id)}
        />
      ))}
    </div>
  );
}; 