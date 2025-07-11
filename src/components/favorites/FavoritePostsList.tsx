"use client";

import React from 'react';
import Link from 'next/link';
import { useFavoritesStore } from '@/store/favoritesStore';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VerifiedIcon from '@mui/icons-material/Verified';

export function FavoritePostsList() {
  const { favoritePosts, removeFavoritePost } = useFavoritesStore();

  const handleRemove = (postId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (confirm('이 게시글을 스크랩 목록에서 제거하시겠습니까?')) {
      removeFavoritePost(postId);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPostTypeInfo = (type: string) => {
    switch (type) {
      case 'question':
        return { icon: <QuestionAnswerIcon />, color: 'text-blue-500', bgColor: 'bg-blue-50', label: '질문' };
      case 'tip':
        return { icon: <LightbulbIcon />, color: 'text-green-500', bgColor: 'bg-green-50', label: '팁' };
      case 'guide':
        return { icon: <MenuBookIcon />, color: 'text-purple-500', bgColor: 'bg-purple-50', label: '가이드' };
      default:
        return { icon: <QuestionAnswerIcon />, color: 'text-gray-500', bgColor: 'bg-gray-50', label: '' };
    }
  };

  if (favoritePosts.length === 0) {
    return (
      <div className="text-center py-16">
        <ArticleIcon className="mx-auto text-gray-300 mb-4" sx={{ fontSize: 64 }} />
        <h3 className="text-xl font-semibold text-gray-500 mb-2">스크랩한 게시글이 없습니다</h3>
        <p className="text-gray-400 mb-6">유용한 게시글을 스크랩해보세요!</p>
        <Link 
          href="/community"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          커뮤니티 둘러보기
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">
          스크랩한 게시글 ({favoritePosts.length}개)
        </h2>
      </div>

      <div className="space-y-4">
        {favoritePosts.filter((post, index, self) => 
          index === self.findIndex(p => p.id === post.id)
        ).map((post) => {
          const typeInfo = getPostTypeInfo(post.type);
          
          return (
            <Link
              key={post.id}
              href={`/post/${post.id}`}
              className="block group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group-hover:scale-[1.01] relative">
                {/* 삭제 버튼 */}
                <button
                  onClick={(e) => handleRemove(post.id, e)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  title="스크랩 목록에서 제거"
                >
                  <DeleteIcon sx={{ fontSize: 18 }} />
                </button>

                {/* 게시글 헤더 */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{post.categoryEmoji}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">{post.category}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${typeInfo.color} ${typeInfo.bgColor}`}>
                        {typeInfo.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 제목 */}
                <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                {/* 작성자 정보 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">{post.author}</span>
                    {post.authorType === 'expert' && (
                      <VerifiedIcon className="text-blue-500" sx={{ fontSize: 16 }} />
                    )}
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{post.timeAgo}</span>
                  </div>
                </div>

                {/* 상호작용 정보 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <ThumbUpIcon sx={{ fontSize: 14 }} />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CommentIcon sx={{ fontSize: 14 }} />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <VisibilityIcon sx={{ fontSize: 14 }} />
                      <span>{post.views}</span>
                    </div>
                  </div>

                  {/* 스크랩한 날짜 */}
                  <div className="text-xs text-gray-500">
                    {formatDate(post.addedDate)}에 스크랩함
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}