"use client";

import React from 'react';
import Link from 'next/link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export const AppPromotionSection: React.FC = () => {
  const features = [
    {
      icon: <VideoCallIcon className="text-blue-600" sx={{ fontSize: 32 }} />,
      title: "온라인 & 오프라인",
      description: "편리한 온라인 수업부터 대면 수업까지 선택 가능"
    },
    {
      icon: <ScheduleIcon className="text-green-600" sx={{ fontSize: 32 }} />,
      title: "유연한 스케줄",
      description: "나의 시간에 맞춰 자유롭게 수업 예약"
    },
    {
      icon: <SecurityIcon className="text-purple-600" sx={{ fontSize: 32 }} />,
      title: "안전한 결제",
      description: "검증된 결제 시스템으로 안전하게 거래"
    },
    {
      icon: <SupportAgentIcon className="text-orange-600" sx={{ fontSize: 32 }} />,
      title: "24/7 고객지원",
      description: "언제든지 도움이 필요할 때 즉시 지원"
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
        <div className="bg-gradient-to-r from-primary to-purple-600 rounded-3xl p-8 md:p-12 mb-16 text-white relative overflow-hidden">
          {/* 배경 장식 */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
          
          <div className="relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <TrendingUpIcon sx={{ fontSize: 18 }} />
                  신뢰받는 1위 학습 플랫폼
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  왜 Fitkle을
                  <br />
                  선택해야 할까요?
                </h2>
                
                <p className="text-xl mb-8 text-white/90 leading-relaxed">
                  10,000명이 넘는 학습자들이 Fitkle과 함께 새로운 도전을 성공시켰습니다. 
                  이제 여러분의 차례입니다.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/tutors"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    지금 시작하기
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-primary transition-all duration-300"
                  >
                    더 알아보기
                  </Link>
                </div>
              </div>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <CheckCircleIcon className="text-green-300 flex-shrink-0" sx={{ fontSize: 24 }} />
                    <span className="text-white font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 특징 소개 */}
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Fitkle만의 특별함
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            단순한 온라인 강의가 아닌, 진짜 멘토링을 경험해보세요
          </p>
        </div>

        {/* 특징 카드들 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA 섹션 */}
        <div className="text-center mt-20">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              지금 시작하면 <span className="text-primary">첫 수업 50% 할인</span>
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              전문가와의 1:1 수업으로 새로운 스킬을 배우고, 꿈을 현실로 만들어보세요.
              첫 수업은 50% 할인된 가격으로 체험할 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tutors"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                튜터 찾아보기
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
              >
                무료 회원가입
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};