"use client";

import React, { useEffect } from 'react';
import { useCommunityStore } from '@/store/communityStore';
import { loadSampleData } from '@/data/sampleCommunityData';

export function CommunitySection() {
  const { posts, getTrendingPosts } = useCommunityStore();
  
  // 샘플 데이터 로드 (개발용)
  useEffect(() => {
    if (posts.length === 0) {
      const sampleData = loadSampleData();
      
      useCommunityStore.setState((state) => ({
        ...state,
        posts: sampleData.posts,
        comments: sampleData.comments,
        interactions: sampleData.interactions
      }));
    }
  }, [posts.length]);
  
  const trendingPosts = getTrendingPosts().slice(0, 3);
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">핏클 커뮤니티에 들어보세요</h3>
        <button className="text-sm text-gray-400 hover:underline">전체보기 &gt;</button>
      </div>
      <div className="space-y-8">
        {trendingPosts.map((post) => (
          <div key={post.id} className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="text-xs text-blue-500 font-semibold mb-1">[{post.category}]</div>
              <div className="font-bold text-base mb-1 truncate">{post.title}</div>
              <div className="text-sm text-gray-600 mb-2 line-clamp-2">{post.content}</div>
              <div className="flex gap-4 text-xs text-gray-400">
                <span>좋아요 {post.likeCount}</span>
                <span>댓글 {post.commentCount}</span>
              </div>
            </div>
            <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
              <img
                src={post.authorAvatar}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 