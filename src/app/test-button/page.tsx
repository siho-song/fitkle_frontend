"use client";

import { AppButton } from '@/components/common/AppButton';
import { LoginModal } from '@/components/login/LoginModal';
import { useState } from 'react';

export default function TestButtonPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-center text-black font-pretendard">
          Tailwind CSS 테스트
        </h1>
        
        <div className="space-y-4">
          <AppButton 
            variant="primary" 
            className="w-full"
            onClick={() => console.log('Primary button clicked')}
          >
            Primary Button (기본 색상)
          </AppButton>
          
          <AppButton 
            variant="secondary" 
            className="w-full"
            onClick={() => console.log('Secondary button clicked')}
          >
            Secondary Button
          </AppButton>
          
          <AppButton 
            variant="outline" 
            className="w-full"
            onClick={() => console.log('Outline button clicked')}
          >
            Outline Button
          </AppButton>
          
          <AppButton 
            variant="primary" 
            className="w-full"
            onClick={() => setShowModal(true)}
          >
            로그인 모달 열기
          </AppButton>
        </div>
        
        <div className="mt-8 space-y-2">
          <div className="p-4 bg-primary rounded-lg">
            <p className="text-black font-pretendard">Primary 색상 (#B7C774)</p>
          </div>
          <div className="p-4 bg-primaryLight rounded-lg">
            <p className="text-black font-pretendard">Primary Light 색상 (#F7FBEA)</p>
          </div>
          <div className="p-4 bg-primaryDark rounded-lg">
            <p className="text-white font-pretendard">Primary Dark 색상 (#8A9E4E)</p>
          </div>
        </div>
      </div>
      
      {showModal && (
        <LoginModal 
          onClose={() => setShowModal(false)}
          onLoginSuccess={() => {
            setShowModal(false);
            alert('로그인 성공!');
          }}
        />
      )}
    </div>
  );
}