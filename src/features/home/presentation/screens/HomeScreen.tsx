"use client";
import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { HomeHeroSection } from '@/components/home/HomeHeroSection';
import { MainBannerWidget } from '@/components/home/MainBannerWidget';
import { PopularServiceSection } from '@/components/home/PopularServiceSection';
import { CommunitySection } from '@/components/home/CommunitySection';
import { PortfolioSection } from '@/components/home/PortfolioSection';
import { DEFAULT_PAGE_PADDING } from '@/constants/layout';

export const HomeScreen: React.FC = () => {
  return (
    <MainLayout>
      <div className={DEFAULT_PAGE_PADDING}>
        <HomeHeroSection />
      </div>
      <MainBannerWidget />
      <div className={DEFAULT_PAGE_PADDING}>
        <PopularServiceSection />
        <hr className="my-8" />
        <CommunitySection />
        <hr className="my-8" />
        <PortfolioSection />
        {/* TODO: 여기에 다른 섹션들을 추가할 예정입니다. */}
      </div>
    </MainLayout>
  );
}; 