"use client";

import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

const recentSolved = [
  {
    id: 1,
    category: "요리",
    emoji: "🍝",
    timeAgo: "3분 전",
    student: "요리초보",
    tutor: "김셰프",
    question: "파스타 면이 계속 퍼져서 맛이 없어요...",
    before: {
      description: "면이 뭉쳐지고 퍼진 상태",
      image: "😞"
    },
    after: {
      description: "탱글탱글한 알덴테 완성!",
      image: "😋"
    },
    solution: "면 삶는 시간을 2분 줄이고, 소스와 함께 볶는 시간을 늘려보세요",
    feedbackType: "영상 + 텍스트",
    helpful: 12,
    solved: true
  },
  {
    id: 2,
    category: "악기",
    emoji: "🎸",
    timeAgo: "15분 전",
    student: "기타배우는중",
    tutor: "이기타",
    question: "F코드를 눌러도 소리가 제대로 안나요",
    before: {
      description: "막힌 소리, 줄이 제대로 안눌림",
      image: "😤"
    },
    after: {
      description: "깔끔한 F코드 소리 완성!",
      image: "🎵"
    },
    solution: "엄지손가락 위치를 조금 더 아래로, 나머지 손가락은 더 세게 눌러보세요",
    feedbackType: "실시간 영상통화",
    helpful: 8,
    solved: true
  },
  {
    id: 3,
    category: "운동",
    emoji: "💪",
    timeAgo: "1시간 전",
    student: "홈트족",
    tutor: "박트레이너",
    question: "스쿼트 할 때 무릎이 아픈데 자세가 틀렸나요?",
    before: {
      description: "무릎이 안쪽으로 모이는 잘못된 자세",
      image: "😰"
    },
    after: {
      description: "올바른 자세로 안전한 스쿼트",
      image: "💪"
    },
    solution: "발끝을 약간 바깥쪽으로 향하고, 무릎이 발끝 방향으로 가도록 의식해보세요",
    feedbackType: "영상 피드백",
    helpful: 15,
    solved: true
  },
  {
    id: 4,
    category: "디자인",
    emoji: "🎨",
    timeAgo: "2시간 전",
    student: "그림러버",
    tutor: "김아티스트",
    question: "인물 그릴 때 얼굴 비율이 계속 이상해요",
    before: {
      description: "부자연스러운 얼굴 비율",
      image: "😅"
    },
    after: {
      description: "자연스러운 얼굴 비율로 개선",
      image: "✨"
    },
    solution: "눈을 얼굴 정중앙에 두고, 코와 입 사이 거리를 눈 크기만큼 띄어보세요",
    feedbackType: "단계별 그림 설명",
    helpful: 9,
    solved: true
  }
];

export function RecentSolvedSection() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          ✅ 방금 해결된 실제 질문들
        </h2>
        <p className="text-lg text-gray-600">
          다른 사람들의 고민이 어떻게 해결되었는지 확인해보세요
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {recentSolved.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{item.emoji}</div>
                <div>
                  <span className="text-sm font-semibold text-primary">{item.category}</span>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <AccessTimeIcon sx={{ fontSize: 12 }} />
                    {item.timeAgo}
                    <CheckCircleIcon sx={{ fontSize: 12 }} className="text-green-500" />
                    해결완료
                  </div>
                </div>
              </div>
              <div className="text-right text-xs text-gray-500">
                <div>{item.student} → {item.tutor}</div>
              </div>
            </div>

            {/* 질문 */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">질문</h3>
              <p className="text-gray-700 text-sm bg-gray-50 rounded-xl p-3">
                "{item.question}"
              </p>
            </div>

            {/* Before/After */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="bg-red-50 rounded-xl p-4 mb-2">
                  <div className="text-3xl mb-2">{item.before.image}</div>
                  <h4 className="font-semibold text-red-700 text-sm">Before</h4>
                  <p className="text-xs text-red-600 mt-1">{item.before.description}</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-green-50 rounded-xl p-4 mb-2">
                  <div className="text-3xl mb-2">{item.after.image}</div>
                  <h4 className="font-semibold text-green-700 text-sm">After</h4>
                  <p className="text-xs text-green-600 mt-1">{item.after.description}</p>
                </div>
              </div>
            </div>

            {/* 해결 방법 */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                해결 방법
              </h4>
              <p className="text-gray-700 text-sm bg-primary/5 rounded-xl p-3">
                {item.solution}
              </p>
            </div>

            {/* 피드백 타입 및 좋아요 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlayCircleFilledIcon className="text-primary" sx={{ fontSize: 16 }} />
                <span className="text-xs text-gray-600 font-medium">{item.feedbackType}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <ThumbUpIcon sx={{ fontSize: 16 }} className="text-blue-500" />
                <span className="text-xs font-medium">{item.helpful}명이 도움됐어요</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          당신의 고민도 이렇게 해결해보세요!
        </h3>
        <button className="px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors">
          지금 바로 질문하기
        </button>
      </div>
    </section>
  );
}