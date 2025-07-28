"use client";

import React from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VerifiedIcon from '@mui/icons-material/Verified';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export const ServiceHighlightSection: React.FC = () => {
  const highlights = [
    {
      icon: <ChatBubbleOutlineIcon sx={{ fontSize: 48 }} />,
      title: "전문가가 직접 보고 말해요",
      description: "단순 설명이 아닌, 내 동작을 보고 즉시 교정해주는 맞춤 피드백",
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-blue-50",
      stats: "평균 응답시간 2분"
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: 48 }} />,
      title: "직업병행 현업 전문가",
      description: "이론이 아닌 현장 경험으로 가르치는, 지금도 현역에서 활동하는 전문가",
      color: "from-green-500 to-emerald-400", 
      bgColor: "bg-green-50",
      stats: "97% 만족도"
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 48 }} />,
      title: "언제든지, 어디서든",
      description: "내가 편한 시간, 편한 장소에서 바로 시작하는 맞춤 학습",
      color: "from-purple-500 to-pink-400",
      bgColor: "bg-purple-50", 
      stats: "365일 가능"
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 48 }} />,
      title: "놓치지 않는 전문가의 눈",
      description: "작은 실수도, 잘못된 습관도 놓치지 않고 바로바로 짚어주는 캐치",
      color: "from-orange-500 to-red-400",
      bgColor: "bg-orange-50",
      stats: "3배 빠른 학습"
    }
  ];

  const features = [
    {
      icon: <FlashOnIcon sx={{ fontSize: 24 }} />,
      title: "즉시 매칭",
      description: "AI 기반 매칭으로 최적의 튜터를 빠르게 찾아드려요"
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 24 }} />,
      title: "사후 관리",
      description: "레슨 후에도 지속적인 질문과 피드백이 가능해요" 
    },
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 24 }} />,
      title: "맞춤 커리큘럼",
      description: "당신의 목표와 수준에 완벽하게 맞춘 학습 계획"
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-14">
        
        {/* 섹션 헤더 */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm mb-8">
            <AutoAwesomeIcon className="text-primary" sx={{ fontSize: 20 }} />
            <span className="text-sm font-semibold text-gray-700">핵심 서비스</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            전문가의 시선이<br/>
            <span className="text-primary">닿는 순간</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            화면 너머에서도 전문가는 모든 것을 놓치지 않습니다.
            <br className="hidden md:block" />
            <span className="font-semibold text-gray-800">섬세한 관찰</span>과 즉시 피드백으로 완성되는 학습.
          </p>
        </div>

        {/* 메인 하이라이트 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {highlights.map((highlight, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
            >
              {/* 배경 그라데이션 */}
              <div className={`absolute inset-0 bg-gradient-to-br ${highlight.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
              
              <div className="relative">
                {/* 아이콘 */}
                <div className={`inline-flex items-center justify-center w-20 h-20 ${highlight.bgColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`text-transparent bg-gradient-to-br ${highlight.color} bg-clip-text`}>
                    {highlight.icon}
                  </div>
                </div>

                {/* 콘텐츠 */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                  {highlight.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {highlight.description}
                </p>

                {/* 통계 */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full group-hover:bg-primary/10 transition-colors duration-300">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${highlight.color}`}></div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors duration-300">
                    {highlight.stats}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 추가 기능 */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              화면으로 만나는 전문가
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              집중도 높은 환경에서 세밀한 관찰과 정확한 피드백까지, 모든 것이 자연스럽게 이어집니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <div className="text-primary group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                
                <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h4>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description} 
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 강력한 CTA */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-12 text-white shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              오늘부터 달라질 거예요
            </h3>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              바쁜 일상 속에서도 놓치지 않는 성장의 기회.
              단 10분이면 충분합니다.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-1">
                  <VerifiedIcon sx={{ fontSize: 16 }} />
                  <span>무료 체험</span>
                </div>
                <div className="w-px h-4 bg-white/30"></div>
                <div className="flex items-center gap-1">
                  <FlashOnIcon sx={{ fontSize: 16 }} />
                  <span>즉시 시작</span>
                </div>
                <div className="w-px h-4 bg-white/30"></div>
                <div className="flex items-center gap-1">
                  <SupportAgentIcon sx={{ fontSize: 16 }} />
                  <span>24시간 지원</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};