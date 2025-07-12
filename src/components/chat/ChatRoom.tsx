"use client";

import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PaymentIcon from '@mui/icons-material/Payment';
import StarIcon from '@mui/icons-material/Star';
import CircleIcon from '@mui/icons-material/Circle';
import { MessageTemplateSelector } from './MessageTemplateSelector';
import { TemplateGuidePopup } from './TemplateGuidePopup';
import { MessageTemplate } from '@/types/messageTemplate';
import type { UserType } from '@/features/auth/types/auth';

interface Message {
  id: string;
  sender: 'user' | 'tutor';
  type: 'text' | 'image' | 'video' | 'file' | 'payment';
  content: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'user',
    type: 'text',
    content: '안녕하세요! 파스타 만들 때 면이 계속 퍼져서 고민이에요.',
    timestamp: '오후 2:30',
    status: 'read'
  },
  {
    id: '2',
    sender: 'tutor',
    type: 'text',
    content: '안녕하세요! 파스타 면이 퍼지는 문제 도와드릴게요. 어떤 면을 사용하시는지, 삶는 과정을 영상으로 보여주실 수 있나요?',
    timestamp: '오후 2:32',
  },
  {
    id: '3',
    sender: 'user',
    type: 'video',
    content: '파스타 삶는 과정 영상입니다',
    timestamp: '오후 2:35',
    status: 'read'
  },
  {
    id: '4',
    sender: 'tutor',
    type: 'text',
    content: '영상 확인했어요! 문제를 찾았습니다. 면을 너무 오래 삶으셨네요. 알덴테는 포장지에 적힌 시간보다 1-2분 짧게 삶아야 해요.',
    timestamp: '오후 2:40',
  },
  {
    id: '5',
    sender: 'tutor',
    type: 'video',
    content: '올바른 파스타 삶는 방법 시연 영상',
    timestamp: '오후 2:42',
  },
  {
    id: '6',
    sender: 'user',
    type: 'text',
    content: '와! 정말 도움됐어요. 바로 시도해볼게요!',
    timestamp: '오후 2:45',
    status: 'read'
  },
  {
    id: '7',
    sender: 'tutor',
    type: 'text',
    content: '결과 사진도 보내주세요! 더 궁금한 점이 있으면 언제든 물어보세요.',
    timestamp: '오후 2:46',
  }
];

interface ChatRoomProps {
  chatId: string;
  userType?: UserType;
}

