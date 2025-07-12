// 중앙화된 타입을 re-export (하위 호환성 유지)
export type { 
  AuthStatus, 
  UserType, 
  TestAccount, 
  AuthState,
  User,
  UserProfile 
} from '@/types';

// 레거시 타입 별칭 (점진적 마이그레이션을 위해)
export type { UserType as UserTypeAlias } from '@/types';