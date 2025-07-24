"use client";

import React, { useState } from 'react';
import { SmartChatRoom } from '@/components/chat/SmartChatRoom';
import { sampleChatRoom } from '@/data/sampleChatData';
import { ChatMessage } from '@/types/entities/chat';

export default function ChatDemoPage() {
  const [chatRoom, setChatRoom] = useState(sampleChatRoom);
  const currentUserId = 'student_001'; // 현재 사용자를 학생으로 설정

  const handleSendMessage = (content: string, contextId: string) => {
    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      chatRoomId: chatRoom.id,
      senderId: currentUserId,
      senderName: '김학생',
      type: 'text',
      content,
      timestamp: new Date().toISOString(),
      isRead: false,
      senderType: 'student',
      sessionId: contextId === 'general' ? undefined : contextId
    };

    setChatRoom(prev => ({
      ...prev,
      messages: [...(prev.messages || []), newMessage],
      lastMessage: newMessage,
      lastMessageAt: newMessage.timestamp
    }));
  };

  const handleContextChange = (contextId: string) => {
    setChatRoom(prev => ({
      ...prev,
      activeContextId: contextId
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            스마트 채팅방 데모
          </h1>
          <p className="text-gray-600">
            컨텍스트별 메시지 필터링과 세션 관리 기능을 체험해보세요
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div style={{ height: '600px' }}>
            <SmartChatRoom
              chatRoom={chatRoom}
              currentUserId={currentUserId}
              onSendMessage={handleSendMessage}
              onContextChange={handleContextChange}
            />
          </div>
        </div>

        {/* 기능 설명 */}
        <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🎯 컨텍스트 기반 채팅</h3>
              <p className="text-sm text-gray-600">
                일반 상담과 각종 세션(보컬, 발성)을 탭으로 구분하여 관리
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🎨 시각적 구분</h3>
              <p className="text-sm text-gray-600">
                세션 메시지는 특별한 색상과 스타일로 구분 표시
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">📊 실시간 알림</h3>
              <p className="text-sm text-gray-600">
                각 탭별 미읽음 메시지 수를 실시간으로 표시
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🔄 세션 상태 관리</h3>
              <p className="text-sm text-gray-600">
                세션 시작/종료를 명확히 표시하고 상태에 따른 입력 제어
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}