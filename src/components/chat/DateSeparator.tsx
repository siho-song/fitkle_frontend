"use client";

import React from 'react';

interface DateSeparatorProps {
  date: string; // ISO date string
}

export function DateSeparator({ date }: DateSeparatorProps) {
  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(dateObj);
  };

  return (
    <div className="flex items-center justify-center my-6">
      <div className="flex-1 h-px bg-gray-200"></div>
      <div className="px-4 py-2 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">
        {formatDate(date)}
      </div>
      <div className="flex-1 h-px bg-gray-200"></div>
    </div>
  );
}