import { TutorDTO, InfoItemDTO, PortfolioItemDTO, ReviewSummaryDTO, FeatureItemDTO, ServiceItemDTO, CareerItemDTO } from './tutorDTO';

// 도메인 모델 타입(실제 프로젝트에 맞게 확장 가능)
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
  statsItems: InfoItemDTO[];
  infoItems: InfoItemDTO[];
  portfolio: PortfolioItemDTO[];
  reviewSummaryTitle: string;
  reviews: unknown[];
  qnaItems: Array<{ question: string; answer: string }>;
  tags?: string[];
  region?: string;
  features: FeatureItemDTO[];
  services: ServiceItemDTO[];
  careers: CareerItemDTO[];
  mediaUrls: string[];
  reviewSummary: ReviewSummaryDTO;
}

export function mapTutorDTOToModel(dto: TutorDTO): Tutor {
  return {
    id: dto.id,
    name: dto.name,
    profileImageUrl: dto.profileImageUrl,
    headerImageUrl: dto.portfolio && dto.portfolio.length > 0 && dto.portfolio[0].imageUrls.length > 0
      ? dto.portfolio[0].imageUrls[0]
      : 'https://picsum.photos/seed/default/800/400',
    shortIntro: dto.shortIntro,
    descriptionTitle: dto.descriptionTitle ?? '서비스 상세 설명',
    descriptionText: dto.descriptionText ?? '상세 설명이 없습니다.',
    certificateTitle: dto.certificateTitle ?? '자격증 및 기타 서류',
    certificateImageUrls: dto.certificateImageUrls ?? [],
    averageRating: dto.averageRating ?? 0,
    totalLessons: dto.totalLessons ?? 0,
    careerYears: dto.careerYears,
    statsItems: dto.statsItems ?? [],
    infoItems: dto.infoItems ?? [],
    portfolio: dto.portfolio ?? [],
    reviewSummaryTitle: `리뷰 ${dto.reviews?.length ?? 0}개`,
    reviews: dto.reviews ?? [],
    qnaItems: dto.qnaList ?? [],
    tags: dto.tags,
    region: dto.region,
    features: dto.features ?? [],
    services: dto.services ?? [],
    careers: dto.careers ?? [],
    mediaUrls: dto.certificateImageUrls ?? [],
    reviewSummary: dto.reviewSummary ?? { ratingDistribution: {}, tags: [] },
  };
} 