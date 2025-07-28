import React from 'react';
import { useRouter } from 'next/navigation';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PaymentIcon from '@mui/icons-material/Payment';
import { Button } from '@/components/common/Button';

interface ServiceBookingSidebarProps {
  service: {
    id: string;
    duration: number;
    price: number;
  };
  tutorId: string;
}

export function ServiceBookingSidebar({ service, tutorId }: ServiceBookingSidebarProps) {
  const router = useRouter();

  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return `${hours}시간`;
      }
      return `${hours}시간 ${remainingMinutes}분`;
    }
    return `${minutes}분`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">예약 정보</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <ScheduleIcon sx={{ fontSize: 20 }} />
            <span>수업 시간</span>
          </div>
          <span className="font-semibold text-gray-900">
            {formatDuration(service.duration)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <PaymentIcon sx={{ fontSize: 20 }} />
            <span>수강료</span>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-primary">
              {service.price.toLocaleString()}원
            </div>
            <div className="text-sm text-gray-500">
              {formatDuration(service.duration)}당
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex items-center justify-between text-lg font-bold">
          <span>총 금액</span>
          <span className="text-primary">{service.price.toLocaleString()}원</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={() => router.push(`/booking?serviceId=${service.id}&tutorId=${tutorId}`)}
          variant="primary"
          className="w-full"
        >
          수업 신청하기
        </Button>
        
        <Button
          onClick={() => router.push(`/chat?tutorId=${tutorId}`)}
          variant="secondary"
          className="w-full"
        >
          상담 문의하기
        </Button>
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="text-sm text-blue-800 font-medium mb-1">💡 수업 안내</div>
        <div className="text-sm text-blue-700">
          • 첫 수업 전 무료 상담 가능<br/>
          • 수업 일정은 튜터와 협의 조정<br/>
          • 취소는 24시간 전까지 가능
        </div>
      </div>
    </div>
  );
}