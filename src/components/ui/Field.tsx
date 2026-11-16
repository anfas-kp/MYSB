import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  type?: string;
  as?: 'input' | 'textarea';
  rows?: number;
}

export const Field = forwardRef<HTMLInputElement | HTMLTextAreaElement, FieldProps>(
  ({ label, error, helperText, className, id, type = 'text', as = 'input', rows = 3, ...props }, ref) => {
    const inputId = id || `field-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    return (
      <div className="w-full space-y-1.5">
        <label
          htmlFor={inputId}
          className="block text-xs sm:text-[13px] font-semibold text-teal-950 dark:text-cream-100 tracking-wide select-none"
        >
          {label}
        </label>
        
        <div className="relative">
          {as === 'textarea' ? (
            <textarea
              ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
              id={inputId}
              rows={rows}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
              className={cn(
                'w-full py-3 px-4 rounded-xl border bg-white text-base sm:text-[15px] text-slate-900 placeholder:text-slate-400 transition-[border-color,box-shadow,background-color] duration-150 ease-out focus:outline-none disabled:opacity-50 resize-none',
                error
                  ? 'border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                  : 'border-slate-200 hover:border-slate-300 focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15 shadow-2xs',
                className
              )}
              {...(props as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.ForwardedRef<HTMLInputElement>}
              id={inputId}
              type={type}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
              className={cn(
                'w-full h-12 px-4 rounded-xl border bg-white text-base sm:text-[15px] text-slate-900 placeholder:text-slate-400 transition-[border-color,box-shadow,background-color] duration-150 ease-out focus:outline-none disabled:opacity-50',
                error
                  ? 'border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                  : 'border-slate-200 hover:border-slate-300 focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15 shadow-2xs',
                className
              )}
              {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            />
          )}
        </div>

        {error ? (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="mt-1 flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400"
          >
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p id={`${inputId}-helper`} className="mt-1 text-[11px] text-ink-500 dark:text-cream-400">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Field.displayName = 'Field';
