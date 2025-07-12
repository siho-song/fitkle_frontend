"use client";

import React, { useState, useEffect } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface CalendarProps {
  selectedDate?: string;
  onDateSelect: (date: string) => void;
  availableDates?: string[]; // ISO format dates that are available
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  availableDates = [],
  minDate = new Date(),
  maxDate,
  className = ""
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(new Date(selectedDate));
    }
  }, [selectedDate]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateAvailable = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    
    // 과거 날짜는 선택 불가
    if (date < minDate) return false;
    
    // maxDate 체크
    if (maxDate && date > maxDate) return false;
    
    // availableDates가 제공되면 해당 날짜들만 선택 가능
    if (availableDates.length > 0) {
      return availableDates.includes(dateString);
    }
    
    // 기본적으로 내일부터 30일 후까지만 선택 가능
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const maxSelectableDate = new Date();
    maxSelectableDate.setDate(maxSelectableDate.getDate() + 30);
    
    return date >= tomorrow && date <= maxSelectableDate;
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    const dateString = date.toISOString().split('T')[0];
    return selectedDate === dateString;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const handleDateClick = (date: Date) => {
    if (isDateAvailable(date)) {
      const dateString = date.toISOString().split('T')[0];
      onDateSelect(dateString);
    }
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // 이전 달의 빈 공간
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-10 w-10"></div>
      );
    }

    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isAvailable = isDateAvailable(date);
      const isSelected = isDateSelected(date);
      const isTodayDate = isToday(date);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          disabled={!isAvailable}
          className={`
            h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200
            ${isSelected 
              ? 'bg-primary text-white shadow-md' 
              : isAvailable 
                ? 'hover:bg-primary hover:text-white text-gray-700' 
                : 'text-gray-300 cursor-not-allowed'
            }
            ${isTodayDate && !isSelected ? 'ring-2 ring-primary ring-opacity-50' : ''}
            ${isAvailable ? 'hover:scale-105' : ''}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      {/* 달력 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeftIcon />
        </button>
        
        <h3 className="text-lg font-semibold text-gray-900">
          {currentMonth.getFullYear()}년 {monthNames[currentMonth.getMonth()]}
        </h3>
        
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRightIcon />
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>

      {/* 범례 */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-primary rounded"></div>
            <span>선택된 날짜</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 ring-2 ring-primary ring-opacity-50 rounded"></div>
            <span>오늘</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-300 rounded"></div>
            <span>선택 불가</span>
          </div>
        </div>
      </div>
    </div>
  );
};