"use client";

import React from 'react';
import { useOrdersStore } from '@/store/ordersStore';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export function OrdersStats() {
  const { orders, getTotalSpent, getCompletedOrdersCount } = useOrdersStore();

  const stats = [
    {
      title: '총 주문',
      value: orders.length,
      unit: '건',
      icon: <CalendarTodayIcon />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: '완료된 세션',
      value: getCompletedOrdersCount(),
      unit: '건',
      icon: <CheckCircleIcon />,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: '총 지출',
      value: getTotalSpent().toLocaleString(),
      unit: '원',
      icon: <MonetizationOnIcon />,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: '이번 달 세션',
      value: orders.filter(order => {
        const orderDate = new Date(order.orderDate);
        const now = new Date();
        return orderDate.getMonth() === now.getMonth() && 
               orderDate.getFullYear() === now.getFullYear();
      }).length,
      unit: '건',
      icon: <TrendingUpIcon />,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
              <span className={stat.color}>
                {stat.icon}
              </span>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                {stat.value}
              </span>
              <span className="text-sm text-gray-500">{stat.unit}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}