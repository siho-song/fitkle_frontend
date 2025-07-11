"use client";

import React, { useState } from 'react';
import { TutorItem } from '@/store/tutorsStore';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MessageIcon from '@mui/icons-material/Message';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useFavoritesStore } from '@/store/favoritesStore';

interface TutorDetailBookingProps {
  tutor: TutorItem;
}

export function TutorDetailBooking({ tutor }: TutorDetailBookingProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionCount, setSessionCount] = useState(1);
  const [sessionType, setSessionType] = useState<'single' | 'package'>('single');
  const { favoriteTutors, addFavoriteTutor, removeFavoriteTutor } = useFavoritesStore();

  const isFavorite = favoriteTutors.some(fav => fav.id === tutor.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteTutor(tutor.id);
    } else {
      addFavoriteTutor({
        id: tutor.id,
        name: tutor.name,
        avatar: tutor.avatar,
        category: tutor.category,
        categoryEmoji: tutor.categoryEmoji,
        rating: tutor.rating,
        reviewCount: tutor.reviewCount,
        pricePerHour: tutor.pricePerHour,
        specialties: tutor.specialties,
        addedAt: new Date().toISOString()
      });
    }
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('날짜와 시간을 선택해주세요.');
      return;
    }
    
    // 실제로는 예약 API 호출
    alert(`예약이 요청되었습니다!\n날짜: ${selectedDate}\n시간: ${selectedTime}\n세션: ${sessionCount}회`);
  };

  const handleContactTutor = () => {
    // 실제로는 채팅/메시지 기능으로 연결
    alert('튜터에게 메시지를 보냅니다.');
  };

  const calculateTotalPrice = () => {
    const basePrice = tutor.pricePerHour * sessionCount;
    if (sessionType === 'package' && sessionCount >= 4) {
      return Math.floor(basePrice * 0.9); // 10% 할인
    }
    return basePrice;
  };

  const getNextWeekDates = () => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('ko-KR', { 
          month: 'short', 
          day: 'numeric',
          weekday: 'short' 
        })
      });
    }
    return dates;
  };

  const getAvailableTimes = (date: string) => {
    if (!date) return [];
    
    const dayOfWeek = new Date(date).toLocaleDateString('en', { weekday: 'short' }).toLowerCase();
    const dayMap: { [key: string]: keyof typeof tutor.availability } = {
      'sun': 'sun', 'mon': 'mon', 'tue': 'tue', 'wed': 'wed', 
      'thu': 'thu', 'fri': 'fri', 'sat': 'sat'
    };
    
    return tutor.availability[dayMap[dayOfWeek]] || [];
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-8">
      {/* 가격 정보 */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-primary flex items-center justify-center gap-1">
          <AttachMoneyIcon sx={{ fontSize: 32 }} />
          {tutor.pricePerHour.toLocaleString()}원
        </div>
        <div className="text-gray-600">/ 시간</div>
      </div>

      {/* 세션 타입 선택 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">수업 형태</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setSessionType('single')}
            className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
              sessionType === 'single'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            단일 세션
          </button>
          <button
            onClick={() => setSessionType('package')}
            className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
              sessionType === 'package'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            패키지
          </button>
        </div>
      </div>

      {/* 세션 수 선택 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">세션 수</label>
        <select
          value={sessionCount}
          onChange={(e) => setSessionCount(parseInt(e.target.value))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {[1, 2, 3, 4, 5, 6, 8, 10].map(count => (
            <option key={count} value={count}>
              {count}회 {count >= 4 && sessionType === 'package' && '(10% 할인)'}
            </option>
          ))}
        </select>
      </div>

      {/* 날짜 선택 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-1">
          <CalendarTodayIcon sx={{ fontSize: 16 }} />
          날짜 선택
        </label>
        <select
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedTime(''); // 시간 초기화
          }}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">날짜를 선택하세요</option>
          {getNextWeekDates().map(date => (
            <option key={date.value} value={date.value}>
              {date.label}
            </option>
          ))}
        </select>
      </div>

      {/* 시간 선택 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-1">
          <AccessTimeIcon sx={{ fontSize: 16 }} />
          시간 선택
        </label>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          disabled={!selectedDate}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">시간을 선택하세요</option>
          {getAvailableTimes(selectedDate).map(time => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      {/* 총 가격 */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">총 금액</span>
          <span className="text-xl font-bold text-primary">
            {calculateTotalPrice().toLocaleString()}원
          </span>
        </div>
        {sessionType === 'package' && sessionCount >= 4 && (
          <div className="text-sm text-green-600 mt-1">
            패키지 할인 적용 (-{(tutor.pricePerHour * sessionCount * 0.1).toLocaleString()}원)
          </div>
        )}
      </div>

      {/* 예약 버튼 */}
      <button
        onClick={handleBooking}
        disabled={!selectedDate || !selectedTime}
        className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mb-3"
      >
        수업 예약하기
      </button>

      {/* 추가 액션 버튼들 */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleContactTutor}
          className="flex items-center justify-center gap-2 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <MessageIcon sx={{ fontSize: 18 }} />
          문의하기
        </button>
        
        <button
          onClick={handleToggleFavorite}
          className={`flex items-center justify-center gap-2 py-3 rounded-lg transition-colors ${
            isFavorite
              ? 'bg-red-50 text-red-600 border border-red-200'
              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <BookmarkIcon sx={{ fontSize: 18 }} />
          {isFavorite ? '찜 해제' : '찜하기'}
        </button>
      </div>

      {/* 응답 시간 안내 */}
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <div className="text-sm text-blue-800">
          <strong>응답 시간:</strong> {tutor.responseTime}
        </div>
        <div className="text-xs text-blue-600 mt-1">
          보통 빠른 시간 내에 답변드립니다.
        </div>
      </div>
    </div>
  );
}