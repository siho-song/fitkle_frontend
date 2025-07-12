"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/authStore";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Container } from "@/components/layouts/Container";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const ProfileManageScreen: React.FC = () => {
  const router = useRouter();
  const { userNickname, userEmail, logout } = useAuthStore();
  const [selectedTab, setSelectedTab] = useState('profile');
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [newNickname, setNewNickname] = useState(userNickname || '');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: false,
    lesson: true
  });

  const handleSaveNickname = () => {
    if (newNickname.trim()) {
      // TODO: API 호출로 닉네임 업데이트
      alert(`닉네임이 "${newNickname}"로 변경되었습니다.`);
      setIsEditingNickname(false);
    }
  };

  const handleCancelEdit = () => {
    setNewNickname(userNickname || '');
    setIsEditingNickname(false);
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveNotifications = () => {
    // TODO: API 호출로 알림 설정 저장
    alert('알림 설정이 저장되었습니다.');
  };

  const mockPosts = [
    { id: 1, title: "React 컴포넌트 최적화 방법", date: "2024-01-15", views: 234 },
    { id: 2, title: "TypeScript 타입 가드 활용법", date: "2024-01-10", views: 156 },
    { id: 3, title: "Next.js 13 App Router 사용 후기", date: "2024-01-05", views: 89 }
  ];

  const defaultProfileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${userNickname || "default"}`;

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* 기본 정보 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <PersonIcon />
          기본 정보
        </h3>
        
        {/* 프로필 이미지 */}
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
            <Image
              src={defaultProfileImage}
              alt="프로필"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">프로필 사진</p>
            <button className="text-primary hover:text-primary/80 text-sm font-medium">
              사진 변경
            </button>
          </div>
        </div>

        {/* 닉네임 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            닉네임
          </label>
          {isEditingNickname ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="닉네임을 입력하세요"
              />
              <button
                onClick={handleSaveNickname}
                className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <SaveIcon sx={{ fontSize: 18 }} />
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <CancelIcon sx={{ fontSize: 18 }} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-gray-900">{userNickname || '닉네임 없음'}</span>
              <button
                onClick={() => setIsEditingNickname(true)}
                className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1"
              >
                <EditIcon sx={{ fontSize: 16 }} />
                수정
              </button>
            </div>
          )}
        </div>

        {/* 이메일 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이메일
          </label>
          <p className="text-gray-900">{userEmail || '이메일 없음'}</p>
        </div>
      </div>

      {/* 계정 관리 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          계정 관리
        </h3>
        <div className="space-y-3">
          <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
            비밀번호 변경
          </button>
          <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
            계정 탈퇴
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationTab = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <NotificationsIcon />
        알림 설정
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div>
            <p className="font-medium text-gray-900">이메일 알림</p>
            <p className="text-sm text-gray-500">중요한 알림을 이메일로 받습니다</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() => handleNotificationChange('email')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div>
            <p className="font-medium text-gray-900">푸시 알림</p>
            <p className="text-sm text-gray-500">앱에서 즉시 알림을 받습니다</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.push}
              onChange={() => handleNotificationChange('push')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div>
            <p className="font-medium text-gray-900">마케팅 정보 수신</p>
            <p className="text-sm text-gray-500">이벤트 및 프로모션 정보를 받습니다</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.marketing}
              onChange={() => handleNotificationChange('marketing')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-3">
          <div>
            <p className="font-medium text-gray-900">수업 관련 알림</p>
            <p className="text-sm text-gray-500">예약, 취소 등 수업 관련 알림</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.lesson}
              onChange={() => handleNotificationChange('lesson')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSaveNotifications}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          설정 저장
        </button>
      </div>
    </div>
  );

  const renderMyPostsTab = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <ArticleIcon />
        내가 쓴 글
      </h3>
      
      {mockPosts.length === 0 ? (
        <div className="text-center py-12">
          <ArticleIcon sx={{ fontSize: 48 }} className="text-gray-300 mb-4" />
          <p className="text-gray-500">작성한 글이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mockPosts.map(post => (
            <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-2">{post.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span>조회 {post.views}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-primary hover:text-primary/80 text-sm font-medium">
                    수정
                  </button>
                  <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <MainLayout>
      <div className="py-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* 페이지 헤더 */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">내 정보 관리</h1>
              <p className="text-gray-600">프로필 정보, 알림 설정, 작성한 글을 관리할 수 있습니다.</p>
            </div>

            {/* 탭 네비게이션 */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setSelectedTab('profile')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    selectedTab === 'profile'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  프로필 정보
                </button>
                <button
                  onClick={() => setSelectedTab('notifications')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    selectedTab === 'notifications'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  알림 설정
                </button>
                <button
                  onClick={() => setSelectedTab('posts')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    selectedTab === 'posts'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  내가 쓴 글
                </button>
              </nav>
            </div>

            {/* 탭 컨텐츠 */}
            <div>
              {selectedTab === 'profile' && renderProfileTab()}
              {selectedTab === 'notifications' && renderNotificationTab()}
              {selectedTab === 'posts' && renderMyPostsTab()}
            </div>
          </div>
        </Container>
      </div>
    </MainLayout>
  );
};

export default ProfileManageScreen;