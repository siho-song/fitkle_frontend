"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/authStore";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Container } from "@/components/layouts/Container";
import Image from "next/image";

const ProfileManageScreen: React.FC = () => {
  const router = useRouter();
  const { userNickname } = useAuthStore();
  const [selectedTab, setSelectedTab] = useState(0);
  const [isTabClickScroll, setIsTabClickScroll] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const expertInfoRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const tabBarRef = useRef<HTMLDivElement>(null);
  const tabBarPlaceholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isTabClickScroll) return;

      const expertBox = expertInfoRef.current;
      const serviceBox = serviceRef.current;
      const tabBar = tabBarRef.current;
      const placeholder = tabBarPlaceholderRef.current;
      
      if (expertBox && serviceBox && tabBar && placeholder) {
        const serviceOffset = serviceBox.offsetTop;
        const scrollTop = window.scrollY;
        const placeholderTop = placeholder.offsetTop;

        // Sticky 상태 관리
        if (scrollTop >= placeholderTop) {
          if (!isSticky) {
            setIsSticky(true);
          }
        } else {
          if (isSticky) {
            setIsSticky(false);
          }
        }

        // 탭 선택 관리
        let newTab;
        if (scrollTop + 120 >= serviceOffset) {
          newTab = 1;
        } else {
          newTab = 0;
        }

        if (selectedTab !== newTab) {
          setSelectedTab(newTab);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedTab, isTabClickScroll, isSticky]);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
    setIsTabClickScroll(true);

    const targetRef = index === 0 ? expertInfoRef : serviceRef;
    if (targetRef.current) {
      const yOffset = -120; // 탭바 높이 + 여유 공간
      const y = targetRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }

    setTimeout(() => setIsTabClickScroll(false), 400);
  };

  const handleProfileEditClick = () => {
    router.push("/profile/edit");
  };

  const defaultProfileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${userNickname || "교양있는까치2475"}`;

  return (
    <MainLayout>
      {/* 헤더와 프로필 헤더 사이 여백 */}
      <div className="py-5"></div>
      
      {/* 프로필 헤더 */}
      <Container>
        <div className="bg-gray-50 rounded p-8">
          <div className="flex items-center gap-6">
            {/* 프로필 이미지 */}
            <div className="w-29 h-29 rounded-full border-2 border-gray-200 overflow-hidden bg-white">
              <Image
                src={defaultProfileImage}
                alt="프로필"
                width={116}
                height={116}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 닉네임, 평점 */}
            <div className="flex-1">
              <h1 className="text-2xl font-black text-black mb-2">
                {userNickname || "교양있는까치2475"}
              </h1>
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className="text-gray-300">★</span>
                ))}
                <span className="text-sm text-gray-400">0.0 (0)</span>
              </div>
            </div>

            {/* 프로필 등록/수정 버튼 */}
            <button
              onClick={handleProfileEditClick}
              className="w-68 h-13 bg-primary hover:bg-primary/90 text-black font-semibold py-6 px-8 rounded transition-colors cursor-pointer flex items-center justify-center"
            >
              프로필 등록/수정
            </button>
          </div>
        </div>
      </Container>

      {/* 프로필 헤더와 탭바 사이 마진 */}
      <div className="mt-6"></div>

      {/* 탭바 */}
      <div ref={tabBarPlaceholderRef}>
        <div 
          ref={tabBarRef}
          className={`${
            isSticky ? "fixed top-0 left-0 right-0 z-50" : "relative"
          } bg-white transition-all duration-200 ${
            isSticky ? "shadow-md" : ""
          }`}
        >
          <Container>
            <div className="flex border-b-2 border-gray-200">
              <button
                onClick={() => handleTabClick(0)}
                className={`px-4 py-4 font-bold text-base relative cursor-pointer hover:text-black transition-colors ${
                  selectedTab === 0 ? "text-black" : "text-gray-400"
                }`}
              >
                전문가 정보
                {selectedTab === 0 && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                )}
              </button>
              <button
                onClick={() => handleTabClick(1)}
                className={`px-4 py-4 font-bold text-base relative cursor-pointer hover:text-black transition-colors ${
                  selectedTab === 1 ? "text-black" : "text-gray-400"
                }`}
              >
                서비스
                {selectedTab === 1 && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                )}
              </button>
            </div>
          </Container>
        </div>
        {/* fixed 상태일 때 공간 유지를 위한 placeholder */}
        {isSticky && <div className="h-16" />}
      </div>

      {/* 메인 컨텐츠 */}
      <Container className="py-8">
        <div className="flex gap-10">
          {/* 왼쪽 전문가 정보 */}
          <div ref={expertInfoRef} className="flex-1">
            <div className="mb-8">
              <h2 className="text-lg font-bold text-black mb-12">전문가 정보</h2>
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                    <polyline points="14,2 14,8 20,8" />
                  </svg>
                </div>
                <p className="text-lg text-gray-400">자기소개를 준비중입니다.</p>
              </div>
              {/* 추가 컨텐츠로 스크롤 가능하게 */}
              <div className="space-y-8">
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">추가 컨텐츠 영역 1</p>
                </div>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">추가 컨텐츠 영역 2</p>
                </div>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">추가 컨텐츠 영역 3</p>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽 활동 정보 카드 */}
          <div className="w-100">
            <div className="bg-white border border-gray-200 rounded p-8">
              <div className="mb-8">
                <h3 className="text-base font-bold text-black mb-4">활동 정보</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">총 작업 수</span>
                    <span className="text-sm text-black">0개</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">만족도</span>
                    <span className="text-sm text-black">0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">평균 응답 시간</span>
                    <span className="text-sm text-black">아직 몰라요</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-black mb-4">전문가 정보</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">회원구분</span>
                    <span className="text-sm text-black">개인회원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">연락 가능 시간</span>
                    <span className="text-sm text-black">10시 ~ 18시</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">지역</span>
                    <span className="text-sm text-black">미입력</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 서비스 섹션 */}
        <div ref={serviceRef} className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-black">서비스</h2>
            <button className="text-blue-500 hover:text-blue-600 font-medium">
              광고 신청 &gt;
            </button>
          </div>
          <div className="w-full h-55 bg-white border border-gray-200 rounded flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 text-gray-300">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h10v2H7v-2zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />
                </svg>
              </div>
              <p className="text-base text-gray-400 mb-2">서비스를 등록하여 수익을 얻어보세요!</p>
              <button className="text-blue-500 hover:text-blue-600 font-bold">
                + 서비스 등록하기
              </button>
            </div>
          </div>
          {/* 추가 서비스 컨텐츠 */}
          <div className="space-y-6">
            <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">서비스 컨텐츠 영역 1</p>
            </div>
            <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">서비스 컨텐츠 영역 2</p>
            </div>
            <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">서비스 컨텐츠 영역 3</p>
            </div>
            <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">서비스 컨텐츠 영역 4</p>
            </div>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

export default ProfileManageScreen; 