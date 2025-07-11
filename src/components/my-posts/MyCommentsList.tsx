"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCommunityStore, CommunityComment } from '@/store/communityStore';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ReplyIcon from '@mui/icons-material/Reply';
import RestoreIcon from '@mui/icons-material/Restore';

export function MyCommentsList() {
  const { getCommentsByAuthor, updateComment, deleteComment, currentUserId, getPost } = useCommunityStore();
  const comments = getCommentsByAuthor(currentUserId);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleted, setShowDeleted] = useState(false);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  // 개발용 샘플 데이터 추가
  useEffect(() => {
    if (comments.length === 0) {
      // 실제 앱에서는 API에서 사용자의 댓글을 불러올 것입니다
      console.log('작성한 댓글이 없습니다.');
    }
  }, [comments.length]);

  const filteredComments = comments
    .filter(comment => {
      const post = getPost(comment.postId);
      const postTitle = post?.title || '';
      
      const matchesSearch = searchQuery === '' ||
        comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        postTitle.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDeletedFilter = showDeleted || !comment.isDeleted;
      
      return matchesSearch && matchesDeletedFilter;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleEditStart = (comment: CommunityComment) => {
    setEditingComment(comment.id);
    setEditContent(comment.content);
  };

  const handleEditSave = (commentId: string) => {
    if (editContent.trim()) {
      updateComment(commentId, editContent.trim());
      setEditingComment(null);
      setEditContent('');
    }
  };

  const handleEditCancel = () => {
    setEditingComment(null);
    setEditContent('');
  };

  const handleDeleteComment = (commentId: string) => {
    if (confirm('댓글을 정말 삭제하시겠습니까?')) {
      deleteComment(commentId);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (comments.length === 0) {
    return (
      <div className="text-center py-16">
        <CommentIcon className="mx-auto text-gray-300 mb-4" sx={{ fontSize: 64 }} />
        <h3 className="text-xl font-semibold text-gray-500 mb-2">아직 작성한 댓글이 없습니다</h3>
        <p className="text-gray-400 mb-6">다른 사람의 글에 댓글을 남겨보세요!</p>
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
      {/* 검색 및 필터 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* 검색 */}
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="댓글 내용, 게시글 제목 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* 삭제된 댓글 표시 */}
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showDeleted}
                onChange={(e) => setShowDeleted(e.target.checked)}
                className="rounded text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">삭제된 댓글 포함</span>
            </label>
          </div>
        </div>

        {/* 결과 수 */}
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            총 {filteredComments.length}개의 댓글
            {comments.filter(c => c.isDeleted).length > 0 && (
              <span className="text-gray-500">
                {' '}(삭제됨: {comments.filter(c => c.isDeleted).length}개)
              </span>
            )}
          </p>
        </div>
      </div>

      {/* 댓글 목록 */}
      <div className="space-y-4">
        {filteredComments.map((comment) => (
          <div 
            key={comment.id} 
            className={`bg-white rounded-2xl border border-gray-200 p-6 transition-all ${
              comment.isDeleted ? 'opacity-60 bg-gray-50' : 'hover:shadow-lg'
            }`}
          >
            {/* 댓글 헤더 */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {comment.parentCommentId && (
                    <ReplyIcon className="text-gray-400" sx={{ fontSize: 16 }} />
                  )}
                  <Link 
                    href={`/post/${comment.postId}`}
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    {getPost(comment.postId)?.title || '게시글을 찾을 수 없습니다'}
                  </Link>
                  {comment.isDeleted && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md text-xs font-medium">
                      삭제됨
                    </span>
                  )}
                </div>
                
                <div className="text-sm text-gray-500 mb-3">
                  {formatDate(comment.createdAt)}
                  {comment.updatedAt !== comment.createdAt && !comment.isDeleted && (
                    <span className="ml-2">(수정됨)</span>
                  )}
                </div>
              </div>

              {/* 액션 버튼 */}
              {!comment.isDeleted && (
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEditStart(comment)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="수정"
                  >
                    <EditIcon sx={{ fontSize: 18 }} />
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="삭제"
                  >
                    <DeleteIcon sx={{ fontSize: 18 }} />
                  </button>
                </div>
              )}
            </div>

            {/* 댓글 내용 */}
            {editingComment === comment.id ? (
              <div className="space-y-3">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={3}
                  placeholder="댓글 내용을 입력하세요..."
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditSave(comment.id)}
                    disabled={!editContent.trim()}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                  >
                    저장
                  </button>
                  <button
                    onClick={handleEditCancel}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className={`mb-4 ${comment.isDeleted ? 'italic text-gray-500' : 'text-gray-700'}`}>
                  {comment.isDeleted ? (
                    <span>삭제된 댓글입니다.</span>
                  ) : (
                    <p className="leading-relaxed whitespace-pre-wrap">
                      {truncateContent(comment.content)}
                    </p>
                  )}
                </div>

                {/* 댓글 통계 */}
                {!comment.isDeleted && (
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FavoriteIcon sx={{ fontSize: 16 }} />
                      {comment.likeCount}
                    </div>
                    <Link 
                      href={`/post/${comment.postId}#comment-${comment.id}`}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      원문 보기
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* 검색 결과 없음 */}
      {filteredComments.length === 0 && searchQuery && (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
          <SearchIcon className="mx-auto text-gray-300 mb-4" sx={{ fontSize: 48 }} />
          <p className="text-gray-500 text-lg">'{searchQuery}'에 대한 검색 결과가 없습니다.</p>
          <p className="text-gray-400 text-sm mt-2">다른 검색어를 시도해보세요.</p>
        </div>
      )}

      {/* 필터 결과 없음 */}
      {filteredComments.length === 0 && !searchQuery && !showDeleted && comments.filter(c => c.isDeleted).length > 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
          <RestoreIcon className="mx-auto text-gray-300 mb-4" sx={{ fontSize: 48 }} />
          <p className="text-gray-500 text-lg">표시할 댓글이 없습니다.</p>
          <p className="text-gray-400 text-sm mt-2">
            삭제된 댓글을 포함하여 보려면 위의 체크박스를 선택하세요.
          </p>
        </div>
      )}
    </div>
  );
}