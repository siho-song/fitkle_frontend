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
    id: 'programming',
    name: '프로그래밍',
    emoji: '💻',
    description: '프로그래밍, 개발, 코딩 관련'
  },
  {
    id: 'design',
    name: '디자인',
    emoji: '🎨',
    description: '디자인, UI/UX, 그래픽 관련'
  },
  {
    id: 'language',
    name: '언어',
    emoji: '🗣️',
    description: '외국어, 언어학습 관련'
  },
  {
    id: 'music',
    name: '음악',
    emoji: '🎵',
    description: '악기, 노래, 음악 이론 관련'
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
    id: 'counseling',
    name: '심리상담',
    emoji: '🧠',
    description: '심리상담, 멘탈헬스, 상담 관련'
  },
  {
    id: 'photography',
    name: '사진',
    emoji: '📸',
    description: '사진 촬영, 편집, 포토그래피 관련'
  },
  {
    id: 'data_analysis',
    name: '데이터 분석',
    emoji: '📊',
    description: '데이터 분석, 통계, BI 도구 관련'
  },
  {
    id: 'art',
    name: '미술',
    emoji: '🖼️',
    description: '회화, 드로잉, 미술 창작 관련'
  },
  {
    id: 'math',
    name: '수학',
    emoji: '📐',
    description: '수학, 미적분, 통계 관련'
  },
  {
    id: 'investment',
    name: '투자',
    emoji: '💰',
    description: '주식, 부동산, 재테크 관련'
  },
  {
    id: 'health',
    name: '건강',
    emoji: '🏥',
    description: '영양학, 다이어트, 건강 관리 관련'
  },
  {
    id: 'business',
    name: '비즈니스',
    emoji: '💼',
    description: '마케팅, 창업, 비즈니스 관련'
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