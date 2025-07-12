"use client";

import React, { useState, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface Review {
  id: string;
  studentName: string;
  studentAvatar: string;
  tutorName: string;
  category: string;
  rating: number;
  reviewText: string;
  course: string;
  completedDate: string;
  beforeAfter?: {
    before: string;
    after: string;
  };
}

export const StudentReviewsSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const reviews: Review[] = [
    {
      id: "1",
      studentName: "김지현",
      studentAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      tutorName: "김민수",
      category: "프로그래밍",
      rating: 5,
      reviewText: "React를 처음 배울 때 정말 막막했는데, 김민수 튜터님 덕분에 체계적으로 배울 수 있었어요. 실무 경험을 바탕으로 한 예제들이 정말 도움이 되었습니다. 이제 혼자서도 프로젝트를 만들 수 있게 되었어요!",
      course: "React 기초부터 실전까지",
      completedDate: "2024-01-15",
      beforeAfter: {
        before: "HTML/CSS만 알고 있던 초보자",
        after: "React로 포트폴리오 사이트 제작 완료"
      }
    },
    {
      id: "2",
      studentName: "박성민",
      studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      tutorName: "이영희",
      category: "디자인",
      rating: 5,
      reviewText: "UI/UX 디자인을 배우고 싶어서 수강했는데, 정말 만족스러웠습니다. 이론뿐만 아니라 실제 프로젝트를 통해 배우니까 이해가 훨씬 잘 되었어요. 구글에서 일했던 경험을 공유해주셔서 더욱 도움이 되었습니다.",
      course: "UI/UX 디자인 마스터클래스",
      completedDate: "2024-01-22",
      beforeAfter: {
        before: "디자인 툴도 다룰 줄 몰랐던 상태",
        after: "Figma로 앱 디자인 시스템 구축"
      }
    },
    {
      id: "3",
      studentName: "이수진",
      studentAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      tutorName: "박철수",
      category: "언어",
      rating: 5,
      reviewText: "영어회화가 정말 어려웠는데, 박철수 튜터님과 함께 하니까 자신감이 생겼어요. 실생활에서 바로 쓸 수 있는 표현들을 많이 배웠고, 발음 교정도 꼼꼼히 해주셔서 많이 늘었습니다. 토익 점수도 200점이나 올랐어요!",
      course: "실전 영어회화 + 토익 집중반",
      completedDate: "2024-02-10",
      beforeAfter: {
        before: "토익 600점, 회화 전혀 못함",
        after: "토익 800점, 영어로 프레젠테이션 가능"
      }
    },
    {
      id: "4",
      studentName: "최현우",
      studentAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      tutorName: "권태진",
      category: "투자",
      rating: 5,
      reviewText: "투자를 시작하고 싶었지만 어떻게 해야 할지 몰랐는데, 권태진 튜터님께서 기초부터 차근차근 알려주셨어요. 리스크 관리의 중요성과 분산투자 방법을 배워서 이제 안전하게 투자할 수 있게 되었습니다.",
      course: "초보자를 위한 투자 기초",
      completedDate: "2024-02-28",
      beforeAfter: {
        before: "투자 지식 전무한 상태",
        after: "월 수익률 8% 달성 중"
      }
    },
    {
      id: "5",
      studentName: "정미영",
      studentAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
      tutorName: "최연주",
      category: "건강",
      rating: 5,
      reviewText: "다이어트를 여러 번 시도했지만 항상 실패했는데, 최연주 튜터님께서 과학적인 방법으로 식단을 짜주셔서 건강하게 살을 뺄 수 있었어요. 3개월 만에 10kg 감량에 성공했고, 요요현상도 없어서 정말 만족합니다!",
      course: "건강한 다이어트 & 영양 관리",
      completedDate: "2024-03-15",
      beforeAfter: {
        before: "체중 75kg, 체지방률 35%",
        after: "체중 65kg, 체지방률 25%"
      }
    },
    {
      id: "6",
      studentName: "강동훈",
      studentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      tutorName: "조현우",
      category: "데이터 분석",
      rating: 5,
      reviewText: "회사에서 데이터 분석 업무를 맡게 되어서 급하게 배워야 했는데, 조현우 튜터님이 실무 중심으로 가르쳐주셔서 바로 업무에 적용할 수 있었어요. Excel부터 Tableau까지 전체적인 흐름을 이해하게 되었습니다.",
      course: "실무 데이터 분석 완전정복",
      completedDate: "2024-03-30",
      beforeAfter: {
        before: "Excel 기본 기능만 사용",
        after: "Tableau로 대시보드 제작 및 보고서 자동화"
      }
    }
  ];

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(reviews.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full flex flex-col">
      {/* 별점 */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon 
            key={i} 
            className={i < review.rating ? "text-yellow-400" : "text-gray-300"} 
            sx={{ fontSize: 20 }} 
          />
        ))}
      </div>

      {/* 리뷰 텍스트 */}
      <div className="relative mb-6 flex-1">
        <FormatQuoteIcon className="absolute -top-2 -left-2 text-primary/20" sx={{ fontSize: 40 }} />
        <p className="text-gray-700 leading-relaxed pl-6 italic">
          "{review.reviewText}"
        </p>
      </div>

      {/* Before & After */}
      {review.beforeAfter && (
        <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-xl p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-xs font-semibold text-red-600 mb-2">BEFORE</div>
              <div className="text-sm text-gray-700">{review.beforeAfter.before}</div>
            </div>
            <div className="text-center">
              <div className="text-xs font-semibold text-green-600 mb-2">AFTER</div>
              <div className="text-sm text-gray-700">{review.beforeAfter.after}</div>
            </div>
          </div>
        </div>
      )}

      {/* 학생 정보 */}
      <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
        <img 
          src={review.studentAvatar} 
          alt={review.studentName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="font-semibold text-gray-900">{review.studentName}</div>
          <div className="text-sm text-gray-600">{review.course}</div>
          <div className="text-xs text-gray-500">
            {review.tutorName} 튜터 • {new Date(review.completedDate).toLocaleDateString('ko-KR')} 수강완료
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            수강생들의 <span className="text-primary">진짜 후기</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fitkle과 함께한 학습자들의 성공 스토리를 확인해보세요
          </p>
        </div>

        {/* 리뷰 슬라이더 */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 슬라이더 컨트롤 */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-300 z-10"
              >
                <ChevronLeftIcon sx={{ fontSize: 24 }} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-300 z-10"
              >
                <ChevronRightIcon sx={{ fontSize: 24 }} />
              </button>
            </>
          )}
        </div>

        {/* 페이지네이션 */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'bg-primary scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-20">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">99%</div>
            <div className="text-gray-600">수강 만족도</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">4.8+</div>
            <div className="text-gray-600">평균 평점</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-gray-600">성공 사례</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">95%</div>
            <div className="text-gray-600">목표 달성률</div>
          </div>
        </div>
      </div>
    </section>
  );
};