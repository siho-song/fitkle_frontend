"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import TagIcon from '@mui/icons-material/Tag';
import { RichTextEditor } from './RichTextEditor';

const categories = [
  { id: 'cooking', name: '요리', emoji: '🍳' },
  { id: 'fitness', name: '운동', emoji: '💪' },
  { id: 'music', name: '음악', emoji: '🎵' }
];

const postTypes = [
  { id: 'question', name: '질문', icon: <QuestionAnswerIcon sx={{ fontSize: 18 }} />, color: 'text-blue-500', description: '궁금한 점을 물어보세요' },
  { id: 'tip', name: '팁', icon: <LightbulbIcon sx={{ fontSize: 18 }} />, color: 'text-green-500', description: '유용한 팁을 공유해주세요' },
  { id: 'guide', name: '가이드', icon: <MenuBookIcon sx={{ fontSize: 18 }} />, color: 'text-purple-500', description: '상세한 가이드를 작성해주세요' }
];

interface WritePostFormProps {
  onSubmit: (postData: any) => void;
  onCancel: () => void;
}

export function WritePostForm({ onSubmit, onCancel }: WritePostFormProps) {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || '';

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    type: initialType,
    tags: '',
    hasImages: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // URL 파라미터로부터 타입 설정
  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam && ['question', 'tip', 'guide'].includes(typeParam)) {
      setFormData(prev => ({ ...prev, type: typeParam }));
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 유효성 검사
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요';
    }
    
    // HTML 태그 제거하여 순수 텍스트만 확인
    const contentText = formData.content.replace(/<[^>]*>/g, '').trim();
    if (!contentText) {
      newErrors.content = '내용을 입력해주세요';
    }
    
    if (!formData.category) {
      newErrors.category = '카테고리를 선택해주세요';
    }
    
    if (!formData.type) {
      newErrors.type = '게시글 타입을 선택해주세요';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // 태그 처리
    const tags = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    const postData = {
      ...formData,
      tags,
      timestamp: Date.now(),
      timeAgo: '방금 전',
      likes: 0,
      comments: 0,
      views: 0,
      author: '나',
      authorAvatar: '👤',
      authorType: 'student', // 기본값으로 설정
      studentInfo: {
        level: 'beginner',
        isFirstPost: false
      }
    };
    
    onSubmit(postData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // 에러 초기화
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 카테고리 선택 */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-4">
          카테고리 선택 <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleInputChange('category', category.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 hover:scale-105 ${
                formData.category === category.id
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <span className="text-2xl">{category.emoji}</span>
              <span className="font-semibold text-sm">{category.name}</span>
            </button>
          ))}
        </div>
        {errors.category && (
          <p className="mt-2 text-sm text-red-500">{errors.category}</p>
        )}
      </div>

      {/* 게시글 타입 선택 */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-4">
          게시글 타입 <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-4">
          {postTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => handleInputChange('type', type.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                formData.type === type.id
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={formData.type === type.id ? 'text-primary' : type.color}>
                  {type.icon}
                </span>
                <span className="font-semibold text-sm">{type.name}</span>
              </div>
              <p className="text-xs text-gray-500">{type.description}</p>
            </button>
          ))}
        </div>
        {errors.type && (
          <p className="mt-2 text-sm text-red-500">{errors.type}</p>
        )}
      </div>

      {/* 제목 입력 */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-3">
          제목 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="제목을 입력해주세요"
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
            errors.title ? 'border-red-500' : 'border-gray-300 focus:border-primary'
          }`}
          maxLength={100}
        />
        <div className="flex justify-between mt-2">
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title}</p>
          )}
          <p className="text-xs text-gray-500 ml-auto">{formData.title.length}/100</p>
        </div>
      </div>

      {/* 내용 입력 */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-3">
          내용 <span className="text-red-500">*</span>
        </label>
        <RichTextEditor
          value={formData.content}
          onChange={(content) => handleInputChange('content', content)}
          placeholder="내용을 입력해주세요. 이미지도 삽입할 수 있습니다."
          error={errors.content}
          maxLength={5000}
        />
      </div>

      {/* 태그 입력 */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-3">
          태그 (선택사항)
        </label>
        <div className="relative">
          <TagIcon className="absolute left-3 top-3 text-gray-400" sx={{ fontSize: 20 }} />
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => handleInputChange('tags', e.target.value)}
            placeholder="태그를 콤마(,)로 구분하여 입력해주세요 (예: 파스타, 소스, 요리팁)"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          관련 키워드를 입력하면 다른 사용자들이 쉽게 찾을 수 있습니다.
        </p>
      </div>


      {/* 제출 버튼 */}
      <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
        >
          취소
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-semibold"
        >
          게시글 작성
        </button>
      </div>
    </form>
  );
}