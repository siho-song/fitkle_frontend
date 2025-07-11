import React from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export interface PostType {
  id: string;
  name: string;
  icon: React.ReactElement;
  color: string;
  description?: string;
}

// 커뮤니티 게시글 타입 상수
export const POST_TYPES: PostType[] = [
  {
    id: 'all',
    name: '전체',
    icon: React.createElement(TrendingUpIcon, { sx: { fontSize: 17 } }),
    color: 'text-gray-600',
    description: '모든 타입의 게시글'
  },
  {
    id: 'question',
    name: '질문',
    icon: React.createElement(QuestionAnswerIcon, { sx: { fontSize: 17 } }),
    color: 'text-blue-500',
    description: '궁금한 것을 물어보세요'
  },
  {
    id: 'tip',
    name: '팁',
    icon: React.createElement(LightbulbIcon, { sx: { fontSize: 17 } }),
    color: 'text-green-500',
    description: '유용한 팁과 노하우'
  },
  {
    id: 'guide',
    name: '가이드',
    icon: React.createElement(MenuBookIcon, { sx: { fontSize: 17 } }),
    color: 'text-purple-500',
    description: '단계별 가이드와 튜토리얼'
  }
];

// 게시글 타입 ID만 추출한 타입
export type PostTypeId = typeof POST_TYPES[number]['id'];

// 게시글 타입 ID로 타입 정보 가져오기
export const getPostTypeById = (id: string): PostType | undefined => {
  return POST_TYPES.find(type => type.id === id);
};

// 게시글 타입 이름으로 타입 정보 가져오기
export const getPostTypeByName = (name: string): PostType | undefined => {
  return POST_TYPES.find(type => type.name === name);
};

// 전체 타입 제외한 실제 타입들만 가져오기
export const getActualPostTypes = (): PostType[] => {
  return POST_TYPES.filter(type => type.id !== 'all');
};

// 게시글 타입 ID가 유효한지 확인
export const isValidPostTypeId = (id: string): boolean => {
  return POST_TYPES.some(type => type.id === id);
};

// 기본 게시글 타입 (전체)
export const DEFAULT_POST_TYPE = POST_TYPES[0]; // 'all'

// 게시글 타입별 색상 매핑
export const getPostTypeColor = (typeId: string): string => {
  const type = getPostTypeById(typeId);
  return type?.color || 'text-gray-500';
};

// 게시글 타입별 아이콘 가져오기
export const getPostTypeIcon = (typeId: string): React.ReactElement | null => {
  const type = getPostTypeById(typeId);
  return type?.icon || null;
};