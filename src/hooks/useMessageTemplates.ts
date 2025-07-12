"use client";

import { useState, useEffect } from 'react';
import { MessageTemplate, MessageTemplateFormData, UserType } from '@/types';

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
      description: formData.description,
      userType,
      isCustom: true,
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
            description: formData.description,
            updatedAt: new Date().toISOString(),
          }
        : template
    );

    saveTemplates(newTemplates);
    return newTemplates.find(t => t.id === id);
  };

  // 템플릿 삭제
  const deleteTemplate = (id: string) => {
    const template = templates.find(t => t.id === id);
    if (template && !template.isCustom) {
      throw new Error('기본 템플릿은 삭제할 수 없습니다.');
    }

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