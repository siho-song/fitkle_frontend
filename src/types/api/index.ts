// API 관련 타입들

// 기본 API 응답 타입
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// 페이지네이션 응답
export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  message?: string;
  error?: string;
}

// 에러 응답
export interface ApiError {
  success: false;
  error: string;
  message?: string;
  code?: string;
  details?: any;
}

// 인증 관련 API
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    type: 'student' | 'tutor';
    avatar?: string;
  };
  token: string;
  refreshToken: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  type: 'student' | 'tutor';
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeMarketing?: boolean;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// 튜터 관련 API
export interface TutorsSearchRequest {
  query?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  isOnline?: boolean;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export interface TutorReviewsRequest {
  tutorId: string;
  page?: number;
  limit?: number;
  sortBy?: 'latest' | 'rating_high' | 'rating_low';
}

export interface CreateReviewRequest {
  tutorId: string;
  orderId: string;
  rating: number;
  title: string;
  content: string;
  isPublic: boolean;
}

// 커뮤니티 관련 API
export interface PostsListRequest {
  category?: string;
  authorType?: string;
  isResolved?: boolean;
  sortBy?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  category: string;
  tags: string[];
}

export interface CreateCommentRequest {
  postId: string;
  content: string;
  parentId?: string;
}

// 주문 관련 API
export interface OrdersListRequest {
  status?: string;
  type?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export interface CreateOrderRequest {
  tutorId: string;
  type: 'lesson' | 'consultation' | 'project' | 'mentoring';
  title: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number;
  notes?: string;
}

export interface UpdateOrderRequest {
  orderId: string;
  status?: string;
  notes?: string;
  progress?: number;
}

// 채팅 관련 API
export interface ChatRoomsListRequest {
  status?: string;
  type?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface SendMessageRequest {
  chatRoomId: string;
  content: string;
  type?: 'text' | 'image' | 'file';
  replyTo?: string;
}

export interface ChatMessagesRequest {
  chatRoomId: string;
  page?: number;
  limit?: number;
  before?: string; // message id
}

// 파일 업로드
export interface FileUploadResponse {
  fileName: string;
  fileUrl: string;
  fileSize: number;
  contentType: string;
}

export interface UploadImageRequest {
  file: File;
  category?: 'avatar' | 'portfolio' | 'chat' | 'post';
}

// WebSocket 관련
export interface WebSocketMessage {
  type: 'message' | 'typing' | 'read' | 'join' | 'leave';
  data: any;
  timestamp: string;
}

export interface TypingIndicator {
  userId: string;
  userName: string;
  chatRoomId: string;
  isTyping: boolean;
}