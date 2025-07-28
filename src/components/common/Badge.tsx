"use client";

import React from 'react';

export type BadgeVariant = 
  | 'sage' | 'lavender' | 'terracotta' | 'slate' | 'mauve' | 'bronze' | 'dusty-blue' | 'warm-gray';
export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = 'sage',
  size = 'md',
  children,
  icon,
  className = ''
}: BadgeProps) {
  
  // 기본 뱃지 스타일
  const baseClasses = 'inline-flex items-center font-semibold rounded-full border transition-all duration-200 backdrop-blur-sm shadow-sm border-opacity-40';
  
  const sizeClasses = {
    sm: 'text-xs gap-1 px-2 py-1',
    md: 'text-xs gap-1.5 px-3 py-1.5', 
    lg: 'text-sm gap-2 px-4 py-2'
  };

  const variantClass = `badge-${variant}`;
  
  const combinedClasses = `${baseClasses} ${variantClass} ${sizeClasses[size]} ${className}`.trim();
  
  return (
    <div className={combinedClasses}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </div>
  );
}