export function ChatRoom({ chatId, userType = 'tutee' }: ChatRoomProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);

  // 현재 채팅방 정보 (실제로는 API에서 가져올 데이터)
  const getChatRoomInfo = (chatId: string) => {
    // 실제로는 chatId를 기반으로 API에서 데이터를 가져옴
    const mockChatRooms = {
      '1': { name: '김셰프', avatar: '👨‍🍳', category: '요리', isOnline: true, rating: 4.9, responseTime: '평균 3분' },
      '2': { name: '이기타', avatar: '🎸', category: '악기', isOnline: true, rating: 4.8, responseTime: '평균 5분' },
      '3': { name: '박트레이너', avatar: '💪', category: '운동', isOnline: false, rating: 4.7, responseTime: '평균 10분' },
      '4': { name: '최영어', avatar: '🗣️', category: '언어', isOnline: true, rating: 4.9, responseTime: '평균 2분' },
      '5': { name: '김아티스트', avatar: '🎨', category: '디자인', isOnline: false, rating: 4.6, responseTime: '평균 15분' },
    };
    return mockChatRooms[chatId as keyof typeof mockChatRooms] || mockChatRooms['1'];
  };

  const chatRoomInfo = getChatRoomInfo(chatId);

  const handleSendMessage = () => {
    if (message.trim()) {
      // 메시지 전송 로직
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleTemplateSelect = (template: MessageTemplate) => {
    setMessage(template.content);
  };

  const handleExitChatRoom = () => {
    setIsExitDialogOpen(false);
    setIsOptionsMenuOpen(false);
    // 실제로는 채팅방 나가기 API 호출
    console.log('채팅방 나가기:', chatId);
    // 채팅방 목록으로 이동하는 로직 추가
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <PhotoCameraIcon sx={{ fontSize: 16 }} className="text-gray-500" />;
      case 'video':
        return <VideocamIcon sx={{ fontSize: 16 }} className="text-blue-500" />;
      case 'file':
        return <AttachFileIcon sx={{ fontSize: 16 }} className="text-gray-500" />;
      case 'payment':
        return <PaymentIcon sx={{ fontSize: 16 }} className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl overflow-hidden">
      {/* 채팅방 헤더 */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-lg">
                {chatRoomInfo.avatar}
              </div>
              {chatRoomInfo.isOnline && (
                <CircleIcon 
                  className="absolute -bottom-1 -right-1 text-green-500" 
                  sx={{ fontSize: 12 }}
                />
              )}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{chatRoomInfo.name}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span>{chatRoomInfo.category}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <StarIcon sx={{ fontSize: 12 }} className="text-yellow-400" />
                  <span>{chatRoomInfo.rating}</span>
                </div>
                <span>•</span>
                <span>{chatRoomInfo.responseTime}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 relative">
            <button 
              onClick={() => setIsOptionsMenuOpen(!isOptionsMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-black"
            >
              <MoreVertIcon />
            </button>
            
            {/* 옵션 메뉴 오버레이 */}
            {isOptionsMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsExitDialogOpen(true);
                      setIsOptionsMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                  >
                    채팅방 나가기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mockMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] ${msg.sender === 'user' ? 'order-2' : ''}`}>
              <div
                className={`p-3 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {msg.type !== 'text' && (
                  <div className="flex items-center gap-2 mb-2">
                    {getMessageIcon(msg.type)}
                    <span className="text-sm font-medium">
                      {msg.type === 'image' && '이미지'}
                      {msg.type === 'video' && '영상'}
                      {msg.type === 'file' && '파일'}
                      {msg.type === 'payment' && '결제'}
                    </span>
                  </div>
                )}
                
                {msg.type === 'video' || msg.type === 'image' ? (
                  <div className="bg-gray-200 rounded-lg p-8 text-center text-gray-600 mb-2">
                    {msg.type === 'video' ? '📹' : '🖼️'} {msg.content}
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                )}
              </div>
              
              <div className={`flex items-center gap-2 mt-1 text-xs text-gray-500 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}>
                <span>{msg.timestamp}</span>
                {msg.sender === 'user' && msg.status && (
                  <span className="text-primary">
                    {msg.status === 'read' && '읽음'}
                    {msg.status === 'delivered' && '전송됨'}
                    {msg.status === 'sent' && '전송 중'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 메시지 입력 영역 */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-end gap-3">
          {/* 첨부 버튼들 */}
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="사진">
              <PhotoCameraIcon className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="영상">
              <VideocamIcon className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="파일">
              <AttachFileIcon className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="음성">
              <MicIcon className="text-gray-600" />
            </button>
            <button 
              onClick={() => setIsTemplateSelectorOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors" 
              title="메시지 템플릿"
            >
              <span className="text-gray-600">📝</span>
            </button>
          </div>

          {/* 메시지 입력 */}
          <div className="flex-1 flex items-end gap-2">
            <div className="flex-1 border border-gray-300 rounded-2xl px-4 py-2 focus-within:border-primary transition-colors">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="메시지를 입력하세요..."
                className="w-full resize-none outline-none text-sm max-h-20 text-black"
                rows={1}
              />
            </div>
            <div className="flex items-center gap-2">
              <TemplateGuidePopup userType={userType} />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="p-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
        
        {/* 도움말 */}
        <div className="mt-2 text-xs text-gray-500 text-center">
          사진, 영상, 음성으로 더 자세한 피드백을 받아보세요 • 📝 버튼으로 메시지 템플릿 활용하기
        </div>
      </div>

      {/* 메시지 템플릿 선택 모달 */}
      <MessageTemplateSelector
        userType={userType}
        onTemplateSelect={handleTemplateSelect}
        isOpen={isTemplateSelectorOpen}
        onClose={() => setIsTemplateSelectorOpen(false)}
      />

      {/* 채팅방 나가기 확인 다이얼로그 */}
      {isExitDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              채팅방 나가기
            </h3>
            <p className="text-gray-600 mb-6">
              정말 채팅방을 나가갪습니까?<br/>
              나가기 후에는 이전 대화 내용을 확인할 수 없습니다.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsExitDialogOpen(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleExitChatRoom}
                className="flex-1 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
              >
                나가기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 옵션 메뉴 외부 클릭 시 닫기 */}
      {isOptionsMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOptionsMenuOpen(false)}
        />
      )}
    </div>
  );
}