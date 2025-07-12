"use client";

import React from 'react';
import { TutorDetailScreen } from '@/features/tutors/presentation/screens/TutorDetailScreen';

interface TutorDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function TutorDetailPage({ params }: TutorDetailPageProps) {
  const { id } = React.use(params);
  return <TutorDetailScreen tutorId={id} />;
}