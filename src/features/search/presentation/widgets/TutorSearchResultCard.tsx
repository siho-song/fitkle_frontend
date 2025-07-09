import React from 'react';
import { TutorSearchResultItem } from '../../domain/entities/tutorSearchResultItem';
import Image from 'next/image';

interface TutorSearchResultCardProps {
  tutor: TutorSearchResultItem;
  onClick?: () => void;
}

export const TutorSearchResultCard: React.FC<TutorSearchResultCardProps> = ({ tutor, onClick }) => {
  // 뱃지 예시
  const badges = [
    tutor.rating >= 4.8 && <Badge key="high" color="blue" text="고평점" />,
    tutor.employmentCount > 200 && <Badge key="popular" color="green" text="인기" />,
    tutor.careerYears >= 10 && <Badge key="veteran" color="orange" text="베테랑" />,
  ].filter(Boolean);

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4 hover:shadow-lg transition cursor-pointer"
      onClick={onClick}
    >
      {/* 프로필 이미지 */}
      <Image
        src={tutor.profileImageUrl}
        alt={tutor.name}
        width={80}
        height={80}
        className="w-20 h-20 rounded-xl object-cover shadow"
      />
      {/* 정보 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-lg text-gray-900 truncate">{tutor.name}</span>
          {badges}
        </div>
        <div className="flex items-center gap-3 mb-2">
          <StatChip icon="★" label={tutor.rating.toFixed(1)} color="amber" />
          <StatChip icon="💼" label={`${tutor.employmentCount}회 고용`} color="blue" />
          <StatChip icon="⏰" label={`경력 ${tutor.careerYears}년`} color="green" />
        </div>
        <div className="text-gray-700 text-sm line-clamp-2">{tutor.description}</div>
      </div>
    </div>
  );
};

const Badge: React.FC<{ color: string; text: string }> = ({ color, text }) => (
  <span className={`px-2 py-0.5 rounded bg-${color}-100 text-${color}-700 text-xs font-semibold ml-1`}>{text}</span>
);

const StatChip: React.FC<{ icon: string; label: string; color: string }> = ({ icon, label, color }) => (
  <span className={`flex items-center gap-1 px-2 py-0.5 rounded bg-${color}-50 text-${color}-700 text-xs font-medium`}>
    <span>{icon}</span>
    <span>{label}</span>
  </span>
); 