import React from 'react';
import { Container } from './Container';

interface FooterProps {
  className?: string;
  containerVariant?: 'default' | 'wide' | 'narrow' | 'full';
}

const footerLinks = [
  '공지',
  '광고안내',
  '제보',
  '사이트정보',
  '이용약관',
  '개인정보처리방침',
];

export const Footer: React.FC<FooterProps> = ({ 
  className = '',
  containerVariant = 'default'
}) => {
  return (
    <footer className={`w-full py-8 text-sm ${className}`}>
      <Container variant={containerVariant} className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        <div>
          <div className="text-gray-500 font-medium">© 2025 fitkle. All rights reserved.</div>
          <div className="text-gray-400 text-xs mt-1">Contact: fitkle@gmail.com</div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-500 font-medium">
          {footerLinks.map((label, idx) => (
            <React.Fragment key={label}>
              <a href="#" className="hover:text-primary transition">{label}</a>
              {idx < footerLinks.length - 1 && <span className="mx-1 text-gray-300">|</span>}
            </React.Fragment>
          ))}
        </div>
      </Container>
    </footer>
  );
}; 