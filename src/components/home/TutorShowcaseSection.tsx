"use client";

import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import ChatIcon from '@mui/icons-material/Chat';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

const featuredTutors = [
  {
    id: 1,
    name: "김아트",
    specialty: "그림 · 일러스트",
    rating: 4.9,
    reviews: 156,
    responseTime: "평균 30분",
    verified: true,
    avatar: "🎨",
    description: "7년차 일러스트레이터, 당신의 그림 고민을 정확히 짚어드려요",
    feedbackStyle: ["영상 피드백", "실시간 통화", "단계별 가이드"],
    recentFeedback: "손 그리는 각도와 비율을 영상으로 자세히 설명해드렸어요",
    price: "15,000원~",
    isOnline: true,
    sample: {
      type: "video",
      title: "손 그리기 피드백 샘플"
    }
  },
  {
    id: 2,
    name: "셰프김",
    specialty: "요리 · 베이킹",
    rating: 4.8,
    reviews: 203,
    responseTime: "평균 15분",
    verified: true,
    avatar: "👨‍🍳",
    description: "20년 경력 셰프, 집에서도 맛있게 만드는 비법 알려드려요",
    feedbackStyle: ["영상 레시피", "음성 설명", "단계별 사진"],
    recentFeedback: "파스타 면발과 소스 농도를 영상으로 보여드렸어요",
    price: "10,000원~",
    isOnline: false,
    sample: {
      type: "video",
      title: "파스타 소스 농도 체크"
    }
  },
  {
    id: 3,
    name: "디자인구루",
    specialty: "PPT · 디자인",
    rating: 5.0,
    reviews: 89,
    responseTime: "평균 1시간",
    verified: true,
    avatar: "💼",
    description: "대기업 디자이너, 업무에 바로 쓰는 실전 피드백",
    feedbackStyle: ["화면 녹화", "수정본 제공", "실시간 상담"],
    recentFeedback: "PPT 레이아웃을 직접 수정해서 보내드렸어요",
    price: "25,000원~",
    isOnline: true,
    sample: {
      type: "before_after",
      title: "PPT 디자인 개선 사례"
    }
  }
];

export function TutorShowcaseSection() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          👥 이런 전문가들이 당신을 기다려요
        </h2>
        <p className="text-lg text-gray-600">
          각자의 방식으로 맞춤형 피드백을 제공하는 검증된 튜터들
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredTutors.map((tutor) => (
          <div 
            key={tutor.id}
            className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border"
          >
            {/* 튜터 프로필 헤더 */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-2xl">
                {tutor.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-gray-900">{tutor.name}</h3>
                  {tutor.verified && (
                    <VerifiedIcon className="text-blue-500" sx={{ fontSize: 18 }} />
                  )}
                  {tutor.isOnline && (
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  )}
                </div>
                <p className="text-primary font-semibold text-sm">{tutor.specialty}</p>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    <StarIcon className="text-yellow-400" sx={{ fontSize: 16 }} />
                    <span className="text-sm font-medium">{tutor.rating}</span>
                    <span className="text-sm text-gray-400">({tutor.reviews})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 튜터 설명 */}
            <p className="text-gray-700 text-sm mb-4 leading-relaxed">
              {tutor.description}
            </p>

            {/* 피드백 방식 */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">제공하는 피드백 방식</h4>
              <div className="flex flex-wrap gap-2">
                {tutor.feedbackStyle.map((style, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                  >
                    {style}
                  </span>
                ))}
              </div>
            </div>

            {/* 최근 피드백 */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">최근 피드백</h4>
              <p className="text-gray-600 text-sm">"{tutor.recentFeedback}"</p>
            </div>

            {/* 샘플 보기 */}
            <div className="mb-4">
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                <PlayCircleFilledIcon className="text-primary" />
                <span className="font-medium text-gray-700">{tutor.sample.title} 보기</span>
              </button>
            </div>

            {/* 하단 정보 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1 text-gray-600">
                <AccessTimeIcon sx={{ fontSize: 16 }} />
                <span className="text-sm">{tutor.responseTime}</span>
              </div>
              <div className="text-primary font-bold">{tutor.price}</div>
            </div>

            {/* 채팅 버튼 */}
            <button className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <ChatIcon />
              채팅으로 상담하기
            </button>
          </div>
        ))}
      </div>

      {/* 더보기 */}
      <div className="text-center mt-12">
        <button className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors">
          더 많은 튜터 보기
        </button>
      </div>
    </section>
  );
}