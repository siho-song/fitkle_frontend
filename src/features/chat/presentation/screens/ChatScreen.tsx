"use client";

import React, { useState } from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { ChatList } from '@/components/chat/ChatList';
import { ChatRoom } from '@/components/chat/ChatRoom';
import { useUserType } from '@/features/auth/store/authStore';

export const ChatScreen: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string>('1');
  const userType = useUserType();

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  return (
    <MainLayout disableContainer={false} showFooter={false}>
      <div className="h-[calc(100vh-96px)] bg-white py-6">
        <div className="h-full flex gap-6">
          {/* 채팅 리스트 (왼쪽) */}
          <div className="w-80 flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-200">
            <ChatList 
              onChatSelect={handleChatSelect}
              selectedChatId={selectedChatId}
              userType={userType || 'tutee'}
            />
          </div>
          
          {/* 채팅방 (오른쪽) */}
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200">
            {selectedChatId ? (
              <ChatRoom chatId={selectedChatId} userType={userType || 'tutee'} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-xl font-semibold mb-2 text-textHeading">채팅을 선택하세요</h3>
                  <p className="text-textDefault">튜터와의 대화를 시작해보세요</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};