import React from 'react';
import { Tutor } from '../../../domain/entities/tutor';

interface TutorStatsWidgetProps {
  tutor: Tutor;
}

const getIconFromString = (icon?: string) => {
  switch (icon) {
    case 'star':
      return '⭐';
    case 'person_outline':
      return '👤';
    case 'access_time':
      return '⏰';
    case 'business_center_outlined':
      return '💼';
    default:
      return null;
  }
};

export const TutorStatsWidget: React.FC<TutorStatsWidgetProps> = ({ tutor }) => {
  return (
    <div className="flex justify-around items-center px-4 py-6">
      {tutor.statsItems.map((stat, i) => (
        <React.Fragment key={i}>
          <StatItem label={stat.label} value={stat.value} icon={stat.icon} />
          {i < tutor.statsItems.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </div>
  );
};

const StatItem: React.FC<{ label: string; value: string; icon?: string }> = ({ label, value, icon }) => (
  <div className="flex flex-col items-center min-w-[80px] mx-2">
    <span className="text-sm text-gray-400">{label}</span>
    <div className="flex items-center mt-2">
      {icon && <span className="text-yellow-400 text-lg mr-1">{getIconFromString(icon)}</span>}
      <span className="text-lg font-bold">{value}</span>
    </div>
  </div>
);

const Divider: React.FC = () => (
  <div className="h-10 w-px bg-gray-200 mx-2" />
); 