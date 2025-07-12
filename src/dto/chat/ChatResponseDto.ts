// 채팅 관련 응답 DTO

export interface ChatRoomSearchResponseDto {
  success: boolean;
  data: {
    rooms: ChatRoomListItemDto[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
    summary: {
      totalRooms: number;
      unreadRooms: number;
      activeRooms: number;
      archivedRooms: number;
    };
  };
}

export interface ChatRoomListItemDto {
  id: string;
  type: 'direct' | 'group' | 'order_related';
  title: string;
  description?: string;
  participants: Array<{
    id: string;
    nickname: string;
    avatar?: string;
    isOnline: boolean;
    lastSeen?: string;
    role: 'member' | 'moderator' | 'admin';
  }>;
  lastMessage?: {
    id: string;
    content: string;
    type: 'text' | 'image' | 'file' | 'system';
    sender: {
      id: string;
      nickname: string;
    };
    sentAt: string;
  };
  unreadCount: number;
  isUnread: boolean;
  isMuted: boolean;
  isArchived: boolean;
  isPinned: boolean;
  order?: {
    id: string;
    orderNumber: string;
    status: string;
    tutorName: string;
  };
  settings: {
    allowFileSharing: boolean;
    allowImageSharing: boolean;
    autoDeleteMessages?: number;
  };
  createdAt: string;
  updatedAt: string;
  lastActivityAt: string;
}

export interface ChatRoomDetailResponseDto {
  success: boolean;
  data: {
    room: ChatRoomDetailDto;
    messages: ChatMessageDto[];
    participants: ChatParticipantDto[];
  };
}

export interface ChatRoomDetailDto {
  id: string;
  type: 'direct' | 'group' | 'order_related';
  title: string;
  description?: string;
  avatar?: string;
  participantCount: number;
  messageCount: number;
  unreadCount: number;
  isUnread: boolean;
  isMuted: boolean;
  isArchived: boolean;
  isPinned: boolean;
  order?: {
    id: string;
    orderNumber: string;
    status: string;
    tutor: {
      id: string;
      nickname: string;
      avatar?: string;
    };
    student: {
      id: string;
      nickname: string;
      avatar?: string;
    };
    scheduledDate: string;
    scheduledTime: string;
  };
  settings: {
    allowFileSharing: boolean;
    allowImageSharing: boolean;
    muteNotifications: boolean;
    autoDeleteMessages?: number;
  };
  permissions: {
    canSendMessages: boolean;
    canSendFiles: boolean;
    canSendImages: boolean;
    canDeleteMessages: boolean;
    canAddParticipants: boolean;
    canRemoveParticipants: boolean;
    canUpdateSettings: boolean;
  };
  createdAt: string;
  updatedAt: string;
  lastActivityAt: string;
}

export interface ChatParticipantDto {
  id: string;
  user: {
    id: string;
    nickname: string;
    avatar?: string;
    userType: 'student' | 'tutor';
  };
  role: 'member' | 'moderator' | 'admin';
  isOnline: boolean;
  lastSeen?: string;
  joinedAt: string;
  leftAt?: string;
  isTyping: boolean;
  unreadCount: number;
  lastReadMessageId?: string;
  lastReadAt?: string;
}

export interface ChatMessageDto {
  id: string;
  roomId: string;
  sender: {
    id: string;
    nickname: string;
    avatar?: string;
    userType: 'student' | 'tutor';
  };
  content: string;
  type: 'text' | 'image' | 'file' | 'system' | 'template';
  replyTo?: {
    messageId: string;
    content: string;
    senderNickname: string;
  };
  attachments: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
    thumbnailUrl?: string;
    metadata?: {
      width?: number;
      height?: number;
      duration?: number;
    };
  }>;
  reactions: Array<{
    emoji: string;
    count: number;
    users: Array<{
      id: string;
      nickname: string;
    }>;
    hasReacted: boolean;
  }>;
  isEdited: boolean;
  editedAt?: string;
  isDeleted: boolean;
  deletedAt?: string;
  isEphemeral: boolean;
  readBy: Array<{
    userId: string;
    readAt: string;
  }>;
  deliveredTo: Array<{
    userId: string;
    deliveredAt: string;
  }>;
  template?: {
    id: string;
    title: string;
    category: string;
    variables: any;
  };
  systemData?: {
    type: 'join' | 'leave' | 'order_update' | 'call_start' | 'call_end';
    data: any;
  };
  sentAt: string;
  updatedAt: string;
}

export interface ChatMessageSendResponseDto {
  success: boolean;
  data: {
    message: ChatMessageDto;
  };
  message?: string;
}

export interface ChatMessageSearchResponseDto {
  success: boolean;
  data: {
    messages: ChatMessageDto[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
    summary: {
      totalMessages: number;
      searchQuery: string;
      roomTitle?: string;
    };
  };
}

export interface ChatFileUploadResponseDto {
  success: boolean;
  data: {
    file: {
      id: string;
      name: string;
      url: string;
      type: string;
      size: number;
      thumbnailUrl?: string;
      metadata?: any;
    };
  };
  message?: string;
}

export interface ChatMessageTemplateResponseDto {
  success: boolean;
  data: {
    templates: Array<{
      id: string;
      title: string;
      content: string;
      category: 'greeting' | 'lesson_info' | 'scheduling' | 'feedback' | 'custom';
      isPublic: boolean;
      tags: string[];
      variables: Array<{
        name: string;
        type: string;
        required: boolean;
        options?: string[];
      }>;
      usageCount: number;
      createdBy: {
        id: string;
        nickname: string;
      };
      createdAt: string;
      updatedAt: string;
    }>;
  };
}

export interface ChatTypingIndicatorDto {
  roomId: string;
  user: {
    id: string;
    nickname: string;
  };
  isTyping: boolean;
  timestamp: string;
}

export interface ChatOnlineStatusDto {
  userId: string;
  isOnline: boolean;
  lastSeen?: string;
  timestamp: string;
}

export interface ChatNotificationDto {
  id: string;
  type: 'new_message' | 'new_room' | 'participant_joined' | 'participant_left';
  roomId: string;
  roomTitle: string;
  sender?: {
    id: string;
    nickname: string;
    avatar?: string;
  };
  content: string;
  data?: any;
  isRead: boolean;
  createdAt: string;
}

export interface ChatRoomCreateResponseDto {
  success: boolean;
  data: {
    room: ChatRoomDetailDto;
  };
  message?: string;
}

export interface ChatStatisticsResponseDto {
  success: boolean;
  data: {
    overview: {
      totalRooms: number;
      totalMessages: number;
      activeRooms: number;
      averageResponseTime: number;
    };
    messagesByType: Array<{
      type: string;
      count: number;
      percentage: number;
    }>;
    activityByHour: Array<{
      hour: number;
      messageCount: number;
    }>;
    topParticipants: Array<{
      userId: string;
      nickname: string;
      messageCount: number;
      responseTime: number;
    }>;
  };
}