"use client";

import React from 'react';
import { useNotificationSettingsStore } from '@/store/notificationSettingsStore';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WeekendIcon from '@mui/icons-material/Weekend';

export function NotificationFrequencySection() {
  const { settings, updateGlobalSetting } = useNotificationSettingsStore();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <ScheduleIcon className="text-primary" sx={{ fontSize: 24 }} />
        <div>
          <h2 className="text-xl font-bold text-gray-900">알림 빈도 및 시간</h2>
          <p className="text-gray-600">알림을 받을 시간과 빈도를 설정하세요.</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* 요약 알림 빈도 */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ScheduleIcon sx={{ fontSize: 20 }} />
            요약 알림 빈도
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { value: 'daily', label: '매일', description: '하루 요약을 매일 받기' },
              { value: 'weekly', label: '주간', description: '일주일 요약을 매주 받기' },
              { value: 'never', label: '받지 않음', description: '요약 알림을 받지 않음' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => updateGlobalSetting('summaryFrequency', option.value)}
                className={`p-4 text-left border-2 rounded-xl transition-all ${
                  settings.summaryFrequency === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-600 mt-1">{option.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 방해 금지 시간 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <AccessTimeIcon sx={{ fontSize: 20 }} />
              방해 금지 시간
            </h3>
            <button
              onClick={() => updateGlobalSetting('quietHours', {
                ...settings.quietHours,
                enabled: !settings.quietHours.enabled
              })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.quietHours.enabled ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.quietHours.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          {settings.quietHours.enabled && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-4">
                설정한 시간 동안은 긴급하지 않은 알림을 보내지 않습니다.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    시작 시간
                  </label>
                  <input
                    type="time"
                    value={settings.quietHours.startTime}
                    onChange={(e) => updateGlobalSetting('quietHours', {
                      ...settings.quietHours,
                      startTime: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    종료 시간
                  </label>
                  <input
                    type="time"
                    value={settings.quietHours.endTime}
                    onChange={(e) => updateGlobalSetting('quietHours', {
                      ...settings.quietHours,
                      endTime: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 주말 알림 */}
        <div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <WeekendIcon className="text-gray-600" sx={{ fontSize: 24 }} />
              <div>
                <h3 className="font-semibold text-gray-900">주말 알림</h3>
                <p className="text-sm text-gray-600">토요일, 일요일에도 알림을 받습니다</p>
              </div>
            </div>
            <button
              onClick={() => updateGlobalSetting('weekendEnabled', !settings.weekendEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.weekendEnabled ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.weekendEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}