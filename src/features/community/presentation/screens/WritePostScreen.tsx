"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layouts/MainLayout';
import { WritePostForm } from '@/components/community/WritePostForm';
import { usePostStore } from '@/store/postStore';

export const WritePostScreen: React.FC = () => {
  const router = useRouter();
  const { addPost } = usePostStore();

  const handleSubmit = async (postData: any) => {
    try {
      // 카테고리 이모지 매핑
      const categoryEmojis: Record<string, string> = {
        cooking: '🍳',
        fitness: '💪',
        music: '🎵'
      };

      // 새 게시글 데이터 준비
      const newPostData = {
        ...postData,
        categoryEmoji: categoryEmojis[postData.category] || '📝',
        author: '나', // 실제로는 로그인한 사용자 정보
        authorAvatar: '👤',
        authorType: 'student' as const,
        studentInfo: {
          level: 'beginner' as const,
          isFirstPost: false
        }
      };

      // Zustand store에 게시글 추가
      addPost(newPostData);
      
      console.log('새 게시글 작성 완료:', newPostData);
      
      // 글 작성 완료 후 커뮤니티로 이동
      router.push('/community');
    } catch (error) {
      console.error('게시글 작성 중 오류:', error);
      alert('게시글 작성 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleCancel = () => {
    router.push('/community');
  };

  return (
    <MainLayout>
      <div className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">새 게시글 작성</h1>
            <p className="text-gray-600">커뮤니티에 지식과 경험을 공유해주세요.</p>
          </div>
          
          <WritePostForm 
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </MainLayout>
  );
};