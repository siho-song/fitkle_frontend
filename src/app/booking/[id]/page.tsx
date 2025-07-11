"use client";

import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { useParams } from 'next/navigation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PhoneIcon from '@mui/icons-material/Phone';

export default function BookingDetailPage() {
  const params = useParams();
  const bookingId = params.id;

  // 테스트용 예약 데이터
  const bookingData = {
    id: bookingId,
    status: 'confirmed',
    tutorName: '이기타',
    tutorAvatar: '🎸',
    tutorPhone: '010-1234-5678',
    serviceName: '기타 F코드 정복 1:1 레슨',
    serviceCategory: '악기',
    price: 35000,
    duration: '1시간',
    scheduledAt: '2024-07-11 15:00',
    location: '온라인 (Zoom)',
    notes: 'F코드 연주가 어려워서 신청했습니다. 차근차근 알려주세요!',
    confirmedAt: '2024-07-10 14:55'
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 py-8">
          {/* 헤더 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircleIcon className="text-green-500 text-3xl" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">예약 확정</h1>
                <p className="text-gray-600">예약번호: #{bookingId}</p>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">
                ✅ 튜터가 예약을 확정했습니다! 예정된 시간에 레슨을 받으세요.
              </p>
            </div>
          </div>

          {/* 튜터 정보 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">튜터 정보</h2>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-primary/20 rounded-full flex items-center justify-center text-2xl">
                {bookingData.tutorAvatar}
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{bookingData.tutorName}</h3>
                <p className="text-gray-600">{bookingData.serviceCategory} 전문가</p>
                <div className="flex items-center gap-2 mt-2">
                  <PhoneIcon className="text-gray-400" sx={{ fontSize: 16 }} />
                  <span className="text-sm text-gray-600">{bookingData.tutorPhone}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                📱 연락하기
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                💬 메시지
              </button>
            </div>
          </div>

          {/* 레슨 정보 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">레슨 정보</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{bookingData.serviceName}</h3>
                <p className="text-gray-600 text-sm">{bookingData.duration} • {bookingData.price.toLocaleString()}원</p>
              </div>

              <div className="flex items-center gap-2">
                <AccessTimeIcon className="text-gray-400" sx={{ fontSize: 18 }} />
                <div>
                  <p className="font-medium text-gray-900">{bookingData.scheduledAt}</p>
                  <p className="text-sm text-gray-600">확정시간: {bookingData.confirmedAt}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <VideoCallIcon className="text-gray-400" sx={{ fontSize: 18 }} />
                <div>
                  <p className="font-medium text-gray-900">{bookingData.location}</p>
                  <p className="text-sm text-gray-600">레슨 시작 10분 전에 링크를 보내드립니다</p>
                </div>
              </div>

              {bookingData.notes && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">요청사항</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{bookingData.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* 준비사항 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">레슨 준비사항</h2>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div>
                  <p className="font-medium text-gray-900">기타 준비</p>
                  <p className="text-sm text-gray-600">어쿠스틱 기타나 일렉기타 모두 가능합니다</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <div>
                  <p className="font-medium text-gray-900">온라인 환경 점검</p>
                  <p className="text-sm text-gray-600">카메라, 마이크, 인터넷 연결을 미리 확인해주세요</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <div>
                  <p className="font-medium text-gray-900">조용한 공간</p>
                  <p className="text-sm text-gray-600">집중할 수 있는 조용한 환경에서 레슨을 받으세요</p>
                </div>
              </div>
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex gap-3">
            <button className="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors">
              예약 취소
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              일정 변경 요청
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}