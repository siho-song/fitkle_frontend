import { create } from 'zustand';
import { TutorSearchParams } from '../domain/entities/tutorSearchParams';
import { TutorSearchResultItem } from '../domain/entities/tutorSearchResultItem';
import { searchTutors as fetchTutors, TutorSearchResponseDto } from '../data/repositories/tutorSearchRepository';

export type SearchStatus = 'initial' | 'loading' | 'success' | 'error' | 'empty';

export interface SearchState {
  status: SearchStatus;
  searchResults: TutorSearchResultItem[];
  searchParams: TutorSearchParams;
  errorMessage?: string;
  hasMoreData: boolean;
  currentPage: number;
}

interface SearchStore extends SearchState {
  searchTutors: (params: TutorSearchParams) => Promise<void>;
  loadMoreResults: () => Promise<void>;
  clearSearch: () => void;
  updateSearchParams: (params: TutorSearchParams) => void;
  clearError: () => void;
}

const initialParams: TutorSearchParams = {
  page: 1,
  pageSize: 20,
};

export const useTutorSearchStore = create<SearchStore>((set, get) => ({
  status: 'initial',
  searchResults: [],
  searchParams: initialParams,
  errorMessage: undefined,
  hasMoreData: true,
  currentPage: 1,

  async searchTutors(params) {
    set({ status: 'loading', searchParams: params, currentPage: 1 });
    try {
      const response: TutorSearchResponseDto = await fetchTutors(params);
      const results = response.data;
      if (results.length === 0) {
        set({
          status: 'empty',
          searchResults: [],
          hasMoreData: false,
        });
      } else {
        set({
          status: 'success',
          searchResults: results,
          hasMoreData: response.pagination.hasNext,
        });
      }
    } catch (e: unknown) {
      set({
        status: 'error',
        errorMessage: `검색 중 오류가 발생했습니다: ${e instanceof Error ? e.message : String(e)}`,
      });
    }
  },

  async loadMoreResults() {
    const { hasMoreData, status, searchParams, currentPage, searchResults } = get();
    if (!hasMoreData || status === 'loading') return;
    set({ status: 'loading' });
    const nextPage = currentPage + 1;
    const nextParams = { ...searchParams, page: nextPage };
    try {
      const response: TutorSearchResponseDto = await fetchTutors(nextParams);
      const results = response.data;
      if (results.length > 0) {
        set({
          status: 'success',
          searchResults: [...searchResults, ...results],
          currentPage: nextPage,
          hasMoreData: response.pagination.hasNext,
        });
      } else {
        set({ hasMoreData: false });
      }
    } catch (e: unknown) {
      set({
        status: 'error',
        errorMessage: `검색 중 오류가 발생했습니다: ${e instanceof Error ? e.message : String(e)}`,
      });
    }
  },

  clearSearch: () => set({ status: 'initial', searchResults: [], searchParams: initialParams, errorMessage: undefined, hasMoreData: true, currentPage: 1 }),

  updateSearchParams: (params) => set({ searchParams: params }),

  clearError: () => set({ errorMessage: undefined }),
}));