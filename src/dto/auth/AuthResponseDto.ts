// 인증 관련 응답 DTO

export interface LoginResponseDto {
  success: boolean;
  data: {
    user: UserProfileDto;
    tokens: TokensDto;
  };
  message?: string;
}

export interface SignupResponseDto {
  success: boolean;
  data: {
    userId: string;
    email: string;
    requiresEmailVerification: boolean;
  };
  message?: string;
}

export interface TokensDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
}

export interface UserProfileDto {
  id: string;
  email: string;
  nickname: string;
  userType: 'student' | 'tutor';
  avatar?: string;
  emailVerified: boolean;
  phoneNumber?: string;
  bio?: string;
  location?: {
    country: string;
    city: string;
    region?: string;
  };
  preferences: {
    language: string;
    timezone: string;
    notifications: {
      email: boolean;
      push: boolean;
      marketing: boolean;
      lesson: boolean;
    };
  };
  stats?: {
    totalLessons: number;
    totalSpent: number;
    averageRating: number;
    reviewCount: number;
  };
  tutorProfile?: TutorProfileDto;
  createdAt: string;
  updatedAt: string;
}

export interface TutorProfileDto {
  id: string;
  userId: string;
  category: string;
  specialties: string[];
  pricePerHour: number;
  currency: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  lessonCount: number;
  responseTime: string;
  isOnline: boolean;
  experience: string;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    year: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    year: string;
    url?: string;
  }>;
  languages: Array<{
    language: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'native';
  }>;
  availability: {
    timezone: string;
    schedule: {
      [key: string]: string[]; // day: available hours
    };
  };
  introduction: string;
  achievements: string[];
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verifiedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmailVerificationResponseDto {
  success: boolean;
  message: string;
  expiresIn?: number;
}

export interface RefreshTokenResponseDto {
  success: boolean;
  data: TokensDto;
}