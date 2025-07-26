"use client";

import React from 'react';
import { HelpCircle } from 'lucide-react';
import type { UserType } from '@/features/auth/types/auth';

interface TemplateGuidePopupProps {
  userType: UserType;
}

export function TemplateGuidePopup({ userType }: TemplateGuidePopupProps) {

  const tutorGuide = {
    title: '메시지 템플릿 사용법',
    content: [
      {
        step: '1',
        title: '템플릿 열기',
        description: '메시지 입력창 옆의 📝 버튼을 클릭하여 템플릿 목록을 열어보세요.'
      },
      {
        step: '2',
        title: '카테고리 선택',
        description: '왼쪽에서 원하는 카테고리를 선택하세요. (상담 정보, 피드백, 일정 관리 등)'
      },
      {
        step: '3',
        title: '템플릿 선택',
        description: '오른쪽에서 상황에 맞는 템플릿을 선택하면 메시지창에 자동으로 입력됩니다.'
      },
      {
        step: '4',
        title: '내용 수정',
        description: '필요에 따라 내용을 수정하고 전송하세요. 개인정보나 구체적인 정보를 추가할 수 있습니다.'
      }
    ],
    tips: [
      '상담 전 정보 수집 템플릿을 활용하면 효율적인 상담이 가능합니다.',
      '피드백 템플릿을 사용하여 일관된 품질의 피드백을 제공하세요.',
      '일정 관리 템플릿으로 명확한 수업 계획을 공유하세요.',
      '템플릿은 기본 틀이니 상황에 맞게 수정하여 사용하세요.'
    ]
  };

  const tuteeGuide = {
    title: '메시지 템플릿 사용법',
    content: [
      {
        step: '1',
        title: '템플릿 열기',
        description: '메시지 입력창 옆의 📝 버튼을 클릭하여 템플릿 목록을 열어보세요.'
      },
      {
        step: '2',
        title: '카테고리 선택',
        description: '왼쪽에서 원하는 카테고리를 선택하세요. (상담 신청, 피드백, 일정 조정 등)'
      },
      {
        step: '3',
        title: '템플릿 선택',
        description: '오른쪽에서 상황에 맞는 템플릿을 선택하면 메시지창에 자동으로 입력됩니다.'
      },
      {
        step: '4',
        title: '내용 작성',
        description: '빈 칸을 채우고 개인적인 내용을 추가하여 전송하세요.'
      }
    ],
    tips: [
      '상담 신청 시 구체적인 정보를 미리 작성하면 더 나은 상담을 받을 수 있습니다.',
      '일정 조정 요청 시 대안 시간을 함께 제시하면 좋습니다.',
      '질문할 때는 구체적인 상황을 포함하여 작성하세요.',
      '감사 인사와 함께 궁금한 점을 정리하여 보내보세요.'
    ]
  };

  const guide = userType === 'tutor' ? tutorGuide : tuteeGuide;

  return (
    <div className="absolute bottom-full left-0 mb-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
          <div className="mb-3">
            <h3 className="font-semibold text-gray-900 mb-1">{guide.title}</h3>
            <p className="text-sm text-gray-600">
              메시지 템플릿을 활용하여 효율적으로 소통하세요!
            </p>
          </div>

          <div className="space-y-3 mb-4">
            {guide.content.map((item, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-3">
            <h4 className="font-medium text-gray-900 text-sm mb-2">💡 활용 팁</h4>
            <ul className="space-y-1">
              {guide.tips.map((tip, index) => (
                <li key={index} className="text-xs text-gray-600 flex items-start gap-1">
                  <span className="text-primary">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 화살표 */}
          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
        </div>
  );
}