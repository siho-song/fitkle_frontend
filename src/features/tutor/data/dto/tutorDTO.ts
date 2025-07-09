// 튜터 관련 DTO 타입 정의
export interface InfoItemDTO {
  label: string;
  value: string;
  icon?: string;
}

export interface ServiceItemDTO {
  name: string;
}

export interface FeatureItemDTO {
  icon: string;
  description: string;
}

export interface CareerItemDTO {
  title: string;
  startDate?: string;
  endDate?: string;
}

export interface ReviewSummaryDTO {
  ratingDistribution: Record<string, number>;
  tags: string[];
}

export interface PortfolioItemDTO {
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

export interface TutorDTO {
  id: string;
  name: string;
  profileImageUrl: string;
  shortIntro: string;
  averageRating?: number;
  totalLessons?: number;
  careerYears?: number;
  tags?: string[];
  region?: string;
  availability?: string;
  features?: FeatureItemDTO[];
  descriptionText?: string;
  services?: ServiceItemDTO[];
  careers?: CareerItemDTO[];
  portfolio?: PortfolioItemDTO[];
  qnaList?: Array<{ question: string; answer: string }>;
  reviews?: Array<Record<string, unknown>>;
  reviewSummary?: ReviewSummaryDTO;
  statsItems?: InfoItemDTO[];
  infoItems?: InfoItemDTO[];
  descriptionTitle?: string;
  certificateTitle?: string;
  certificateImageUrls?: string[];
} 