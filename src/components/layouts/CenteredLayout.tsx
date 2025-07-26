import React from "react";
import { Logo } from "@/components/common/Logo";

interface CenteredLayoutProps {
  children: React.ReactNode;
  showLogo?: boolean;
  logoSize?: "small" | "medium" | "big";
  maxWidth?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export const CenteredLayout: React.FC<CenteredLayoutProps> = ({
  children,
  showLogo = true,
  logoSize = "big",
  maxWidth = "md",
  className = "",
}) => {

  // 오버스크롤 완전 비활성화
  React.useEffect(() => {
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';
    
    return () => {
      document.body.style.overscrollBehavior = '';
      document.documentElement.style.overscrollBehavior = '';
    };
  }, []);
  return (
    <div className={`min-h-screen bg-white ${className}`} style={{ overscrollBehavior: 'none' }}>
      <div className="min-h-screen overflow-y-auto bg-white">
        <div className="flex flex-col items-center px-4 pt-24 pb-16 bg-white">
          <div className={`w-full ${maxWidthClasses[maxWidth]}`}>
            {showLogo && (
              <div className="text-center mb-16">
                <Logo size={logoSize} />
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
