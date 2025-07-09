import React from 'react';
import { Tutor, PortfolioItem } from '../../../domain/entities/tutor';
import Image from 'next/image';

interface TutorPortfolioSectionProps {
  tutor: Tutor;
}

export const TutorPortfolioSection: React.FC<TutorPortfolioSectionProps> = ({ tutor }) => {
  if (!tutor.portfolio || tutor.portfolio.length === 0) return null;
  return (
    <section className="px-5 py-6 md:px-10 md:py-8">
      <h2 className="text-lg md:text-xl font-bold mb-6">포트폴리오</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
        {tutor.portfolio.map((item, i) => (
          <PortfolioCard key={i} item={item} />
        ))}
      </div>
    </section>
  );
};

const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => (
  <div className="relative rounded-lg overflow-hidden cursor-pointer group">
    {item.imageUrls && item.imageUrls.length > 0 ? (
      <Image
        src={item.imageUrls[0]}
        alt={item.title}
        width={200}
        height={200}
        className="object-cover w-full aspect-square group-hover:opacity-80 transition"
      />
    ) : (
      <div className="bg-gray-200 w-full aspect-square flex items-center justify-center text-gray-400">No Image</div>
    )}
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
      <div className="text-white font-bold text-sm truncate">{item.title}</div>
    </div>
    {/* 상세 모달 등은 추후 구현 */}
  </div>
); 