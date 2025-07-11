"use client";

import React from 'react';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { ROUTES } from '@/constants/routes';


export function CommunityHero() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🌟 함께 성장하는 <span className="text-primary">핏클 커뮤니티</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          질문하고, 공유하고, 함께 배워요
        </p>
      </div>

      {/* 검색바와 글쓰기 */}
      <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
        <div className="flex-1">
          <div className="flex items-center bg-white border-2 border-gray-200 rounded-2xl px-6 py-3 shadow-md hover:border-primary transition-colors focus-within:border-primary">
            <SearchIcon className="mr-3 text-gray-400" />
            <input
              type="text"
              className="flex-1 outline-none text-base placeholder-gray-400 text-black"
              placeholder="궁금한 것을 검색해보세요 ... (예: 파스타, 기타 코드, 운동 자세)"
            />
          </div>
        </div>
        <Link 
          href={ROUTES.WRITE_POST}
          className="w-35 px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-md text-base cursor-pointer"
        >
          <CreateIcon />
          글쓰기
        </Link>
      </div>
    </section>
  );
}