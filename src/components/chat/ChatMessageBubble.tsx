"use client";

import React from 'react';
import { ChatMessage, Session } from '@/types/entities/chat';
import { SessionIndicator } from './SessionIndicator';
import { HighlightedText } from './HighlightedText';

interface ChatMessageBubbleProps {
  message: ChatMessage;
  isOwn: boolean;
  session?: Session;
  showAvatar?: boolean;
  searchTerm?: string;
  isCurrentSearchMatch?: boolean;
}

export function ChatMessageBubble({ 
  message, 
  isOwn, 
  session,
  showAvatar = true,
  searchTerm = '',
  isCurrentSearchMatch = false
}: ChatMessageBubbleProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);
  };

  // 세션 시작/종료 메시지 처리
  if (message.type === 'session_start' || message.type === 'session_end') {
    if (!session) return null;
    return (
      <SessionIndicator 
        session={session} 
        type={message.type === 'session_start' ? 'start' : 'end'} 
      />
    );
  }

  // 시스템 메시지 처리
  if (message.type === 'system') {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-600">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-3 mb-4 ${isOwn ? 'justify-end' : 'justify-start'}`}>
      {/* 아바타 (상대방 메시지일 때만) */}
      {!isOwn && showAvatar && (
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-medium text-gray-600">
            {message.senderName.charAt(0)}
          </span>
        </div>
      )}

      <div className={`max-w-xs lg:max-w-md ${isOwn ? 'order-1' : ''}`}>
        {/* 발신자 이름 (상대방 메시지일 때만) */}
        {!isOwn && (
          <div className="text-xs text-gray-500 mb-1 px-1">
            {message.senderName}
          </div>
        )}

        <div
          className={`
            relative px-4 py-3 rounded-2xl text-sm
            ${isOwn 
              ? 'bg-primaryLight text-black'
              : 'bg-gray-100 text-gray-900'
            }
            ${isOwn ? 'rounded-br-md' : 'rounded-bl-md'}
          `}
        >
          <div className="whitespace-pre-wrap break-words">
            <HighlightedText 
              text={message.content} 
              searchTerm={searchTerm}
              isCurrentMatch={isCurrentSearchMatch}
            />
          </div>
        </div>

        {/* 타임스탬프 */}
        <div className={`text-xs text-gray-400 mt-1 px-1 ${isOwn ? 'text-right' : 'text-left'}`}>
          {formatTime(message.timestamp)}
          {isOwn && message.isRead && (
            <span className="ml-1 text-secondary">읽음</span>
          )}
        </div>
      </div>
    </div>
  );
}