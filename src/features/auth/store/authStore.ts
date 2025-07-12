import { create } from 'zustand';
import type { AuthState, UserType, TestAccount } from '@/types';

const STORAGE_KEYS = {
  isLoggedIn: 'isLoggedIn',
  userNickname: 'userNickname',
  userId: 'userId',
  userType: 'userType',
};

// 테스트 계정 데이터
export const TEST_ACCOUNTS: TestAccount[] = [
  {
    email: 'tutor@test.com',
    password: 'Xbxj1234!',
    nickname: '김튜터',
    userType: 'tutor'
  },
  {
    email: 'tutee@test.com',
    password: 'Xbxl1234!',
    nickname: '이튜티',
    userType: 'tutee'
  }
];

const getInitialState = (): AuthState => {
  return {
    status: 'initial',
    isLoggedIn: false,
    errorMessage: null,
    userNickname: null,
    userId: null,
    userType: null,
    isHydrated: false,
  };
};

interface AuthStore extends AuthState {
  login: (params: { nickname?: string; userId?: string; userType?: UserType }) => Promise<void>;
  loginWithTestAccount: (email: string, password: string) => Promise<void>;
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
      const userType = localStorage.getItem(STORAGE_KEYS.userType) as UserType | null;
      
      set({
        status: isLoggedIn ? 'authenticated' : 'unauthenticated',
        isLoggedIn,
        userNickname,
        userId,
        userType,
        isHydrated: true,
      });
    }
  },

  setLoading: () => set({ status: 'loading' }),

  login: async ({ nickname, userId, userType }) => {
    try {
      set({ status: 'loading' });
      localStorage.setItem(STORAGE_KEYS.isLoggedIn, 'true');
      if (nickname) localStorage.setItem(STORAGE_KEYS.userNickname, nickname);
      if (userId) localStorage.setItem(STORAGE_KEYS.userId, userId);
      if (userType) localStorage.setItem(STORAGE_KEYS.userType, userType);

      set((state) => ({
        status: 'authenticated',
        isLoggedIn: true,
        userNickname: nickname ?? state.userNickname,
        userId: userId ?? state.userId,
        userType: userType ?? state.userType,
        errorMessage: null,
        isHydrated: true,
      }));
    } catch (e) {
      set({
        status: 'error',
        errorMessage: `로그인 중 오류가 발생했습니다: ${e}`,
      });
    }
  },

  loginWithTestAccount: async (email: string, password: string) => {
    try {
      set({ status: 'loading' });
      const account = TEST_ACCOUNTS.find(acc => acc.email === email && acc.password === password);
      
      if (!account) {
        set({
          status: 'error',
          errorMessage: '이메일 또는 비밀번호가 올바르지 않습니다.',
        });
        return;
      }

      localStorage.setItem(STORAGE_KEYS.isLoggedIn, 'true');
      localStorage.setItem(STORAGE_KEYS.userNickname, account.nickname);
      localStorage.setItem(STORAGE_KEYS.userId, account.email);
      localStorage.setItem(STORAGE_KEYS.userType, account.userType);

      set({
        status: 'authenticated',
        isLoggedIn: true,
        userNickname: account.nickname,
        userId: account.email,
        userType: account.userType,
        errorMessage: null,
        isHydrated: true,
      });
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
      localStorage.removeItem(STORAGE_KEYS.userType);

      set({
        status: 'unauthenticated',
        isLoggedIn: false,
        userNickname: null,
        userId: null,
        userType: null,
        errorMessage: null,
        isHydrated: true,
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
export const useUserType = () => useAuthStore((state) => state.userType);
export const useAuthStatus = () => useAuthStore((state) => state.status);
export const useAuthError = () => useAuthStore((state) => state.errorMessage);
export const useIsLoading = () => useAuthStore((state) => state.status === 'loading');
export const useIsHydrated = () => useAuthStore((state) => state.isHydrated); 