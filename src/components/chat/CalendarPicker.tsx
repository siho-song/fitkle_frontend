"use client";

import React, { useState, useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface CalendarPickerProps {
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
  availableDates: string[];
  onClose: () => void;
}

export function CalendarPicker({ 
  selectedDate, 
  onDateSelect, 
  availableDates, 
  onClose 
}: CalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (selectedDate) {
      return new Date(selectedDate);
    }
    if (availableDates.length > 0) {
      return new Date(availableDates[0]);
    }
    return new Date();
  });

  // ESC 키로 달력 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // 이전 달의 빈 칸들
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const formatLocalDate = (year: number, month: number, day: number) => {
    const monthStr = String(month + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${monthStr}-${dayStr}`;
  };

  const getDateString = (day: number) => {
    return formatLocalDate(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
  };

  const isDateAvailable = (day: number) => {
    return availableDates.includes(getDateString(day));
  };

  const isDateSelected = (day: number) => {
    return selectedDate === getDateString(day);
  };

  const handleDateClick = (day: number) => {
    const dateString = getDateString(day);
    
    if (availableDates.includes(dateString)) {
      onDateSelect(dateString);
    }
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-4 w-80">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <ArrowBackIosIcon sx={{ fontSize: 16 }} />
        </button>
        
        <h3 className="font-semibold text-gray-900">
          {currentMonth.getFullYear()}년 {monthNames[currentMonth.getMonth()]}
        </h3>
        
        <button
          onClick={goToNextMonth}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((dayName) => (
          <div
            key={dayName}
            className="h-8 flex items-center justify-center text-sm font-medium text-gray-500"
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="h-8" />;
          }

          const isAvailable = isDateAvailable(day);
          const isSelected = isDateSelected(day);
          const today = new Date();
          const isToday = today.getFullYear() === currentMonth.getFullYear() &&
                         today.getMonth() === currentMonth.getMonth() &&
                         today.getDate() === day;

          return (
            <button
              key={`day-${day}`}
              onClick={() => handleDateClick(day)}
              disabled={!isAvailable}
              className={`
                h-8 w-8 flex items-center justify-center text-sm rounded transition-colors
                ${isSelected
                  ? 'bg-primary text-white font-semibold'
                  : isToday
                  ? 'ring-2 ring-primary ring-opacity-50'
                  : isAvailable
                  ? 'hover:bg-primary hover:text-white text-gray-900'
                  : 'text-gray-300 cursor-not-allowed'
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* 범례 정보 */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-end gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-primary rounded flex-shrink-0"></div>
            <span>선택된 날짜</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border-2 border-primary border-opacity-50 rounded flex-shrink-0"></div>
            <span>오늘 날짜</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-300 rounded flex-shrink-0"></div>
            <span>선택 불가</span>
          </div>
        </div>
      </div>

    </div>
  );
}