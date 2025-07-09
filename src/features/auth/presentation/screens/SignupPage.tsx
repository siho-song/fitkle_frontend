"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CenteredLayout } from "@/components/layouts/CenteredLayout";
import { LoginModal } from "@/components/login/LoginModal";

const SignupPage: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();

  const handleEmailSignup = () => {
    router.push("/signup/email");
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <CenteredLayout showLogo={true} logoSize="big" maxWidth="md">
        {/* 메인 타이틀 */}
        <h1 className="text-[28px] font-bold text-black text-center leading-[1.3] mb-12">
          핏클과 함께
          <br />
          맞춤형 피드백을 시작해 보세요!
        </h1>

        {/* 카카오 버튼 */}
        <button
          className="w-85 h-[52px] bg-[#FFE812] text-black font-bold text-base rounded-lg flex items-center justify-center gap-2 mb-4 hover:bg-[#ffe812] transition-colors cursor-pointer mx-auto"
          onClick={() => {
            /* 카카오 로그인 */
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3C7.03 3 3 6.24 3 10.2c0 2.52 1.65 4.74 4.1 6.09l-.55 2.73c-.05.24.18.43.4.32l3.16-1.53c.29.03.58.05.89.05 4.97 0 9-3.24 9-7.2S16.97 3 12 3z"
              fill="currentColor"
            />
          </svg>
          카카오로 시작하기
        </button>

        {/* 네이버 버튼 */}
        <button
          className="w-85 h-[52px] bg-[#03C75A] text-white font-bold text-base rounded-lg flex items-center justify-center gap-2 mb-4 hover:bg-[#02b350] transition-colors cursor-pointer mx-auto"
          onClick={() => {
            /* 네이버 로그인 */
          }}
        >
          <span className="font-bold text-white text-xl">N</span>
          네이버로 시작하기
        </button>

        {/* 이메일 버튼 */}
        <button
          className="w-85 h-[52px] bg-white text-black font-bold text-base rounded-lg border-2 border-[#D1D5DB] flex items-center justify-center mb-8 hover:bg-gray-50 transition-colors cursor-pointer mx-auto"
          onClick={handleEmailSignup}
        >
          이메일로 시작하기
        </button>

        {/* SNS 원형 버튼들 */}
        <div className="flex justify-center gap-6 mb-8">
          <button className="w-14 h-14 rounded-full bg-white border border-[#D1D5DB] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          </button>
          <button className="w-14 h-14 rounded-full bg-[#1877F3] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>
        </div>

        {/* 구분선 */}
        <div className="flex justify-center mb-6">
          <div className="w-80 h-px bg-[#D1D5DB]"></div>
        </div>

        {/* 로그인 안내 */}
        <div className="text-center">
          <span className="text-[#6B7280] text-[15px]">
            이미 핏클 회원이신가요?{" "}
          </span>
          <button
            className="text-black font-bold text-[15px] underline hover:no-underline transition-all cursor-pointer"
            onClick={handleLoginClick}
          >
            로그인
          </button>
        </div>
      </CenteredLayout>

      {/* 로그인 모달 */}
      {showLoginModal && <LoginModal onClose={handleCloseLoginModal} />}
    </>
  );
};

export default SignupPage;
