export interface Category {
  id: string;
  name: string;
  emoji: string;
  description?: string;
}

// 커뮤니티 카테고리 상수
export const CATEGORIES: Category[] = [
  {
    id: 'all',
    name: '전체',
    emoji: '📚',
    description: '모든 카테고리의 게시글'
  },
  {
    id: 'cooking',
    name: '요리',
    emoji: '🍳',
    description: '요리, 레시피, 음식 관련'
  },
  {
    id: 'fitness',
    name: '운동',
    emoji: '💪',
    description: '운동, 헬스, 다이어트 관련'
  },
  {
    id: 'music',
    name: '음악',
    emoji: '🎵',
    description: '악기, 노래, 음악 이론 관련'
  }
];

// 카테고리 ID만 추출한 타입
export type CategoryId = typeof CATEGORIES[number]['id'];

// 카테고리 ID로 카테고리 정보 가져오기
export const getCategoryById = (id: string): Category | undefined => {
  return CATEGORIES.find(category => category.id === id);
};

// 카테고리 이름으로 카테고리 정보 가져오기
export const getCategoryByName = (name: string): Category | undefined => {
  return CATEGORIES.find(category => category.name === name);
};

// 전체 카테고리 제외한 실제 카테고리들만 가져오기
export const getActualCategories = (): Category[] => {
  return CATEGORIES.filter(category => category.id !== 'all');
};

// 카테고리 ID가 유효한지 확인
export const isValidCategoryId = (id: string): boolean => {
  return CATEGORIES.some(category => category.id === id);
};

// 기본 카테고리 (전체)
export const DEFAULT_CATEGORY = CATEGORIES[0]; // 'all'