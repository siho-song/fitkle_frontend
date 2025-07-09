export interface TutorSearchItemDto {
  id: string;
  name: string;
  rating: number;
  ratingCount: number;
  employmentCount: number;
  careerYears: number;
  description: string;
  profileImageUrl: string;
}

export interface PaginationDto {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasNext: boolean;
}

export interface TutorSearchResponseDto {
  data: TutorSearchItemDto[];
  pagination: PaginationDto;
}

export function parseTutorSearchResponseDto(json: unknown): TutorSearchResponseDto {
  return {
    data: (json as { data: unknown[] }).data.map((item: unknown) => parseTutorSearchItemDto(item)),
    pagination: parsePaginationDto((json as Record<string, unknown>)?.pagination),
  };
}

export function parseTutorSearchItemDto(json: unknown): TutorSearchItemDto {
  return {
    id: (json as Record<string, unknown>)?.id as string,
    name: (json as Record<string, unknown>)?.name as string,
    rating: Number((json as Record<string, unknown>)?.rating),
    ratingCount: Number((json as Record<string, unknown>)?.rating_count),
    employmentCount: Number((json as Record<string, unknown>)?.employment_count),
    careerYears: Number((json as Record<string, unknown>)?.career_years),
    description: (json as Record<string, unknown>)?.description as string,
    profileImageUrl: (json as Record<string, unknown>)?.profile_image_url as string,
  };
}

export function parsePaginationDto(json: unknown): PaginationDto {
  return {
    currentPage: Number((json as Record<string, unknown>)?.current_page),
    totalPages: Number((json as Record<string, unknown>)?.total_pages),
    totalCount: Number((json as Record<string, unknown>)?.total_count),
    pageSize: Number((json as Record<string, unknown>)?.page_size),
    hasNext: Boolean((json as Record<string, unknown>)?.has_next),
  };
} 