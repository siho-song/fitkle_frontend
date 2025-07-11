"use client";

import React from 'react';
import { useNotificationSettingsStore } from '@/store/notificationSettingsStore';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import SendIcon from '@mui/icons-material/Send';

export function NotificationChannelSection() {
  const { settings, updateCategorySetting } = useNotificationSettingsStore();

  const channels = [
    {
      key: 'email',
      title: '이메일',
      description: '이메일로 알림을 받습니다',
      icon: <EmailIcon className="text-blue-600" sx={{ fontSize: 24 }} />,
      color: 'bg-blue-50'
    },
    {
      key: 'push',
      title: '푸시 알림',
      description: '모바일 앱으로 알림을 받습니다',
      icon: <PhoneIphoneIcon className="text-green-600" sx={{ fontSize: 24 }} />,
      color: 'bg-green-50'
    },
    {
      key: 'browser',
      title: '브라우저 알림',
      description: '웹 브라우저로 알림을 받습니다',
      icon: <DesktopWindowsIcon className="text-purple-600" sx={{ fontSize: 24 }} />,
      color: 'bg-purple-50'
    }
  ];

  const categories = [
    { key: 'lessons', title: '수업 관련' },
    { key: 'community', title: '커뮤니티' },
    { key: 'payments', title: '결제 및 환불' },
    { key: 'marketing', title: '마케팅' },
    { key: 'system', title: '시스템' }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <SendIcon className="text-primary" sx={{ fontSize: 24 }} />
        <div>
          <h2 className="text-xl font-bold text-gray-900">알림 채널</h2>
          <p className="text-gray-600">각 카테고리별로 어떤 방식으로 알림을 받을지 설정하세요.</p>
        </div>
      </div>

      {/* 전체 알림이 비활성화된 경우 */}
      {!settings.globalEnabled && (
        <div className="text-center py-8 text-gray-500">
          <p>전체 알림이 비활성화되어 있습니다.</p>
          <p className="text-sm">알림 카테고리에서 전체 알림을 활성화해주세요.</p>
        </div>
      )}

      {settings.globalEnabled && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">카테고리</th>
                {channels.map(channel => (
                  <th key={channel.key} className="text-center py-3 px-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className={`p-2 rounded-lg ${channel.color}`}>
                        {channel.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{channel.title}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map(category => {
                const categorySettings = settings[category.key as keyof typeof settings];
                const isCategoryEnabled = typeof categorySettings === 'object' && 'enabled' in categorySettings 
                  ? categorySettings.enabled 
                  : false;

                return (
                  <tr 
                    key={category.key} 
                    className={`border-b border-gray-100 ${
                      !isCategoryEnabled ? 'opacity-50' : ''
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{category.title}</div>
                      {!isCategoryEnabled && (
                        <div className="text-xs text-gray-500">비활성화됨</div>
                      )}
                    </td>
                    {channels.map(channel => {
                      const isChannelEnabled = typeof categorySettings === 'object' && 
                        channel.key in categorySettings 
                        ? categorySettings[channel.key as keyof typeof categorySettings]
                        : false;

                      return (
                        <td key={channel.key} className="py-4 px-4 text-center">
                          <button
                            onClick={() => updateCategorySetting(
                              category.key as any, 
                              channel.key, 
                              !isChannelEnabled
                            )}
                            disabled={!isCategoryEnabled}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                              isChannelEnabled ? 'bg-primary' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                isChannelEnabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 테스트 알림 버튼 */}
      {settings.globalEnabled && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">테스트 알림</h3>
              <p className="text-sm text-gray-600">설정이 제대로 작동하는지 확인해보세요</p>
            </div>
            <button
              onClick={() => {
                // 실제로는 테스트 알림 발송
                alert('테스트 알림이 발송되었습니다! 설정된 채널로 알림을 확인해보세요.');
              }}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              테스트 알림 보내기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}