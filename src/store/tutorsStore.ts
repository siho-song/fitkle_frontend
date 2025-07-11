import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TutorItem {
  id: string;
  name: string;
  avatar: string;
  category: string;
  categoryEmoji: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  studentCount: number;
  experience: string;
  pricePerHour: number;
  description: string;
  tags: string[];
  isOnline: boolean;
  responseTime: string;
  languages: string[];
  education: string[];
  certifications: string[];
  introduction: string;
  achievements: string[];
  availability: {
    [key: string]: string[]; // 요일별 가능 시간
  };
}

interface TutorsStore {
  tutors: TutorItem[];
  searchQuery: string;
  categoryFilter: string;
  priceRange: [number, number];
  ratingFilter: number;
  sortBy: 'popular' | 'rating' | 'price_low' | 'price_high' | 'newest';
  onlineOnly: boolean;
  
  // 액션들
  addTutor: (tutor: TutorItem) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setRatingFilter: (rating: number) => void;
  setSortBy: (sort: 'popular' | 'rating' | 'price_low' | 'price_high' | 'newest') => void;
  setOnlineOnly: (online: boolean) => void;
  clearFilters: () => void;
  
  // 계산된 속성들
  filteredTutors: TutorItem[];
  categories: string[];
}

export const useTutorsStore = create<TutorsStore>()((set, get) => ({
  tutors: [],
  searchQuery: '',
  categoryFilter: 'all',
  priceRange: [0, 200000],
  ratingFilter: 0,
  sortBy: 'popular',
  onlineOnly: false,

  addTutor: (tutor) => {
    set((state) => ({
      tutors: [...state.tutors, tutor]
    }));
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setCategoryFilter: (category) => set({ categoryFilter: category }),
  setPriceRange: (range) => set({ priceRange: range }),
  setRatingFilter: (rating) => set({ ratingFilter: rating }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setOnlineOnly: (online) => set({ onlineOnly: online }),

  clearFilters: () => set({
    searchQuery: '',
    categoryFilter: 'all',
    priceRange: [0, 200000],
    ratingFilter: 0,
    sortBy: 'popular',
    onlineOnly: false
  }),

  get filteredTutors() {
    const state = get();
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
  },

  get categories() {
    const state = get();
    const categories = Array.from(new Set(state.tutors.map(tutor => tutor.category)));
    return categories.sort();
  }
}));