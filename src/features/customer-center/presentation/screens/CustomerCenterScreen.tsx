"use client";

import React, { useState } from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { FAQSection } from '@/components/customer-center/FAQSection';
import { ContactForm } from '@/components/customer-center/ContactForm';
import { SupportOptions } from '@/components/customer-center/SupportOptions';
import { TicketHistory } from '@/components/customer-center/TicketHistory';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HelpIcon from '@mui/icons-material/Help';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import HistoryIcon from '@mui/icons-material/History';

export const CustomerCenterScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'tickets'>('faq');

  const tabs = [
    {
      id: 'faq' as const,
      name: '자주 묻는 질문',
      icon: <HelpIcon sx={{ fontSize: 20 }} />,
    },
    {
      id: 'contact' as const,
      name: '문의하기',
      icon: <ContactSupportIcon sx={{ fontSize: 20 }} />,
    },
    {
      id: 'tickets' as const,
      name: '문의 내역',
      icon: <HistoryIcon sx={{ fontSize: 20 }} />,
    }
  ];

  return (
    <MainLayout>
      <div className="py-8">
        <div className="max-w-6xl mx-auto">
          {/* 헤더 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <SupportAgentIcon className="text-primary" sx={{ fontSize: 32 }} />
              <h1 className="text-3xl font-bold text-gray-900">고객센터</h1>
            </div>
            <p className="text-gray-600">궁금한 점이나 문제가 있으시면 언제든지 도움을 요청하세요. 빠르고 정확한 답변을 드리겠습니다.</p>
          </div>

          {/* 빠른 지원 옵션 */}
          <SupportOptions />

          {/* 탭 네비게이션 */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.icon}
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* 탭 콘텐츠 */}
          <div className="min-h-[600px]">
            {activeTab === 'faq' && <FAQSection />}
            {activeTab === 'contact' && <ContactForm />}
            {activeTab === 'tickets' && <TicketHistory />}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};