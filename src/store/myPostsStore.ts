import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MyPost {
  id: string;
  title: string;
  content: string;
  category: 'qna' | 'discussion' | 'guide';
  tags: string[];
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isPublished: boolean;
}

export interface MyComment {
  id: string;
  postId: string;
  postTitle: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  isDeleted: boolean;
  parentCommentId?: string; // 대댓글인 경우
}

interface MyPostsStore {
  posts: MyPost[];
  comments: MyComment[];
  
  // 액션들
  addPost: (post: Omit<MyPost, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePost: (postId: string, updates: Partial<MyPost>) => void;
  deletePost: (postId: string) => void;
  
  addComment: (comment: Omit<MyComment, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateComment: (commentId: string, content: string) => void;
  deleteComment: (commentId: string) => void;
  
  // 필터링 및 검색
  getPostsByCategory: (category: MyPost['category']) => MyPost[];
  getPostsByDateRange: (startDate: string, endDate: string) => MyPost[];
  searchPosts: (query: string) => MyPost[];
  searchComments: (query: string) => MyComment[];
  
  // 통계
  getTotalViews: () => number;
  getTotalLikes: () => number;
  getPostsCountByCategory: () => { [key: string]: number };
}

export const useMyPostsStore = create<MyPostsStore>()(
  persist(
    (set, get) => ({
      posts: [],
      comments: [],

      addPost: (postData) => {
        const newPost: MyPost = {
          ...postData,
          id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        set((state) => ({
          posts: [newPost, ...state.posts]
        }));
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
          posts: state.posts.filter(post => post.id !== postId)
        }));
      },

      addComment: (commentData) => {
        const newComment: MyComment = {
          ...commentData,
          id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        set((state) => ({
          comments: [newComment, ...state.comments]
        }));
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
        set((state) => ({
          comments: state.comments.map(comment =>
            comment.id === commentId
              ? { ...comment, isDeleted: true, updatedAt: new Date().toISOString() }
              : comment
          )
        }));
      },

      getPostsByCategory: (category) => {
        return get().posts.filter(post => post.category === category);
      },

      getPostsByDateRange: (startDate, endDate) => {
        return get().posts.filter(post => {
          const postDate = new Date(post.createdAt);
          return postDate >= new Date(startDate) && postDate <= new Date(endDate);
        });
      },

      searchPosts: (query) => {
        const searchQuery = query.toLowerCase();
        return get().posts.filter(post =>
          post.title.toLowerCase().includes(searchQuery) ||
          post.content.toLowerCase().includes(searchQuery) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchQuery))
        );
      },

      searchComments: (query) => {
        const searchQuery = query.toLowerCase();
        return get().comments.filter(comment =>
          comment.content.toLowerCase().includes(searchQuery) ||
          comment.postTitle.toLowerCase().includes(searchQuery)
        );
      },

      getTotalViews: () => {
        return get().posts.reduce((total, post) => total + post.viewCount, 0);
      },

      getTotalLikes: () => {
        const postLikes = get().posts.reduce((total, post) => total + post.likeCount, 0);
        const commentLikes = get().comments.reduce((total, comment) => total + comment.likeCount, 0);
        return postLikes + commentLikes;
      },

      getPostsCountByCategory: () => {
        const posts = get().posts;
        return posts.reduce((acc, post) => {
          acc[post.category] = (acc[post.category] || 0) + 1;
          return acc;
        }, {} as { [key: string]: number });
      }
    }),
    {
      name: 'my-posts-storage',
    }
  )
);