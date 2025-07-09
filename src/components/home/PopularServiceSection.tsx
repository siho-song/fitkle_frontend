"use client";

import React from 'react';
import Image from 'next/image';

const popularServices = Array.from({ length: 10 }).map((_, i) => ({
  title: `서비스 제목 ${i + 1}`,
  imageUrl: `https://picsum.photos/seed/service${i}/150/150`,
  category: `카테고리 ${i % 3}`,
}));

export function PopularServiceSection() {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">핏클 인기 서비스</h3>
        <button className="text-sm text-gray-400 hover:underline">전체보기 &gt;</button>
      </div>
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-4">
          {popularServices.map((service) => (
            <div key={service.title} className="w-36 flex-shrink-0">
              <div className="aspect-square rounded-lg overflow-hidden mb-2">
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-semibold text-sm truncate mb-1">{service.title}</div>
              <div className="text-xs text-gray-400">{service.category}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 