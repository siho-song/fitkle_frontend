"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/authStore";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProfileDropdownProps {
  className?: string;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const submenuRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { userNickname, logout } = useAuthStore();
  const router = useRouter();

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSubmenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current);
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
      setSubmenuOpen(false);
    }, 200);
  };

  const handleSubmenuMouseEnter = () => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
    }
    setSubmenuOpen(true);
  };

  const handleSubmenuMouseLeave = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setSubmenuOpen(false);
    }, 200);
  };

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    router.push(ROUTES.HOME);
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    setSubmenuOpen(false);
    router.push(ROUTES.PROFILE_EDIT);
  };

  const handleMenuClick = (action: string) => {
    setIsOpen(false);
    setSubmenuOpen(false);

    switch (action) {
      case "프로필 관리":
        handleProfileClick();
        break;
      case "친구 초대":
        // 추후 구현
        break;
      case "고객센터":
        // 추후 구현
        break;
      case "전문가 등록":
        // 추후 구현
        break;
      case "비즈계정 신청":
        // 추후 구현
        break;
      case "로그아웃":
        handleLogout();
        break;
    }
  };

  const handleSubmenuClick = (action: string) => {
    setIsOpen(false);
    setSubmenuOpen(false);

    switch (action) {
      case "내 정보":
        // 추후 구현
        break;
      case "전문가 정보":
        // 추후 구현
        break;
      case "알림 설정":
        // 추후 구현
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
          <MenuItem
            text="프로필 관리"
            onClick={() => handleMenuClick("프로필 관리")}
          />

          <MenuItemWithSubmenu
            text="내 정보 관리"
            isSubmenuOpen={submenuOpen}
            onMouseEnter={handleSubmenuMouseEnter}
            onMouseLeave={handleSubmenuMouseLeave}
            submenuItems={[
              { text: "내 정보", onClick: () => handleSubmenuClick("내 정보") },
              {
                text: "전문가 정보",
                onClick: () => handleSubmenuClick("전문가 정보"),
              },
              {
                text: "알림 설정",
                onClick: () => handleSubmenuClick("알림 설정"),
              },
            ]}
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
            text="전문가 등록"
            onClick={() => handleMenuClick("전문가 등록")}
          />

          <MenuItem
            text="비즈계정 신청"
            onClick={() => handleMenuClick("비즈계정 신청")}
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

// 서브메뉴가 있는 메뉴 아이템 컴포넌트
interface MenuItemWithSubmenuProps {
  text: string;
  isSubmenuOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  submenuItems: Array<{
    text: string;
    onClick: () => void;
  }>;
}

const MenuItemWithSubmenu: React.FC<MenuItemWithSubmenuProps> = ({
  text,
  isSubmenuOpen,
  onMouseEnter,
  onMouseLeave,
  submenuItems,
}) => {
  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer ${
          isSubmenuOpen ? "bg-gray-50" : ""
        }`}
      >
        {text}
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* 서브메뉴 */}
      {isSubmenuOpen && (
        <div
          className="absolute left-full top-0 ml-1 w-40 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-60"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {submenuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {item.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
