// 튜터 관련 응답 DTO

export interface TutorSearchResponseDto {
  success: boolean;
  data: {
    tutors: TutorListItemDto[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
    filters: {
      categories: Array<{ name: string; count: number }>;
      priceRange: { min: number; max: number };
      languages: Array<{ name: string; count: number }>;
      specialties: Array<{ name: string; count: number }>;
    };
  };
}

export interface TutorListItemDto {
  id: string;
  userId: string;
  user: {
    nickname: string;
    avatar?: string;
  };
  category: string;
  specialties: string[];
  pricePerHour: number;
  currency: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  responseTime: string;
  isOnline: boolean;
  languages: Array<{
    language: string;
    level: string;
  }>;
  introduction: string;
  portfolioCount: number;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  badgeType?: 'new' | 'popular' | 'top' | 'verified';
  lastActive: string;
  createdAt: string;
}

export interface TutorDetailResponseDto {
  success: boolean;
  data: {
    tutor: TutorDetailDto;
    portfolio: TutorPortfolioItemDto[];
    reviews: TutorReviewDto[];
    relatedTutors: TutorListItemDto[];
  };
}

export interface TutorDetailDto {
  id: string;
  userId: string;
  user: {
    id: string;
    nickname: string;
    avatar?: string;
    email: string;
  };
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
      [key: string]: string[];
    };
  };
  introduction: string;
  achievements: string[];
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verifiedAt?: string;
  stats: {
    totalEarnings: number;
    averageSessionDuration: number;
    completionRate: number;
    responseRate: number;
    rescheduleRate: number;
  };
  location?: {
    country: string;
    city: string;
    timezone: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TutorPortfolioItemDto {
  id: string;
  tutorId: string;
  title: string;
  description: string;
  category: string;
  technologies?: string[];
  projectDate: string;
  projectUrl?: string;
  client?: string;
  images: Array<{
    id: string;
    url: string;
    alt?: string;
    order: number;
  }>;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface TutorReviewDto {
  id: string;
  tutorId: string;
  student: {
    id: string;
    nickname: string;
    avatar?: string;
  };
  orderId: string;
  rating: number;
  comment: string;
  tags?: string[];
  response?: {
    comment: string;
    createdAt: string;
  };
  helpful: number;
  reported: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TutorProfileCreateResponseDto {
  success: boolean;
  data: {
    tutorProfile: TutorDetailDto;
  };
  message?: string;
}

export interface TutorStatisticsResponseDto {
  success: boolean;
  data: {
    overview: {
      totalStudents: number;
      totalLessons: number;
      totalEarnings: number;
      averageRating: number;
      responseRate: number;
    };
    earnings: Array<{
      date: string;
      amount: number;
      lessonCount: number;
    }>;
    ratings: Array<{
      rating: number;
      count: number;
      percentage: number;
    }>;
    lessonsByCategory: Array<{
      category: string;
      count: number;
      percentage: number;
    }>;
    monthlyStats: Array<{
      month: string;
      students: number;
      lessons: number;
      earnings: number;
      rating: number;
    }>;
  };
}

export interface TutorVerificationResponseDto {
  success: boolean;
  data: {
    verificationId: string;
    status: 'pending' | 'verified' | 'rejected';
    submittedAt: string;
    reviewedAt?: string;
    feedback?: string;
  };
  message?: string;
}