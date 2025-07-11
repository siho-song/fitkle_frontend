"use client";

import React from 'react';
import { OrderItem, useOrdersStore } from '@/store/ordersStore';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import ReviewIcon from '@mui/icons-material/RateReview';
import CancelIcon from '@mui/icons-material/Cancel';
import ReceiptIcon from '@mui/icons-material/Receipt';

interface OrderCardProps {
  order: OrderItem;
  onWriteReview?: (order: OrderItem) => void;
}

export function OrderCard({ order, onWriteReview }: OrderCardProps) {
  const { updateOrderStatus, cancelOrder } = useOrdersStore();

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: '결제 대기', color: 'bg-orange-100 text-orange-800' },
      confirmed: { label: '예약 확정', color: 'bg-blue-100 text-blue-800' },
      in_progress: { label: '진행 중', color: 'bg-purple-100 text-purple-800' },
      completed: { label: '완료', color: 'bg-green-100 text-green-800' },
      cancelled: { label: '취소됨', color: 'bg-red-100 text-red-800' },
      refunded: { label: '환불됨', color: 'bg-gray-100 text-gray-800' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handleCancelOrder = () => {
    if (confirm('정말로 이 주문을 취소하시겠습니까?')) {
      cancelOrder(order.id, '사용자 요청');
    }
  };

  const handleCompleteSession = () => {
    updateOrderStatus(order.id, 'completed');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* 헤더 */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            {order.tutorAvatar ? (
              <img 
                src={order.tutorAvatar} 
                alt={order.tutorName} 
                className="w-full h-full object-cover"
              />
            ) : (
              <PersonIcon className="text-gray-500" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{order.tutorName}</h3>
            <p className="text-gray-500 flex items-center gap-1">
              <span>{order.categoryEmoji}</span>
              {order.category}
            </p>
          </div>
        </div>
        {getStatusBadge(order.status)}
      </div>

      {/* 세션 정보 */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <h4 className="font-medium text-gray-900 mb-2">{order.description}</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">세션 유형:</span>
            <span className="ml-2 font-medium">
              {order.sessionType === 'single' ? '단일 세션' : '패키지'}
            </span>
          </div>
          <div>
            <span className="text-gray-500">세션 수:</span>
            <span className="ml-2 font-medium">{order.sessions}회</span>
          </div>
          <div>
            <span className="text-gray-500">회당 가격:</span>
            <span className="ml-2 font-medium">{order.pricePerSession.toLocaleString()}원</span>
          </div>
          <div>
            <span className="text-gray-500">총 금액:</span>
            <span className="ml-2 font-medium text-primary">
              {order.totalPrice.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>

      {/* 예약 일정 */}
      {order.scheduledDate && (
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <CalendarTodayIcon sx={{ fontSize: 16 }} />
            {new Date(order.scheduledDate).toLocaleDateString('ko-KR')}
          </div>
          {order.scheduledTime && (
            <div className="flex items-center gap-1">
              <AccessTimeIcon sx={{ fontSize: 16 }} />
              {order.scheduledTime}
            </div>
          )}
        </div>
      )}

      {/* 리뷰 섹션 */}
      {order.review && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <StarIcon className="text-yellow-500" sx={{ fontSize: 18 }} />
            <span className="font-medium">리뷰 작성됨</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  sx={{ fontSize: 16 }}
                  className={i < order.review!.rating ? 'text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-700 text-sm">{order.review.comment}</p>
          <p className="text-xs text-gray-500 mt-2">
            {new Date(order.review.createdAt).toLocaleDateString('ko-KR')}
          </p>
        </div>
      )}

      {/* 주문 정보 */}
      <div className="text-xs text-gray-500 mb-4">
        주문일: {new Date(order.orderDate).toLocaleDateString('ko-KR')} |
        결제방법: {order.paymentMethod === 'card' ? '카드' : 
                 order.paymentMethod === 'transfer' ? '계좌이체' : '카카오페이'}
        {order.notes && (
          <>
            <br />
            메모: {order.notes}
          </>
        )}
      </div>

      {/* 액션 버튼들 */}
      <div className="flex gap-2 flex-wrap">
        {order.status === 'pending' && (
          <button
            onClick={handleCancelOrder}
            className="flex items-center gap-1 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm"
          >
            <CancelIcon sx={{ fontSize: 16 }} />
            주문 취소
          </button>
        )}

        {order.status === 'in_progress' && (
          <button
            onClick={handleCompleteSession}
            className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
          >
            세션 완료
          </button>
        )}

        {order.status === 'completed' && !order.review && onWriteReview && (
          <button
            onClick={() => onWriteReview(order)}
            className="flex items-center gap-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
          >
            <ReviewIcon sx={{ fontSize: 16 }} />
            리뷰 작성
          </button>
        )}

        {order.receiptUrl && (
          <button
            onClick={() => window.open(order.receiptUrl, '_blank')}
            className="flex items-center gap-1 px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <ReceiptIcon sx={{ fontSize: 16 }} />
            영수증
          </button>
        )}
      </div>
    </div>
  );
}