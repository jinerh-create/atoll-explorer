"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      onRightIconClick,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-pearl/80 mb-1.5"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-pearl/40 pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              "w-full rounded-xl border bg-ocean-mid/50 px-4 py-3 text-sm text-pearl",
              "placeholder:text-pearl/30",
              "border-white/10 focus:border-ocean-teal focus:ring-2 focus:ring-ocean-teal/20",
              "backdrop-blur-sm transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "dark:bg-ocean-mid/50 dark:text-pearl dark:border-white/10",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <button
              type="button"
              onClick={onRightIconClick}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 text-pearl/40",
                onRightIconClick && "hover:text-pearl/70 transition-colors cursor-pointer",
                !onRightIconClick && "pointer-events-none"
              )}
            >
              {rightIcon}
            </button>
          )}
        </div>

        {error && (
          <p className="mt-1.5 text-xs text-red-400">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-1.5 text-xs text-pearl/40">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// Textarea variant
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const textareaId = id ?? React.useId();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-pearl/80 mb-1.5"
          >
            {label}
          </label>
        )}

        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            "w-full rounded-xl border bg-ocean-mid/50 px-4 py-3 text-sm text-pearl",
            "placeholder:text-pearl/30 min-h-[120px] resize-y",
            "border-white/10 focus:border-ocean-teal focus:ring-2 focus:ring-ocean-teal/20",
            "backdrop-blur-sm transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />

        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
        {hint && !error && (
          <p className="mt-1.5 text-xs text-pearl/40">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

// Select variant
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options, placeholder, id, ...props }, ref) => {
    const selectId = id ?? React.useId();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-pearl/80 mb-1.5"
          >
            {label}
          </label>
        )}

        <select
          id={selectId}
          ref={ref}
          className={cn(
            "w-full rounded-xl border bg-ocean-mid/50 px-4 py-3 text-sm text-pearl",
            "border-white/10 focus:border-ocean-teal focus:ring-2 focus:ring-ocean-teal/20",
            "backdrop-blur-sm transition-all duration-200 appearance-none",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" className="bg-ocean-deep">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-ocean-deep">
              {option.label}
            </option>
          ))}
        </select>

        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
        {hint && !error && (
          <p className="mt-1.5 text-xs text-pearl/40">{hint}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Input, Textarea, Select };
