import React from 'react';
import { useRouter } from 'next/navigation';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import { Button } from '@/components/common/Button';

interface ServiceTutorInfoProps {
  tutor: {
    id: string;
    name: string;
    avatar: string;
    experience: string;
    rating: number;
    reviewCount: number;
    studentCount: number;
    introduction: string;
  };
}

export function ServiceTutorInfo({ tutor }: ServiceTutorInfoProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">튜터 정보</h2>
      
      <div className="flex items-start gap-4 mb-6">
        <img
          src={tutor.avatar}
          alt={tutor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{tutor.name}</h3>
          <p className="text-gray-600 mb-2">{tutor.experience}</p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <StarIcon sx={{ fontSize: 16 }} className="text-yellow-500" />
              <span className="font-medium">{tutor.rating}</span>
              <span>({tutor.reviewCount}개 후기)</span>
            </div>
            <div className="flex items-center gap-1">
              <PersonIcon sx={{ fontSize: 16 }} />
              <span>{tutor.studentCount}명 수강</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <p className="text-gray-700 leading-relaxed">{tutor.introduction}</p>
      </div>

      <div className="mt-6">
        <Button
          onClick={() => router.push(`/tutor/${tutor.id}`)}
          variant="secondary"
          className="w-full"
        >
          튜터 프로필 자세히 보기
        </Button>
      </div>
    </div>
  );
}