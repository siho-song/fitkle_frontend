"use client";

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { OrdersList } from '@/components/orders/OrdersList';
import { OrdersStats } from '@/components/orders/OrdersStats';
import { useOrdersStore, OrderStatus } from '@/store/ordersStore';
import { sampleOrders } from '@/data/sampleOrders';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CancelIcon from '@mui/icons-material/Cancel';
import RefreshIcon from '@mui/icons-material/Refresh';

export const OrdersScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | OrderStatus>('all');
  const { orders, addOrder } = useOrdersStore();
  const [isInitialized, setIsInitialized] = useState(false);

  // 샘플 데이터 로드 (개발용)
  useEffect(() => {
    if (!isInitialized && orders.length === 0) {
      sampleOrders.forEach(order => {
        const { id, orderDate, ...orderData } = order;
        addOrder(orderData);
      });
      setIsInitialized(true);
    }
  }, [orders.length, addOrder, isInitialized]);

  const getOrdersCount = (status: OrderStatus | 'all') => {
    if (status === 'all') return orders.length;
    return orders.filter(order => order.status === status).length;
  };

  const tabs = [
    {
      id: 'all' as const,
      name: '전체',
      icon: <ShoppingBagIcon />,
      count: getOrdersCount('all'),
      color: 'text-gray-600'
    },
    {
      id: 'pending' as const,
      name: '결제대기',
      icon: <PendingIcon />,
      count: getOrdersCount('pending'),
      color: 'text-orange-500'
    },
    {
      id: 'confirmed' as const,
      name: '예약확정',
      icon: <CheckCircleIcon />,
      count: getOrdersCount('confirmed'),
      color: 'text-blue-500'
    },
    {
      id: 'in_progress' as const,
      name: '진행중',
      icon: <PlayArrowIcon />,
      count: getOrdersCount('in_progress'),
      color: 'text-purple-500'
    },
    {
      id: 'completed' as const,
      name: '완료',
      icon: <CheckCircleIcon />,
      count: getOrdersCount('completed'),
      color: 'text-green-500'
    },
    {
      id: 'cancelled' as const,
      name: '취소',
      icon: <CancelIcon />,
      count: getOrdersCount('cancelled'),
      color: 'text-red-500'
    }
  ];

  return (
    <MainLayout>
      <div className="py-8">
        <div className="max-w-6xl mx-auto">
          {/* 헤더 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <ShoppingBagIcon className="text-primary" sx={{ fontSize: 32 }} />
              <h1 className="text-3xl font-bold text-gray-900">구매 관리</h1>
            </div>
            <p className="text-gray-600">튜터링 예약 내역과 진행 상황을 확인하세요.</p>
          </div>

          {/* 통계 카드 */}
          <OrdersStats />

          {/* 탭 네비게이션 */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className={activeTab === tab.id ? 'text-primary' : tab.color}>
                      {tab.icon}
                    </span>
                    {tab.name}
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      activeTab === tab.id 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* 주문 목록 */}
          <div className="min-h-[400px]">
            <OrdersList statusFilter={activeTab} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};