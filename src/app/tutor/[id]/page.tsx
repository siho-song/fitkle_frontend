"use client";

import { TutorDetailScreen } from '@/features/tutors/presentation/screens/TutorDetailScreen';

interface TutorDetailPageProps {
  params: {
    id: string;
  };
}

export default function TutorDetailPage({ params }: TutorDetailPageProps) {
  return <TutorDetailScreen tutorId={params.id} />;
}