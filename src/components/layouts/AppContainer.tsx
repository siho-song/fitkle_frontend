import React from 'react';

interface AppContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const AppContainer: React.FC<AppContainerProps> = ({ children, className }) => (
  <div className={`px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32 w-full max-w-screen-2xl mx-auto ${className ?? ''}`}>
    {children}
  </div>
); 