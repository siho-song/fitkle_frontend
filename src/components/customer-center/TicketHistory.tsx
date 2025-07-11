"use client";

import React, { useState, useEffect } from 'react';
import { useCustomerCenterStore, SupportTicket } from '@/store/customerCenterStore';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PendingIcon from '@mui/icons-material/Pending';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArchiveIcon from '@mui/icons-material/Archive';
import FilterListIcon from '@mui/icons-material/FilterList';
import MessageIcon from '@mui/icons-material/Message';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export function TicketHistory() {
  const { tickets, addResponse } = useCustomerCenterStore();
  const [statusFilter, setStatusFilter] = useState<'all' | SupportTicket['status']>('all');
  const [expandedTickets, setExpandedTickets] = useState<string[]>([]);
  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>({});

  // 개발용 샘플 데이터
  useEffect(() => {
    if (tickets.length === 0) {
      // 실제 앱에서는 API에서 기존 티켓들을 불러올 것입니다
      console.log('문의 내역이 없습니다. 새로운 문의를 등록해보세요.');
    }
  }, [tickets.length]);

  const filteredTickets = tickets.filter(ticket => {
    if (statusFilter === 'all') return true;
    return ticket.status === statusFilter;
  });

  const getStatusBadge = (status: SupportTicket['status']) => {
    const statusConfig = {
      pending: { 
        label: '대기 중', 
        color: 'bg-orange-100 text-orange-800',
        icon: <PendingIcon sx={{ fontSize: 16 }} />
      },
      in_progress: { 
        label: '처리 중', 
        color: 'bg-blue-100 text-blue-800',
        icon: <PlayArrowIcon sx={{ fontSize: 16 }} />
      },
      resolved: { 
        label: '해결됨', 
        color: 'bg-green-100 text-green-800',
        icon: <CheckCircleIcon sx={{ fontSize: 16 }} />
      },
      closed: { 
        label: '종료됨', 
        color: 'bg-gray-100 text-gray-800',
        icon: <ArchiveIcon sx={{ fontSize: 16 }} />
      }
    };

    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority: SupportTicket['priority']) => {
    const priorityConfig = {
      low: { label: '낮음', color: 'text-gray-500' },
      normal: { label: '보통', color: 'text-blue-500' },
      high: { label: '높음', color: 'text-red-500' }
    };

    const config = priorityConfig[priority];
    return (
      <span className={`text-sm font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getCategoryLabel = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      account: '계정/로그인',
      payment: '결제/환불',
      lesson: '수업 관련',
      tutor: '튜터 관련',
      technical: '기술적 문제',
      other: '기타'
    };
    return categoryMap[category] || category;
  };

  const toggleExpanded = (ticketId: string) => {
    setExpandedTickets(prev =>
      prev.includes(ticketId)
        ? prev.filter(id => id !== ticketId)
        : [...prev, ticketId]
    );
  };

  const handleReply = (ticketId: string) => {
    const content = replyContent[ticketId];
    if (!content?.trim()) return;

    addResponse(ticketId, content.trim());
    setReplyContent(prev => ({ ...prev, [ticketId]: '' }));
    alert('답변이 등록되었습니다.');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (tickets.length === 0) {
    return (
      <div className="text-center py-16">
        <SupportAgentIcon className="mx-auto text-gray-300 mb-4" sx={{ fontSize: 64 }} />
        <h3 className="text-xl font-semibold text-gray-500 mb-2">문의 내역이 없습니다</h3>
        <p className="text-gray-400 mb-6">궁금한 점이 있으시면 언제든지 문의해주세요.</p>
        <button
          onClick={() => {
            const contactTab = document.querySelector('[data-tab="contact"]') as HTMLButtonElement;
            contactTab?.click();
          }}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          문의하기
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 필터 */}
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <FilterListIcon className="text-gray-500" />
        <span className="text-sm font-medium text-gray-700">상태 필터:</span>
        <div className="flex gap-2">
          {[
            { value: 'all', label: '전체' },
            { value: 'pending', label: '대기 중' },
            { value: 'in_progress', label: '처리 중' },
            { value: 'resolved', label: '해결됨' },
            { value: 'closed', label: '종료됨' }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => setStatusFilter(option.value as any)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                statusFilter === option.value
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 티켓 목록 */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <div key={ticket.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {/* 티켓 헤더 */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {getCategoryLabel(ticket.category)}
                    </span>
                    {getStatusBadge(ticket.status)}
                    {getPriorityBadge(ticket.priority)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{ticket.subject}</h3>
                  <div className="text-sm text-gray-500">
                    문의일: {formatDate(ticket.createdAt)} | 
                    최종 업데이트: {formatDate(ticket.updatedAt)}
                  </div>
                </div>
                
                <button
                  onClick={() => toggleExpanded(ticket.id)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {expandedTickets.includes(ticket.id) ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </button>
              </div>

              {/* 티켓 내용 미리보기 */}
              <p className="text-gray-700 line-clamp-2">{ticket.description}</p>
            </div>

            {/* 확장된 티켓 상세 */}
            {expandedTickets.includes(ticket.id) && (
              <div className="border-t border-gray-200">
                {/* 원본 문의 내용 */}
                <div className="p-6 bg-gray-50">
                  <h4 className="font-semibold text-gray-900 mb-3">문의 내용</h4>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {ticket.description}
                    </p>
                    
                    {/* 첨부파일 */}
                    {ticket.attachments.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <AttachFileIcon sx={{ fontSize: 16 }} />
                          첨부파일 ({ticket.attachments.length}개)
                        </div>
                        <div className="space-y-1">
                          {ticket.attachments.map((file, index) => (
                            <div key={index} className="text-sm text-blue-600 hover:underline cursor-pointer">
                              {file.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 응답 내역 */}
                {ticket.responses.length > 0 && (
                  <div className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <MessageIcon sx={{ fontSize: 20 }} />
                      응답 내역 ({ticket.responses.length})
                    </h4>
                    <div className="space-y-4">
                      {ticket.responses.map((response) => (
                        <div
                          key={response.id}
                          className={`p-4 rounded-lg ${
                            response.isStaff
                              ? 'bg-blue-50 border-l-4 border-blue-400'
                              : 'bg-gray-50 border-l-4 border-gray-400'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`font-semibold ${
                              response.isStaff ? 'text-blue-700' : 'text-gray-700'
                            }`}>
                              {response.isStaff ? '🏢 고객지원팀' : '👤 ' + response.authorName}
                            </span>
                            <span className="text-sm text-gray-500">
                              {formatDate(response.createdAt)}
                            </span>
                          </div>
                          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {response.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 답변 작성 (티켓이 종료되지 않은 경우) */}
                {ticket.status !== 'closed' && (
                  <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <h4 className="font-semibold text-gray-900 mb-3">추가 답변</h4>
                    <div className="space-y-3">
                      <textarea
                        value={replyContent[ticket.id] || ''}
                        onChange={(e) => setReplyContent(prev => ({ 
                          ...prev, 
                          [ticket.id]: e.target.value 
                        }))}
                        placeholder="추가로 문의할 내용이 있으시면 작성해주세요..."
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      />
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleReply(ticket.id)}
                          disabled={!replyContent[ticket.id]?.trim()}
                          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          답변 등록
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}