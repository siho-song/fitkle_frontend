"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { sampleTutors } from '@/data/sampleTutors';
import { TutorCard } from '@/components/tutors/TutorCard';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const FeaturedTutorsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const staticCategories = ['전체', '프로그래밍', '디자인', '언어', '음악', '요리', '운동'];
  
  const availableCategories = staticCategories.filter(category => 
    category === '전체' || sampleTutors.some(tutor => tutor.category.name === category)
  );

  const filteredTutors = selectedCategory === '전체' 
    ? sampleTutors 
    : sampleTutors.filter(tutor => tutor.category.name === selectedCategory);

  // 상위 9명의 튜터만 표시 (3명씩 3슬라이드)
  const featuredTutors = filteredTutors
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 9);

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(featuredTutors.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // 자동 슬라이드
  useEffect(() => {
    if (totalSlides > 1) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [totalSlides]);



  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-14">
        
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm border border-primary/20 mb-6">
            <ConnectWithoutContactIcon sx={{ fontSize: 16 }} />
            <span>추천 튜터</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-primary">지금 바로</span> 매칭 가능한
            <br />
            검증된 전문가들
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            실시간으로 응답 가능한 튜터들만 엄선했어요. 
            <span className="font-semibold text-gray-800">지금 채팅을 시작</span>하면 10분 이내에 답변을 받을 수 있어요.
          </p>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {isClient && availableCategories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentSlide(0);
              }}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95
                         ${selectedCategory === category
                           ? 'bg-primary text-white shadow-lg scale-105' 
                           : 'bg-white text-gray-700 hover:bg-primary hover:text-white border border-gray-200 hover:border-primary shadow-sm hover:shadow-md'
                         }`}
            >
              {category}
            </button>
          ))}
          {!isClient && (
            <div className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-medium">
              전체
            </div>
          )}
        </div>

        {/* 튜터 카드 슬라이더 */}
        <div className="relative mb-16">
          <div className="overflow-hidden min-h-[600px]">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {featuredTutors
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
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-300 z-10 hover:scale-110"
              >
                <ChevronLeftIcon sx={{ fontSize: 24 }} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-300 z-10 hover:scale-110"
              >
                <ChevronRightIcon sx={{ fontSize: 24 }} />
              </button>
            </>
          )}

          {/* 페이지네이션 */}
          {totalSlides > 1 && (
            <div className="flex justify-center gap-2">
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

        {/* 하단 액션 섹션 */}
        <div className="text-center">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 max-w-4xl mx-auto">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                원하는 튜터를 찾지 못하셨나요?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                현재 <span className="font-semibold text-primary">{sampleTutors.length}명</span>의 검증된 튜터가 대기 중이에요.
                <br />
                더 많은 전문가들과 원하는 조건으로 매칭해보세요.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tutors">
                <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
                  <ConnectWithoutContactIcon sx={{ fontSize: 20 }} />
                  <span>모든 튜터 탐색하기</span>
                  <ArrowForwardIcon className="group-hover:translate-x-1 transition-transform duration-300" sx={{ fontSize: 18 }} />
                </button>
              </Link>
              
              <Link href="/tutor-request">
                <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95">
                  튜터 요청하기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};