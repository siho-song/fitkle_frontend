"use client";

import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { useParams } from 'next/navigation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id;

  // 테스트용 주문 데이터
  const orderData = {
    id: orderId,
    status: 'completed',
    tutorName: '이기타',
    tutorAvatar: '🎸',
    serviceName: '기타 F코드 정복 1:1 레슨',
    serviceCategory: '악기',
    price: 35000,
    duration: '1시간',
    scheduledAt: '2024-07-10 15:00',
    completedAt: '2024-07-10 16:00',
    paymentMethod: '카드',
    paymentAt: '2024-07-10 14:25'
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
                <h1 className="text-xl font-bold text-gray-900">주문 완료</h1>
                <p className="text-gray-600">주문번호: #{orderId}</p>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">
                🎉 레슨이 성공적으로 완료되었습니다!
              </p>
            </div>
          </div>

          {/* 서비스 정보 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">서비스 정보</h2>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-primary/20 rounded-full flex items-center justify-center text-xl">
                {orderData.tutorAvatar}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{orderData.serviceName}</h3>
                <p className="text-gray-600 text-sm mb-2">{orderData.serviceCategory} • {orderData.duration}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <PersonIcon sx={{ fontSize: 16 }} />
                  <span>{orderData.tutorName} 튜터</span>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">
                  {orderData.price.toLocaleString()}원
                </p>
              </div>
            </div>
          </div>

          {/* 일정 정보 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">일정 정보</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AccessTimeIcon className="text-gray-400" sx={{ fontSize: 18 }} />
                  <span className="text-gray-600">예약 시간</span>
                </div>
                <span className="font-medium">{orderData.scheduledAt}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="text-green-500" sx={{ fontSize: 18 }} />
                  <span className="text-gray-600">완료 시간</span>
                </div>
                <span className="font-medium">{orderData.completedAt}</span>
              </div>
            </div>
          </div>

          {/* 결제 정보 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">결제 정보</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PaymentIcon className="text-gray-400" sx={{ fontSize: 18 }} />
                  <span className="text-gray-600">결제 방법</span>
                </div>
                <span className="font-medium">{orderData.paymentMethod}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">결제 시간</span>
                <span className="font-medium">{orderData.paymentAt}</span>
              </div>
              
              <hr className="border-gray-200" />
              
              <div className="flex items-center justify-between text-lg">
                <span className="font-semibold text-gray-900">총 결제 금액</span>
                <span className="font-bold text-primary">
                  {orderData.price.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex gap-3">
            <button className="flex-1 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              리뷰 작성하기
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              다시 예약하기
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}