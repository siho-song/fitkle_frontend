"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/authStore";
import { MainLayout } from "@/components/layouts/MainLayout";
import Image from "next/image";

const ProfileEditScreen: React.FC = () => {
  const router = useRouter();
  const { userNickname } = useAuthStore();
  const [selectedTab, setSelectedTab] = useState(0);
  const [isTabClickScroll, setIsTabClickScroll] = useState(false);

  // 폼 상태
  const [nickname, setNickname] = useState(userNickname || "교양있는까치2475");
  const [intro, setIntro] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [profileImagePath, setProfileImagePath] = useState<string | null>(null);
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [nicknameChecked, setNicknameChecked] = useState(false);

  // 각 영역별 ref
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const tabs = [
    "전문가 소개",
    "경력사항",
    "학력 · 자격증",
    "희망 급여",
    "상담 가능 정보",
  ];

  const regions = [
    "서울특별시",
    "부산광역시",
    "대구광역시",
    "인천광역시",
    "광주광역시",
    "대전광역시",
    "울산광역시",
    "세종특별자치시",
    "경기도",
    "강원도",
    "충청북도",
    "충청남도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주특별자치도",
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (isTabClickScroll) return;

      const scrollTop = window.scrollY;

      for (let i = sectionRefs.current.length - 1; i >= 0; i--) {
        const section = sectionRefs.current[i];
        if (section) {
          const offsetTop = section.offsetTop;
          if (scrollTop >= offsetTop - 120) {
            if (selectedTab !== i) setSelectedTab(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedTab, isTabClickScroll]);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
    setIsTabClickScroll(true);

    const section = sectionRefs.current[index];
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: "smooth",
      });
    }

    setTimeout(() => setIsTabClickScroll(false), 500);
  };

  const handleProfileImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfileImagePath(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const validateNickname = (value: string): string | null => {
    if (!value.trim()) return "닉네임을 입력해 주세요.";
    if (value.length < 3 || value.length > 15)
      return "닉네임은 3~15자 이내여야 합니다.";
    const validPattern = /^[가-힣a-zA-Z0-9]+$/;
    if (!validPattern.test(value))
      return "한글, 영문, 숫자만 사용할 수 있습니다.";
    if (/(.)\1{1,}/.test(value))
      return "동일한 문자를 연속 2번 이상 사용할 수 없습니다.";
    if (value.includes(" ")) return "공백 없이 입력해 주세요.";
    return null;
  };

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    setNicknameError(validateNickname(value));
    setNicknameChecked(false);
  };

  const handleNicknameCheck = () => {
    const error = validateNickname(nickname);
    setNicknameError(error);
    setNicknameChecked(error === null);
  };

  const defaultProfileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${nickname}`;

  return (
    <MainLayout>
      <div className="w-full bg-white">
        <div className="border-t border-gray-200" />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* 왼쪽 탭 네비게이션 */}
            <div className="w-56 bg-white rounded border border-gray-200 h-fit">
              <div className="space-y-1">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => handleTabClick(index)}
                    className={`w-full text-left px-8 py-4 rounded transition-colors border-l-4 ${
                      selectedTab === index
                        ? "bg-gray-50 border-l-black text-black font-semibold"
                        : "border-l-transparent text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <div className="flex items-center">
                      <span
                        className={`text-base font-bold mr-4 ${
                          selectedTab === index ? "text-black" : "text-gray-300"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="text-base">{tab}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 오른쪽 콘텐츠 영역 */}
            <div className="flex-1">
              <div className="space-y-12">
                {/* 전문가 소개 */}
                <div
                  ref={(el) => {
                    if (el) sectionRefs.current[0] = el;
                  }}
                  className="bg-white rounded border border-gray-200 p-8"
                >
                  <h2 className="text-xl font-bold mb-4">전문가 소개</h2>
                  <div className="border-t border-gray-200 pt-8">
                    <div className="flex gap-6">
                      {/* 프로필 이미지 */}
                      <div className="flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full border-2 border-gray-200 overflow-hidden bg-gray-50">
                          <Image
                            src={profileImagePath || defaultProfileImage}
                            alt="프로필"
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          onClick={handleProfileImageUpload}
                          className="mt-3 px-4 py-2 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        >
                          프로필 변경
                        </button>
                      </div>

                      {/* 폼 영역 */}
                      <div className="flex-1">
                        {/* 닉네임 입력 */}
                        <div className="mb-6">
                          <div className="flex items-center gap-4 p-5 border border-gray-200 rounded">
                            <label className="w-32 text-sm font-bold text-black">
                              전문가 닉네임
                            </label>
                            <div className="flex-1 flex items-center gap-2">
                              <input
                                type="text"
                                value={nickname}
                                onChange={(e) =>
                                  handleNicknameChange(e.target.value)
                                }
                                placeholder="닉네임을 입력해 주세요."
                                maxLength={15}
                                className="flex-1 text-sm text-gray-600 placeholder-gray-400 outline-none"
                              />
                              <span className="text-xs text-gray-400">
                                {nickname.length}/15
                              </span>
                              <button
                                onClick={handleNicknameCheck}
                                className="px-3 py-1 text-xs font-bold text-black hover:underline"
                              >
                                중복확인
                              </button>
                            </div>
                          </div>
                          {nicknameError && (
                            <p className="text-xs text-red-500 mt-1 ml-5">
                              {nicknameError}
                            </p>
                          )}
                          {!nicknameError && (
                            <p className="text-xs text-gray-500 mt-1 ml-5">
                              {nicknameChecked
                                ? "사용 가능한 닉네임입니다."
                                : "닉네임 중복확인을 해주세요."}
                            </p>
                          )}
                        </div>

                        {/* TIP 박스 */}
                        <div className="mb-6 p-4 bg-primaryLight border border-primary rounded">
                          <div className="flex gap-2">
                            <span className="text-xs font-bold text-primaryDark">
                              TIP
                            </span>
                            <div className="flex-1 space-y-1">
                              <p className="text-xs text-primaryDark">
                                · 닉네임은 최초 한 번만 변경 후 30일이 지나야
                                재변경이 가능합니다.
                              </p>
                              <p className="text-xs text-primaryDark">
                                · 진행 중인 거래가 있으면 닉네임을 바꿀 수
                                없어요.
                              </p>
                              <p className="text-xs text-primaryDark">
                                · 한글/영문/숫자만 사용할 수 있으며, 이메일
                                아이디와 동일한 문자열은 사용이 불가해요.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* 자기소개 */}
                        <div className="mb-6">
                          <div className="border border-gray-200 rounded">
                            <div className="flex p-3">
                              <label className="w-20 text-sm font-bold text-black pt-1">
                                자기소개
                              </label>
                              <div className="flex-1">
                                <textarea
                                  value={intro}
                                  onChange={(e) => setIntro(e.target.value)}
                                  placeholder="자기소개를 입력해 주세요."
                                  maxLength={600}
                                  rows={10}
                                  className="w-full text-sm text-gray-600 placeholder-gray-400 outline-none resize-none"
                                />
                                <div className="text-xs text-gray-400 text-right">
                                  {intro.length}/600
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 지역 선택 */}
                        <div className="mb-6">
                          <div className="flex items-center p-5 border border-gray-200 rounded">
                            <label className="w-20 text-sm font-bold text-black">
                              지역
                            </label>
                            <div className="flex-1">
                              <select
                                value={selectedRegion || ""}
                                onChange={(e) =>
                                  setSelectedRegion(e.target.value || null)
                                }
                                className="w-full text-sm text-gray-600 outline-none bg-transparent"
                              >
                                <option value="">선택해 주세요.</option>
                                {regions.map((region) => (
                                  <option key={region} value={region}>
                                    {region}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 나머지 섹션들 */}
                {tabs.slice(1).map((tab, index) => (
                  <div
                    key={index + 1}
                    ref={(el) => {
                      if (el) sectionRefs.current[index + 1] = el;
                    }}
                    className="bg-white rounded border border-gray-200 p-8"
                  >
                    <h2 className="text-xl font-bold mb-4">{tab}</h2>
                    <div className="border-t border-gray-200 pt-8">
                      <p className="text-gray-400">
                        {tab} 영역 (폼 UI 구현 필요)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </MainLayout>
  );
};

export default ProfileEditScreen;
