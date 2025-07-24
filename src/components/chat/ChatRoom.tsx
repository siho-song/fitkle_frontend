"use client";

import React, { useState, useEffect, useRef } from 'react';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PaymentIcon from '@mui/icons-material/Payment';
import StarIcon from '@mui/icons-material/Star';
import CircleIcon from '@mui/icons-material/Circle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { MessageTemplateSelector } from './MessageTemplateSelector';
import { TemplateGuidePopup } from './TemplateGuidePopup';
import { ChatContextTabs } from './ChatContextTabs';
import { ChatMessageBubble } from './ChatMessageBubble';
import { SessionIndicator } from './SessionIndicator';
import { MessageTemplate } from '@/types/messageTemplate';
import { ChatMessage, ChatContext, Session, ChatRoom as ChatRoomType } from '@/types/entities/chat';
import { useChatFilters } from '@/hooks/useChatFilters';
import type { UserType } from '@/features/auth/types/auth';
import { getChatRoomData, getChatRoomInfo } from '@/mocks/chatData';

// 기존 Message 인터페이스를 ChatMessage로 통합하기 위해 제거하고 변환 함수 추가
const convertLegacyMessage = (msg: any): ChatMessage => ({
  id: msg.id,
  chatRoomId: 'current_room',
  senderId: msg.sender === 'user' ? 'current_user' : 'tutor',
  senderName: msg.sender === 'user' ? '나' : '튜터',
  senderAvatar: undefined,
  type: msg.type === 'payment' ? 'system' : msg.type,
  content: msg.content,
  timestamp: msg.timestamp,
  isRead: msg.status === 'read',
  sessionId: undefined, // 기존 메시지는 일반 상담으로 처리
  senderType: msg.sender === 'user' ? 'student' : 'tutor'
});


interface ChatRoomProps {
  chatId: string;
  userType?: UserType;
  currentUserId?: string;
}

