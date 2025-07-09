// 앱 전역 상태 타입 및 enum
export type ThemeMode = 'light' | 'dark';

export interface AppState {
  themeMode: ThemeMode;
  locale: string; // 예: 'ko-KR', 'en-US'
  isFirstLaunch: boolean;
  errorMessage?: string | null;
} 