"use client";

import React from 'react';
import { useCommunityStore } from '@/store/communityStore';
import ArticleIcon from '@mui/icons-material/Article';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RateReviewIcon from '@mui/icons-material/RateReview';

export function MyPostsStats() {
  const { getUserStats, currentUserId, getPostsByAuthor, getCommentsByAuthor } = useCommunityStore();
  const stats = getUserStats(currentUserId);
  const posts = getPostsByAuthor(currentUserId);
  const comments = getCommentsByAuthor(currentUserId);
  const reviews = posts.filter(post => post.category === '후기');

  const statsData = [
    {
      title: '작성한 글',
      value: stats.postsCount,
      unit: '개',
      icon: <ArticleIcon />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: '작성한 댓글',
      value: stats.commentsCount,
      unit: '개',
      icon: <CommentIcon />,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: '작성한 후기',
      value: reviews.length,
      unit: '개',
      icon: <RateReviewIcon />,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50'
    },
    {
      title: '받은 좋아요',
      value: stats.totalLikes.toLocaleString(),
      unit: '개',
      icon: <FavoriteIcon />,
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
              <span className={stat.color}>
                {stat.icon}
              </span>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                {stat.value}
              </span>
              <span className="text-sm text-gray-500">{stat.unit}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}