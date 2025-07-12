// 튜터 관련 타입 정의

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  technologies?: string[];
  projectDate: string;
  projectUrl?: string;
  client?: string;
}

export interface TutorAvailability {
  [key: string]: string[]; // 요일별 가능 시간
}

export interface TutorStats {
  rating: number;
  reviewCount: number;
  studentCount: number;
  responseTime: string;
}

export interface TutorItem {
  id: string;
  name: string;
  avatar: string;
  category: string;
  categoryEmoji: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  studentCount: number;
  experience: string;
  pricePerHour: number;
  description: string;
  tags: string[];
  isOnline: boolean;
  responseTime: string;
  languages: string[];
  education: string[];
  certifications: string[];
  introduction: string;
  achievements: string[];
  portfolio: PortfolioItem[];
  availability: TutorAvailability;
}

export interface TutorSearchParams {
  query?: string;
  category?: string;
  priceRange?: [number, number];
  rating?: number;
  isOnline?: boolean;
  sortBy?: 'popular' | 'rating' | 'price_low' | 'price_high' | 'newest';
}

export interface TutorFilters extends TutorSearchParams {
  page?: number;
  limit?: number;
}

// 튜터 관련 추가 타입들
export interface TutorReview {
  id: string;
  tutorId: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
  isVerified: boolean;
  helpfulCount: number;
  course?: string;
}

export interface TutorBooking {
  id: string;
  tutorId: string;
  studentId: string;
  date: string;
  timeSlot: string;
  duration: number; // minutes
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  price: number;
  subject: string;
  notes?: string;
  createdAt: string;
}

// 즐겨찾기 튜터
export interface FavoriteTutor {
  id: string;
  tutorId: string;
  userId: string;
  addedAt: string;
}