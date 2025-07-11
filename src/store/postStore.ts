import { create } from 'zustand';

export interface Post {
  id: string;
  type: 'question' | 'tip' | 'guide';
  category: string;
  categoryEmoji: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  timeAgo: string;
  timestamp: number;
  likes: number;
  comments: number;
  views: number;
  isResolved?: boolean;
  isFeatured?: boolean;
  hasImages?: boolean;
  tags: string[];
  authorType: 'expert' | 'student';
  expertInfo?: {
    experience: string;
    specialties: string[];
    rating?: number;
    studentsHelped?: number;
    badgeType: 'verified_tutor';
  };
  studentInfo?: {
    level: 'beginner' | 'intermediate' | 'advanced';
    isFirstPost?: boolean;
  };
}

interface PostStore {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'timestamp' | 'timeAgo' | 'likes' | 'comments' | 'views'>) => void;
  setPosts: (posts: Post[]) => void;
}

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  
  addPost: (postData) => {
    const newPost: Post = {
      ...postData,
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      timeAgo: '방금 전',
      likes: 0,
      comments: 0,
      views: 0,
      authorType: 'student', // 기본값
      studentInfo: {
        level: 'beginner',
        isFirstPost: false
      }
    };
    
    set((state) => ({
      posts: [newPost, ...state.posts]
    }));
  },
  
  setPosts: (posts) => set({ posts })
}));