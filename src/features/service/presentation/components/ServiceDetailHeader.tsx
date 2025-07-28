import React from 'react';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import { Button } from '@/components/common/Button';

interface ServiceDetailHeaderProps {
  service: {
    name: string;
    category: string;
  };
  tutor: {
    name: string;
    rating: number;
    reviewCount: number;
  };
}

export function ServiceDetailHeader({ service, tutor }: ServiceDetailHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-8">
      <Button
        onClick={() => router.back()}
        variant="ghost"
        icon={<ArrowBackIcon />}
        className="mb-4"
      >
        이전으로
      </Button>
      
      <div className="flex items-center gap-3 mb-4">
        <BusinessCenterIcon className="text-primary" sx={{ fontSize: 32 }} />
        <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
      </div>
      
      <div className="flex items-center gap-6 text-gray-600">
        <div className="flex items-center gap-2">
          <PersonIcon sx={{ fontSize: 16 }} />
          <span>{tutor.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon sx={{ fontSize: 16 }} className="text-yellow-500" />
          <span>{tutor.rating}</span>
          <span className="text-gray-400">({tutor.reviewCount}개 후기)</span>
        </div>
        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
          {service.category}
        </span>
      </div>
    </div>
  );
}