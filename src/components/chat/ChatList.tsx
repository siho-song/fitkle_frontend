"use client";

import React, { useState, useMemo } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import VideocamIcon from '@mui/icons-material/Videocam';
import { ChatFilter, ChatFilterOptions } from './ChatFilter';
import type { UserType } from '@/features/auth/types/auth';
import { getChatRoomList, ChatRoom } from '@/mocks/chatData';


interface ChatListProps {
  onChatSelect: (chatId: string) => void;
  selectedChatId?: string;
  userType?: UserType;
}

// 채팅 필터 타입
type ChatFilterType = 'all' | 'unread' | 'consultation' | 'class';

export function ChatList({ onChatSelect, selectedChatId, userType = 'student' }: ChatListProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ChatFilterType>('all');
  const [filters, setFilters] = useState<ChatFilterOptions>({
    searchTerm: '',
    dateFilter: 'all'
  });
  
  const allChatRooms = getChatRoomList(userType);
  
  // 채팅방에 날짜 정보 추가 (실제로는 API에서 가져올 데이터)
  const chatRoomsWithDates = useMemo(() => {
    return allChatRooms.map(room => ({
      ...room,
      lastMessageDate: new Date(2024, 0, Math.floor(Math.random() * 30) + 1) // 예시 날짜
    }));
  }, [allChatRooms]);
  
  // 필터링된 채팅방 목록
  const filteredChatRooms = useMemo(() => {
    let filtered = chatRoomsWithDates;
    
    // 채팅 타입 필터
    switch (activeFilter) {
      case 'unread':
        filtered = filtered.filter(room => room.unreadCount > 0);
        break;
      case 'consultation':
        // 일반 상담만 (세션이 없거나 비활성 세션만 있는 경우)
        filtered = filtered.filter(room => 
          !room.activeSessionName || room.totalContexts === 1
        );
        break;
      case 'class':
        // 클래스/세션이 있는 경우
        filtered = filtered.filter(room => 
          room.activeSessionName || (room.totalContexts && room.totalContexts > 1)
        );
        break;
      case 'all':
      default:
        // 모든 채팅방
        break;
    }
    
    // 이름으로 검색
    if (filters.searchTerm) {
      filtered = filtered.filter(room => 
        room.contactName.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }
    
    // 날짜 필터
    if (filters.dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      filtered = filtered.filter(room => {
        const messageDate = room.lastMessageDate;
        
        switch (filters.dateFilter) {
          case 'today':
            return messageDate >= today;
          case 'thisWeek':
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay());
            return messageDate >= weekStart;
          case 'thisMonth':
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            return messageDate >= monthStart;
          case 'custom':
            if (filters.customDateRange) {
              const startDate = new Date(filters.customDateRange.startDate);
              const endDate = new Date(filters.customDateRange.endDate);
              return messageDate >= startDate && messageDate <= endDate;
            }
            return true;
          default:
            return true;
        }
      });
    }
    
    return filtered;
  }, [chatRoomsWithDates, filters, activeFilter]);
  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <PhotoCameraIcon sx={{ fontSize: 16 }} className="text-gray-500" />;
      case 'video':
        return <VideocamIcon sx={{ fontSize: 16 }} className="text-gray-500" />;
      case 'file':
        return <AttachFileIcon sx={{ fontSize: 16 }} className="text-gray-500" />;
      default:
        return null;
    }
  };


  return (
    <div className="h-full bg-white rounded-xl overflow-hidden flex flex-col">
      {/* 헤더 */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-900">채팅</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          >
            🔍
          </button>
        </div>
        
        {/* 필터 버튼들 */}
        <div className="flex gap-2 overflow-x-auto">
          {(['all', 'unread', 'consultation', 'class'] as ChatFilterType[]).map((filterType) => {
            const filterLabels = {
              all: '전체',
              unread: '안읽음', 
              consultation: '상담',
              class: '클래스'
            };
            
            const isActive = activeFilter === filterType;
            
            return (
              <button
                key={filterType}
                onClick={() => setActiveFilter(filterType)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filterLabels[filterType]}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* 필터 */}
      {showFilters && (
        <div className="border-b border-gray-200">
          <div className="p-4">
            <ChatFilter onFilterChange={setFilters} />
          </div>
        </div>
      )}

      {/* 채팅 리스트 */}
      <div className="flex-1 overflow-y-auto">
        {filteredChatRooms.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="text-4xl mb-4">💬</div>
            <p>채팅방이 없습니다.</p>
            {filters.searchTerm && (
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
                    {getMessageIcon(chat.messageType)}
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