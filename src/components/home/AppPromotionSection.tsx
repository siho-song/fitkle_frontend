"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export const AppPromotionSection: React.FC = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  
  const features = [
    {
      icon: <VideoCallIcon className="text-blue-600" sx={{ fontSize: 32 }} />,
      title: "온라인 & 오프라인",
      description: "편리한 온라인 수업부터 대면 수업까지 선택 가능",
      color: "blue",
      benefit: "언제 어디서나 학습 가능"
    },
    {
      icon: <ScheduleIcon className="text-green-600" sx={{ fontSize: 32 }} />,
      title: "유연한 스케줄",
      description: "나의 시간에 맞춰 자유롭게 수업 예약",
      color: "green",
      benefit: "바쁜 일정에도 딱 맞춰"
    },
    {
      icon: <SecurityIcon className="text-purple-600" sx={{ fontSize: 32 }} />,
      title: "안전한 결제",
      description: "검증된 결제 시스템으로 안전하게 거래",
      color: "purple",
      benefit: "걱정 없이 안전한 거래"
    },
    {
      icon: <SupportAgentIcon className="text-orange-600" sx={{ fontSize: 32 }} />,
      title: "24/7 고객지원",
      description: "언제든지 도움이 필요할 때 즉시 지원",
      color: "orange",
      benefit: "답답한 순간에도 정답을"
    }
  ];

  const benefits = [
    "검증된 전문가들만 엄선",
    "1:1 맞춤형 수업 진행",
    "실시간 채팅 상담 가능",
    "수업 만족도 99% 달성",
    "무료 체험 수업 제공",
    "수강 후 환불 보장"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 메인 배너 */}
        <div className="relative bg-gradient-to-r from-primary via-primary to-purple-600 rounded-3xl p-8 md:p-12 mb-20 text-white overflow-hidden group">
          {/* 더 세련된 배경 장식 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full -translate-y-36 translate-x-36 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full translate-y-20 -translate-x-20"></div>
            <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-white rounded-full opacity-50"></div>
          </div>
          
          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
                  <TrendingUpIcon sx={{ fontSize: 18 }} />
                  대한민국 1위 학습 플랫폼
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  왜 <span className="text-yellow-300">Fitkle</span>을
                  <br />
                  선택해야 할까요?
                </h2>
                
                <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
                  <span className="font-semibold text-yellow-300">10,000명</span>이 넘는 학습자들이 Fitkle과 함께 새로운 도전을 성공시켰습니다. 
                  <br />
                  이제 <span className="font-semibold">여러분의 차례</span>입니다.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/tutors"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  >
                    <PlayArrowIcon sx={{ fontSize: 20 }} />
                    지금 시작하기
                    <ArrowForwardIcon className="ml-1 group-hover:translate-x-1 transition-transform duration-300" sx={{ fontSize: 18 }} />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    더 알아보기
                  </Link>
                </div>
              </div>
              
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 bg-white/15 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-default"
                  >
                    <div className="flex-shrink-0">
                      <CheckCircleIcon className="text-green-300" sx={{ fontSize: 22 }} />
                    </div>
                    <span className="text-white font-medium text-sm md:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 특징 소개 */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm border border-primary/20">
              특별한 경험
            </span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Fitkle만의 <span className="text-primary">특별함</span>
          </h3>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            단순한 온라인 강의가 아닌, 진짜 멘토링을 경험해보세요.
            <br className="hidden md:block" />
            <span className="text-primary font-semibold">개인맞춤형</span> 학습으로 더 빠르고 효과적인 성장을 경험해보세요.
          </p>
        </div>

        {/* 특징 카드들 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const isHovered = hoveredFeature === index;
            const colorClasses = {
              blue: 'group-hover:bg-blue-50 border-blue-200',
              green: 'group-hover:bg-green-50 border-green-200',
              purple: 'group-hover:bg-purple-50 border-purple-200',
              orange: 'group-hover:bg-orange-50 border-orange-200'
            };
            
            return (
              <div 
                key={index} 
                className="group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-default"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <div className={`w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center transition-all duration-300 ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                    {feature.icon}
                  </div>
                </div>
                
                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  {feature.title}
                </h4>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                {isHovered && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-primary font-medium">
                      🎆 {feature.benefit}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA 섹션 */}
        <div className="text-center mt-20">
          <div className="relative bg-gradient-to-br from-white via-gray-50 to-primary/5 p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 max-w-5xl mx-auto overflow-hidden">
            {/* 배경 장식 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-100 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-red-100 text-red-600 font-bold rounded-full text-sm border border-red-200">
                  한정 혜택
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                지금 시작하면
                <br className="md:hidden" />
                <span className="text-primary"> 첫 수업 50% 할인</span> ✨
              </h3>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                전문가와의 1:1 맞춤 수업으로 새로운 스킬을 배우고, 꿈을 현실로 만들어보세요.
                <br />
                <span className="font-semibold text-primary">첫 수업은 50% 할인된 가격</span>으로 체험할 수 있습니다.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Link
                  href="/tutors"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  <PlayArrowIcon sx={{ fontSize: 20 }} />
                  튜터 찾아보기
                  <ArrowForwardIcon className="ml-1 group-hover:translate-x-1 transition-transform duration-300" sx={{ fontSize: 18 }} />
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  무료 회원가입
                </Link>
              </div>
              
              <div className="text-xs text-gray-500">
                ⚠️ 할인 혜택은 신규 회원에게만 제공되며, 언제든 종료될 수 있습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};