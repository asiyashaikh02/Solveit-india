import React from 'react';
import { Search, Bell } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface NavbarProps {
  title: string;
  subtitle: string;
}

export default function Navbar({ title, subtitle }: NavbarProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">{title}</h1>
        <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search filings, documents..." 
            className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-sm w-full md:w-64 transition-all"
          />
        </div>
        <button className="relative p-2 rounded-full bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>
  );
}
