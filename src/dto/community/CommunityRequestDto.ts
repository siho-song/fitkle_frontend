// 커뮤니티 관련 요청 DTO

export interface CommunityPostSearchRequestDto {
  page?: number;
  limit?: number;
  category?: string;
  postType?: 'question' | 'tip' | 'review' | 'discussion';
  search?: string;
  tags?: string[];
  expertOnly?: boolean;
  hasAnswer?: boolean;
  sortBy?: 'newest' | 'popular' | 'trending' | 'views' | 'likes';
  period?: 'today' | 'week' | 'month' | 'year' | 'all';
  authorId?: string;
}

export interface CommunityPostCreateRequestDto {
  title: string;
  content: string;
  category: string;
  postType: 'question' | 'tip' | 'review' | 'discussion';
  tags: string[];
  images?: string[];
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
  isAnonymous?: boolean;
  allowComments?: boolean;
}

export interface CommunityPostUpdateRequestDto extends Partial<CommunityPostCreateRequestDto> {
  id: string;
}

export interface CommunityCommentCreateRequestDto {
  postId: string;
  content: string;
  parentCommentId?: string;
  images?: string[];
  isExpertAnswer?: boolean;
}

export interface CommunityCommentUpdateRequestDto {
  id: string;
  content: string;
  images?: string[];
}

export interface CommunityPostInteractionRequestDto {
  postId: string;
  action: 'like' | 'unlike' | 'bookmark' | 'unbookmark' | 'view' | 'share';
}

export interface CommunityCommentInteractionRequestDto {
  commentId: string;
  action: 'like' | 'unlike' | 'helpful' | 'unhelpful';
}

export interface CommunityReportRequestDto {
  targetType: 'post' | 'comment';
  targetId: string;
  reason: 'spam' | 'inappropriate' | 'harassment' | 'misinformation' | 'other';
  description?: string;
}

export interface CommunityPostMarkAnswerRequestDto {
  postId: string;
  commentId: string;
}

export interface CommunityTrendingRequestDto {
  category?: string;
  period?: 'today' | 'week' | 'month';
  limit?: number;
}

export interface CommunityUserStatsRequestDto {
  userId: string;
  period?: 'week' | 'month' | 'year' | 'all';
}

export interface CommunityModerationRequestDto {
  targetType: 'post' | 'comment';
  targetId: string;
  action: 'approve' | 'reject' | 'hide' | 'delete' | 'feature';
  reason?: string;
  notes?: string;
}