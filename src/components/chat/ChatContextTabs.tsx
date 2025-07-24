"use client";

import React from 'react';
import { ChatContext } from '@/types/entities/chat';
import ChatIcon from '@mui/icons-material/Chat';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import PianoIcon from '@mui/icons-material/Piano';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface ChatContextTabsProps {
  contexts: ChatContext[];
  activeContextId: string;
  onContextChange: (contextId: string) => void;
  tutorName: string;
}

const getContextIcon = (context: ChatContext) => {
  if (context.type === 'general') {
    return <ChatIcon sx={{ fontSize: 18 }} />;
  }
  
  switch (context.sessionType) {
    case 'vocal':
      return <RecordVoiceOverIcon sx={{ fontSize: 18 }} />;
    case 'pronunciation':
      return <RecordVoiceOverIcon sx={{ fontSize: 18 }} />;
    case 'guitar':
      return <LibraryMusicIcon sx={{ fontSize: 18 }} />;
    case 'piano':
      return <PianoIcon sx={{ fontSize: 18 }} />;
    default:
      return <MusicNoteIcon sx={{ fontSize: 18 }} />;
  }
};

const getContextColor = (context: ChatContext, isActive: boolean) => {
  if (context.type === 'general') {
    return isActive 
      ? 'bg-blue-500 text-white border-blue-500' 
      : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100';
  }
  
  // 세션 탭들은 활성화 시 그라데이션
  return isActive
    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-purple-500'
    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100';
};

export function ChatContextTabs({ 
  contexts, 
  activeContextId, 
  onContextChange,
  tutorName 
}: ChatContextTabsProps) {
  const activeContext = contexts.find(c => c.id === activeContextId);
  
  return (
    <div className="bg-white border-b border-gray-200">
      {/* 헤더 정보 */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {tutorName.charAt(0)}
            </span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">{tutorName}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>현재 온라인 • 평균 5분 응답</span>
            </div>
          </div>
        </div>
      </div>

      {/* 컨텍스트 인디케이터 */}
      {activeContext && (
        <div className="px-6 py-3 bg-amber-50 border-b border-amber-200">
          <div className="flex items-center gap-2 text-amber-800">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">
              현재 {activeContext.name} 모드입니다
            </span>
          </div>
        </div>
      )}

      {/* 컨텍스트 탭들 */}
      <div className="px-6 py-4">
        <div className="flex flex-wrap gap-3">
          {contexts.map((context) => {
            const isActive = context.id === activeContextId;
            return (
              <button
                key={context.id}
                onClick={() => onContextChange(context.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium
                  transition-all duration-200 relative
                  ${getContextColor(context, isActive)}
                `}
              >
                {getContextIcon(context)}
                <span>{context.name}</span>
                
                {/* 미읽음 메시지 수 */}
                {context.unreadCount > 0 && !isActive && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[18px] text-center">
                    {context.unreadCount > 99 ? '99+' : context.unreadCount}
                  </span>
                )}
                
                {/* 활성 세션 표시 */}
                {context.type === 'session' && context.isActive && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}