import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

// 쉽게 조절 가능한 패딩 변수
const LAYOUT_PADDING = "px-4 py-4 max-w-7xl mx-auto";

interface MainLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  paddingClass?: string; // 필요시 오버라이드 가능
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  paddingClass,
}) => {
  const appliedPadding = paddingClass || LAYOUT_PADDING;
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-y-auto">
      {showHeader && <Header className={appliedPadding} />}
      {showHeader && <div className="w-full h-px bg-gray-200" />}
      <main className="flex-1 w-full">{children}</main>
      {showFooter && <div className="w-full h-px bg-gray-200" />}
      {showFooter && <Footer className={appliedPadding} />}
    </div>
  );
};
