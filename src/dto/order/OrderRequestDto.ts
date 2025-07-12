// 주문/예약 관련 요청 DTO

export interface OrderCreateRequestDto {
  tutorId: string;
  serviceType: 'single' | 'package';
  sessionCount: number;
  pricePerSession: number;
  totalPrice: number;
  currency: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number; // minutes
  timezone: string;
  notes?: string;
  requirements?: string;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
  paymentMethod: 'card' | 'bank_transfer' | 'digital_wallet';
  paymentDetails?: any; // Payment provider specific data
}

export interface OrderUpdateRequestDto {
  orderId: string;
  scheduledDate?: string;
  scheduledTime?: string;
  notes?: string;
  requirements?: string;
}

export interface OrderCancelRequestDto {
  orderId: string;
  reason: 'schedule_conflict' | 'personal_reasons' | 'tutor_issue' | 'technical_issue' | 'other';
  description?: string;
}

export interface OrderRescheduleRequestDto {
  orderId: string;
  newDate: string;
  newTime: string;
  reason: string;
  requestedBy: 'student' | 'tutor';
}

export interface OrderConfirmRequestDto {
  orderId: string;
  action: 'accept' | 'reject';
  reason?: string;
  alternativeSlots?: Array<{
    date: string;
    time: string;
  }>;
}

export interface OrderCompleteRequestDto {
  orderId: string;
  completedBy: 'student' | 'tutor' | 'system';
  actualDuration?: number;
  notes?: string;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
}

export interface OrderReviewCreateRequestDto {
  orderId: string;
  rating: number;
  comment: string;
  tags?: string[];
  isAnonymous?: boolean;
}

export interface OrderRefundRequestDto {
  orderId: string;
  reason: 'tutor_no_show' | 'poor_quality' | 'technical_issue' | 'other';
  description: string;
  evidence?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}

export interface OrderSearchRequestDto {
  page?: number;
  limit?: number;
  status?: string[];
  tutorId?: string;
  studentId?: string;
  dateFrom?: string;
  dateTo?: string;
  serviceType?: 'single' | 'package';
  minAmount?: number;
  maxAmount?: number;
  sortBy?: 'created_date' | 'scheduled_date' | 'amount' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface OrderPaymentRequestDto {
  orderId: string;
  paymentMethodId: string;
  savePaymentMethod?: boolean;
  billingAddress?: {
    country: string;
    city: string;
    line1: string;
    line2?: string;
    postalCode: string;
  };
}

export interface OrderStatisticsRequestDto {
  userId?: string;
  tutorId?: string;
  period: 'week' | 'month' | 'quarter' | 'year';
  startDate?: string;
  endDate?: string;
}