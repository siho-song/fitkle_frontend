"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CenteredLayout } from "@/components/layouts/CenteredLayout";
import { Shield, Info, ArrowRight } from "lucide-react";

const IdentityVerificationPage: React.FC = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [showSkipDialog, setShowSkipDialog] = useState(false);

  const handleVerifyIdentity = () => {
    // 본인인증 로직 (추후 구현)
    console.log("본인인증 진행");
  };

  const handleSkip = () => {
    setShowSkipDialog(true);
  };

  const handleConfirmSkip = () => {
    setShowSkipDialog(false);
    router.push("/recommendation-complete");
  };

  const handleCancelSkip = () => {
    setShowSkipDialog(false);
  };

  return (
    <>
      <CenteredLayout showLogo={true} logoSize="big" maxWidth="md">
        <div className="text-center">
          {/* Title */}
          <h1 className="text-[32px] font-bold text-black leading-[1.3] mb-5">
            안전한 거래를 위해
            <br />
            본인인증이 필요해요
          </h1>

          {/* Subtitle */}
          <p className="text-[17px] text-[#6B7280] leading-[1.5] mb-12">
            서비스를 판매 / 구매하는 과정에서의
            <br />
            서로의 신뢰를 위해 본인인증을 진행합니다
          </p>

          {/* Illustration */}
          <div className="mb-14">
            <Shield size={100} className="text-green-500 mx-auto" />
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerifyIdentity}
            className="w-full max-w-[400px] h-14 bg-grayLight text-black font-bold text-[18px] rounded-xl hover:bg-gray-300 transition-colors cursor-pointer mb-6"
          >
            본인인증 하기
          </button>

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`inline-flex items-center gap-1 px-7 py-3 rounded-lg transition-colors cursor-pointer ${
              isHovered ? "bg-[#F3F4F6]" : "bg-transparent"
            }`}
          >
            <span className="text-[#6B7280] text-[15px] font-bold">
              다음에 하기
            </span>
            <ArrowRight size={18} className="text-[#6B7280]" />
          </button>
        </div>
      </CenteredLayout>

      {/* Skip Confirmation Dialog */}
      {showSkipDialog && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-[300px] mx-4">
            <div className="text-center">
              {/* Icon */}
              <div className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-6">
                <Info size={28} className="text-[#9CA3AF]" />
              </div>

              {/* Title */}
              <h3 className="text-[17px] font-bold text-black mb-3">
                본인 인증을 건너뛸까요?
              </h3>

              {/* Message */}
              <p className="text-[15px] text-[#6B7280] leading-[1.5] mb-7">
                본인인증은 이후
                <br />
                마이핏클에서 하실 수 있어요
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleCancelSkip}
                  className="flex-1 h-[50px] bg-white border-2 border-[#D1D5DB] text-black font-semibold text-[15px] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  취소
                </button>
                <button
                  onClick={handleConfirmSkip}
                  className="flex-1 h-[50px] bg-grayLight text-black font-bold text-[15px] rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IdentityVerificationPage;
