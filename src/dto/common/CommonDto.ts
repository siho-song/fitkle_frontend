// 공통 DTO 및 기본 응답 구조

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: ApiError[];
  timestamp: string;
  path: string;
  method: string;
  statusCode: number;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: {
    items: T[];
    pagination: PaginationDto;
  };
  message?: string;
  timestamp: string;
}

export interface PaginationDto {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage?: number;
  prevPage?: number;
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
  details?: any;
}

export interface ValidationError {
  field: string;
  code: string;
  message: string;
  value?: any;
}

export interface FileUploadDto {
  file: File;
  category: 'avatar' | 'portfolio' | 'chat' | 'post' | 'document';
  isPublic?: boolean;
  metadata?: {
    alt?: string;
    description?: string;
    tags?: string[];
  };
}

export interface FileResponseDto {
  id: string;
  name: string;
  originalName: string;
  url: string;
  thumbnailUrl?: string;
  type: string;
  size: number;
  category: string;
  isPublic: boolean;
  metadata?: any;
  uploadedBy: string;
  uploadedAt: string;
}

export interface LocationDto {
  country: string;
  countryCode: string;
  city: string;
  region?: string;
  timezone: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface HealthCheckResponseDto {
  success: boolean;
  data: {
    status: 'healthy' | 'unhealthy';
    timestamp: string;
    uptime: number;
    version: string;
    environment: string;
    services: {
      database: 'healthy' | 'unhealthy';
      redis: 'healthy' | 'unhealthy';
      storage: 'healthy' | 'unhealthy';
      email: 'healthy' | 'unhealthy';
      payment: 'healthy' | 'unhealthy';
    };
  };
}

export interface NotificationDto {
  id: string;
  userId: string;
  type: 'order' | 'message' | 'review' | 'system' | 'marketing';
  title: string;
  content: string;
  data?: any;
  channels: Array<'push' | 'email' | 'sms' | 'in_app'>;
  isRead: boolean;
  readAt?: string;
  actionUrl?: string;
  actionLabel?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  expiresAt?: string;
  createdAt: string;
}

export interface NotificationPreferencesDto {
  userId: string;
  preferences: {
    email: {
      enabled: boolean;
      types: string[];
      frequency: 'immediate' | 'daily' | 'weekly';
    };
    push: {
      enabled: boolean;
      types: string[];
      quietHours?: {
        start: string;
        end: string;
        timezone: string;
      };
    };
    sms: {
      enabled: boolean;
      types: string[];
      phoneNumber?: string;
    };
    inApp: {
      enabled: boolean;
      types: string[];
      showPreview: boolean;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface SearchFiltersDto {
  categories: Array<{
    name: string;
    count: number;
    subcategories?: Array<{
      name: string;
      count: number;
    }>;
  }>;
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  ratings: Array<{
    rating: number;
    count: number;
  }>;
  locations: Array<{
    country: string;
    count: number;
    cities: Array<{
      name: string;
      count: number;
    }>;
  }>;
  languages: Array<{
    name: string;
    count: number;
  }>;
  tags: Array<{
    name: string;
    count: number;
  }>;
}

export interface MetricsDto {
  name: string;
  value: number;
  unit?: string;
  trend?: {
    direction: 'up' | 'down' | 'stable';
    percentage: number;
    period: string;
  };
  target?: number;
  status?: 'good' | 'warning' | 'critical';
}

export interface AuditLogDto {
  id: string;
  userId: string;
  userNickname: string;
  action: string;
  resource: string;
  resourceId: string;
  details?: any;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}

export interface RateLimitDto {
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}