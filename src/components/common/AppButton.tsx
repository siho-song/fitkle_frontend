"use client";

import React, { ReactNode } from "react";

interface AppButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const AppButton: React.FC<AppButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  type = "button",
}) => {
  const base =
    "px-4 py-2 rounded-lg font-semibold transition-colors duration-150 cursor-pointer";
  const variants = {
    primary: "bg-primary text-black hover:bg-primaryDark",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border border-primary text-primary bg-white hover:bg-primary/10",
  };
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
