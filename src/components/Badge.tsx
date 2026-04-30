import React from 'react';
import { cn } from '@/src/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'neutral' | 'info';
  className?: string;
  dot?: boolean;
}

export default function Badge({ 
  children, 
  variant = 'neutral', 
  className,
  dot = false 
}: BadgeProps) {
  const variants = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border-amber-100",
    error: "bg-red-50 text-red-700 border-red-100",
    neutral: "bg-slate-50 text-slate-700 border-slate-100",
    info: "bg-blue-50 text-blue-700 border-blue-100",
  };

  const dotVariants = {
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    error: "bg-red-500",
    neutral: "bg-slate-400",
    info: "bg-blue-500",
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border",
      variants[variant],
      className
    )}>
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full", dotVariants[variant])} />}
      {children}
    </span>
  );
}
