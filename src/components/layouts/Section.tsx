import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = "",
  padding = true
}) => {
  return (
    <section className={`${padding ? 'py-8' : ''} ${className}`}>
      {children}
    </section>
  );
};