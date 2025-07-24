"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChatRoom, ChatMessage, ChatContext, Session } from '@/types/entities/chat';
import { useChatFilters } from '@/hooks/useChatFilters';
import { ChatContextTabs } from './ChatContextTabs';
import { ChatMessageBubble } from './ChatMessageBubble';
import { ChatInput } from './ChatInput';

interface SmartChatRoomProps {
  chatRoom: ChatRoom;
  currentUserId: string;
  onSendMessage: (content: string, contextId: string) => void;
  onContextChange?: (contextId: string) => void;
}

export function SmartChatRoom({ 
  chatRoom, 
  currentUserId, 
  onSendMessage,
  onContextChange 
}: SmartChatRoomProps) {
  const [activeContextId, setActiveContextId] = useState(chatRoom.activeContextId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    filteredMessages,
    contextsWithUnreadCounts,
    activeContext
  } = useChatFilters({
    messages: chatRoom.messages || [],
    contexts: chatRoom.contexts || [],
    activeContextId
  });

  // 컨텍스트 변경 핸들러
  const handleContextChange = (contextId: string) => {
    setActiveContextId(contextId);
    onContextChange?.(contextId);
  };

  // 메시지 전송 핸들러
  const handleSendMessage = (content: string, contextId: string) => {
    onSendMessage(content, contextId);
  };

  // 메시지가 업데이트될 때 스크롤을 하단으로
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [filteredMessages]);

  // 세션 정보 가져오기
  const getSessionById = (sessionId: string): Session | undefined => {
    return chatRoom.sessions?.find(session => session.id === sessionId);
  };

  // 튜터 정보 가져오기
  const tutor = chatRoom.participants.find(p => p.userType === 'tutor');
  const tutorName = tutor?.userName || '튜터';

  // 메시지가 현재 사용자의 것인지 확인
  const isOwnMessage = (message: ChatMessage) => {
    return message.senderId === currentUserId;
  };

  if (!activeContext) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-500">채팅방을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 컨텍스트 탭 헤더 */}
      <ChatContextTabs
        contexts={contextsWithUnreadCounts}
        activeContextId={activeContextId}
        onContextChange={handleContextChange}
        tutorName={tutorName}
      />

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {filteredMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <p className="text-gray-500 mb-2">
                {activeContext.type === 'session' 
                  ? `${activeContext.name} 세션 대화가 여기에 표시됩니다`
                  : '대화를 시작해보세요'
                }
              </p>
              <p className="text-sm text-gray-400">
                메시지를 입력하면 대화가 시작됩니다
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message, index) => {
              const session = message.sessionId ? getSessionById(message.sessionId) : undefined;
              const prevMessage = index > 0 ? filteredMessages[index - 1] : null;
              const showAvatar = !prevMessage || prevMessage.senderId !== message.senderId;

              return (
                <ChatMessageBubble
                  key={message.id}
                  message={message}
                  isOwn={isOwnMessage(message)}
                  session={session}
                  showAvatar={showAvatar}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* 채팅 입력 */}
      <ChatInput
        activeContext={activeContext}
        onSendMessage={handleSendMessage}
        disabled={activeContext.type === 'session' && !activeContext.isActive}
        placeholder={
          activeContext.type === 'session' && !activeContext.isActive
            ? '세션이 종료되어 메시지를 보낼 수 없습니다'
            : undefined
        }
      />
    </div>
  );
}