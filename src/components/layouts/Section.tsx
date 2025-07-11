import React from 'react';
import { Container } from './Container';

interface SectionProps {
  children: React.ReactNode;
  variant?: 'default' | 'wide' | 'narrow' | 'full';
  disableContainer?: boolean;
  className?: string;
  containerClassName?: string;
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  variant = 'default',
  disableContainer = false,
  className = '',
  containerClassName = ''
}) => {
  if (disableContainer) {
    return (
      <section className={className}>
        {children}
      </section>
    );
  }

  return (
    <section className={className}>
      <Container variant={variant} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
};