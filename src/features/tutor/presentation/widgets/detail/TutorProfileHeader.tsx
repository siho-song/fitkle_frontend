import React from 'react';
import { Tutor } from '../../../domain/entities/tutor';
import Image from 'next/image';

interface TutorProfileHeaderProps {
  tutor: Tutor;
  onFavorite: () => void;
  onShare: () => void;
}

export const TutorProfileHeader: React.FC<TutorProfileHeaderProps> = ({ tutor, onFavorite, onShare }) => {
  return (
    <div className="relative w-full h-72 md:h-96 rounded-b-2xl overflow-hidden">
      {/* 배경 이미지 */}
      <Image
        src={tutor.headerImageUrl}
        alt="header"
        className="absolute inset-0 w-full h-full object-cover"
        onError={e => { (e.target as HTMLImageElement).src = ''; }}
      />
      {/* 그라데이션 스크림 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
      {/* 하단 프로필/정보 */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <Image
            src={tutor.profileImageUrl}
            alt={tutor.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow"
          />
          <div className="flex-1 min-w-0">
            <div className="text-white text-xl font-bold truncate">{tutor.name}</div>
            <div className="text-white text-sm truncate opacity-80 mt-1">{tutor.shortIntro}</div>
          </div>
          {/* 즐겨찾기/공유 버튼 */}
          <div className="flex gap-2">
            <button onClick={onFavorite} className="bg-white/80 hover:bg-white text-primary rounded-full p-2 shadow">
              <span role="img" aria-label="favorite">★</span>
            </button>
            <button onClick={onShare} className="bg-white/80 hover:bg-white rounded-full p-2 shadow">
              <span role="img" aria-label="share">🔗</span>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-white text-xs opacity-90 mt-1">
          <span role="img" aria-label="location">📍</span>
          <span>{tutor.region || '활동 지역 미입력'}</span>
        </div>
        {tutor.tags && tutor.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tutor.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-white/80 text-gray-700 text-xs font-medium border border-gray-200">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 