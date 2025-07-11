"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

interface Notification {
  id: string;
  category: 'trade' | 'fitkle';
  type: 'comment' | 'like' | 'answer' | 'system' | 'message' | 'payment' | 'booking' | 'review';
  title: string;
  content: string;
  timeAgo: string;
  isRead: boolean;
  actionUrl?: string;
  avatar?: string;
  userName?: string;
}

const mockNotifications: Notification[] = [
  // 거래 알림
  {
    id: '1',
    category: 'trade',
    type: 'payment',
    title: '결제가 완료되었습니다',
    content: '기타 레슨 1시간 결제가 완료되었습니다.',
    timeAgo: '5분 전',
    isRead: false,
    actionUrl: '/order/12345',
    avatar: '💳',
    userName: '결제시스템'
  },
  {
    id: '2',
    category: 'trade',
    type: 'booking',
    title: '예약이 확정되었습니다',
    content: '이기타 튜터와의 기타 레슨이 확정되었습니다.',
    timeAgo: '30분 전',
    isRead: false,
    actionUrl: '/booking/67890',
    avatar: '📅',
    userName: '이기타'
  },
  {
    id: '3',
    category: 'trade',
    type: 'review',
    title: '리뷰를 작성해주세요',
    content: '완료된 요리 레슨에 대한 리뷰를 남겨주세요.',
    timeAgo: '2시간 전',
    isRead: true,
    actionUrl: '/review/write/54321',
    avatar: '⭐',
    userName: '김요리셰프'
  },
  // 핏클 알림
  {
    id: '4',
    category: 'fitkle',
    type: 'answer',
    title: '새로운 답변이 달렸습니다',
    content: '파스타 소스 질문에 전문가가 답변을 남겼습니다.',
    timeAgo: '1시간 전',
    isRead: false,
    actionUrl: '/post/1',
    avatar: '👨‍🍳',
    userName: '이요리셰프'
  },
  {
    id: '5',
    category: 'fitkle',
    type: 'like',
    title: '좋아요를 받았습니다',
    content: '김치볶음밥 성공 후기에 3개의 좋아요가 달렸습니다.',
    timeAgo: '3시간 전',
    isRead: false,
    actionUrl: '/post/5',
    avatar: '👍',
    userName: '커뮤니티'
  },
  {
    id: '6',
    category: 'fitkle',
    type: 'comment',
    title: '새로운 댓글',
    content: '기타 F코드 가이드에 댓글이 달렸습니다.',
    timeAgo: '5시간 전',
    isRead: true,
    actionUrl: '/post/2',
    avatar: '💬',
    userName: '기타초보자'
  },
  {
    id: '7',
    category: 'fitkle',
    type: 'system',
    title: '주간 학습 리포트',
    content: '이번 주에 3개의 질문을 해결했습니다!',
    timeAgo: '1일 전',
    isRead: true,
    actionUrl: '/profile/manage',
    avatar: '📊',
    userName: 'Fitkle'
  },
  {
    id: '8',
    category: 'fitkle',
    type: 'message',
    title: '튜터에게 메시지가 도착했습니다',
    content: '박트레이너님이 운동 상담 메시지를 보냈습니다.',
    timeAgo: '2일 전',
    isRead: false,
    actionUrl: '/chat',
    avatar: '💪',
    userName: '박트레이너'
  }
];

interface NotificationDropdownProps {
  className?: string;
}

