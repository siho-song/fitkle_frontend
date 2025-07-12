// src/constants/routes.ts
// 라우트 경로 상수 및 동적 경로 함수

export const ROUTES = {
  HOME: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  PROFILE_MANAGE: '/profile/manage',
  PROFILE_EDIT: '/profile/edit',
  PROFILE_USER: '/profile/user',
  TUTOR_DETAIL: (id = ':id') => `/tutor/${id}`,
  COMMUNITY: '/community',
  WRITE_POST: '/post/write',
  POST_DETAIL: (id = ':id') => `/post/${id}`,
  FAVORITES: '/favorites',
  FRIEND_INVITE: '/friend-invite',
  CUSTOMER_CENTER: '/customer-center',
  NOTIFICATION_SETTINGS: '/notification-settings',
  MY_POSTS: '/my-posts',
  // 필요시 추가
  // MESSAGE: '/message',
  // PRODUCT_SEARCH: '/search/products',
  // RECOMMENDATION_COMPLETE: '/recommendation-complete',
  // SERVICE_RECOMMENDATION_SURVEY: '/service-recommendation-survey',
  // ...
}; 