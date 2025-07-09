import { TutorSearchItemDto, TutorSearchResponseDto } from './tutorSearchResponseDto';

export interface TutorSearchResultItem {
  id: string;
  name: string;
  rating: number;
  ratingCount: number;
  employmentCount: number;
  careerYears: number;
  description: string;
  profileImageUrl: string;
}

export function mapTutorSearchItemDtoToModel(dto: TutorSearchItemDto): TutorSearchResultItem {
  return {
    id: dto.id,
    name: dto.name,
    rating: dto.rating,
    ratingCount: dto.ratingCount,
    employmentCount: dto.employmentCount,
    careerYears: dto.careerYears,
    description: dto.description,
    profileImageUrl: dto.profileImageUrl,
  };
}

export function mapTutorSearchResponseDtoToModelList(dto: TutorSearchResponseDto): TutorSearchResultItem[] {
  return dto.data.map(mapTutorSearchItemDtoToModel);
} 