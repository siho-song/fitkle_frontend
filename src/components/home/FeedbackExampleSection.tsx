"use client";

import React, { useState } from 'react';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const feedbackExamples = [
  {
    id: 1,
    category: "그림",
    studentQuestion: {
      type: "video",
      content: "제가 손 그리는 모습인데, 왜 이상해 보이는지 모르겠어요...",
      thumbnail: "🎨"
    },
    tutorResponse: {
      type: "video",
      tutor: "김아트",
      content: "손가락 비율과 관절 위치를 보시면... 이 부분을 이렇게 수정해보세요!",
      duration: "3분 12초",
      helpfulCount: 23
    },
    result: "손 그리기 실력이 확실히 늘었어요!"
  },
  {
    id: 2,
    category: "요리",
    studentQuestion: {
      type: "photo",
      content: "파스타 만들었는데 면이 너무 퍼져서 맛이 없어요 ㅠㅠ",
      thumbnail: "🍝"
    },
    tutorResponse: {
      type: "audio",
      tutor: "셰프김",
      content: "면 삶는 시간과 소스 농도가 문제네요. 다음번엔 이렇게 해보세요...",
      duration: "2분 45초",
      helpfulCount: 18
    },
    result: "이제 맛있는 파스타 만들 수 있어요!"
  },
  {
    id: 3,
    category: "운동",
    studentQuestion: {
      type: "video",
      content: "스쿼트 자세가 맞는지 확인해주세요. 무릎이 아픈 것 같아요.",
      thumbnail: "🏃"
    },
    tutorResponse: {
      type: "video",
      tutor: "헬스트레이너",
      content: "무릎 각도와 발 위치를 조정해보세요. 이렇게 하시면 안전해요!",
      duration: "4분 30초",
      helpfulCount: 31
    },
    result: "부상 없이 안전하게 운동하고 있어요!"
  }
];

export function FeedbackExampleSection() {
  const [activeExample, setActiveExample] = useState(0);

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          💬 실제 피드백 사례를 확인해보세요
        </h2>
        <p className="text-lg text-gray-600">
          다른 학습자들이 어떤 질문을 하고 어떤 답변을 받았는지 살펴보세요
        </p>
      </div>

      {/* 카테고리 탭 */}
      <div className="flex justify-center gap-4 mb-8">
        {feedbackExamples.map((example, index) => (
          <button
            key={example.id}
            onClick={() => setActiveExample(index)}
            className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
              activeExample === index
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {example.category}
          </button>
        ))}
      </div>

      {/* 피드백 예시 */}
      <div className="max-w-6xl mx-auto">
        {feedbackExamples.map((example, index) => (
          <div
            key={example.id}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${
              activeExample === index ? 'block' : 'hidden'
            }`}
          >
            {/* 학생 질문 */}
            <div className="bg-blue-50 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  학
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">학습자의 질문</h3>
                  <p className="text-sm text-gray-600">{example.category} 분야</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                {/* 질문 내용 */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{example.studentQuestion.thumbnail}</div>
                  <div className="flex-1">
                    <p className="text-gray-700">{example.studentQuestion.content}</p>
                  </div>
                </div>

                {/* 미디어 타입 표시 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-blue-600">
                    {example.studentQuestion.type === 'video' && <PlayCircleFilledIcon />}
                    {example.studentQuestion.type === 'photo' && <div>📷</div>}
                    <span className="text-sm font-medium">
                      {example.studentQuestion.type === 'video' ? '영상 질문' : '사진 질문'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 튜터 답변 */}
            <div className="bg-green-50 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  튜
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{example.tutorResponse.tutor} 튜터</h3>
                  <p className="text-sm text-gray-600">전문가 답변</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
                {/* 답변 내용 */}
                <p className="text-gray-700 mb-4">{example.tutorResponse.content}</p>

                {/* 미디어 정보 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-green-600">
                    {example.tutorResponse.type === 'video' && <PlayCircleFilledIcon />}
                    {example.tutorResponse.type === 'audio' && <VolumeUpIcon />}
                    <span className="text-sm font-medium">
                      {example.tutorResponse.type === 'video' ? '영상 피드백' : '음성 피드백'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <AccessTimeIcon sx={{ fontSize: 16 }} />
                    <span className="text-sm">{example.tutorResponse.duration}</span>
                  </div>
                </div>

                {/* 도움됨 */}
                <div className="flex items-center gap-2 text-gray-600">
                  <ThumbUpIcon sx={{ fontSize: 16 }} className="text-blue-500" />
                  <span className="text-sm">{example.tutorResponse.helpfulCount}명이 도움됐다고 했어요</span>
                </div>
              </div>

              {/* 결과 */}
              <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-green-600">✨</div>
                  <span className="font-semibold text-gray-900">결과</span>
                </div>
                <p className="text-gray-700 text-sm">"{example.result}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 체험하기 버튼 */}
      <div className="text-center mt-12">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          나도 이런 맞춤형 피드백을 받고 싶다면?
        </h3>
        <button className="px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors">
          지금 무료로 질문하기
        </button>
      </div>
    </section>
  );
}