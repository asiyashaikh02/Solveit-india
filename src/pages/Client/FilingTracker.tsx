import React from 'react';
import Layout from '@/src/components/Layout';
import Badge from '@/src/components/Badge';
import { Download, Search, ChevronLeft, ChevronRight, UploadCloud, Eye, MoreHorizontal, FileText, AlertCircle, Clock } from 'lucide-react';
import Button from '@/src/components/Button';
import { cn } from '@/src/lib/utils';

export default function FilingTracker() {
  const filings = [
    { name: 'GSTR-3B', period: 'Sep 2023', due: 'Oct 20, 2023', status: 'Overdue', variant: 'error', service: 'GST Return' },
    { name: 'TDS Return (Form 26Q)', period: 'Q2 2023-24', due: 'Oct 31, 2023', status: 'Pending', variant: 'warning', service: 'TDS/TCS' },
    { name: 'GSTR-1', period: 'Sep 2023', due: 'Oct 11, 2023', status: 'Filed', variant: 'success', service: 'GST Return' },
    { name: 'PF Return', period: 'Sep 2023', due: 'Oct 15, 2023', status: 'Filed', variant: 'success', service: 'Payroll' },
    { name: 'Income Tax Return (ITR-6)', period: 'FY 2022-23', due: 'Oct 31, 2023', status: 'Pending', variant: 'warning', service: 'Direct Tax' },
  ];

  return (
    <Layout role="client">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-bold text-3xl text-slate-900 tracking-tight">Filing Tracker</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Manage and track your statutory filings.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" /> Export Report
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
            <FileText className="w-6 h-6 fill-current" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Filings</p>
            <p className="text-3xl font-black text-slate-900">142</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-5 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />
          <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-500">
            <Clock className="w-6 h-6 fill-current" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pending</p>
            <p className="text-3xl font-black text-slate-900">12</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-5 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500">
            <AlertCircle className="w-6 h-6 fill-current" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overdue</p>
            <p className="text-3xl font-black text-slate-900">3</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-t-2xl border border-slate-100 border-b-0 p-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4">
          <div className="relative group">
            <label className="absolute -top-2 left-2 px-1 bg-white text-[9px] font-bold text-accent-teal z-10 uppercase">Financial Year</label>
            <select className="pl-4 pr-10 py-2 border border-accent-teal rounded-lg text-sm bg-white font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent-teal/10 shadow-sm shadow-accent-teal/5">
              <option>FY 2023-24</option>
              <option>FY 2022-23</option>
            </select>
          </div>
          <div className="relative group">
            <label className="absolute -top-2 left-2 px-1 bg-white text-[9px] font-bold text-slate-400 z-10 uppercase">Service Type</label>
            <select className="pl-4 pr-10 py-2 border border-slate-200 rounded-lg text-sm bg-white font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent-teal/10">
              <option>All Services</option>
              <option>GST Return</option>
              <option>TDS Return</option>
            </select>
          </div>
          <div className="relative group">
            <label className="absolute -top-2 left-2 px-1 bg-white text-[9px] font-bold text-slate-400 z-10 uppercase">Status</label>
            <select className="pl-4 pr-10 py-2 border border-slate-200 rounded-lg text-sm bg-white font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent-teal/10">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Filed</option>
            </select>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
          <input className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-accent-teal/10" placeholder="Search filings..." type="text" />
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-b-2xl overflow-hidden ambient-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Service Name</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Period</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Due Date</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filings.map((filing, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="font-bold text-slate-900 text-sm tracking-tight">{filing.name}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{filing.service}</div>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-600 font-medium">{filing.period}</td>
                  <td className={cn("px-8 py-5 text-sm font-bold", filing.variant === 'error' ? 'text-red-500' : 'text-slate-900')}>
                    {filing.due}
                  </td>
                  <td className="px-8 py-5">
                    <Badge variant={filing.variant as any} dot>{filing.status}</Badge>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className={cn(
                      "text-sm font-bold flex items-center justify-end gap-1.5 ml-auto hover:underline",
                      filing.status === 'Filed' ? 'text-slate-500' : 'text-accent-teal'
                    )}>
                      {filing.status === 'Filed' ? 'View Receipt' : 'Upload Docs'}
                      {filing.status === 'Filed' ? <Eye className="w-4 h-4" /> : <UploadCloud className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-5 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="text-xs font-medium text-slate-400">
            Showing <span className="font-bold text-slate-900">1</span> to <span className="font-bold text-slate-900">5</span> of <span className="font-bold text-slate-900">142</span> results
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-slate-100 rounded-lg text-slate-300 cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 border border-slate-100 rounded-lg text-slate-600 hover:bg-white shadow-sm transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
