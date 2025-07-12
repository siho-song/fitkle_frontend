// 커뮤니티 관련 응답 DTO

export interface CommunityPostSearchResponseDto {
  success: boolean;
  data: {
    posts: CommunityPostListItemDto[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
    filters: {
      categories: Array<{ name: string; count: number }>;
      postTypes: Array<{ type: string; count: number }>;
      tags: Array<{ name: string; count: number }>;
    };
  };
}

export interface CommunityPostListItemDto {
  id: string;
  title: string;
  content: string;
  contentPreview: string;
  category: string;
  postType: 'question' | 'tip' | 'review' | 'discussion';
  tags: string[];
  author: {
    id: string;
    nickname: string;
    avatar?: string;
    isExpert: boolean;
    expertBadge?: {
      title: string;
      verifiedAt: string;
      category: string;
    };
    isAnonymous: boolean;
  };
  stats: {
    views: number;
    likes: number;
    comments: number;
    bookmarks: number;
    shares: number;
  };
  hasAnswer: boolean;
  acceptedAnswer?: {
    id: string;
    authorNickname: string;
    isExpert: boolean;
  };
  isLiked: boolean;
  isBookmarked: boolean;
  isFeatured: boolean;
  isPinned: boolean;
  hasImages: boolean;
  hasAttachments: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityPostDetailResponseDto {
  success: boolean;
  data: {
    post: CommunityPostDetailDto;
    comments: CommunityCommentDto[];
    relatedPosts: CommunityPostListItemDto[];
  };
}

export interface CommunityPostDetailDto {
  id: string;
  title: string;
  content: string;
  category: string;
  postType: 'question' | 'tip' | 'review' | 'discussion';
  tags: string[];
  author: {
    id: string;
    nickname: string;
    avatar?: string;
    isExpert: boolean;
    expertBadge?: {
      title: string;
      verifiedAt: string;
      category: string;
      credentials: string[];
    };
    isAnonymous: boolean;
    stats: {
      totalPosts: number;
      totalAnswers: number;
      helpfulAnswers: number;
      reputation: number;
    };
  };
  images: Array<{
    id: string;
    url: string;
    alt?: string;
    order: number;
  }>;
  attachments: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
  stats: {
    views: number;
    likes: number;
    comments: number;
    bookmarks: number;
    shares: number;
  };
  interactions: {
    isLiked: boolean;
    isBookmarked: boolean;
    isFollowing: boolean;
  };
  hasAnswer: boolean;
  acceptedAnswer?: {
    id: string;
    authorNickname: string;
    isExpert: boolean;
    acceptedAt: string;
  };
  isFeatured: boolean;
  isPinned: boolean;
  isLocked: boolean;
  moderationStatus: 'approved' | 'pending' | 'rejected' | 'hidden';
  createdAt: string;
  updatedAt: string;
}

export interface CommunityCommentDto {
  id: string;
  postId: string;
  content: string;
  author: {
    id: string;
    nickname: string;
    avatar?: string;
    isExpert: boolean;
    expertBadge?: {
      title: string;
      category: string;
    };
  };
  images: Array<{
    id: string;
    url: string;
    alt?: string;
  }>;
  parentCommentId?: string;
  replies: CommunityCommentDto[];
  stats: {
    likes: number;
    helpful: number;
    replies: number;
  };
  interactions: {
    isLiked: boolean;
    isHelpful: boolean;
  };
  isExpertAnswer: boolean;
  isAcceptedAnswer: boolean;
  isEdited: boolean;
  moderationStatus: 'approved' | 'pending' | 'rejected' | 'hidden';
  createdAt: string;
  updatedAt: string;
}

export interface CommunityPostCreateResponseDto {
  success: boolean;
  data: {
    post: CommunityPostDetailDto;
  };
  message?: string;
}

export interface CommunityCommentCreateResponseDto {
  success: boolean;
  data: {
    comment: CommunityCommentDto;
  };
  message?: string;
}

export interface CommunityTrendingResponseDto {
  success: boolean;
  data: {
    trending: {
      posts: CommunityPostListItemDto[];
      tags: Array<{
        name: string;
        count: number;
        growth: number;
      }>;
      experts: Array<{
        id: string;
        nickname: string;
        avatar?: string;
        category: string;
        answersThisPeriod: number;
        helpfulRate: number;
      }>;
    };
  };
}

export interface CommunityUserStatsResponseDto {
  success: boolean;
  data: {
    stats: {
      totalPosts: number;
      totalComments: number;
      totalLikes: number;
      totalViews: number;
      helpfulAnswers: number;
      acceptedAnswers: number;
      reputation: number;
      badges: Array<{
        name: string;
        description: string;
        earnedAt: string;
      }>;
    };
    recentActivity: Array<{
      type: 'post' | 'comment' | 'like' | 'answer';
      title: string;
      createdAt: string;
    }>;
    topPosts: CommunityPostListItemDto[];
  };
}

export interface CommunityInteractionResponseDto {
  success: boolean;
  data: {
    action: string;
    currentCount: number;
    isActive: boolean;
  };
  message?: string;
}

export interface CommunityReportResponseDto {
  success: boolean;
  data: {
    reportId: string;
    status: 'submitted' | 'reviewing' | 'resolved' | 'dismissed';
  };
  message?: string;
}