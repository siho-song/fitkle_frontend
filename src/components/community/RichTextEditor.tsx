"use client";

import React, { useState, useRef } from 'react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import ImageIcon from '@mui/icons-material/Image';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  maxLength?: number;
}

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "내용을 입력해주세요",
  error,
  maxLength = 5000
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageCount, setImageCount] = useState(0);

  const handleCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateContent();
  };

  const updateContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange(content);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 파일 크기 체크 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      alert('이미지 크기는 5MB 이하여야 합니다.');
      return;
    }

    // 이미지 타입 체크
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      insertImage(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const insertImage = (src: string) => {
    const imageId = `img_${Date.now()}_${imageCount}`;
    const imageHtml = `
      <div class="image-container my-4" contenteditable="false">
        <img 
          id="${imageId}"
          src="${src}" 
          alt="삽입된 이미지" 
          class="max-w-full h-auto rounded-lg shadow-md cursor-pointer"
          style="max-height: 400px; object-fit: contain;"
        />
        <button 
          class="image-delete-btn absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
          onclick="this.parentElement.remove()"
          type="button"
        >
          ×
        </button>
      </div>
    `;

    // 현재 커서 위치에 이미지 삽입
    document.execCommand('insertHTML', false, imageHtml);
    setImageCount(prev => prev + 1);
    updateContent();
  };

  const getTextLength = () => {
    if (editorRef.current) {
      return editorRef.current.textContent?.length || 0;
    }
    return 0;
  };

  return (
    <div className={`border rounded-xl overflow-hidden ${error ? 'border-red-500' : 'border-gray-300'}`}>
      {/* 툴바 */}
      <div className="border-b border-gray-200 bg-gray-50 p-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleCommand('bold')}
              className="p-2 rounded hover:bg-gray-200 transition-colors"
              title="굵게"
            >
              <FormatBoldIcon sx={{ fontSize: 18 }} />
            </button>
            <button
              type="button"
              onClick={() => handleCommand('italic')}
              className="p-2 rounded hover:bg-gray-200 transition-colors"
              title="기울임"
            >
              <FormatItalicIcon sx={{ fontSize: 18 }} />
            </button>
            <button
              type="button"
              onClick={() => handleCommand('underline')}
              className="p-2 rounded hover:bg-gray-200 transition-colors"
              title="밑줄"
            >
              <FormatUnderlinedIcon sx={{ fontSize: 18 }} />
            </button>
          </div>

          <div className="w-px h-6 bg-gray-300"></div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleCommand('undo')}
              className="p-2 rounded hover:bg-gray-200 transition-colors"
              title="실행 취소"
            >
              <UndoIcon sx={{ fontSize: 18 }} />
            </button>
            <button
              type="button"
              onClick={() => handleCommand('redo')}
              className="p-2 rounded hover:bg-gray-200 transition-colors"
              title="다시 실행"
            >
              <RedoIcon sx={{ fontSize: 18 }} />
            </button>
          </div>

          <div className="w-px h-6 bg-gray-300"></div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded hover:bg-gray-200 transition-colors flex items-center gap-1"
            title="이미지 삽입"
          >
            <ImageIcon sx={{ fontSize: 18 }} />
            <span className="text-sm">이미지</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* 에디터 */}
      <div
        ref={editorRef}
        contentEditable
        onInput={updateContent}
        onKeyDown={(e) => {
          if (getTextLength() >= maxLength && e.key !== 'Backspace' && e.key !== 'Delete') {
            e.preventDefault();
          }
        }}
        className="p-4 min-h-[300px] max-h-[600px] overflow-y-auto focus:outline-none"
        style={{
          wordBreak: 'break-word',
          lineHeight: '1.6'
        }}
        dangerouslySetInnerHTML={{ 
          __html: value || `<p class="text-gray-400">${placeholder}</p>` 
        }}
        onFocus={(e) => {
          if (e.target.innerHTML === `<p class="text-gray-400">${placeholder}</p>`) {
            e.target.innerHTML = '';
          }
        }}
        onBlur={(e) => {
          if (e.target.innerHTML === '' || e.target.innerHTML === '<br>') {
            e.target.innerHTML = `<p class="text-gray-400">${placeholder}</p>`;
          }
        }}
      />

      {/* 하단 정보 */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-2 flex justify-between items-center">
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        <p className="text-xs text-gray-500 ml-auto">
          {getTextLength()}/{maxLength}
        </p>
      </div>
    </div>
  );
}