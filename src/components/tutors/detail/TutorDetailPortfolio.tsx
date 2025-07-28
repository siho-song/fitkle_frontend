"use client";

import React, { useState } from 'react';
import { TutorItem, Portfolio, PortfolioMedia } from '@/types';
import WorkIcon from '@mui/icons-material/Work';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { PortfolioSlider } from './PortfolioSlider';

interface TutorDetailPortfolioProps {
  tutor: TutorItem;
}

interface PortfolioModalProps {
  portfolio: Portfolio;
  isOpen: boolean;
  onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ portfolio, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen) return null;

  // Helper function to get media URL
  const getMediaUrl = (media: PortfolioMedia) => {
    return media.type === 'video' ? (media.thumbnail || media.url) : media.url;
  };

  // Helper function to get media description
  const getMediaDescription = (media: PortfolioMedia) => {
    return media.description;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === portfolio.media.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? portfolio.media.length - 1 : prev - 1
    );
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full h-[95vh] overflow-hidden shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-blue-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
              <WorkIcon className="text-primary" sx={{ fontSize: 20 }} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{portfolio.title}</h2>
              <p className="text-gray-600 text-sm">{portfolio.period}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/80 rounded-full transition-all duration-200 hover:scale-105"
          >
            <CloseIcon className="text-gray-500" sx={{ fontSize: 20 }} />
          </button>
        </div>

        {/* Content - Left/Right Split Layout */}
        <div className="grid grid-cols-2 flex-1 overflow-hidden">
          {/* Left Side - Project Information */}
          <div className="overflow-y-auto p-6 border-r border-gray-100 h-full">
            <div className="space-y-6">
              {/* Project Content */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  프로젝트 소개
                </h3>
                <p className="text-gray-700 leading-relaxed">{portfolio.content}</p>
              </div>

              {/* Project Period */}
              <div>
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 text-xs">📅</span>
                  </div>
                  프로젝트 기간
                </h4>
                <p className="text-gray-700 font-medium">{portfolio.period}</p>
              </div>
            </div>
          </div>

          {/* Right Side - Media with descriptions */}
          <div className="overflow-y-auto p-6 h-full">
            {portfolio.media.length > 0 ? (
              <div className="space-y-4">
                {/* Current Media */}
                <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
                  {portfolio.media[currentImageIndex].type === 'video' ? (
                    <div className="relative w-full h-full">
                      <img
                        src={getMediaUrl(portfolio.media[currentImageIndex])}
                        alt={`${portfolio.title} ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={getMediaUrl(portfolio.media[currentImageIndex])}
                      alt={`${portfolio.title} ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                  
                  {portfolio.media.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                      >
                        <ArrowBackIosIcon sx={{ fontSize: 18 }} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                      >
                        <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
                      </button>
                      
                      {/* Media counter */}
                      <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {currentImageIndex + 1} / {portfolio.media.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Current Media Description */}
                {getMediaDescription(portfolio.media[currentImageIndex]) && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {getMediaDescription(portfolio.media[currentImageIndex])}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-sm">미디어가 없습니다</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TutorDetailPortfolio: React.FC<TutorDetailPortfolioProps> = ({ tutor }) => {
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);

  if (!tutor.portfolio || tutor.portfolio.length === 0) {
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
    <>
      <PortfolioSlider 
        portfolio={tutor.portfolio} 
        onPortfolioClick={setSelectedPortfolio}
      />

      {/* Portfolio Modal */}
      {selectedPortfolio && (
        <PortfolioModal
          portfolio={selectedPortfolio}
          isOpen={!!selectedPortfolio}
          onClose={() => setSelectedPortfolio(null)}
        />
      )}
    </>
  );
};