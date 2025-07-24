"use client";

import React, { useState } from 'react';
import { TutorItem } from '@/types/entities/tutor';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FilterListIcon from '@mui/icons-material/FilterList';
import TuneIcon from '@mui/icons-material/Tune';
import SortIcon from '@mui/icons-material/Sort';

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
    content: '정말 친절하고 자세하게 설명해주셨어요. 덕분에 어려웠던 개념을 쉽게 이해할 수 있었습니다. 매번 질문할 때마다 상세하게 답변해주시고, 이해할 때까지 반복해서 설명해주셔서 감사했어요. 강력 추천드려요!',
    createdAt: '2024-01-15T10:30:00.000Z',
    helpful: 24,
    tags: ['친절함', '설명 잘함', '전문성', '인내심']
  },
  {
    id: '2',
    userName: '이수강생',
    userAvatar: '',
    rating: 4,
    content: '체계적인 커리큘럼과 실습 위주의 수업이 인상깊었습니다. 다만 진도가 조금 빨라서 따라가기 힘든 부분이 있었어요. 그래도 복습 자료를 충실히 제공해주셔서 많은 도움이 되었습니다.',
    createdAt: '2024-01-10T14:20:00.000Z',
    helpful: 18,
    tags: ['체계적', '실습 위주', '복습 자료']
  },
  {
    id: '3',
    userName: '박초보',
    userAvatar: '',
    rating: 5,
    content: '초보자도 쉽게 따라할 수 있게 차근차근 가르쳐주세요. 질문에도 친절하게 답변해주시고 피드백도 빨라요. 처음엔 걱정했는데 선생님 덕분에 자신감을 얻었어요!',
    createdAt: '2024-01-05T16:45:00.000Z',
    helpful: 31,
    tags: ['초보자 친화', '빠른 피드백', '자신감 향상']
  },
  {
    id: '4',
    userName: '최직장인',
    userAvatar: '',
    rating: 5,
    content: '바쁜 직장인도 배려해주시는 선생님이에요. 시간 조율도 잘 해주시고, 야근으로 수업을 못 들을 때도 이해해주셔서 감사했습니다. 실무에 바로 적용할 수 있는 내용들로 구성해주셔서 만족도가 높아요.',
    createdAt: '2024-01-20T09:15:00.000Z',
    helpful: 19,
    tags: ['시간 유연성', '실무 적용', '배려심', '만족도 높음']
  },
  {
    id: '5',
    userName: '정학부모',
    userAvatar: '',
    rating: 4,
    content: '우리 아이가 어려워하던 부분을 잘 파악하시고 맞춤형 수업을 해주셔서 성적이 많이 올랐어요. 아이도 선생님을 좋아하고 수업 시간을 기다려요. 다만 숙제가 조금 많은 편이라 아이가 가끔 힘들어해요.',
    createdAt: '2024-01-08T19:30:00.000Z',
    helpful: 22,
    tags: ['맞춤형 수업', '성적 향상', '학생 호감', '숙제 많음']
  },
  {
    id: '6',
    userName: '윤대학생',
    userAvatar: '',
    rating: 5,
    content: '대학교 과제와 시험 준비에 큰 도움이 되었어요. 특히 어려운 개념들을 실생활 예시로 설명해주셔서 이해가 쉬웠습니다. 시험 전에는 추가 시간도 내주셔서 정말 감사했어요.',
    createdAt: '2024-01-12T14:20:00.000Z',
    helpful: 16,
    tags: ['대학 수준', '실생활 예시', '시험 대비', '추가 시간']
  },
  {
    id: '7',
    userName: '송취준생',
    userAvatar: '',
    rating: 4,
    content: '취업 준비하면서 필요한 기술들을 체계적으로 배울 수 있었어요. 포트폴리오 준비에도 많은 조언을 해주셔서 도움이 되었습니다. 가끔 수업이 길어질 때가 있어서 체력적으로 힘들긴 했어요.',
    createdAt: '2024-01-18T11:45:00.000Z',
    helpful: 14,
    tags: ['취업 준비', '포트폴리오', '체계적 학습', '수업 길음']
  },
  {
    id: '8',
    userName: '한중년',
    userAvatar: '',
    rating: 5,
    content: '나이가 있어서 걱정했는데 전혀 문제없었어요. 차근차근 설명해주시고 반복 학습도 잘 도와주셔서 새로운 기술을 익힐 수 있었습니다. 중년에도 배울 수 있다는 자신감을 주셔서 감사해요.',
    createdAt: '2024-01-25T15:10:00.000Z',
    helpful: 27,
    tags: ['중년 친화', '반복 학습', '자신감 부여', '기술 습득']
  },
  {
    id: '9',
    userName: '구재수생',
    userAvatar: '',
    rating: 3,
    content: '수업 내용은 좋았지만 설명이 가끔 너무 빨라서 따라가기 어려웠어요. 질문을 여러 번 해야 해서 부담스러웠습니다. 그래도 기본기는 탄탄하게 잡아주셔서 도움은 되었어요.',
    createdAt: '2024-01-07T13:25:00.000Z',
    helpful: 8,
    tags: ['설명 빠름', '질문 부담', '기본기 탄탄']
  },
  {
    id: '10',
    userName: '임사업자',
    userAvatar: '',
    rating: 5,
    content: '사업에 바로 적용할 수 있는 실무 위주의 수업이었어요. 이론보다는 실전 경험을 중심으로 가르쳐주셔서 매우 유용했습니다. 수업 후에도 궁금한 점이 있으면 연락드릴 수 있어서 좋았어요.',
    createdAt: '2024-01-22T16:50:00.000Z',
    helpful: 20,
    tags: ['실무 위주', '실전 경험', '사후 지원', '사업 적용']
  },
  {
    id: '11',
    userName: '조고등학생',
    userAvatar: '',
    rating: 4,
    content: '고등학교 수준에 맞게 잘 설명해주셨어요. 학교에서 이해 못했던 부분들을 명확하게 해결할 수 있었습니다. 다만 숙제 검사를 좀 더 꼼꼼히 해주시면 좋겠어요.',
    createdAt: '2024-01-14T20:15:00.000Z',
    helpful: 12,
    tags: ['고등학교 수준', '명확한 설명', '숙제 검사']
  },
  {
    id: '12',
    userName: '오주부',
    userAvatar: '',
    rating: 5,
    content: '육아맘도 배려해주시는 선생님이에요. 아이가 갑자기 아프거나 할 때도 이해해주시고 수업 시간도 유연하게 조정해주셔서 감사했어요. 집에서도 할 수 있는 과제들로 내주셔서 좋았습니다.',
    createdAt: '2024-01-28T10:40:00.000Z',
    helpful: 25,
    tags: ['육아맘 배려', '시간 유연성', '재택 과제', '이해심']
  }
];

