"use client";

import React from 'react';
import { Session } from '@/types/entities/chat';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface SessionIndicatorProps {
  session: Session;
  type: 'start' | 'end';
}

export function SessionIndicator({ session, type }: SessionIndicatorProps) {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);
  };

  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return `${hours}시간`;
      }
      return `${hours}시간 ${remainingMinutes}분`;
    }
    return `${minutes}분`;
  };

  if (type === 'start') {
    return (
      <div className="mx-4 my-6">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <PlayArrowIcon sx={{ fontSize: 20 }} />
                <span className="font-bold text-lg">{session.name} 세션 시작</span>
              </div>
              <div className="text-purple-100 text-sm mb-4">
                {formatDuration(session.duration)} 세션
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-purple-400/30">
            <div className="flex items-center gap-4 text-sm text-purple-100">
              <div className="flex items-center gap-1">
                <ScheduleIcon sx={{ fontSize: 16 }} />
                <span>{formatTime(session.startTime)} - {session.endTime ? formatTime(session.endTime) : '진행중'}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">
                {session.price.toLocaleString()}원
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-4 my-6">
      <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircleIcon sx={{ fontSize: 20 }} className="text-green-500" />
              <span className="font-bold text-lg text-gray-900">{session.name} 세션 완료</span>
            </div>
            <div className="text-gray-500 text-sm mb-4">
              {formatDuration(session.duration)} 세션이 종료되었습니다
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <ScheduleIcon sx={{ fontSize: 16 }} />
              <span>
                {formatTime(session.startTime)} - {session.endTime ? formatTime(session.endTime) : '진행중'}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">
              {session.price.toLocaleString()}원
            </div>
            <div className="text-xs text-green-600 font-medium">결제 완료</div>
          </div>
        </div>
      </div>
    </div>
  );
}