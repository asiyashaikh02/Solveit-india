import React from 'react';
import Layout from '@/src/components/Layout';
import Navbar from '@/src/components/Navbar';
import StatCard from '@/src/components/StatCard';
import { 
  Users, 
  IndianRupee, 
  Ticket, 
  UserPlus, 
  MoreVertical, 
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  Search
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Button from '@/src/components/Button';
import Badge from '@/src/components/Badge';
import { cn } from '@/src/lib/utils';

const data = [
  { name: 'Jan', value: 5.2 },
  { name: 'Feb', value: 7.8 },
  { name: 'Mar', value: 6.9 },
  { name: 'Apr', value: 9.2 },
  { name: 'May', value: 12.5 },
  { name: 'Jun', value: 14.2 },
];

export default function AdminOverview() {
  return (
    <Layout role="admin">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-bold text-3xl text-slate-900 tracking-tight">Admin Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Monitor key metrics, user activity, and expert assignments.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" /> Export Report
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard label="Total Revenue" value="₹45.2 L" icon={IndianRupee} trend={{ value: '+12%', positive: true }} />
        <StatCard label="Active Users" value="1,248" icon={Users} trend={{ value: '+5.4%', positive: true }} />
        <StatCard label="Open Tickets" value="34" icon={Ticket} footer="Needs Action" description="12 urgent" />
        <StatCard label="Pending Reg." value="12" icon={UserPlus} footer="In Queue" description="8 new today" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 ambient-shadow flex flex-col">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Revenue Growth (Lakhs)</h3>
            <select className="text-xs font-bold text-slate-400 bg-slate-50 border-none rounded-lg px-3 py-1 cursor-pointer">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="p-8 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === data.length - 1 ? '#001f3f' : '#afc8f0'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expert Assignment */}
        <div className="bg-white rounded-xl border border-slate-100 ambient-shadow flex flex-col">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Assign Experts</h3>
            <Badge variant="error" className="py-1">12 Pending</Badge>
          </div>
          <div className="divide-y divide-slate-50 overflow-y-auto max-h-[320px]">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-6 space-y-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{i === 1 ? 'TechFlow Pvt Ltd' : i === 2 ? 'Nexus Retail' : 'Vertex Solutions'}</h4>
                    <p className="text-xs text-slate-400 font-medium">{i === 1 ? 'GST Registration' : i === 2 ? 'Trademark Filing' : 'Annual Compliance'}</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 uppercase">{i === 1 ? 'Today' : i === 2 ? 'Yesterday' : '2 days ago'}</span>
                </div>
                <div className="flex gap-2">
                  <select className="flex-1 text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-accent-teal/10 appearance-none">
                    <option>Select Expert...</option>
                    <option>CA. Rahul Sharma</option>
                    <option>Adv. Sameer Khan</option>
                  </select>
                  <Button size="sm" variant="secondary">Assign</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Activity */}
      <div className="bg-white rounded-xl border border-slate-100 ambient-shadow overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Recent User Activity</h3>
          <button className="text-xs font-bold text-accent-teal hover:underline uppercase tracking-wider">View All Users</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">User Name</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Business</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">KYC Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Services</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {[
                { name: 'Aarav Kumar', code: 'AK', color: 'bg-primary-fixed', business: 'TechFlow Pvt Ltd', status: 'Verified', services: 'GST, Trademark' },
                { name: 'Sneha Menon', code: 'SM', color: 'bg-secondary-fixed', business: 'Nexus Retail', status: 'Pending', services: 'Company Incorporation' },
                { name: 'Rohan Jain', code: 'RJ', color: 'bg-tertiary-fixed', business: 'Vertex Solutions', status: 'Rejected', services: '-' },
              ].map((user, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] text-slate-900 shadow-sm", user.color)}>
                      {user.code}
                    </div>
                    <span className="font-bold text-slate-900">{user.name}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{user.business}</td>
                  <td className="px-6 py-4">
                    <Badge variant={user.status === 'Verified' ? 'success' : user.status === 'Pending' ? 'warning' : 'error'} dot>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{user.services}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-slate-300 hover:text-slate-900">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
