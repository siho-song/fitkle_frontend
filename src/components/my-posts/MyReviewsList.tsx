"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCommunityStore, CommunityPost } from '@/store/communityStore';
import RateReviewIcon from '@mui/icons-material/RateReview';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';

export function MyReviewsList() {
  const { getPostsByAuthor, deletePost, currentUserId } = useCommunityStore();
  const allPosts = getPostsByAuthor(currentUserId);
  const reviews = allPosts.filter(post => post.category === '후기');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'views' | 'likes'>('newest');

  const filteredAndSortedReviews = reviews
    .filter(review => {
      const matchesSearch = searchQuery === '' || 
        review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesSearch;
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

  const handleDeleteReview = (postId: string, title: string) => {
    if (confirm(`"${title}" 후기를 정말 삭제하시겠습니까?`)) {
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

  const extractRating = (content: string): number | null => {
    // 별점 패턴 찾기 (⭐⭐⭐⭐⭐ 형태)
    const starMatch = content.match(/⭐+/);
    if (starMatch) {
      return starMatch[0].length;
    }
    
    // (5/5점) 형태 찾기
    const ratingMatch = content.match(/\((\d+)\/5점?\)/);
    if (ratingMatch) {
      return parseInt(ratingMatch[1]);
    }
    
    return null;
  };

  const getTutorNameFromTitle = (title: string): string => {
    // "선생님"이 포함된 부분에서 이름 추출
    const match = title.match(/(\S+)\s*선생님/);
    return match ? match[1] : '선생님';
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-16">
        <RateReviewIcon className="mx-auto text-gray-300 mb-4" sx={{ fontSize: 64 }} />
        <h3 className="text-xl font-semibold text-gray-500 mb-2">아직 작성한 후기가 없습니다</h3>
        <p className="text-gray-400 mb-6">수업을 받은 후 솔직한 후기를 남겨보세요!</p>
        <Link 
          href="/tutors"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          <AddIcon sx={{ fontSize: 20 }} />
          튜터 찾아보기
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 검색 및 필터 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 검색 */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="후기 제목, 내용, 태그 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* 정렬 */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'views' | 'likes')}
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
            총 {filteredAndSortedReviews.length}개의 후기
          </p>
          <Link 
            href="/tutors"
            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            <AddIcon sx={{ fontSize: 16 }} />
            새 수업 찾기
          </Link>
        </div>
      </div>

      {/* 후기 목록 */}
      <div className="space-y-4">
        {filteredAndSortedReviews.map((review) => {
          const rating = extractRating(review.content);
          const tutorName = getTutorNameFromTitle(review.title);
          
          return (
            <div key={review.id} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium flex items-center gap-1">
                      📝 수업후기
                    </span>
                    {rating && (
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                        <StarIcon className="text-yellow-500" sx={{ fontSize: 16 }} />
                        <span className="text-sm font-medium text-yellow-700">{rating}/5</span>
                      </div>
                    )}
                    {!review.isPublished && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        임시저장
                      </span>
                    )}
                  </div>
                  
                  <Link href={`/post/${review.id}`} className="block hover:text-primary transition-colors">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {review.title}
                    </h3>
                  </Link>
                  
                  <div className="mb-3">
                    <p className="text-gray-600 line-clamp-3">
                      {review.content.replace(/<[^>]*>/g, '').substring(0, 200)}...
                    </p>
                  </div>

                  {/* 튜터 정보 */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-gray-700">수업받은 튜터:</span>
                      <span className="text-primary font-semibold">{tutorName}</span>
                      {rating && (
                        <div className="flex items-center gap-1 ml-2">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon 
                              key={i} 
                              className={i < rating ? 'text-yellow-500' : 'text-gray-300'} 
                              sx={{ fontSize: 14 }} 
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 태그 */}
                  {review.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {review.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                          #{tag}
                        </span>
                      ))}
                      {review.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-md text-xs">
                          +{review.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* 통계 및 날짜 */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <VisibilityIcon sx={{ fontSize: 16 }} />
                      {review.viewCount.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <FavoriteIcon sx={{ fontSize: 16 }} />
                      {review.likeCount}
                    </div>
                    <div className="flex items-center gap-1">
                      <CommentIcon sx={{ fontSize: 16 }} />
                      {review.commentCount}
                    </div>
                    <span>•</span>
                    <span>{formatDate(review.createdAt)}</span>
                    {review.updatedAt !== review.createdAt && (
                      <span>(수정됨)</span>
                    )}
                  </div>
                </div>

                {/* 액션 버튼 */}
                <div className="flex items-center gap-2 ml-4">
                  <Link
                    href={`/post/write?edit=${review.id}`}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="수정"
                  >
                    <EditIcon sx={{ fontSize: 20 }} />
                  </Link>
                  <button
                    onClick={() => handleDeleteReview(review.id, review.title)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="삭제"
                  >
                    <DeleteIcon sx={{ fontSize: 20 }} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 검색 결과 없음 */}
      {filteredAndSortedReviews.length === 0 && searchQuery && (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
          <SearchIcon className="mx-auto text-gray-300 mb-4" sx={{ fontSize: 48 }} />
          <p className="text-gray-500 text-lg">'{searchQuery}'에 대한 검색 결과가 없습니다.</p>
          <p className="text-gray-400 text-sm mt-2">다른 검색어를 시도해보세요.</p>
        </div>
      )}
    </div>
  );
}