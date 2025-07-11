"use client";

import React, { useState } from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { ChatList } from '@/components/chat/ChatList';
import { ChatRoom } from '@/components/chat/ChatRoom';

export const ChatScreen: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string>('1');

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  return (
    <MainLayout disableContainer showFooter={false}>
      <div className="h-[calc(100vh-80px)] flex">
        {/* 채팅 리스트 (왼쪽) */}
        <div className="w-80 flex-shrink-0">
          <ChatList 
            onChatSelect={handleChatSelect}
            selectedChatId={selectedChatId}
          />
        </div>
        
        {/* 채팅방 (오른쪽) */}
        <div className="flex-1">
          {selectedChatId ? (
            <ChatRoom chatId={selectedChatId} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-semibold mb-2">채팅을 선택하세요</h3>
                <p>튜터와의 대화를 시작해보세요</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};