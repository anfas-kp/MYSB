import React from 'react';
import { cn } from '../../lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'default',
  ...props
}) => {
  const sizeStyles = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1400px]',
    full: 'max-w-none',
  };

  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12',
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
