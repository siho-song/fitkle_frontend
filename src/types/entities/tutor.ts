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

export interface TutorService {
  id: string;
  name: string; // 서비스 이름 (예: "보컬 레슨", "기타 레슨")
  description: string;
  duration: number; // 분 단위 (30, 50, 60 등)
  price: number; // 해당 duration에 대한 가격
  category: string;
  isActive: boolean;
}

export interface TutorStats {
  rating: number;
  reviewCount: number;
  studentCount: number;
  responseTime: number; // minutes
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
  responseTime: number; // minutes
  education: string[];
  certifications: string[];
  introduction: string;
  achievements: string[];
  portfolio: PortfolioItem[];
  availability: TutorAvailability;
  consultationGuide: string; // 상담 시 학생이 작성하면 좋은 정보에 대한 가이드
  services: TutorService[]; // 튜터가 제공하는 서비스 목록
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