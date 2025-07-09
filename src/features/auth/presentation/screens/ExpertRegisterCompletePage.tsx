"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CenteredLayout } from "@/components/layouts/CenteredLayout";

const ExpertRegisterCompletePage: React.FC = () => {
  const router = useRouter();
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleComplete = () => {
    if (agreeTerms) {
      // 전문가 등록 완료 로직 (추후 구현)
      console.log("전문가 등록 완료");
      // 완료 후 홈으로 이동하거나 다른 페이지로 이동
      router.push("/");
    }
  };

  const handlePhoneVerification = () => {
    // 휴대폰 본인인증 로직 (추후 구현)
    console.log("휴대폰 본인인증 진행");
  };

  return (
    <CenteredLayout showLogo={true} logoSize="big" maxWidth="lg">
      <div className="w-full max-w-[520px] mx-auto">
        {/* Main Card */}
        <div className="bg-white border border-[#F3F4F6] rounded-xl p-12">
          {/* Title */}
          <h1 className="text-[28px] font-bold text-black text-center leading-[1.3] mb-10">
            본인인증하면
            <br />
            전문가 등록완료!
          </h1>

          {/* Phone Verification Section */}
          <div className="mb-9">
            <h3 className="text-[16px] font-bold text-black mb-3">본인인증</h3>
            <button
              onClick={handlePhoneVerification}
              className="w-full h-[50px] bg-white border border-[#E5E7EB] text-black font-semibold text-[15px] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              휴대폰 본인인증
            </button>
          </div>

          {/* Terms Agreement Section */}
          <div className="mb-8">
            <h3 className="text-[16px] font-bold text-black mb-2">
              전문가 약관동의
            </h3>
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-5">
              <div
                className="flex items-start gap-2 cursor-pointer"
                onClick={() => setAgreeTerms(!agreeTerms)}
              >
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-2 border-[#D1D5DB] accent-black cursor-pointer"
                />
                <div className="flex-1">
                  <span className="text-[15px] text-black">
                    핏클 판매 이용약관에 동의합니다.
                  </span>
                  <span className="text-[15px] text-red-500 ml-1">(필수)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Complete Button */}
          <button
            onClick={handleComplete}
            disabled={!agreeTerms}
            className={`w-full h-[54px] rounded-lg font-semibold text-[15px] transition-colors ${
              agreeTerms
                ? "bg-primary text-black hover:bg-primaryDark cursor-pointer"
                : "bg-[#F3F4F6] text-black opacity-50 cursor-not-allowed"
            }`}
          >
            전문가 등록 완료
          </button>
        </div>
      </div>
    </CenteredLayout>
  );
};

export default ExpertRegisterCompletePage;
