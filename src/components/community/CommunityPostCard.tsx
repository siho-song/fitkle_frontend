"use client";

import React from 'react';
import Link from 'next/link';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ExpertBadge } from './ExpertBadge';
import { CommunityPost } from '@/store/communityStore';
import { getPostTypeById } from '@/constants/postTypes';

interface CommunityPostCardProps {
  post: CommunityPost;
}

export function CommunityPostCard({ post }: CommunityPostCardProps) {
  const isExpert = post.authorType === 'expert';
  
  const getPostTypeInfo = (type: string) => {
    const typeData = getPostTypeById(type);
    if (!typeData) {
      return { icon: null, color: 'text-gray-500', bgColor: 'bg-gray-50', label: '' };
    }
    
    // 배경색 매핑
    const bgColorMap: Record<string, string> = {
      'question': 'bg-blue-50',
      'tip': 'bg-green-50', 
      'guide': 'bg-purple-50',
      'discussion': 'bg-orange-50'
    };
    
    return {
      icon: typeData.icon,
      color: typeData.color,
      bgColor: bgColorMap[type] || 'bg-gray-50',
      label: typeData.name
    };
  };

  const typeInfo = getPostTypeInfo(post.type);

  return (
    <Link href={`/post/${post.id}`}>
      <div className={`
        bg-white border border-gray-100 cursor-pointer transition-all duration-300 rounded-2xl p-8 shadow-md hover:shadow-lg
      `}>
        {/* 포스트 헤더 */}
        <div className={`flex items-start justify-between mb-5`}>
          <div className={`flex items-center gap-3`}>
            {/* 카테고리와 타입 */}
            <div className={`flex items-center gap-2`}>
              <span className={'text-md'}>{post.categoryEmoji}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{post.category}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${typeInfo.color} ${typeInfo.bgColor}`}>
                    {typeInfo.label}
                  </span>
                </div>
            </div>
            
            {/* 전문가 배지 */}
            {isExpert && <ExpertBadge size="small" />}
          </div>
          
          {/* 시간 */}
          <div className={`flex items-center text-xs text-gray-500 gap-1.5 font-medium`}>
            <AccessTimeIcon sx={{ fontSize: 14 }} />
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>

        {/* 제목과 내용 */}
        <div className="mb-4">
          <h3 className={`font-bold text-gray-900 mb-2 text-lg line-clamp-1`}> {post.title} </h3>
          <p className={`text-gray-700 leading-relaxed text-sm line-clamp-2 mt-3`}>
            {post.content}
          </p>
        </div>

        {/* 전문가 정보 미리보기 (전문가만) */}
        {isExpert && post.expertInfo && (
          <div className="bg-primary/5 rounded-xl p-4 mb-4 border border-primary/10 mt-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-black text-sm">전문가 정보</h4>
              {post.expertInfo.rating && (
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm font-medium text-black">{post.expertInfo.rating}</span>
                </div>
              )}
            </div>
            <p className="text-xs text-black mb-2">{post.expertInfo.experience}</p>
            <div className="flex flex-wrap gap-1.5">
              {post.expertInfo.specialties.slice(0, 3).map((specialty, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-primary/40 text-black text-xs rounded-md font-medium"
                >
                  {specialty}
                </span>
              ))}
              {post.expertInfo.studentsHelped && (
                <span className="text-xs text-black ml-auto">
                  {post.expertInfo.studentsHelped}명 도움
                </span>
              )}
            </div>
          </div>
        )}

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 mt-6">
          {post.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 하단 정보 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* 작성자 */}
            <div className="flex items-center gap-2 mt-6">
              <img 
                src={post.authorAvatar} 
                alt={post.authorName}
                className={`rounded-full object-cover ${
                  isExpert ? 'w-8 h-8 shadow-sm' : 'w-6 h-6'
                }`}
              />
              <div>
                <span className={`text-sm text-gray-700 ${
                  isExpert ? 'font-bold text-gray-900' : 'font-medium'
                }`}>
                  {post.authorName}
                </span>
                <div className="text-xs text-gray-500">
                  {isExpert ? '전문가' : '학습자'}
                </div>
              </div>
            </div>
          </div>

          {/* 상호작용 정보 */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
              <ThumbUpIcon sx={{ fontSize: 14 }} />
              <span className={isExpert ? 'font-medium' : ''}>{post.likeCount}</span>
            </div>
            <div className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
              <CommentIcon sx={{ fontSize: 14 }} />
              <span className={isExpert ? 'font-medium' : ''}>{post.commentCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <VisibilityIcon sx={{ fontSize: 14 }} />
              <span>{post.viewCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}