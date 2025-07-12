// 상수 타입들

// 카테고리 관련
export interface Category {
  id: string;
  name: string;
  emoji: string;
  description?: string;
  color?: string;
}

export type CategoryId = 
  | 'programming'
  | 'design' 
  | 'language'
  | 'music'
  | 'cooking'
  | 'fitness'
  | 'photography'
  | 'business'
  | 'other';

// 게시글 타입
export interface PostType {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

export type PostTypeId = 
  | 'question'
  | 'discussion'
  | 'showcase'
  | 'review'
  | 'help'
  | 'announcement';

// 언어 설정
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag?: string;
}

// 통화 설정
export interface Currency {
  code: string;
  name: string;
  symbol: string;
  decimals: number;
}

// 시간대 설정
export interface Timezone {
  id: string;
  name: string;
  offset: string;
  country?: string;
}

// 테마 색상
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  base: string;
  info: string;
  success: string;
  warning: string;
  error: string;
}

// 브레이크포인트
export interface Breakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

// API 엔드포인트
export interface ApiEndpoints {
  auth: {
    login: string;
    logout: string;
    signup: string;
    refresh: string;
    profile: string;
  };
  tutors: {
    list: string;
    detail: string;
    search: string;
    reviews: string;
    booking: string;
  };
  community: {
    posts: string;
    comments: string;
    categories: string;
  };
  orders: {
    list: string;
    create: string;
    update: string;
    cancel: string;
  };
  chat: {
    rooms: string;
    messages: string;
    upload: string;
  };
}