"use client";

import React, { useState, useRef } from 'react';
import { ChatContext } from '@/types/entities/chat';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

interface ChatInputProps {
  activeContext: ChatContext;
  onSendMessage: (content: string, contextId: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  activeContext, 
  onSendMessage, 
  disabled = false,
  placeholder 
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || disabled) return;

    onSendMessage(message.trim(), activeContext.id);
    setMessage('');
    
    // 텍스트 영역 높이 리셋
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // 자동 높이 조절
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    
    if (activeContext.type === 'session') {
      return `${activeContext.name} 세션 중... 메시지를 입력하세요`;
    }
    return '메시지를 입력하세요...';
  };

  const getInputBorderColor = () => {
    if (activeContext.type === 'session') {
      return 'border-purple-200 focus:border-purple-500 focus:ring-purple-500';
    }
    return 'border-gray-200 focus:border-blue-500 focus:ring-blue-500';
  };

  const getSendButtonColor = () => {
    if (activeContext.type === 'session') {
      return message.trim() 
        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600' 
        : 'bg-gray-200';
    }
    return message.trim() 
      ? 'bg-blue-500 hover:bg-blue-600' 
      : 'bg-gray-200';
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      {/* 현재 컨텍스트 표시 */}
      {activeContext.type === 'session' && (
        <div className="mb-3 px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-purple-700 font-medium">
              {activeContext.name} 세션 진행 중
            </span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder={getPlaceholder()}
            disabled={disabled}
            rows={1}
            className={`
              w-full px-4 py-3 border rounded-2xl resize-none outline-none
              transition-all duration-200 min-h-[44px] max-h-[120px]
              ${getInputBorderColor()}
              ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
            `}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          />
          
          {/* 첨부 파일 및 이모지 버튼 */}
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <button
              type="button"
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={disabled}
            >
              <AttachFileIcon sx={{ fontSize: 18 }} />
            </button>
            <button
              type="button"
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={disabled}
            >
              <EmojiEmotionsIcon sx={{ fontSize: 18 }} />
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className={`
            p-3 rounded-full text-white transition-all duration-200
            ${getSendButtonColor()}
            ${!message.trim() || disabled 
              ? 'cursor-not-allowed' 
              : 'transform hover:scale-105 active:scale-95'
            }
          `}
        >
          <SendIcon sx={{ fontSize: 20 }} />
        </button>
      </form>
    </div>
  );
}