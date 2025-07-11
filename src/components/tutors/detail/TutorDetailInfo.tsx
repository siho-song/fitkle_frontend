"use client";

import React from 'react';
import { TutorItem } from '@/store/tutorsStore';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import VerifiedIcon from '@mui/icons-material/Verified';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface TutorDetailInfoProps {
  tutor: TutorItem;
}

export function TutorDetailInfo({ tutor }: TutorDetailInfoProps) {
  const weekDays = {
    'mon': '월요일',
    'tue': '화요일', 
    'wed': '수요일',
    'thu': '목요일',
    'fri': '금요일',
    'sat': '토요일',
    'sun': '일요일'
  };

  return (
    <div className="space-y-8">
      {/* 경력 및 학력 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <SchoolIcon className="text-primary" />
          경력 및 학력
        </h2>
        
        {/* 학력 */}
        {tutor.education.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">학력</h3>
            <div className="space-y-2">
              {tutor.education.map((edu, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <SchoolIcon className="text-gray-500" sx={{ fontSize: 20 }} />
                  <span className="text-gray-700">{edu}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 자격증 */}
        {tutor.certifications.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">자격증 및 인증</h3>
            <div className="space-y-2">
              {tutor.certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <VerifiedIcon className="text-blue-600" sx={{ fontSize: 20 }} />
                  <span className="text-gray-700">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 주요 성과 */}
      {tutor.achievements.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <EmojiEventsIcon className="text-primary" />
            주요 성과
          </h2>
          <div className="space-y-3">
            {tutor.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
                <EmojiEventsIcon className="text-yellow-600" sx={{ fontSize: 24 }} />
                <span className="text-gray-700 font-medium">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 수업 가능 시간 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <CalendarTodayIcon className="text-primary" />
          수업 가능 시간
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(tutor.availability).map(([day, times]) => (
            <div key={day} className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">
                {weekDays[day as keyof typeof weekDays]}
              </h3>
              {times.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {times.map((time) => (
                    <span 
                      key={time}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm font-medium"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500 text-sm">수업 불가</span>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800 text-sm">
            💡 <strong>수업 시간 안내:</strong> 위 시간은 기본 가능 시간이며, 
            상담을 통해 다른 시간대도 조율 가능합니다.
          </p>
        </div>
      </div>

      {/* 수업 태그 */}
      {tutor.tags.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">수업 특징</h2>
          <div className="flex flex-wrap gap-3">
            {tutor.tags.map((tag) => (
              <span 
                key={tag}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}