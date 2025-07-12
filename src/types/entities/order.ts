// 주문 관련 타입 정의

export type OrderStatus = 
  | 'pending'     // 결제 대기
  | 'paid'        // 결제 완료
  | 'confirmed'   // 튜터 확인
  | 'in_progress' // 진행 중
  | 'completed'   // 완료
  | 'cancelled'   // 취소
  | 'refunded';   // 환불

export type OrderType = 'lesson' | 'consultation' | 'project' | 'mentoring';

export interface OrderItem {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  studentId: string;
  studentName: string;
  type: OrderType;
  title: string;
  description: string;
  category: string;
  categoryEmoji: string;
  price: number;
  duration: number; // minutes
  scheduledDate: string;
  scheduledTime: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  
  // 결제 정보
  paymentId?: string;
  paymentMethod?: string;
  
  // 리뷰 정보
  reviewId?: string;
  isReviewed: boolean;
  
  // 진행 상황
  progress?: number; // 0-100
  notes?: string;
  
  // 파일 첨부
  attachments?: OrderAttachment[];
}

export interface OrderAttachment {
  id: string;
  orderId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: string;
}

// 주문 필터링
export interface OrderFilters {
  status?: OrderStatus | 'all';
  type?: OrderType | 'all';
  category?: string | 'all';
  dateRange?: {
    start: string;
    end: string;
  };
  sortBy?: 'latest' | 'oldest' | 'price_high' | 'price_low';
}

// 주문 생성 요청
export interface CreateOrderRequest {
  tutorId: string;
  type: OrderType;
  title: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number;
  notes?: string;
}

// 주문 리뷰
export interface OrderReview {
  id: string;
  orderId: string;
  tutorId: string;
  studentId: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
  isPublic: boolean;
}

// 주문 통계
export interface OrderStats {
  totalOrders: number;
  completedOrders: number;
  totalSpent: number;
  averageRating: number;
  favoriteCategory: string;
}