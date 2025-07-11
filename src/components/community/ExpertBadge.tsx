"use client";

import React from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';

interface ExpertBadgeProps {
  size?: 'small' | 'medium' | 'large';
}

export function ExpertBadge({ size = 'medium' }: ExpertBadgeProps) {
  const getBadgeInfo = (iconSize: number) => {
    return {
      icon: <VerifiedIcon sx={{ fontSize: iconSize }} />,
      text: '인증 튜터',
      bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
      textColor: 'text-white',
      description: '검증된 전문가'
    };
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          container: 'px-2 py-1 text-xs',
          iconSize: 18, // 실제로 작게
          text: 'text-xs'
        };
      case 'large':
        return {
          container: 'px-4 py-2 text-base',
          iconSize: 24,
          text: 'text-base'
        };
      default: // medium
        return {
          container: 'px-3 py-1.5 text-sm',
          iconSize: 21,
          text: 'text-sm'
        };
    }
  };

  const sizeClasses = getSizeClasses();
  const badgeInfo = getBadgeInfo(sizeClasses.iconSize);

  return (
    <div 
      className={`inline-flex items-center gap-1 rounded-full font-bold shadow-sm ${badgeInfo.bgColor} ${badgeInfo.textColor} ${sizeClasses.container}`}
      title={badgeInfo.description}
    >
      <span>
        {badgeInfo.icon}
      </span>
      <span className={sizeClasses.text}>
        {badgeInfo.text}
      </span>
    </div>
  );
}