"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LoginModal } from "../login/LoginModal";
import { useAuthStore } from '@/features/auth/store/authStore';
import { ProfileDropdown } from "../profile/ProfileDropdown";
import Image from "next/image";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  className = "",
}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { isLoggedIn, hydrate } = useAuthStore();

  useEffect(() => {
    setIsClient(true);
    hydrate();
  }, [hydrate]);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <header
        className={`w-full flex items-center py-6 px-4 md:px-8 bg-white text-black ${className}`}
      >
        {/* 로고 */}
        <Link href="/" className="flex items-center cursor-pointer select-none">
          <Image
            src="/assets/logo/FITKLE.svg"
            alt="Fitkle Logo"
            width={82}
            height={82}
          />
        </Link>
        <nav className="flex ml-8 gap-4 text-base font-medium">
          <Link href="#" className="hover:text-primary transition">
            견적요청
          </Link>
          <Link href="#" className="hover:text-primary transition">
            고수찾기
          </Link>
          <Link href="#" className="hover:text-primary transition">
            마켓
          </Link>
          <Link href="#" className="hover:text-primary transition">
            커뮤니티
          </Link>
        </nav>
        <div className="flex-1" />
        {!isClient ? (
          <div className="flex gap-4">
            <button className="font-semibold hover:text-primary transition cursor-pointer">
              로그인
            </button>
            <button className="text-primary font-semibold transition cursor-pointer">
              튜터등록
            </button>
          </div>
        ) : !isLoggedIn ? (
          <div className="flex gap-4">
            <button
              className="font-semibold hover:text-primary transition cursor-pointer"
              onClick={handleLoginClick}
            >
              로그인
            </button>
            <button
              className="text-primary font-semibold transition cursor-pointer"
              style={{ textDecoration: "none" }}
            >
              튜터등록
            </button>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <Link
              href="#"
              className="font-semibold hover:text-primary transition"
            >
              구매 관리
            </Link>
            <button className="hover:bg-gray-100 rounded-full p-2 cursor-pointer" title="채팅">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            <button className="hover:bg-gray-100 rounded-full p-2 cursor-pointer" title="알림">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button
              className="hover:bg-gray-100 rounded-full p-2 cursor-pointer"
              title="좋아요"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <ProfileDropdown className="ml-2" />
          </div>
        )}
      </header>
      {showLoginModal && <LoginModal onClose={handleCloseModal} />}
    </>
  );
};
