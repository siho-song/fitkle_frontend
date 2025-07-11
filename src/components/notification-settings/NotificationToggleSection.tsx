"use client";

import React from 'react';
import { useNotificationSettingsStore } from '@/store/notificationSettingsStore';
import SchoolIcon from '@mui/icons-material/School';
import ForumIcon from '@mui/icons-material/Forum';
import PaymentIcon from '@mui/icons-material/Payment';
import CampaignIcon from '@mui/icons-material/Campaign';
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';

export function NotificationToggleSection() {
  const { settings, updateCategorySetting, toggleGlobalNotifications } = useNotificationSettingsStore();

  const categories = [
    {
      key: 'lessons',
      title: '수업 관련',
      description: '예약, 변경, 취소, 리마인더 등',
      icon: <SchoolIcon className="text-blue-600" sx={{ fontSize: 24 }} />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      key: 'community',
      title: '커뮤니티',
      description: '댓글, 좋아요, 멘션, 새 글 등',
      icon: <ForumIcon className="text-green-600" sx={{ fontSize: 24 }} />,
      color: 'bg-green-50 border-green-200'
    },
    {
      key: 'payments',
      title: '결제 및 환불',
      description: '결제 완료, 환불 처리, 영수증 등',
      icon: <PaymentIcon className="text-purple-600" sx={{ fontSize: 24 }} />,
      color: 'bg-purple-50 border-purple-200'
    },
    {
      key: 'marketing',
      title: '마케팅 및 이벤트',
      description: '할인 쿠폰, 이벤트, 신규 서비스 등',
      icon: <CampaignIcon className="text-orange-600" sx={{ fontSize: 24 }} />,
      color: 'bg-orange-50 border-orange-200'
    },
    {
      key: 'system',
      title: '시스템 알림',
      description: '업데이트, 점검, 보안 관련 등',
      icon: <SystemUpdateIcon className="text-gray-600" sx={{ fontSize: 24 }} />,
      color: 'bg-gray-50 border-gray-200'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">알림 카테고리</h2>
          <p className="text-gray-600">받고 싶은 알림의 종류를 선택하세요.</p>
        </div>
        
        {/* 전체 알림 토글 */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">전체 알림</span>
          <button
            onClick={toggleGlobalNotifications}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.globalEnabled ? 'bg-primary' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.globalEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          {settings.globalEnabled ? (
            <NotificationsIcon className="text-primary" sx={{ fontSize: 20 }} />
          ) : (
            <NotificationsOffIcon className="text-gray-400" sx={{ fontSize: 20 }} />
          )}
        </div>
      </div>

      {/* 카테고리별 설정 */}
      <div className="space-y-4">
        {categories.map((category) => {
          const categorySettings = settings[category.key as keyof typeof settings];
          const isEnabled = typeof categorySettings === 'object' && 'enabled' in categorySettings 
            ? categorySettings.enabled 
            : false;

          return (
            <div 
              key={category.key} 
              className={`p-4 rounded-xl border-2 transition-all ${
                isEnabled && settings.globalEnabled
                  ? category.color 
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{category.title}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => updateCategorySetting(category.key as any, 'enabled', !isEnabled)}
                  disabled={!settings.globalEnabled}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    isEnabled ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 전체 알림 비활성화 시 안내 */}
      {!settings.globalEnabled && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2">
            <NotificationsOffIcon className="text-yellow-600" sx={{ fontSize: 20 }} />
            <span className="text-yellow-800 font-medium">
              전체 알림이 비활성화되어 있습니다. 모든 알림을 받지 않습니다.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}