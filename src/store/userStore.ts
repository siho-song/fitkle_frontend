import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  createdAt: string;
}

interface UserStore {
  user: UserInfo | null;
  isLoggedIn: boolean;
  
  // Actions
  setUser: (user: UserInfo) => void;
  updateUser: (updates: Partial<UserInfo>) => void;
  logout: () => void;
  
  // 임시로 샘플 사용자 정보 설정 (실제로는 로그인 시 설정됨)
  initializeSampleUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,

      setUser: (user) => set({
        user,
        isLoggedIn: true
      }),

      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),

      logout: () => set({
        user: null,
        isLoggedIn: false
      }),

      initializeSampleUser: () => {
        // 실제 서비스에서는 이 함수 대신 로그인 API를 통해 사용자 정보를 가져옴
        const sampleUser: UserInfo = {
          id: 'user-001',
          name: '김학생',
          email: 'student@example.com',
          phone: '010-1234-5678',
          avatar: '',
          createdAt: new Date().toISOString()
        };
        
        set({
          user: sampleUser,
          isLoggedIn: true
        });
      }
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn
      })
    }
  )
);