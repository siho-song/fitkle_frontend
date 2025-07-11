"use client";

import React from 'react';
import { TutorItem } from '@/store/tutorsStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import WifiIcon from '@mui/icons-material/Wifi';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';
import VerifiedIcon from '@mui/icons-material/Verified';

interface TutorDetailHeaderProps {
  tutor: TutorItem;
}

export function TutorDetailHeader({ tutor }: TutorDetailHeaderProps) {
  const { favoriteTutors, addFavoriteTutor, removeFavoriteTutor } = useFavoritesStore();
  const isFavorite = favoriteTutors.some(fav => fav.id === tutor.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteTutor(tutor.id);
    } else {
      addFavoriteTutor({
        id: tutor.id,
        name: tutor.name,
        avatar: tutor.avatar,
        category: tutor.category,
        categoryEmoji: tutor.categoryEmoji,
        rating: tutor.rating,
        reviewCount: tutor.reviewCount,
        pricePerHour: tutor.pricePerHour,
        specialties: tutor.specialties,
        addedAt: new Date().toISOString()
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8">
      {/* 프로필 헤더 */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-shrink-0">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            {tutor.avatar ? (
              <img 
                src={tutor.avatar} 
                alt={tutor.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <PersonIcon className="text-gray-500" sx={{ fontSize: 48 }} />
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{tutor.name}</h1>
              <p className="text-xl text-gray-600 flex items-center gap-2">
                <span>{tutor.categoryEmoji}</span>
                {tutor.category} 전문가
              </p>
            </div>
            
            <button
              onClick={handleToggleFavorite}
              className="p-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              {isFavorite ? (
                <FavoriteIcon className="text-red-500" sx={{ fontSize: 28 }} />
              ) : (
                <FavoriteBorderIcon className="text-gray-400" sx={{ fontSize: 28 }} />
              )}
            </button>
          </div>

          {/* 평점 및 통계 */}
          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex items-center gap-2">
              <StarIcon className="text-yellow-400" sx={{ fontSize: 24 }} />
              <span className="text-xl font-bold text-gray-900">{tutor.rating}</span>
              <span className="text-gray-600">({tutor.reviewCount}개 리뷰)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <SchoolIcon sx={{ fontSize: 20 }} />
              <span>{tutor.studentCount}명 수강</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <WorkIcon sx={{ fontSize: 20 }} />
              <span>{tutor.experience} 경력</span>
            </div>
          </div>

          {/* 상태 정보 */}
          <div className="flex flex-wrap gap-4 mb-6">
            {tutor.isOnline && (
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                <WifiIcon sx={{ fontSize: 18 }} />
                <span className="font-medium">온라인 수업</span>
              </div>
            )}
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full">
              <AccessTimeIcon sx={{ fontSize: 18 }} />
              <span className="font-medium">{tutor.responseTime} 응답</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
              <VerifiedIcon sx={{ fontSize: 18 }} />
              <span className="font-medium">검증된 튜터</span>
            </div>
          </div>

          {/* 소개 */}
          <p className="text-gray-700 text-lg leading-relaxed mb-6">{tutor.introduction}</p>

          {/* 언어 */}
          {tutor.languages.length > 0 && (
            <div className="flex items-center gap-2 text-gray-600">
              <LanguageIcon sx={{ fontSize: 20 }} />
              <span>사용 언어: {tutor.languages.join(', ')}</span>
            </div>
          )}
        </div>
      </div>

      {/* 전문 분야 */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">전문 분야</h3>
        <div className="flex flex-wrap gap-3">
          {tutor.specialties.map((specialty) => (
            <span 
              key={specialty}
              className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}