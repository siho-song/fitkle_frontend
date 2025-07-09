// src/constants/routes.ts
// 라우트 경로 상수 및 동적 경로 함수

export const ROUTES = {
  HOME: '/',
  SEARCH: '/search',
  SIGNUP: '/signup',
  LOGIN: '/login',
  PROFILE_MANAGE: (nickname = ':nickname') => `/profile/${nickname}`,
  PROFILE_EDIT: '/profile/edit',
  TUTOR_DETAIL: (id = ':id') => `/tutor/${id}`,
  // 필요시 추가
  // MESSAGE: '/message',
  // PRODUCT_SEARCH: '/search/products',
  // RECOMMENDATION_COMPLETE: '/recommendation-complete',
  // SERVICE_RECOMMENDATION_SURVEY: '/service-recommendation-survey',
  // ...
}; 