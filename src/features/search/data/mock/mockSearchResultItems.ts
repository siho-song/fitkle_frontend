import { TutorSearchResultItem } from '../../domain/entities/tutorSearchResultItem';

export const mockSearchResults: TutorSearchResultItem[] = [
  {
    id: '1',
    name: '김보컬',
    rating: 4.8,
    ratingCount: 70,
    employmentCount: 150,
    careerYears: 5,
    description: '압도적인 실력으로 증명하는 보컬 레슨',
    profileImageUrl: '/assets/tutor/mock.png',
  },
  {
    id: '2',
    name: '허병철',
    rating: 4.6,
    ratingCount: 70,
    employmentCount: 112,
    careerYears: 9,
    description: '공개 아키텍쳐 필수 분석',
    profileImageUrl: '/assets/tutor/mock.png',
  },
  // ... (중략, 100개 전체 변환 필요)
]; 