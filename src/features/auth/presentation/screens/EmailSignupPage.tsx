"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CenteredLayout } from "@/components/layouts/CenteredLayout";
import { Search, Laptop } from "lucide-react";

const EmailSignupPage: React.FC = () => {
  const router = useRouter();

  const handleClientTypeSelect = (type: "tutee" | "tutor") => {
    router.push(`/signup/email/register?type=${type}`);
  };

  return (
    <CenteredLayout showLogo={true} logoSize="big" maxWidth="xl">
      {/* 메인 타이틀 */}
      <div className="mb-12">
        <h1 className="text-[28px] font-bold text-black text-center leading-[1.3]">
          핏클에서 서비스를
          <br />
          어떻게 이용하고 싶으세요?
        </h1>
      </div>

      {/* 선택 카드들 */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 mb-10">
        {/* 의뢰인 카드 */}
        <div
          className="w-[280px] h-[220px] bg-white rounded-[18px] border-2 border-[#F3F4F6] cursor-pointer hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-center p-6"
          onClick={() => handleClientTypeSelect("tutee")}
          style={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div className="w-14 h-14 bg-[#FFF7D6] rounded-2xl flex items-center justify-center mb-5">
            <Search size={32} className="text-black" />
          </div>
          <h3 className="text-[20px] font-bold text-black mb-2">
            튜티로 이용
          </h3>
          <p className="text-[15px] text-[#6B7280] text-center leading-[1.5]">
            내가 원하는 서비스의 튜터를
            <br />
            찾아서 도움을 받고 싶어요
          </p>
        </div>

        {/* 전문가 카드 */}
        <div
          className="w-[280px] h-[220px] bg-white rounded-[18px] border-2 border-[#F3F4F6] cursor-pointer hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-center p-6"
          onClick={() => handleClientTypeSelect("tutor")}
          style={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div className="w-14 h-14 bg-[#E6F4FF] rounded-2xl flex items-center justify-center mb-5">
            <Laptop size={32} className="text-black" />
          </div>
          <h3 className="text-[20px] font-bold text-black mb-2">
            튜터로 활동
          </h3>
          <p className="text-[15px] text-[#6B7280] text-center leading-[1.5]">
            내가 잘하는 분야의 튜터로
            <br />
            활동하고 수익을 창출하고 싶어요
          </p>
        </div>
      </div>

      {/* 하단 안내 메시지 */}
      <div className="text-center">
        <p className="text-[15px] text-[#6B7280] leading-[1.5]">
          가입 이후에도 언제든 원하는 상태로 전환할 수 있어요!
        </p>
      </div>
    </CenteredLayout>
  );
};

export default EmailSignupPage;
