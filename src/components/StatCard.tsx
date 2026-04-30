import React from 'react';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  description?: string;
  footer?: string;
  loading?: boolean;
}

export default function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  trend, 
  description,
  footer,
  loading 
}: StatCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 border border-slate-100 ambient-shadow hover-shadow transition-all flex flex-col gap-4"
    >
      <div className="flex justify-between items-center text-slate-500 font-semibold text-xs uppercase tracking-wider">
        <span>{label}</span>
        <div className="p-1.5 bg-slate-50 rounded-lg">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="text-3xl font-bold text-slate-900 tracking-tight">{value}</div>
        
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded w-fit",
            trend.positive ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
          )}>
            {trend.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend.value} vs last month
          </div>
        )}
        
        {description && <p className="text-xs text-slate-400">{description}</p>}
      </div>
      
      {footer && (
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center gap-2 text-xs text-slate-500">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          {footer}
        </div>
      )}
    </motion.div>
  );
}
