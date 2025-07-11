"use client";

import React, { useState } from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { MyPostsList } from '@/components/my-posts/MyPostsList';
import { MyCommentsList } from '@/components/my-posts/MyCommentsList';
import { MyPostsStats } from '@/components/my-posts/MyPostsStats';
import { MyReviewsList } from '@/components/my-posts/MyReviewsList';
import { useCommunityStore } from '@/store/communityStore';
import ArticleIcon from '@mui/icons-material/Article';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import RateReviewIcon from '@mui/icons-material/RateReview';

export const MyPostsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'comments' | 'reviews'>('posts');
  const { getPostsByAuthor, getCommentsByAuthor, currentUserId } = useCommunityStore();
  const posts = getPostsByAuthor(currentUserId);
  const comments = getCommentsByAuthor(currentUserId);
  const reviews = posts.filter(post => post.category === '후기');

  const tabs = [
    {
      id: 'posts' as const,
      name: '내가 쓴 글',
      icon: <ArticleIcon sx={{ fontSize: 20 }} />,
      count: posts.length
    },
    {
      id: 'comments' as const,
      name: '내가 쓴 댓글',
      icon: <CommentIcon sx={{ fontSize: 20 }} />,
      count: comments.length
    },
    {
      id: 'reviews' as const,
      name: '내가 쓴 후기',
      icon: <RateReviewIcon sx={{ fontSize: 20 }} />,
      count: reviews.length
    }
  ];

  return (
    <MainLayout>
      <div className="py-8">
        <div className="max-w-6xl mx-auto">
          {/* 헤더 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <EditIcon className="text-primary" sx={{ fontSize: 32 }} />
              <h1 className="text-3xl font-bold text-gray-900">내가 쓴 글</h1>
            </div>
            <p className="text-gray-600">
              지금까지 작성한 글과 댓글을 한 곳에서 확인하고 관리하세요.
            </p>
          </div>

          {/* 통계 */}
          <MyPostsStats />

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
                    {tab.icon}
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

          {/* 탭 콘텐츠 */}
          <div className="min-h-[400px]">
            {activeTab === 'posts' ? (
              <MyPostsList />
            ) : activeTab === 'comments' ? (
              <MyCommentsList />
            ) : (
              <MyReviewsList />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};