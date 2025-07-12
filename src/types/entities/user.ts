// 사용자 관련 타입 정의

export type UserType = 'student' | 'tutor' | 'admin';

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  type: UserType;
  createdAt: string;
  updatedAt: string;
}

export interface TestAccount {
  email: string;
  password: string;
  name: string;
  type: UserType;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  status: AuthStatus;
  token?: string;
}

// 사용자 프로필 관련
export interface UserProfile extends User {
  phone?: string;
  birthday?: string;
  bio?: string;
  location?: string;
  socialLinks?: SocialLinks;
  preferences?: UserPreferences;
}

export interface SocialLinks {
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
}

export interface UserPreferences {
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  theme: 'light' | 'dark' | 'system';
  language: string;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
  orderUpdates: boolean;
  chatMessages: boolean;
  reviewReminders: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  showEmail: boolean;
  showPhone: boolean;
  allowMessages: boolean;
}