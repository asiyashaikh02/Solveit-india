import React from 'react';
import { 
  LayoutDashboard, 
  Gavel, 
  FileText, 
  FolderSearch, 
  UserSquare2, 
  Settings, 
  HelpCircle, 
  LogOut,
  Plus
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '@/src/lib/firebase';
import { signOut } from 'firebase/auth';

import Logo from './Logo';

interface SidebarProps {
  role?: 'expert' | 'admin' | 'client';
}

export default function Sidebar({ role = 'client' }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: `/${role}` },
    { name: 'Compliance', icon: Gavel, path: '/compliance' },
    { name: 'Filings', icon: FileText, path: `/${role}/filings` },
    { name: 'Documents', icon: FolderSearch, path: '/documents' },
    { name: 'Consult Expert', icon: UserSquare2, path: role === 'client' ? '/client/consult' : '/experts' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const profileImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuCNFSGGGY6Ik_uHAPan7HmEjWleZasHTODTYbiKXRfIdWZspBCxmApBLZJydOWUyJhrClzKLtko-PBI08dee9V_SWnejccp8nx2Ny88kCfGD93POkopNPGS3mte459iCGKPBs0GGaasyWUTKLQhJP1MfGVSWgvN28eSPer2l7oPQYgiO0rG9SFtwKkJ88lti_8JdLjZmOrewNNEpLE5626Yq3spzFLFvN96ezYxb4qljfk8b6Q4SUT9XHZFTXj7_Ph9SifitW0898g";

  return (
    <aside className="bg-white dark:bg-slate-900 w-64 fixed left-0 top-0 bottom-0 border-r border-slate-100 dark:border-slate-800 flex flex-col py-6 px-4 z-40 overflow-y-auto custom-scrollbar">
      <div className="mb-10 px-2 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-surface-container-high overflow-hidden shrink-0 border border-slate-100 shadow-sm">
          <img src={profileImg} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <Logo showTagline />
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 ease-in-out group",
              isActive 
                ? "bg-primary/10 text-primary border-l-4 border-primary" 
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "group-hover:text-primary")} />
                <span className="font-medium text-sm">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-1">
        <button className="w-full bg-primary hover:bg-primary/90 text-white py-2.5 rounded-lg font-semibold text-sm mb-4 shadow-sm flex items-center justify-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          File New Return
        </button>
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium text-sm">Help Center</span>
          </a>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