export function NotificationDropdown({ className = '' }: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'trade' | 'fitkle'>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const filteredNotifications = (() => {
    if (filter === 'unread') return notifications.filter(n => !n.isRead);
    if (filter === 'trade') return notifications.filter(n => n.category === 'trade');
    if (filter === 'fitkle') return notifications.filter(n => n.category === 'fitkle');
    return notifications;
  })();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'comment':
        return '💬';
      case 'like':
        return '👍';
      case 'answer':
        return '💡';
      case 'system':
        return '📊';
      case 'message':
        return '💬';
      case 'payment':
        return '💳';
      case 'booking':
        return '📅';
      case 'review':
        return '⭐';
      default:
        return '🔔';
    }
  };

  const getNotificationColor = (isRead: boolean) => {
    return isRead ? 'border-transparent' : 'bg-primaryLight border-primary/20';
  };

  const getCategoryBadge = (category: string) => {
    return category === 'trade' 
      ? { text: '거래', color: 'bg-primary text-white' }
      : { text: '핏클', color: 'bg-gray-500 text-white' };
  };

  const handleDeleteNotification = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleDeleteAllNotifications = () => {
    if (confirm('모든 알림을 삭제하시겠습니까?')) {
      setNotifications([]);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* 알림 버튼 */}
      <button
        className="relative hover:bg-gray-100 rounded-full p-2 cursor-pointer transition-colors"
        title="알림"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
          />
        </svg>
        
        {/* 미읽음 알림 개수 표시 */}
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
      </button>

      {/* 드롭다운 */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 h-96 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 overflow-hidden flex flex-col">
          {/* 헤더 */}
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <NotificationsIcon className="text-primary" />
                <h3 className="font-bold text-lg text-gray-900">알림</h3>
                {unreadCount > 0 && (
                  <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold">
                    {unreadCount}개
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-xs text-primary hover:text-primary/80 font-medium cursor-pointer"
                  >
                    모두 읽음
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    onClick={handleDeleteAllNotifications}
                    className="text-xs text-red-600 hover:text-red-800 font-medium cursor-pointer"
                  >
                    모두 삭제
                  </button>
                )}
              </div>
            </div>
            
            {/* 필터 버튼 */}
            <div className="flex gap-1 flex-wrap">
              <button
                onClick={() => setFilter('all')}
                className={`px-2 py-1 text-xs rounded-full font-medium transition-colors cursor-pointer ${
                  filter === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-2 py-1 text-xs rounded-full font-medium transition-colors cursor-pointer ${
                  filter === 'unread'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                안읽음
              </button>
              <button
                onClick={() => setFilter('trade')}
                className={`px-2 py-1 text-xs rounded-full font-medium transition-colors cursor-pointer ${
                  filter === 'trade'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                거래알림
              </button>
              <button
                onClick={() => setFilter('fitkle')}
                className={`px-2 py-1 text-xs rounded-full font-medium transition-colors cursor-pointer ${
                  filter === 'fitkle'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                핏클알림
              </button>
            </div>
          </div>

          {/* 알림 리스트 */}
          <div className="flex-1 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                <NotificationsIcon className="mx-auto mb-2 text-gray-300" sx={{ fontSize: 48 }} />
                <p>
                  {filter === 'unread' && '읽지 않은 알림이 없습니다'}
                  {filter === 'trade' && '거래 알림이 없습니다'}
                  {filter === 'fitkle' && '핏클 알림이 없습니다'}
                  {filter === 'all' && '새로운 알림이 없습니다'}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const categoryBadge = getCategoryBadge(notification.category);
                return (
                <div key={notification.id} className="group">
                  <Link
                    href={notification.actionUrl || '#'}
                    className={`block px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                      getNotificationColor(notification.isRead)
                    }`}
                    onClick={() => {
                      handleMarkAsRead(notification.id);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {/* 아바타/아이콘 */}
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg flex-shrink-0">
                        {notification.avatar || getNotificationIcon(notification.type)}
                      </div>

                      {/* 알림 내용 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`text-sm font-semibold ${
                                !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                              }`}>
                                {notification.title}
                              </h4>
                              <span className={`px-2 py-0.5 text-xs rounded-full font-bold ${categoryBadge.color}`}>
                                {categoryBadge.text}
                              </span>
                              {!notification.isRead && (
                                <FiberManualRecordIcon 
                                  className="text-primary" 
                                  sx={{ fontSize: 8 }} 
                                />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {notification.content}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <AccessTimeIcon sx={{ fontSize: 12 }} />
                              <span>{notification.timeAgo}</span>
                              {notification.userName && (
                                <>
                                  <span>•</span>
                                  <span>{notification.userName}</span>
                                </>
                              )}
                            </div>
                          </div>

                          {/* 삭제 버튼 */}
                          <button
                            onClick={(e) => handleDeleteNotification(notification.id, e)}
                            className="opacity-70 group-hover:opacity-100 hover:bg-red-100 hover:text-red-600 rounded-full p-1 transition-all flex-shrink-0 cursor-pointer"
                            title="알림 삭제"
                          >
                            <DeleteIcon sx={{ fontSize: 16 }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )})
            )}
          </div>

        </div>
      )}
    </div>
  );
}