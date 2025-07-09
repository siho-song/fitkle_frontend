import React from 'react';
import { Tutor } from '../../../domain/entities/tutor';
export const TutorDetailPageMobile: React.FC<{ tutor: Tutor }> = ({ tutor }) => {
  return <div className="p-4">[모바일] 튜터 상세 페이지: {tutor.name}</div>;
}; 