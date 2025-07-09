"use client";
import React, { useEffect, useRef } from 'react';
import { useTutorSearchStore } from '../../store/tutorSearchStore';
import { CategorySidebar } from '../CategorySidebar';
import { TutorSearchResultItem } from '../../domain/entities/tutorSearchResultItem';
import { kTutorCategories } from '../../../../constants/searchConstants';
import Image from 'next/image';

// 검색 결과 카드 (간단 버전)
const TutorSearchResultCard: React.FC<{ tutor: TutorSearchResultItem }> = ({ tutor }) => (
  <div className="p-4 bg-white rounded-lg shadow mb-2 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition">
    <Image
      src={tutor.profileImageUrl}
      alt={tutor.name}
      width={64}
      height={64}
      className="w-16 h-16 rounded-full object-cover"
    />
    <div className="flex-1">
      <div className="font-bold text-lg">{tutor.name}</div>
      <div className="text-sm text-gray-500">{tutor.description}</div>
      <div className="text-xs text-gray-400 mt-1">경력 {tutor.careerYears}년 · 평점 {tutor.rating} ({tutor.ratingCount})</div>
    </div>
  </div>
);

export const TutorSearchPageDesktop: React.FC = () => {
  const {
    status,
    searchResults,
    searchParams,
    errorMessage,
    hasMoreData,
    searchTutors,
    loadMoreResults,
    updateSearchParams,
    clearSearch,
  } = useTutorSearchStore();

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // 최초 마운트 시 검색
  useEffect(() => {
    searchTutors({ page: 1, pageSize: 20 });
    // eslint-disable-next-line
  }, []);

  // 무한스크롤 IntersectionObserver
  useEffect(() => {
    if (!hasMoreData || status === 'loading') return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreResults();
        }
      },
      { threshold: 1 }
    );
    const loader = loaderRef.current;
    if (loader) observer.observe(loader);
    return () => {
      if (loader) observer.unobserve(loader);
    };
    // eslint-disable-next-line
  }, [hasMoreData, status]);

  // 필터 핸들러
  const handleCategory = (cat: string) => {
    updateSearchParams({ ...searchParams, category: cat, page: 1 });
    searchTutors({ ...searchParams, category: cat, page: 1 });
  };
  const handleSort = (sortBy: '리뷰 많은 순' | '평점 높은 순' | '경력 많은 순' | undefined) => {
    updateSearchParams({ ...searchParams, sortBy, page: 1 });
    searchTutors({ ...searchParams, sortBy, page: 1 });
  };
  const handleSearch = (query: string) => {
    updateSearchParams({ ...searchParams, query, page: 1 });
    searchTutors({ ...searchParams, query, page: 1 });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 카테고리 사이드바 */}
      <CategorySidebar
        categories={kTutorCategories}
        selectedCategory={searchParams.category}
        onCategorySelected={handleCategory}
      />
      {/* 메인 컨텐츠 */}
      <main className="flex-1 px-12 py-8">
        {/* 검색 필터 섹션 */}
        <div className="flex items-center gap-4 mb-8">
          <select
            className="px-3 py-2 rounded border text-sm"
            value={searchParams.sortBy || ''}
            onChange={(e) => handleSort(e.target.value as '리뷰 많은 순' | '평점 높은 순' | '경력 많은 순' | undefined)}
          >
            <option value="">정렬</option>
            <option value="리뷰 많은 순">리뷰 많은 순</option>
            <option value="평점 높은 순">평점 높은 순</option>
            <option value="경력 많은 순">경력 많은 순</option>
          </select>
          <input
            className="px-3 py-2 rounded border text-sm w-64"
            placeholder="튜터명, 설명 검색"
            value={searchParams.query || ''}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button
            className="ml-2 px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-xs"
            onClick={clearSearch}
          >
            초기화
          </button>
        </div>
        {/* 검색 결과 */}
        <div>
          {status === 'loading' && searchResults.length === 0 && (
            <div className="py-20 text-center text-gray-400">로딩 중...</div>
          )}
          {status === 'error' && (
            <div className="py-20 text-center text-red-500">
              <div>검색 중 오류가 발생했습니다.</div>
              {errorMessage && <div className="text-xs mt-2">{errorMessage}</div>}
              <button
                className="mt-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => searchTutors({ page: 1, pageSize: 20 })}
              >
                다시 시도
              </button>
            </div>
          )}
          {status === 'empty' && (
            <div className="py-20 text-center text-gray-400">검색 결과가 없습니다.</div>
          )}
          {searchResults.length > 0 && (
            <div>
              {searchResults.map((tutor) => (
                <TutorSearchResultCard key={tutor.id} tutor={tutor} />
              ))}
              {/* 무한스크롤 로더 */}
              <div ref={loaderRef} className="h-8" />
              {status === 'loading' && (
                <div className="py-4 text-center text-gray-400">불러오는 중...</div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}; 