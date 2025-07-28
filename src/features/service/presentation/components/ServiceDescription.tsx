import React from 'react';

interface ServiceDescriptionProps {
  description: string;
}

export function ServiceDescription({ description }: ServiceDescriptionProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">서비스 소개</h2>
      <p className="text-gray-700 leading-relaxed text-lg">{description}</p>
    </div>
  );
}