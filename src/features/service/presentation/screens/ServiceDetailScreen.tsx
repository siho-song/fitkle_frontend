"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layouts/MainLayout';
import { sampleTutors } from '@/data/sampleTutors';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { Button } from '@/components/common/Button';
import { ServiceDetailHeader } from '../components/ServiceDetailHeader';
import { ServiceDescription } from '../components/ServiceDescription';
import { ServiceTutorInfo } from '../components/ServiceTutorInfo';
import { ServiceBookingSidebar } from '../components/ServiceBookingSidebar';

interface ServiceDetailScreenProps {
  serviceId: string;
  tutorId: string | null;
}

export function ServiceDetailScreen({ serviceId, tutorId }: ServiceDetailScreenProps) {
  const router = useRouter();

  const tutor = sampleTutors.find(t => t.id === tutorId);
  const service = tutor?.services?.find(s => s.id === serviceId);

  if (!tutor || !service) {
    return (
      <MainLayout disableContainer={false}>
        <div className="py-16 text-center">
          <BusinessCenterIcon className="mx-auto text-gray-300 mb-4" sx={{ fontSize: 64 }} />
          <h2 className="text-2xl font-bold text-gray-500 mb-2">서비스를 찾을 수 없습니다</h2>
          <p className="text-gray-400 mb-6">
            요청하신 서비스가 존재하지 않거나 삭제되었습니다.
          </p>
          <Button
            onClick={() => router.back()}
            variant="primary"
          >
            이전 페이지로 돌아가기
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout disableContainer={false}>
      <div className="py-8">
          <ServiceDetailHeader service={service} tutor={tutor} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ServiceDescription description={service.description} />
              <ServiceTutorInfo tutor={tutor} />
            </div>

            <div className="lg:col-span-1">
              <ServiceBookingSidebar service={service} tutorId={tutor.id} />
            </div>
          </div>
      </div>
    </MainLayout>
  );
}