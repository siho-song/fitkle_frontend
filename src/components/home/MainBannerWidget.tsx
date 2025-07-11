"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const bannerImages = [
  'https://picsum.photos/seed/banner1/1200/300',
  'https://picsum.photos/seed/banner2/1200/300',
  'https://picsum.photos/seed/banner3/1200/300',
];

export function MainBannerWidget() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  return (
    <div className="relative w-full h-[200px] sm:h-[260px] md:h-[250px] rounded-lg overflow-hidden mb-12">
      {bannerImages.map((img, idx) => (
        <Image
          key={img}
          src={img}
          alt={`banner${idx}`}
          width={1200}
          height={300}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        />
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {bannerImages.map((_, idx) => (
          <span
            key={idx}
            className={`block w-2 h-2 rounded-full ${idx === current ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
} 