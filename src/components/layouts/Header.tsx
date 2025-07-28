"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LoginModal } from "../login/LoginModal";
import { useAuthStore } from '@/features/auth/store/authStore';
import { ProfileDropdown } from "../profile/ProfileDropdown";
import { Container } from "./Container";
import Image from "next/image";
import { Logo } from "../common/Logo";
import { NotificationDropdown } from "../notification/NotificationDropdown";
import SearchIcon from '@mui/icons-material/Search';
import { useSearchBarContext } from '@/contexts/SearchBarContext';

import { HeaderProps } from '@/types';

export const Header: React.FC<HeaderProps> = ({
  className = "",
  containerVariant = 'default',
}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn, hydrate } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  
  // Hero 검색창 가시성 상태 (홈페이지에서만 사용)
  const getHeroSearchVisibility = () => {
    if (pathname !== '/') return true; // 홈페이지가 아니면 항상 true
    
    try {
      const context = useSearchBarContext();
      return context.isHeroSearchVisible;
    } catch {
      return true; // Context가 없으면 기본값
    }
  };
  
  const isHeroSearchVisible = getHeroSearchVisibility();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    const handleScroll = () => {
      // 메인 페이지에서만 스크롤 효과 적용
      if (pathname === '/') {
        const scrolled = window.scrollY > 50;
        setIsScrolled(scrolled);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tutors?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className={`w-full bg-white text-black transition-all duration-300 ${
        isScrolled ? 'fixed top-0 z-50 shadow-md py-3' : 'py-6'
      } ${className}`}>
        <Container variant={containerVariant} className="flex items-center">
          {/* 로고 */}
          <Link href="/" className="flex items-center cursor-pointer select-none">
            <Logo size="small" />
          </Link>
          
          {/* 네비게이션 */}
          <nav className="flex ml-8 gap-4 text-base font-semibold">
            <Link href="/tutors" className="hover:text-primary transition">
              튜터찾기
            </Link>
            <Link href="/community" className="hover:text-primary transition">
              커뮤니티
            </Link>
          </nav>
          
          {/* Hero 검색창이 안 보일 때만 표시 - 메인 페이지에서만 */}
          {pathname === '/' && !isHeroSearchVisible && (
            <div className="flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative group">
                <input
                  type="text"
                  placeholder="어떤 분야를 배우고 싶으신가요?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-12 bg-white border-2 border-gray-200 rounded-2xl 
                           shadow-sm focus:shadow-sm transition-all duration-300
                           placeholder-gray-400
                           focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none"
                />
                                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 
                             bg-primary text-white w-8 h-8 rounded-lg hover:bg-primary/90 
                             transition-all duration-300 flex items-center justify-center
                             hover:scale-105 active:scale-95"
                  >
                    <SearchIcon sx={{ fontSize: 18 }} />
                </button>
              </form>
            </div>
          )}
          
          <div className="flex-1" />
          
          {/* 사용자 메뉴 */}
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
      
      {/* 스크롤 시 헤더가 fixed되면서 생기는 공간 확보 */}
      {isScrolled && <div className="h-20"></div>}
      
      {showLoginModal && <LoginModal onClose={handleCloseModal} />}
    </>
  );
};
