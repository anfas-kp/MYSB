import React from 'react';
import { cn } from '../../lib/utils';
import { trackEvent } from '../../lib/analytics';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'coral' | 'teal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  magnetic?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  href?: string;
  trackingName?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  loading = false,
  href,
  onClick,
  trackingName,
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<any>) => {
    if (trackingName) {
      trackEvent('cta_click', { button_name: trackingName, href });
    }
    if (onClick) onClick(e);
  };

  const baseStyles = 'group relative inline-flex items-center justify-center font-medium rounded-full overflow-hidden select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed transition-[transform,box-shadow,background-color,border-color] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] active:duration-75 [@media(hover:hover)]:hover:-translate-y-[1.5px] will-change-transform';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5 min-h-[36px]',
    md: 'text-sm sm:text-base px-6 py-3 gap-2 min-h-[46px]',
    lg: 'text-base sm:text-lg px-8 py-3.5 gap-2.5 min-h-[52px]',
    xl: 'text-lg sm:text-xl px-10 py-4 gap-3 min-h-[60px]',
  };

  const variantStyles = {
    primary: 'bg-coral-500 hover:bg-coral-600 active:bg-coral-700 text-white shadow-sm hover:shadow-md border border-coral-600/30 btn-shimmer',
    coral: 'bg-coral-500 hover:bg-coral-600 active:bg-coral-700 text-white shadow-sm hover:shadow-md border border-coral-600/30 btn-shimmer',
    secondary: 'bg-teal-900 hover:bg-teal-950 active:bg-teal-950 text-white shadow-sm hover:shadow-md border border-teal-800',
    teal: 'bg-teal-900 hover:bg-teal-950 active:bg-teal-950 text-white shadow-sm hover:shadow-md border border-teal-800',
    outline: 'bg-white hover:bg-cream-50 text-ink-900 border border-ink-900/15 hover:border-ink-900/30 shadow-2xs hover:shadow-xs',
    ghost: 'bg-transparent text-ink-900 hover:bg-ink-900/5 hover:text-teal-900',
  };

  const content = (
    <>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span className="transition-transform duration-150 ease-out group-hover:-translate-x-0.5 flex-shrink-0">{icon}</span>
      )}
      <span className="relative z-10 font-semibold tracking-normal">{children}</span>
      {!loading && icon && iconPosition === 'right' && (
        <span className="transition-transform duration-150 ease-out group-hover:translate-x-0.5 flex-shrink-0">{icon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        onClick={handleClick}
        {...(props as any)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={props.type || 'button'}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
};

