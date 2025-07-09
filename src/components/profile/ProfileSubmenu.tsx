import React from 'react';

interface ProfileSubmenuProps {
  onSubmenuTap: (label: string) => void;
  className?: string;
}

const submenuItems = [
  { label: '내 정보' },
  { label: '전문가 정보' },
  { label: '알림 설정' },
];

export const ProfileSubmenu: React.FC<ProfileSubmenuProps> = ({ onSubmenuTap, className = '' }) => {
  return (
    <div className={`w-40 bg-white rounded-xl shadow-lg border border-gray-100 z-50 ${className}`}>
      <ul className="py-2">
        {submenuItems.map((item) => (
          <li
            key={item.label}
            className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
            onClick={() => onSubmenuTap(item.label)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}; 