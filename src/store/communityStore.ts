import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 통합된 게시글 인터페이스
export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  type: 'question' | 'tip' | 'guide';
  category: string;
  categoryEmoji: string;
  tags: string[];
  
  // 작성자 정보
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorType: 'expert' | 'student';
  
  // 날짜/시간
  createdAt: string;
  updatedAt: string;
  
  // 상호작용
  viewCount: number;
  likeCount: number;
  commentCount: number;
  bookmarkCount: number;
  
  // 상태
  isPublished: boolean;
  isResolved?: boolean; // Q&A 전용
  isPinned?: boolean;
  
  // 전문가 정보 (전문가 작성 시)
  expertInfo?: {
    experience: string;
    specialties: string[];
    rating?: number;
    studentsHelped?: number;
    badgeType: 'verified_tutor';
  };
}

// 통합된 댓글 인터페이스
export interface CommunityComment {
  id: string;
  postId: string;
  content: string;
  
  // 작성자 정보
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorType: 'expert' | 'student';
  
  // 날짜/시간
  createdAt: string;
  updatedAt: string;
  
  // 상호작용
  likeCount: number;
  
  // 계층 구조
  parentCommentId?: string;
  childrenCount: number;
  
  // 상태
  isDeleted: boolean;
  isMarkedAsAnswer?: boolean; // Q&A에서 채택된 답변
  
  // 전문가 정보 (전문가 작성 시)
  expertInfo?: {
    experience: string;
    specialties: string[];
    badgeType: 'verified_tutor';
  };
}

// 사용자 상호작용 인터페이스
export interface UserInteraction {
  userId: string;
  postId?: string;
  commentId?: string;
  type: 'like' | 'bookmark' | 'view';
  createdAt: string;
}

interface CommunityStore {
  // 데이터
  posts: CommunityPost[];
  comments: CommunityComment[];
  interactions: UserInteraction[];
  currentUserId: string;
  
  // 게시글 액션
  addPost: (post: Omit<CommunityPost, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'likeCount' | 'commentCount' | 'bookmarkCount'>) => string;
  updatePost: (postId: string, updates: Partial<CommunityPost>) => void;
  deletePost: (postId: string) => void;
  incrementPostViews: (postId: string) => void;
  
  // 댓글 액션
  addComment: (comment: Omit<CommunityComment, 'id' | 'createdAt' | 'updatedAt' | 'likeCount' | 'childrenCount'>) => string;
  updateComment: (commentId: string, content: string) => void;
  deleteComment: (commentId: string) => void;
  markCommentAsAnswer: (commentId: string) => void;
  
  // 상호작용 액션
  toggleLike: (targetId: string, type: 'post' | 'comment') => void;
  toggleBookmark: (postId: string) => void;
  addView: (postId: string) => void;
  
  // 조회 함수
  getPost: (postId: string) => CommunityPost | undefined;
  getPostComments: (postId: string) => CommunityComment[];
  getPostsByAuthor: (authorId: string) => CommunityPost[];
  getCommentsByAuthor: (authorId: string) => CommunityComment[];
  getUserLikedPosts: (userId: string) => CommunityPost[];
  getUserBookmarkedPosts: (userId: string) => CommunityPost[];
  
  // 필터링 및 검색
  getPostsByCategory: (category: string) => CommunityPost[];
  getPostsByType: (type: CommunityPost['type']) => CommunityPost[];
  searchPosts: (query: string) => CommunityPost[];
  getTrendingPosts: () => CommunityPost[];
  
  // 통계
  getUserStats: (userId: string) => {
    postsCount: number;
    commentsCount: number;
    totalViews: number;
    totalLikes: number;
    totalBookmarks: number;
  };
  
  // 유틸리티
  setCurrentUser: (userId: string) => void;
  isLiked: (targetId: string, type: 'post' | 'comment') => boolean;
  isBookmarked: (postId: string) => boolean;
  
  // 샘플 데이터 로딩
  loadSampleData: () => void;
}

