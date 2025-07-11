"use client";

import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { NotificationToggleSection } from '@/components/notification-settings/NotificationToggleSection';
import { NotificationFrequencySection } from '@/components/notification-settings/NotificationFrequencySection';
import { NotificationChannelSection } from '@/components/notification-settings/NotificationChannelSection';
import { NotificationPreview } from '@/components/notification-settings/NotificationPreview';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

export const NotificationSettingsScreen: React.FC = () => {
  return (
    <MainLayout>
      <div className="py-8">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <SettingsIcon className="text-primary" sx={{ fontSize: 32 }} />
              <h1 className="text-3xl font-bold text-gray-900">알림 설정</h1>
            </div>
            <p className="text-gray-600">
              중요한 소식을 놓치지 않도록 알림을 설정하세요. 언제든지 변경할 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 메인 설정 영역 */}
            <div className="lg:col-span-2 space-y-8">
              {/* 알림 ON/OFF 설정 */}
              <NotificationToggleSection />
              
              {/* 알림 빈도 설정 */}
              <NotificationFrequencySection />
              
              {/* 알림 채널 설정 */}
              <NotificationChannelSection />
            </div>

            {/* 미리보기 및 도움말 */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <NotificationPreview />
                
                {/* 도움말 */}
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                  <div className="flex items-center gap-2 mb-3">
                    <NotificationsIcon className="text-blue-600" sx={{ fontSize: 20 }} />
                    <h3 className="font-bold text-blue-900">알림 도움말</h3>
                  </div>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>• 실시간 알림은 중요한 이벤트에만 발송됩니다</li>
                    <li>• 요약 알림은 하루/주간 단위로 모아서 발송됩니다</li>
                    <li>• 브라우저 알림은 사이트가 열려있을 때만 표시됩니다</li>
                    <li>• 이메일 알림은 언제든지 수신거부 가능합니다</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};