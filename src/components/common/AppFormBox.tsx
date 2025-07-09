import React, { ReactNode } from 'react';

interface AppFormBoxProps {
  label?: ReactNode;
  errorText?: string;
  children: ReactNode;
  className?: string;
}

export const AppFormBox: React.FC<AppFormBoxProps> = ({
  label,
  errorText,
  children,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-1 p-4 border rounded-lg bg-white ${errorText ? 'border-red-400' : 'border-gray-200'} ${className}`}>
      {label && <div className="mb-1 text-sm font-medium text-gray-700">{label}</div>}
      {children}
      {errorText && <div className="mt-1 text-xs text-red-500">{errorText}</div>}
    </div>
  );
}; 