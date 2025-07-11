"use client";

import React from 'react';
import Image from 'next/image';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CircleIcon from '@mui/icons-material/Circle';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import VideocamIcon from '@mui/icons-material/Videocam';

interface ChatRoom {
  id: string;
  tutorName: string;
  tutorAvatar: string;
  tutorCategory: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  messageType: 'text' | 'image' | 'video' | 'file';
  status: 'waiting' | 'in_progress' | 'completed';
}

const mockChatRooms: ChatRoom[] = [
  {
    id: '1',
    tutorName: '김셰프',
    tutorAvatar: '👨‍🍳',
    tutorCategory: '요리',
    lastMessage: '파스타 영상 확인했어요! 소스 농도가 문제네요',
    lastMessageTime: '2분 전',
    unreadCount: 2,
    isOnline: true,
    messageType: 'text',
    status: 'in_progress'
  },
  {
    id: '2',
    tutorName: '이기타',
    tutorAvatar: '🎸',
    tutorCategory: '악기',
    lastMessage: 'F코드 연습 영상 보내드릴게요',
    lastMessageTime: '15분 전',
    unreadCount: 0,
    isOnline: true,
    messageType: 'video',
    status: 'completed'
  },
  {
    id: '3',
    tutorName: '박트레이너',
    tutorAvatar: '💪',
    tutorCategory: '운동',
    lastMessage: '운동 자세 사진 잘 받았습니다',
    lastMessageTime: '1시간 전',
    unreadCount: 1,
    isOnline: false,
    messageType: 'image',
    status: 'waiting'
  },
  {
    id: '4',
    tutorName: '최영어',
    tutorAvatar: '🗣️',
    tutorCategory: '언어',
    lastMessage: '발음 교정 음성파일 첨부했어요',
    lastMessageTime: '3시간 전',
    unreadCount: 0,
    isOnline: true,
    messageType: 'file',
    status: 'completed'
  },
  {
    id: '5',
    tutorName: '김아티스트',
    tutorAvatar: '🎨',
    tutorCategory: '디자인',
    lastMessage: '그림 구도에 대해 조언드릴게요',
    lastMessageTime: '어제',
    unreadCount: 0,
    isOnline: false,
    messageType: 'text',
    status: 'in_progress'
  }
];

interface ChatListProps {
  onChatSelect: (chatId: string) => void;
  selectedChatId?: string;
}

export function ChatList({ onChatSelect, selectedChatId }: ChatListProps) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting':
        return '답변 대기';
      case 'in_progress':
        return '상담 중';
      case 'completed':
        return '완료';
      default:
        return '';
    }
  };

  return (
    <div className="h-full bg-white border-r border-gray-200">
      {/* 헤더 */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">채팅</h2>
        <p className="text-sm text-gray-600">튜터와의 대화</p>
      </div>

      {/* 채팅 리스트 */}
      <div className="overflow-y-auto h-full">
        {mockChatRooms.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedChatId === chat.id ? 'bg-primary/10 border-primary/20' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              {/* 튜터 아바타 */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-xl">
                  {chat.tutorAvatar}
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
                      {chat.tutorName}
                    </h3>
                    <span className="text-xs text-primary font-medium">
                      {chat.tutorCategory}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(chat.status)}`}>
                      {getStatusText(chat.status)}
                    </span>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {chat.lastMessageTime}
                    </span>
                  </div>
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
        ))}
      </div>
    </div>
  );
}