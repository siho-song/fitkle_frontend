"use client";

import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import FeedbackIcon from '@mui/icons-material/Feedback';
import PaymentIcon from '@mui/icons-material/Payment';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import VideocamIcon from '@mui/icons-material/Videocam';
import CallIcon from '@mui/icons-material/Call';
import MicIcon from '@mui/icons-material/Mic';

const steps = [
  {
    step: 1,
    icon: <SearchIcon className="text-white" sx={{ fontSize: 32 }} />,
    title: "튜터 찾기",
    description: "원하는 분야의 전문가를 검색하고 프로필을 확인해보세요",
    color: "from-blue-500 to-blue-600"
  },
  {
    step: 2,
    icon: <ChatIcon className="text-white" sx={{ fontSize: 32 }} />,
    title: "채팅으로 상담",
    description: "궁금한 점을 자유롭게 질문하고 튜터와 대화해보세요",
    color: "from-green-500 to-green-600"
  },
  {
    step: 3,
    icon: <PhotoCameraIcon className="text-white" sx={{ fontSize: 32 }} />,
    title: "질문 전송",
    description: "영상, 사진, 글로 구체적인 질문이나 고민을 보내주세요",
    color: "from-purple-500 to-purple-600"
  },
  {
    step: 4,
    icon: <FeedbackIcon className="text-white" sx={{ fontSize: 32 }} />,
    title: "맞춤 피드백",
    description: "튜터가 당신만을 위한 맞춤형 답변을 제공해드려요",
    color: "from-orange-500 to-orange-600"
  }
];

const questionTypes = [
  {
    icon: <VideocamIcon className="text-primary" />,
    title: "영상 질문",
    examples: [
      "제가 그림 그리는 모습 봐주세요",
      "요리하는 과정에서 실수한 부분이 어딘가요?",
      "운동 자세가 맞는지 확인해주세요"
    ]
  },
  {
    icon: <PhotoCameraIcon className="text-primary" />,
    title: "사진 질문",
    examples: [
      "이 그림에서 어색한 부분 알려주세요",
      "음식이 왜 이렇게 나왔을까요?",
      "PPT 디자인 개선점이 뭔가요?"
    ]
  },
  {
    icon: <ChatIcon className="text-primary" />,
    title: "글 질문",
    examples: [
      "기타 연습할 때 이런 어려움이 있어요",
      "운동하면서 느끼는 이상한 점이...",
      "디자인 작업할 때 항상 막히는 부분이..."
    ]
  }
];

const feedbackTypes = [
  {
    icon: <VideocamIcon className="text-primary" />,
    title: "영상 피드백",
    description: "직접 시연하며 단계별로 설명해드려요"
  },
  {
    icon: <CallIcon className="text-primary" />,
    title: "실시간 통화",
    description: "화상통화로 즉시 상담하며 해결해드려요"
  },
  {
    icon: <MicIcon className="text-primary" />,
    title: "음성 녹음",
    description: "자세한 설명을 음성으로 녹음해서 전달해드려요"
  },
  {
    icon: <ChatIcon className="text-primary" />,
    title: "텍스트 설명",
    description: "꼼꼼한 텍스트로 구체적인 조언을 드려요"
  }
];

export function HowItWorksSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 메인 타이틀 */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🔄 이렇게 피드백을 받아요
        </h2>
        <p className="text-lg text-gray-600">
          간단한 4단계로 전문가의 맞춤형 피드백을 받아보세요
        </p>
      </div>

      {/* 4단계 프로세스 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        {steps.map((step, index) => (
          <div key={step.step} className="text-center">
            <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
              {step.icon}
            </div>
            <div className="text-sm text-primary font-bold mb-2">STEP {step.step}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            
            {/* 화살표 (마지막 단계 제외) */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-4 -translate-y-1/2">
                <div className="text-2xl text-gray-300">→</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 질문 방법 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">📤 이렇게 질문하세요</h3>
          <div className="space-y-6">
            {questionTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">{type.icon}</div>
                  <h4 className="font-bold text-lg text-gray-900">{type.title}</h4>
                </div>
                <div className="space-y-2">
                  {type.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-gray-600 text-sm">"{example}"</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 피드백 방법 */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">📥 이렇게 답변받아요</h3>
          <div className="space-y-4">
            {feedbackTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{type.icon}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                    <p className="text-gray-600 text-sm">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          지금 바로 시작해보세요!
        </h3>
        <p className="text-gray-600 mb-6">
          첫 질문은 무료로 체험해볼 수 있어요
        </p>
        <button className="px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors">
          무료 체험하기
        </button>
      </div>
    </section>
  );
}