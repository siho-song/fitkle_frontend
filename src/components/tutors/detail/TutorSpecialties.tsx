"use client";

import React from 'react';
import { TutorItem } from '@/types/entities/tutor';
import { Badge } from '@/components/common/Badge';

interface TutorSpecialtiesProps {
  tutor: TutorItem;
}

export function TutorSpecialties({ tutor }: TutorSpecialtiesProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">전문 분야</h3>
      <div className="flex flex-wrap gap-3">
        {tutor.specialties.map((specialty, index) => {
          const variants = ['terracotta', 'slate', 'mauve', 'bronze', 'dusty-blue', 'warm-gray', 'sage', 'lavender'];
          const selectedVariant = variants[index % variants.length];
          
          return (
            <Badge 
              key={specialty}
              variant={selectedVariant as any}
              size="md"
            >
              {specialty}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}