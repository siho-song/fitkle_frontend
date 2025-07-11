"use client";

import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';

const quickLessons = [
  {
    id: 1,
    title: "1시간에 완성하는 감성 수채화",
    tutor: "김아트",
    rating: 4.9,
    reviews: 128,
    duration: "1시간",
    price: "35,000원",
    image: "🎨",
    tags: ["초보자환영", "준비물제공"],
    isLive: true,
    nextTime: "오후 2시"
  },
  {
    id: 2,
    title: "30분 완성! 맛있는 파스타 레시피",
    tutor: "요리왕김셰프",
    rating: 4.8,
    reviews: 89,
    duration: "30분",
    price: "15,000원",
    image: "🍝",
    tags: ["재료키트", "실습중심"],
    isLive: false,
    nextTime: "내일 오전 10시"
  },
  {
    id: 3,
    title: "PPT 디자인 핵심 스킬 2시간 마스터",
    tutor: "디자인구루",
    rating: 5.0,
    reviews: 256,
    duration: "2시간",
    price: "50,000원",
    image: "💼",
    tags: ["템플릿제공", "실무활용"],
    isLive: true,
    nextTime: "지금 시작 가능"
  },
  {
    id: 4,
    title: "기타 기초 코드 1시간 완주",
    tutor: "음악선생님",
    rating: 4.7,
    reviews: 167,
    duration: "1시간",
    price: "25,000원",
    image: "🎸",
    tags: ["기타대여", "악보제공"],
    isLive: false,
    nextTime: "오후 4시"
  }
];

export function QuickLessonSection() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          ⚡ 오늘 바로 시작하는 원포인트 레슨
        </h2>
        <p className="text-lg text-gray-600">
          지금 예약하면 바로 시작할 수 있어요
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickLessons.map((lesson) => (
          <div 
            key={lesson.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
          >
            {/* 레슨 이미지/아이콘 */}
            <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center text-6xl relative">
              {lesson.image}
              {lesson.isLive && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  LIVE
                </div>
              )}
            </div>

            {/* 레슨 정보 */}
            <div className="p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                {lesson.title}
              </h3>
              
              {/* 튜터 정보 */}
              <div className="flex items-center gap-2 mb-3">
                <PersonIcon sx={{ fontSize: 16 }} className="text-gray-400" />
                <span className="text-sm text-gray-600">{lesson.tutor}</span>
                <div className="flex items-center gap-1 ml-auto">
                  <StarIcon sx={{ fontSize: 16 }} className="text-yellow-400" />
                  <span className="text-sm font-medium">{lesson.rating}</span>
                  <span className="text-sm text-gray-400">({lesson.reviews})</span>
                </div>
              </div>

              {/* 태그 */}
              <div className="flex gap-2 mb-4">
                {lesson.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 시간 및 가격 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-gray-600">
                  <AccessTimeIcon sx={{ fontSize: 16 }} />
                  <span className="text-sm">{lesson.duration}</span>
                </div>
                <div className="text-lg font-bold text-primary">
                  {lesson.price}
                </div>
              </div>

              {/* 예약 버튼 */}
              <div className="space-y-2">
                <div className="text-sm text-gray-600 text-center">
                  다음 레슨: {lesson.nextTime}
                </div>
                <button className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                  lesson.isLive 
                    ? 'bg-primary text-white hover:bg-primary/90' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  {lesson.isLive ? '지금 시작하기' : '예약하기'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 더보기 버튼 */}
      <div className="text-center mt-12">
        <button className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors">
          더 많은 원포인트 레슨 보기
        </button>
      </div>
    </section>
  );
}