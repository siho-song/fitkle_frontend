import React from 'react';
import { Tutor, Review, ReviewSummary } from '../../../domain/entities/tutor';
import Image from 'next/image';

interface TutorReviewSectionProps {
  tutor: Tutor;
}

export const TutorReviewSection: React.FC<TutorReviewSectionProps> = ({ tutor }) => {
  if (!tutor.reviews || tutor.reviews.length === 0) {
    return (
      <div className="px-5 py-12 flex flex-col items-center text-gray-400">
        <span className="text-5xl mb-4">📝</span>
        <div className="text-base">아직 작성된 리뷰가 없어요.</div>
      </div>
    );
  }
  return (
    <section className="px-5 py-6 md:px-10 md:py-8">
      <h2 className="text-lg md:text-xl font-bold mb-6">{tutor.reviewSummaryTitle}</h2>
      <ReviewSummaryBox averageRating={tutor.averageRating} summary={tutor.reviewSummary} />
      <div className="my-10" />
      <ReviewList reviews={tutor.reviews} />
    </section>
  );
};

const ReviewSummaryBox: React.FC<{ averageRating: number; summary: ReviewSummary }> = ({ averageRating, summary }) => {
  const totalRatings = Object.values(summary.ratingDistribution).reduce((a, b) => a + b, 0);
  return (
    <div>
      <div className="flex flex-col md:flex-row bg-gray-50 rounded-xl p-6 gap-6 items-center">
        {/* 평균 별점 */}
        <div className="flex flex-col items-center flex-shrink-0 w-32">
          <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
          <div className="flex gap-1 my-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-yellow-400 text-xl">
                {i < Math.floor(averageRating) ? '★' : (i < averageRating ? '⯨' : '☆')}
              </span>
            ))}
          </div>
          <div className="text-gray-500 text-sm mt-1">{totalRatings}개 리뷰</div>
        </div>
        {/* 별점 분포 */}
        <div className="flex-1 flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, i) => {
            const star = 5 - i;
            const count = summary.ratingDistribution[star] ?? 0;
            return <RatingBar key={star} star={star} count={count} total={totalRatings} />;
          })}
        </div>
      </div>
      {/* 태그 Chip */}
      {summary.tags && summary.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {summary.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium border border-gray-200">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const RatingBar: React.FC<{ star: number; count: number; total: number }> = ({ star, count, total }) => {
  const percent = total > 0 ? count / total : 0;
  return (
    <div className="flex items-center gap-2">
      <span className="w-8 text-sm text-gray-600">{star}점</span>
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-2 bg-yellow-400" style={{ width: `${percent * 100}%` }} />
      </div>
      <span className="w-6 text-right text-xs text-gray-500">{count}</span>
    </div>
  );
};

const ReviewList: React.FC<{ reviews: Review[] }> = ({ reviews }) => (
  <div className="flex flex-col gap-12 mt-8">
    {reviews.map((review, i) => (
      <ReviewItem key={i} review={review} />
    ))}
  </div>
);

const ReviewItem: React.FC<{ review: Review }> = ({ review }) => (
  <div>
    <div className="flex items-center gap-4">
      <Image
        src={review.reviewerProfileImageUrl}
        alt={review.reviewer}
        width={48}
        height={48}
        className="w-12 h-12 rounded-full object-cover border border-gray-200"
      />
      <div>
        <div className="font-bold text-base">{review.reviewer}</div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-yellow-400">
              {i < review.rating ? '★' : '☆'}
            </span>
          ))}
          <span className="ml-2">{formatDate(review.date)}</span>
        </div>
      </div>
    </div>
    <div className="mt-4 text-base text-gray-800 leading-relaxed">{review.comment}</div>
    {review.imageUrl && (
      <Image
        src={review.imageUrl}
        alt="review-img"
        width={600}
        height={200}
        className="mt-4 rounded-lg w-full max-w-lg object-cover border border-gray-100"
      />
    )}
  </div>
);

function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
} 