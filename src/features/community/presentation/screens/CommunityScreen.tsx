"use client";

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Section } from '@/components/layouts/Section';
import { CommunityHero } from '@/components/community/CommunityHero';
import { CommunityFilter } from '@/components/community/CommunityFilter';
import { PostList } from '@/components/community/PostList';
import { TrendingSection } from '@/components/community/TrendingSection';
import { useCommunityStore } from '@/store/communityStore';

export const CommunityScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSort, setSelectedSort] = useState('latest');
  
  const { posts, setCurrentUser, loadSampleData } = useCommunityStore();
  
  // 샘플 데이터 로드 (개발용)
  useEffect(() => {
    if (posts.length === 0) {
      loadSampleData();
      setCurrentUser('user_current');
    }
  }, [posts.length, loadSampleData, setCurrentUser]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleTypeChange = (typeId: string) => {
    setSelectedType(typeId);
  };

  const handleSortChange = (sortId: string) => {
    setSelectedSort(sortId);
  };

  return (
    <MainLayout disableContainer={false}>
      {/* 구분선 */}
      <div className="w-full h-px bg-gray-200 mb-6"></div>
      
      {/* 커뮤니티 히어로 섹션 */}
      <Section>
        <CommunityHero />
      </Section>
      
      {/* 필터 섹션 */}
      <Section>
        <CommunityFilter 
          onCategoryChange={handleCategoryChange}
          onTypeChange={handleTypeChange}
          onSortChange={handleSortChange}
        />
      </Section>
      
      {/* 메인 컨텐츠 */}
      <Section className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 포스트 리스트 (메인) */}
          <div className="lg:col-span-3">
            <PostList 
              category={selectedCategory}
              type={selectedType}
              sort={selectedSort}
            />
          </div>
          
          {/* 사이드바 (트렌딩) */}
          <div className="lg:col-span-1">
            <TrendingSection />
          </div>
        </div>
      </Section>
    </MainLayout>
  );
};