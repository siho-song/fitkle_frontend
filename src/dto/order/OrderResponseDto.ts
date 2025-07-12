// 주문/예약 관련 응답 DTO

export interface OrderSearchResponseDto {
  success: boolean;
  data: {
    orders: OrderListItemDto[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
    summary: {
      totalOrders: number;
      totalAmount: number;
      averageAmount: number;
      statusCounts: Array<{
        status: string;
        count: number;
      }>;
    };
  };
}

export interface OrderListItemDto {
  id: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'refunded';
  tutor: {
    id: string;
    nickname: string;
    avatar?: string;
    category: string;
    rating: number;
  };
  student: {
    id: string;
    nickname: string;
    avatar?: string;
  };
  service: {
    type: 'single' | 'package';
    title: string;
    sessionCount: number;
    completedSessions: number;
  };
  pricing: {
    pricePerSession: number;
    totalPrice: number;
    currency: string;
    discountAmount?: number;
    finalAmount: number;
  };
  schedule: {
    scheduledDate: string;
    scheduledTime: string;
    duration: number;
    timezone: string;
  };
  payment: {
    status: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';
    method: string;
    paidAt?: string;
  };
  hasReview: boolean;
  canCancel: boolean;
  canReschedule: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDetailResponseDto {
  success: boolean;
  data: {
    order: OrderDetailDto;
    sessions: OrderSessionDto[];
    messages: OrderMessageDto[];
    reviews: OrderReviewDto[];
  };
}

export interface OrderDetailDto {
  id: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'refunded';
  tutor: {
    id: string;
    nickname: string;
    avatar?: string;
    category: string;
    rating: number;
    responseTime: string;
    location?: {
      country: string;
      city: string;
      timezone: string;
    };
  };
  student: {
    id: string;
    nickname: string;
    avatar?: string;
    timezone: string;
  };
  service: {
    type: 'single' | 'package';
    title: string;
    description: string;
    sessionCount: number;
    completedSessions: number;
    remainingSessions: number;
  };
  pricing: {
    pricePerSession: number;
    totalPrice: number;
    currency: string;
    discountAmount?: number;
    finalAmount: number;
    taxAmount?: number;
    fees?: Array<{
      type: string;
      amount: number;
      description: string;
    }>;
  };
  schedule: {
    scheduledDate: string;
    scheduledTime: string;
    duration: number;
    timezone: string;
    endTime: string;
  };
  payment: {
    status: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';
    method: string;
    transactionId?: string;
    paidAt?: string;
    refundedAt?: string;
    refundAmount?: number;
  };
  requirements: string;
  notes: string;
  attachments: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
    uploadedBy: string;
    uploadedAt: string;
  }>;
  timeline: Array<{
    type: 'created' | 'confirmed' | 'started' | 'completed' | 'cancelled' | 'rescheduled' | 'payment';
    description: string;
    details?: any;
    createdAt: string;
    createdBy?: string;
  }>;
  cancellation?: {
    reason: string;
    description: string;
    cancelledBy: string;
    cancelledAt: string;
    refundAmount?: number;
  };
  reschedule?: {
    requestedBy: string;
    reason: string;
    originalDate: string;
    originalTime: string;
    newDate: string;
    newTime: string;
    status: 'pending' | 'approved' | 'rejected';
    requestedAt: string;
    respondedAt?: string;
  };
  canCancel: boolean;
  canReschedule: boolean;
  canReview: boolean;
  canRefund: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderSessionDto {
  id: string;
  orderId: string;
  sessionNumber: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  scheduledDate: string;
  scheduledTime: string;
  duration: number;
  actualStartTime?: string;
  actualEndTime?: string;
  actualDuration?: number;
  notes?: string;
  attachments: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    uploadedBy: string;
    uploadedAt: string;
  }>;
  feedback?: {
    studentFeedback?: string;
    tutorFeedback?: string;
    rating?: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface OrderMessageDto {
  id: string;
  orderId: string;
  sender: {
    id: string;
    nickname: string;
    avatar?: string;
    type: 'student' | 'tutor' | 'system';
  };
  content: string;
  type: 'text' | 'system' | 'file' | 'image';
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}

export interface OrderReviewDto {
  id: string;
  orderId: string;
  reviewer: {
    id: string;
    nickname: string;
    avatar?: string;
    type: 'student' | 'tutor';
  };
  rating: number;
  comment: string;
  tags: string[];
  isAnonymous: boolean;
  response?: {
    comment: string;
    createdAt: string;
  };
  helpful: number;
  reported: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderCreateResponseDto {
  success: boolean;
  data: {
    order: OrderDetailDto;
    paymentIntent?: {
      clientSecret: string;
      paymentIntentId: string;
    };
  };
  message?: string;
}

export interface OrderStatisticsResponseDto {
  success: boolean;
  data: {
    overview: {
      totalOrders: number;
      totalAmount: number;
      averageOrderValue: number;
      completionRate: number;
      cancellationRate: number;
    };
    byStatus: Array<{
      status: string;
      count: number;
      percentage: number;
      amount: number;
    }>;
    byPeriod: Array<{
      period: string;
      orders: number;
      amount: number;
      completionRate: number;
    }>;
    byCategory: Array<{
      category: string;
      orders: number;
      amount: number;
      percentage: number;
    }>;
    trends: {
      ordersGrowth: number;
      revenueGrowth: number;
      completionRateChange: number;
    };
  };
}

export interface OrderPaymentResponseDto {
  success: boolean;
  data: {
    paymentStatus: 'succeeded' | 'failed' | 'pending';
    transactionId?: string;
    order: OrderDetailDto;
  };
  message?: string;
}

export interface OrderRefundResponseDto {
  success: boolean;
  data: {
    refundId: string;
    amount: number;
    status: 'pending' | 'succeeded' | 'failed';
    estimatedArrival?: string;
  };
  message?: string;
}