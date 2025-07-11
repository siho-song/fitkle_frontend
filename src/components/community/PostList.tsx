"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { CommunityPostCard } from './CommunityPostCard';
import { useCommunityStore } from '@/store/communityStore';
import { InfiniteScrollLoader } from '@/components/common/InfiniteScrollLoader';

interface PostListProps {
  category: string;
  type: string;
  sort: string;
}

export const PostList: React.FC<PostListProps> = ({
  category,
  type,
  sort
}) => {
  const { 
    posts, 
    getPostsByCategory, 
    getTrendingPosts, 
    addView 
  } = useCommunityStore();
  
  const [displayCount, setDisplayCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  // 필터링된 포스트들 가져오기
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // 카테고리 필터
    if (category !== 'all') {
      filtered = getPostsByCategory(category);
    }

    // 타입 필터
    if (type !== 'all') {
      filtered = filtered.filter(post => post.type === type);
    }

    // 정렬
    switch (sort) {
      case 'trending':
        return getTrendingPosts().slice(0, displayCount);
      case 'likes':
        return filtered
          .sort((a, b) => b.likeCount - a.likeCount)
          .slice(0, displayCount);
      case 'views':
        return filtered
          .sort((a, b) => b.viewCount - a.viewCount)
          .slice(0, displayCount);
      case 'comments':
        return filtered
          .sort((a, b) => b.commentCount - a.commentCount)
          .slice(0, displayCount);
      case 'oldest':
        return filtered
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          .slice(0, displayCount);
      case 'latest':
      default:
        return filtered
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, displayCount);
    }
  }, [posts, category, type, sort, displayCount, getPostsByCategory, getTrendingPosts]);

  // 무한 스크롤 로드 더보기
  const loadMorePosts = useCallback(async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    // 시뮬레이션된 로딩 딜레이
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setDisplayCount(prev => prev + 10);
    setIsLoading(false);
  }, [isLoading]);

  // 포스트 클릭 시 조회수 증가
  const handlePostView = (postId: string) => {
    addView(postId);
  };

  // 전체 게시글과 필터링된 게시글 수 확인
  const hasMorePosts = filteredPosts.length < posts.filter(post => {
    let filtered = true;
    
    if (category !== 'all') {
      filtered = filtered && post.category === category;
    }
    
    if (type !== 'all') {
      filtered = filtered && post.type === type;
    }
    
    return filtered;
  }).length;

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-500 mb-2">
          아직 게시글이 없습니다
        </h3>
        <p className="text-gray-400">
          첫 번째 게시글을 작성해보세요!
        </p>
      </div>
    );
  }

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-500 mb-2">
          검색 결과가 없습니다
        </h3>
        <p className="text-gray-400">
          다른 카테고리나 필터를 시도해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 포스트 목록 */}
      {filteredPosts.map((post) => (
        <div key={post.id} onClick={() => handlePostView(post.id)}>
          <CommunityPostCard post={post} />
        </div>
      ))}

      {/* 무한 스크롤 로더 */}
      {hasMorePosts && (
        <InfiniteScrollLoader
          onLoadMore={loadMorePosts}
          isLoading={isLoading}
          threshold={300}
        />
      )}

      {/* 로딩 상태 */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 text-gray-600">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
            더 많은 게시글을 불러오는 중...
          </div>
        </div>
      )}

      {/* 끝에 도달했을 때 */}
      {!hasMorePosts && filteredPosts.length > 10 && (
        <div className="text-center py-8 text-gray-500">
          <p>모든 게시글을 확인했습니다! 🎉</p>
        </div>
      )}
    </div>
  );
};