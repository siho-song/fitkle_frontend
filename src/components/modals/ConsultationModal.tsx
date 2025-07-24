"use client";

import React, { useState } from 'react';
import { TutorItem, TutorService } from '@/types/entities/tutor';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutor: TutorItem;
  selectedService: TutorService | null;
}

export function ConsultationModal({ isOpen, onClose, tutor, selectedService }: ConsultationModalProps) {
  const [consultationMessage, setConsultationMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return `${hours}시간`;
      }
      return `${hours}시간 ${remainingMinutes}분`;
    }
    return `${minutes}분`;
  };

  const handleStartConsultation = () => {
    if (!consultationMessage.trim()) {
      alert('상담 메시지를 입력해주세요.');
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    // TODO: 채팅으로 이동하는 로직 구현
    console.log('채팅 시작:', {
      tutorName: tutor.name,
      serviceName: selectedService?.name,
      message: consultationMessage
    });
    // 임시로 알림만 표시
    alert('채팅 기능은 아직 구현되지 않았습니다.');
    setShowConfirmation(false);
    onClose();
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const resetAndClose = () => {
    setConsultationMessage('');
    setShowConfirmation(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {!showConfirmation ? (
          // 상담 메시지 작성 화면
          <>
            {/* 헤더 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <ChatIcon className="text-primary" sx={{ fontSize: 24 }} />
                <h2 className="text-xl font-bold text-gray-900">사전 상담</h2>
              </div>
              <button
                onClick={resetAndClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <CloseIcon sx={{ fontSize: 24 }} />
              </button>
            </div>

            {/* 튜터 및 서비스 정보 */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {tutor.avatar ? (
                    <img 
                      src={tutor.avatar} 
                      alt={tutor.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <PersonIcon className="text-gray-500" sx={{ fontSize: 20 }} />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{tutor.name}</h3>
                  <p className="text-gray-600 flex items-center gap-1">
                    <span>{tutor.categoryEmoji}</span>
                    {tutor.category}
                  </p>
                </div>
              </div>

              {selectedService && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <SchoolIcon sx={{ fontSize: 18 }} className="text-primary" />
                    <span className="font-semibold text-gray-900">선택한 서비스</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{selectedService.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{selectedService.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <AccessTimeIcon sx={{ fontSize: 16 }} />
                      <span>{formatDuration(selectedService.duration)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AttachMoneyIcon sx={{ fontSize: 16 }} />
                      <span>{selectedService.price.toLocaleString()}원</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 상담 메시지 작성 */}
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                상담 메시지 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={consultationMessage}
                onChange={(e) => setConsultationMessage(e.target.value)}
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder={`안녕하세요! ${selectedService?.name || '서비스'}에 대해 궁금한 점이 있어서 상담을 요청드립니다.

예시:
- 현재 제 수준은 초급자인데 수업이 가능한가요?
- 수업 진행 방식이 궁금합니다.
- 준비해야 할 것이 있나요?

구체적으로 작성해주시면 더 도움이 됩니다.`}
              />
              <div className="text-xs text-gray-500 mt-2">
                {consultationMessage.length}/500자
              </div>
            </div>

            {/* 버튼 */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-3">
                <button
                  onClick={resetAndClose}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  취소
                </button>
                <button
                  onClick={handleStartConsultation}
                  disabled={!consultationMessage.trim()}
                  className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  상담하기
                </button>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="text-xs text-blue-800">
                  <strong>상담 안내</strong>
                </div>
                <div className="text-xs text-blue-700 mt-1">
                  • 사전 상담을 통해 수업 내용과 진행 방식을 미리 확인할 수 있습니다.<br/>
                  • 상담은 실시간 채팅으로 진행됩니다.<br/>
                  • 상담 후 마음에 드시면 바로 수업을 예약하실 수 있습니다.
                </div>
              </div>
            </div>
          </>
        ) : (
          // 확인 다이얼로그
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChatIcon className="text-primary" sx={{ fontSize: 32 }} />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">상담을 시작하시겠습니까?</h3>
            
            <div className="text-gray-600 mb-6">
              <p className="mb-2">
                <span className="font-semibold">{tutor.name}</span>님과{' '}
                <span className="font-semibold">{selectedService?.name}</span> 서비스의
              </p>
              <p>상담을 시작합니다. (채팅으로 이동합니다.)</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <div className="text-sm font-medium text-gray-700 mb-2">작성한 메시지:</div>
              <div className="text-sm text-gray-600 bg-white p-3 rounded border max-h-32 overflow-y-auto">
                {consultationMessage}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                아니요
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                예, 시작합니다
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}