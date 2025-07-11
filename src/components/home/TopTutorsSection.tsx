"use client";

import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import ChatIcon from '@mui/icons-material/Chat';
import VerifiedIcon from '@mui/icons-material/Verified';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';

const topTutors = [
  {
    id: 1,
    name: "김셰프",
    category: "요리",
    emoji: "👨‍🍳",
    rating: 4.9,
    reviews: 234,
    responseTime: "평균 3분",
    specialties: ["파스타", "볶음밥", "국물요리"],
    isOnline: true,
    verified: true,
    solvedToday: 12,
    introduction: "20년 경력 이탈리안 셰프"
  },
  {
    id: 2,
    name: "박트레이너",
    category: "운동",
    emoji: "💪",
    rating: 4.8,
    reviews: 189,
    responseTime: "평균 5분",
    specialties: ["홈트", "요가", "스트레칭"],
    isOnline: true,
    verified: true,
    solvedToday: 8,
    introduction: "피트니스 전문가 7년"
  },
  {
    id: 3,
    name: "이기타",
    category: "악기",
    emoji: "🎸",
    rating: 5.0,
    reviews: 156,
    responseTime: "평균 7분",
    specialties: ["기타코드", "핑거링", "리듬"],
    isOnline: false,
    verified: true,
    solvedToday: 5,
    introduction: "음악학원 원장 10년"
  },
  {
    id: 4,
    name: "최영어",
    category: "언어",
    emoji: "🗣️",
    rating: 4.9,
    reviews: 203,
    responseTime: "평균 4분",
    specialties: ["발음교정", "회화", "문법"],
    isOnline: true,
    verified: true,
    solvedToday: 15,
    introduction: "원어민 수준 영어강사"
  },
  {
    id: 5,
    name: "김아티스트",
    category: "디자인",
    emoji: "🎨",
    rating: 4.7,
    reviews: 167,
    responseTime: "평균 8분",
    specialties: ["드로잉", "색칠", "구도"],
    isOnline: true,
    verified: true,
    solvedToday: 6,
    introduction: "일러스트레이터 5년"
  },
  {
    id: 6,
    name: "개발왕",
    category: "코딩",
    emoji: "💻",
    rating: 4.8,
    reviews: 198,
    responseTime: "평균 6분",
    specialties: ["React", "Javascript", "CSS"],
    isOnline: false,
    verified: true,
    solvedToday: 9,
    introduction: "프론트엔드 개발자 8년"
  },
  {
    id: 7,
    name: "요가선생님",
    category: "운동",
    emoji: "🧘‍♀️",
    rating: 4.9,
    reviews: 145,
    responseTime: "평균 5분",
    specialties: ["요가자세", "명상", "호흡법"],
    isOnline: true,
    verified: true,
    solvedToday: 7,
    introduction: "요가 지도자 자격증"
  },
  {
    id: 8,
    name: "베이킹마스터",
    category: "요리",
    emoji: "🧁",
    rating: 4.8,
    reviews: 178,
    responseTime: "평균 4분",
    specialties: ["케이크", "쿠키", "빵"],
    isOnline: true,
    verified: true,
    solvedToday: 11,
    introduction: "제과기능사 베이킹 전문"
  }
];

export function TopTutorsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          ⭐ 평점 최고 튜터들
        </h2>
        <p className="text-lg text-gray-600">
          검증된 전문가들이 당신의 질문을 기다리고 있어요
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topTutors.map((tutor) => (
          <div 
            key={tutor.id}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            {/* 튜터 헤더 */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-xl">
                {tutor.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900">{tutor.name}</h3>
                  {tutor.verified && (
                    <VerifiedIcon className="text-blue-500" sx={{ fontSize: 16 }} />
                  )}
                  {tutor.isOnline && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
                <p className="text-sm text-primary font-semibold">{tutor.category}</p>
              </div>
            </div>

            {/* 한줄 소개 */}
            <p className="text-sm text-gray-600 mb-3">{tutor.introduction}</p>

            {/* 평점 및 정보 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                <StarIcon className="text-yellow-400" sx={{ fontSize: 16 }} />
                <span className="font-bold text-gray-900">{tutor.rating}</span>
                <span className="text-sm text-gray-500">({tutor.reviews})</span>
              </div>
              <div className="text-xs text-gray-500">{tutor.responseTime}</div>
            </div>

            {/* 전문 분야 */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {tutor.specialties.map((specialty, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* 오늘 해결한 질문 수 */}
            <div className="flex items-center gap-2 mb-4 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">오늘 {tutor.solvedToday}개 질문 해결</span>
            </div>

            {/* 채팅 버튼 */}
            <button className={`w-full py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
              tutor.isOnline 
                ? 'bg-primary text-white hover:bg-primary/90' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}>
              <ChatIcon sx={{ fontSize: 18 }} />
              {tutor.isOnline ? '지금 질문하기' : '오프라인'}
            </button>
          </div>
        ))}
      </div>

      {/* 더보기 버튼 */}
      <div className="text-center mt-12">
        <button className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors">
          모든 튜터 보기
        </button>
      </div>
    </section>
  );
}