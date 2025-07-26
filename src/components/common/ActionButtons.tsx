"use client";

import React from 'react';
import { Button } from './Button';
import { Save, X } from 'lucide-react';

interface ActionButtonsProps {
  onCancel: () => void;
  onSave: () => void;
  onClose?: () => void;
  saveText?: string;
  cancelText?: string;
  isSaving?: boolean;
  showCloseButton?: boolean;
  saveIcon?: React.ReactNode;
}

export function ActionButtons({
  onCancel,
  onSave,
  onClose,
  saveText = '저장',
  cancelText = '취소',
  isSaving = false,
  showCloseButton = true,
  saveIcon = <Save size={14} />
}: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={onCancel}
        disabled={isSaving}
      >
        {cancelText}
      </Button>
      
      <Button
        variant="primary"
        size="sm"
        onClick={onSave}
        disabled={isSaving}
        icon={saveIcon}
      >
        {isSaving ? '저장 중...' : saveText}
      </Button>
      
      {showCloseButton && onClose && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="p-2"
        >
          <X size={20} />
        </Button>
      )}
    </div>
  );
}