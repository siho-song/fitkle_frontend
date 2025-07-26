"use client";

import { useState, useEffect } from 'react';
import { MessageTemplate, MessageTemplateFormData } from '@/types/entities/chat';
import type { UserType } from '@/features/auth/types/auth';

// 기본 템플릿 생성 함수
const getDefaultTemplates = (userType: UserType): MessageTemplate[] => {
  const commonTemplates: MessageTemplate[] = [
    {
      id: 'greeting',
      title: '인사',
      content: '안녕하세요! 잘 부탁드립니다.',
      category: '인사',
      usage: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'thanks',
      title: '감사',
      content: '감사합니다!',
      category: '인사',
      usage: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  if (userType === 'student') {
    return [
      ...commonTemplates,
      {
        id: 'question',
        title: '질문',
        content: '질문이 있습니다. ',
        category: '질문',
        usage: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'homework',
        title: '과제 제출',
        content: '과제 완료했습니다. 확인 부탁드려요.',
        category: '과제',
        usage: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  } else if (userType === 'tutor') {
    return [
      ...commonTemplates,
      {
        id: 'feedback',
        title: '피드백',
        content: '잘 하셨습니다! 다음에는 이 부분을 조금 더 신경 써보세요.',
        category: '피드백',
        usage: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'assignment',
        title: '과제 안내',
        content: '다음 과제를 안내드립니다. ',
        category: '과제',
        usage: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  return commonTemplates;
};

export function useMessageTemplates(userType: UserType) {
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const storageKey = `messageTemplates_${userType}`;

  // 초기 데이터 로드
  useEffect(() => {
    const loadTemplates = () => {
      try {
        const storedTemplates = localStorage.getItem(storageKey);
        if (storedTemplates) {
          const parsedTemplates = JSON.parse(storedTemplates);
          setTemplates(parsedTemplates);
        } else {
          // 초기 템플릿 설정
          const defaultTemplates = getDefaultTemplates(userType);
          setTemplates(defaultTemplates);
          localStorage.setItem(storageKey, JSON.stringify(defaultTemplates));
        }
      } catch (error) {
        console.error('Failed to load templates:', error);
        const defaultTemplates = getDefaultTemplates(userType);
        setTemplates(defaultTemplates);
      } finally {
        setIsLoading(false);
      }
    };

    loadTemplates();
  }, [userType, storageKey]);

  // 템플릿 저장
  const saveTemplates = (newTemplates: MessageTemplate[]) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(newTemplates));
      setTemplates(newTemplates);
    } catch (error) {
      console.error('Failed to save templates:', error);
    }
  };

  // 템플릿 추가
  const addTemplate = (formData: MessageTemplateFormData) => {
    const newTemplate: MessageTemplate = {
      id: `custom-${Date.now()}`,
      title: formData.title,
      content: formData.content,
      category: formData.category || '기타',
      usage: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newTemplates = [...templates, newTemplate];
    saveTemplates(newTemplates);
    return newTemplate;
  };

  // 템플릿 수정
  const updateTemplate = (id: string, formData: MessageTemplateFormData) => {
    const newTemplates = templates.map(template => 
      template.id === id 
        ? {
            ...template,
            title: formData.title,
            content: formData.content,
            category: formData.category || template.category,
            updatedAt: new Date().toISOString(),
          }
        : template
    );

    saveTemplates(newTemplates);
    return newTemplates.find(t => t.id === id);
  };

  // 템플릿 삭제
  const deleteTemplate = (id: string) => {
    const newTemplates = templates.filter(template => template.id !== id);
    saveTemplates(newTemplates);
  };

  // 템플릿 초기화 (기본 템플릿으로 리셋)
  const resetTemplates = () => {
    const defaultTemplates = getDefaultTemplates(userType);
    saveTemplates(defaultTemplates);
  };

  return {
    templates,
    isLoading,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    resetTemplates,
  };
}