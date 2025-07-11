"use client";

import React, { useMemo, useState, useEffect } from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useCommunityStore } from '@/store/communityStore';

export function TrendingSection() {
  const { posts, getTrendingPosts } = useCommunityStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // 카테고리별 인기 토픽 계산
  const trendingTopics = useMemo(() => {
    if (!isMounted) return [];
    
    const categoryStats = posts.reduce((acc, post) => {
      const key = post.category;
      if (!acc[key]) {
        acc[key] = {
          category: post.category,
          emoji: post.categoryEmoji,
          posts: 0,
          totalEngagement: 0
        };
      }
      acc[key].posts++;
      acc[key].totalEngagement += post.likeCount + post.commentCount + post.viewCount;
      return acc;
    }, {} as Record<string, { category: string; emoji: string; posts: number; totalEngagement: number }>);
    
    return Object.values(categoryStats)
      .sort((a, b) => b.totalEngagement - a.totalEngagement)
      .slice(0, 5)
      .map((item, index) => ({
        rank: index + 1,
        topic: `${item.category} 관련 노하우`,
        category: item.category,
        emoji: item.emoji,
        posts: item.posts
      }));
  }, [posts, isMounted]);
  
  // 이주의 베스트 (인기 게시글)
  const weeklyBest = useMemo(() => {
    if (!isMounted) return [];
    
    return getTrendingPosts()
      .slice(0, 3)
      .map(post => ({
        id: post.id,
        title: post.title,
        author: post.authorName,
        likes: post.likeCount,
        category: post.category
      }));
  }, [getTrendingPosts, isMounted]);

  if (!isMounted) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 sticky top-24">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 sticky top-24">
      {/* 인기 토픽 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUpIcon className="text-red-500" />
          <h3 className="text-lg font-bold text-gray-900">실시간 인기 토픽</h3>
        </div>
        
        <div className="space-y-3">
          {trendingTopics.length > 0 ? trendingTopics.map((item) => (
            <div key={item.rank} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {item.rank}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{item.emoji}</span>
                  <span className="text-xs text-primary font-medium">{item.category}</span>
                </div>
                <h4 className="font-medium text-gray-900 text-sm">{item.topic}</h4>
                <p className="text-xs text-gray-500">{item.posts}개 게시글</p>
              </div>
            </div>
          )) : (
            <div className="text-center py-4 text-gray-500 text-sm">
              아직 데이터가 없습니다
            </div>
          )}
        </div>
      </div>

      {/* 이주의 베스트 */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <LocalFireDepartmentIcon className="text-orange-500" />
          <h3 className="text-lg font-bold text-gray-900">이주의 베스트</h3>
        </div>
        
        <div className="space-y-3">
          {weeklyBest.length > 0 ? weeklyBest.map((item) => (
            <div key={item.id} className="p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <EmojiEventsIcon className="text-yellow-500" sx={{ fontSize: 16 }} />
                <span className="text-xs text-primary font-medium">{item.category}</span>
              </div>
              <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-1">{item.title}</h4>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{item.author}</span>
                <span>👍 {item.likes}</span>
              </div>
            </div>
          )) : (
            <div className="text-center py-4 text-gray-500 text-sm">
              아직 데이터가 없습니다
            </div>
          )}
        </div>
      </div>

    </div>
  );
}