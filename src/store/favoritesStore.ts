import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FavoriteTutor, FavoritePost, FavoritesStore } from '@/types';

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoriteTutors: [],
      favoritePosts: [],

      // 튜터 관련 메서드
      addFavoriteTutor: (tutor) => {
        const state = get();
        // 이미 존재하는 튜터인지 확인
        if (state.favoriteTutors.some(existingTutor => existingTutor.id === tutor.id)) {
          return; // 이미 존재하면 추가하지 않음
        }
        
        const newTutor: FavoriteTutor = {
          ...tutor,
          addedDate: new Date().toISOString()
        };
        set((state) => ({
          favoriteTutors: [...state.favoriteTutors, newTutor]
        }));
      },

      removeFavoriteTutor: (tutorId) => {
        set((state) => ({
          favoriteTutors: state.favoriteTutors.filter(tutor => tutor.id !== tutorId)
        }));
      },

      isFavoriteTutor: (tutorId) => {
        return get().favoriteTutors.some(tutor => tutor.id === tutorId);
      },

      // 게시글 관련 메서드
      addFavoritePost: (post) => {
        const state = get();
        // 이미 존재하는 게시글인지 확인
        if (state.favoritePosts.some(existingPost => existingPost.id === post.id)) {
          return; // 이미 존재하면 추가하지 않음
        }
        
        const newPost: FavoritePost = {
          ...post,
          addedDate: new Date().toISOString()
        };
        set((state) => ({
          favoritePosts: [...state.favoritePosts, newPost]
        }));
      },

      removeFavoritePost: (postId) => {
        set((state) => ({
          favoritePosts: state.favoritePosts.filter(post => post.id !== postId)
        }));
      },

      isFavoritePost: (postId) => {
        return get().favoritePosts.some(post => post.id === postId);
      },

      // 전체 삭제
      clearAllFavorites: () => {
        set({
          favoriteTutors: [],
          favoritePosts: []
        });
      },

      // 초기화 (개발용)
      initializeWithSampleData: (tutors, posts) => {
        set({
          favoriteTutors: tutors.map(tutor => ({
            ...tutor,
            addedDate: new Date().toISOString()
          })),
          favoritePosts: posts.map(post => ({
            ...post,
            addedDate: new Date().toISOString()
          }))
        });
      }
    }),
    {
      name: 'favorites-storage',
    }
  )
);