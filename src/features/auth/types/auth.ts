// 인증 상태 타입 및 enum
export type AuthStatus = 'initial' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';

export interface AuthState {
  status: AuthStatus;
  isLoggedIn: boolean;
  errorMessage?: string | null;
  userNickname?: string | null;
  userId?: string | null;
} 