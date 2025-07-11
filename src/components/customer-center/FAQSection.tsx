"use client";

import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  helpful: number;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    category: '회원가입/로그인',
    question: '회원가입은 어떻게 하나요?',
    answer: '홈페이지 우측 상단의 "회원가입" 버튼을 클릭하시거나, 로그인 페이지에서 "회원가입" 링크를 클릭하여 진행하실 수 있습니다. 이메일 또는 소셜 계정(구글, 네이버, 카카오)으로 간편하게 가입하실 수 있습니다.',
    helpful: 45
  },
  {
    id: '2',
    category: '결제/환불',
    question: '수업료 결제는 어떻게 하나요?',
    answer: '수업 예약 시 신용카드, 체크카드, 계좌이체, 카카오페이 등 다양한 결제 수단을 이용하실 수 있습니다. 결제는 SSL 보안 시스템으로 안전하게 처리됩니다.',
    helpful: 38
  },
  {
    id: '3',
    category: '결제/환불',
    question: '환불 정책이 어떻게 되나요?',
    answer: '수업 시작 24시간 전까지는 100% 환불 가능합니다. 수업 시작 후에는 튜터와 협의하여 부분 환불이 가능할 수 있습니다. 자세한 환불 정책은 이용약관을 참고해주세요.',
    helpful: 52
  },
  {
    id: '4',
    category: '수업/튜터',
    question: '튜터는 어떻게 선택하나요?',
    answer: '홈페이지의 "튜터 찾기"에서 카테고리, 가격, 평점, 경력 등 다양한 필터로 검색하실 수 있습니다. 각 튜터의 프로필, 리뷰, 수업 방식을 확인하고 가장 적합한 튜터를 선택하세요.',
    helpful: 41
  },
  {
    id: '5',
    category: '수업/튜터',
    question: '온라인 수업은 어떻게 진행되나요?',
    answer: 'Zoom, Google Meet, 또는 플랫폼 내 화상통화 시스템을 통해 진행됩니다. 수업 전에 튜터가 링크를 공유해드리며, 안정적인 인터넷 환경과 카메라/마이크가 필요합니다.',
    helpful: 36
  },
  {
    id: '6',
    category: '기술지원',
    question: '로그인이 안 될 때는 어떻게 하나요?',
    answer: '먼저 이메일 주소와 비밀번호를 다시 확인해주세요. 비밀번호를 잊으셨다면 "비밀번호 찾기"를 이용하시거나, 소셜 로그인을 시도해보세요. 계속 문제가 발생하면 고객센터로 연락주세요.',
    helpful: 29
  },
  {
    id: '7',
    category: '기술지원',
    question: '화상수업 중 음성/영상이 안 나올 때는?',
    answer: '브라우저의 마이크/카메라 권한을 확인하고, 다른 프로그램에서 카메라를 사용하고 있지 않은지 확인해주세요. Chrome 최신 버전 사용을 권장하며, 필요시 페이지를 새로고침해보세요.',
    helpful: 33
  },
  {
    id: '8',
    category: '일반',
    question: '수업 시간 변경은 가능한가요?',
    answer: '수업 시작 최소 2시간 전에 튜터와 협의하여 변경 가능합니다. 마이페이지에서 직접 변경하거나 튜터에게 메시지를 보내 조율하실 수 있습니다.',
    helpful: 44
  }
];

export function FAQSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const categories = Array.from(new Set(faqData.map(item => item.category)));

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleHelpful = (id: string) => {
    // 실제로는 API 호출
    alert('도움이 되었다는 피드백이 전송되었습니다! 감사합니다.');
  };

  return (
    <div className="space-y-6">
      {/* 검색 및 필터 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* 검색 */}
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="궁금한 내용을 검색해보세요..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          {/* 카테고리 필터 */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">전체 카테고리</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* FAQ 목록 */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
            <p className="text-gray-400 text-sm mt-2">다른 검색어를 시도해보거나 문의하기를 이용해주세요.</p>
          </div>
        ) : (
          filteredFAQs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleExpanded(faq.id)}
                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  </div>
                  {expandedItems.includes(faq.id) ? (
                    <ExpandLessIcon className="text-gray-400" />
                  ) : (
                    <ExpandMoreIcon className="text-gray-400" />
                  )}
                </div>
              </button>

              {expandedItems.includes(faq.id) && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-4">
                    <p className="text-gray-700 leading-relaxed mb-4">{faq.answer}</p>
                    
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleHelpful(faq.id)}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
                      >
                        <span>👍</span>
                        도움이 되었어요 ({faq.helpful})
                      </button>
                      
                      <div className="text-sm text-gray-500">
                        더 궁금한 점이 있다면 문의하기를 이용해주세요.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* 도움말 */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="font-bold text-blue-900 mb-3">💡 원하는 답변을 찾지 못하셨나요?</h3>
        <p className="text-blue-800 text-sm mb-4">
          FAQ에서 해결되지 않은 문제는 1:1 문의를 통해 빠르게 도움을 받으실 수 있습니다.
        </p>
        <button
          onClick={() => document.querySelector('[data-tab="contact"]')?.click()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          1:1 문의하기
        </button>
      </div>
    </div>
  );
}