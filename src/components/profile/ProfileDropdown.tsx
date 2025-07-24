"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/authStore";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { ProfileDropdownProps } from '@/types';

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { userNickname, userType, logout } = useAuthStore();
  const router = useRouter();

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };


  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    router.push(ROUTES.HOME);
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    router.push(ROUTES.PROFILE_MANAGE);
  };

  const handleMenuClick = (action: string) => {
    setIsOpen(false);

    switch (action) {
      case "프로필 관리":
        handleProfileClick();
        break;
      case "튜터 프로필 관리":
        router.push(ROUTES.TUTOR_PROFILE);
        break;
      case "내 정보 관리":
        router.push(ROUTES.PROFILE_MANAGE);
        break;
      case "친구 초대":
        router.push(ROUTES.FRIEND_INVITE);
        break;
      case "고객센터":
        router.push(ROUTES.CUSTOMER_CENTER);
        break;
      case "튜터 등록":
        //추후 구현
        break;
      case "로그아웃":
        handleLogout();
        break;
    }
  };



  // 기본 프로필 이미지 URL (랜덤 아바타 생성 서비스 사용)
  const defaultProfileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${
    userNickname || "default"
  }`;

  return (
    <div
      className={`relative ${className}`}
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 프로필 버튼 */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 rounded-full overflow-hidden hover:ring-2 hover:ring-primary transition-all">
          <Image
            src={defaultProfileImage}
            alt="프로필"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
        <svg
          className="w-4 h-4 ml-1 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 "
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* 메뉴 항목들 */}
          {userType === 'tutor' && (
            <>
              <MenuItem
                text="프로필 관리"
                onClick={() => handleMenuClick("프로필 관리")}
              />
              <MenuItem
                text="튜터 프로필 관리"
                onClick={() => handleMenuClick("튜터 프로필 관리")}
              />
            </>
          )}

          <MenuItem
            text="내 정보 관리"
            onClick={() => handleMenuClick("내 정보 관리")}
          />

          <MenuItem
            text="친구 초대"
            onClick={() => handleMenuClick("친구 초대")}
          />

          <MenuItem
            text="고객센터"
            onClick={() => handleMenuClick("고객센터")}
          />

          <MenuItem
            text="튜터 등록"
            onClick={() => handleMenuClick("튜터 등록")}
          />

          <div className="border-t border-gray-100 my-1"></div>

          <MenuItem
            text="로그아웃"
            onClick={() => handleMenuClick("로그아웃")}
            className="text-red-600 hover:bg-red-50"
          />
        </div>
      )}
    </div>
  );
};

// 일반 메뉴 아이템 컴포넌트
interface MenuItemProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  text,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer ${className}`}
    >
      {text}
    </button>
  );
};

