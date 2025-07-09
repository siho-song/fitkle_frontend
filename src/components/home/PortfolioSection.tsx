"use client";

import React from 'react';
import Image from 'next/image';

const portfolios = Array.from({ length: 10 }).map((_, i) => ({
  title: `포트폴리오 ${i + 1}`,
  imageUrl: `https://picsum.photos/seed/portfolio${i}/200/200`,
  expert: `고수 이름 ${i + 1}`,
}));

export function PortfolioSection() {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">숨은 고수 포트폴리오</h3>
        <button className="text-sm text-gray-400 hover:underline">전체보기 &gt;</button>
      </div>
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-4">
          {portfolios.map((portfolio) => (
            <div key={portfolio.title} className="w-48 flex-shrink-0">
              <div className="aspect-square rounded-lg overflow-hidden mb-2 relative">
                <Image
                  src={portfolio.imageUrl}
                  alt={portfolio.title}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <div className="text-white font-semibold text-sm truncate">{portfolio.title}</div>
                  <div className="text-white/80 text-xs">{portfolio.expert}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 