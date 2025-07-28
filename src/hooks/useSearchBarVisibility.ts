"use client";

import { useEffect, useRef, useState } from 'react';

interface UseSearchBarVisibilityReturn {
  searchBarRef: React.RefObject<HTMLDivElement>;
  isSearchBarVisible: boolean;
}

export const useSearchBarVisibility = (): UseSearchBarVisibilityReturn => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 검색창이 화면에 보이면 Header 검색창 숨김, 안 보이면 표시
        setIsSearchBarVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // 검색창의 10%가 보일 때 트리거
        rootMargin: '-80px 0px 0px 0px' // Header 높이만큼 마진
      }
    );

    if (searchBarRef.current) {
      observer.observe(searchBarRef.current);
    }

    return () => {
      if (searchBarRef.current) {
        observer.unobserve(searchBarRef.current);
      }
    };
  }, []);

  return {
    searchBarRef,
    isSearchBarVisible
  };
};