"use client";

import React from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BuildIcon from '@mui/icons-material/Build';
import ChairIcon from '@mui/icons-material/Chair';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BookIcon from '@mui/icons-material/Book';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import SearchIcon from '@mui/icons-material/Search';

const categories = [
  { icon: <AppsIcon fontSize="large" color="success" />, label: '전체보기' },
  { icon: <LocalShippingIcon fontSize="large" color="success" />, label: '이사/청소' },
  { icon: <BuildIcon fontSize="large" color="success" />, label: '설치/수리' },
  { icon: <ChairIcon fontSize="large" color="success" />, label: '인테리어' },
  { icon: <WorkOutlineIcon fontSize="large" color="success" />, label: '외주' },
  { icon: <EventIcon fontSize="large" color="success" />, label: '이벤트/뷰티' },
  { icon: <SchoolIcon fontSize="large" color="success" />, label: '취업/직무' },
  { icon: <LightbulbIcon fontSize="large" color="success" />, label: '과외' },
  { icon: <SportsBasketballIcon fontSize="large" color="success" />, label: '취미/자기계발' },
  { icon: <DirectionsCarIcon fontSize="large" color="success" />, label: '자동차' },
  { icon: <BookIcon fontSize="large" color="success" />, label: '법률/금융' },
  { icon: <CheckroomIcon fontSize="large" color="success" />, label: '기타' },
];

export function HomeHeroSection() {
  return (
    <div className="py-12 flex flex-col items-center">
      <h2 className="text-[30px] font-bold text-center mb-8 mt-4">당신에게 핏한 맞춤형 레슨</h2>
      
      {/* 검색바 */}
      <div className="w-full max-w-xl mb-12">
        <div className="flex items-center bg-gray-100 border border-gray-200 rounded-lg px-4 h-12">
          <SearchIcon className="mr-2" sx={{ color: '#bdbdbd' }} />
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-base"
            placeholder="어떤 서비스가 필요하세요?"
          />
        </div>
      </div>
      
      {/* 카테고리 아이콘들 - 반응형 그리드 */}
      <div className="w-full">
        <div className="grid grid-cols-6 lg:grid-cols-12 gap-4 lg:gap-6">
          {categories.map((cat) => (
            <div key={cat.label} className="flex flex-col items-center text-xs text-gray-600 cursor-pointer hover:text-primary transition-colors">
              <div className="mb-2">
                {cat.icon}
              </div>
              <span className="text-center leading-tight whitespace-nowrap">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 