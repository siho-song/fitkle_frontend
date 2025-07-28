"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import GroupIcon from '@mui/icons-material/Group';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSearchBarContext } from '@/contexts/SearchBarContext';

export const NewHeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const searchBarRef = useRef<HTMLDivElement>(null);
  const { setIsHeroSearchVisible } = useSearchBarContext();

  // 슬라이드 데이터
  const slides = [
    {
      id: 'chat-interface',
      title: '실시간 1:1 채팅 레슨',
      visual: (
        <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 w-96 mx-auto">
          {/* 채팅 인터페이스 모형 */}
          <div className="space-y-6">
            {/* 헤더 */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <PersonIcon className="text-primary" sx={{ fontSize: 20 }} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">김도현 튜터</p>
                  <span className="text-xs text-green-500 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    온라인
                  </span>
                </div>
              </div>
              <div className="ml-auto">
                <ChatBubbleOutlineIcon className="text-gray-400" sx={{ fontSize: 20 }} />
              </div>
            </div>

            {/* 채팅 메시지들 */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <PersonIcon className="text-primary" sx={{ fontSize: 16 }} />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-3 max-w-xs">
                  <p className="text-sm text-gray-800">안녕하세요! 요리 레슨 도와드릴게요 😊</p>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <div className="bg-primary rounded-2xl rounded-tr-md px-4 py-3 max-w-xs">
                  <p className="text-sm text-white">파스타 면 삶는 법 알고 싶어요!</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <PersonIcon className="text-blue-600" sx={{ fontSize: 16 }} />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <PersonIcon className="text-primary" sx={{ fontSize: 16 }} />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-3 max-w-xs">
                  <p className="text-sm text-gray-800">직접 보시면서 따라해보세요! 🍝</p>
                </div>
              </div>
            </div>

            {/* 입력창 */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <input 
                type="text" 
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                disabled
              />
              <button className="p-2 bg-primary text-white rounded-xl">
                <ArrowForwardIcon sx={{ fontSize: 16 }} />
              </button>
            </div>
          </div>

          {/* 플로팅 요소들 */}
          <div className="absolute -top-4 -right-4 bg-white rounded-xl px-3 py-2 shadow-lg border border-gray-100">
            <div className="flex items-center gap-2">
              <TrendingUpIcon className="text-green-500" sx={{ fontSize: 16 }} />
              <span className="text-xs font-semibold text-gray-700">실시간 피드백</span>
            </div>
          </div>

          <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-3 py-2 shadow-lg border border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-gray-700">1:1 맞춤 레슨</span>
            </div>
          </div>

          {/* 배경 장식 */}
          <div className="absolute -z-10 top-8 left-8 w-full h-full bg-primary/5 rounded-3xl"></div>
        </div>
      )
    },
    {
      id: 'lesson-process',
      title: '간단한 레슨 과정',
      visual: (
        <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 w-96 mx-auto">
          <div className="space-y-4">
            {[
              { step: 1, title: '튜터 탐색', desc: '원하는 분야의 전문가 찾기', icon: <SearchIcon sx={{ fontSize: 20 }} />, color: 'bg-blue-50 text-blue-600' },
              { step: 2, title: '상담 문의 및 예약', desc: '목표 상담 후 시간대 예약', icon: <ChatBubbleOutlineIcon sx={{ fontSize: 20 }} />, color: 'bg-green-50 text-green-600' },
              { step: 3, title: '예약 확정', desc: '시간대 확정 후 준비 완료', icon: <CheckCircleIcon sx={{ fontSize: 20 }} />, color: 'bg-purple-50 text-purple-600' },
              { step: 4, title: '레슨 진행', desc: '실시간 1:1 개인 맞춤 레슨', icon: <PersonIcon sx={{ fontSize: 20 }} />, color: 'bg-orange-50 text-orange-600' },
              { step: 5, title: '사후 관리', desc: '추가 질문과 지속적 피드백', icon: <SupportAgentIcon sx={{ fontSize: 20 }} />, color: 'bg-cyan-50 text-cyan-600' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
                {index < 4 && (
                  <div className="w-6 h-6 text-gray-300 flex-shrink-0">
                    <ArrowForwardIcon sx={{ fontSize: 16 }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 프로세스 완료 배지 */}
          <div className="absolute -top-4 -right-4 bg-white rounded-xl px-3 py-2 shadow-lg border border-gray-100">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="text-green-500" sx={{ fontSize: 16 }} />
              <span className="text-xs font-semibold text-gray-700">온라인 완결</span>
            </div>
          </div>

          <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-3 py-2 shadow-lg border border-gray-100">
            <div className="flex items-center gap-2">
              <AccessTimeIcon className="text-primary" sx={{ fontSize: 16 }} />
              <span className="text-xs font-semibold text-gray-700">간단한 5단계</span>
            </div>
          </div>

          {/* 배경 장식 */}
          <div className="absolute -z-10 top-8 left-8 w-full h-full bg-green-50/50 rounded-3xl"></div>
        </div>
      )
    },
    {
      id: 'community',
      title: '함께하는 학습 커뮤니티',
      visual: (
        <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 w-96 mx-auto">
          <div className="space-y-6">
            {/* 커뮤니티 헤더 */}
            <div className="text-center">
              <h4 className="text-lg font-bold text-gray-900 mb-2">학습 커뮤니티</h4>
              <p className="text-sm text-gray-600">혼자가 아닌 함께하는 배움</p>
            </div>

            {/* 커뮤니티 기능들 */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <GroupIcon className="text-blue-600" sx={{ fontSize: 24 }} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">정보 교환</p>
                  <p className="text-xs text-gray-600">튜티들과 경험 공유</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <QuestionAnswerIcon className="text-green-600" sx={{ fontSize: 24 }} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">전문가 도움</p>
                  <p className="text-xs text-gray-600">튜터들이 답변해주는 Q&A</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <EmojiEventsIcon className="text-purple-600" sx={{ fontSize: 24 }} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">성장 동기</p>
                  <p className="text-xs text-gray-600">다른 사람들의 성공 사례</p>
                </div>
              </div>
            </div>
          </div>

          {/* 플로팅 요소들 */}
          <div className="absolute -top-4 -right-4 bg-white rounded-xl px-3 py-2 shadow-lg border border-gray-100">
            <div className="flex items-center gap-2">
              <GroupIcon className="text-purple-500" sx={{ fontSize: 16 }} />
              <span className="text-xs font-semibold text-gray-700">활성 커뮤니티</span>
            </div>
          </div>

          <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-3 py-2 shadow-lg border border-gray-100">
            <div className="flex items-center gap-2">
              <EmojiEventsIcon className="text-orange-500" sx={{ fontSize: 16 }} />
              <span className="text-xs font-semibold text-gray-700">함께 성장</span>
            </div>
          </div>

          {/* 배경 장식 */}
          <div className="absolute -z-10 top-8 left-8 w-full h-full bg-purple-50/50 rounded-3xl"></div>
        </div>
      )
    },
  ];

  // 자동 슬라이드 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // 4초마다 전환

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroSearchVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '-80px 0px 0px 0px'
      }
    );

    const currentRef = searchBarRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [setIsHeroSearchVisible]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchError("검색어를 입력해주세요");
      return;
    }
    
    setSearchError("");
    setIsSearching(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      router.push(`/tutors?q=${encodeURIComponent(searchQuery.trim())}`);
    } finally {
      setIsSearching(false);
    }
  };

  const popularSearches = [
    { keyword: '프로그래밍', icon: '💻', count: '1,234' },
    { keyword: '영어회화', icon: '🗣️', count: '892' },
    { keyword: '디자인', icon: '🎨', count: '567' },
    { keyword: '요리', icon: '👨‍🍳', count: '423' },
    { keyword: '투자', icon: '📈', count: '678' }
  ];
  
  const handleQuickSearch = async (keyword: string) => {
    setSearchQuery(keyword);
    setSearchError("");
    setIsSearching(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      router.push(`/tutors?q=${encodeURIComponent(keyword)}`);
    } finally {
      setIsSearching(false);
    }
  };

  // 슬라이드 수동 조작 함수들
  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative flex items-start overflow-hidden pt-16">
      {/* 미니멀한 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/3 to-blue-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-14 pt-0 pb-16">
        <div className="grid lg:grid-cols-10 gap-16 items-center">
          
          {/* 왼쪽: 메인 콘텐츠 */}
          <div className="lg:col-span-7 space-y-8">
            {/* 서비스 소개 배지 */}
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200/50 shadow-sm mb-8">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">실시간 매칭 중</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <span className="text-sm text-gray-600">24시간 학습 지원</span>
            </div>

            {/* 메인 헤드라인 */}
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight pl-4">
                언제 어디서나
                <br />
                내 일상에{' '}
                <span className="relative">
                  <span className="text-primary">핏한</span>
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
                    <path d="M2 6C60 2 140 2 198 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/30"/>
                  </svg>
                </span>
                {' '}클래스, FITKLE
              </h1>
              
              {/* 서비스 슬로건 */}
              {/* <div className="bg-gradient-to-r from-primary/10 to-blue-50 rounded-2xl p-6 border border-primary/20">
                <p className="text-xl md:text-2xl font-bold text-gray-900 text-center leading-relaxed">
                  &ldquo;원하는 시간, 원하는 튜터, 나만의 학습&rdquo;
                  <br />
                  <span className="text-primary text-lg md:text-xl font-semibold">
                    내가 있는 곳에서, 내가 편한 시간에 전문가와 연결
                  </span>
                </p>
              </div> */}
              
              {/* 서비스 세미 슬로건 */}
              {/* <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-8 max-w-lg">
                멀리 나가서 시간 맞추고 대기하는 시대는 끝났습니다. 
                <span className="font-semibold text-gray-600 whitespace-nowrap">검증된 전문가가</span> 당신의 페이스에 맞춰 정확히 짚어드려요.
              </p> */}
            </div>

            {/* 검색 섹션 */}
            <div ref={searchBarRef} className="space-y-6">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="어떤 분야를 배우고 싶으신가요?"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (searchError) setSearchError("");
                    }}
                    className={`w-full px-6 py-4 pr-16 text-lg bg-white border-2 rounded-2xl 
                             shadow-lg focus:shadow-xl transition-all duration-300
                             placeholder-gray-400 group-hover:shadow-xl
                             ${
                               searchError 
                                 ? 'border-red-300 focus:border-red-400 focus:ring-red-100' 
                                 : 'border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10'
                             }`}
                    disabled={isSearching}
                  />
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 
                             bg-primary text-white p-3 rounded-xl hover:bg-primary/90 
                             transition-all duration-300 shadow-md hover:shadow-lg
                             disabled:opacity-50 disabled:cursor-not-allowed
                             hover:scale-105 active:scale-95"
                  >
                    {isSearching ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <SearchIcon sx={{ fontSize: 24 }} />
                    )}
                  </button>
                </div>
                
                {searchError && (
                  <div className="mt-2 text-red-500 text-sm font-medium">
                    {searchError}
                  </div>
                )}
              </form>

              {/* 인기 검색어 */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">🔥 실시간 인기 분야</p>
                <div className="flex flex-wrap gap-3">
                  {popularSearches.map((item) => (
                    <button
                      key={item.keyword}
                      onClick={() => handleQuickSearch(item.keyword)}
                      disabled={isSearching}
                      className="group inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-primary 
                               text-gray-700 hover:text-white rounded-full text-sm font-medium
                               border border-gray-200 hover:border-primary shadow-sm hover:shadow-md
                               transition-all duration-300 transform hover:scale-105 active:scale-95
                               disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{item.keyword}</span>
                      <span className="text-xs opacity-60 group-hover:opacity-80">{item.count}+</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

                    {/* 오른쪽: 자동 전환 슬라이드 */}
          <div className="lg:col-span-3 relative flex flex-col h-[600px]">
            {/* 슬라이드 컨텐츠 */}
            <div className="flex-1 flex items-center justify-center transition-all duration-700 ease-in-out transform">
              {slides[currentSlide].visual}
            </div>

            {/* 하단 고정 영역 */}
            <div className="text-center py-6">
              {/* 슬라이드 인디케이터와 화살표 버튼 */}
              <div className="flex items-center justify-center gap-4 mb-4">
                {/* 왼쪽 화살표 버튼 */}
                <button
                  onClick={goToPrevSlide}
                  className="w-8 h-8 bg-gray-100 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="이전 슬라이드"
                >
                  <ArrowBackIosIcon sx={{ fontSize: 14, marginLeft: '1px' }} />
                </button>

                {/* 인디케이터 */}
                <div className="flex gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 hover:bg-primary/70 ${
                        index === currentSlide ? 'bg-primary w-6' : 'bg-gray-300 w-2 hover:w-4'
                      }`}
                      aria-label={`${index + 1}번째 슬라이드로 이동`}
                    />
                  ))}
                </div>

                {/* 오른쪽 화살표 버튼 */}
                <button
                  onClick={goToNextSlide}
                  className="w-8 h-8 bg-gray-100 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="다음 슬라이드"
                >
                  <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
                </button>
              </div>

              {/* 슬라이드 제목 */}
              <h3 className="text-lg font-bold text-gray-900 transition-all duration-500">
                {slides[currentSlide].title}
              </h3>
            </div>
          </div>
        </div>

        {/* 하단 통계 */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">2,847</div>
            <div className="text-sm text-gray-600">활성 튜터</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">15,923</div>
            <div className="text-sm text-gray-600">완료된 레슨</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">4.9</div>
            <div className="text-sm text-gray-600">평균 만족도</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-sm text-gray-600">학습 지원</div>
          </div>
        </div>
      </div>
    </section>
  );
};