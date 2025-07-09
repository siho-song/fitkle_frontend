"use client";
import React, { useState } from 'react';
import { AppButton } from '@/components/common/AppButton';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: 로그인 처리
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-2xl font-bold mb-6">로그인</h1>
        <form
          className="space-y-4"
          onSubmit={e => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="email"
            className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-base"
            placeholder="이메일"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-base"
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <AppButton
            variant="primary"
            type="submit"
            className="w-full cursor-pointer hover:bg-primary/80"
          >
            로그인
          </AppButton>
        </form>
        <div className="my-8 border-t" />
        <div className="text-lg font-medium mb-4">소셜 계정으로 로그인</div>
        <div className="flex flex-col gap-3">
          <AppButton
            variant="secondary"
            className="w-full bg-[#FEE500] text-black hover:bg-[#ffe812] border-none"
          >
            <Image src="/assets/icons/kakao.png" alt="kakao" width={24} height={24} className="h-6 w-6 inline-block mr-2" />카카오 로그인
          </AppButton>
          <AppButton
            variant="secondary"
            className="w-full bg-[#03C75A] text-white hover:bg-[#05e06c] border-none"
          >
            <Image src="/assets/icons/naver.png" alt="naver" width={24} height={24} className="h-6 w-6 inline-block mr-2" />네이버 로그인
          </AppButton>
        </div>
      </div>
    </div>
  );
} 