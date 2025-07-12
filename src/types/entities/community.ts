// 커뮤니티 관련 타입 정의

export type PostCategory = 
  | '프로그래밍' 
  | '디자인' 
  | '언어' 
  | '음악' 
  | '요리' 
  | '운동' 
  | '사진' 
  | '비즈니스' 
  | '기타';

export type AuthorType = 'student' | 'expert';

export interface StudentInfo {
  level: 'beginner' | 'intermediate' | 'advanced';
  field?: string;
}

export interface ExpertInfo {
  badgeType: 'gold' | 'silver' | 'bronze' | 'verified';
  experience: string;
  company?: string;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  category: PostCategory;
  categoryEmoji: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorType: AuthorType;
  studentInfo?: StudentInfo;
  expertInfo?: ExpertInfo;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isResolved: boolean;
  isFeatured: boolean;
  isPinned: boolean;
}

export interface CommunityComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorType: AuthorType;
  content: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  parentId?: string; // for nested comments
  isMarkedAsAnswer: boolean;
  isEdited: boolean;
}

export interface UserInteraction {
  userId: string;
  postId?: string;
  commentId?: string;
  type: 'like' | 'bookmark' | 'follow';
  createdAt: string;
}

// 즐겨찾기 게시글
export interface FavoritePost {
  id: string;
  postId: string;
  userId: string;
  addedAt: string;
}

// 커뮤니티 필터링
export interface CommunityFilters {
  category?: PostCategory | 'all';
  authorType?: AuthorType | 'all';
  isResolved?: boolean;
  sortBy?: 'latest' | 'popular' | 'most_liked' | 'most_viewed';
  searchQuery?: string;
}

// 글쓰기 폼 데이터
export interface PostFormData {
  title: string;
  content: string;
  category: PostCategory;
  tags: string[];
}

export interface CommentFormData {
  content: string;
  parentId?: string;
}