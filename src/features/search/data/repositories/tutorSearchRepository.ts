import { TutorSearchParams } from '../../domain/entities/tutorSearchParams';
import { TutorSearchResultItem } from '../../domain/entities/tutorSearchResultItem';
import { mockSearchResults } from '../mock/mockSearchResultItems';

export interface TutorSearchPagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasNext: boolean;
}

export interface TutorSearchResponseDto {
  data: TutorSearchResultItem[];
  pagination: TutorSearchPagination;
}

export async function searchTutors(
  params: TutorSearchParams
): Promise<TutorSearchResponseDto> {
  // 네트워크 지연 시뮬레이션
  await new Promise((res) => setTimeout(res, 500));
  return getMockResponse(params);
}

function getMockResponse(params: TutorSearchParams): TutorSearchResponseDto {
  const allMockData = mockSearchResults.map((item) => ({
    ...item,
    profileImageUrl: `https://picsum.photos/200/300?random=${item.id}`,
  }));

  let filteredData = allMockData;
  if (params.category) {
    // 카테고리 필터링 로직 (필요시 구현)
  }
  if (params.query) {
    filteredData = filteredData.filter(
      (item) =>
        item.name.includes(params.query!) ||
        item.description.includes(params.query!)
    );
  }
  switch (params.sortBy) {
    case '리뷰 많은 순':
      filteredData.sort((a, b) => b.ratingCount - a.ratingCount);
      break;
    case '평점 높은 순':
      filteredData.sort((a, b) => b.rating - a.rating);
      break;
    case '경력 많은 순':
      filteredData.sort((a, b) => b.careerYears - a.careerYears);
      break;
  }
  const startIndex = (params.page - 1) * params.pageSize;
  const endIndex = startIndex + params.pageSize;
  const pagedData =
    startIndex >= filteredData.length
      ? []
      : filteredData.slice(startIndex, endIndex);
  return {
    data: pagedData,
    pagination: {
      currentPage: params.page,
      totalPages: Math.ceil(filteredData.length / params.pageSize),
      totalCount: filteredData.length,
      pageSize: params.pageSize,
      hasNext: params.page < Math.ceil(filteredData.length / params.pageSize),
    },
  };
} 