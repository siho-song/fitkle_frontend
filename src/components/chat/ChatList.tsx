"use client";

import React, { useState, useMemo } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import VideocamIcon from '@mui/icons-material/Videocam';
import type { UserType } from '@/features/auth/types/auth';
import { getChatRoomList, getChatRoomData, ChatRoom } from '@/mocks/chatData';
import { TabButton } from '@/components/common/TabButton';


interface ChatListProps {
  onChatSelect: (chatId: string) => void;
  selectedChatId?: string;
  userType?: UserType;
  currentUserId?: string;
  updateTrigger?: number;
}

export function ChatList({ onChatSelect, selectedChatId, userType = 'student', currentUserId = 'current_user', updateTrigger }: ChatListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'consultation' | 'class'>('all');
  
  // updateTrigger가 변경될 때마다 채팅방 데이터를 새로 가져옴
  const allChatRooms = useMemo(() => {
    return getChatRoomList(userType, currentUserId);
  }, [userType, currentUserId, updateTrigger]);
  
  
  // 검색 및 필터링된 채팅방 목록
  const filteredChatRooms = useMemo(() => {
    let filtered = allChatRooms;
    
    // 필터 적용
    switch (activeFilter) {
      case 'unread':
        filtered = filtered.filter(room => room.unreadCount > 0);
        break;
      case 'consultation':
        filtered = filtered.filter(room => {
          // 채팅방 데이터에서 컨텍스트 정보를 가져와서 일반 상담이 있는지 확인
          const chatData = getChatRoomData(room.id, userType);
          const hasGeneralConsultation = chatData.contexts.some(context => 
            context.type === 'general' || context.name.includes('상담') || context.name.includes('멘토링')
          );
          return hasGeneralConsultation;
        });
        break;
      case 'class':
        filtered = filtered.filter(room => {
          // 채팅방 데이터에서 컨텍스트 정보를 가져와서 세션/클래스가 있는지 확인
          const chatData = getChatRoomData(room.id, userType);
          const hasClassSession = chatData.contexts.some(context => 
            context.type === 'session' || context.name.includes('클래스') || 
            context.name.includes('수업') || context.name.includes('강의')
          );
          return hasClassSession;
        });
        break;
      case 'all':
      default:
        // 전체 표시
        break;
    }
    
    // 이름으로 검색
    if (searchTerm) {
      filtered = filtered.filter(room => 
        room.contactName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [allChatRooms, searchTerm, activeFilter, userType]);


  return (
    <div className="h-full bg-white rounded-xl overflow-hidden flex flex-col">
      {/* 헤더 */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-900">채팅</h2>
        </div>
        
        {/* 필터 버튼들 */}
        <div className="flex gap-3 mb-3">
          <TabButton
            isActive={activeFilter === 'all'}
            onClick={() => setActiveFilter('all')}
          >
            전체
          </TabButton>
          <TabButton
            isActive={activeFilter === 'unread'}
            onClick={() => setActiveFilter('unread')}
          >
            안읽음
          </TabButton>
          <TabButton
            isActive={activeFilter === 'consultation'}
            onClick={() => setActiveFilter('consultation')}
          >
            상담
          </TabButton>
          <TabButton
            isActive={activeFilter === 'class'}
            onClick={() => setActiveFilter('class')}
          >
            클래스
          </TabButton>
        </div>

        {/* 검색 입력 */}
        <div className="relative">
          <input
            type="text"
            placeholder="채팅방 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </div>
        </div>
      </div>

      {/* 채팅 리스트 */}
      <div className="flex-1 overflow-y-auto">
        {filteredChatRooms.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="text-4xl mb-4">💬</div>
            <p>채팅방이 없습니다.</p>
            {searchTerm && (
              <p className="text-sm mt-2">검색 조건을 변경해보세요.</p>
            )}
          </div>
        ) : (
          filteredChatRooms.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedChatId === chat.id ? 'bg-primary/10 border-primary/20' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              {/* 연락처 아바타 */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-xl">
                  {chat.contactAvatar}
                </div>
                {chat.isOnline && (
                  <CircleIcon 
                    className="absolute -bottom-1 -right-1 text-green-500" 
                    sx={{ fontSize: 16 }}
                  />
                )}
              </div>

              {/* 채팅 정보 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {chat.contactName}
                    </h3>
                    {chat.contactCategory && (
                      <span className="text-xs text-primary font-medium">
                        {chat.contactCategory}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {chat.lastMessageTime}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {chat.messageType === 'image' && <PhotoCameraIcon sx={{ fontSize: 16 }} className="text-gray-500" />}
                    {chat.messageType === 'video' && <VideocamIcon sx={{ fontSize: 16 }} className="text-gray-500" />}
                    {chat.messageType === 'file' && <AttachFileIcon sx={{ fontSize: 16 }} className="text-gray-500" />}
                    <p className="text-sm text-gray-600 truncate">
                      {chat.lastMessage}
                    </p>
                  </div>
                  
                  {chat.unreadCount > 0 && (
                    <div className="ml-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {chat.unreadCount}
                    </div>
                  )}
                </div>

                {/* 컨텍스트 정보 표시 */}
                {(chat.activeSessionName || chat.totalContexts) && (
                  <div className="flex items-center gap-2 mt-1">
                    {chat.activeSessionName && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-purple-50 border border-purple-200 rounded-full">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-purple-700 font-medium">
                          {chat.activeSessionName}
                        </span>
                      </div>
                    )}
                    {chat.totalContexts && chat.totalContexts > 1 && (
                      <div className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-full">
                        <span className="text-xs text-gray-600">
                          {chat.totalContexts}개 대화방
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  );
}