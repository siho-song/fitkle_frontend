"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useOrdersStore, OrderStatus, OrderItem } from '@/store/ordersStore';
import { OrderCard } from './OrderCard';
import { ReviewModal } from './ReviewModal';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

interface OrdersListProps {
  statusFilter: 'all' | OrderStatus;
}

export function OrdersList({ statusFilter }: OrdersListProps) {
  const { orders } = useOrdersStore();
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  const filteredOrders = orders.filter(order => {
    if (statusFilter === 'all') return true;
    return order.status === statusFilter;
  });

  const handleWriteReview = (order: OrderItem) => {
    setSelectedOrder(order);
    setReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setReviewModalOpen(false);
    setSelectedOrder(null);
  };

  if (filteredOrders.length === 0) {
    const getEmptyMessage = () => {
      switch (statusFilter) {
        case 'pending':
          return '결제 대기 중인 주문이 없습니다.';
        case 'confirmed':
          return '예약 확정된 주문이 없습니다.';
        case 'in_progress':
          return '진행 중인 세션이 없습니다.';
        case 'completed':
          return '완료된 세션이 없습니다.';
        case 'cancelled':
          return '취소된 주문이 없습니다.';
        default:
          return '주문 내역이 없습니다.';
      }
    };

    return (
      <div className="text-center py-16">
        <ShoppingBagIcon className="mx-auto text-gray-300 mb-4" sx={{ fontSize: 64 }} />
        <h3 className="text-xl font-semibold text-gray-500 mb-2">{getEmptyMessage()}</h3>
        <p className="text-gray-400 mb-6">튜터를 예약하고 새로운 스킬을 배워보세요!</p>
        <Link 
          href="/tutors"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          튜터 찾기
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">
            {statusFilter === 'all' ? '전체 주문' : 
             statusFilter === 'pending' ? '결제 대기' :
             statusFilter === 'confirmed' ? '예약 확정' :
             statusFilter === 'in_progress' ? '진행 중' :
             statusFilter === 'completed' ? '완료된 세션' :
             statusFilter === 'cancelled' ? '취소된 주문' : '주문 내역'} 
            ({filteredOrders.length}건)
          </h2>
        </div>

        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard 
              key={order.id} 
              order={order} 
              onWriteReview={handleWriteReview}
            />
          ))}
        </div>
      </div>

      {/* 리뷰 작성 모달 */}
      {reviewModalOpen && selectedOrder && (
        <ReviewModal
          order={selectedOrder}
          onClose={handleCloseReviewModal}
        />
      )}
    </>
  );
}