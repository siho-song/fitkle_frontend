"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTutorsStore } from '@/store/tutorsStore';
import { useUserStore } from '@/store/userStore';
import { TutorItem } from '@/types/entities/tutor';
import { formatResponseTime } from '@/utils/formatResponseTime';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SchoolIcon from '@mui/icons-material/School';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tutor, setTutor] = useState<TutorItem | null>(null);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { tutors } = useTutorsStore();
  const { user, initializeSampleUser } = useUserStore();

  // URL 파라미터에서 예약 정보 추출
  const tutorId = searchParams.get('tutorId');
  const selectedDate = searchParams.get('date');
  const selectedTime = searchParams.get('time');
  const sessionCount = parseInt(searchParams.get('sessionCount') || '1');
  const sessionType = searchParams.get('sessionType') as 'single' | 'package';
  const totalPrice = parseInt(searchParams.get('totalPrice') || '0');

  useEffect(() => {
    if (tutorId) {
      const foundTutor = tutors.find(t => t.id === tutorId);
      setTutor(foundTutor || null);
    }
  }, [tutorId, tutors]);

  useEffect(() => {
    // 실제 서비스에서는 로그인된 사용자 정보를 자동으로 불러옴
    // 여기서는 샘플 사용자 정보로 테스트
    if (!user) {
      initializeSampleUser();
    } else {
      // 사용자 정보가 있으면 폼에 자동 입력
      setStudentName(user.name);
      setStudentEmail(user.email);
      setStudentPhone(user.phone);
    }
  }, [user, initializeSampleUser]);

  useEffect(() => {
    // 사용자 정보 변경 시 폼 업데이트
    if (user) {
      setStudentName(user.name);
      setStudentEmail(user.email);
      setStudentPhone(user.phone);
    }
  }, [user]);

  useEffect(() => {
    // 튜터의 상담 가이드로 특별 요청사항 초기화
    if (tutor?.consultationGuide) {
      setSpecialRequests(tutor.consultationGuide);
    }
  }, [tutor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentName || !studentEmail || !studentPhone) {
      alert('모든 필수 정보를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 실제로는 예약 API 호출
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('예약이 성공적으로 접수되었습니다!\n튜터가 확인 후 연락드릴 예정입니다.');
      router.push(`/tutor/${tutorId}`);
    } catch (error) {
      alert('예약 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">예약 정보를 불러오고 있습니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowBackIcon />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">수업 예약하기</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 예약 정보 요약 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-8">
              {/* 튜터 정보 */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {tutor.avatar ? (
                    <img 
                      src={tutor.avatar} 
                      alt={tutor.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <PersonIcon className="text-gray-500" sx={{ fontSize: 24 }} />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{tutor.name}</h3>
                  <p className="text-gray-600 flex items-center gap-1">
                    <span>{tutor.category.emoji}</span>
                    {tutor.category.name}
                  </p>
                </div>
              </div>

              {/* 예약 상세 정보 */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <CalendarTodayIcon sx={{ fontSize: 18 }} />
                  <span>{selectedDate && formatDate(selectedDate)}</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-700">
                  <AccessTimeIcon sx={{ fontSize: 18 }} />
                  <span>{selectedTime}</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-700">
                  <SchoolIcon sx={{ fontSize: 18 }} />
                  <span>{sessionCount}회 ({sessionType === 'package' ? '패키지' : '단일 세션'})</span>
                </div>
              </div>

              {/* 가격 정보 */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">수업료</span>
                  <span className="font-medium">
                    {(tutor.pricePerHour * sessionCount).toLocaleString()}원
                  </span>
                </div>
                
                {sessionType === 'package' && sessionCount >= 4 && (
                  <div className="flex justify-between items-center mb-2 text-sm">
                    <span className="text-green-600">패키지 할인</span>
                    <span className="text-green-600">
                      -{(tutor.pricePerHour * sessionCount * 0.1).toLocaleString()}원
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-center text-lg font-bold text-primary border-t border-gray-200 pt-2">
                  <span>총 금액</span>
                  <span className="flex items-center gap-1">
                    <AttachMoneyIcon sx={{ fontSize: 20 }} />
                    {totalPrice.toLocaleString()}원
                  </span>
                </div>
              </div>

              {/* 응답 시간 */}
              <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-800">
                  <strong>{formatResponseTime(tutor.responseTime)}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* 예약 폼 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">예약자 정보</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="이름을 입력하세요"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="이메일을 입력하세요"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    전화번호 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="전화번호를 입력하세요"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    특별 요청사항
                  </label>
                  <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="튜터에게 전달하고 싶은 내용이 있다면 작성해주세요 (선택사항)"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">예약 안내</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 예약 신청 후 튜터가 확인하여 최종 승인됩니다.</li>
                    <li>• 튜터의 응답을 기다려주세요.</li>
                    <li>• 예약 변경이나 취소는 수업 24시간 전까지 가능합니다.</li>
                    <li>• 문의사항이 있으시면 고객센터로 연락주세요.</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      예약 처리 중...
                    </div>
                  ) : (
                    '예약 신청하기'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}