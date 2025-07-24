"use client";

import React, { useState } from 'react';
import { TutorItem, TutorService } from '@/types/entities/tutor';
import { useRouter } from 'next/navigation';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChatIcon from '@mui/icons-material/Chat';
import { DatePicker } from '@/components/common/DatePicker';
import { formatResponseTime } from '@/utils/formatResponseTime';
import { ConsultationModal } from '@/components/modals/ConsultationModal';

interface TutorDetailBookingProps {
  tutor: TutorItem;
}

export function TutorDetailBooking({ tutor }: TutorDetailBookingProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionCount, setSessionCount] = useState(1);
  const [sessionType, setSessionType] = useState<'single' | 'package'>('single');
  const [selectedService, setSelectedService] = useState<TutorService | null>(null);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const router = useRouter();

  // 첫 번째 활성 서비스를 기본으로 선택
  React.useEffect(() => {
    if (tutor.services && tutor.services.length > 0 && !selectedService) {
      const activeService = tutor.services.find(service => service.isActive);
      setSelectedService(activeService || tutor.services[0]);
    }
  }, [tutor.services, selectedService]);

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('날짜와 시간을 선택해주세요.');
      return;
    }
    
    // 예약 페이지로 이동
    const params = new URLSearchParams({
      tutorId: tutor.id,
      serviceId: selectedService?.id || '',
      date: selectedDate,
      time: selectedTime,
      sessionCount: sessionCount.toString(),
      sessionType,
      totalPrice: calculateTotalPrice().toString()
    });
    
    router.push(`/booking?${params.toString()}`);
  };

  const calculateTotalPrice = () => {
    if (!selectedService) return 0;
    const basePrice = selectedService.price * sessionCount;
    if (sessionType === 'package' && sessionCount >= 4) {
      return Math.floor(basePrice * 0.9); // 10% 할인
    }
    return basePrice;
  };

  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return `${hours}시간`;
      }
      return `${hours}시간 ${remainingMinutes}분`;
    }
    return `${minutes}분`;
  };

  const getAvailableDates = () => {
    const dates = [];
    // 다음 30일 동안의 날짜 중 튜터가 가능한 날짜만 필터링
    for (let i = 1; i <= 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dayOfWeek = date.toLocaleDateString('en', { weekday: 'short' }).toLowerCase();
      
      const dayMap: { [key: string]: keyof typeof tutor.availability } = {
        'sun': 'sun', 'mon': 'mon', 'tue': 'tue', 'wed': 'wed', 
        'thu': 'thu', 'fri': 'fri', 'sat': 'sat'
      };
      
      // 해당 요일에 가능한 시간이 있는지 확인
      const availableTimes = tutor.availability[dayMap[dayOfWeek]];
      if (availableTimes && availableTimes.length > 0) {
        dates.push(date.toISOString().split('T')[0]);
      }
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

  const activeServices = tutor.services?.filter(service => service.isActive) || [];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-8">
      {/* 서비스 선택 */}
      {activeServices.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">서비스 선택</label>
          <div className="space-y-2">
            {activeServices.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedService?.id === service.id
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm opacity-80">
                      {formatDuration(service.duration)} • {service.description}
                    </div>
                  </div>
                  <div className="font-bold">
                    {service.price.toLocaleString()}원
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

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
        <DatePicker
          selectedDate={selectedDate}
          onDateSelect={(date) => {
            setSelectedDate(date);
            setSelectedTime(''); // 시간 초기화
          }}
          availableDates={getAvailableDates()}
          placeholder="날짜를 선택하세요"
        />
      </div>

      {/* 시간 선택 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-1">
          <AccessTimeIcon sx={{ fontSize: 16 }} />
          시간 선택
        </label>
        {!selectedDate ? (
          <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 text-center">
            먼저 날짜를 선택해주세요
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {getAvailableTimes(selectedDate).length === 0 ? (
              <div className="col-span-3 p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 text-center">
                선택한 날짜에 가능한 시간이 없습니다
              </div>
            ) : (
              getAvailableTimes(selectedDate).map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    selectedTime === time
                      ? 'bg-primary text-white border-primary shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-primary hover:text-white hover:border-primary'
                  }`}
                >
                  {time}
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* 총 가격 */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">총 금액</span>
          <span className="text-xl font-bold text-primary">
            {calculateTotalPrice().toLocaleString()}원
          </span>
        </div>
        {sessionType === 'package' && sessionCount >= 4 && selectedService && (
          <div className="text-sm text-green-600 mt-1">
            패키지 할인 적용 (-{(selectedService.price * sessionCount * 0.1).toLocaleString()}원)
          </div>
        )}
        {selectedService && (
          <div className="text-xs text-gray-500 mt-1">
            {selectedService.name} • {formatDuration(selectedService.duration)}
          </div>
        )}
      </div>

      {/* 버튼들 */}
      <div className="space-y-3">
        {/* 사전상담 버튼 */}
        <button
          onClick={() => setIsConsultationModalOpen(true)}
          disabled={!selectedService}
          className="w-full border-2 border-primary text-primary py-4 rounded-lg font-bold text-lg hover:bg-primary hover:text-white transition-colors disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <ChatIcon sx={{ fontSize: 20 }} />
          사전상담하기
        </button>
        
        {/* 예약 버튼 */}
        <button
          onClick={handleBooking}
          disabled={!selectedDate || !selectedTime || !selectedService}
          className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          수업 예약하기
        </button>
      </div>


      {/* 응답 시간 안내 */}
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <div className="text-sm text-blue-800">
          <strong>{formatResponseTime(tutor.responseTime)}</strong>
        </div>
        <div className="text-xs text-blue-600 mt-1">
          보통 빠른 시간 내에 답변드립니다.
        </div>
      </div>

      {/* 상담 모달 */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        tutor={tutor}
        selectedService={selectedService}
      />
    </div>
  );
}