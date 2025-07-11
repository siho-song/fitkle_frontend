"use client";

import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const successStories = [
  {
    id: 1,
    name: "김민지",
    lesson: "수채화 기초",
    duration: "1시간",
    rating: 5,
    comment: "정말 1시간 만에 이런 그림을 그릴 수 있다니! 선생님의 핵심 포인트 설명이 너무 좋았어요.",
    beforeImage: "😅",
    afterImage: "🎨",
    beforeText: "그림 초보자",
    afterText: "감성 수채화 완성",
    achievement: "첫 작품 완성"
  },
  {
    id: 2,
    name: "박도현",
    lesson: "PPT 디자인 핵심",
    duration: "2시간",
    rating: 5,
    comment: "회사에서 바로 써먹을 수 있는 실용적인 팁들만 쏙쏙! 동료들이 PPT 실력이 늘었다고 하네요.",
    beforeImage: "📄",
    afterImage: "✨",
    beforeText: "밋밋한 PPT",
    afterText: "프로급 디자인",
    achievement: "업무 효율 200% 향상"
  },
  {
    id: 3,
    name: "이소영",
    lesson: "파스타 완성",
    duration: "30분",
    rating: 5,
    comment: "30분이면 이렇게 맛있는 파스타를! 남편이 레스토랑 음식 같다고 극찬했어요.",
    beforeImage: "🤔",
    afterImage: "👨‍🍳",
    beforeText: "요리 왕초보",
    afterText: "파스타 마스터",
    achievement: "가족들의 인정"
  }
];

const stats = [
  { number: "10,000+", label: "누적 수강생" },
  { number: "95%", label: "만족도" },
  { number: "1,200+", label: "원포인트 레슨" },
  { number: "500+", label: "전문 튜터" }
];

export function SuccessStorySection() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
      {/* 통계 */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          💬 "1시간 만에 마스터했어요!"
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          원포인트 레슨으로 실제 변화를 경험한 수강생들의 이야기
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 성공 스토리 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {successStories.map((story) => (
          <div 
            key={story.id}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* Before/After */}
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="text-4xl mb-2">{story.beforeImage}</div>
                <div className="text-sm text-gray-500">{story.beforeText}</div>
              </div>
              
              <div className="text-2xl text-primary">→</div>
              
              <div className="text-center">
                <div className="text-4xl mb-2">{story.afterImage}</div>
                <div className="text-sm text-primary font-semibold">{story.afterText}</div>
              </div>
            </div>

            {/* 레슨 정보 */}
            <div className="text-center mb-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2">{story.lesson}</h3>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <AccessTimeIcon sx={{ fontSize: 16 }} />
                  {story.duration}
                </div>
                <div className="flex items-center gap-1">
                  <StarIcon className="text-yellow-400" sx={{ fontSize: 16 }} />
                  {story.rating}.0
                </div>
              </div>
              <div className="flex items-center justify-center gap-1 text-primary">
                <CheckCircleIcon sx={{ fontSize: 16 }} />
                <span className="text-sm font-medium">{story.achievement}</span>
              </div>
            </div>

            {/* 후기 */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                "{story.comment}"
              </p>
            </div>

            {/* 수강생 정보 */}
            <div className="text-center">
              <div className="font-semibold text-gray-900">{story.name} 님</div>
              <div className="text-sm text-gray-500">원포인트 레슨 수강생</div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          당신도 오늘부터 시작해보세요!
        </h3>
        <button className="px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors">
          나에게 맞는 원포인트 레슨 찾기
        </button>
      </div>
    </section>
  );
}