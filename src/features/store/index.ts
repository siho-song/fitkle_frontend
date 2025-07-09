// ========================================
// 🚀 Zustand Stores 통합 Export
// ========================================

// Core Stores
export * from '../auth/store/authStore';
export * from '../app/store/appStore';
// 필요시 추가: export * from '../cursor/store/cursorStore';

// ========================================
// 📋 Store 사용 가이드 (예시)
// ========================================
/*
사용법:

1. 훅 import:
import { useAuthStore, useAppStore } from '@/features/store';

2. 셀렉터 사용:
const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
const themeMode = useAppStore((s) => s.themeMode);

3. 상태 변경:
const login = useAuthStore((s) => s.login);
login({ nickname: '사용자' });

4. 성능 최적화:
const userNickname = useAuthStore((s) => s.userNickname);
*/ 