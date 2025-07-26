"use client";

import React, { useState } from 'react';
import { MessageTemplate, MessageTemplateFormData } from '@/types/entities/chat';
import { useMessageTemplates } from '@/hooks/useMessageTemplates';
import type { UserType } from '@/features/auth/types/auth';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { ActionButtons } from '@/components/common/ActionButtons';
import { Button } from '@/components/common/Button';
import { Plus, Edit3, Trash2, X } from 'lucide-react';

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
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null);
  const [isPreviewEditing, setIsPreviewEditing] = useState(false);
  const [previewFormData, setPreviewFormData] = useState<MessageTemplateFormData>({
    title: '',
    content: '',
    category: ''
  });
  const [formData, setFormData] = useState<MessageTemplateFormData>({
    title: '',
    content: '',
    category: ''
  });
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEdit = (template: MessageTemplate) => {
    setEditingTemplate(template);
    setFormData({
      title: template.title,
      content: template.content,
      category: template.category || ''
    });
    setViewMode('form');
  };

  const handleCreateNew = () => {
    setEditingTemplate(null);
    setFormData({
      title: '',
      content: '',
      category: ''
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
    setFormData({ title: '', content: '', category: '' });
  };

  const handleCancel = () => {
    setViewMode('list');
    setEditingTemplate(null);
    setFormData({ title: '', content: '', category: '' });
  };

  const handleDelete = () => {
    if (deleteConfirmId) {
      try {
        deleteTemplate(deleteConfirmId);
        setDeleteConfirmId(null);
        // 삭제된 템플릿이 현재 선택된 템플릿이면 선택 해제
        if (selectedTemplate?.id === deleteConfirmId) {
          setSelectedTemplate(null);
        }
      } catch (error) {
        alert(error instanceof Error ? error.message : '삭제에 실패했습니다.');
      }
    }
  };
  const handleTemplateSelect = (template: MessageTemplate) => {
    if (onTemplateSelect) {
      onTemplateSelect(template);
    }
    onClose();
  };

  const handleTemplateClick = (template: MessageTemplate) => {
    setSelectedTemplate(template);
    setIsPreviewEditing(false);
    setPreviewFormData({
      title: template.title,
      content: template.content,
      category: template.category || ''
    });
    setViewMode('list'); // 리스트 모드 유지하면서 미리보기 보여주기
  };

  const handlePreviewEdit = () => {
    setIsPreviewEditing(true);
  };

  const handlePreviewSave = () => {
    if (!selectedTemplate || !previewFormData.title.trim() || !previewFormData.content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    updateTemplate(selectedTemplate.id, previewFormData);
    
    // 선택된 템플릿 정보 업데이트
    const updatedTemplate = {
      ...selectedTemplate,
      title: previewFormData.title,
      content: previewFormData.content,
      category: previewFormData.category
    };
    setSelectedTemplate(updatedTemplate);
    setIsPreviewEditing(false);
  };

  const handlePreviewCancel = () => {
    if (selectedTemplate) {
      setPreviewFormData({
        title: selectedTemplate.title,
        content: selectedTemplate.content,
        category: selectedTemplate.category || ''
      });
    }
    setIsPreviewEditing(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl h-[700px] overflow-hidden">
        <div className="flex h-full">
          {/* 사이드바 */}
          <div className="w-1/3 bg-gray-50 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">메시지 템플릿</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  icon={<X size={20} />}
                />
              </div>
              <Button
                onClick={handleCreateNew}
                variant="primary"
                size="md"
                icon={<Plus size={16} />}
                className="w-full"
              >
                새 템플릿 추가
              </Button>
            </div>

            <div className="overflow-y-auto h-[600px]">
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
                      className={`p-4 hover:bg-gray-100 transition-colors cursor-pointer ${
                        selectedTemplate?.id === template.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                      onClick={() => handleTemplateClick(template)}
                    >
                      <h4 className="font-medium text-gray-900 text-sm mb-2">
                        {template.title}
                      </h4>
                      
                      {template.category && (
                        <p className="text-xs text-gray-600">
                          {template.category}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 메인 컨텐츠 */}
          <div className="flex-1 flex flex-col">
            {viewMode === 'form' ? (
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {editingTemplate ? '템플릿 수정' : '새 템플릿 추가'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {editingTemplate ? '템플릿 정보를 수정하고 저장하세요' : '새로운 템플릿을 작성하고 저장하세요'}
                      </p>
                    </div>
                    <ActionButtons
                      onCancel={handleCancel}
                      onSave={handleSave}
                      onClose={handleCancel}
                    />
                  </div>

                  <div className="space-y-6">
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
                      카테고리
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="템플릿 카테고리를 입력하세요"
                    />
                  </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        내용 *
                      </label>
                      <textarea
                        value={formData.content}
                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent h-80 resize-none"
                        placeholder="템플릿 내용을 입력하세요"
                      />
                    </div>

                  </div>
                </div>
              </div>
            ) : selectedTemplate ? (
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="flex flex-col">
                  {/* 미리보기 헤더 */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {isPreviewEditing ? '템플릿 편집' : '템플릿 미리보기'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {isPreviewEditing 
                          ? '템플릿 내용을 수정하고 저장하세요' 
                          : '선택한 템플릿의 내용을 확인하고 사용하세요'
                        }
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isPreviewEditing ? (
                        <ActionButtons
                          onCancel={handlePreviewCancel}
                          onSave={handlePreviewSave}
                          onClose={() => setSelectedTemplate(null)}
                        />
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handlePreviewEdit}
                            icon={<Edit3 size={16} />}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteConfirmId(selectedTemplate.id)}
                            className="hover:text-warning"
                            icon={<Trash2 size={16} />}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedTemplate(null)}
                            icon={<X size={20} />}
                          />
                        </>
                      )}
                    </div>
                  </div>

                  {/* 템플릿 정보 */}
                  <div className="space-y-6">
                    <div>
                      {isPreviewEditing ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              제목 *
                            </label>
                            <input
                              type="text"
                              value={previewFormData.title}
                              onChange={(e) => setPreviewFormData(prev => ({ ...prev, title: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="템플릿 제목을 입력하세요"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              카테고리
                            </label>
                            <input
                              type="text"
                              value={previewFormData.category}
                              onChange={(e) => setPreviewFormData(prev => ({ ...prev, category: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="템플릿 카테고리를 입력하세요"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              제목
                            </label>
                            <div className="text-lg font-medium text-gray-900">
                              {selectedTemplate.title}
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              카테고리
                            </label>
                            <div className="text-sm text-gray-600">
                              {selectedTemplate.category || '카테고리 없음'}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 템플릿 내용 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        내용 {isPreviewEditing && '*'}
                      </label>
                      {isPreviewEditing ? (
                        <textarea
                          value={previewFormData.content}
                          onChange={(e) => setPreviewFormData(prev => ({ ...prev, content: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent h-80 resize-none"
                          placeholder="템플릿 내용을 입력하세요"
                        />
                      ) : (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-80 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-sm text-gray-900 font-sans leading-relaxed">
                            {selectedTemplate.content}
                          </pre>
                        </div>
                      )}
                    </div>

                    {/* 템플릿 사용하기 버튼 */}
                    {!isPreviewEditing && (
                      <div className="flex justify-center pb-4">
                        <Button
                          variant="primary"
                          size="md"
                          onClick={() => handleTemplateSelect(selectedTemplate)}
                        >
                          템플릿 사용하기
                        </Button>
                      </div>
                    )}
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
                    왼쪽에서 템플릿을 선택하여 미리보기를 확인하거나<br/>
                    새 템플릿을 추가해보세요
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleCreateNew}
                  >
                    새 템플릿 추가
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 삭제 확인 다이얼로그 */}
      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDelete}
        message={`정말로 이 템플릿을 삭제하시겠습니까?
삭제된 템플릿은 복구할 수 없습니다.`}
        confirmText="삭제"
        cancelText="취소"
        confirmButtonColor="red"
      />
    </div>
  );
}