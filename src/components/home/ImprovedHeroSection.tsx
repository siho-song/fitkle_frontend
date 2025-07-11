"use client";

import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChatIcon from '@mui/icons-material/Chat';

export function ImprovedHeroSection() {
  return (
    <section className="py-20 text-center bg-gradient-to-br from-primary/5 to-primary/10">
      {/* 메인 헤드라인 */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          <span className="text-primary">5분 안에</span><br />
          궁금한 거 <span className="text-primary">하나만</span> 해결하세요
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          전문가가 당신의 질문에 즉시 답변해드려요
        </p>
        
        {/* 핵심 특징 3개 */}
        <div className="flex justify-center gap-8 mb-10">
          <div className="flex items-center gap-2 text-gray-700">
            <AccessTimeIcon className="text-primary" />
            <span className="font-medium">평균 5분 내 답변</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <ChatIcon className="text-primary" />
            <span className="font-medium">1:1 맞춤 피드백</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <CheckCircleIcon className="text-primary" />
            <span className="font-medium">검증된 전문가</span>
          </div>
        </div>
      </div>

      {/* 검색바 */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <div className="flex items-center bg-white border-2 border-gray-200 rounded-2xl px-6 py-4 shadow-lg hover:border-primary transition-colors focus-within:border-primary">
            <SearchIcon className="mr-3 text-gray-400" sx={{ fontSize: 28 }} />
            <input
              type="text"
              className="flex-1 outline-none text-lg placeholder-gray-400"
              placeholder="궁금한 것을 물어보세요 (예: 파스타 소스가 짜요, 기타 코드 잡는 법)"
            />
            <button className="ml-4 bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
              질문하기
            </button>
          </div>
        </div>
        
        {/* 인기 검색어 */}
        <div className="mt-4 text-sm text-gray-500">
          인기 질문: 
          <span className="ml-2 space-x-3">
            <button className="text-primary hover:underline">"파스타 면이 퍼져요"</button>
            <button className="text-primary hover:underline">"기타 F코드 소리가 안나요"</button>
            <button className="text-primary hover:underline">"운동 자세 맞나요?"</button>
          </span>
        </div>
      </div>
    </section>
  );
}