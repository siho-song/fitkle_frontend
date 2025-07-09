"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CenteredLayout } from "@/components/layouts/CenteredLayout";
import { ArrowLeft, Star, PartyPopper } from "lucide-react";

interface DetailServices {
  [key: string]: string[];
}

const ServiceRecommendationSurveyPage: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [stepHistory, setStepHistory] = useState<number[]>([1]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const detailServices: DetailServices = {
    디자인: [
      "로고 디자인",
      "패키지",
      "웹 UI·UX",
      "3D 공간 모델링",
      "3D 제품모델링·렌더링",
      "앱·모바일 UI·UX",
      "책표지·내지",
      "템플릿형 홈페이지",
    ],
    마케팅: [
      "SNS 마케팅",
      "검색광고",
      "바이럴",
      "콘텐츠 마케팅",
      "오프라인 마케팅",
      "마케팅 전략",
      "이벤트/프로모션",
      "기타",
    ],
    "번역·통역": [
      "영한 번역",
      "한영 번역",
      "일한 번역",
      "중한 번역",
      "통역",
      "기타",
    ],
    "문서·글쓰기": [
      "기획서 작성",
      "보고서 작성",
      "이력서/자소서",
      "논문/학술",
      "카피라이팅",
      "기타",
    ],
    "IT·프로그래밍": [
      "웹 개발",
      "앱 개발",
      "AI/머신러닝",
      "데이터 분석",
      "서버/클라우드",
      "기타",
    ],
    "영상·사진·음향": ["영상 편집", "촬영", "음향/녹음", "사진 보정", "기타"],
    "세무·법무·노무": [
      "세무 상담",
      "법률 상담",
      "노무 상담",
      "계약서 작성",
      "기타",
    ],
    전자책: ["전자책 제작", "전자책 유통", "기타"],
  };

  const handleNext = (nextStep: number) => {
    const newHistory = [...stepHistory, nextStep];
    setStepHistory(newHistory);
    setCurrentStep(nextStep);
  };

  const handleBack = () => {
    if (stepHistory.length > 1) {
      const newHistory = [...stepHistory];
      newHistory.pop(); // 현재 스텝 제거
      const previousStep = newHistory[newHistory.length - 1];
      setStepHistory(newHistory);
      setCurrentStep(previousStep);
    }
  };

  const handleCategoryBack = () => {
    setSelectedCategory(null);
    setSelectedDetail(null);
  };

  const handleRecommendationComplete = () => {
    setShowDialog(false);
    router.push("/");
  };

  const renderStep1 = () => {
    const options = [
      "사업자",
      "직장인",
      "예비창업자",
      "대학(원)생",
      "프리랜서",
      "기타",
    ];

    return (
      <div className="text-center">
        <h1 className="text-[24px] font-semibold text-black leading-[1.3] mb-8">
          어떤 근무 형태로
          <br />
          일하고 있나요?
        </h1>
        <div className="space-y-4">
          {options.map((option, index) => (
            <SurveyCard
              key={index}
              onClick={() => {
                if (
                  option === "대학(원)생" ||
                  option === "프리랜서" ||
                  option === "기타"
                ) {
                  handleNext(4);
                } else {
                  handleNext(2);
                }
              }}
              className="h-[70px]"
            >
              <span className="text-[18px] font-bold">{option}</span>
            </SurveyCard>
          ))}
        </div>
      </div>
    );
  };

  const renderStep2 = () => {
    const items = [
      ["요식업", "🍽️"],
      ["도소매/제조업", "📦"],
      ["학원/교육", "📚"],
      ["세무/법무/변리", "⚖️"],
      ["병의원/제약", "🏥"],
      ["대행사/에이전시", "📢"],
      ["IT 솔루션", "💻"],
      ["헬스/스포츠", "💪"],
      ["뷰티/미용", "✂️"],
      ["기타", "📱"],
    ];

    return (
      <div>
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-[20px] font-black text-black font-semibold">
              현재 하고 있는 일이나
            </h1>
            <h1 className="text-[20px] font-black text-black font-semibold">
              예정인 분야를 알려주세요
            </h1>
          </div>
          <button
            onClick={handleBack}
            className="flex items-center gap-1 text-[#9CA3AF] hover:bg-[#F3F4F6] px-3 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            <span>이전으로</span>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item, index) => (
            <SurveyCard
              key={index}
              onClick={() => handleNext(3)}
              className="h-[100px] relative"
            >
              <div className="absolute top-5 left-5">
                <span className="text-[16px] font-semibold">{item[0]}</span>
              </div>
              <div className="absolute bottom-5 right-5">
                <span className="text-[32px]">{item[1]}</span>
              </div>
            </SurveyCard>
          ))}
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    const items = [
      ["온라인으로\n고객을 만나요", "💻"],
      ["대면으로\n직접 고객을 만나요", "🏢"],
      ["온라인과 대면으로\n모두 만나고 있어요", "📱"],
    ];

    return (
      <div>
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-[20px] font-semibold text-black">
              주로 어떻게 고객을 만나거나
            </h1>
            <h1 className="text-[20px] font-semibold text-black">
              만날 예정인가요?
            </h1>
          </div>
          <button
            onClick={handleBack}
            className="flex items-center gap-1 text-[#9CA3AF] hover:bg-[#F3F4F6] px-3 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            <span>이전으로</span>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item, index) => (
            <SurveyCard
              key={index}
              onClick={() => handleNext(4)}
              className="h-[120px] relative"
            >
              <div className="absolute top-5 left-5">
                <span className="text-[16px] font-semibold whitespace-pre-line">
                  {item[0]}
                </span>
              </div>
              <div className="absolute bottom-5 right-5">
                <span className="text-[32px]">{item[1]}</span>
              </div>
            </SurveyCard>
          ))}
        </div>
      </div>
    );
  };

  const renderStep4 = () => {
    if (!selectedCategory) {
      return (
        <div>
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-[20px] font-semibold text-black">
                오늘 핏클에는
              </h1>
              <h1 className="text-[20px] font-semibold text-black">
                어떤 서비스를 찾으러 오셨나요?
              </h1>
            </div>
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-[#9CA3AF] hover:bg-[#F3F4F6] px-3 py-2 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
              <span>이전으로</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {Object.keys(detailServices).map((category, index) => (
              <SurveyCard
                key={index}
                onClick={() => setSelectedCategory(category)}
                className="h-[80px]"
              >
                <span className="text-[16px] font-semibold">{category}</span>
              </SurveyCard>
            ))}
          </div>
          <div className="text-center mb-8">
            <p className="text-[#9CA3AF] text-[15px] font-semibold">
              찾는게 없다면?
            </p>
          </div>
          <SurveyCard onClick={() => {}} className="h-[70px]">
            <span className="text-[16px] font-semibold">
              내가 직접 찾을게요
            </span>
          </SurveyCard>
        </div>
      );
    }

    return (
      <div>
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-[20px] font-semibold text-black">
              <span className="text-limeOlive">{selectedCategory}</span>에서
            </h1>
            <h1 className="text-[20px] font-semibold text-black">
              필요한 서비스를 선택해주세요
            </h1>
          </div>
          <button
            onClick={handleCategoryBack}
            className="flex items-center gap-1 text-[#9CA3AF] hover:bg-[#F3F4F6] px-3 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            <span>이전으로</span>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {detailServices[selectedCategory]?.map((service, index) => (
            <SurveyCard
              key={index}
              onClick={() => setSelectedDetail(service)}
              selected={selectedDetail === service}
              className="h-[80px]"
            >
              <span className="text-[16px] font-semibold">{service}</span>
            </SurveyCard>
          ))}
        </div>
        <div className="text-center mb-8">
          <p className="text-[#9CA3AF] text-[15px] font-black">
            찾는게 없다면?
          </p>
        </div>
        <SurveyCard onClick={() => {}} className="h-[70px]">
          <span className="text-[16px] font-semibold">내가 직접 찾을게요</span>
        </SurveyCard>
      </div>
    );
  };

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <>
      <CenteredLayout showLogo={true} logoSize="big" maxWidth="lg">
        <div className="w-full max-w-[500px] mx-auto">
          {/* Progress Bar */}
          <div className="flex items-center mb-4">
            <div className="flex-1 flex gap-1">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-1 flex-1 ${
                    currentStep >= step ? "bg-black" : "bg-[#F3F4F6]"
                  }`}
                />
              ))}
            </div>
            <span className="ml-3 text-[18px] font-bold text-[#D1D5DB]">
              {currentStep}/4
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-center text-[16px] text-[#9CA3AF] font-medium mb-12">
            회원님께 딱 맞는 서비스를 추천해 드릴게요
          </p>

          {/* Content */}
          {renderContent()}
        </div>
      </CenteredLayout>

      {/* Bottom Button */}
      {selectedDetail && currentStep === 4 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#F3F4F6]">
          <div className="max-w-[500px] mx-auto p-4">
            <button
              onClick={() => setShowDialog(true)}
              className="w-full h-[60px] bg-limeOlive text-black font-bold text-[16px] rounded-lg hover:bg-limeOlive/80 transition-colors cursor-pointer"
            >
              서비스 추천 받기
            </button>
          </div>
        </div>
      )}

      {/* Recommendation Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-[340px]">
            <div className="text-center">
              {/* Icon */}
              <div className="relative mb-6">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                  <PartyPopper size={60} className="text-limeOlive" />
                </div>
                <div className="mt-6 w-[72px] h-[72px] bg-[#2563EB] rounded-full flex items-center justify-center mx-auto">
                  <Star size={40} className="text-white" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-[22px] font-bold text-black mb-3">
                관심정보가 저장됐어요!
              </h3>

              {/* Message */}
              <p className="text-[15px] text-black leading-[1.5] mb-8">
                알려주신 내용을 바탕으로
                <br />
                회원님께 딱 맞는 서비스를 추천해드릴게요!
              </p>

              {/* Button */}
              <button
                onClick={handleRecommendationComplete}
                className="w-full h-[48px] bg-limeOlive text-black font-bold text-[16px] rounded-lg hover:bg-limeOlive/80 transition-colors cursor-pointer"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Survey Card Component
interface SurveyCardProps {
  children: React.ReactNode;
  onClick: () => void;
  selected?: boolean;
  className?: string;
}

const SurveyCard: React.FC<SurveyCardProps> = ({
  children,
  onClick,
  selected = false,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        flex items-center justify-center
        border-2 rounded-2xl
        transition-all duration-200
        cursor-pointer
        ${isHovered ? "bg-[#F3F4F6]" : "bg-[#F9FAFB]"}
        ${
          selected
            ? "border-limeOlive border-[2.5px]"
            : isHovered
            ? "border-black"
            : "border-[#F3F4F6]"
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default ServiceRecommendationSurveyPage;
