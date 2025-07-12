// 레이아웃 컴포넌트 prop 타입들

import React from 'react';

// 컨테이너 관련
export interface ContainerProps {
  children: React.ReactNode;
  variant?: 'default' | 'wide' | 'narrow' | 'full';
  className?: string;
}

// 섹션 관련
export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'primary' | 'transparent';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

// 헤더 관련
export interface HeaderProps {
  className?: string;
  containerVariant?: 'default' | 'wide' | 'narrow' | 'full';
  showSearch?: boolean;
  sticky?: boolean;
}

// 푸터 관련
export interface FooterProps {
  className?: string;
  containerVariant?: 'default' | 'wide' | 'narrow' | 'full';
  showSocialLinks?: boolean;
  showNewsletter?: boolean;
}

// 메인 레이아웃
export interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  headerProps?: Partial<HeaderProps>;
  footerProps?: Partial<FooterProps>;
  showHeader?: boolean;
  showFooter?: boolean;
}

// 중앙 정렬 레이아웃
export interface CenteredLayoutProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showLogo?: boolean;
  logoSize?: 'small' | 'medium' | 'big';
  showFooter?: boolean;
}

// 사이드바 레이아웃
export interface SidebarLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  className?: string;
  sidebarPosition?: 'left' | 'right';
  sidebarWidth?: 'sm' | 'md' | 'lg';
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

// 그리드 레이아웃
export interface GridLayoutProps {
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

// 스택 레이아웃
export interface StackProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'row' | 'column';
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
}

// 브레드크럼
export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
}

// 네비게이션
export interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  active?: boolean;
  disabled?: boolean;
  children?: NavItem[];
}

export interface NavigationProps {
  items: NavItem[];
  className?: string;
  variant?: 'horizontal' | 'vertical';
  showIcons?: boolean;
  collapsible?: boolean;
}

// 프로필 드롭다운
export interface ProfileMenuItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
}

export interface ProfileDropdownProps {
  className?: string;
  user?: {
    name: string;
    avatar?: string;
    email?: string;
  };
  menuItems?: ProfileMenuItem[];
}