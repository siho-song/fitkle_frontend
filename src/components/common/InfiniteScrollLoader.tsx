"use client";

import React, { useEffect, useRef } from 'react';

interface InfiniteScrollLoaderProps {
  onLoadMore: () => void;
  isLoading: boolean;
  threshold?: number;
}

export const InfiniteScrollLoader: React.FC<InfiniteScrollLoaderProps> = ({
  onLoadMore,
  isLoading,
  threshold = 100
}) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isLoading) {
          onLoadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: `${threshold}px`
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [onLoadMore, isLoading, threshold]);

  return (
    <div ref={loaderRef} className="w-full h-4">
      {/* 무한 스크롤 감지용 요소 */}
    </div>
  );
};