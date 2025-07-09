"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CenteredLayout } from "@/components/layouts/CenteredLayout";
import { Image as ImageIcon } from "lucide-react";

interface RecommendationCompletePageProps {
  nickname?: string;
}

const RecommendationCompletePage: React.FC<RecommendationCompletePageProps> = ({ 
  nickname = "" 
}) => {
  const router = useRouter();

  // 닉네임 생성 함수 (간단한 예시)
  const generateNickname = () => {
    const adjectives = ["활발한", "열정적인", "창의적인", "따뜻한", "밝은"];
    const nouns = ["사용자", "회원", "친구", "파트너", "동료"];
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdj} ${randomNoun}`;
  };

  const displayNickname = nickname || generateNickname();

  const handleRecommendationClick = () => {
    router.push("/service-recommendation-survey");
  };

  return (
    <CenteredLayout showLogo={true} logoSize="big" maxWidth="md">
      <div className="text-center">
        {/* Placeholder Image */}
        <div className="mb-12">
          <div className="w-[240px] h-[120px] bg-[#F3F4F6] rounded-lg flex items-center justify-center mx-auto">
            <ImageIcon size={60} className="text-[#9CA3AF]" />
          </div>
        </div>

        {/* Nickname Display */}
        <div className="mb-6">
          <h1 className="text-[24px] font-bold text-center">
            <span className="text-limeOlive">{displayNickname}</span>
            <span className="text-black">님</span>
          </h1>
        </div>

        {/* Main Message */}
        <div className="mb-12">
          <h2 className="text-[24px] font-bold text-black leading-[1.4]">
            이제, 회원님께 딱맞는
            <br />
            서비스들을 추천해 드릴게요.
          </h2>
        </div>

        {/* Recommendation Button */}
        <button
          onClick={handleRecommendationClick}
          className="w-full max-w-[400px] h-[56px] bg-grayLight text-black font-bold text-[18px] rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
        >
          나에게 딱맞는 서비스 추천받기
        </button>
      </div>
    </CenteredLayout>
  );
};

export default RecommendationCompletePage;