"use client";

import React, { useState } from 'react';
import { Search, Calendar, Filter, X } from 'lucide-react';

export interface ChatFilterOptions {
  searchTerm: string;
  dateFilter: 'all' | 'today' | 'thisWeek' | 'thisMonth' | 'custom';
  customDateRange?: {
    startDate: string;
    endDate: string;
  };
}

interface ChatFilterProps {
  onFilterChange: (filters: ChatFilterOptions) => void;
  className?: string;
}

export function ChatFilter({ onFilterChange, className = '' }: ChatFilterProps) {
  const [filters, setFilters] = useState<ChatFilterOptions>({
    searchTerm: '',
    dateFilter: 'all'
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const updateFilters = (newFilters: Partial<ChatFilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSearchChange = (searchTerm: string) => {
    updateFilters({ searchTerm });
  };

  const handleDateFilterChange = (dateFilter: ChatFilterOptions['dateFilter']) => {
    updateFilters({ dateFilter, customDateRange: undefined });
    setShowDatePicker(dateFilter === 'custom');
  };

  const handleCustomDateChange = (customDateRange: { startDate: string; endDate: string }) => {
    updateFilters({ customDateRange });
  };

  const clearFilters = () => {
    const clearedFilters: ChatFilterOptions = {
      searchTerm: '',
      dateFilter: 'all'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
    setShowDatePicker(false);
  };

  const hasActiveFilters = filters.searchTerm || filters.dateFilter !== 'all';

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 space-y-4 ${className}`}>
      {/* 검색 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="상대방 이름으로 검색..."
          value={filters.searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* 날짜 필터 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-400" />
          <span className="text-sm font-medium text-gray-700">기간 필터</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all', label: '전체' },
            { value: 'today', label: '오늘' },
            { value: 'thisWeek', label: '이번 주' },
            { value: 'thisMonth', label: '이번 달' },
            { value: 'custom', label: '사용자 지정' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleDateFilterChange(option.value as ChatFilterOptions['dateFilter'])}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                filters.dateFilter === option.value
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* 사용자 지정 날짜 범위 */}
        {showDatePicker && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <label className="block text-xs text-gray-600 mb-1">시작 날짜</label>
              <input
                type="date"
                value={filters.customDateRange?.startDate || ''}
                onChange={(e) => handleCustomDateChange({
                  startDate: e.target.value,
                  endDate: filters.customDateRange?.endDate || ''
                })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">종료 날짜</label>
              <input
                type="date"
                value={filters.customDateRange?.endDate || ''}
                onChange={(e) => handleCustomDateChange({
                  startDate: filters.customDateRange?.startDate || '',
                  endDate: e.target.value
                })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* 필터 초기화 */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-gray-400" />
            <span className="text-sm text-gray-600">필터 적용됨</span>
          </div>
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={14} />
            초기화
          </button>
        </div>
      )}
    </div>
  );
}