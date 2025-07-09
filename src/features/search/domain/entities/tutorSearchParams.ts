export interface TutorSearchParams {
  page: number;
  pageSize: number;
  category?: string;
  query?: string;
  sortBy?: '리뷰 많은 순' | '평점 높은 순' | '경력 많은 순';
} 