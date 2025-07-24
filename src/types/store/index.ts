// 스토어 관련 타입들

import {
  TutorItem,
  CommunityPost,
  CommunityComment,
  UserInteraction,
  OrderItem,
  FavoriteTutor,
  FavoritePost,
  AuthState,
  NotificationSettings
} from '../entities';

// 공통 스토어 인터페이스
export interface BaseStore {
  isLoading: boolean;
  error: string | null;
}

// 튜터 스토어
export interface TutorsStore extends BaseStore {
  tutors: TutorItem[];
  searchQuery: string;
  categoryFilter: string;
  priceRange: [number, number];
  ratingFilter: number;
  sortBy: 'popular' | 'rating' | 'price_low' | 'price_high' | 'newest';
  onlineOnly: boolean;
  
  // 액션들
  addTutor: (tutor: TutorItem) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setRatingFilter: (rating: number) => void;
  setSortBy: (sort: 'popular' | 'rating' | 'price_low' | 'price_high' | 'newest') => void;
  setOnlineOnly: (online: boolean) => void;
  clearFilters: () => void;
  
  // 계산된 속성들
  filteredTutors: TutorItem[];
  categories: string[];
}

// 커뮤니티 스토어
export interface CommunityStore extends BaseStore {
  posts: CommunityPost[];
  comments: { [postId: string]: CommunityComment[] };
  interactions: UserInteraction[];
  currentUserId: string | null;
  
  // 액션들
  addPost: (post: CommunityPost) => void;
  updatePost: (postId: string, updates: Partial<CommunityPost>) => void;
  deletePost: (postId: string) => void;
  addComment: (comment: CommunityComment) => void;
  updateComment: (commentId: string, updates: Partial<CommunityComment>) => void;
  deleteComment: (commentId: string) => void;
  toggleLike: (itemId: string, type: 'post' | 'comment') => void;
  toggleBookmark: (postId: string) => void;
  addView: (postId: string) => void;
  
  // 헬퍼 함수들
  getPost: (postId: string) => CommunityPost | undefined;
  getPostComments: (postId: string) => CommunityComment[];
  isLiked: (itemId: string, type: 'post' | 'comment') => boolean;
  isBookmarked: (postId: string) => boolean;
}

// 주문 스토어
export interface OrdersStore extends BaseStore {
  orders: OrderItem[];
  
  // 액션들
  addOrder: (order: OrderItem) => void;
  updateOrder: (orderId: string, updates: Partial<OrderItem>) => void;
  removeOrder: (orderId: string) => void;
  
  // 헬퍼 함수들
  getOrdersByStatus: (status: string) => OrderItem[];
  getOrderById: (orderId: string) => OrderItem | undefined;
}

// 즐겨찾기 스토어
export interface FavoritesStore extends BaseStore {
  favoriteTutors: FavoriteTutor[];
  favoritePosts: FavoritePost[];
  
  // 액션들
  addFavoriteTutor: (tutor: TutorItem) => void;
  removeFavoriteTutor: (tutorId: string) => void;
  addFavoritePost: (post: CommunityPost) => void;
  removeFavoritePost: (postId: string) => void;
  
  // 헬퍼 함수들
  isFavoriteTutor: (tutorId: string) => boolean;
  isFavoritePost: (postId: string) => boolean;
}

// 인증 스토어
export interface AuthStore extends AuthState {
  // 액션들
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, name: string, type: 'student' | 'tutor') => Promise<void>;
  updateProfile: (updates: Partial<AuthState['user']>) => void;
  hydrate: () => void;
}

// 앱 스토어
export interface AppStore extends BaseStore {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notificationSettings: NotificationSettings;
  
  // 액션들
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: string) => void;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
}