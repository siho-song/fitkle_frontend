"use client";

import { LoginModal } from '@/components/login/LoginModal';
import { AppButton } from '@/components/common/AppButton';
import { useState } from 'react';

export default function TestLoginPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">LoginModal 색상 테스트</h1>
        
        {/* 색상 테스트 섹션 */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Tailwind 색상 테스트</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-primary text-white rounded">
              bg-primary (메인 브랜드)
            </div>
            <div className="p-4 bg-primaryLight text-black rounded">
              bg-primaryLight (연한 브랜드)
            </div>
            <div className="p-4 bg-primaryDark text-white rounded">
              bg-primaryDark (진한 브랜드)
            </div>
            <div className="p-4 bg-limeOlive text-white rounded">
              bg-limeOlive (라임 올리브)
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">AppButton 테스트</h3>
            <div className="flex gap-4">
              <AppButton variant="primary">Primary 버튼</AppButton>
              <AppButton variant="secondary">Secondary 버튼</AppButton>
              <AppButton variant="outline">Outline 버튼</AppButton>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">직접 색상 테스트</h3>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primaryDark">
                직접 primary
              </button>
              <button className="px-4 py-2 bg-primaryLight text-black rounded hover:bg-primary">
                직접 primaryLight
              </button>
              <button className="px-4 py-2" style={{backgroundColor: 'rgb(183, 199, 116)', color: 'white'}}>
                인라인 RGB
              </button>
            </div>
          </div>

          <button 
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            LoginModal 열기
          </button>
        </div>

        {/* 현재 Tailwind 설정 확인 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">현재 설정 확인</h2>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• primary: rgb(183 199 116)</p>
            <p>• primaryLight: rgb(247 251 234)</p>
            <p>• primaryDark: rgb(138 158 78)</p>
            <p>• limeOlive: rgb(183 199 116)</p>
          </div>
        </div>
      </div>

      {/* LoginModal */}
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