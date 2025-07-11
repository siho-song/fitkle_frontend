"use client";

import React, { useState } from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { useParams, useRouter } from 'next/navigation';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function WriteReviewPage() {
  const params = useParams();
  const router = useRouter();
  const reviewId = params.id;

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 테스트용 레슨 데이터
  const lessonData = {
    id: reviewId,
    tutorName: '김요리셰프',
    tutorAvatar: '👨‍🍳',
    serviceName: '한식 기초 요리 클래스',
    serviceCategory: '요리',
    completedAt: '2024-07-10 16:00',
    duration: '1시간'
  };

  const handleSubmitReview = async () => {
    if (rating === 0 || !title.trim() || !content.trim()) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    
    // 실제 API 호출 시뮬레이션
    setTimeout(() => {
      alert('리뷰가 성공적으로 등록되었습니다!');
      router.push('/profile/manage');
      setIsSubmitting(false);
    }, 1000);
  };

  const renderStars = (interactive = false) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1;
      const isFilledStar = starNumber <= (interactive ? (hoveredRating || rating) : rating);
      
      return (
        <button
          key={index}
          type="button"
          disabled={!interactive}
          className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          onClick={() => interactive && setRating(starNumber)}
          onMouseEnter={() => interactive && setHoveredRating(starNumber)}
          onMouseLeave={() => interactive && setHoveredRating(0)}
        >
          {isFilledStar ? (
            <StarIcon className="text-yellow-400" sx={{ fontSize: 28 }} />
          ) : (
            <StarBorderIcon className="text-gray-300" sx={{ fontSize: 28 }} />
          )}
        </button>
      );
    });
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 py-8">
          {/* 헤더 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center gap-3 mb-4">
              <StarIcon className="text-yellow-400 text-3xl" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">리뷰 작성</h1>
                <p className="text-gray-600">레슨 경험을 다른 학습자들과 공유해주세요</p>
              </div>
            </div>
          </div>

          {/* 레슨 정보 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">완료된 레슨</h2>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-primary/20 rounded-full flex items-center justify-center text-xl">
                {lessonData.tutorAvatar}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{lessonData.serviceName}</h3>
                <p className="text-gray-600 text-sm mb-2">{lessonData.serviceCategory} • {lessonData.duration}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <PersonIcon sx={{ fontSize: 16 }} />
                  <span>{lessonData.tutorName} 튜터</span>
                </div>
              </div>
              
              <div className="text-right text-sm text-gray-500">
                <p>완료: {lessonData.completedAt}</p>
              </div>
            </div>
          </div>

          {/* 평점 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">평점을 매겨주세요</h2>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-4">
                {renderStars(true)}
              </div>
              
              <p className="text-gray-600">
                {rating === 0 && '별점을 선택해주세요'}
                {rating === 1 && '⭐ 아쉬워요'}
                {rating === 2 && '⭐⭐ 별로에요'}
                {rating === 3 && '⭐⭐⭐ 보통이에요'}
                {rating === 4 && '⭐⭐⭐⭐ 좋아요'}
                {rating === 5 && '⭐⭐⭐⭐⭐ 최고에요'}
              </p>
            </div>
          </div>

          {/* 리뷰 제목 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">리뷰 제목</h2>
            
            <input
              type="text"
              placeholder="예) 정말 친절하고 자세한 설명이 좋았어요!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              maxLength={50}
            />
            <p className="text-sm text-gray-500 mt-2 text-right">{title.length}/50</p>
          </div>

          {/* 리뷰 내용 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">상세 리뷰</h2>
            
            <textarea
              placeholder="레슨 경험을 자세히 적어주세요.&#10;- 튜터의 설명은 어땠나요?&#10;- 목표한 것을 달성했나요?&#10;- 다른 학습자들에게 추천하고 싶나요?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={8}
              maxLength={500}
            />
            <p className="text-sm text-gray-500 mt-2 text-right">{content.length}/500</p>
          </div>

          {/* 리뷰 가이드라인 */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
            <h3 className="font-semibold text-blue-900 mb-3">리뷰 작성 가이드라인</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• 실제 경험에 기반한 솔직한 리뷰를 작성해주세요</li>
              <li>• 개인정보나 연락처는 포함하지 말아주세요</li>
              <li>• 부적절한 언어나 비방은 삼가해주세요</li>
              <li>• 구체적인 레슨 내용과 느낀 점을 공유해주세요</li>
            </ul>
          </div>

          {/* 제출 버튼 */}
          <div className="flex gap-3">
            <button
              onClick={() => router.back()}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleSubmitReview}
              disabled={isSubmitting || rating === 0 || !title.trim() || !content.trim()}
              className="flex-1 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  등록 중...
                </div>
              ) : (
                '리뷰 등록하기'
              )}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}