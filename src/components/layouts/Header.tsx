"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LoginModal } from "../login/LoginModal";
import { useAuthStore } from '@/features/auth/store/authStore';
import { ProfileDropdown } from "../profile/ProfileDropdown";
import { Container } from "./Container";
import Image from "next/image";
import { Logo } from "../common/Logo";
import { NotificationDropdown } from "../notification/NotificationDropdown";

interface HeaderProps {
  className?: string;
  containerVariant?: 'default' | 'wide' | 'narrow' | 'full';
}

export const Header: React.FC<HeaderProps> = ({
  className = "",
  containerVariant = 'default',
}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn, hydrate } = useAuthStore();

  useEffect(() => {
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
      <header className={`w-full bg-white text-black py-6 ${className}`}>
        <Container variant={containerVariant} className="flex items-center">
        {/* 로고 */}
        <Link href="/" className="flex items-center cursor-pointer select-none">
          <Logo size="small"
          />
        </Link>
        <nav className="flex ml-8 gap-4 text-base font-semibold">
          <Link href="/tutors" className="hover:text-primary transition">
            튜터찾기
          </Link>
          <Link href="/community" className="hover:text-primary transition">
            커뮤니티
          </Link>
        </nav>
        <div className="flex-1" />
        {!isLoggedIn ? (
          <div className="flex gap-4">
            <button
              className="text-[15px] font-semibold hover:text-primary transition cursor-pointer"
              onClick={handleLoginClick}
            >
              로그인
            </button>
            <button
              className="text-[15px] hover:text-primary font-semibold transition cursor-pointer"
              style={{ textDecoration: "none" }}
            >
              튜터등록
            </button>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <Link
              href="/orders"
              className="text-[15px] font-semibold hover:text-primary transition text-base"
            >
              구매 관리
            </Link>
            <Link href="/chat" className="hover:bg-gray-100 rounded-full p-1 cursor-pointer transition-colors" title="채팅">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
            <NotificationDropdown />
            <Link
              href="/favorites"
              className="hover:bg-gray-100 rounded-full p-1 cursor-pointer transition-colors"
              title="찜한 항목"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>
            <ProfileDropdown className="ml-2" />
          </div>
        )}
        </Container>
      </header>
      {showLoginModal && <LoginModal onClose={handleCloseModal} />}
    </>
  );
};
