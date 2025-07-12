"use client";

import React, { useState } from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { FriendInviteForm } from '@/components/friend-invite/FriendInviteForm';
import { FriendInviteStats } from '@/components/friend-invite/FriendInviteStats';
import { FriendInviteHistory } from '@/components/friend-invite/FriendInviteHistory';
import { useFriendInviteStore } from '@/store/friendInviteStore';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShareIcon from '@mui/icons-material/Share';
import GiftIcon from '@mui/icons-material/CardGiftcard';

export const FriendInviteScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'invite' | 'history'>('invite');
  const { inviteCode, generateInviteCode } = useFriendInviteStore();

  const tabs = [
    {
      id: 'invite' as const,
      name: '친구 초대',
      icon: <PersonAddIcon sx={{ fontSize: 20 }} />,
    },
    {
      id: 'history' as const,
      name: '초대 내역',
      icon: <ShareIcon sx={{ fontSize: 20 }} />,
    }
  ];

  return (
    <MainLayout disableContainer={false}>
      <div className="py-8">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <GiftIcon className="text-primary" sx={{ fontSize: 32 }} />
              <h1 className="text-3xl font-bold text-gray-900">친구 초대</h1>
            </div>
            <p className="text-gray-600">친구를 초대하고 함께 배움의 여정을 시작하세요! 초대받은 친구가 가입하면 둘 다 혜택을 받을 수 있어요.</p>
          </div>

          {/* 혜택 안내 */}
          <div className="bg-gradient-to-r from-primary/10 to-blue-50 rounded-2xl p-6 mb-8 border border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <GiftIcon className="text-primary" sx={{ fontSize: 24 }} />
              <h2 className="text-xl font-bold text-gray-900">초대 혜택</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">🎁 초대한 나에게</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 5,000원 크레딧 적립</li>
                  <li>• 추가 무료 수업 1회</li>
                  <li>• VIP 등급 포인트 100점</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">🎊 초대받은 친구에게</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 10,000원 신규 가입 크레딧</li>
                  <li>• 첫 수업 50% 할인 쿠폰</li>
                  <li>• 프리미엄 기능 1개월 무료</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 통계 */}
          <FriendInviteStats />

          {/* 탭 네비게이션 */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.icon}
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* 탭 콘텐츠 */}
          <div className="min-h-[400px]">
            {activeTab === 'invite' ? (
              <FriendInviteForm />
            ) : (
              <FriendInviteHistory />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};