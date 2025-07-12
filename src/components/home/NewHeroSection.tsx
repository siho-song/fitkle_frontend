"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';

export const NewHeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tutors?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const popularSearches = ['프로그래밍', '영어회화', '디자인', '요리', '투자'];

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-32 overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/10 rounded-full"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-100 rounded-full"></div>
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-blue-100 rounded-full opacity-50"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* 메인 슬로건 */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            당신의 꿈을
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
              전문가와 함께
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
            검증된 전문 튜터들과 1:1 맞춤 수업으로 새로운 스킬을 배워보세요
          </p>
          
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            프로그래밍부터 요리까지, 16개 분야 전문가들이 기다리고 있습니다
          </p>

          {/* 검색바 */}
          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="어떤 분야를 배우고 싶으신가요? (예: React, 영어회화, 피아노)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-5 pr-16 text-lg border-2 border-gray-200 rounded-2xl 
                           focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary 
                           transition-all duration-300 shadow-lg group-hover:shadow-xl
                           placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 
                           bg-primary text-white p-3 rounded-xl hover:bg-primary/90 
                           transition-all duration-300 shadow-md hover:shadow-lg
                           group-hover:scale-105"
                >
                  <SearchIcon sx={{ fontSize: 24 }} />
                </button>
              </div>
            </form>
            
            {/* 인기 검색어 */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="text-gray-500 text-sm">인기 검색어:</span>
              {popularSearches.map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => {
                    setSearchQuery(keyword);
                    router.push(`/tutors?q=${encodeURIComponent(keyword)}`);
                  }}
                  className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm 
                           hover:bg-primary hover:text-white transition-all duration-300
                           border border-gray-200 hover:border-primary shadow-sm hover:shadow-md"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>

          {/* 통계 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <PeopleIcon className="text-primary" sx={{ fontSize: 32 }} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">16+</div>
              <div className="text-gray-600">전문 분야</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-green-100 rounded-full">
                  <StarIcon className="text-green-600" sx={{ fontSize: 32 }} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">4.8+</div>
              <div className="text-gray-600">평균 평점</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-purple-100 rounded-full">
                  <TrendingUpIcon className="text-purple-600" sx={{ fontSize: 32 }} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">5,000+</div>
              <div className="text-gray-600">수강생</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};