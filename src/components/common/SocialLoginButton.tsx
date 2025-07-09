import React from 'react';

interface SocialLoginButtonProps {
  type: 'kakao' | 'naver' | 'google' | 'facebook';
  onClick?: () => void;
  children?: React.ReactNode;
  size?: number | string; // px, rem 등 허용
}

const typeStyles = {
  kakao: {
    bg: '#FFE812',
    text: 'kakao',
    textColor: 'text-black',
  },
  naver: {
    bg: '#03C75A',
    text: 'N',
    textColor: 'text-white',
  },
  google: {
    bg: '#fff',
    text: 'G',
    textColor: 'text-[#4285F4]',
  },
  facebook: {
    bg: '#1877F3',
    text: 'f',
    textColor: 'text-white',
  },
};

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ type, onClick, children, size = 48 }) => {
  const style = typeStyles[type];
  const sizeValue = typeof size === 'number' ? `${size}px` : size;
  return (
    <button
      type="button"
      className={`rounded-full flex items-center justify-center shadow border border-gray-100 hover:scale-105 transition-transform ${style.textColor} cursor-pointer`}
      style={{ backgroundColor: style.bg, width: sizeValue, height: sizeValue, minWidth: sizeValue, minHeight: sizeValue }}
      onClick={onClick}
    >
      {children ?? (
        <span className={`font-bold text-base ${type === 'google' ? 'text-lg' : ''}`}>{style.text}</span>
      )}
    </button>
  );
}; 