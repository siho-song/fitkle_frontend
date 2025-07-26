"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PaymentIcon from '@mui/icons-material/Payment';
import StarIcon from '@mui/icons-material/Star';
import CircleIcon from '@mui/icons-material/Circle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { MessageTemplateSelector } from './MessageTemplateSelector';
import { TemplateGuidePopup } from './TemplateGuidePopup';
import { ChatMessageBubble } from './ChatMessageBubble';
import { DateSeparator } from './DateSeparator';
import { CalendarPicker } from './CalendarPicker';
import { ChatSearch } from './ChatSearch';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { MessageTemplate } from '@/types/messageTemplate';
import { ChatMessage, ChatContext, Session } from '@/types/entities/chat';
import { useChatFilters } from '@/hooks/useChatFilters';
import type { UserType } from '@/features/auth/types/auth';
import { getChatRoomData, getChatRoomInfo, markContextMessagesAsRead } from '@/mocks/chatData';



interface ChatRoomProps {
  chatId: string;
  userType?: UserType;
  currentUserId?: string;
  onMessagesRead?: (chatId: string, readCount: number) => void;
}

export function ChatRoom({ chatId, userType = 'student', currentUserId = 'current_user', onMessagesRead }: ChatRoomProps) {
  const [message, setMessage] = useState('');
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);
  const [activeContextId, setActiveContextId] = useState('general');
  
  // 필터링 상태
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // 실제 검색에 사용되는 쿼리
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentSearchMatch, setCurrentSearchMatch] = useState(0);
  const [searchMatches, setSearchMatches] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // chatId에 따른 동적 데이터 로딩
  const chatRoomData = getChatRoomData(chatId, userType);
  const [messages, setMessages] = useState<ChatMessage[]>(chatRoomData.messages);
  const [contexts, setContexts] = useState<ChatContext[]>(chatRoomData.contexts);
  const [sessions, setSessions] = useState<Session[]>(chatRoomData.sessions);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // 검색창 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSearch && searchRef.current && !searchRef.current.contains(event.target as Node)) {
        console.log('Outside click detected - closing search');
        setShowSearch(false);
        setSearchTerm('');
        setSearchQuery('');
        setSearchMatches([]);
        setCurrentSearchMatch(0);
      }
    };

    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearch]);

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
    filteredMessages: contextFilteredMessages,
    contextsWithUnreadCounts,
    activeContext
  } = useChatFilters({
    messages,
    contexts,
    activeContextId
  });

  // 검색 매치 찾기 (시간순으로 정렬)
  useEffect(() => {
    if (searchQuery && contextFilteredMessages.length > 0) {
      const matches: string[] = [];
      // 시간순으로 정렬된 메시지에서 검색
      const sortedMessages = [...contextFilteredMessages].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      
      sortedMessages.forEach(msg => {
        if (msg.content.toLowerCase().includes(searchQuery.toLowerCase())) {
          matches.push(msg.id);
        }
      });
      setSearchMatches(matches);
      
      if (matches.length > 0) {
        // 가장 최근 매치로 설정 (배열의 마지막 요소)
        const latestMatchIndex = matches.length;
        setCurrentSearchMatch(latestMatchIndex);
        // 자동으로 가장 최근 매치로 스크롤
        setTimeout(() => scrollToSearchMatch(matches[latestMatchIndex - 1]), 100);
      } else {
        setCurrentSearchMatch(0);
      }
    } else {
      setSearchMatches([]);
      setCurrentSearchMatch(0);
    }
  }, [searchQuery, contextFilteredMessages]);

  // 모든 메시지를 표시 (날짜 필터링 제거)
  const filteredMessages = useMemo(() => {
    return contextFilteredMessages;
  }, [contextFilteredMessages]);

  // 메시지가 있는 날짜들 추출
  const availableDates = useMemo(() => {
    const dates = new Set<string>();
    contextFilteredMessages.forEach(msg => {
      const date = new Date(msg.timestamp);
      // 로컬 시간대로 날짜 계산
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      dates.add(dateString);
    });
    return Array.from(dates).sort().reverse(); // 최신 날짜부터
  }, [contextFilteredMessages]);

  // 날짜별로 메시지 그룹핑
  const groupedMessages = useMemo(() => {
    const groups: { [date: string]: ChatMessage[] } = {};
    
    filteredMessages.forEach(msg => {
      const date = new Date(msg.timestamp);
      // 로컬 시간대로 날짜 계산
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      
      if (!groups[dateString]) {
        groups[dateString] = [];
      }
      groups[dateString].push(msg);
    });

    return groups;
  }, [filteredMessages]);

  const chatRoomInfo = getChatRoomInfo(chatId);

  // 메시지가 업데이트될 때 스크롤을 하단으로
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
  }, [filteredMessages]);

  // 탭 전환 시 해당 컨텍스트의 메시지들을 읽음 처리
  useEffect(() => {
    if (activeContext) {
      // 현재 활성 컨텍스트에서 읽지 않은 메시지들 찾기
      const contextUnreadMessages = contextFilteredMessages.filter(msg => 
        !msg.isRead && msg.senderId !== currentUserId
      );
      
      if (contextUnreadMessages.length > 0) {
        // mock 데이터에서 실제로 메시지를 읽음 처리
        const readMessagesCount = markContextMessagesAsRead(
          chatId,
          userType,
          activeContext.id,
          activeContext.type === 'session' ? activeContext.sessionId : undefined,
          currentUserId
        );
        
        // 로컬 상태도 업데이트 (UI 즉시 반영)
        setMessages(prev => 
          prev.map(msg => {
            // 현재 사용자가 보낸 메시지가 아니고, 읽지 않은 메시지인 경우
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
        
        // 상위 컴포넌트에 읽음 상태 변경 알림
        if (onMessagesRead && readMessagesCount > 0) {
          onMessagesRead(chatId, readMessagesCount);
        }
      }
    }
  }, [activeContextId, currentUserId, activeContext, chatId, onMessagesRead]);

  // 컨텍스트 변경 핸들러
  const handleContextChange = (contextId: string) => {
    setActiveContextId(contextId);
  };

  // 토스트 메시지 표시 함수
  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  // 검색 탐색 함수들
  const handleNextMatch = () => {
    if (searchMatches.length > 0) {
      if (currentSearchMatch >= searchMatches.length) {
        showToastMessage('더 이상 검색 결과가 없습니다');
        return;
      }
      const nextMatch = currentSearchMatch + 1;
      setCurrentSearchMatch(nextMatch);
      scrollToSearchMatch(searchMatches[nextMatch - 1]);
    }
  };

  const handlePreviousMatch = () => {
    if (searchMatches.length > 0) {
      if (currentSearchMatch <= 1) {
        showToastMessage('첫 번째 검색 결과입니다');
        return;
      }
      const prevMatch = currentSearchMatch - 1;
      setCurrentSearchMatch(prevMatch);
      scrollToSearchMatch(searchMatches[prevMatch - 1]);
    }
  };

  const scrollToSearchMatch = (messageId: string) => {
    const messageElement = document.querySelector(`[data-message-id="${messageId}"]`);
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleSearchSubmit = () => {
    setSearchQuery(searchTerm);
  };

  const scrollToDate = (dateString: string) => {
    const dateElement = document.querySelector(`[data-date="${dateString}"]`);
    if (dateElement) {
      dateElement.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
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
    <div className="h-full flex flex-col bg-white relative">
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
              {/* 검색 아이콘 */}
              <button 
                onClick={() => {
                  if (showSearch) {
                    // 검색창이 열려있으면 닫기
                    setShowSearch(false);
                    setSearchTerm('');
                    setSearchQuery('');
                    setSearchMatches([]);
                    setCurrentSearchMatch(0);
                  } else {
                    // 검색창이 닫혀있으면 열기
                    setShowSearch(true);
                  }
                }}
                className={`p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer ${
                  showSearch ? 'bg-gray-100 text-black' : 'text-black'
                }`}
                title={showSearch ? '검색창 닫기' : '검색창 열기'}
              >
                <SearchIcon />
              </button>
              
              {/* 달력 아이콘 */}
              <div className="relative">
                <button 
                  onClick={() => setShowCalendar(!showCalendar)}
                  className={`p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer ${
                    selectedDate ? 'text-black' : 'text-black'
                  }`}
                >
                  <CalendarTodayIcon />
                </button>
                
                {/* 달력 피커 */}
                {showCalendar && (
                  <CalendarPicker
                    selectedDate={selectedDate}
                    onDateSelect={(date) => {
                      setSelectedDate(date || null);
                      setShowCalendar(false);
                      if (date) {
                        // 약간의 지연 후 해당 날짜로 스크롤
                        setTimeout(() => scrollToDate(date), 100);
                      }
                    }}
                    availableDates={availableDates}
                    onClose={() => setShowCalendar(false)}
                  />
                )}
              </div>
              
              {/* 옵션 메뉴 아이콘 */}
              <button 
                onClick={() => setIsOptionsMenuOpen(!isOptionsMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-black cursor-pointer"
              >
                <MoreVertIcon />
              </button>
              
              {/* 옵션 메뉴 오버레이 */}
              {isOptionsMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsExitDialogOpen(true);
                        setIsOptionsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm font-semibold text-warning hover:bg-gray-100 transition-colors cursor-pointer"
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
          <div className="flex gap-3 py-3 overflow-x-auto scrollbar-hide">
            {contextsWithUnreadCounts.map((context) => {
              const isActive = context.id === activeContextId;
              return (
                <button
                  key={context.id}
                  onClick={() => handleContextChange(context.id)}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold
                    transition-all duration-200 relative whitespace-nowrap cursor-pointer
                    ${isActive
                      ? 'bg-primaryLight text-black border-gray-300'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }
                  `}
                >
                  <span className="text-sm">{context.icon}</span>
                  <span>{context.name}</span>
                  
                  {/* 미읽음 메시지 수 */}
                  {context.unreadCount > 0 && (
                    <span className={`
                      text-xs px-1.5 py-0.5 rounded-full min-w-[16px] text-center font-medium
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

        {/* 검색 바 (검색 아이콘 클릭 시만 표시) */}
        {showSearch && (
          <div ref={searchRef}>
            <ChatSearch
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
              currentMatch={currentSearchMatch}
              totalMatches={searchMatches.length}
              onPreviousMatch={handlePreviousMatch}
              onNextMatch={handleNextMatch}
              onClose={() => {
                setShowSearch(false);
                // 검색창이 닫힐 때 검색 관련 상태 초기화
                setSearchTerm('');
                setSearchQuery('');
                setSearchMatches([]);
                setCurrentSearchMatch(0);
              }}
            />
          </div>
        )}
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
            {Object.keys(groupedMessages)
              .sort() // 날짜 순으로 정렬
              .map((date) => (
                <div key={date}>
                  {/* 날짜 구분선 */}
                  <div data-date={date}>
                    <DateSeparator date={date} />
                  </div>
                  
                  {/* 해당 날짜의 메시지들 */}
                  <div className="space-y-4">
                    {groupedMessages[date].map((msg: ChatMessage) => {
                      const session = msg.sessionId ? getSessionById(msg.sessionId) : undefined;
                      const isCurrentMatch = searchMatches.length > 0 && 
                        searchMatches[currentSearchMatch - 1] === msg.id;

                      return (
                        <div key={msg.id} data-message-id={msg.id}>
                          <ChatMessageBubble
                            message={msg}
                            isOwn={isOwnMessage(msg)}
                            session={session}
                            showAvatar={true}
                            searchTerm={searchQuery}
                            isCurrentSearchMatch={isCurrentMatch}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            <div ref={messagesEndRef} />
          </div>
        )}
        
      </div>

      {/* 메시지 입력 영역 */}
      <div className="bg-white border-t border-gray-200">
        <div className="p-4">
          <div className="flex items-end gap-3">
            {/* 첨부 버튼들 */}
            <div className="flex gap-1">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" title="화상통화">
                <VideocamIcon className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" title="파일">
                <AttachFileIcon className="text-gray-600" />
              </button>
              <div className="relative group">
                <button 
                  onClick={() => setIsTemplateSelectorOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" 
                  title="메시지 템플릿"
                >
                  <span className="text-gray-600">📝</span>
                </button>
                <div className="opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                  <TemplateGuidePopup userType={userType} />
                </div>
              </div>
            </div>

            {/* 메시지 입력 */}
            <div className="flex-1 flex items-end gap-4">
              <div className="flex-1 border border-gray-300 rounded-2xl px-4 focus-within:border-primary transition-colors flex items-center min-h-[44px]">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="메시지를 입력하세요..."
                  className="w-full resize-none outline-none text-sm max-h-20 text-black flex-1"
                  rows={1}
                  style={{ 
                    lineHeight: '1.5',
                    minHeight: '24px',
                    padding: '8px 0',
                    margin: '0',
                    border: 'none',
                    background: 'transparent',
                    verticalAlign: 'top'
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className={`
                    p-2 text-white rounded-full transition-colors disabled:cursor-not-allowed
                    ${message.trim()
                      ? 'bg-primary hover:bg-primary/90 cursor-pointer'
                      : 'bg-gray-300'
                    }
                  `}
                >
                  <SendIcon sx={{ fontSize: 20 }} />
                </button>
              </div>
            </div>
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
      <ConfirmDialog
        isOpen={isExitDialogOpen}
        onClose={() => setIsExitDialogOpen(false)}
        onConfirm={handleExitChatRoom}
        message={`정말 채팅방을 나가시겠어요?
나가기 후에는 이전 대화 내용을 확인할 수 없어요.`}
        confirmText="나가기"
        cancelText="취소"
        confirmButtonColor="red"
      />

      {/* 옵션 메뉴 외부 클릭 시 닫기 */}
      {isOptionsMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOptionsMenuOpen(false)}
        />
      )}

      {/* 달력 외부 클릭 시 닫기 */}
      {showCalendar && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowCalendar(false)}
        />
      )}


      {/* 토스트 메시지 */}
      {showToast && (
        <div className="absolute inset-0 flex items-center justify-center z-[60] pointer-events-none">
          <div className="bg-black text-white px-4 py-2 rounded-lg text-sm">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}