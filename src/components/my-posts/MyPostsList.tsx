"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCommunityStore, CommunityPost } from '@/store/communityStore';
import ArticleIcon from '@mui/icons-material/Article';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';

export function MyPostsList() {
  const { getPostsByAuthor, deletePost, currentUserId } = useCommunityStore();
  const posts = getPostsByAuthor(currentUserId);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'views' | 'likes'>('newest');

  // 개발용 샘플 데이터 추가
  useEffect(() => {
    if (posts.length === 0) {
      // 실제 앱에서는 API에서 사용자의 글을 불러올 것입니다
      console.log('작성한 글이 없습니다. 새로운 글을 작성해보세요!');
    }
  }, [posts.length]);

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      'music': 'bg-blue-100 text-blue-800',
      'fitness': 'bg-green-100 text-green-800',
      'cooking': 'bg-purple-100 text-purple-800'
    };
    return colorMap[category] || 'bg-gray-100 text-gray-800';
  };

  const filteredAndSortedPosts = posts
    .filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'views':
          return b.viewCount - a.viewCount;
        case 'likes':
          return b.likeCount - a.likeCount;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const handleDeletePost = (postId: string, title: string) => {
    if (confirm(`"${title}" 글을 정말 삭제하시겠습니까?`)) {
      deletePost(postId);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <ArticleIcon className="mx-auto text-gray-300 mb-4" sx={{ fontSize: 64 }} />
        <h3 className="text-xl font-semibold text-gray-500 mb-2">아직 작성한 글이 없습니다</h3>
        <p className="text-gray-400 mb-6">첫 번째 글을 작성해보세요!</p>
        <Link 
          href="/post/write"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          <AddIcon sx={{ fontSize: 20 }} />
          글 작성하기
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 검색 및 필터 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 검색 */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="글 제목, 내용, 태그 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* 카테고리 필터 */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">전체 카테고리</option>
            <option value="music">음악</option>
            <option value="fitness">운동</option>
            <option value="cooking">요리</option>
          </select>

          {/* 정렬 */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="newest">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="views">조회수순</option>
            <option value="likes">좋아요순</option>
          </select>
        </div>

        {/* 결과 수 */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            총 {filteredAndSortedPosts.length}개의 글
          </p>
          <Link 
            href="/post/write"
            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            <AddIcon sx={{ fontSize: 16 }} />
            새 글 작성
          </Link>
        </div>
      </div>

      {/* 글 목록 */}
      <div className="space-y-4">
        {filteredAndSortedPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                    {post.categoryEmoji} {post.category}
                  </span>
                  {!post.isPublished && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      임시저장
                    </span>
                  )}
                </div>
                
                <Link href={`/post/${post.id}`} className="block hover:text-primary transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                
                <p className="text-gray-600 mb-3 line-clamp-2">
                  {post.content.replace(/<[^>]*>/g, '')} {/* HTML 태그 제거 */}
                </p>

                {/* 태그 */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-md text-xs">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* 통계 및 날짜 */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <VisibilityIcon sx={{ fontSize: 16 }} />
                    {post.viewCount.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <FavoriteIcon sx={{ fontSize: 16 }} />
                    {post.likeCount}
                  </div>
                  <div className="flex items-center gap-1">
                    <CommentIcon sx={{ fontSize: 16 }} />
                    {post.commentCount}
                  </div>
                  <span>•</span>
                  <span>{formatDate(post.createdAt)}</span>
                  {post.updatedAt !== post.createdAt && (
                    <span>(수정됨)</span>
                  )}
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex items-center gap-2 ml-4">
                <Link
                  href={`/post/write?edit=${post.id}`}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="수정"
                >
                  <EditIcon sx={{ fontSize: 20 }} />
                </Link>
                <button
                  onClick={() => handleDeletePost(post.id, post.title)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="삭제"
                >
                  <DeleteIcon sx={{ fontSize: 20 }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 검색 결과 없음 */}
      {filteredAndSortedPosts.length === 0 && searchQuery && (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
          <SearchIcon className="mx-auto text-gray-300 mb-4" sx={{ fontSize: 48 }} />
          <p className="text-gray-500 text-lg">'{searchQuery}'에 대한 검색 결과가 없습니다.</p>
          <p className="text-gray-400 text-sm mt-2">다른 검색어를 시도해보세요.</p>
        </div>
      )}
    </div>
  );
}