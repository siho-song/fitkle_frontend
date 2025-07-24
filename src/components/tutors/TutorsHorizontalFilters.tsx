"use client";

import React, { useState } from 'react';
import { useTutorsStore } from '@/store/tutorsStore';
import CategoryIcon from '@mui/icons-material/Category';
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export function TutorsHorizontalFilters() {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    categoryFilter,
    setCategoryFilter,
    priceRange,
    setPriceRange,
    ratingFilter,
    setRatingFilter,
    sortBy,
    setSortBy,
    categories,
    clearFilters,
    searchQuery
  } = useTutorsStore();

  const handlePriceChange = (index: number, value: string) => {
    const numValue = parseInt(value) || 0;
    const newRange: [number, number] = [...priceRange];
    newRange[index] = numValue;
    setPriceRange(newRange);
  };

  const sortOptions = [
    { value: 'popular', label: '인기순' },
    { value: 'rating', label: '평점순' },
    { value: 'price_low', label: '낮은 가격순' },
    { value: 'price_high', label: '높은 가격순' },
    { value: 'newest', label: '최신순' }
  ];

  const hasActiveFilters = searchQuery || categoryFilter !== 'all' || sortBy !== 'popular' || ratingFilter > 0 || priceRange[0] > 0 || priceRange[1] < 200000;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {/* 기본 필터 바 */}
      <div className="flex flex-wrap items-center gap-4">
        {/* 필터 아이콘 */}
        <div className="flex items-center gap-2 text-primary">
          <FilterListIcon sx={{ fontSize: 20 }} />
          <span className="font-semibold">필터</span>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex items-center gap-2">
          <CategoryIcon sx={{ fontSize: 18 }} className="text-gray-500" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent min-w-[120px]"
          >
            <option value="all">전체 카테고리</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* 정렬 */}
        <div className="flex items-center gap-2">
          <SortIcon sx={{ fontSize: 18 }} className="text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent min-w-[100px]"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 상세 필터 토글 버튼 */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
        >
          상세 필터
          {isExpanded ? <ExpandLessIcon sx={{ fontSize: 16 }} /> : <ExpandMoreIcon sx={{ fontSize: 16 }} />}
        </button>

        {/* 필터 초기화 버튼 */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-primary hover:text-primary/80 font-medium transition-colors text-sm"
          >
            필터 초기화
          </button>
        )}
      </div>

      {/* 확장된 필터 */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 가격 범위 */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-1">
                <AttachMoneyIcon sx={{ fontSize: 18 }} />
                시간당 가격
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(0, e.target.value)}
                    placeholder="최소"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <span className="text-gray-500">~</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(1, e.target.value)}
                    placeholder="최대"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="text-xs text-gray-500">
                  {priceRange[0].toLocaleString()}원 ~ {priceRange[1].toLocaleString()}원
                </div>
              </div>
            </div>

            {/* 평점 필터 */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-1">
                <StarIcon sx={{ fontSize: 18 }} className="text-yellow-500" />
                최소 평점
              </h4>
              <div className="space-y-2">
                {[0, 3, 4, 4.5, 4.8].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={ratingFilter === rating}
                      onChange={(e) => setRatingFilter(parseFloat(e.target.value))}
                      className="mr-2 text-primary focus:ring-primary"
                    />
                    <div className="flex items-center gap-1">
                      {rating === 0 ? (
                        <span className="text-gray-700 text-sm">모든 평점</span>
                      ) : (
                        <>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                sx={{ fontSize: 14 }}
                                className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                          <span className="text-gray-700 text-sm">{rating}점 이상</span>
                        </>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 빈 영역 (필요시 추가 필터 공간) */}
            <div>
              {/* 향후 추가 필터를 위한 공간 */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}