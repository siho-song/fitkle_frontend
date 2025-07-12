"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Calendar } from './Calendar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface DatePickerProps {
  selectedDate?: string;
  onDateSelect: (date: string) => void;
  availableDates?: string[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateSelect,
  availableDates = [],
  placeholder = "날짜를 선택하세요",
  className = "",
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 달력 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  };

  const handleDateSelect = (date: string) => {
    onDateSelect(date);
    setIsOpen(false);
  };

  const handleButtonClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* 날짜 선택 버튼 */}
      <button
        type="button"
        onClick={handleButtonClick}
        disabled={disabled}
        className={`
          w-full p-3 border border-gray-300 rounded-lg text-left flex items-center justify-between
          transition-all duration-200
          ${disabled 
            ? 'bg-gray-100 cursor-not-allowed text-gray-400' 
            : 'bg-white hover:border-primary focus:ring-2 focus:ring-primary focus:border-transparent'
          }
          ${isOpen ? 'border-primary ring-2 ring-primary ring-opacity-20' : ''}
        `}
      >
        <span className={selectedDate ? 'text-gray-900' : 'text-gray-500'}>
          {selectedDate ? formatDisplayDate(selectedDate) : placeholder}
        </span>
        
        <CalendarTodayIcon 
          className={`transition-colors ${
            disabled ? 'text-gray-400' : isOpen ? 'text-primary' : 'text-gray-400'
          }`}
          sx={{ fontSize: 20 }} 
        />
      </button>

      {/* 달력 드롭다운 */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg">
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            availableDates={availableDates}
            className="border-0 shadow-xl"
          />
        </div>
      )}
    </div>
  );
};