export function TutorDetailReviews({ tutor }: TutorDetailReviewsProps) {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'helpful'>('newest');
  const [showFilters, setShowFilters] = useState(false);

  // 실제 리뷰 데이터를 기반으로 평점 분포 계산
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = sampleReviews.filter(review => review.rating === rating).length;
    const percentage = Math.round((count / sampleReviews.length) * 100);
    return { rating, count, percentage };
  });

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

      {/* 필터 및 정렬 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-900">리뷰 {filteredReviews.length}개</h3>
          {selectedRating > 0 && (
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {selectedRating}점 필터 적용중
            </span>
          )}
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <TuneIcon sx={{ fontSize: 18 }} />
          필터 및 정렬
        </button>
      </div>

      {/* 필터 패널 */}
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 평점 필터 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FilterListIcon sx={{ fontSize: 16 }} className="inline mr-1" />
                평점 필터
              </label>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value={0}>모든 평점</option>
                {[5, 4, 3, 2, 1].map(rating => (
                  <option key={rating} value={rating}>{rating}점 ({ratingDistribution.find(r => r.rating === rating)?.count || 0}개)</option>
                ))}
              </select>
            </div>
            
            {/* 정렬 옵션 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SortIcon sx={{ fontSize: 16 }} className="inline mr-1" />
                정렬 방식
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="newest">최신순</option>
                <option value="oldest">오래된순</option>
                <option value="helpful">도움순</option>
              </select>
            </div>
          </div>
          
          {/* 필터 초기화 */}
          {selectedRating > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <button
                onClick={() => setSelectedRating(0)}
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                필터 초기화
              </button>
            </div>
          )}
        </div>
      )}

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

      {/* 리뷰 없음 메시지 */}
      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <StarIcon className="mx-auto text-gray-300 mb-4" sx={{ fontSize: 64 }} />
          <h3 className="text-lg font-medium text-gray-500 mb-2">
            {selectedRating > 0 ? `${selectedRating}점 리뷰가 없습니다` : '리뷰가 없습니다'}
          </h3>
          <p className="text-gray-400 mb-4">
            {selectedRating > 0 ? '다른 평점을 선택해보세요.' : '첫 번째 리뷰를 작성해보세요.'}
          </p>
          {selectedRating > 0 && (
            <button
              onClick={() => setSelectedRating(0)}
              className="text-primary hover:text-primary/80 font-medium"
            >
              모든 리뷰 보기
            </button>
          )}
        </div>
      )}

      {/* 더보기 버튼 */}
      {filteredReviews.length > 5 && (
        <div className="text-center mt-8">
          <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-medium">
            리뷰 더보기 ({filteredReviews.length - 5}개 더)
          </button>
        </div>
      )}
    </div>
  );
}