export function ChatRoom({ chatId, userType = 'student', currentUserId = 'current_user' }: ChatRoomProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);
  const [activeContextId, setActiveContextId] = useState('general');
  
  // chatId에 따른 동적 데이터 로딩
  const chatRoomData = getChatRoomData(chatId, userType);
  const [messages, setMessages] = useState<ChatMessage[]>(chatRoomData.messages);
  const [contexts, setContexts] = useState<ChatContext[]>(chatRoomData.contexts);
  const [sessions, setSessions] = useState<Session[]>(chatRoomData.sessions);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // chatId나 userType이 변경될 때 데이터 업데이트
  useEffect(() => {
    const newChatRoomData = getChatRoomData(chatId, userType);
    setMessages(newChatRoomData.messages);
    setContexts(newChatRoomData.contexts);
    setSessions(newChatRoomData.sessions);
    setActiveContextId('general'); // 새 채팅방으로 이동시 일반 상담으로 초기화
  }, [chatId, userType]);

  // 채팅 필터링 훅 사용
  const {
    filteredMessages,
    contextsWithUnreadCounts,
    activeContext
  } = useChatFilters({
    messages,
    contexts,
    activeContextId
  });

  const chatRoomInfo = getChatRoomInfo(chatId);

  // 메시지가 업데이트될 때 스크롤을 하단으로
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [filteredMessages]);

  // 탭 전환 시 해당 컨텍스트의 메시지들을 읽음 처리
  useEffect(() => {
    if (activeContext) {
      const unreadMessages = filteredMessages.filter(msg => 
        !msg.isRead && msg.senderId !== currentUserId
      );
      
      if (unreadMessages.length > 0) {
        // 메시지들을 읽음 처리
        setMessages(prev => 
          prev.map(msg => {
            if (!msg.isRead && msg.senderId !== currentUserId) {
              // 현재 활성 컨텍스트의 메시지만 읽음 처리
              if (activeContext.type === 'general' && !msg.sessionId) {
                return { ...msg, isRead: true };
              } else if (activeContext.type === 'session' && msg.sessionId === activeContext.sessionId) {
                return { ...msg, isRead: true };
              }
            }
            return msg;
          })
        );
      }
    }
  }, [activeContextId, currentUserId, filteredMessages.length]);

  // 컨텍스트 변경 핸들러
  const handleContextChange = (contextId: string) => {
    setActiveContextId(contextId);
  };

  const handleSendMessage = () => {
    if (message.trim() && activeContext) {
      const newMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        chatRoomId: 'current_room',
        senderId: currentUserId,
        senderName: userType === 'student' ? '나' : '튜터',
        type: 'text',
        content: message.trim(),
        timestamp: new Date().toISOString(),
        isRead: false,
        sessionId: activeContext.type === 'session' ? activeContext.sessionId : undefined,
        senderType: userType === 'student' ? 'student' : 'tutor'
      };

      setMessages(prev => [...prev, newMessage]);
      setMessage('');
    }
  };

  const handleTemplateSelect = (template: MessageTemplate) => {
    setMessage(template.content);
  };

  // 세션 정보 가져오기
  const getSessionById = (sessionId: string): Session | undefined => {
    return sessions.find(session => session.id === sessionId);
  };

  // 메시지가 현재 사용자의 것인지 확인
  const isOwnMessage = (message: ChatMessage) => {
    return message.senderId === currentUserId;
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

  if (!activeContext) {
    return (
      <div className="h-full flex items-center justify-center bg-white rounded-xl">
        <div className="text-center">
          <p className="text-gray-500">채팅방을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 통합 헤더 - 튜터 정보 + 프로필 정보 */}
      <div className="bg-white flex-shrink-0">
        {/* 메인 헤더 - 튜터 정보 */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-md">
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
                <h3 className="text-md font-bold text-gray-900">{chatRoomInfo.name}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                    {chatRoomInfo.category}
                  </span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <StarIcon sx={{ fontSize: 14 }} className="text-yellow-400" />
                    <span className="font-medium">{chatRoomInfo.rating}</span>
                  </div>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <AccessTimeIcon sx={{ fontSize: 14 }} className="text-gray-400" />
                    {chatRoomInfo.responseTime}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 relative">
              <button 
                onClick={() => setIsOptionsMenuOpen(!isOptionsMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-black cursor-pointer"
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
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      채팅방 나가기
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>


        {/* 컨텍스트 탭 네비게이션 */}
        <div className="px-6 border-b border-gray-200">
          <div className="flex gap-3 py-4 overflow-x-auto scrollbar-hide">
            {contextsWithUnreadCounts.map((context) => {
              const isActive = context.id === activeContextId;
              return (
                <button
                  key={context.id}
                  onClick={() => handleContextChange(context.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold
                    transition-all duration-200 relative whitespace-nowrap cursor-pointer
                    ${isActive
                      ? 'bg-primaryLight text-black border-gray-300'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }
                  `}
                >
                  <span className="text-base">{context.icon}</span>
                  <span>{context.name}</span>
                  
                  {/* 미읽음 메시지 수 */}
                  {context.unreadCount > 0 && (
                    <span className={`
                      text-xs px-2 py-0.5 rounded-full min-w-[18px] text-center font-medium
                      ${isActive 
                        ? 'bg-white/20 text-white border border-white/30' 
                        : 'bg-red-500 text-white'
                      }
                    `}>
                      {context.unreadCount > 99 ? '99+' : context.unreadCount}
                    </span>
                  )}
                  
                  {/* 활성 세션 표시 */}
                  {context.type === 'session' && context.isActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto px-6 py-8 bg-white">
        {filteredMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <p className="text-gray-500 mb-2">
                {activeContext.type === 'session' 
                  ? `${activeContext.name} 세션 대화가 여기에 표시됩니다`
                  : '대화를 시작해보세요'
                }
              </p>
              <p className="text-sm text-gray-400">
                메시지를 입력하면 대화가 시작됩니다
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((msg, index) => {
              const session = msg.sessionId ? getSessionById(msg.sessionId) : undefined;

              return (
                <ChatMessageBubble
                  key={msg.id}
                  message={msg}
                  isOwn={isOwnMessage(msg)}
                  session={session}
                  showAvatar={true}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
        
        {isTyping && (
          <div className="flex justify-start mt-4">
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
      <div className="bg-white border-t border-gray-200">
        <div className="p-6">
          <div className="flex items-end gap-3">
            {/* 첨부 버튼들 */}
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" title="사진">
                <PhotoCameraIcon className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" title="영상">
                <VideocamIcon className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" title="파일">
                <AttachFileIcon className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" title="음성">
                <MicIcon className="text-gray-600" />
              </button>
              <button 
                onClick={() => setIsTemplateSelectorOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" 
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
                  className={`
                    p-3 text-white rounded-full transition-colors disabled:cursor-not-allowed
                    ${message.trim()
                      ? 'bg-primary hover:bg-primary/90 cursor-pointer'
                      : 'bg-gray-300'
                    }
                  `}
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
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
              >
                취소
              </button>
              <button
                onClick={handleExitChatRoom}
                className="flex-1 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
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