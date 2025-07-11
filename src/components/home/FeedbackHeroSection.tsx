"use client";

import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import VideocamIcon from '@mui/icons-material/Videocam';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ChatIcon from '@mui/icons-material/Chat';
import MicIcon from '@mui/icons-material/Mic';
import CallIcon from '@mui/icons-material/Call';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

const feedbackTypes = [
  { icon: <VideocamIcon className="text-primary" />, title: "영상 피드백", desc: "실제 시연하며 설명" },
  { icon: <CallIcon className="text-primary" />, title: "실시간 통화", desc: "바로 상담하며 해결" },
  { icon: <MicIcon className="text-primary" />, title: "음성 녹음", desc: "자세한 설명 전달" },
  { icon: <ChatIcon className="text-primary" />, title: "문자 피드백", desc: "꼼꼼한 텍스트 조언" },
];

const categories = [
  { emoji: "🎨", title: "그림/디자인", example: "제 그림 어색한 부분 알려주세요" },
  { emoji: "🍳", title: "요리", example: "이 음식 간이 왜 안 맞을까요?" },
  { emoji: "💼", title: "업무스킬", example: "PPT 디자인 개선점 알려주세요" },
  { emoji: "🎸", title: "음악", example: "기타 코드 잡는 법 틀렸나요?" },
  { emoji: "🏃", title: "운동", example: "제 운동 자세 체크해주세요" },
  { emoji: "📸", title: "사진", example: "이 사진 보정 어떻게 하나요?" },
];

export function FeedbackHeroSection() {
  return (
    <div className="py-16 text-center">
      {/* 메인 헤드라인 */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          <span className="text-primary">나만의 고민</span>에<br />
          <span className="text-primary">맞춤형 답변</span>을 받아보세요
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          영상, 사진, 글로 질문하면 전문가가 당신만을 위한 피드백을 드려요
        </p>
        
        {/* 피드백 방식 소개 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
          {feedbackTypes.map((type, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-md border">
              <div className="text-2xl mb-2">{type.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1">{type.title}</h3>
              <p className="text-sm text-gray-600">{type.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 질문 방법 안내 */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          📱 이렇게 질문해보세요
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <VideocamIcon sx={{ fontSize: 48 }} className="text-primary mb-3" />
            <h3 className="font-bold mb-2">영상으로 질문</h3>
            <p className="text-gray-600 text-sm">"제가 그리는 모습 봐주세요"</p>
          </div>
          <div className="text-center">
            <PhotoCameraIcon sx={{ fontSize: 48 }} className="text-primary mb-3" />
            <h3 className="font-bold mb-2">사진으로 질문</h3>
            <p className="text-gray-600 text-sm">"이 요리 뭐가 문제일까요?"</p>
          </div>
          <div className="text-center">
            <ChatIcon sx={{ fontSize: 48 }} className="text-primary mb-3" />
            <h3 className="font-bold mb-2">글로 질문</h3>
            <p className="text-gray-600 text-sm">"운동할 때 이런 느낌인데..."</p>
          </div>
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
              placeholder="어떤 분야의 피드백이 필요하세요? (예: 그림, 요리, 운동)"
            />
            <button className="ml-4 bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
              튜터 찾기
            </button>
          </div>
        </div>
      </div>

      {/* 인기 카테고리 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">🔥 이런 고민들이 많아요</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-gray-100"
            >
              <div className="text-4xl mb-3">{category.emoji}</div>
              <h4 className="font-bold text-gray-900 mb-2">{category.title}</h4>
              <p className="text-xs text-gray-600 leading-tight">"{category.example}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}