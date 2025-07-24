// 채팅 관련 타입 정의

export type MessageType = 'text' | 'image' | 'file' | 'system' | 'template' | 'session_start' | 'session_end';

// 세션 관련 타입
export interface Session {
  id: string;
  type: 'vocal' | 'pronunciation' | 'guitar' | 'piano' | 'other';
  name: string;
  duration: number; // minutes
  price: number;
  startTime: Date;
  endTime?: Date;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  chatRoomId: string;
}

// 채팅 컨텍스트 타입
export interface ChatContext {
  id: string;
  name: string;
  icon: string;
  type: 'general' | 'session';
  sessionType?: Session['type'];
  sessionId?: string;
  isActive: boolean;
  unreadCount: number;
}

export type ChatStatus = 'active' | 'archived' | 'blocked';

export interface ChatMessage {
  id: string;
  chatRoomId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  type: MessageType;
  content: string;
  timestamp: string;
  isRead: boolean;
  editedAt?: string;
  replyTo?: string; // reply to message id
  sessionId?: string; // null for general consultation, sessionId for paid sessions
  senderType: 'tutor' | 'student';
  
  // 파일 메시지용
  fileName?: string;
  fileUrl?: string;
  fileSize?: number;
  
  // 시스템 메시지용
  systemType?: 'join' | 'leave' | 'order_created' | 'order_completed';
}

export interface ChatRoom {
  id: string;
  participants: ChatParticipant[];
  lastMessage?: ChatMessage;
  lastMessageAt: string;
  unreadCount: number;
  status: ChatStatus;
  createdAt: string;
  
  // 튜터링 관련
  orderId?: string;
  tutorId?: string;
  studentId?: string;
  
  // 세션 관련
  sessions: Session[];
  contexts: ChatContext[];
  activeContextId: string;
  
  // 그룹 채팅용 (미래 확장)
  isGroup?: boolean;
  groupName?: string;
  groupAvatar?: string;
}

export interface ChatParticipant {
  userId: string;
  userName: string;
  userAvatar?: string;
  userType: 'student' | 'tutor';
  joinedAt: string;
  lastReadAt: string;
  isOnline: boolean;
}

// 메시지 템플릿
export interface MessageTemplate {
  id: string;
  title: string;
  content: string;
  category: string;
  isPersonal: boolean;
  usage: number;
  createdAt: string;
  updatedAt: string;
}

export interface MessageTemplateFormData {
  title: string;
  content: string;
  category: string;
}

// 채팅 필터
export interface ChatFilters {
  status?: ChatStatus | 'all';
  type?: 'tutor' | 'student' | 'all';
  searchQuery?: string;
  sortBy?: 'latest' | 'unread' | 'name';
}

// 채팅 알림
export interface ChatNotification {
  id: string;
  chatRoomId: string;
  messageId: string;
  userId: string;
  type: 'new_message' | 'mention' | 'file_received';
  isRead: boolean;
  createdAt: string;
}