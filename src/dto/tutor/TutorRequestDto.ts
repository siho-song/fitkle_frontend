// 튜터 관련 요청 DTO

export interface TutorSearchRequestDto {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  isOnline?: boolean;
  languages?: string[];
  specialties?: string[];
  sortBy?: 'rating' | 'price' | 'popularity' | 'newest' | 'reviews';
  sortOrder?: 'asc' | 'desc';
  location?: {
    country?: string;
    city?: string;
    region?: string;
  };
}

export interface TutorProfileCreateRequestDto {
  category: string;
  specialties: string[];
  pricePerHour: number;
  currency: string;
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
}

export interface TutorProfileUpdateRequestDto extends Partial<TutorProfileCreateRequestDto> {
  id: string;
}

export interface TutorAvailabilityUpdateRequestDto {
  tutorId: string;
  availability: {
    timezone: string;
    schedule: {
      [key: string]: string[];
    };
  };
}

export interface TutorStatusUpdateRequestDto {
  tutorId: string;
  isOnline: boolean;
}

export interface TutorPortfolioCreateRequestDto {
  tutorId: string;
  title: string;
  description: string;
  category: string;
  technologies?: string[];
  projectDate: string;
  projectUrl?: string;
  client?: string;
  images: string[]; // uploaded image URLs
}

export interface TutorPortfolioUpdateRequestDto extends Partial<TutorPortfolioCreateRequestDto> {
  id: string;
}

export interface TutorVerificationRequestDto {
  tutorId: string;
  documents: Array<{
    type: 'id' | 'certificate' | 'diploma' | 'experience';
    url: string;
    description?: string;
  }>;
}

export interface TutorReviewCreateRequestDto {
  tutorId: string;
  orderId: string;
  rating: number;
  comment: string;
  tags?: string[];
}

export interface TutorStatisticsRequestDto {
  tutorId: string;
  startDate?: string;
  endDate?: string;
  period?: 'week' | 'month' | 'year';
}