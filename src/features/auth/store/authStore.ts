import { create } from 'zustand';
import type { AuthState } from '../types/auth';

const STORAGE_KEYS = {
  isLoggedIn: 'isLoggedIn',
  userNickname: 'userNickname',
  userId: 'userId',
};

const getInitialState = (): AuthState => {
  return {
    status: 'initial',
    isLoggedIn: false,
    errorMessage: null,
    userNickname: null,
    userId: null,
  };
};

interface AuthStore extends AuthState {
  login: (params: { nickname?: string; userId?: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateNickname: (nickname: string) => Promise<void>;
  clearError: () => void;
  setLoading: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  ...getInitialState(),

  hydrate: () => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem(STORAGE_KEYS.isLoggedIn) === 'true';
      const userNickname = localStorage.getItem(STORAGE_KEYS.userNickname);
      const userId = localStorage.getItem(STORAGE_KEYS.userId);
      
      set({
        status: isLoggedIn ? 'authenticated' : 'unauthenticated',
        isLoggedIn,
        userNickname,
        userId,
      });
    }
  },

  setLoading: () => set({ status: 'loading' }),

  login: async ({ nickname, userId }) => {
    try {
      set({ status: 'loading' });
      localStorage.setItem(STORAGE_KEYS.isLoggedIn, 'true');
      if (nickname) localStorage.setItem(STORAGE_KEYS.userNickname, nickname);
      if (userId) localStorage.setItem(STORAGE_KEYS.userId, userId);

      set((state) => ({
        status: 'authenticated',
        isLoggedIn: true,
        userNickname: nickname ?? state.userNickname,
        userId: userId ?? state.userId,
        errorMessage: null,
      }));
    } catch (e) {
      set({
        status: 'error',
        errorMessage: `로그인 중 오류가 발생했습니다: ${e}`,
      });
    }
  },

  logout: async () => {
    try {
      set({ status: 'loading' });
      localStorage.setItem(STORAGE_KEYS.isLoggedIn, 'false');
      localStorage.removeItem(STORAGE_KEYS.userNickname);
      localStorage.removeItem(STORAGE_KEYS.userId);

      set({
        status: 'unauthenticated',
        isLoggedIn: false,
        userNickname: null,
        userId: null,
        errorMessage: null,
      });
    } catch (e) {
      set({
        status: 'error',
        errorMessage: `로그아웃 중 오류가 발생했습니다: ${e}`,
      });
    }
  },

  updateNickname: async (nickname: string) => {
    try {
      localStorage.setItem(STORAGE_KEYS.userNickname, nickname);
      set({ userNickname: nickname });
    } catch (e) {
      set({
        status: 'error',
        errorMessage: `닉네임 업데이트 중 오류가 발생했습니다: ${e}`,
      });
    }
  },

  clearError: () => set({ errorMessage: null }),
}));

// 셀렉터 예시
export const useIsLoggedIn = () => useAuthStore((state) => state.isLoggedIn);
export const useUserNickname = () => useAuthStore((state) => state.userNickname);
export const useAuthStatus = () => useAuthStore((state) => state.status);
export const useAuthError = () => useAuthStore((state) => state.errorMessage);
export const useIsLoading = () => useAuthStore((state) => state.status === 'loading'); 