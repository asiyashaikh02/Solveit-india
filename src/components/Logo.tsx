import React from 'react';
import { cn } from '@/src/lib/utils';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({ className, showTagline = false, variant = 'dark', size = 'md' }: LogoProps) {
  const sizes = {
    sm: { text: 'text-xl', circle: 'w-4 h-4', check: 'w-2 h-1 border-b-2 border-l-2', tagline: 'text-[8px]' },
    md: { text: 'text-2xl', circle: 'w-5 h-5', check: 'w-3 h-1.5 border-b-[3px] border-l-[3px]', tagline: 'text-[10px]' },
    lg: { text: 'text-4xl', circle: 'w-7 h-7', check: 'w-4 h-2 border-b-[4px] border-l-[4px]', tagline: 'text-[16px]' },
    xl: { text: 'text-[42px]', circle: 'w-8 h-8', check: 'w-[18px] h-[10px] border-b-[5px] border-l-[5px]', tagline: 'text-[20px]' }
  };

  const s = sizes[size];

  return (
    <div className={cn("flex flex-col items-center group shrink-0", className)}>
      <div className="flex items-center tracking-tighter leading-none select-none">
        <div className="flex items-center">
          <span className={cn(
            s.text, "font-black tracking-[-0.04em] lowercase",
            variant === 'dark' ? "text-[#1d4ed8]" : "text-blue-400"
          )}>
            s
          </span>
          <div className={cn(
            "mx-0.5 bg-[#1d4ed8] rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20",
            s.circle
          )}>
             <div className={cn("border-white -rotate-45 -translate-y-[1px]", s.check)} />
          </div>
          <span className={cn(
            s.text, "font-black tracking-[-0.04em] lowercase",
            variant === 'dark' ? "text-[#1d4ed8]" : "text-blue-400"
          )}>
            lveit
          </span>
        </div>
        
        <span className={cn(
          s.text, "font-black tracking-[-0.04em] ml-0.5",
          variant === 'dark' ? "text-black" : "text-white"
        )}>
          India.
        </span>
      </div>

      {showTagline && (
        <p className={cn(
          "font-medium tracking-tight mt-1 ml-1 leading-none font-sans",
          s.tagline,
          variant === 'dark' ? "text-black" : "text-white/90"
        )}>
          Get it done Legally
        </p>
      )}
    </div>
  );
}
