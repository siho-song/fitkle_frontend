"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { sampleTutors } from '@/data/sampleTutors';
import { TutorItem } from '@/store/tutorsStore';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import WifiIcon from '@mui/icons-material/Wifi';

export const PopularTutorsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 클라이언트에서만 렌더링되도록 설정
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 고정된 카테고리 순서 (hydration 일관성을 위해)
  const staticCategories = ['전체', '프로그래밍', '디자인', '언어', '음악', '요리', '운동', '어학', '사진', '데이터 분석', '미술', '수학', '투자', '건강'];
  
  // 실제 데이터에 존재하는 카테고리만 필터링
  const availableCategories = staticCategories.filter(category => 
    category === '전체' || sampleTutors.some(tutor => tutor.category.name === category)
  );

  const filteredTutors = selectedCategory === '전체' 
    ? sampleTutors 
    : sampleTutors.filter(tutor => tutor.category.name === selectedCategory);

  // 평점 순으로 정렬하여 상위 튜터들만 표시
  const topTutors = filteredTutors.sort((a, b) => b.rating - a.rating).slice(0, 8);

  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(topTutors.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const TutorCard: React.FC<{ tutor: TutorItem }> = ({ tutor }) => (
    <Link href={`/tutor/${tutor.id}`} className="block group">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full relative overflow-hidden">
        {/* 호버 시 배경 효과 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10">
          {/* 프로필 이미지 */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden ring-4 ring-transparent group-hover:ring-primary/20 transition-all duration-300">
                {tutor.avatar ? (
                  <img 
                    src={tutor.avatar} 
                    alt={tutor.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <PersonIcon className="text-gray-500 group-hover:text-primary transition-colors duration-300" sx={{ fontSize: 32 }} />
                )}
              </div>
              
              {/* 온라인 상태 표시 */}
              {tutor.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          </div>

        {/* 튜터 정보 */}
        <div className="text-center mb-4">
          <h3 className="font-bold text-lg text-gray-900 mb-1">{tutor.name}</h3>
          <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
            <span>{tutor.category.emoji}</span>
            {tutor.category.name}
          </p>
        </div>

          {/* 평점 및 통계 */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
              <StarIcon className="text-yellow-400" sx={{ fontSize: 16 }} />
              <span className="font-semibold text-gray-900 text-sm">{tutor.rating}</span>
              <span className="text-gray-500 text-xs">({tutor.reviewCount})</span>
            </div>
            {tutor.isOnline && (
              <div className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">
                <WifiIcon sx={{ fontSize: 12 }} />
                <span>온라인</span>
              </div>
            )}
          </div>

          {/* 전문 분야 */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1 justify-center">
              {tutor.specialties.slice(0, 3).map((specialty, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-primary hover:text-white transition-colors duration-300"
                >
                  {specialty}
                </span>
              ))}
              {tutor.specialties.length > 3 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">
                  +{tutor.specialties.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* 가격 */}
          <div className="text-center pt-4 border-t border-gray-100 group-hover:border-primary/20 transition-colors duration-300">
            <div className="text-lg font-bold text-primary group-hover:scale-110 transition-transform duration-300">
              {tutor.pricePerHour.toLocaleString()}원
            </div>
            <div className="text-xs text-gray-500">/ 시간</div>
            
            {/* 호버 시 CTA */}
            <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-xs text-primary font-medium">
                클릭하여 상세보기 →
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm border border-primary/20">
              전문가 네트워크
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            카테고리별 <span className="text-primary">인기 튜터</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            각 분야에서 검증된 최고의 전문가들을 만나보세요.
            <br className="hidden md:block" />
            <span className="text-primary font-semibold">지금 바로</span> 원하는 분야의 튜터를 찾아보세요.
          </p>
        </div>

        {/* 카테고리 필터 */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">학습하고 싶은 분야를 선택해주세요</h3>
            <p className="text-sm text-gray-600">클릭 하나로 원하는 분야의 전문가를 찾을 수 있습니다</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {isClient && availableCategories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={async () => {
                    if (category !== selectedCategory) {
                      setIsLoading(true);
                      setSelectedCategory(category);
                      setCurrentSlide(0);
                      
                      await new Promise(resolve => setTimeout(resolve, 300));
                      setIsLoading(false);
                    }
                  }}
                  disabled={isLoading}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 
                            transform hover:scale-105 active:scale-95 
                            disabled:opacity-50 disabled:cursor-not-allowed
                            focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    isSelected
                      ? 'bg-primary text-white shadow-lg scale-105 border-2 border-primary'
                      : 'bg-white text-gray-700 hover:bg-primary hover:text-white border-2 border-gray-200 hover:border-primary shadow-sm hover:shadow-md'
                  }`}
                >
                  {isLoading && category === selectedCategory ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      {category}
                    </div>
                  ) : (
                    category
                  )}
                </button>
              );
            })}
            {!isClient && (
              <div className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-medium">
                전체
              </div>
            )}
          </div>
        </div>

        {/* 튜터 카드 슬라이더 */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {topTutors
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((tutor) => (
                        <TutorCard key={tutor.id} tutor={tutor} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 슬라이더 컨트롤 */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-300 z-10"
              >
                <ChevronLeftIcon sx={{ fontSize: 24 }} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-300 z-10"
              >
                <ChevronRightIcon sx={{ fontSize: 24 }} />
              </button>
            </>
          )}

          {/* 페이지네이션 */}
          {totalSlides > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-primary scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* 더보기 버튼 */}
        <div className="text-center mt-16">
          <div className="mb-4">
            <p className="text-gray-600 text-sm">더 많은 전문가들을 만나보세요</p>
          </div>
          
          <Link
            href="/tutors"
            className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            <span>모든 튜터 보기</span>
            <ChevronRightIcon className="group-hover:translate-x-1 transition-transform duration-300" sx={{ fontSize: 20 }} />
          </Link>
          
          <div className="mt-4">
            <p className="text-xs text-gray-500">현재 <span className="font-semibold text-primary">{sampleTutors.length}명</span>의 튜터가 대기 중입니다</p>
          </div>
        </div>
      </div>
    </section>
  );
};