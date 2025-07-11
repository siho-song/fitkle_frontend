"use client";

import React from 'react';
import { useTutorsStore } from '@/store/tutorsStore';
import CategoryIcon from '@mui/icons-material/Category';
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SortIcon from '@mui/icons-material/Sort';
import WifiIcon from '@mui/icons-material/Wifi';

export function TutorsFilters() {
  const {
    categoryFilter,
    setCategoryFilter,
    priceRange,
    setPriceRange,
    ratingFilter,
    setRatingFilter,
    sortBy,
    setSortBy,
    onlineOnly,
    setOnlineOnly,
    categories
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

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
        <CategoryIcon className="text-primary" />
        필터
      </h3>

      {/* 카테고리 필터 */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-3">카테고리</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value="all"
              checked={categoryFilter === 'all'}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="mr-2 text-primary focus:ring-primary"
            />
            <span className="text-gray-700">전체</span>
          </label>
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category}
                checked={categoryFilter === category}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="mr-2 text-primary focus:ring-primary"
              />
              <span className="text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

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
                  <span className="text-gray-700">모든 평점</span>
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

      {/* 정렬 */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-1">
          <SortIcon sx={{ fontSize: 18 }} />
          정렬
        </h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 온라인 수업 필터 */}
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={onlineOnly}
            onChange={(e) => setOnlineOnly(e.target.checked)}
            className="text-primary focus:ring-primary rounded"
          />
          <WifiIcon sx={{ fontSize: 18 }} className="text-primary" />
          <span className="font-semibold text-gray-800">온라인 수업만</span>
        </label>
      </div>
    </div>
  );
}