"use client";

import React, { useState } from 'react';
import { MessageTemplate, MessageTemplateFormData } from '@/types/messageTemplate';
import { useMessageTemplates } from '@/hooks/useMessageTemplates';
import type { UserType } from '@/features/auth/types/auth';
import { Plus, Edit3, Trash2, Save, X } from 'lucide-react';

interface MessageTemplateManagerProps {
  userType: UserType;
  onTemplateSelect?: (template: MessageTemplate) => void;
  isOpen: boolean;
  onClose: () => void;
}

type ViewMode = 'list' | 'form';

export function MessageTemplateManager({ 
  userType, 
  onTemplateSelect, 
  isOpen, 
  onClose 
}: MessageTemplateManagerProps) {
  const { templates, isLoading, addTemplate, updateTemplate, deleteTemplate } = useMessageTemplates(userType);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingTemplate, setEditingTemplate] = useState<MessageTemplate | null>(null);
  const [formData, setFormData] = useState<MessageTemplateFormData>({
    title: '',
    content: '',
    description: ''
  });
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleEdit = (template: MessageTemplate) => {
    setEditingTemplate(template);
    setFormData({
      title: template.title,
      content: template.content,
      description: template.description || ''
    });
    setViewMode('form');
  };

  const handleCreateNew = () => {
    setEditingTemplate(null);
    setFormData({
      title: '',
      content: '',
      description: ''
    });
    setViewMode('form');
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    if (editingTemplate) {
      updateTemplate(editingTemplate.id, formData);
    } else {
      addTemplate(formData);
    }

    setViewMode('list');
    setEditingTemplate(null);
    setFormData({ title: '', content: '', description: '' });
  };

  const handleCancel = () => {
    setViewMode('list');
    setEditingTemplate(null);
    setFormData({ title: '', content: '', description: '' });
  };

  const handleDelete = (id: string) => {
    try {
      deleteTemplate(id);
      setDeleteConfirmId(null);
    } catch (error) {
      alert(error instanceof Error ? error.message : '삭제에 실패했습니다.');
    }
  };

  const handleTemplateSelect = (template: MessageTemplate) => {
    if (onTemplateSelect) {
      onTemplateSelect(template);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="flex h-full">
          {/* 사이드바 */}
          <div className="w-1/3 bg-gray-50 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">메시지 템플릿</h3>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              <button
                onClick={handleCreateNew}
                className="w-full flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus size={16} />
                새 템플릿 추가
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(80vh-120px)]">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500">
                  로딩 중...
                </div>
              ) : templates.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <div className="text-2xl mb-2">📝</div>
                  <p className="text-sm">템플릿이 없습니다.</p>
                  <p className="text-xs mt-1">새 템플릿을 추가해보세요!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="p-4 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {template.title}
                        </h4>
                        <div className="flex items-center gap-1">
                          {template.isCustom && (
                            <button
                              onClick={() => handleEdit(template)}
                              className="p-1 text-gray-500 hover:text-primary transition-colors"
                            >
                              <Edit3 size={14} />
                            </button>
                          )}
                          {template.isCustom && (
                            <button
                              onClick={() => setDeleteConfirmId(template.id)}
                              className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {template.description && (
                        <p className="text-xs text-gray-600 mb-2">
                          {template.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            template.isCustom 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {template.isCustom ? '커스텀' : '기본'}
                          </span>
                        </div>
                        <button
                          onClick={() => handleTemplateSelect(template)}
                          className="text-xs text-primary hover:text-primary/80 transition-colors"
                        >
                          사용하기
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 메인 컨텐츠 */}
          <div className="flex-1 flex flex-col">
            {viewMode === 'form' ? (
              <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {editingTemplate ? '템플릿 수정' : '새 템플릿 추가'}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCancel}
                      className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      제목 *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="템플릿 제목을 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      설명
                    </label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="템플릿 설명을 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      내용 *
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent h-64 resize-none"
                      placeholder="템플릿 내용을 입력하세요"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      취소
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                      <Save size={16} />
                      저장
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    메시지 템플릿 관리
                  </h3>
                  <p className="text-gray-600 mb-6">
                    자주 사용하는 메시지를 템플릿으로 저장하고 관리하세요
                  </p>
                  <button
                    onClick={handleCreateNew}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    새 템플릿 추가
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 삭제 확인 다이얼로그 */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              템플릿 삭제
            </h3>
            <p className="text-gray-600 mb-6">
              정말로 이 템플릿을 삭제하시겠습니까?<br/>
              삭제된 템플릿은 복구할 수 없습니다.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}