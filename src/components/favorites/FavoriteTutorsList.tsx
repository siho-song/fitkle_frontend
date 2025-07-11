"use client";

import React from 'react';
import Link from 'next/link';
import { useFavoritesStore } from '@/store/favoritesStore';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';

export function FavoriteTutorsList() {
  const { favoriteTutors, removeFavoriteTutor } = useFavoritesStore();

  const handleRemove = (tutorId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (confirm('이 튜터를 찜 목록에서 제거하시겠습니까?')) {
      removeFavoriteTutor(tutorId);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (favoriteTutors.length === 0) {
    return (
      <div className="text-center py-16">
        <PersonIcon className="mx-auto text-gray-300 mb-4" sx={{ fontSize: 64 }} />
        <h3 className="text-xl font-semibold text-gray-500 mb-2">찜한 튜터가 없습니다</h3>
        <p className="text-gray-400 mb-6">관심있는 튜터를 찜해보세요!</p>
        <Link 
          href="/tutors"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          튜터 찾기
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">
          찜한 튜터 ({favoriteTutors.length}명)
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteTutors.filter((tutor, index, self) => 
          index === self.findIndex(t => t.id === tutor.id)
        ).map((tutor) => (
          <Link
            key={tutor.id}
            href={`/tutor/${tutor.id}`}
            className="block group"
          >
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:scale-[1.02] relative">
              {/* 삭제 버튼 */}
              <button
                onClick={(e) => handleRemove(tutor.id, e)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                title="찜 목록에서 제거"
              >
                <DeleteIcon sx={{ fontSize: 18 }} />
              </button>

              {/* 튜터 정보 */}
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">{tutor.avatar}</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">{tutor.name}</h3>
                <p className="text-sm text-gray-600">{tutor.experience}</p>
              </div>

              {/* 평점 */}
              <div className="flex items-center justify-center gap-1 mb-3">
                <StarIcon className="text-yellow-500" sx={{ fontSize: 16 }} />
                <span className="font-semibold text-gray-900">{tutor.rating}</span>
                <span className="text-sm text-gray-500">(4.9)</span>
              </div>

              {/* 전문 분야 */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1 justify-center">
                  {tutor.specialties.slice(0, 3).map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                  {tutor.specialties.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                      +{tutor.specialties.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* 가격 및 응답 시간 */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <AccessTimeIcon sx={{ fontSize: 14 }} />
                  <span>{tutor.responseTime}</span>
                </div>
                <div className="font-bold text-primary">
                  {tutor.hourlyRate.toLocaleString()}원/시간
                </div>
              </div>

              {/* 찜한 날짜 */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  {formatDate(tutor.addedDate)}에 찜함
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}