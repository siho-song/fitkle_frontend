"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export type LogoSize = "small" | "medium" | "big";

interface LogoProps {
  size?: LogoSize;
  className?: string;
  onClick?: () => void;
}

const sizeConfig = {
  small: {
    width: 140,
    height: 32,
    className: "h-6",
    style: { width: "auto" },
  },
  medium: {
    width: 180,
    height: 48,
    className: "h-7",
    style: { width: "auto" },
  },
  big: {
    width: 240,
    height: 64,
    className: "h-12",
    style: { width: "auto" },
  },
};

export const Logo: React.FC<LogoProps> = ({
  size = "medium",
  className = "",
  onClick,
}) => {
  const router = useRouter();
  const config = sizeConfig[size];

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(ROUTES.HOME);
    }
  };

  return (
    <div
      className={`cursor-pointer transition-opacity hover:opacity-80 inline-block ${config.className} ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
      aria-label="FITKLE 홈으로 이동"
      style={config.style}
    >
      <Image
        src="/assets/logo/FITKLE.svg"
        alt="FITKLE"
        width={config.width}
        height={config.height}
        className="h-full w-auto object-contain"
        priority
      />
    </div>
  );
};
