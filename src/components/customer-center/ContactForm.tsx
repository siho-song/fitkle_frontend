"use client";

import React, { useState } from 'react';
import { useCustomerCenterStore } from '@/store/customerCenterStore';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export function ContactForm() {
  const { submitTicket } = useCustomerCenterStore();
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    description: '',
    priority: 'normal' as 'low' | 'normal' | 'high',
    attachments: [] as File[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { value: 'account', label: '계정/로그인' },
    { value: 'payment', label: '결제/환불' },
    { value: 'lesson', label: '수업 관련' },
    { value: 'tutor', label: '튜터 관련' },
    { value: 'technical', label: '기술적 문제' },
    { value: 'other', label: '기타' }
  ];

  const priorities = [
    { value: 'low', label: '낮음', color: 'text-gray-600' },
    { value: 'normal', label: '보통', color: 'text-blue-600' },
    { value: 'high', label: '높음', color: 'text-red-600' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'];

    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        alert(`${file.name}은(는) 파일 크기가 10MB를 초과합니다.`);
        return false;
      }
      if (!allowedTypes.includes(file.type)) {
        alert(`${file.name}은(는) 지원하지 않는 파일 형식입니다.`);
        return false;
      }
      return true;
    });

    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles].slice(0, 5) // 최대 5개
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.subject.trim() || !formData.description.trim()) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitTicket({
        category: formData.category,
        subject: formData.subject.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        attachments: formData.attachments
      });

      setIsSubmitted(true);
      setFormData({
        category: '',
        subject: '',
        description: '',
        priority: 'normal',
        attachments: []
      });
    } catch (error) {
      alert('문의 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
        <CheckCircleIcon className="mx-auto text-green-500 mb-4" sx={{ fontSize: 64 }} />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">문의가 성공적으로 등록되었습니다!</h2>
        <p className="text-gray-600 mb-2">빠른 시일 내에 답변을 드리겠습니다.</p>
        <p className="text-sm text-gray-500 mb-6">평균 응답 시간: 24시간 이내</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            새 문의하기
          </button>
          <button
            onClick={() => {
              // 문의 내역 탭으로 이동
              const ticketsTab = document.querySelector('[data-tab="tickets"]') as HTMLButtonElement;
              ticketsTab?.click();
            }}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            문의 내역 보기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 카테고리 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            문의 카테고리 <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          >
            <option value="">카테고리를 선택해주세요</option>
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* 우선순위 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">우선순위</label>
          <div className="flex gap-4">
            {priorities.map(priority => (
              <label key={priority.value} className="flex items-center">
                <input
                  type="radio"
                  name="priority"
                  value={priority.value}
                  checked={formData.priority === priority.value}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="mr-2 text-primary focus:ring-primary"
                />
                <span className={`font-medium ${priority.color}`}>
                  {priority.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* 제목 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            placeholder="문의 제목을 간단히 입력해주세요"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            maxLength={100}
            required
          />
          <div className="text-xs text-gray-500 mt-1">
            {formData.subject.length}/100자
          </div>
        </div>

        {/* 내용 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            문의 내용 <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="문의하실 내용을 자세히 작성해주세요. 문제 발생 시 상황, 기기 정보, 스크린샷 등을 포함하면 더 빠른 해결이 가능합니다."
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            maxLength={2000}
            required
          />
          <div className="text-xs text-gray-500 mt-1">
            {formData.description.length}/2000자
          </div>
        </div>

        {/* 파일 첨부 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">첨부 파일</label>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <AttachFileIcon sx={{ fontSize: 20 }} />
                <span className="text-sm font-medium">파일 선택</span>
                <input
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.gif,.pdf,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-gray-500">
                JPG, PNG, GIF, PDF, TXT (최대 10MB, 5개까지)
              </span>
            </div>

            {/* 첨부된 파일 목록 */}
            {formData.attachments.length > 0 && (
              <div className="space-y-2">
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AttachFileIcon sx={{ fontSize: 16 }} className="text-gray-500" />
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        ({(file.size / 1024 / 1024).toFixed(2)}MB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      제거
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 안내 메시지 */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">📝 문의 전 확인사항</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 자주 묻는 질문에서 먼저 답변을 확인해보세요</li>
            <li>• 기술적 문제는 브라우저, 운영체제 정보를 함께 알려주세요</li>
            <li>• 스크린샷이나 오류 메시지가 있다면 첨부해주세요</li>
            <li>• 평균 응답 시간은 24시간 이내입니다</li>
          </ul>
        </div>

        {/* 제출 버튼 */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-lg hover:bg-primary/90 transition-colors font-bold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>처리 중...</>
            ) : (
              <>
                <SendIcon sx={{ fontSize: 20 }} />
                문의 등록
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={() => {
              setFormData({
                category: '',
                subject: '',
                description: '',
                priority: 'normal',
                attachments: []
              });
            }}
            className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            초기화
          </button>
        </div>
      </form>
    </div>
  );
}