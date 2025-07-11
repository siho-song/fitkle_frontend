"use client";

import React from 'react';
import { useNotificationSettingsStore } from '@/store/notificationSettingsStore';
import PreviewIcon from '@mui/icons-material/Preview';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export function NotificationPreview() {
  const { settings, getNotificationCount } = useNotificationSettingsStore();
  
  const activeNotificationCount = getNotificationCount();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <PreviewIcon className="text-primary" sx={{ fontSize: 20 }} />
        <h3 className="font-bold text-gray-900">설정 미리보기</h3>
      </div>

      <div className="space-y-4">
        {/* 전체 상태 */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">전체 알림 상태</span>
          <div className="flex items-center gap-2">
            {settings.globalEnabled ? (
              <>
                <CheckCircleIcon className="text-green-500" sx={{ fontSize: 16 }} />
                <span className="text-sm font-medium text-green-700">활성화</span>
              </>
            ) : (
              <>
                <span className="w-4 h-4 bg-red-500 rounded-full"></span>
                <span className="text-sm font-medium text-red-700">비활성화</span>
              </>
            )}
          </div>
        </div>

        {/* 활성 알림 수 */}
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">활성 알림 채널</span>
          <div className="flex items-center gap-2">
            <NotificationsActiveIcon className="text-blue-500" sx={{ fontSize: 16 }} />
            <span className="text-sm font-bold text-blue-700">{activeNotificationCount}개</span>
          </div>
        </div>

        {/* 카테고리별 요약 */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700">활성 카테고리</h4>
          {Object.entries(settings).map(([key, value]) => {
            if (typeof value === 'object' && 'enabled' in value) {
              const categoryNames: { [key: string]: string } = {
                lessons: '수업 관련',
                community: '커뮤니티',
                payments: '결제 및 환불',
                marketing: '마케팅',
                system: '시스템'
              };

              return (
                <div key={key} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">{categoryNames[key]}</span>
                  <span className={value.enabled ? 'text-green-600 font-medium' : 'text-gray-400'}>
                    {value.enabled ? 'ON' : 'OFF'}
                  </span>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* 방해 금지 시간 */}
        {settings.quietHours.enabled && (
          <div className="p-3 bg-purple-50 rounded-lg">
            <div className="text-xs font-medium text-purple-700 mb-1">방해 금지 시간</div>
            <div className="text-xs text-purple-600">
              {settings.quietHours.startTime} - {settings.quietHours.endTime}
            </div>
          </div>
        )}

        {/* 요약 알림 */}
        {settings.summaryFrequency !== 'never' && (
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-xs font-medium text-green-700 mb-1">요약 알림</div>
            <div className="text-xs text-green-600">
              {settings.summaryFrequency === 'daily' ? '매일' : '주간'} 요약 받기
            </div>
          </div>
        )}

        {/* 주말 알림 */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs font-medium text-gray-700 mb-1">주말 알림</div>
          <div className={`text-xs ${settings.weekendEnabled ? 'text-blue-600' : 'text-gray-500'}`}>
            {settings.weekendEnabled ? '주말에도 받기' : '주말에는 받지 않기'}
          </div>
        </div>
      </div>

      {/* 저장 안내 */}
      <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="text-xs text-yellow-800">
          💡 설정은 자동으로 저장됩니다. 변경 사항이 즉시 적용됩니다.
        </div>
      </div>
    </div>
  );
}