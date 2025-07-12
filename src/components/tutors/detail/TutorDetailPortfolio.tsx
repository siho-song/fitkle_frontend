"use client";

import React, { useState } from 'react';
import { TutorItem, PortfolioItem } from '@/types';
import WorkIcon from '@mui/icons-material/Work';
import LaunchIcon from '@mui/icons-material/Launch';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface TutorDetailPortfolioProps {
  tutor: TutorItem;
}

interface PortfolioModalProps {
  portfolio: PortfolioItem;
  isOpen: boolean;
  onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ portfolio, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === portfolio.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? portfolio.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{portfolio.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image Gallery */}
          {portfolio.images.length > 0 && (
            <div className="relative mb-6">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={portfolio.images[currentImageIndex]}
                  alt={`${portfolio.title} ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {portfolio.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                  >
                    <ArrowBackIosIcon />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                  >
                    <ArrowForwardIosIcon />
                  </button>
                  
                  {/* Image indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {portfolio.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Project Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">프로젝트 소개</h3>
              <p className="text-gray-700 leading-relaxed">{portfolio.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">카테고리</h4>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {portfolio.category}
                </span>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">프로젝트 기간</h4>
                <p className="text-gray-700">{portfolio.projectDate}</p>
              </div>

              {portfolio.client && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">클라이언트</h4>
                  <p className="text-gray-700">{portfolio.client}</p>
                </div>
              )}

              {portfolio.projectUrl && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">프로젝트 링크</h4>
                  <a
                    href={portfolio.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                  >
                    사이트 보기 <LaunchIcon sx={{ fontSize: 16 }} />
                  </a>
                </div>
              )}
            </div>

            {portfolio.technologies && portfolio.technologies.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">사용 기술</h4>
                <div className="flex flex-wrap gap-2">
                  {portfolio.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
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
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioItem | null>(null);

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
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <WorkIcon className="text-primary" sx={{ fontSize: 28 }} />
          <h2 className="text-2xl font-bold text-gray-900">포트폴리오</h2>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {tutor.portfolio.length}개 프로젝트
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tutor.portfolio.map((portfolio) => (
            <div
              key={portfolio.id}
              className="group cursor-pointer"
              onClick={() => setSelectedPortfolio(portfolio)}
            >
              <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                {/* Portfolio Image */}
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  {portfolio.images.length > 0 ? (
                    <img
                      src={portfolio.images[0]}
                      alt={portfolio.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-6xl text-gray-300">📁</div>
                    </div>
                  )}
                </div>

                {/* Portfolio Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {portfolio.title}
                    </h3>
                    {portfolio.projectUrl && (
                      <LaunchIcon className="text-gray-400 group-hover:text-primary transition-colors" sx={{ fontSize: 20 }} />
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {portfolio.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                      {portfolio.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {portfolio.projectDate}
                    </span>
                  </div>

                  {portfolio.technologies && portfolio.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {portfolio.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {portfolio.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                          +{portfolio.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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