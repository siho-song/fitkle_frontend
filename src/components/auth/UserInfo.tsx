"use client";

import React from 'react';
import { useAuthStore, useUserNickname, useUserType } from '@/features/auth/store/authStore';

export function UserInfo() {
  const { isLoggedIn, logout } = useAuthStore();
  const userNickname = useUserNickname();
  const userType = useUserType();

  if (!isLoggedIn) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="max-w-md mx-auto mt-4 p-4 bg-white rounded-lg shadow-md border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            {userType === 'tutor' ? '👨‍🏫' : '👨‍🎓'}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{userNickname}</div>
            <div className="text-sm text-gray-500">
              {userType === 'tutor' ? '튜터' : '튜티'}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}