"use client";

import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const categories = [
  {
    id: 'creative',
    title: '창작 & 취미',
    icon: '🎨',
    bgColor: 'from-pink-100 to-purple-100',
    lessons: [
      { title: '수채화 기초', time: '1시간', price: '30,000원', hot: true },
      { title: '캘리그라피', time: '1.5시간', price: '35,000원', hot: false },
      { title: '도예 체험', time: '2시간', price: '45,000원', hot: false },
    ]
  },
  {
    id: 'fitness',
    title: '운동 & 건강',
    icon: '🏃',
    bgColor: 'from-green-100 to-blue-100',
    lessons: [
      { title: '홈트레이닝', time: '45분', price: '20,000원', hot: true },
      { title: '요가 기초', time: '1시간', price: '25,000원', hot: true },
      { title: '스트레칭', time: '30분', price: '15,000원', hot: false },
    ]
  },
  {
    id: 'business',
    title: '비즈니스 스킬',
    icon: '💼',
    bgColor: 'from-blue-100 to-indigo-100',
    lessons: [
      { title: 'Excel 함수', time: '2시간', price: '40,000원', hot: true },
      { title: 'PPT 디자인', time: '1.5시간', price: '35,000원', hot: false },
      { title: '프레젠테이션', time: '1시간', price: '30,000원', hot: false },
    ]
  },
  {
    id: 'cooking',
    title: '요리 & 라이프',
    icon: '🍳',
    bgColor: 'from-orange-100 to-red-100',
    lessons: [
      { title: '파스타 완성', time: '30분', price: '15,000원', hot: true },
      { title: '커피 드립', time: '45분', price: '20,000원', hot: false },
      { title: '홈베이킹', time: '2시간', price: '35,000원', hot: true },
    ]
  }
];

export function CategoryLessonSection() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          카테고리별 원포인트 레슨
        </h2>
        <p className="text-lg text-gray-600">
          관심 분야에서 바로 써먹을 수 있는 스킬을 배워보세요
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {categories.map((category) => (
          <div 
            key={category.id}
            className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* 카테고리 헤더 */}
            <div className={`bg-gradient-to-r ${category.bgColor} rounded-2xl p-6 mb-6`}>
              <div className="flex items-center gap-4">
                <div className="text-4xl">{category.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                  <p className="text-gray-600">원포인트 레슨</p>
                </div>
              </div>
            </div>

            {/* 레슨 리스트 */}
            <div className="space-y-4">
              {category.lessons.map((lesson, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{lesson.title}</h4>
                      {lesson.hot && (
                        <TrendingUpIcon className="text-red-500" sx={{ fontSize: 16 }} />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <AccessTimeIcon sx={{ fontSize: 16 }} />
                      <span className="text-sm">{lesson.time}</span>
                    </div>
                    <div className="text-primary font-bold">{lesson.price}</div>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                      예약
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 카테고리 더보기 */}
            <div className="mt-6 text-center">
              <button className="text-primary font-semibold hover:underline">
                {category.title} 전체보기 →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}