// 채팅 관련 요청 DTO

export interface ChatRoomCreateRequestDto {
  participants: string[]; // user IDs
  type: 'direct' | 'group' | 'order_related';
  orderId?: string;
  title?: string;
  description?: string;
}

export interface ChatRoomSearchRequestDto {
  page?: number;
  limit?: number;
  type?: 'direct' | 'group' | 'order_related';
  status?: 'active' | 'archived' | 'muted';
  search?: string;
  hasUnread?: boolean;
  sortBy?: 'last_message' | 'created_date' | 'participant_count';
  sortOrder?: 'asc' | 'desc';
}

export interface ChatMessageSendRequestDto {
  roomId: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'system' | 'template';
  replyToMessageId?: string;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
    size: number;
    thumbnailUrl?: string;
  }>;
  templateId?: string;
  templateData?: any;
  isEphemeral?: boolean; // message disappears after reading
}

export interface ChatMessageUpdateRequestDto {
  messageId: string;
  content: string;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
}

export interface ChatMessageReactionRequestDto {
  messageId: string;
  emoji: string;
  action: 'add' | 'remove';
}

export interface ChatRoomUpdateRequestDto {
  roomId: string;
  title?: string;
  description?: string;
  settings?: {
    allowFileSharing: boolean;
    allowImageSharing: boolean;
    muteNotifications: boolean;
    autoDeleteMessages?: number; // days
  };
}

export interface ChatRoomParticipantRequestDto {
  roomId: string;
  userId: string;
  action: 'add' | 'remove' | 'promote' | 'demote';
  role?: 'member' | 'moderator' | 'admin';
}

export interface ChatMessageMarkReadRequestDto {
  roomId: string;
  messageIds?: string[]; // if not provided, marks all messages as read
  readAt?: string;
}

export interface ChatRoomArchiveRequestDto {
  roomId: string;
  action: 'archive' | 'unarchive';
}

export interface ChatMessageSearchRequestDto {
  roomId?: string;
  query: string;
  type?: 'text' | 'image' | 'file';
  fromDate?: string;
  toDate?: string;
  fromUserId?: string;
  page?: number;
  limit?: number;
}

export interface ChatFileUploadRequestDto {
  roomId: string;
  file: File;
  type: 'image' | 'document' | 'audio' | 'video';
  generateThumbnail?: boolean;
}

export interface ChatMessageTemplateCreateRequestDto {
  title: string;
  content: string;
  category: 'greeting' | 'lesson_info' | 'scheduling' | 'feedback' | 'custom';
  isPublic: boolean;
  tags?: string[];
  variables?: Array<{
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    required: boolean;
    options?: string[];
  }>;
}

export interface ChatNotificationSettingsRequestDto {
  roomId?: string; // if not provided, updates global settings
  settings: {
    enabled: boolean;
    sound: boolean;
    desktop: boolean;
    mobile: boolean;
    email: boolean;
    muteUntil?: string;
    keywords?: string[];
  };
}