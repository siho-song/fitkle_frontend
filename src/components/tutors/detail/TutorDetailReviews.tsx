"use client";

import React, { useState } from 'react';
import { TutorItem } from '@/store/tutorsStore';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FilterListIcon from '@mui/icons-material/FilterList';

interface TutorDetailReviewsProps {
  tutor: TutorItem;
}

// 임시 리뷰 데이터 (실제로는 API에서 가져와야 함)
const sampleReviews = [
  {
    id: '1',
    userName: '김학생',
    userAvatar: '',
    rating: 5,
    content: '정말 친절하고 자세하게 설명해주셨어요. 덕분에 어려웠던 개념을 쉽게 이해할 수 있었습니다. 강력 추천드려요!',
    createdAt: '2024-01-15T10:30:00.000Z',
    helpful: 12,
    tags: ['친절함', '설명 잘함', '전문성']
  },
  {
    id: '2',
    userName: '이수강생',
    userAvatar: '',
    rating: 4,
    content: '체계적인 커리큘럼과 실습 위주의 수업이 인상깊었습니다. 다만 진도가 조금 빨라서 따라가기 힘든 부분이 있었어요.',
    createdAt: '2024-01-10T14:20:00.000Z',
    helpful: 8,
    tags: ['체계적', '실습 위주']
  },
  {
    id: '3',
    userName: '박초보',
    userAvatar: '',
    rating: 5,
    content: '초보자도 쉽게 따라할 수 있게 차근차근 가르쳐주세요. 질문에도 친절하게 답변해주시고 피드백도 빨라요.',
    createdAt: '2024-01-05T16:45:00.000Z',
    helpful: 15,
    tags: ['초보자 친화', '빠른 피드백']
  }
];

export function TutorDetailReviews({ tutor }: TutorDetailReviewsProps) {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'helpful'>('newest');

  const ratingDistribution = [
    { rating: 5, count: 85, percentage: 70 },
    { rating: 4, count: 25, percentage: 20 },
    { rating: 3, count: 8, percentage: 7 },
    { rating: 2, count: 3, percentage: 2 },
    { rating: 1, count: 1, percentage: 1 }
  ];

  const filteredReviews = selectedRating === 0 
    ? sampleReviews 
    : sampleReviews.filter(review => review.rating === selectedRating);

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'helpful':
        return b.helpful - a.helpful;
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <StarIcon className="text-primary" />
        수강 후기 ({tutor.reviewCount})
      </h2>

      {/* 평점 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* 전체 평점 */}
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-900 mb-2">{tutor.rating}</div>
          <div className="flex justify-center items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={i < tutor.rating ? 'text-yellow-400' : 'text-gray-300'}
                sx={{ fontSize: 24 }}
              />
            ))}
          </div>
          <div className="text-gray-600">{tutor.reviewCount}개 리뷰</div>
        </div>

        {/* 평점 분포 */}
        <div className="space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-3">
              <span className="w-8 text-sm text-gray-600">{rating}점</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-8 text-sm text-gray-600">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 필터 및 정렬 */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <FilterListIcon className="text-gray-500" sx={{ fontSize: 20 }} />
          <span className="text-sm font-medium text-gray-700">평점 필터:</span>
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(parseInt(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value={0}>모든 평점</option>
            {[5, 4, 3, 2, 1].map(rating => (
              <option key={rating} value={rating}>{rating}점</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">정렬:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="newest">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="helpful">도움순</option>
          </select>
        </div>
      </div>

      {/* 리뷰 목록 */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                {review.userAvatar ? (
                  <img 
                    src={review.userAvatar} 
                    alt={review.userName} 
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <PersonIcon className="text-gray-500" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-gray-900">{review.userName}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                        sx={{ fontSize: 16 }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
                </div>
                
                <p className="text-gray-700 mb-3 leading-relaxed">{review.content}</p>
                
                {/* 리뷰 태그 */}
                {review.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {review.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* 도움됨 버튼 */}
                <button className="flex items-center gap-1 text-gray-500 hover:text-primary transition-colors">
                  <ThumbUpIcon sx={{ fontSize: 16 }} />
                  <span className="text-sm">도움됨 ({review.helpful})</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 더보기 버튼 */}
      {tutor.reviewCount > 3 && (
        <div className="text-center mt-8">
          <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-medium">
            리뷰 더보기 ({tutor.reviewCount - 3}개 더)
          </button>
        </div>
      )}
    </div>
  );
}