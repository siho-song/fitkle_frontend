"use client";

import React, { useState } from 'react';
import { Portfolio } from '@/types';
import WorkIcon from '@mui/icons-material/Work';
import LaunchIcon from '@mui/icons-material/Launch';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface PortfolioSliderProps {
  portfolio: Portfolio[];
  onPortfolioClick: (portfolio: Portfolio) => void;
}

export const PortfolioSlider: React.FC<PortfolioSliderProps> = ({ 
  portfolio, 
  onPortfolioClick 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(portfolio.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  const getCurrentSlideItems = () => {
    const startIndex = currentSlide * itemsPerSlide;
    const endIndex = startIndex + itemsPerSlide;
    return portfolio.slice(startIndex, endIndex);
  };

  if (portfolio.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <WorkIcon className="text-primary" sx={{ fontSize: 28 }} />
          <h2 className="text-2xl font-bold text-gray-900">포트폴리오</h2>
        </div>
        
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-lg font-semibold text-gray-500 mb-2">
            아직 등록된 포트폴리오가 없습니다
          </h3>
          <p className="text-gray-400">
            튜터가 포트폴리오를 업데이트하면 여기에 표시됩니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <WorkIcon className="text-primary" sx={{ fontSize: 28 }} />
          <h2 className="text-2xl font-bold text-gray-900">포트폴리오</h2>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {portfolio.length}개 프로젝트
          </span>
        </div>
        
        {/* Navigation Controls */}
        {totalSlides > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              disabled={currentSlide === 0}
            >
              <ArrowBackIosIcon sx={{ fontSize: 18 }} className={currentSlide === 0 ? 'text-gray-300' : 'text-gray-600'} />
            </button>
            <span className="text-sm text-gray-500 mx-2">
              {currentSlide + 1} / {totalSlides}
            </span>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              disabled={currentSlide === totalSlides - 1}
            >
              <ArrowForwardIosIcon sx={{ fontSize: 18 }} className={currentSlide === totalSlides - 1 ? 'text-gray-300' : 'text-gray-600'} />
            </button>
          </div>
        )}
      </div>

      {/* Portfolio Cards with Preview */}
      <div className="relative overflow-hidden mb-6">
        <div className="flex gap-3 transition-transform duration-300 ease-in-out" 
             style={{ transform: `translateX(-${currentSlide * 75}%)` }}>
          {portfolio.map((portfolioItem, index) => (
            <div
              key={portfolioItem.id}
              className={`flex-shrink-0 w-48 group cursor-pointer ${
                index < currentSlide * itemsPerSlide || index >= (currentSlide + 1) * itemsPerSlide 
                  ? 'opacity-25' 
                  : 'opacity-100'
              }`}
              onClick={() => onPortfolioClick(portfolioItem)}
            >
              <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                {/* Portfolio Media - Square */}
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  {portfolioItem.media.length > 0 ? (
                    <div className="relative w-full h-full">
                      <img
                        src={portfolioItem.media[0].type === 'video' ? (portfolioItem.media[0].thumbnail || portfolioItem.media[0].url) : portfolioItem.media[0].url}
                        alt={portfolioItem.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {portfolioItem.media[0].type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
                            <div className="w-0 h-0 border-l-[4px] border-l-white border-y-[3px] border-y-transparent ml-0.5"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-4xl text-gray-300">📁</div>
                    </div>
                  )}
                </div>

                {/* Portfolio Info */}
                <div className="p-3">
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1 mb-1">
                    {portfolioItem.title}
                  </h3>
                  <p className="text-gray-600 text-xs line-clamp-2 mb-2">
                    {portfolioItem.content}
                  </p>
                  <span className="text-xs text-gray-500">
                    {portfolioItem.period}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};