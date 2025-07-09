// 튜터 도메인 모델 및 관련 엔티티 (TypeScript)

export interface InfoItem {
  label: string;
  value: string;
  icon?: string; // Flutter IconData → string(icon명)으로 단순화
}

export interface CareerItem {
  title: string;
  startDate?: string;
  endDate?: string;
}

export interface ServiceItem {
  name: string;
}

export interface FeatureItem {
  description: string;
  icon?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  imageUrls: string[];
  serviceType?: string;
  region?: string;
  price?: number;
  duration?: string;
  year?: number;
  description?: string;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<number, number>;
  tags: string[];
}

export interface Review {
  id: string;
  reviewer: string;
  reviewerProfileImageUrl: string;
  comment: string;
  rating: number;
  date: string; // ISO string
  imageUrl?: string;
  tags: string[];
}

export interface QnaItem {
  question: string;
  answer: string;
}

export interface Tutor {
  id: string;
  name: string;
  profileImageUrl: string;
  headerImageUrl: string;
  shortIntro: string;
  descriptionTitle: string;
  descriptionText: string;
  certificateTitle: string;
  certificateImageUrls: string[];
  averageRating: number;
  totalLessons: number;
  careerYears?: number;
  statsItems: InfoItem[];
  infoItems: InfoItem[];
  portfolio: PortfolioItem[];
  reviewSummaryTitle: string;
  reviewSummary: ReviewSummary;
  reviews: Review[];
  qnaItems: QnaItem[];
  tags?: string[];
  region?: string;
  features: FeatureItem[];
  services: ServiceItem[];
  careers: CareerItem[];
  mediaUrls: string[];
}

// 튜터 프로필 폼 (profile_setup)
export interface TutorProfileForm {
  name?: string;
  shortIntro?: string;
  region?: string;
  tags: string[];
  headerImageFile?: File; // 웹에서는 File 타입 사용
  headerImageUrl?: string;
}

export function isTutorProfileFormValid(form: TutorProfileForm): boolean {
  return !!form.name && form.name.trim().length > 0 &&
    !!form.shortIntro && form.shortIntro.trim().length > 0 &&
    !!form.region && form.region.trim().length > 0;
} 