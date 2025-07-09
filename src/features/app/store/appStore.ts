import { create } from 'zustand';
import type { AppState, ThemeMode } from '../types/app';

const STORAGE_KEYS = {
  themeMode: 'themeMode',
  locale: 'locale',
  isFirstLaunch: 'isFirstLaunch',
};

const getInitialState = (): AppState => {
  if (typeof window === 'undefined') {
    return {
      themeMode: 'light',
      locale: 'ko-KR',
      isFirstLaunch: true,
      errorMessage: null,
    };
  }
  const themeMode = (localStorage.getItem(STORAGE_KEYS.themeMode) as ThemeMode) || 'light';
  const locale = localStorage.getItem(STORAGE_KEYS.locale) || 'ko-KR';
  const isFirstLaunch = localStorage.getItem(STORAGE_KEYS.isFirstLaunch) !== 'false';

  return {
    themeMode,
    locale,
    isFirstLaunch,
    errorMessage: null,
  };
};

interface AppStore extends AppState {
  setThemeMode: (themeMode: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
  setLocale: (locale: string) => Promise<void>;
  setFirstLaunchComplete: () => Promise<void>;
  clearError: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  ...getInitialState(),

  setThemeMode: async (themeMode) => {
    try {
      localStorage.setItem(STORAGE_KEYS.themeMode, themeMode);
      set({ themeMode });
    } catch (e) {
      set({ errorMessage: `테마 설정 저장 중 오류가 발생했습니다: ${e}` });
    }
  },

  toggleTheme: async () => {
    const newTheme = get().themeMode === 'light' ? 'dark' : 'light';
    await get().setThemeMode(newTheme);
  },

  setLocale: async (locale) => {
    try {
      localStorage.setItem(STORAGE_KEYS.locale, locale);
      set({ locale });
    } catch (e) {
      set({ errorMessage: `언어 설정 저장 중 오류가 발생했습니다: ${e}` });
    }
  },

  setFirstLaunchComplete: async () => {
    try {
      localStorage.setItem(STORAGE_KEYS.isFirstLaunch, 'false');
      set({ isFirstLaunch: false });
    } catch (e) {
      set({ errorMessage: `첫 실행 설정 저장 중 오류가 발생했습니다: ${e}` });
    }
  },

  clearError: () => set({ errorMessage: null }),
}));

// 셀렉터 예시
export const useThemeMode = () => useAppStore((state) => state.themeMode);
export const useLocale = () => useAppStore((state) => state.locale);
export const useIsFirstLaunch = () => useAppStore((state) => state.isFirstLaunch);
export const useAppError = () => useAppStore((state) => state.errorMessage); 