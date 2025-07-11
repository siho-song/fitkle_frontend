"use client";

import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const quickCategories = [
  { icon: '🎨', label: '드로잉 기초', time: '1시간', price: '25,000원' },
  { icon: '🍳', label: '파스타 완성', time: '30분', price: '15,000원' },
  { icon: '💼', label: 'PPT 디자인', time: '2시간', price: '45,000원' },
  { icon: '🎸', label: '기타 코드', time: '1시간', price: '20,000원' },
  { icon: '🏃', label: '홈트레이닝', time: '45분', price: '18,000원' },
  { icon: '📸', label: '스마트폰 사진', time: '1시간', price: '22,000원' },
];

const features = [
  { icon: <AccessTimeIcon className="text-primary" />, text: "단 1시간으로 충분" },
  { icon: <FlashOnIcon className="text-primary" />, text: "즉시 적용 가능한 스킬" },
  { icon: <CheckCircleIcon className="text-primary" />, text: "1:1 맞춤 피드백" },
];

export function OnePointHeroSection() {
  return (
    <div className="py-16 text-center">
      {/* 메인 헤드라인 */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          딱 <span className="text-primary">필요한 만큼</span>만 배우세요
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          복잡한 커리큘럼은 그만! 원하는 스킬 하나만 집중적으로
        </p>
        
        {/* 특징 강조 */}
        <div className="flex justify-center gap-8 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-700">
              {feature.icon}
              <span className="font-medium">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 검색바 */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <div className="flex items-center bg-white border-2 border-gray-200 rounded-2xl px-6 py-4 shadow-lg hover:border-primary transition-colors">
            <SearchIcon className="mr-3 text-gray-400" sx={{ fontSize: 28 }} />
            <input
              type="text"
              className="flex-1 outline-none text-lg placeholder-gray-400"
              placeholder="어떤 스킬을 배우고 싶으세요? (예: 파스타 만들기, PPT 디자인)"
            />
            <button className="ml-4 bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
              찾기
            </button>
          </div>
        </div>
      </div>

      {/* 인기 원포인트 레슨 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">🔥 지금 인기 원포인트 레슨</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickCategories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-gray-100"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h4 className="font-bold text-gray-900 mb-2">{category.label}</h4>
              <div className="space-y-1">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <AccessTimeIcon sx={{ fontSize: 16 }} className="mr-1" />
                  {category.time}
                </div>
                <div className="text-primary font-bold">{category.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}