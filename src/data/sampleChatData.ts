import { ChatRoom, ChatMessage, Session, ChatContext } from '@/types/entities/chat';

// 샘플 세션 데이터
export const sampleSessions: Session[] = [
  {
    id: 'session_vocal_001',
    type: 'vocal',
    name: '보컬 레슨',
    duration: 30,
    price: 30000,
    startTime: new Date('2024-01-15T14:00:00'),
    endTime: new Date('2024-01-15T14:30:00'),
    status: 'completed',
    chatRoomId: 'room_001'
  },
  {
    id: 'session_pronunciation_001',
    type: 'pronunciation',
    name: '발성 상담',
    duration: 60,
    price: 50000,
    startTime: new Date('2024-01-16T15:00:00'),
    status: 'active',
    chatRoomId: 'room_001'
  }
];

// 샘플 컨텍스트 데이터
export const sampleContexts: ChatContext[] = [
  {
    id: 'general',
    name: '일반 상담',
    icon: '💬',
    type: 'general',
    isActive: true,
    unreadCount: 2
  },
  {
    id: 'session_vocal_001',
    name: '보컬 레슨 (진행)',
    icon: '🎵',
    type: 'session',
    sessionType: 'vocal',
    sessionId: 'session_vocal_001',
    isActive: false,
    unreadCount: 0
  },
  {
    id: 'session_pronunciation_001',
    name: '발성 상담 (완료)',
    icon: '🗣️',
    type: 'session',
    sessionType: 'pronunciation',
    sessionId: 'session_pronunciation_001',
    isActive: true,
    unreadCount: 1
  }
];

// 샘플 메시지 데이터
export const sampleMessages: ChatMessage[] = [
  // 일반 상담 메시지들
  {
    id: 'msg_001',
    chatRoomId: 'room_001',
    senderId: 'student_001',
    senderName: '김학생',
    type: 'text',
    content: '안녕하세요! 보컬 레슨에 관심이 있으시구요. 어떤 부분이 궁금하신가요?',
    timestamp: '2024-01-15T10:30:00',
    isRead: true,
    senderType: 'student'
  },
  {
    id: 'msg_002',
    chatRoomId: 'room_001',
    senderId: 'tutor_001',
    senderName: '김민수 튜터',
    type: 'text',
    content: '고음 부분에서 항상 막히는데, 어떻게 연습해야 할까요?',
    timestamp: '2024-01-15T10:32:00',
    isRead: true,
    senderType: 'tutor'
  },
  
  // 보컬 레슨 세션 시작
  {
    id: 'msg_003',
    chatRoomId: 'room_001',
    senderId: 'system',
    senderName: '시스템',
    type: 'session_start',
    content: '보컬 레슨 세션이 시작되었습니다.',
    timestamp: '2024-01-15T14:00:00',
    isRead: true,
    sessionId: 'session_vocal_001',
    senderType: 'tutor'
  },
  
  // 보컬 레슨 중 메시지들
  {
    id: 'msg_004',
    chatRoomId: 'room_001',
    senderId: 'tutor_001',
    senderName: '김민수 튜터',
    type: 'text',
    content: '세션이 시작되었습니다! 먼저 현재 발성 상태를 확인해볼게요. 간단한 스케일로 녹음 파일을 보내주실 수 있나요?',
    timestamp: '2024-01-15T14:01:00',
    isRead: true,
    sessionId: 'session_vocal_001',
    senderType: 'tutor'
  },
  
  // 보컬 레슨 세션 종료
  {
    id: 'msg_005',
    chatRoomId: 'room_001',
    senderId: 'system',
    senderName: '시스템',
    type: 'session_end',
    content: '보컬 레슨 세션이 종료되었습니다.',
    timestamp: '2024-01-15T14:30:00',
    isRead: true,
    sessionId: 'session_vocal_001',
    senderType: 'tutor'
  },
  
  // 발성 상담 세션 시작
  {
    id: 'msg_006',
    chatRoomId: 'room_001',
    senderId: 'system',
    senderName: '시스템',
    type: 'session_start',
    content: '발성 상담 세션이 시작되었습니다.',
    timestamp: '2024-01-16T15:00:00',
    isRead: true,
    sessionId: 'session_pronunciation_001',
    senderType: 'tutor'
  },
  
  // 발성 상담 중 메시지
  {
    id: 'msg_007',
    chatRoomId: 'room_001',
    senderId: 'tutor_001',
    senderName: '김민수 튜터',
    type: 'text',
    content: '세션이 시작되었습니다! 먼저 현재 발성 상태를 확인해볼게요. 간단한 스케일로 녹음 파일을 보내주실 수 있나요?',
    timestamp: '2024-01-16T15:01:00',
    isRead: false,
    sessionId: 'session_pronunciation_001',
    senderType: 'tutor'
  },
  
  // 최근 일반 상담 메시지들
  {
    id: 'msg_008',
    chatRoomId: 'room_001',
    senderId: 'student_001',
    senderName: '김학생',
    type: 'text',
    content: '어제 레슨 너무 도움이 됐어요! 연습 방법대로 해보니까 확실히 다르네요',
    timestamp: '2024-01-16T18:00:00',
    isRead: false,
    senderType: 'student'
  },
  {
    id: 'msg_009',
    chatRoomId: 'room_001',
    senderId: 'tutor_001',
    senderName: '김민수 튜터',
    type: 'text',
    content: '다행이에요! 꾸준히 연습하시면 더 좋아질 거예요. 다음 레슨 때 더 고급 기법도 알려드릴게요',
    timestamp: '2024-01-16T18:15:00',
    isRead: false,
    senderType: 'tutor'
  }
];

// 샘플 채팅방 데이터
export const sampleChatRoom: ChatRoom = {
  id: 'room_001',
  participants: [
    {
      userId: 'student_001',
      userName: '김학생',
      userType: 'student',
      joinedAt: '2024-01-15T10:00:00',
      lastReadAt: '2024-01-16T17:00:00',
      isOnline: true
    },
    {
      userId: 'tutor_001',
      userName: '김민수 튜터',
      userAvatar: 'https://example.com/avatar.jpg',
      userType: 'tutor',
      joinedAt: '2024-01-15T10:00:00',
      lastReadAt: '2024-01-16T18:15:00',
      isOnline: true
    }
  ],
  lastMessage: sampleMessages[sampleMessages.length - 1],
  lastMessageAt: '2024-01-16T18:15:00',
  unreadCount: 3,
  status: 'active',
  createdAt: '2024-01-15T10:00:00',
  tutorId: 'tutor_001',
  studentId: 'student_001',
  sessions: sampleSessions,
  contexts: sampleContexts,
  activeContextId: 'general',
  messages: sampleMessages
};