import { useMemo } from 'react';
import { ChatMessage, ChatContext } from '@/types/entities/chat';

interface UseChatFiltersProps {
  messages: ChatMessage[];
  contexts: ChatContext[];
  activeContextId: string;
}

export function useChatFilters({ messages, contexts, activeContextId }: UseChatFiltersProps) {
  const activeContext = contexts.find(c => c.id === activeContextId);

  const filteredMessages = useMemo(() => {
    if (!activeContext) return messages;

    if (activeContext.type === 'general') {
      // 일반 상담: sessionId가 null인 메시지들만
      return messages.filter(message => !message.sessionId);
    } else {
      // 세션: 해당 sessionId를 가진 메시지들만
      return messages.filter(message => message.sessionId === activeContext.sessionId);
    }
  }, [messages, activeContext]);

  const updateUnreadCounts = (contexts: ChatContext[], messages: ChatMessage[]): ChatContext[] => {
    return contexts.map(context => {
      let contextMessages: ChatMessage[];
      
      if (context.type === 'general') {
        contextMessages = messages.filter(msg => !msg.sessionId);
      } else {
        contextMessages = messages.filter(msg => msg.sessionId === context.sessionId);
      }
      
      const unreadCount = contextMessages.filter(msg => !msg.isRead).length;
      
      return {
        ...context,
        unreadCount
      };
    });
  };

  const contextsWithUnreadCounts = useMemo(() => {
    return updateUnreadCounts(contexts, messages);
  }, [contexts, messages]);

  const getSessionMessages = (sessionId: string) => {
    return messages.filter(message => message.sessionId === sessionId);
  };

  const getGeneralMessages = () => {
    return messages.filter(message => !message.sessionId);
  };

  return {
    filteredMessages,
    contextsWithUnreadCounts,
    activeContext,
    getSessionMessages,
    getGeneralMessages
  };
}