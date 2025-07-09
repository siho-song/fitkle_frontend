import React from 'react';

const ProfileManageScreen: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">프로필 관리</h1>
      {/* TODO: 탭/섹션/버튼 등 상위 구조만 우선 구현 */}
      <div className="flex gap-4 mb-4">
        <button
          className="px-4 py-2 rounded bg-primary text-white cursor-pointer hover:bg-primary/80"
        >
          기본 정보
        </button>
        <button className="px-4 py-2 rounded bg-gray-200">추가 정보</button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="font-semibold mb-2">기본 정보 섹션</div>
        {/* 기본 정보 내용 */}
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="font-semibold mb-2">추가 정보 섹션</div>
        {/* 추가 정보 내용 */}
      </div>
    </div>
  );
};

export default ProfileManageScreen; 