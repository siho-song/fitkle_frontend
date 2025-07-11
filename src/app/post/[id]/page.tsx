"use client";

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { useParams, useRouter } from 'next/navigation';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ExpertBadge } from '@/components/community/ExpertBadge';
import { useCommunityStore } from '@/store/communityStore';

export default function CommunityPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  
  const { 
    getPost, 
    getPostComments, 
    isLiked, 
    isBookmarked, 
    toggleLike, 
    toggleBookmark,
    addView 
  } = useCommunityStore();

  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);

  // 게시글 데이터 로드
  useEffect(() => {
    if (postId) {
      const foundPost = getPost(postId);
      if (foundPost) {
        setPost(foundPost);
        setComments(getPostComments(postId));
        addView(postId);
      } else {
        // 게시글을 찾을 수 없으면 커뮤니티 페이지로 리다이렉트
        router.push('/community');
      }
    }
  }, [postId, getPost, getPostComments, addView, router]);

  if (!post) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-500 mb-2">
              게시글을 찾을 수 없습니다
            </h3>
            <p className="text-gray-400">
              게시글이 삭제되었거나 잘못된 주소입니다.
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const handleLike = () => {
    toggleLike(postId, 'post');
  };

  const handleBookmark = () => {
    toggleBookmark(postId);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* 포스트 헤더 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{post.categoryEmoji}</span>
                <span className="text-lg font-bold text-primary">{post.category}</span>
                {post.isFeatured && (
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full">
                    ⭐ 추천
                  </span>
                )}
                {post.isResolved && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full flex items-center gap-1">
                    <CheckCircleIcon sx={{ fontSize: 14 }} />
                    완료
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <AccessTimeIcon sx={{ fontSize: 16 }} />
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-relaxed">
              {post.title}
            </h1>

            {/* 작성자 정보 */}
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <div className="flex items-center gap-4">
                <img 
                  src={post.authorAvatar} 
                  alt={post.authorName}
                  className="w-12 h-12 rounded-full object-cover shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-900">{post.authorName}</span>
                    {post.authorType === 'expert' && post.expertInfo && (
                      <ExpertBadge 
                        type={post.expertInfo.badgeType}
                        category={post.category}
                        size="small"
                      />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {post.authorType === 'expert' && post.expertInfo 
                      ? post.expertInfo.experience 
                      : post.authorType === 'student' 
                        ? `${post.studentInfo?.level === 'beginner' ? '초보자' : post.studentInfo?.level === 'intermediate' ? '중급자' : '상급자'} 학습자`
                        : '학습자'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <VisibilityIcon sx={{ fontSize: 16 }} />
                  <span>{post.viewCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CommentIcon sx={{ fontSize: 16 }} />
                  <span>{post.commentCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 포스트 내용 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed text-gray-800">
                {post.content}
              </div>
            </div>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200">
              {post.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-md hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isLiked(postId, 'post')
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ThumbUpIcon sx={{ fontSize: 18 }} />
                  <span>{post.likeCount}</span>
                </button>
                
                <button
                  onClick={handleBookmark}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isBookmarked(postId)
                      ? 'bg-yellow-100 text-yellow-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isBookmarked(postId) ? <BookmarkIcon sx={{ fontSize: 18 }} /> : <BookmarkBorderIcon sx={{ fontSize: 18 }} />}
                  북마크
                </button>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <ShareIcon sx={{ fontSize: 18 }} />
                공유하기
              </button>
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">댓글 {comments.length}개</h3>
            
            {/* 댓글 작성 */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <textarea
                placeholder="도움이 되는 댓글을 남겨주세요..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-3">
                <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  댓글 작성
                </button>
              </div>
            </div>

            {/* 댓글 목록 */}
            <div className="space-y-6">
              {comments.length > 0 ? comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-4">
                  <img 
                    src={comment.authorAvatar} 
                    alt={comment.authorName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-gray-900">{comment.authorName}</span>
                      <span className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                      {comment.isMarkedAsAnswer && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                          <CheckCircleIcon sx={{ fontSize: 12 }} />
                          채택
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-3 whitespace-pre-wrap">{comment.content}</p>
                    
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => toggleLike(comment.id, 'comment')}
                        className={`flex items-center gap-1 text-sm transition-colors ${
                          isLiked(comment.id, 'comment') 
                            ? 'text-primary' 
                            : 'text-gray-500 hover:text-primary'
                        }`}
                      >
                        <ThumbUpIcon sx={{ fontSize: 14 }} />
                        <span>{comment.likeCount}</span>
                      </button>
                      <button className="text-sm text-gray-500 hover:text-primary transition-colors">
                        답글
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-gray-500">
                  <p>아직 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}