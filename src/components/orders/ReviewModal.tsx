"use client";

import React, { useState } from 'react';
import { OrderItem, useOrdersStore } from '@/store/ordersStore';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';

interface ReviewModalProps {
  order: OrderItem;
  onClose: () => void;
}

export function ReviewModal({ order, onClose }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const { addReview } = useOrdersStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('별점을 선택해주세요.');
      return;
    }

    if (comment.trim().length < 10) {
      alert('리뷰는 최소 10자 이상 작성해주세요.');
      return;
    }

    addReview(order.id, rating, comment.trim());
    onClose();
    alert('리뷰가 작성되었습니다!');
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      const isHovered = hoveredRating >= starValue;
      const isSelected = rating >= starValue;

      return (
        <button
          key={index}
          type="button"
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
          className="transition-colors"
        >
          {(isSelected || isHovered) ? (
            <StarIcon 
              className="text-yellow-400 hover:text-yellow-500" 
              sx={{ fontSize: 32 }} 
            />
          ) : (
            <StarBorderIcon 
              className="text-gray-300 hover:text-yellow-300" 
              sx={{ fontSize: 32 }} 
            />
          )}
        </button>
      );
    });
  };

  const getRatingText = (rating: number) => {
    const texts = {
      1: '매우 불만족',
      2: '불만족',
      3: '보통',
      4: '만족',
      5: '매우 만족'
    };
    return texts[rating as keyof typeof texts] || '';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">리뷰 작성</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* 튜터 정보 */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {order.tutorAvatar ? (
                <img 
                  src={order.tutorAvatar} 
                  alt={order.tutorName} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <PersonIcon className="text-gray-500" sx={{ fontSize: 24 }} />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{order.tutorName}</h3>
              <p className="text-gray-500 flex items-center gap-1">
                <span>{order.categoryEmoji}</span>
                {order.category}
              </p>
              <p className="text-sm text-gray-600 mt-1">{order.description}</p>
            </div>
          </div>
        </div>

        {/* 리뷰 폼 */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* 별점 선택 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              튜터링은 어떠셨나요?
            </label>
            <div className="flex items-center justify-center gap-1 mb-2">
              {renderStars()}
            </div>
            {(rating > 0 || hoveredRating > 0) && (
              <p className="text-center text-sm text-gray-600">
                {getRatingText(hoveredRating || rating)}
              </p>
            )}
          </div>

          {/* 리뷰 내용 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              상세 리뷰 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="튜터링 경험을 자세히 작성해주세요. (최소 10자)"
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">
                최소 10자 이상 작성해주세요.
              </p>
              <p className="text-xs text-gray-500">
                {comment.length}/500
              </p>
            </div>
          </div>

          {/* 리뷰 가이드라인 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-blue-900 mb-2">리뷰 작성 가이드</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 튜터의 전문성과 소통 능력을 평가해주세요</li>
              <li>• 학습 목표 달성에 도움이 되었는지 알려주세요</li>
              <li>• 다른 학습자들에게 도움이 되는 솔직한 후기를 남겨주세요</li>
            </ul>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              리뷰 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}