export const useCommunityStore = create<CommunityStore>()(
  persist(
    (set, get) => ({
      posts: [],
      comments: [],
      interactions: [],
      currentUserId: 'user_current', // 현재 로그인한 사용자 ID

      // 게시글 액션
      addPost: (postData) => {
        const newPost: CommunityPost = {
          ...postData,
          id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
          bookmarkCount: 0
        };
        
        set((state) => ({
          posts: [newPost, ...state.posts]
        }));
        
        return newPost.id;
      },

      updatePost: (postId, updates) => {
        set((state) => ({
          posts: state.posts.map(post =>
            post.id === postId
              ? { ...post, ...updates, updatedAt: new Date().toISOString() }
              : post
          )
        }));
      },

      deletePost: (postId) => {
        set((state) => ({
          posts: state.posts.filter(post => post.id !== postId),
          comments: state.comments.filter(comment => comment.postId !== postId),
          interactions: state.interactions.filter(
            interaction => interaction.postId !== postId
          )
        }));
      },

      incrementPostViews: (postId) => {
        set((state) => ({
          posts: state.posts.map(post =>
            post.id === postId
              ? { ...post, viewCount: post.viewCount + 1 }
              : post
          )
        }));
      },

      // 댓글 액션
      addComment: (commentData) => {
        const newComment: CommunityComment = {
          ...commentData,
          id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          likeCount: 0,
          childrenCount: 0
        };
        
        set((state) => ({
          comments: [...state.comments, newComment],
          posts: state.posts.map(post =>
            post.id === commentData.postId
              ? { ...post, commentCount: post.commentCount + 1 }
              : post
          )
        }));
        
        // 부모 댓글의 자식 수 증가
        if (commentData.parentCommentId) {
          set((state) => ({
            comments: state.comments.map(comment =>
              comment.id === commentData.parentCommentId
                ? { ...comment, childrenCount: comment.childrenCount + 1 }
                : comment
            )
          }));
        }
        
        return newComment.id;
      },

      updateComment: (commentId, content) => {
        set((state) => ({
          comments: state.comments.map(comment =>
            comment.id === commentId
              ? { 
                  ...comment, 
                  content, 
                  updatedAt: new Date().toISOString() 
                }
              : comment
          )
        }));
      },

      deleteComment: (commentId) => {
        const comment = get().comments.find(c => c.id === commentId);
        if (!comment) return;

        set((state) => ({
          comments: state.comments.map(c =>
            c.id === commentId
              ? { ...c, isDeleted: true, updatedAt: new Date().toISOString() }
              : c
          ),
          posts: state.posts.map(post =>
            post.id === comment.postId
              ? { ...post, commentCount: Math.max(0, post.commentCount - 1) }
              : post
          )
        }));
      },

      markCommentAsAnswer: (commentId) => {
        const comment = get().comments.find(c => c.id === commentId);
        if (!comment) return;

        set((state) => ({
          comments: state.comments.map(c =>
            c.postId === comment.postId
              ? { ...c, isMarkedAsAnswer: c.id === commentId }
              : c
          ),
          posts: state.posts.map(post =>
            post.id === comment.postId
              ? { ...post, isResolved: true }
              : post
          )
        }));
      },

      // 상호작용 액션
      toggleLike: (targetId, type) => {
        const state = get();
        const userId = state.currentUserId;
        const existingLike = state.interactions.find(
          i => i.userId === userId && 
               (type === 'post' ? i.postId === targetId : i.commentId === targetId) && 
               i.type === 'like'
        );

        if (existingLike) {
          // 좋아요 취소
          set((state) => ({
            interactions: state.interactions.filter(
              i => !(i.userId === userId && 
                     (type === 'post' ? i.postId === targetId : i.commentId === targetId) && 
                     i.type === 'like')
            ),
            [type === 'post' ? 'posts' : 'comments']: state[type === 'post' ? 'posts' : 'comments'].map((item: any) =>
              item.id === targetId
                ? { ...item, likeCount: Math.max(0, item.likeCount - 1) }
                : item
            )
          }));
        } else {
          // 좋아요 추가
          const newInteraction: UserInteraction = {
            userId,
            [type === 'post' ? 'postId' : 'commentId']: targetId,
            type: 'like',
            createdAt: new Date().toISOString()
          };

          set((state) => ({
            interactions: [...state.interactions, newInteraction],
            [type === 'post' ? 'posts' : 'comments']: state[type === 'post' ? 'posts' : 'comments'].map((item: any) =>
              item.id === targetId
                ? { ...item, likeCount: item.likeCount + 1 }
                : item
            )
          }));
        }
      },

      toggleBookmark: (postId) => {
        const state = get();
        const userId = state.currentUserId;
        const existingBookmark = state.interactions.find(
          i => i.userId === userId && i.postId === postId && i.type === 'bookmark'
        );

        if (existingBookmark) {
          // 북마크 취소
          set((state) => ({
            interactions: state.interactions.filter(
              i => !(i.userId === userId && i.postId === postId && i.type === 'bookmark')
            ),
            posts: state.posts.map(post =>
              post.id === postId
                ? { ...post, bookmarkCount: Math.max(0, post.bookmarkCount - 1) }
                : post
            )
          }));
        } else {
          // 북마크 추가
          const newInteraction: UserInteraction = {
            userId,
            postId,
            type: 'bookmark',
            createdAt: new Date().toISOString()
          };

          set((state) => ({
            interactions: [...state.interactions, newInteraction],
            posts: state.posts.map(post =>
              post.id === postId
                ? { ...post, bookmarkCount: post.bookmarkCount + 1 }
                : post
            )
          }));
        }
      },

      addView: (postId) => {
        const state = get();
        const userId = state.currentUserId;
        
        // 오늘 이미 조회했는지 확인
        const today = new Date().toDateString();
        const alreadyViewed = state.interactions.some(
          i => i.userId === userId && 
               i.postId === postId && 
               i.type === 'view' && 
               new Date(i.createdAt).toDateString() === today
        );

        if (!alreadyViewed) {
          const newInteraction: UserInteraction = {
            userId,
            postId,
            type: 'view',
            createdAt: new Date().toISOString()
          };

          set((state) => ({
            interactions: [...state.interactions, newInteraction]
          }));
          
          get().incrementPostViews(postId);
        }
      },

      // 조회 함수들
      getPost: (postId) => {
        return get().posts.find(post => post.id === postId);
      },

      getPostComments: (postId) => {
        return get().comments
          .filter(comment => comment.postId === postId && !comment.isDeleted)
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      },

      getPostsByAuthor: (authorId) => {
        return get().posts.filter(post => post.authorId === authorId);
      },

      getCommentsByAuthor: (authorId) => {
        return get().comments.filter(comment => comment.authorId === authorId);
      },

      getUserLikedPosts: (userId) => {
        const state = get();
        const likedPostIds = state.interactions
          .filter(i => i.userId === userId && i.type === 'like' && i.postId)
          .map(i => i.postId!);
        
        return state.posts.filter(post => likedPostIds.includes(post.id));
      },

      getUserBookmarkedPosts: (userId) => {
        const state = get();
        const bookmarkedPostIds = state.interactions
          .filter(i => i.userId === userId && i.type === 'bookmark' && i.postId)
          .map(i => i.postId!);
        
        return state.posts.filter(post => bookmarkedPostIds.includes(post.id));
      },

      // 필터링 및 검색
      getPostsByCategory: (category) => {
        if (category === 'all') {
          return get().posts;
        }
        return get().posts.filter(post => post.category === category);
      },

      getPostsByType: (type) => {
        return get().posts.filter(post => post.type === type);
      },

      searchPosts: (query) => {
        const searchQuery = query.toLowerCase();
        return get().posts.filter(post =>
          post.title.toLowerCase().includes(searchQuery) ||
          post.content.toLowerCase().includes(searchQuery) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchQuery))
        );
      },

      getTrendingPosts: () => {
        return get().posts
          .filter(post => post.isPublished)
          .sort((a, b) => {
            // 최근 3일간의 활동 점수 계산
            const threeDaysAgo = Date.now() - (3 * 24 * 60 * 60 * 1000);
            const aScore = (a.likeCount * 2 + a.commentCount * 3 + a.viewCount) * 
                          (new Date(a.createdAt).getTime() > threeDaysAgo ? 2 : 1);
            const bScore = (b.likeCount * 2 + b.commentCount * 3 + b.viewCount) * 
                          (new Date(b.createdAt).getTime() > threeDaysAgo ? 2 : 1);
            return bScore - aScore;
          });
      },

      // 통계
      getUserStats: (userId) => {
        const state = get();
        const userPosts = state.posts.filter(post => post.authorId === userId);
        const userComments = state.comments.filter(comment => comment.authorId === userId);
        
        return {
          postsCount: userPosts.length,
          commentsCount: userComments.filter(c => !c.isDeleted).length,
          totalViews: userPosts.reduce((sum, post) => sum + post.viewCount, 0),
          totalLikes: userPosts.reduce((sum, post) => sum + post.likeCount, 0) +
                     userComments.reduce((sum, comment) => sum + comment.likeCount, 0),
          totalBookmarks: userPosts.reduce((sum, post) => sum + post.bookmarkCount, 0)
        };
      },

      // 유틸리티
      setCurrentUser: (userId) => {
        set({ currentUserId: userId });
      },

      isLiked: (targetId, type) => {
        const state = get();
        return state.interactions.some(
          i => i.userId === state.currentUserId && 
               (type === 'post' ? i.postId === targetId : i.commentId === targetId) && 
               i.type === 'like'
        );
      },

      isBookmarked: (postId) => {
        const state = get();
        return state.interactions.some(
          i => i.userId === state.currentUserId && i.postId === postId && i.type === 'bookmark'
        );
      },

      // 샘플 데이터 로딩
      loadSampleData: () => {
        const { loadSampleData } = require('@/data/sampleCommunityData');
        const data = loadSampleData();
        
        set({
          posts: data.posts,
          comments: data.comments,
          interactions: data.interactions
        });
      }
    }),
    {
      name: 'community-storage',
    }
  )
);