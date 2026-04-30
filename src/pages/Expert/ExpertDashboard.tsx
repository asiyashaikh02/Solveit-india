import React, { useState, useEffect } from 'react';
import Layout from '@/src/components/Layout';
import Navbar from '@/src/components/Navbar';
import StatCard from '@/src/components/StatCard';
import Badge from '@/src/components/Badge';
import { 
  Wallet, 
  CreditCard, 
  Clock, 
  Eye, 
  MoreVertical, 
  Search, 
  Filter, 
  MessageSquare, 
  Phone, 
  UserSquare2,
  Settings,
  Globe,
  Save,
  CheckCircle2,
  Trash2,
  Plus
} from 'lucide-react';
import Button from '@/src/components/Button';
import { cn } from '@/src/lib/utils';
import { db, isMock } from '@/src/lib/firebase';
import { useAuth } from '@/src/context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function ExpertDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'profile'>('overview');
  const [expert, setExpert] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    async function fetchExpert() {
      if (!user) return;
      if (isMock || !db) {
         setExpert({
            name: user.displayName || 'Expert Name',
            role: 'Senior Compliance Consultant',
            experience: '10+ Years',
            expertise: ['ROC', 'GST', 'Income Tax'],
            bio: 'Providing expert compliance solutions for startups and SMEs across India.',
            website: `experts.solveitindia.com/${user.uid}`
          });
          return;
      }
      try {
        const snap = await getDoc(doc(db, 'experts', user.uid));
        if (snap.exists()) {
          setExpert(snap.data());
        } else {
          // Fallback doc for demo if Firestore empty or fails
          setExpert({
            name: user.displayName || 'Expert Name',
            role: 'Senior Compliance Consultant',
            experience: '10+ Years',
            expertise: ['ROC', 'GST', 'Income Tax'],
            bio: 'Providing expert compliance solutions for startups and SMEs across India.',
            website: `experts.solveitindia.com/${user.uid}`
          });
        }
      } catch (e) {
         console.warn("Firestore access failed, using fallback profile");
         setExpert({
            name: user.displayName || 'Expert Name',
            role: 'Senior Compliance Consultant',
            experience: '10+ Years',
            expertise: ['ROC', 'GST', 'Income Tax'],
            bio: 'Providing expert compliance solutions for startups and SMEs across India.',
            website: `experts.solveitindia.com/${user.uid}`
          });
      }
    }
    fetchExpert();
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user || !expert) return;
    if (isMock || !db) {
       console.log("Mock Mode: Save profile skipped");
       return;
    }
    setIsSaving(true);
    try {
      await updateDoc(doc(db, 'experts', user.uid), expert);
      // alert replaced with something better if possible, but keep for now or use console
      console.log("Profile updated");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const tasks = [
    { id: 1, company: 'TechCorp India Pvt Ltd', status: 'Overdue', task: 'GST Annual Return Filing (GSTR-9)', variant: 'error', urgent: true },
    { id: 2, company: 'Sharma Retail Associates', status: 'Pending Sign', task: 'Company Incorporation Documents Verification', variant: 'warning' },
    { id: 3, company: 'Global Trade Links', status: 'Due Next Week', task: 'Quarterly TDS Return Filing', variant: 'neutral' },
  ];

  const clients = [
    { id: 'CLI-8924', name: 'Nexus Innovations Pvt Ltd', type: 'Private Limited', status: 'Active Filing' },
    { id: 'CLI-7731', name: 'Verma & Sons Traders', type: 'Proprietorship', status: 'Awaiting Documents' },
    { id: 'CLI-9102', name: 'BlueWave Consulting LLP', type: 'LLP', status: 'Completed' },
  ];

  return (
    <Layout role="expert">
      <Navbar 
        title={activeTab === 'overview' ? "Welcome back, Expert" : "My Professional Profile"} 
        subtitle={activeTab === 'overview' ? "Here is an overview of your active tasks and client portfolio." : "Manage your public presence and professional details."} 
      />

      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('overview')}
          className={cn(
            "px-6 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
            activeTab === 'overview' ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" : "bg-white text-slate-400 hover:bg-slate-50"
          )}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={cn(
            "px-6 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
            activeTab === 'profile' ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-white text-slate-400 hover:bg-slate-50"
          )}
        >
          My Website Profile
        </button>
      </div>

      {activeTab === 'overview' && (
         <div className="mb-12">
            <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden ring-4 ring-slate-100 italic-text">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-4">
                     <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-lg text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                        <Globe size={12} /> Your Practice Website
                     </div>
                     <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter leading-none">Your Professional <br /> website is Live.</h2>
                     <p className="text-slate-400 text-sm font-medium italic max-w-sm">Share this unique URL with your clients to accept bookings and manage your legal practice online.</p>
                  </div>
                  <div className="w-full md:w-auto flex flex-col gap-3">
                     <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4 backdrop-blur-sm">
                        <code className="text-blue-400 text-xs font-bold truncate">solveitindia.com/e/{user?.uid?.slice(0, 8)}</code>
                        <button 
                          onClick={() => {
                              const url = `${window.location.origin}/expert/profile/${user?.uid}`;
                              navigator.clipboard.writeText(url);
                              // We could use a toast here
                          }}
                          className="bg-white text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all font-sans"
                        >
                           Copy Link
                        </button>
                     </div>
                     <button 
                       onClick={() => window.open(`/expert/profile/${user?.uid}`, '_blank')}
                       className="h-14 rounded-2xl bg-blue-600 text-[10px] text-white font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all hover:bg-blue-500"
                     >
                        View Live Website
                     </button>
                  </div>
               </div>
            </div>
         </div>
      )}

      {activeTab === 'overview' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-8">
            <StatCard 
              label="Current Month Earnings" 
              value="₹1,45,000" 
              icon={Wallet} 
              trend={{ value: '+12%', positive: true }} 
            />
            <StatCard 
              label="Total Payouts (YTD)" 
              value="₹8,90,500" 
              icon={CreditCard} 
              description="Across 42 successful filings" 
            />
            <StatCard 
              label="Pending Clearances" 
              value="₹32,000" 
              icon={Clock} 
              footer="Expected by Friday" 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-8">
            {/* My Tasks */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-100 flex flex-col overflow-hidden ambient-shadow">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-900">My Tasks</h3>
                <button className="text-xs font-bold text-slate-400 hover:text-accent-teal uppercase tracking-wider">View All</button>
              </div>
              <div className="divide-y divide-slate-50">
                {tasks.map(task => (
                  <div key={task.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors relative">
                    <div className={cn("absolute left-0 top-0 bottom-0 w-1", 
                      task.variant === 'error' ? 'bg-red-500' : 
                      task.variant === 'warning' ? 'bg-amber-500' : 'bg-slate-300')} />
                    <div className="space-y-1 ml-2">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-900 text-sm">{task.company}</span>
                        <Badge variant={task.variant as any}>{task.status}</Badge>
                      </div>
                      <p className="text-xs text-slate-500">{task.task}</p>
                    </div>
                    <Button size="sm" variant={task.urgent ? 'secondary' : 'outline'}>
                      {task.id === 1 ? 'Review' : task.id === 2 ? 'Verify Docs' : 'Prepare'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Expert Availability */}
            <div className="lg:col-span-5 bg-primary text-white rounded-xl p-8 relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <UserSquare2 className="w-64 h-64" />
              </div>
              <div className="relative z-10 space-y-6">
                <h3 className="text-2xl font-bold">Expert Availability</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Toggle your status to receive instant consultation requests from premium clients.</p>
                
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-sm font-bold">Currently Accepting Queries</span>
                  </div>
                  <button className="w-11 h-6 bg-accent-teal rounded-full relative p-1 shadow-inner">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" />
                  </button>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Response Rate</span>
                    <span className="font-bold">98%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-teal w-[98%] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Client Roster */}
          <div className="bg-white rounded-xl border border-slate-100 ambient-shadow overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
              <h3 className="font-bold text-lg text-slate-900">Active Client Roster</h3>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Search clients..." 
                    className="pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-accent-teal/10" 
                  />
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" /> Filter
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Client Name</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Business Type</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Service Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Quick Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {clients.map(client => (
                    <tr key={client.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 text-sm">{client.name}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">ID: {client.id}</div>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                        {client.type}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={client.status === 'Completed' ? 'neutral' : 'info'} dot>
                          {client.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 border border-slate-200 rounded-full hover:bg-accent-teal hover:border-accent-teal hover:text-white transition-all">
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          <button className="p-2 border border-[#25D366] text-[#25D366] rounded-full hover:bg-[#25D366] hover:text-white transition-all">
                            <Phone className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-50 bg-slate-50/30 flex justify-center">
              <button className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">Load More Clients</button>
            </div>
          </div>
        </>
      ) : (
        <div className="grid lg:grid-cols-12 gap-gutter">
          {/* Profile Edit Column */}
          <div className="lg:col-span-8 space-y-gutter">
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-3xl space-y-8">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Profile Details</h3>
                  <div className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase flex items-center gap-2 border border-green-100">
                    <CheckCircle2 size={12} /> Verified Expert
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Professional Name</label>
                    <input 
                      value={expert?.name || ''}
                      onChange={e => setExpert({...expert, name: e.target.value})}
                      className="w-full h-14 px-6 bg-slate-50 rounded-2xl border-none font-bold text-slate-900" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Consultation Fee (₹)</label>
                    <input 
                      value={expert?.price || ''}
                      onChange={e => setExpert({...expert, price: e.target.value})}
                      className="w-full h-14 px-6 bg-slate-50 rounded-2xl border-none font-bold text-slate-900" 
                      placeholder="999"
                    />
                  </div>
               </div>

               <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Professional Biography</label>
                  <textarea 
                    value={expert?.bio || ''}
                    onChange={e => setExpert({...expert, bio: e.target.value})}
                    className="w-full h-40 px-6 py-6 bg-slate-50 rounded-3xl border-none font-bold text-slate-900 placeholder:italic" 
                    placeholder="Describe your expertise, specialization and track record..."
                  />
               </div>

               <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Specializations (Tags)</label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {expert?.tags?.map((tag: string, i: number) => (
                      <div key={i} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 group">
                        {tag}
                        <button 
                          onClick={() => setExpert({...expert, tags: expert.tags.filter((_: any, idx: number) => idx !== i)})}
                          className="opacity-40 group-hover:opacity-100 hover:text-red-500 transition-all"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input 
                      value={newTag}
                      onChange={e => setNewTag(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && (setExpert({...expert, tags: [...(expert.tags || []), newTag]}), setNewTag(''))}
                      className="flex-1 h-14 px-6 bg-slate-50 rounded-2xl border-none font-bold text-slate-900" 
                      placeholder="Add a skill (e.g. GST Audit)" 
                    />
                    <Button 
                      onClick={() => {
                        if (newTag) {
                          setExpert({...expert, tags: [...(expert.tags || []), newTag]});
                          setNewTag('');
                        }
                      }}
                      className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center p-0"
                    >
                      <Plus size={20} />
                    </Button>
                  </div>
               </div>

               <Button 
                  onClick={handleUpdateProfile} 
                  disabled={isSaving}
                  className="w-full h-16 rounded-2xl bg-slate-900 text-white font-black uppercase italic tracking-tighter flex items-center justify-center gap-2"
               >
                  {isSaving ? "Saving..." : <><Save size={20} /> Save Professional Profile</>}
               </Button>
            </div>
          </div>

          {/* Preview Column */}
          <div className="lg:col-span-4 space-y-gutter">
            <div className="bg-blue-600 p-8 rounded-[40px] text-white space-y-6 shadow-3xl shadow-blue-500/20">
               <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center border border-white/20">
                  <Globe size={32} />
               </div>
               <div className="space-y-2">
                  <h4 className="text-xl font-black uppercase italic tracking-tighter">Your Practice Website</h4>
                  <p className="text-xs font-medium text-blue-100 leading-relaxed">Share this profile link with your clients for direct bookings and high-trust referrals.</p>
               </div>
               <Link to={`/expert/profile/${user?.uid}`}>
                  <Button className="w-full h-14 rounded-2xl bg-white text-blue-600 font-black uppercase italic tracking-tighter">
                    View Public Profile
                  </Button>
               </Link>
            </div>

            <div className="bg-slate-900 p-8 rounded-[40px] text-white border border-white/10">
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Settings className="text-slate-400" size={24} />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-widest italic">Account Settings</h4>
               </div>
               <div className="space-y-4">
                  <button className="w-full text-left p-4 rounded-2xl hover:bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-all">Change Password</button>
                  <button className="w-full text-left p-4 rounded-2xl hover:bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-all">Payout Preferences</button>
                  <button className="w-full text-left p-4 rounded-2xl hover:bg-white/5 text-[10px] font-black uppercase tracking-widest text-red-400 transition-all">Deactivate Profile</button>
               </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
