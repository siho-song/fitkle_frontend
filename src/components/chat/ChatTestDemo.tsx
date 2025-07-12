"use client";

import React, { useState } from 'react';
import { ChatList } from './ChatList';
import { ChatRoom } from './ChatRoom';
import { useUserType } from '@/features/auth/store/authStore';

export function ChatTestDemo() {
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>();
  const userType = useUserType();

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          채팅 테스트 ({userType === 'tutor' ? '튜터' : '튜티'} 모드)
        </h1>
        <p className="text-gray-600">
          {userType === 'tutor' 
            ? '튜터로 로그인하여 수강생들과의 채팅을 확인할 수 있습니다.'
            : '튜티로 로그인하여 다양한 분야의 튜터들과의 채팅을 확인할 수 있습니다.'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <ChatList 
            onChatSelect={handleChatSelect}
            selectedChatId={selectedChatId}
            userType={userType || 'tutee'}
          />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {selectedChatId ? (
            <ChatRoom chatId={selectedChatId} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              채팅을 선택해주세요
            </div>
          )}
        </div>
      </div>
    </div>
  );
}