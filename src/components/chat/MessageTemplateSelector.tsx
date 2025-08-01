"use client";

import React from 'react';
import { MessageTemplate } from '@/types/messageTemplate';
import { MessageTemplateManager } from './MessageTemplateManager';
import type { UserType } from '@/features/auth/types/auth';

interface MessageTemplateSelectorProps {
  userType: UserType;
  onTemplateSelect: (template: MessageTemplate) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function MessageTemplateSelector(props: MessageTemplateSelectorProps) {
  return <MessageTemplateManager {...props} />;
}