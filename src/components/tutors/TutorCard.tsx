"use client";

import React from 'react';
import Link from 'next/link';
import { TutorItem } from '@/types/entities/tutor';
import { useFavoritesStore } from '@/store/favoritesStore';
import { formatResponseTime } from '@/utils/formatResponseTime';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';

interface TutorCardProps {
  tutor: TutorItem;
}

export function TutorCard({ tutor }: TutorCardProps) {
  const { favoriteTutors, addFavoriteTutor, removeFavoriteTutor } = useFavoritesStore();
  const isFavorite = favoriteTutors.some(fav => fav.id === tutor.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFavoriteTutor(tutor.id);
    } else {
      addFavoriteTutor(tutor);
    }
  };

  return (
    <Link href={`/tutor/${tutor.id}`} className="block">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20 cursor-pointer">
        {/* 헤더 */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {tutor.avatar ? (
                <img 
                  src={tutor.avatar} 
                  alt={tutor.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <PersonIcon className="text-gray-500" sx={{ fontSize: 24 }} />
              )}
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-900">{tutor.name}</h3>
              <p className="text-gray-600 flex items-center gap-1">
                <span>{tutor.category.emoji}</span>
                {tutor.category.name}
              </p>
              <p className="text-sm text-gray-500">{tutor.experience} 경력</p>
            </div>
          </div>
          
          <button
            onClick={handleToggleFavorite}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            {isFavorite ? (
              <FavoriteIcon className="text-red-500" sx={{ fontSize: 24 }} />
            ) : (
              <FavoriteBorderIcon className="text-gray-400" sx={{ fontSize: 24 }} />
            )}
          </button>
        </div>

        {/* 평점 및 통계 */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <StarIcon className="text-yellow-400" sx={{ fontSize: 18 }} />
            <span className="font-semibold text-gray-900">{tutor.rating}</span>
            <span className="text-gray-500 text-sm">({tutor.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <SchoolIcon sx={{ fontSize: 16 }} />
            <span>{tutor.studentCount}명 수강</span>
          </div>
        </div>

        {/* 설명 */}
        <p className="text-gray-700 mb-4 line-clamp-2">{tutor.description}</p>

        {/* 전문 분야 */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {tutor.specialties.slice(0, 4).map((specialty: string) => (
              <span 
                key={specialty}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {specialty}
              </span>
            ))}
            {tutor.specialties.length > 4 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">
                +{tutor.specialties.length - 4}개
              </span>
            )}
          </div>
        </div>

        {/* 하단 정보 */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <AccessTimeIcon sx={{ fontSize: 16 }} />
              <span>{formatResponseTime(tutor.responseTime)}</span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-md font-bold text-primary">
              {tutor.pricePerHour.toLocaleString()}원/시간
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}