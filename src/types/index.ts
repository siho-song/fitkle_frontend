// 메인 타입 export 파일 - 프로젝트 전체에서 사용할 타입들을 중앙 관리

// 엔티티 타입들 (도메인 객체)
export * from './entities';

// 컴포넌트 타입들
export * from './components';

// 스토어 타입들
export * from './store';

// API 타입들
export * from './api';

// 상수 타입들
export * from './constants';

// 유틸리티 타입들
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequireField<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type Nullable<T> = T | null;
export type ValueOf<T> = T[keyof T];

// 일반적인 ID 타입
export type ID = string;

// 날짜 관련 타입
export type DateString = string; // ISO 8601 format
export type Timestamp = number;

// 색상 타입
export type Color = string; // hex, rgb, hsl etc.

// 파일 관련 타입
export interface FileInfo {
  name: string;
  size: number;
  type: string;
  url?: string;
}

// 좌표 타입
export interface Coordinates {
  latitude: number;
  longitude: number;
}

// 주소 타입
export interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  coordinates?: Coordinates;
}

// 연락처 타입
export interface Contact {
  email?: string;
  phone?: string;
  website?: string;
  address?: Address;
}

// 시간 범위 타입
export interface TimeRange {
  start: string;
  end: string;
}

// 날짜 범위 타입
export interface DateRange {
  start: DateString;
  end: DateString;
}