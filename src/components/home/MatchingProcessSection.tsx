"use client";

import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import EventIcon from '@mui/icons-material/Event';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const MatchingProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      id: 1,
      title: "튜터 탐색",
      description: "원하는 분야의 전문가를 찾고 프로필을 확인해보세요",
      icon: <SearchIcon sx={{ fontSize: 32 }} />,
      color: "blue",
      illustration: (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <SearchIcon className="text-gray-400" sx={{ fontSize: 20 }} />
              <span className="text-gray-600">React 프로그래밍</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { name: '김도현', rating: '4.9', price: '50,000원', online: true },
                { name: '이서연', rating: '4.8', price: '45,000원', online: false },
                { name: '박민수', rating: '4.7', price: '40,000원', online: true }
              ].map((tutor, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                    <PersonIcon className="text-blue-600" sx={{ fontSize: 16 }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-900">{tutor.name}</p>
                      <span className="text-xs text-blue-600">⭐ {tutor.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-blue-700">{tutor.price}/시간</p>
                      {tutor.online && <span className="text-xs text-green-600">● 온라인</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "상담 문의 및 예약",
      description: "학습 목표를 상담하고 원하는 시간대에 레슨을 예약하세요",
      icon: <ChatBubbleOutlineIcon sx={{ fontSize: 32 }} />,
      color: "green",
      illustration: (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                  <PersonIcon className="text-green-600" sx={{ fontSize: 16 }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-900">김도현 튜터</p>
                  <p className="text-xs text-green-600">● 온라인</p>
                </div>
              </div>
              <ChatBubbleOutlineIcon className="text-green-500" sx={{ fontSize: 20 }} />
            </div>
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <PersonIcon className="text-green-600" sx={{ fontSize: 12 }} />
                </div>
                <div className="bg-gray-100 rounded-xl rounded-tl-sm px-3 py-2 max-w-xs">
                  <p className="text-xs text-gray-800">안녕하세요! 어떤 부분을 중점적으로 배우고 싶으신가요?</p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <div className="bg-green-500 rounded-xl rounded-tr-sm px-3 py-2 max-w-xs">
                  <p className="text-xs text-white">React 상태관리에 대해 배우고 싶어요</p>
                </div>
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <PersonIcon className="text-blue-600" sx={{ fontSize: 12 }} />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <PersonIcon className="text-green-600" sx={{ fontSize: 12 }} />
                </div>
                <div className="bg-gray-100 rounded-xl rounded-tl-sm px-3 py-2 max-w-xs">
                  <p className="text-xs text-gray-800">좋습니다! 사전에 준비해주실 자료가 있다면...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "예약 확정",
      description: "원하는 시간대에 레슨을 예약하고 튜터가 확정해주세요",
      icon: <EventIcon sx={{ fontSize: 32 }} />,
      color: "purple",
      illustration: (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                  <PersonIcon className="text-purple-600" sx={{ fontSize: 16 }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-900">김도현 튜터</p>
                  <p className="text-xs text-purple-600">React 전문가</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm text-gray-800 font-medium">📅 예약 요청</p>
                <p className="text-xs text-gray-600 mt-1">12월 25일 오후 2:00 - 3:00</p>
              </div>
            </div>
            <div className="flex items-center justify-center py-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-xl border border-green-200 text-center">
              <CheckCircleIcon className="text-green-600 mb-2" sx={{ fontSize: 24 }} />
              <p className="text-sm font-medium text-green-900">예약 확정!</p>
              <p className="text-xs text-green-600">채팅방이 생성되었습니다</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "레슨 진행",
      description: "실시간으로 1:1 개인 맞춤 레슨을 받아보세요",
      icon: <SchoolIcon sx={{ fontSize: 32 }} />,
      color: "orange",
      illustration: (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl border border-orange-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-orange-900">레슨 진행 중</span>
              </div>
              <span className="text-xs text-orange-600">15:32 / 60:00</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-orange-50 rounded-xl text-center">
                <div className="w-full h-16 bg-orange-200 rounded-lg mb-2 flex items-center justify-center">
                  <SchoolIcon className="text-orange-600" sx={{ fontSize: 24 }} />
                </div>
                <p className="text-xs text-orange-700">화면 공유</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl">
                <p className="text-xs text-orange-700 mb-2">실시간 채팅</p>
                <div className="space-y-1">
                  <div className="h-2 bg-orange-200 rounded"></div>
                  <div className="h-2 bg-orange-300 rounded w-3/4"></div>
                  <div className="h-2 bg-orange-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "사후 관리",
      description: "레슨 완료 후에도 채팅방이 유지되어 추가 질문과 피드백이 가능해요",
      icon: <CheckCircleIcon sx={{ fontSize: 32 }} />,
      color: "indigo",
      illustration: (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="space-y-4">
            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200 text-center">
              <CheckCircleIcon className="text-indigo-600 mb-2" sx={{ fontSize: 32 }} />
              <p className="text-sm font-medium text-indigo-900">레슨 완료!</p>
              <p className="text-xs text-indigo-600">수고하셨습니다 🎉</p>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <PersonIcon className="text-indigo-600" sx={{ fontSize: 12 }} />
                </div>
                <div className="bg-gray-100 rounded-xl rounded-tl-sm px-3 py-2 max-w-xs">
                  <p className="text-xs text-gray-800">오늘 배운 내용 정리 자료를 보내드릴게요 📚</p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <div className="bg-indigo-500 rounded-xl rounded-tr-sm px-3 py-2 max-w-xs">
                  <p className="text-xs text-white">감사합니다! 추가 질문이 있으면 여기서 물어봐도 되나요?</p>
                </div>
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <PersonIcon className="text-blue-600" sx={{ fontSize: 12 }} />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <PersonIcon className="text-indigo-600" sx={{ fontSize: 12 }} />
                </div>
                <div className="bg-gray-100 rounded-xl rounded-tl-sm px-3 py-2 max-w-xs">
                  <p className="text-xs text-gray-800">물론이죠! 언제든지 질문하세요 😊</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-500 border-blue-500',
    purple: 'bg-purple-500 border-purple-500',
    green: 'bg-green-500 border-green-500',
    orange: 'bg-orange-500 border-orange-500',
    indigo: 'bg-indigo-500 border-indigo-500'
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-14">
        
        {/* 섹션 헤더 */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm border border-primary/20 mb-6">
            <EventIcon sx={{ fontSize: 16 }} />
            <span>체계적인 5단계</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            어떻게 <span className="text-primary">연결</span>될까요?
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            튜터 예약부터 레슨 완료 후 사후관리까지, 체계적인 학습 여정을 경험하세요.
            <br className="hidden md:block" />
            채팅방은 레슨 후에도 계속 유지됩니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* 왼쪽: 프로세스 단계들 */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer
                          ${activeStep === index 
                            ? 'border-primary bg-primary/5 shadow-lg scale-105' 
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                          }`}
                onClick={() => setActiveStep(index)}
              >
                {/* 단계 번호 */}
                <div className="absolute -left-4 -top-4">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-500
                                  ${activeStep === index 
                                    ? 'bg-primary text-white border-primary' 
                                    : 'bg-white text-gray-400 border-gray-300'
                                  }`}>
                    {step.id}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  {/* 아이콘 */}
                  <div className={`p-3 rounded-xl transition-all duration-500
                                  ${activeStep === index 
                                    ? `${colorClasses[step.color as keyof typeof colorClasses]} text-white` 
                                    : 'bg-gray-100 text-gray-400'
                                  }`}>
                    {step.icon}
                  </div>

                  {/* 콘텐츠 */}
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 transition-all duration-500
                                   ${activeStep === index ? 'text-gray-900' : 'text-gray-600'}`}>
                      {step.title}
                    </h3>
                    <p className={`transition-all duration-500
                                  ${activeStep === index ? 'text-gray-700' : 'text-gray-500'}`}>
                      {step.description}
                    </p>
                  </div>

                  {/* 화살표 (마지막 단계 제외) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                      <ArrowForwardIcon 
                        className={`rotate-90 transition-all duration-500
                                   ${activeStep === index ? 'text-primary' : 'text-gray-300'}`} 
                        sx={{ fontSize: 24 }} 
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 오른쪽: 시각적 표현 */}
          <div className="relative">
            <div className="sticky top-8">
              {/* 현재 단계의 일러스트레이션 */}
              <div className="transition-all duration-500 transform">
                {steps[activeStep].illustration}
              </div>

              {/* 단계 인디케이터 */}
              <div className="flex justify-center gap-2 mt-8">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300
                               ${activeStep === index 
                                 ? 'bg-primary scale-125' 
                                 : 'bg-gray-300 hover:bg-gray-400'
                               }`}
                  />
                ))}
              </div>

              {/* 진행률 바 */}
              <div className="mt-6 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                />
              </div>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  {activeStep + 1} / {steps.length} 단계
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 CTA */}
        <div className="text-center mt-20">
          <div className="inline-block p-1 bg-gradient-to-r from-primary to-blue-500 rounded-2xl">
            <div className="bg-white rounded-xl px-8 py-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                지금 바로 튜터와 연결되어 보세요
              </h3>
              <p className="text-gray-600 mb-4">
                예약부터 사후관리까지, 완벽한 학습 경험이 기다리고 있어요
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
                <EventIcon sx={{ fontSize: 20 }} />
                <span>예약하기</span>
                <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};