import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/src/components/Layout';
import Navbar from '@/src/components/Navbar';
import StatCard from '@/src/components/StatCard';
import Badge from '@/src/components/Badge';
import { Chatbot } from '@/src/components/Chatbot';
import RequestServiceModal from '@/src/components/RequestServiceModal';
import { 
  ShieldCheck, 
  Clock, 
  Banknote, 
  FileText, 
  ChevronRight, 
  AlertTriangle,
  Receipt,
  Download,
  Plus,
  Copyright,
  Bot,
  Users,
  Zap,
  BadgeCheck,
  CheckCircle2
} from 'lucide-react';
import Button from '@/src/components/Button';
import { cn } from '@/src/lib/utils';

export default function ClientDashboard() {
  const [isRequestModalOpen, setIsRequestModalOpen] = React.useState(false);

  return (
    <Layout role="client">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="font-black text-2xl md:text-3xl text-slate-900 tracking-tight uppercase italic">Your Command Center</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Active Monitoring On</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 flex items-center gap-2">
            <ShieldCheck className="text-blue-600" size={16} />
            <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Refund Guarantee Active</span>
          </div>
          <Button variant="outline" size="sm" className="relative p-2 rounded-full">
            <Receipt className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Your Dedicated Expert */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Users size={80} />
          </div>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Your Dedicated Expert</h3>
          
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop" 
                className="w-20 h-20 rounded-2xl object-cover shadow-lg border-4 border-slate-50"
                alt="Expert"
              />
              <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-lg border-2 border-white shadow-md">
                <BadgeCheck size={14} />
              </div>
            </div>
            <div>
              <h4 className="font-black text-xl text-slate-900 leading-tight">CA Sunita Sharma</h4>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Senior Compliance Lead</p>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-bold">Response Time</span>
              <span className="text-slate-900 font-black">Under 15 mins</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 text-[10px] uppercase font-black tracking-widest">Chat Now</Button>
              <Button size="sm" variant="outline" className="flex-1 text-[10px] uppercase font-black tracking-widest">Call Expert</Button>
            </div>
          </div>
        </div>

        {/* Live Order Tracker Widget */}
        <div className="lg:col-span-8 bg-slate-900 rounded-3xl p-8 text-white flex flex-col relative overflow-hidden shadow-2xl shadow-slate-900/40">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="flex justify-between items-center mb-10 relative z-10">
            <div>
              <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Live Filing: Pvt Ltd Incorporation</h3>
              <p className="text-xl font-bold mt-1">Est. Completion: 24 Oct <span className="text-slate-500 text-sm font-medium">(4 days left)</span></p>
            </div>
            <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Status: Govt Review</span>
            </div>
          </div>

          <div className="flex justify-between items-center relative z-10">
            {[
              { l: 'Verified', active: true },
              { l: 'Govt Filed', active: true },
              { l: 'Processing', active: true, pulse: true },
              { l: 'Approved', active: false },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-3 flex-1 relative">
                {/* Connector line */}
                {i < 3 && <div className={cn("absolute left-1/2 w-full h-1 top-4 -z-10", s.active ? "bg-blue-500" : "bg-slate-700")} />}
                
                <div className={cn(
                  "w-8 h-8 rounded-full border-4 border-slate-900 flex items-center justify-center transition-all",
                  s.active ? "bg-blue-500 scale-110" : "bg-slate-700 opacity-50",
                  s.pulse && "animate-pulse"
                )}>
                  {s.active && <CheckCircle2 size={12} className="text-white" />}
                </div>
                <span className={cn("text-[9px] font-black uppercase tracking-widest", s.active ? "text-white" : "text-slate-500")}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'GST Compliance', desc: 'Next filing in 22 days', p: 100, color: 'bg-green-500' },
          { label: 'Trademark Search', desc: 'Objection clearance pending', p: 60, color: 'bg-amber-500' },
          { label: 'TDS Returns', desc: 'Quarterly filing completed', p: 100, color: 'bg-green-500' },
        ].map((service, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 hover:shadow-xl transition-all group overflow-hidden">
             <div className="flex justify-between items-start mb-4">
                <h4 className="font-black text-slate-900 uppercase tracking-tight">{service.label}</h4>
                {service.p === 100 && <BadgeCheck className="text-green-500" size={18} />}
             </div>
             <p className="text-xs text-slate-500 font-bold mb-6 italic">"{service.desc}"</p>
             <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                   <span>Progress</span>
                   <span className="text-slate-900">{service.p}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                   <div className={cn("h-full transition-all duration-1000", service.color)} style={{ width: `${service.p}%` }} />
                </div>
             </div>
          </div>
        ))}
        
        {/* Call to action card */}
        <div 
          onClick={() => setIsRequestModalOpen(true)}
          className="bg-blue-600 rounded-3xl p-6 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
            <Plus size={24} strokeWidth={3} />
          </div>
          <h4 className="text-white font-black uppercase tracking-tight">Expand Your Compliance</h4>
          <p className="text-blue-100 text-[10px] font-bold uppercase mt-1">Unlock new services instantly</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-50">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">The Vault: Secure Documents</h3>
          <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">Open Document Center</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Incorporation_Cert.pdf', type: 'Certificate', date: 'Oct 12, 2024' },
            { name: 'ARN_GST_Receipt.pdf', type: 'Receipt', date: 'Oct 05, 2024' }
          ].map((doc, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200">
                  <FileText className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 tracking-tight italic">{doc.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{doc.type} • {doc.date}</p>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                <Download size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <RequestServiceModal 
        isOpen={isRequestModalOpen} 
        onClose={() => setIsRequestModalOpen(false)} 
      />
      
      {/* Risk Alert (If delay occurs) */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40">
        <div className="bg-slate-900 text-white px-8 py-4 rounded-3xl shadow-2xl border-4 border-blue-500/20 flex items-center gap-6 backdrop-blur-xl bg-opacity-95">
          <div className="flex items-center gap-3 pr-6 border-r border-white/10">
             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em]">System Normal</span>
          </div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">All filings are currently within guaranteed timelines.</p>
        </div>
      </div>

      <Chatbot />
    </Layout>
  );
}
