"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CircleIcon from '@mui/icons-material/Circle';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import VideocamIcon from '@mui/icons-material/Videocam';
import { ChatFilter, ChatFilterOptions } from './ChatFilter';
import type { UserType } from '@/features/auth/types/auth';

interface ChatRoom {
  id: string;
  contactName: string;
  contactAvatar: string;
  contactCategory?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  messageType: 'text' | 'image' | 'video' | 'file';
}

// 튜티용 채팅방 데이터 (여러 분야 튜터와 대화)
const tuteeChatRooms: ChatRoom[] = [
  {
    id: '1',
    contactName: '김셰프',
    contactAvatar: '👨‍🍳',
    contactCategory: '요리',
    lastMessage: '파스타 영상 확인했어요! 소스 농도가 문제네요',
    lastMessageTime: '2분 전',
    unreadCount: 2,
    isOnline: true,
    messageType: 'text'
  },
  {
    id: '2',
    contactName: '이기타',
    contactAvatar: '🎸',
    contactCategory: '악기',
    lastMessage: 'F코드 연습 영상 보내드릴게요',
    lastMessageTime: '15분 전',
    unreadCount: 0,
    isOnline: true,
    messageType: 'video'
  },
  {
    id: '3',
    contactName: '박트레이너',
    contactAvatar: '💪',
    contactCategory: '운동',
    lastMessage: '운동 자세 사진 잘 받았습니다',
    lastMessageTime: '1시간 전',
    unreadCount: 1,
    isOnline: false,
    messageType: 'image'
  },
  {
    id: '4',
    contactName: '최영어',
    contactAvatar: '🗣️',
    contactCategory: '언어',
    lastMessage: '발음 교정 음성파일 첨부했어요',
    lastMessageTime: '3시간 전',
    unreadCount: 0,
    isOnline: true,
    messageType: 'file'
  },
  {
    id: '5',
    contactName: '김아티스트',
    contactAvatar: '🎨',
    contactCategory: '디자인',
    lastMessage: '그림 구도에 대해 조언드릴게요',
    lastMessageTime: '어제',
    unreadCount: 0,
    isOnline: false,
    messageType: 'text'
  }
];

// 튜터용 채팅방 데이터 (수강생들과 대화, 카테고리 불필요)
const tutorChatRooms: ChatRoom[] = [
  {
    id: '1',
    contactName: '정수강생',
    contactAvatar: '😊',
    lastMessage: '오늘 수업 감사했어요! 다음 주에도 잘 부탁드릴게요',
    lastMessageTime: '10분 전',
    unreadCount: 1,
    isOnline: true,
    messageType: 'text'
  },
  {
    id: '2',
    contactName: '김학습자',
    contactAvatar: '🧑‍🎓',
    lastMessage: '좋아요! 과제 영상 보내드릴게요',
    lastMessageTime: '30분 전',
    unreadCount: 0,
    isOnline: true,
    messageType: 'video'
  },
  {
    id: '3',
    contactName: '이초보',
    contactAvatar: '🙋‍♀️',
    lastMessage: '과제 사진 찍어서 보내드릴게요',
    lastMessageTime: '1시간 전',
    unreadCount: 2,
    isOnline: false,
    messageType: 'image'
  },
  {
    id: '4',
    contactName: '박열심',
    contactAvatar: '💪',
    lastMessage: '과제 파일 첨부했습니다',
    lastMessageTime: '2시간 전',
    unreadCount: 0,
    isOnline: true,
    messageType: 'file'
  },
  {
    id: '5',
    contactName: '최노력',
    contactAvatar: '😎',
    lastMessage: '오늘 수업 정말 도움이 되었어요',
    lastMessageTime: '어제',
    unreadCount: 0,
    isOnline: false,
    messageType: 'text'
  }
];

interface ChatListProps {
  onChatSelect: (chatId: string) => void;
  selectedChatId?: string;
  userType?: UserType;
}

export function ChatList({ onChatSelect, selectedChatId, userType = 'tutee' }: ChatListProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ChatFilterOptions>({
    searchTerm: '',
    dateFilter: 'all'
  });
  
  const allChatRooms = userType === 'tutor' ? tutorChatRooms : tuteeChatRooms;
  
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
  }, [chatRoomsWithDates, filters]);
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
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">채팅</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            🔍
          </button>
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
              </div>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  );
}