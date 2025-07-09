import React from 'react';
import { Tutor } from '../../../domain/entities/tutor';
export const TutorDetailPageDesktop: React.FC<{ tutor: Tutor }> = ({ tutor }) => {
  return <div className="p-8">[데스크톱] 튜터 상세 페이지: {tutor.name}</div>;
}; 