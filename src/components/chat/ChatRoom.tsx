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
}

export function ChatRoom({ chatId }: ChatRoomProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // 현재 채팅방 정보 (실제로는 API에서 가져올 데이터)
  const tutorInfo = {
    name: '김셰프',
    avatar: '👨‍🍳',
    category: '요리',
    isOnline: true,
    rating: 4.9,
    responseTime: '평균 3분'
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // 메시지 전송 로직
      console.log('Sending message:', message);
      setMessage('');
    }
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
    <div className="h-full flex flex-col bg-white">
      {/* 채팅방 헤더 */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-lg">
                {tutorInfo.avatar}
              </div>
              {tutorInfo.isOnline && (
                <CircleIcon 
                  className="absolute -bottom-1 -right-1 text-green-500" 
                  sx={{ fontSize: 12 }}
                />
              )}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{tutorInfo.name}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span>{tutorInfo.category}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <StarIcon sx={{ fontSize: 12 }} className="text-yellow-400" />
                  <span>{tutorInfo.rating}</span>
                </div>
                <span>•</span>
                <span>{tutorInfo.responseTime}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              결제하기
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertIcon />
            </button>
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
          </div>

          {/* 메시지 입력 */}
          <div className="flex-1 flex items-end gap-2">
            <div className="flex-1 border border-gray-300 rounded-2xl px-4 py-2 focus-within:border-primary transition-colors">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="메시지를 입력하세요..."
                className="w-full resize-none outline-none text-sm max-h-20"
                rows={1}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="p-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <SendIcon />
            </button>
          </div>
        </div>
        
        {/* 도움말 */}
        <div className="mt-2 text-xs text-gray-500 text-center">
          사진, 영상, 음성으로 더 자세한 피드백을 받아보세요
        </div>
      </div>
    </div>
  );
}