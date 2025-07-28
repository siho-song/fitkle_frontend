// 튜터 관련 타입 정의
import { Category } from '@/constants/categories';

// 학력 정보
export interface Education {
  id: string;
  tutorId: string;
  institution: string;        // 학교명
  degree: string;            // 학위 (학사, 석사, 박사)
  major: string;             // 전공
  graduationYear: string;    // 졸업년도
  status: 'graduated' | 'attending' | 'dropped';
  createdAt: string;
  updatedAt: string;
}

// 자격증 정보
export interface Certification {
  id: string;
  tutorId: string;
  name: string;              // 자격증명
  issuer: string;            // 발급기관
  issuedDate: string;        // 취득일
  expiryDate?: string;       // 만료일 (없으면 영구)
  credentialId?: string;     // 자격증 번호
  verificationUrl?: string;  // 검증 URL
  createdAt: string;
  updatedAt: string;
}

// 수상 내역
export interface Award {
  id: string;
  tutorId: string;
  title: string;             // 수상명
  organization: string;      // 수상기관
  awardDate: string;         // 수상일
  description?: string;      // 상세 설명
  rank?: string;            // 순위 (1등, 2등, 우수상 등)
  createdAt: string;
  updatedAt: string;
}

// 경력 사항
export interface WorkExperience {
  id: string;
  tutorId: string;
  company: string;           // 회사명
  position: string;          // 직책
  startDate: string;         // 시작일
  endDate?: string;          // 종료일 (현재 재직중이면 null)
  description: string;       // 업무 내용
  achievements?: string[];   // 주요 성과
  createdAt: string;
  updatedAt: string;
}

// 포트폴리오 미디어 객체 (사진 또는 동영상)
export interface PortfolioMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  description: string;
  thumbnail?: string; // 동영상의 경우 썸네일 URL
}

// 새로운 포트폴리오 객체 구조
export interface Portfolio {
  id: string;
  tutorId: string; // 포트폴리오를 소유한 튜터의 ID
  title: string;
  content: string; // 상세 내용/설명
  period: string; // 프로젝트 기간
  media: PortfolioMedia[]; // 사진 또는 동영상들
  createdAt: string;
  updatedAt: string;
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
  category: Category;
  specialties: string[];
  rating: number;
  reviewCount: number;
  studentCount: number;
  experience: string;
  pricePerHour: number;
  description: string;
  tags: string[];
  responseTime: number; // minutes
  education: Education[];
  certifications: Certification[];
  awards: Award[];
  workExperience: WorkExperience[];
  introduction: string;
  portfolio: Portfolio[]; // 새로운 Portfolio 구조 사용
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