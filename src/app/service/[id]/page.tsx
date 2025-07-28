"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { ServiceDetailScreen } from '@/features/service/presentation/screens/ServiceDetailScreen';

interface ServiceDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const searchParams = useSearchParams();
  const resolvedParams = React.use(params);
  const serviceId = resolvedParams.id;
  const tutorId = searchParams.get('tutorId');

  return (
    <ServiceDetailScreen 
      serviceId={serviceId} 
      tutorId={tutorId} 
    />
  );
}