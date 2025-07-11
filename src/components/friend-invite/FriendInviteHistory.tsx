"use client";

import React, { useState, useEffect } from 'react';
import { useFriendInviteStore, InviteRecord } from '@/store/friendInviteStore';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import EmailIcon from '@mui/icons-material/Email';
import GiftIcon from '@mui/icons-material/CardGiftcard';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export function FriendInviteHistory() {
  const { 
    inviteRecords, 
    claimReward, 
    updateInviteStatus 
  } = useFriendInviteStore();
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted'>('all');

  // 개발용 샘플 데이터 추가
  useEffect(() => {
    if (inviteRecords.length === 0) {
      // 샘플 데이터 시뮬레이션
      const sampleInvites: InviteRecord[] = [
        {
          id: 'sample_1',
          email: 'john@example.com',
          invitedAt: '2024-01-15T10:30:00.000Z',
          status: 'accepted',
          rewardClaimed: true,
          friendName: '김철수',
          joinedAt: '2024-01-16T09:15:00.000Z'
        },
        {
          id: 'sample_2', 
          email: 'sarah@example.com',
          invitedAt: '2024-01-20T14:20:00.000Z',
          status: 'pending',
          rewardClaimed: false
        },
        {
          id: 'sample_3',
          email: 'mike@example.com',
          invitedAt: '2024-01-10T16:45:00.000Z',
          status: 'accepted',
          rewardClaimed: false,
          friendName: '이영희',
          joinedAt: '2024-01-11T11:30:00.000Z'
        }
      ];

      // 실제 앱에서는 이 부분이 API 호출이나 초기 데이터 로드가 될 것입니다
      console.log('샘플 초대 데이터:', sampleInvites);
    }
  }, [inviteRecords.length]);

  const filteredRecords = inviteRecords.filter(record => {
    if (filter === 'all') return true;
    return record.status === filter;
  });

  const getStatusBadge = (status: InviteRecord['status']) => {
    const statusConfig = {
      pending: { 
        label: '대기 중', 
        color: 'bg-orange-100 text-orange-800',
        icon: <PendingIcon sx={{ fontSize: 16 }} />
      },
      accepted: { 
        label: '가입 완료', 
        color: 'bg-green-100 text-green-800',
        icon: <CheckCircleIcon sx={{ fontSize: 16 }} />
      },
      expired: { 
        label: '만료됨', 
        color: 'bg-gray-100 text-gray-800',
        icon: <AccessTimeIcon sx={{ fontSize: 16 }} />
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleClaimReward = (recordId: string) => {
    claimReward(recordId);
    alert('5,000원 크레딧이 적립되었습니다! 🎉');
  };

  // 개발용 데모 함수
  const simulateAcceptance = (recordId: string) => {
    updateInviteStatus(recordId, 'accepted', '데모 친구');
    alert('친구가 가입했다고 가정합니다! (개발용 시뮬레이션)');
  };

  if (inviteRecords.length === 0) {
    return (
      <div className="text-center py-16">
        <PersonAddIcon className="mx-auto text-gray-300 mb-4" sx={{ fontSize: 64 }} />
        <h3 className="text-xl font-semibold text-gray-500 mb-2">아직 초대 내역이 없습니다</h3>
        <p className="text-gray-400 mb-6">친구를 초대하여 함께 배움의 여정을 시작해보세요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 필터 */}
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <span className="text-sm font-medium text-gray-700">필터:</span>
        <div className="flex gap-2">
          {[
            { value: 'all', label: '전체' },
            { value: 'pending', label: '대기 중' },
            { value: 'accepted', label: '가입 완료' }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value as any)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === option.value
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 초대 목록 */}
      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <div key={record.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <EmailIcon className="text-gray-500" sx={{ fontSize: 20 }} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {record.friendName || record.email}
                  </div>
                  {record.friendName && (
                    <div className="text-sm text-gray-500">{record.email}</div>
                  )}
                </div>
              </div>
              {getStatusBadge(record.status)}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-500">초대일:</span>
                <div className="font-medium">{formatDate(record.invitedAt)}</div>
              </div>
              
              {record.joinedAt && (
                <div>
                  <span className="text-gray-500">가입일:</span>
                  <div className="font-medium">{formatDate(record.joinedAt)}</div>
                </div>
              )}

              {record.status === 'accepted' && (
                <div>
                  <span className="text-gray-500">리워드:</span>
                  <div className={`font-medium ${record.rewardClaimed ? 'text-green-600' : 'text-orange-600'}`}>
                    {record.rewardClaimed ? '수령 완료' : '수령 대기'}
                  </div>
                </div>
              )}
            </div>

            {/* 액션 버튼들 */}
            <div className="flex gap-3">
              {record.status === 'accepted' && !record.rewardClaimed && (
                <button
                  onClick={() => handleClaimReward(record.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <GiftIcon sx={{ fontSize: 16 }} />
                  리워드 받기 (5,000원)
                </button>
              )}

              {record.status === 'pending' && (
                <>
                  <button
                    onClick={() => simulateAcceptance(record.id)}
                    className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                  >
                    가입 시뮬레이션 (개발용)
                  </button>
                  <button
                    onClick={() => {
                      const emailSubject = encodeURIComponent('Fitkle 초대 - 함께 배워요! 🎓');
                      const emailBody = encodeURIComponent(
                        `안녕하세요!\n\nFitkle에서 함께 새로운 스킬을 배워보지 않을래요?\n초대 링크를 통해 가입하시면 특별 혜택도 받을 수 있어요!\n\n초대 링크: https://fitkle.com/signup?ref=SAMPLE\n\n기다리고 있을게요! 😊`
                      );
                      window.open(`mailto:${record.email}?subject=${emailSubject}&body=${emailBody}`);
                    }}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    다시 초대하기
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}