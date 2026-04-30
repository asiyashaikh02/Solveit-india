import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  FileText, 
  MessageSquare, 
  Settings, 
  Plus, 
  Bell, 
  Search,
  User,
  ArrowRight,
  Rocket,
  ShieldCheck,
  Zap,
  HelpCircle,
  LogOut,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileUp,
  Scale,
  Sparkles,
  Bot,
  X,
  Mail,
  Lock,
  Folder,
  Shield,
  Star,
  Award,
  Calendar,
  CheckCircle2,
  Phone,
  Video
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import Button from '@/src/components/Button';
import { useAuth } from '@/src/context/AuthContext';
import { dataService } from '@/src/services/dataService';

import Logo from '@/src/components/Logo';

export default function UserDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');
  const [filings, setFilings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState('');

  useEffect(() => {
    if (user) {
      dataService.getFilings(user.uid).then(data => {
        setFilings(data);
        setLoading(false);
      });
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const QUICK_ACTIONS = [
    { title: 'Company Registration', icon: Rocket, color: 'bg-blue-600', desc: 'Incorp your Pvt Ltd in 7 days.' },
    { title: 'GST Registration', icon: ShieldCheck, color: 'bg-indigo-600', desc: 'Secure your GSTIN for business.' },
    { title: 'Trademark Filing', icon: Zap, color: 'bg-amber-500', desc: 'Protect your brand identity.' },
    { title: 'MSME / Udyam', icon: ClipboardCheck, color: 'bg-emerald-600', desc: 'Get government benefits today.' }
  ];

  const MENU_ITEMS = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Compliance', icon: ClipboardCheck },
    { name: 'Filings', icon: FileText },
    { name: 'Consult Expert', icon: Scale },
    { name: 'Documents', icon: FileUp },
    { name: 'Settings', icon: Settings }
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-80 bg-white border-r border-slate-100 flex flex-col z-20 overflow-y-auto custom-scrollbar">
        <div className="p-8 space-y-4">
          <Logo showTagline />
          <div className="h-px bg-slate-50 w-full" />
        </div>

        <nav className="flex-1 px-4 space-y-2">
           {MENU_ITEMS.map(item => (
             <button
               key={item.name}
               onClick={() => setActiveTab(item.name)}
               className={cn(
                 "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group relative overflow-hidden",
                 activeTab === item.name 
                   ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10" 
                   : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
               )}
             >
               {activeTab === item.name && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-slate-900 -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
               )}
               <item.icon size={20} className={cn("transition-transform group-hover:scale-110", activeTab === item.name ? "text-blue-400" : "text-slate-400 grup-hover:text-slate-900")} />
               <span className="text-sm font-black uppercase italic tracking-tight">{item.name}</span>
               {item.name === 'Filings' && (
                 <span className="ml-auto bg-blue-100 text-blue-600 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">3 Due</span>
               )}
             </button>
           ))}
        </nav>

        <div className="p-6 border-t border-slate-100 space-y-4">
            <div className="p-6 bg-slate-950 rounded-[32px] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10 space-y-4">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Professional Hub</p>
                 <h4 className="text-sm font-black uppercase italic tracking-tight">Are you an Expert?</h4>
                 <p className="text-[9px] text-slate-500 font-medium italic mb-2">List your practice, manage clients, and grow your brand.</p>
                 <Button 
                   onClick={() => navigate('/expert')}
                   className="w-full h-10 rounded-xl bg-blue-600 text-[10px] font-black uppercase italic tracking-tighter"
                 >
                   Expert Dashboard
                 </Button>
              </div>
           </div>

           <div className="p-6 bg-white rounded-[32px] border border-slate-100 relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compliance Health</p>
                 <div className="flex items-end gap-2">
                    <span className="text-3xl font-black italic tracking-tighter text-slate-900">88%</span>
                    <TrendingUp size={16} className="mb-2 text-emerald-400" />
                 </div>
                 <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '88%' }}
                      className="h-full bg-blue-500 rounded-full"
                    />
                 </div>
                 <p className="text-[9px] text-slate-500 font-medium italic">Good standing. 2 action items pending.</p>
              </div>
           </div>
           
           <button 
             onClick={handleLogout}
             className="w-full flex items-center justify-center gap-3 p-4 text-slate-400 hover:text-red-500 transition-colors uppercase font-black text-[10px] tracking-widest"
           >
              <LogOut size={14} />
              Sign Out
           </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* HEADER */}
        <header className="h-24 bg-white border-b border-slate-100 px-12 flex items-center justify-between z-10">
           <div className="flex items-center gap-6">
              <div className="relative group">
                 <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                 <input 
                   type="text" 
                   placeholder="Search compliance, experts, files..." 
                   className="h-12 w-80 pl-12 pr-6 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-blue-50 border-2 transition-all outline-none text-sm font-bold text-slate-900"
                 />
              </div>
           </div>

           <div className="flex items-center gap-6">
              <button className="relative p-3 rounded-xl hover:bg-slate-50 text-slate-400 transition-colors">
                 <Bell size={20} />
                 <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full ring-4 ring-white" />
              </button>
              <div className="h-8 w-px bg-slate-100 mx-2" />
              <div className="flex items-center gap-4">
                 <div className="text-right">
                    <p className="text-xs font-black italic uppercase tracking-tighter text-slate-900">{user?.displayName || 'User'}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user?.email || 'Individual Account'}</p>
                 </div>
                 <div className="w-12 h-12 rounded-[18px] bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm">
                    {user?.photoURL ? <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" /> : (user?.displayName?.charAt(0) || 'U')}
                 </div>
              </div>
           </div>
        </header>

        {/* VIEWPORT */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
           <div className="max-w-6xl mx-auto">
              <AnimatePresence mode="wait">
                {activeTab === 'Overview' ? (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-12"
                  >
                    {/* WELCOME SECTION */}
                    <div className="flex items-center justify-between">
                       <div className="space-y-1">
                          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">Welcome Back, {user?.displayName?.split(' ')[0] || 'Founder'}!</h2>
                          <p className="text-sm text-slate-500 font-medium italic">Your business compliance is on track. Here's what needs attention.</p>
                       </div>
                       <div className="flex gap-4">
                          <Button variant="outline" className="h-14 px-8 rounded-2xl border-2 border-slate-200 font-black italic uppercase tracking-tighter hover:bg-slate-50">
                             Support Docs
                          </Button>
                          <Button className="h-14 px-8 rounded-2xl bg-blue-600 font-black italic uppercase tracking-tighter shadow-xl shadow-blue-500/20">
                             <Plus size={18} className="mr-2" /> New Request
                          </Button>
                       </div>
                    </div>

                    {/* QUICK STATS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       {[
                         { label: 'Active Services', val: '04', color: 'text-blue-600', icon: Zap },
                         { label: 'Documents Filed', val: '22', color: 'text-slate-900', icon: FileText },
                         { label: 'Upcoming Deadlines', val: '03', color: 'text-red-500', icon: Clock }
                       ].map((stat, i) => (
                         <div key={i} className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                            <div className="flex justify-between items-start mb-6">
                               <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                  <stat.icon size={20} />
                               </div>
                               <ArrowRight size={16} className="text-slate-200 group-hover:text-blue-600 transition-colors" />
                            </div>
                            <p className="text-4xl font-black italic tracking-tighter mb-1 select-none">{stat.val}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{stat.label}</p>
                         </div>
                       ))}
                    </div>

                    {/* ACTION GRID */}
                    <div className="space-y-8">
                       <div className="flex items-center justify-between">
                          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Smart Onboarding / Quick Launch</h3>
                          <div className="h-px flex-1 bg-slate-100 mx-8" />
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          {QUICK_ACTIONS.map((action, i) => (
                            <button 
                              key={i} 
                              className="p-6 bg-white rounded-[40px] border-2 border-transparent hover:border-blue-600 transition-all text-left shadow-sm hover:shadow-xl group"
                            >
                               <div className={cn("w-14 h-14 rounded-3xl flex items-center justify-center text-white mb-6 shadow-lg", action.color)}>
                                  <action.icon size={24} />
                               </div>
                               <h4 className="text-sm font-black uppercase italic tracking-tight text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{action.title}</h4>
                               <p className="text-xs text-slate-400 font-medium italic leading-relaxed">{action.desc}</p>
                            </button>
                          ))}
                       </div>
                    </div>

                    {/* EMPTY STATE / RECENT CASES */}
                    <div className="bg-white rounded-[40px] border border-slate-100 p-12 overflow-hidden relative">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 border border-slate-100" />
                       <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                          <div className="w-20 h-20 bg-slate-50 rounded-[28px] flex items-center justify-center text-slate-300">
                             <ClipboardCheck size={32} />
                          </div>
                          <div className="space-y-2">
                             <h4 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">No Active Service Cases</h4>
                             <p className="text-sm text-slate-400 font-medium max-w-sm mx-auto italic leading-relaxed">
                                You haven't started any compliance filings yet. Use the quick actions above to begin your onboarding journey.
                             </p>
                          </div>
                          <Button className="h-14 px-10 rounded-2xl bg-slate-900 text-white font-black italic uppercase tracking-tighter shadow-2xl shadow-slate-900/10">
                             Browse Services Library
                          </Button>
                       </div>
                    </div>
                  </motion.div>
                ) : activeTab === 'Compliance' ? (
                  <motion.div
                    key="compliance"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="flex items-center justify-between">
                       <div className="space-y-1">
                          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">Statutory Compliance</h2>
                          <p className="text-sm text-slate-500 font-medium italic">Track your mandatory ROC, GST, and Income Tax filings.</p>
                       </div>
                       <div className="flex gap-4">
                          <button className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
                            <Search size={14} /> Filter Categories
                          </button>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                       {[
                         { name: 'ROC Annual Returns (MGT-7)', due: '30 Oct, 2026', status: 'Upcoming', category: 'ROC', color: 'blue' },
                         { name: 'GST Monthly Return (GSTR-3B)', due: '20 May, 2026', status: 'Pending', category: 'GST', color: 'amber' },
                         { name: 'Income Tax Return (ITR-6)', due: '31 Oct, 2026', status: 'Compliant', category: 'Tax', color: 'emerald' },
                         { name: 'Director KYC (DIR-3)', due: '30 Sep, 2026', status: 'Overdue', category: 'ROC', color: 'red' },
                         { name: 'PF & ESI Monthly Deposit', due: '15 May, 2026', status: 'Pending', category: 'Labor', color: 'amber' }
                       ].map((item, i) => (
                         <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8 group hover:shadow-xl transition-all">
                            <div className="flex items-center gap-6">
                               <div className={cn(
                                 "w-14 h-14 rounded-2xl flex items-center justify-center font-black italic text-xs",
                                 item.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                                 item.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                                 item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                               )}>
                                 {item.category}
                               </div>
                               <div>
                                  <h4 className="text-lg font-black uppercase italic tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                                  <div className="flex items-center gap-2 mt-1">
                                     <Clock size={12} className="text-slate-400" />
                                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Deadline: {item.due}</p>
                                  </div>
                               </div>
                            </div>

                            <div className="flex items-center gap-8">
                               <div className={cn(
                                 "px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest",
                                 item.status === 'Compliant' ? 'bg-emerald-100 text-emerald-700' :
                                 item.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                                 item.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                               )}>
                                 {item.status}
                               </div>
                               <button className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all group/btn">
                                  <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                               </button>
                            </div>
                         </div>
                       ))}
                    </div>

                    <div className="p-10 bg-slate-900 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
                       <div className="space-y-4 relative z-10 text-center md:text-left">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest">
                             <Sparkles size={12} className="text-blue-400" /> AI Powered Monitoring
                          </div>
                          <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none">Automate your entire <br /> Statutory Compliance.</h3>
                          <p className="text-slate-400 text-sm font-medium italic">Connect your Tally or GST portal to never miss a deadline again.</p>
                       </div>
                       <Button className="h-16 px-10 rounded-2xl bg-blue-600 font-black italic uppercase tracking-tighter whitespace-nowrap shadow-2xl shadow-blue-600/20 active:scale-95 transition-all">
                          Enable Auto-Pilot
                       </Button>
                    </div>
                  </motion.div>
                ) : activeTab === 'Filings' ? (
                  <motion.div
                    key="filings"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="flex items-center justify-between">
                       <div className="space-y-1">
                          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">Filing Tracker</h2>
                          <p className="text-sm text-slate-500 font-medium italic">Manage and track your historical and upcoming statutory submissions.</p>
                       </div>
                       <div className="flex gap-4">
                          <Button variant="outline" className="h-12 px-6 rounded-xl border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50">
                             Export Report
                          </Button>
                       </div>
                    </div>

                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                       <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="flex items-center gap-4">
                             {['All Filings', 'ROC', 'Tax', 'GST'].map((filter, i) => (
                               <button key={i} className={cn(
                                 "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                 i === 0 ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10" : "text-slate-400 hover:text-slate-900"
                               )}>
                                 {filter}
                               </button>
                             ))}
                          </div>
                          <div className="relative">
                             <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                             <input 
                               type="text" 
                               placeholder="Search filings..." 
                               className="h-12 w-64 pl-10 pr-6 rounded-xl bg-white border border-slate-100 text-xs font-bold font-sans outline-none focus:border-blue-600 transition-all"
                             />
                          </div>
                       </div>

                       <div className="overflow-x-auto">
                          <table className="w-full">
                             <thead>
                                <tr className="bg-slate-50 text-left">
                                   <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Document / ID</th>
                                   <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Period</th>
                                   <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Due Date</th>
                                   <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                   <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                             </thead>
                             <tbody className="divide-y divide-slate-50">
                                {[
                                  { name: 'Income Tax Return (ITR-6)', id: 'FY 2024-25', period: 'Yearly', due: '31 Oct, 2026', status: 'Pending', color: 'slate' },
                                  { name: 'GST Return (GSTR-1)', id: 'GST-APR-2026', period: 'Apr 2026', due: '11 May, 2026', status: 'Pending', color: 'blue' },
                                  { name: 'TDS Return (Form 24Q)', id: 'TDS-Q1-2026', period: 'Q1 FY 26', due: '31 Jul, 2026', status: 'Upcoming', color: 'slate' },
                                  { name: 'AOC-4 (Financials)', id: 'FY 2023-24', period: 'Archive', due: 'Oct 2024', status: 'Filed', color: 'emerald' },
                                  { name: 'GST Return (GSTR-3B)', id: 'GST-MAR-2026', period: 'Mar 2026', due: '20 Apr, 2026', status: 'Filed', color: 'emerald' }
                                ].map((row, i) => (
                                  <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                     <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                           <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                              <FileText size={16} />
                                           </div>
                                           <div>
                                              <p className="text-sm font-black uppercase italic tracking-tight text-slate-900">{row.name}</p>
                                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{row.id}</p>
                                           </div>
                                        </div>
                                     </td>
                                     <td className="px-8 py-6 text-xs font-bold text-slate-600">{row.period}</td>
                                     <td className="px-8 py-6 text-xs font-bold text-slate-600">{row.due}</td>
                                     <td className="px-8 py-6">
                                        <span className={cn(
                                          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                          row.status === 'Filed' ? 'bg-emerald-100 text-emerald-700' :
                                          row.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                                        )}>
                                           {row.status}
                                        </span>
                                     </td>
                                     <td className="px-8 py-6 text-right">
                                        <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">
                                           {row.status === 'Filed' ? 'Download Receipt' : 'Upload Docs'}
                                        </button>
                                     </td>
                                  </tr>
                                ))}
                             </tbody>
                          </table>
                       </div>

                       <div className="p-8 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Showing 5 of 142 Filings</p>
                          <div className="flex gap-2">
                             <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 transition-all opacity-50 cursor-not-allowed">
                                <ChevronRight size={16} className="rotate-180" />
                             </button>
                             <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 transition-all">
                                <ChevronRight size={16} />
                             </button>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                ) : activeTab === 'Documents' ? (
                  <motion.div
                    key="documents"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="flex items-center justify-between">
                       <div className="space-y-1">
                          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">Document Vault</h2>
                          <p className="text-sm text-slate-500 font-medium italic">Secure storage for your constitutional and statutory business documents.</p>
                       </div>
                       <div className="flex gap-4">
                          <Button className="h-14 px-8 rounded-2xl bg-blue-600 font-black italic uppercase tracking-tighter shadow-xl shadow-blue-500/20">
                             <FileUp size={18} className="mr-2" /> Upload New
                          </Button>
                       </div>
                    </div>

                    {/* VAULT HIGHLIGHT */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                       {[
                         { title: 'Constitutional', count: '12 Files', icon: Shield, color: 'text-blue-600' },
                         { title: 'Tax & GST', count: '45 Files', icon: Sparkles, color: 'text-emerald-600' },
                         { title: 'Identity Docs', count: '08 Files', icon: User, color: 'text-indigo-600' },
                         { title: 'Miscellaneous', count: '14 Files', icon: Folder, color: 'text-slate-400' }
                       ].map((folder, i) => (
                         <button key={i} className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group text-left">
                            <div className={cn("w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-all", folder.color)}>
                               <folder.icon size={20} />
                            </div>
                            <h4 className="text-sm font-black uppercase italic tracking-tight text-slate-900">{folder.title}</h4>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{folder.count}</p>
                         </button>
                       ))}
                    </div>

                    {/* FILE LIST */}
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                       <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent Uploads</h3>
                          <div className="flex items-center gap-2 text-emerald-500">
                             <Lock size={12} />
                             <span className="text-[9px] font-black uppercase tracking-widest">256-bit AES Encrypted</span>
                          </div>
                       </div>
                       
                       <div className="divide-y divide-slate-50">
                          {[
                            { name: 'Incorporation_Certificate_Zephyr.pdf', size: '2.4 MB', type: 'PDF', date: 'Oct 12, 2025' },
                            { name: 'GST_Registration_Certificate.pdf', size: '1.1 MB', type: 'PDF', date: 'Nov 02, 2025' },
                            { name: 'PAN_Card_Authorized_Signatory.jpg', size: '0.8 MB', type: 'IMG', date: 'Jan 15, 2026' },
                            { name: 'MOA_AOA_Final_Verified.pdf', size: '4.2 MB', type: 'PDF', date: 'Oct 12, 2025' }
                          ].map((file, i) => (
                            <div key={i} className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                               <div className="flex items-center gap-6">
                                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                     <FileText size={16} />
                                  </div>
                                  <div>
                                     <p className="text-sm font-black uppercase italic tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">{file.name}</p>
                                     <div className="flex items-center gap-3 mt-1">
                                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{file.size}</span>
                                        <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{file.date}</span>
                                     </div>
                                  </div>
                               </div>
                               <div className="flex items-center gap-4">
                                  <button className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">View</button>
                                  <button className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-600 hover:text-white transition-all">Download</button>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  </motion.div>
                ) : activeTab === 'Settings' ? (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="flex items-center justify-between">
                       <div className="space-y-1">
                          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">Settings & Preferences</h2>
                          <p className="text-sm text-slate-500 font-medium italic">Manage your profile, security, and notification engine.</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                       {/* NAVIGATION */}
                       <div className="space-y-4">
                          {['Profile', 'Security', 'Notifications', 'Billing'].map((set, i) => (
                            <button key={i} className={cn(
                              "w-full flex items-center justify-between p-6 rounded-2xl transition-all border-2",
                              i === 0 ? "bg-white border-blue-600 shadow-xl shadow-blue-500/5 text-blue-600" : "bg-transparent border-transparent text-slate-400 hover:bg-slate-100"
                            )}>
                               <span className="text-sm font-black uppercase italic tracking-widest">{set}</span>
                               {i === 0 && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                            </button>
                          ))}
                       </div>

                       {/* OPTIONS */}
                       <div className="lg:col-span-2 space-y-8">
                          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-10 space-y-10">
                             <div className="space-y-8">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Personal Information</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   <div className="space-y-2">
                                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                                      <input type="text" defaultValue="Aryan Sharma" className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-all" />
                                   </div>
                                   <div className="space-y-2">
                                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Company Name</label>
                                      <input type="text" defaultValue="Zephyr Tech Pvt Ltd" className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-all" />
                                   </div>
                                   <div className="space-y-2">
                                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                                      <input type="email" defaultValue="aryan@zephyr.tech" className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-allAlpha opacity-50 cursor-not-allowed" disabled />
                                   </div>
                                   <div className="space-y-2">
                                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                                      <input type="tel" defaultValue="+91 99887 76655" className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-all" />
                                   </div>
                                </div>
                             </div>

                             <div className="h-px bg-slate-50" />

                             <div className="space-y-6">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Notification Engine</p>
                                <div className="space-y-4">
                                   {[
                                     { label: 'WhatsApp Compliance Alerts', desc: 'Get filing reminders on WhatsApp', enabled: true },
                                     { label: 'Email Case Reports', desc: 'Monthly summary of all ROC filings', enabled: true },
                                     { label: 'Expert Chat Notifications', desc: 'Know when a CA replies to your query', enabled: false }
                                   ].map((pref, i) => (
                                     <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                        <div className="space-y-1">
                                           <p className="text-xs font-black uppercase italic tracking-tight text-slate-700">{pref.label}</p>
                                           <p className="text-[10px] text-slate-400 font-medium italic">{pref.desc}</p>
                                        </div>
                                        <div className={cn(
                                          "w-12 h-6 rounded-full p-1 transition-all flex",
                                          pref.enabled ? "bg-blue-600 justify-end" : "bg-slate-200 justify-start"
                                        )}>
                                           <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                                        </div>
                                     </div>
                                   ))}
                                </div>
                             </div>

                             <div className="pt-6">
                                <Button className="w-full h-16 rounded-2xl bg-slate-900 text-white font-black italic uppercase tracking-tighter shadow-xl shadow-black/10 active:scale-95 transition-all">
                                   Save Preferences
                                </Button>
                             </div>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                ) : activeTab === 'Consult Expert' ? (
                  <motion.div
                    key="consult"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12 pb-20"
                  >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                       <div className="space-y-2">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-blue-100">
                             <Award size={12} /> Top 1% Professionals
                          </div>
                          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">Expert Consultation</h2>
                          <p className="text-sm text-slate-500 font-medium italic">Schedule a 1-on-1 session with India's best tax and legal minds.</p>
                       </div>
                       <div className="flex gap-4">
                          <div className="flex items-center gap-2 p-2 bg-white border border-slate-100 rounded-2xl shadow-sm">
                             <div className="flex -space-x-2">
                                {[1,2,3,4].map(i => (
                                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=expert${i}`} alt="Expert" />
                                  </div>
                                ))}
                             </div>
                             <div className="px-2">
                                <p className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">12+ Experts Online</p>
                                <p className="text-[8px] text-emerald-500 font-bold uppercase tracking-widest leading-none">Ready to help</p>
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* CATEGORY FILTERS */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
                       {['All Experts', 'Chartered Accountants', 'Company Secretaries', 'Corporate Lawyers', 'IP & Trademark', 'Startup Advisors'].map((cat, i) => (
                         <button key={i} className={cn(
                           "px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-2",
                           i === 0 ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/10" : "bg-white text-slate-400 border-slate-100 hover:border-blue-600 hover:text-blue-600"
                         )}>
                            {cat}
                         </button>
                       ))}
                    </div>

                    {/* EXPERT GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       {[
                         { 
                           name: 'CA Vikram Mehta', 
                           role: 'Taxation & Audit Specialist', 
                           exp: '14+ Yrs', 
                           rating: '4.9', 
                           reviews: '1.2k',
                           badges: ['Ex-Big4', 'Startup Guru'],
                           qual: 'FCA, DISA (ICAI)',
                           price: '₹1,499',
                           avail: 'Available in 15m',
                           img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram'
                         },
                         { 
                           name: 'CS Advaita Iyer', 
                           role: 'Corporate Governance & ROC', 
                           exp: '9+ Yrs', 
                           rating: '5.0', 
                           reviews: '850',
                           badges: ['M&A Expert', 'Compliance First'],
                           qual: 'ACS, LLB',
                           price: '₹1,200',
                           avail: 'Next: 4:30 PM',
                           img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Advaita'
                         },
                         { 
                           name: 'Adv. Sameer Khanna', 
                           role: 'Intellectual Property Lawyer', 
                           exp: '11+ Yrs', 
                           rating: '4.8', 
                           reviews: '420',
                           badges: ['Patent Pro', 'Court Litigator'],
                           qual: 'LLM (NALSAR)',
                           price: '₹2,500',
                           avail: 'Available Now',
                           img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sameer'
                         },
                         { 
                           name: 'CA Rahul Srinivasan', 
                           role: 'International Tax & FEMA', 
                           exp: '18+ Yrs', 
                           rating: '4.9', 
                           reviews: '2.1k',
                           badges: ['FEMA Expert', 'NRIs Choice'],
                           qual: 'FCA, CPA (USA)',
                           price: '₹3,500',
                           avail: 'By Appointment',
                           img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul'
                         }
                       ].map((expert, i) => (
                         <div key={i} className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-50 transition-colors" />
                            
                            <div className="flex gap-8 relative z-10">
                               <div className="space-y-4">
                                  <div className="w-24 h-24 rounded-3xl bg-slate-50 border-2 border-white shadow-md overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                                     <img src={expert.img} alt={expert.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex items-center justify-center gap-1 bg-amber-50 text-amber-600 py-1.5 rounded-xl">
                                     <Star size={12} fill="currentColor" />
                                     <span className="text-[10px] font-black">{expert.rating}</span>
                                  </div>
                               </div>

                               <div className="flex-1 space-y-4">
                                  <div>
                                     <div className="flex items-center gap-2">
                                        <h4 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors">{expert.name}</h4>
                                        <CheckCircle2 size={16} className="text-blue-500" />
                                     </div>
                                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{expert.role}</p>
                                  </div>

                                  <div className="flex flex-wrap gap-2">
                                     {expert.badges.map((b, bi) => (
                                       <span key={bi} className="px-2 py-1 bg-slate-50 text-slate-500 text-[8px] font-black uppercase tracking-widest rounded-md border border-slate-100">
                                          {b}
                                       </span>
                                     ))}
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                     <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Exp</p>
                                        <p className="text-xs font-black italic text-slate-900">{expert.exp}</p>
                                     </div>
                                     <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Quals</p>
                                        <p className="text-xs font-black italic text-slate-900 truncate">{expert.qual}</p>
                                     </div>
                                  </div>
                               </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between relative z-10">
                               <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Consultation Fee</p>
                                  <p className="text-2xl font-black italic tracking-tighter text-slate-900">{expert.price}<span className="text-xs text-slate-400 font-medium tracking-normal">/30 min</span></p>
                                </div>
                                <div className="flex gap-3">
                                   <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-500 transition-all border border-transparent hover:border-emerald-100">
                                      <Phone size={18} />
                                   </button>
                                   <Button className="h-12 px-6 rounded-2xl bg-slate-900 text-white font-black italic uppercase tracking-tighter group-hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-slate-900/10 group-hover:shadow-blue-600/20">
                                      Connect Now
                                   </Button>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-2">
                               <div className={cn(
                                 "w-2 h-2 rounded-full animate-pulse",
                                 expert.avail.includes('Now') || expert.avail.includes('15m') ? 'bg-emerald-500' : 'bg-amber-400'
                               )} />
                               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{expert.avail}</p>
                            </div>
                         </div>
                       ))}
                    </div>

                    {/* HISTORY SECTION */}
                    <div className="space-y-8">
                       <div className="flex items-center justify-between">
                          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Recent Consultations</h3>
                          <div className="h-px flex-1 bg-slate-100 mx-8" />
                       </div>
                       
                       <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm">
                          <div className="divide-y divide-slate-50">
                             {[
                               { expert: 'CS Advaita Iyer', date: '24 Apr, 2026', type: 'Video call', status: 'Completed', topic: 'Board Resolution Review', duration: '45m' },
                               { expert: 'CA Vikram Mehta', date: '12 Apr, 2026', type: 'Chat session', status: 'Completed', topic: 'GST Audit Query', duration: '20m' }
                             ].map((session, i) => (
                               <div key={i} className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors">
                                  <div className="flex items-center gap-6">
                                     <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 ring-4 ring-blue-50/50">
                                        {session.type.includes('Video') ? <Video size={20} /> : <MessageSquare size={20} />}
                                     </div>
                                     <div>
                                        <p className="text-sm font-black uppercase italic tracking-tight text-slate-900">{session.topic}</p>
                                        <div className="flex items-center gap-3 mt-1">
                                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">With {session.expert}</span>
                                           <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{session.date}</span>
                                        </div>
                                     </div>
                                  </div>
                                  <div className="flex items-center gap-8">
                                     <div className="text-right hidden md:block">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Duration</p>
                                        <p className="text-xs font-black italic text-slate-900">{session.duration}</p>
                                     </div>
                                     <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                                        {session.status}
                                     </div>
                                     <button className="h-10 px-6 rounded-xl border border-slate-200 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all">
                                        View Summary
                                     </button>
                                  </div>
                               </div>
                             ))}
                          </div>
                          <div className="p-6 bg-slate-50/50 border-t border-slate-50 text-center">
                             <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">View All Consultation History</button>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="other"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-[60vh] text-slate-300"
                  >
                    <LayoutDashboard size={64} className="mb-6 opacity-20" />
                    <p className="text-xl font-black italic uppercase tracking-tighter">{activeTab} Section Coming Soon</p>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>
      </main>

      {/* AI ASSISTANT WIDGET */}
      <div className="fixed bottom-6 right-6 z-[100]">
         <AnimatePresence>
            {isAiOpen && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="absolute bottom-16 right-0 w-[calc(100vw-32px)] sm:w-[340px] bg-white/95 backdrop-blur-xl rounded-[24px] shadow-[0_32px_64px_-24px_rgba(0,0,0,0.2)] border border-white/40 overflow-hidden flex flex-col z-[100]"
              >
                 <div className="bg-slate-900 p-4 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 flex items-center justify-between">
                       <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                             <Bot size={16} />
                          </div>
                          <div>
                             <h4 className="text-[10px] font-black italic uppercase tracking-tight">Pulse AI</h4>
                             <div className="flex items-center gap-1">
                                <div className="w-1 h-1 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest italic">Active</p>
                             </div>
                          </div>
                       </div>
                       <button onClick={() => setIsAiOpen(false)} className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded-md transition-colors border border-white/5">
                          <X size={14} />
                       </button>
                    </div>
                 </div>

                 <div className="h-64 p-5 overflow-y-auto space-y-3">
                    <div className="flex gap-2.5">
                       <div className="w-6 h-6 rounded-md bg-slate-50 flex-shrink-0 flex items-center justify-center text-blue-600">
                          <Bot size={12} />
                       </div>
                       <div className="p-3 bg-slate-50 rounded-xl rounded-tl-none">
                          <p className="text-[10px] font-medium text-slate-700 italic leading-relaxed">
                            Hello Aryan! Assistant here. How can I help?
                          </p>
                       </div>
                    </div>
                 </div>

                 <div className="p-4 border-t border-slate-50 bg-slate-50/50">
                    <div className="relative group">
                       <input 
                         type="text"
                         placeholder="Type message..."
                         value={aiMessage}
                         onChange={(e) => setAiMessage(e.target.value)}
                         className="w-full h-10 pl-4 pr-12 rounded-lg bg-white border-2 border-transparent focus:border-blue-600 outline-none transition-all text-[10px] font-bold shadow-sm"
                       />
                       <button className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-white shadow-lg shadow-blue-500/20 active:scale-90 transition-all">
                          <ArrowRight size={10} />
                       </button>
                    </div>
                 </div>
              </motion.div>
            )}
         </AnimatePresence>

         <button 
           onClick={() => setIsAiOpen(!isAiOpen)}
           className="w-11 h-11 bg-slate-900 text-white rounded-[16px] flex items-center justify-center shadow-3xl shadow-black/20 hover:scale-105 active:scale-95 transition-all group"
         >
            {isAiOpen ? <X size={16} /> : (
              <div className="relative">
                 <Bot size={18} />
                 <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-[2.5px] border-slate-900 group-hover:scale-110 transition-transform" />
              </div>
            )}
         </button>
      </div>

    </div>
  );
}
