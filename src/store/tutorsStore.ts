import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TutorItem, TutorsStore } from '@/types';

const filterAndSortTutors = (state: TutorsStore): TutorItem[] => {
  let filtered = [...state.tutors];

  // 검색어 필터
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    filtered = filtered.filter(tutor => 
      tutor.name.toLowerCase().includes(query) ||
      tutor.description.toLowerCase().includes(query) ||
      tutor.specialties.some(spec => spec.toLowerCase().includes(query)) ||
      tutor.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // 카테고리 필터
  if (state.categoryFilter !== 'all') {
    filtered = filtered.filter(tutor => tutor.category === state.categoryFilter);
  }

  // 가격 필터
  filtered = filtered.filter(tutor => 
    tutor.pricePerHour >= state.priceRange[0] && 
    tutor.pricePerHour <= state.priceRange[1]
  );

  // 평점 필터
  if (state.ratingFilter > 0) {
    filtered = filtered.filter(tutor => tutor.rating >= state.ratingFilter);
  }

  // 온라인 필터
  if (state.onlineOnly) {
    filtered = filtered.filter(tutor => tutor.isOnline);
  }

  // 정렬
  filtered.sort((a, b) => {
    switch (state.sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price_low':
        return a.pricePerHour - b.pricePerHour;
      case 'price_high':
        return b.pricePerHour - a.pricePerHour;
      case 'newest':
        return 0; // 실제로는 생성일 기준
      case 'popular':
      default:
        return b.studentCount - a.studentCount;
    }
  });

  return filtered;
};

export const useTutorsStore = create<TutorsStore>()(
  persist(
    (set, get) => ({
  tutors: [],
  searchQuery: '',
  categoryFilter: 'all',
  priceRange: [0, 200000],
  ratingFilter: 0,
  sortBy: 'popular',
  onlineOnly: false,

  addTutor: (tutor) => {
    set((state) => {
      // 중복 체크
      const existingIndex = state.tutors.findIndex(t => t.id === tutor.id);
      if (existingIndex >= 0) {
        console.warn(`Tutor with id ${tutor.id} already exists. Skipping.`);
        return state; // 중복이면 상태 변경 없음
      }
      
      const newTutors = [...state.tutors, tutor];
      return {
        tutors: newTutors,
        filteredTutors: filterAndSortTutors({
          ...state,
          tutors: newTutors
        })
      };
    });
  },

  loadTutors: (tutorsList) => {
    set((state) => {
      // 새로운 튜터들만 필터링
      const newTutors = tutorsList.filter(tutor => 
        !state.tutors.some(existing => existing.id === tutor.id)
      );
      
      if (newTutors.length === 0) {
        console.log('No new tutors to load');
        return state;
      }
      
      const allTutors = [...state.tutors, ...newTutors];
      console.log(`Loading ${newTutors.length} new tutors. Total: ${allTutors.length}`);
      
      return {
        tutors: allTutors,
        filteredTutors: filterAndSortTutors({
          ...state,
          tutors: allTutors
        })
      };
    });
  },

  setSearchQuery: (query) => set((state) => ({
    searchQuery: query,
    filteredTutors: filterAndSortTutors({ ...state, searchQuery: query })
  })),
  
  setCategoryFilter: (category) => set((state) => ({
    categoryFilter: category,
    filteredTutors: filterAndSortTutors({ ...state, categoryFilter: category })
  })),
  
  setPriceRange: (range) => set((state) => ({
    priceRange: range,
    filteredTutors: filterAndSortTutors({ ...state, priceRange: range })
  })),
  
  setRatingFilter: (rating) => set((state) => ({
    ratingFilter: rating,
    filteredTutors: filterAndSortTutors({ ...state, ratingFilter: rating })
  })),
  
  setSortBy: (sort) => set((state) => ({
    sortBy: sort,
    filteredTutors: filterAndSortTutors({ ...state, sortBy: sort })
  })),
  
  setOnlineOnly: (online) => set((state) => ({
    onlineOnly: online,
    filteredTutors: filterAndSortTutors({ ...state, onlineOnly: online })
  })),

  clearFilters: () => set((state) => {
    const newState = {
      ...state,
      searchQuery: '',
      categoryFilter: 'all',
      priceRange: [0, 200000] as [number, number],
      ratingFilter: 0,
      sortBy: 'popular' as const,
      onlineOnly: false
    };
    return {
      ...newState,
      filteredTutors: filterAndSortTutors(newState)
    };
  }),

  filteredTutors: [],

  get categories() {
    const state = get();
    const categories = Array.from(new Set(state.tutors.map(tutor => tutor.category)));
    return categories.sort();
  }
}),
    {
      name: 'tutors-store',
      partialize: (state) => ({
        tutors: state.tutors,
        searchQuery: state.searchQuery,
        categoryFilter: state.categoryFilter,
        priceRange: state.priceRange,
        ratingFilter: state.ratingFilter,
        sortBy: state.sortBy,
        onlineOnly: state.onlineOnly
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // 복원 후 필터된 튜터 목록 재계산
          state.filteredTutors = filterAndSortTutors(state);
        }
      }
    }
  )
);