"use client";

import React from 'react';
import { useFriendInviteStore } from '@/store/friendInviteStore';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PendingIcon from '@mui/icons-material/Pending';

export function FriendInviteStats() {
  const { totalInvites, successfulInvites, earnedCredits, pendingInvites } = useFriendInviteStore();

  const stats = [
    {
      title: '총 초대',
      value: totalInvites,
      unit: '명',
      icon: <PersonAddIcon />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: '가입 완료',
      value: successfulInvites,
      unit: '명',
      icon: <CheckCircleIcon />,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: '대기 중',
      value: pendingInvites.length,
      unit: '명',
      icon: <PendingIcon />,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      title: '적립 크레딧',
      value: earnedCredits.toLocaleString(),
      unit: '원',
      icon: <AttachMoneyIcon />,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
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