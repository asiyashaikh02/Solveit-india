import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  Clock,
  ArrowLeft,
  Mail,
  Phone,
  Briefcase,
  Award,
  Globe,
  BookOpen
} from 'lucide-react';
import { motion } from 'motion/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import Button from '@/src/components/Button';
import Logo from '@/src/components/Logo';

export default function ExpertPublicProfile() {
  const { id } = useParams();
  const [expert, setExpert] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExpert() {
      if (!id) return;
      if (!db) {
         console.log("Mock Mode: Loading fallback expert profile");
         setExpert({
            name: "Expert Name",
            role: "Legal Consultant",
            experience: 12,
            rating: 4.9,
            bio: "Expert information is currently loaded in demo mode.",
            tags: ["GST", "Legal", "Compliance"],
            isVerified: true
         });
         setLoading(false);
         return;
      }
      try {
        const docRef = doc(db, 'experts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setExpert(docSnap.data());
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchExpert();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black uppercase italic text-slate-400">Loading Profile...</div>;
  if (!expert) return <div className="min-h-screen flex flex-col items-center justify-center gap-4">
    <p className="font-black uppercase italic text-slate-900 text-2xl">Expert Not Found</p>
    <Link to="/"><Button>Back to Home</Button></Link>
  </div>;

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans selection:bg-blue-100">
      <nav className="p-8 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/client/consult">
                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest px-6 h-12 rounded-xl">All Experts</Button>
            </Link>
            <Button className="text-[10px] font-black uppercase tracking-widest px-6 h-12 rounded-xl bg-slate-900 text-white">Login</Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Column: Personal Info Card */}
          <div className="lg:sticky lg:top-32 space-y-6">
            <div className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-3xl text-center">
              <div className="relative inline-block mb-6">
                 <div className="w-32 h-32 rounded-[32px] bg-slate-100 overflow-hidden border-4 border-slate-50 mx-auto">
                    {expert.avatar ? (
                        <img src={expert.avatar} alt={expert.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <Briefcase size={40} />
                        </div>
                    )}
                 </div>
                 {expert.isVerified && (
                     <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full shadow-lg">
                        <ShieldCheck size={20} />
                     </div>
                 )}
              </div>

              <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-1">{expert.name}</h1>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-lg border border-blue-100">{expert.role}</span>
                <div className="flex items-center gap-1 text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-black italic">{expert.rating}</span>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-50">
                 <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest italic">
                    <span className="text-slate-400">Experience</span>
                    <span className="text-slate-900">{expert.experience} Years</span>
                 </div>
                 <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest italic">
                    <span className="text-slate-400">Consultation</span>
                    <span className="text-blue-600">₹{expert.price || '999'} / sessions</span>
                 </div>
              </div>

              <Button className="w-full h-16 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/20 mt-8 font-black uppercase italic tracking-tighter">
                 Book Consultation
              </Button>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl space-y-4">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Contact Information</h4>
               <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-600 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                        <Mail size={16} />
                    </div>
                    <span className="text-xs font-bold italic">Contact via SolveIt</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                        <MapPin size={16} />
                    </div>
                    <span className="text-xs font-bold italic">Delhi, India</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Detailed Bio & Portfolio */}
          <div className="lg:col-span-2 space-y-12">
             <div className="space-y-6">
                <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter border-l-4 border-blue-600 pl-6">
                    Professional <span className="text-blue-600">Bio</span>
                </h2>
                <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm leading-relaxed text-slate-600 font-medium whitespace-pre-line sm:text-lg italic">
                    {expert.bio || "This expert hasn't updated their bio yet. As a verified professional on SolveItIndia, they provide high-quality legal and financial compliance services to startups and small businesses."}
                </div>
             </div>

             <div className="space-y-6">
                <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter border-l-4 border-blue-600 pl-6">
                    Area of <span className="text-blue-600">Expertise</span>
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    {expert.tags?.map((tag: string, i: number) => (
                        <div key={i} className="flex items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm group hover:border-blue-200 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/5 group-hover:scale-110 transition-transform">
                                <CheckCircle2 size={20} />
                            </div>
                            <span className="text-sm font-black uppercase italic tracking-tight">{tag}</span>
                        </div>
                    )) || (
                        <p className="text-slate-400 italic font-bold">General Legal Counsel</p>
                    )}
                </div>
             </div>

             {/* Dynamic Credentials Section */}
             <div className="bg-slate-900 p-10 md:p-16 rounded-[60px] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 opacity-20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10 grid md:grid-cols-3 gap-12 items-center text-center">
                    <div className="space-y-2">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                            <Award className="text-blue-400" size={32} />
                        </div>
                        <p className="text-3xl font-black italic tracking-tighter">98.5%</p>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Client Success</p>
                    </div>
                    <div className="space-y-2">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                            <BookOpen className="text-blue-400" size={32} />
                        </div>
                        <p className="text-3xl font-black italic tracking-tighter">{expert.experience}+</p>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Years in Practice</p>
                    </div>
                    <div className="space-y-2">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                            <Globe className="text-blue-400" size={32} />
                        </div>
                        <p className="text-3xl font-black italic tracking-tighter">Verified</p>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Bar Council/ICAI</p>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
