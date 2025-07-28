"use client";

import React, { useState } from 'react';
import { TutorItem } from '@/types/entities/tutor';
import { useFavoritesStore } from '@/store/favoritesStore';
import { formatResponseTime } from '@/utils/formatResponseTime';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';

interface TutorDetailHeaderProps {
  tutor: TutorItem;
}

export function TutorDetailHeader({ tutor }: TutorDetailHeaderProps) {
  const { favoriteTutors, addFavoriteTutor, removeFavoriteTutor } = useFavoritesStore();
  const isFavorite = favoriteTutors.some(fav => fav.id === tutor.id);
  const [isIntroductionExpanded, setIsIntroductionExpanded] = useState(false);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteTutor(tutor.id);
    } else {
      addFavoriteTutor(tutor);
    }
  };

  const MAX_INTRO_LENGTH = 550;
  const shouldTruncate = tutor.introduction.length > MAX_INTRO_LENGTH;
  const displayIntroduction = isIntroductionExpanded 
    ? tutor.introduction 
    : shouldTruncate 
      ? tutor.introduction.slice(0, MAX_INTRO_LENGTH)
      : tutor.introduction;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8">
      {/* 프로필 헤더 */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-shrink-0">
          <div className="w-26 h-26 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            {tutor.avatar ? (
              <img 
                src={tutor.avatar} 
                alt={tutor.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <PersonIcon className="text-gray-500" sx={{ fontSize: 28 }} />
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[23px] font-bold text-gray-900">{tutor.name} 튜터</h1>
            </div>
            
            <Button
              variant="ghost"
              size="md"
              onClick={handleToggleFavorite}
              noFocus={true}
              className={`rounded-full ${isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
              icon={isFavorite ? (
                <FavoriteIcon sx={{ fontSize: 24 }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: 24 }} />
              )}
            />
          </div>

          {/* 평점 및 통계 */}
          <div className="flex flex-wrap gap-4 mb-3.5">
            <div className="flex items-center gap-2">
              <StarIcon className="text-yellow-400" sx={{ fontSize: 17 }} />
              <span className="text-[15px] font-bold text-gray-900">{tutor.rating}</span>
              <span className="text-[15px] text-gray-600">({tutor.reviewCount}개 리뷰)</span>
            </div>
            <div className="text-[15px] flex items-center gap-1.5 text-gray-600">
              <SchoolIcon sx={{ fontSize: 17 }} />
              <span>{tutor.studentCount}명 수강</span>
            </div>
            <div className="text-[15px] flex items-center gap-1.5 text-gray-600">
              <WorkIcon sx={{ fontSize: 17 }} />
              <span>{tutor.experience} 경력</span>
            </div>
          </div>

          {/* 상태 정보 */}
          <div className="flex flex-wrap gap-4 mb-7">
            <Badge 
              variant="sage" 
              size="md"
              icon={<AccessTimeIcon sx={{ fontSize: 15 }} />}
            >
              {formatResponseTime(tutor.responseTime)}
            </Badge>
            <Badge 
              variant="lavender" 
              size="md"
              icon={<VerifiedIcon sx={{ fontSize: 15 }} />}
            >
              검증된 튜터
            </Badge>
          </div>

          {/* 소개 */}
          <div>
            <div className="text-gray-700 text-base leading-relaxed relative">
              {!isIntroductionExpanded && shouldTruncate ? (
                <div className="relative inline-block w-full">
                  <span className="inline">{displayIntroduction.slice(0, -20)}</span>
                  <span className="relative inline">
                    <span className="opacity-60">{displayIntroduction.slice(-20)}</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent to-white pointer-events-none"></span>
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsIntroductionExpanded(true)}
                    className="text-primaryDark hover:text-primaryDark hover:bg-transparent ml-1 p-0 h-auto font-semibold text-base leading-relaxed inline"
                    noFocus={true}
                  >
                    더보기
                  </Button>
                </div>
              ) : (
                <div>
                  <span>{tutor.introduction}</span>
                  {shouldTruncate && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsIntroductionExpanded(false)}
                      className="text-primaryDark hover:text-primaryDark hover:bg-transparent p-0 h-auto font-medium text-base leading-relaxed"
                      noFocus={true}
                    >
                      접기
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}