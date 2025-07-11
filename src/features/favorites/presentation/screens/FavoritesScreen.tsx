"use client";

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { FavoriteTutorsList } from '@/components/favorites/FavoriteTutorsList';
import { FavoritePostsList } from '@/components/favorites/FavoritePostsList';
import { useFavoritesStore } from '@/store/favoritesStore';
import { sampleFavoriteTutors, sampleFavoritePosts } from '@/data/sampleFavorites';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const FavoritesScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tutors' | 'posts'>('tutors');
  const { favoriteTutors, favoritePosts, initializeWithSampleData } = useFavoritesStore();
  const [isInitialized, setIsInitialized] = useState(false);

  // 샘플 데이터 로드 (개발용)
  useEffect(() => {
    if (!isInitialized && favoriteTutors.length === 0 && favoritePosts.length === 0) {
      const tutorData = sampleFavoriteTutors.map(({ addedDate, ...tutor }) => tutor);
      const postData = sampleFavoritePosts.map(({ addedDate, ...post }) => post);
      
      initializeWithSampleData(tutorData, postData);
      setIsInitialized(true);
    }
  }, [favoriteTutors.length, favoritePosts.length, initializeWithSampleData, isInitialized]);

  const tabs = [
    {
      id: 'tutors' as const,
      name: '찜한 튜터',
      icon: <PersonIcon />,
      count: favoriteTutors.length
    },
    {
      id: 'posts' as const,
      name: '스크랩한 게시글',
      icon: <ArticleIcon />,
      count: favoritePosts.length
    }
  ];

  return (
    <MainLayout>
      <div className="py-8">
        <div className="max-w-6xl mx-auto">
          {/* 헤더 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FavoriteIcon className="text-red-500" sx={{ fontSize: 32 }} />
              <h1 className="text-3xl font-bold text-gray-900">찜한 항목</h1>
            </div>
            <p className="text-gray-600">관심있는 튜터와 유용한 게시글을 모아보세요.</p>
          </div>

          {/* 탭 네비게이션 */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className={activeTab === tab.id ? 'text-primary' : 'text-gray-400'}>
                      {tab.icon}
                    </span>
                    {tab.name}
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      activeTab === tab.id 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* 컨텐츠 */}
          <div className="min-h-[400px]">
            {activeTab === 'tutors' && <FavoriteTutorsList />}
            {activeTab === 'posts' && <FavoritePostsList />}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};