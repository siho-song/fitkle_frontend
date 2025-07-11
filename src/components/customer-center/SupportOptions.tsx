"use client";

import React from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export function SupportOptions() {
  const supportOptions = [
    {
      title: '실시간 채팅',
      description: '즉시 도움이 필요하세요?',
      detail: '평일 09:00-18:00',
      icon: <ChatIcon sx={{ fontSize: 24 }} />,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      action: () => {
        // 실제로는 채팅 위젯 열기
        alert('실시간 채팅을 시작합니다. (개발 중)');
      }
    },
    {
      title: '전화 상담',
      description: '직접 통화로 상담받기',
      detail: '1588-1234',
      icon: <PhoneIcon sx={{ fontSize: 24 }} />,
      color: 'bg-green-50 text-green-600 border-green-200',
      action: () => {
        window.open('tel:1588-1234');
      }
    },
    {
      title: '이메일 문의',
      description: '자세한 설명이 필요하세요?',
      detail: 'support@fitkle.com',
      icon: <EmailIcon sx={{ fontSize: 24 }} />,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      action: () => {
        window.open('mailto:support@fitkle.com?subject=Fitkle 문의사항');
      }
    },
    {
      title: 'WhatsApp',
      description: '메신저로 편리하게',
      detail: '+82 10-1234-5678',
      icon: <WhatsAppIcon sx={{ fontSize: 24 }} />,
      color: 'bg-green-50 text-green-600 border-green-200',
      action: () => {
        window.open('https://wa.me/821012345678');
      }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {supportOptions.map((option, index) => (
        <button
          key={index}
          onClick={option.action}
          className={`p-6 rounded-2xl border-2 transition-all hover:shadow-lg hover:scale-105 text-left ${option.color}`}
        >
          <div className="mb-4">
            {option.icon}
          </div>
          <h3 className="font-bold text-lg mb-2">{option.title}</h3>
          <p className="text-sm opacity-80 mb-2">{option.description}</p>
          <p className="text-sm font-semibold">{option.detail}</p>
        </button>
      ))}
    </div>
  );
}