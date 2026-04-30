import React from 'react';
import Sidebar from '@/src/components/Sidebar';
import { motion } from 'motion/react';
import ReferralWidget from './ReferralWidget';

interface LayoutProps {
  children: React.ReactNode;
  role: 'expert' | 'admin' | 'client';
}

export default function Layout({ children, role }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role={role} />
      <ReferralWidget />
      <main className="flex-1 ml-64 p-8 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
