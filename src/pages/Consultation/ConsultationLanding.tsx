import React, { useState, useEffect } from 'react';
import Layout from '@/src/components/Layout';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ChevronRight, 
  Star, 
  Scale, 
  Briefcase, 
  ShieldCheck, 
  Users, 
  Clock, 
  Zap,
  Phone,
  Video,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Gavel,
  Home,
  Heart,
  AlertTriangle,
  FileText,
  BadgeCheck,
  Award,
  BookOpen,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@/src/components/Button';
import { identifyExpertIntent } from '@/src/services/geminiService';
import { cn } from '@/src/lib/utils';
import { auth } from '@/src/lib/firebase';
import { sendBookingConfirmation } from '@/src/services/notificationService';

// Types
type ExpertType = 'CA' | 'CS' | 'LAWYER' | null;

interface LawyerSubCategory {
  id: string;
  name: string;
  icon: any;
  issues: string[];
}

interface UserIntent {
  expertType: string;
  category: string;
  urgency: number;
  reasoning: string;
  suggestedAction: 'TALK_NOW' | 'BOOK_LATER';
}

const LAWYER_CATEGORIES: LawyerSubCategory[] = [
  { 
    id: 'property', 
    name: 'Property & Real Estate', 
    icon: Home, 
    issues: ['Property disputes', 'Real estate transactions', 'Landlord-tenant issues', 'Property registration'] 
  },
  { 
    id: 'family', 
    name: 'Family Law', 
    icon: Heart, 
    issues: ['Divorce', 'Child custody', 'Alimony', 'Adoption', 'Domestic violence'] 
  },
  { 
    id: 'criminal', 
    name: 'Criminal Law', 
    icon: AlertTriangle, 
    issues: ['Fraud / cyber crimes', 'Theft / assault', 'White collar crimes'] 
  },
  { 
    id: 'business', 
    name: 'Business & Corporate', 
    icon: Briefcase, 
    issues: ['Business formation', 'Contracts', 'M&A', 'Corporate governance'] 
  },
  { 
    id: 'consumer', 
    name: 'Consumer & Civil', 
    icon: Scale, 
    issues: ['Consumer fraud', 'Warranty claims', 'Privacy & data protection'] 
  },
  { 
    id: 'ip', 
    name: 'Intellectual Property', 
    icon: ShieldCheck, 
    issues: ['Trademark', 'Patent', 'Copyright', 'Licensing'] 
  },
  { 
    id: 'employment', 
    name: 'Employment Law', 
    icon: Users, 
    issues: ['Employment contracts', 'Workplace disputes', 'Harassment'] 
  }
];

// Mock Experts
const MOCK_EXPERTS = [
  { id: 1, name: 'Adv. Rajesh Kumar', type: 'LAWYER', category: 'Family Law', rating: 4.9, consultations: 1240, price: 1500, time: '10 mins', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop', online: true },
  { id: 2, name: 'CA Sunita Sharma', type: 'CA', category: 'Taxation', rating: 4.8, consultations: 850, price: 1200, time: '15 mins', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop', online: true },
  { id: 3, name: 'CS Amit Verma', type: 'CS', category: 'Corporate', rating: 4.7, consultations: 520, price: 1000, time: '30 mins', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop', online: false },
  { id: 4, name: 'Adv. Meera Reddy', type: 'LAWYER', category: 'Property', rating: 5.0, consultations: 2100, price: 2000, time: '5 mins', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop', online: true },
];

export default function ConsultationLanding() {
  const [step, setStep] = useState(1);
  const [selectedExpertType, setSelectedExpertType] = useState<ExpertType>(null);
  const [selectedLawyerCat, setSelectedLawyerCat] = useState<LawyerSubCategory | null>(null);
  const [searchText, setSearchText] = useState('');
  const [aiIntent, setAiIntent] = useState<UserIntent | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<any>(null);
  const [bookingMode, setBookingMode] = useState<'CHAT' | 'CALL' | 'VIDEO' | null>(null);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  const handleAiSearch = async () => {
    if (!searchText.trim()) return;
    setIsAnalyzing(true);
    try {
      const intent = await identifyExpertIntent(searchText);
      setAiIntent(intent);
      // Auto-navigate based on AI
      if (intent.expertType.toUpperCase() === 'LAWYER') {
        setSelectedExpertType('LAWYER');
        const cat = LAWYER_CATEGORIES.find(c => intent.category.toLowerCase().includes(c.name.toLowerCase()) || c.name.toLowerCase().includes(intent.category.toLowerCase()));
        if (cat) setSelectedLawyerCat(cat);
      } else {
        setSelectedExpertType(intent.expertType.toUpperCase() as ExpertType);
      }
      setStep(3); // Go to expert list
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBooking = (expert: any) => {
    setSelectedExpert(expert);
  };

  const confirmBooking = async () => {
    if (!selectedExpert) return;

    // Simulation of immediate booking details
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    const timeStr = now.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    setIsBookingSuccess(true);
    
    // Trigger Notifications (Email/SMS simulation)
    try {
      await sendBookingConfirmation({
        clientName: auth?.currentUser?.displayName || 'User',
        clientEmail: auth?.currentUser?.email || 'client@example.com',
        expertName: selectedExpert.name,
        consultationType: bookingMode || 'Consultation',
        date: dateStr,
        time: timeStr
      });
    } catch (error) {
      console.error('Failed to trigger notifications:', error);
    }

    setTimeout(() => {
      setIsBookingSuccess(false);
      setSelectedExpert(null);
      setBookingMode(null);
    }, 4000);
  };

  return (
    <Layout role="client">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => window.history.back()}
            className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1 uppercase italic">Consult an Expert</h1>
            <p className="text-slate-500 text-sm font-medium italic">Professional guidance from top CAs, CSs, and Lawyers in India.</p>
          </div>
        </div>

        {/* AI Intent Search */}
        <section className="bg-primary/5 rounded-3xl p-8 border border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles size={120} className="text-primary" />
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
              <Zap size={14} className="fill-primary" />
              AI Powered Matchmaker
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Tell us your issue in plain words</h2>
            <div className="relative group">
              <input 
                type="text" 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
                placeholder="e.g. I need to register a tech startup or landlord is not returning my deposit..." 
                className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-6 pr-16 text-lg focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all shadow-sm"
              />
              <button 
                onClick={handleAiSearch}
                disabled={isAnalyzing}
                className="absolute right-3 top-3 p-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50"
              >
                {isAnalyzing ? <Clock className="animate-spin" size={24} /> : <Search size={24} />}
              </button>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Our AI maps your issue to the right legal or financial expert instantly.
            </p>
          </div>
        </section>

        {/* Dynamic Flow */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm min-h-[500px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900">Select Expert Type</h3>
                  <div className="flex gap-2">
                    <span className="w-8 h-1 rounded-full bg-primary" />
                    <span className="w-8 h-1 rounded-full bg-slate-100" />
                    <span className="w-8 h-1 rounded-full bg-slate-100" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { type: 'CA', title: 'Chartered Accountant', desc: 'Income tax, GST, Audits', icon: Briefcase },
                    { type: 'CS', title: 'Company Secretary', desc: 'ROC Filings, Governance', icon: ShieldCheck },
                    { type: 'LAWYER', title: 'Civil & Criminal Lawyer', desc: 'Legal disputes, Contracts', icon: Gavel },
                  ].map((item) => (
                    <button
                      key={item.type}
                      onClick={() => {
                        setSelectedExpertType(item.type as ExpertType);
                        setStep(item.type === 'LAWYER' ? 2 : 3);
                      }}
                      className="group p-8 rounded-3xl border-2 border-slate-100 hover:border-primary hover:bg-primary/5 text-left transition-all"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 group-hover:bg-primary group-hover:text-white flex items-center justify-center text-slate-600 transition-colors mb-6">
                        <item.icon size={28} />
                      </div>
                      <h4 className="font-bold text-lg text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 mb-6">{item.desc}</p>
                      <div className="flex items-center gap-2 text-primary font-bold text-sm">
                        Select <ArrowRight size={16} />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setStep(1)} className="text-slate-400 hover:text-slate-900 transition-colors">
                      <Zap size={20} className="rotate-180" />
                    </button>
                    <h3 className="text-xl font-bold text-slate-900">Legal Categories</h3>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-8 h-1 rounded-full bg-slate-200" />
                    <span className="w-8 h-1 rounded-full bg-primary" />
                    <span className="w-8 h-1 rounded-full bg-slate-100" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {LAWYER_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedLawyerCat(cat);
                        setStep(3);
                      }}
                      className="p-5 rounded-2xl border border-slate-100 hover:border-primary hover:bg-slate-50 text-left transition-all group"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors">
                          <cat.icon size={20} />
                        </div>
                        <h4 className="font-bold text-slate-900">{cat.name}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cat.issues.slice(0, 3).map(issue => (
                          <span key={issue} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-md">
                            {issue}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setStep(selectedExpertType === 'LAWYER' ? 2 : 1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                      <ChevronRight size={24} className="rotate-180" />
                    </button>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Recommended {selectedExpertType}s</h3>
                      <p className="text-sm text-slate-500">
                        {selectedLawyerCat?.name || "General Specialists"}
                      </p>
                    </div>
                  </div>
                  {aiIntent && (
                    <div className="hidden md:flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-2xl border border-primary/20">
                      <Sparkles size={16} className="text-primary" />
                      <div className="text-xs">
                        <span className="font-bold text-primary block">AI Recommendation</span>
                        <span className="text-slate-600 line-clamp-1">{aiIntent.reasoning}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {MOCK_EXPERTS.filter(e => e.type === selectedExpertType).map((expert) => (
                    <div 
                      key={expert.id}
                      className="group p-6 rounded-3xl border border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all bg-white flex flex-col md:flex-row gap-6 items-center"
                    >
                      <div className="relative shrink-0">
                        <img src={expert.photo} alt={expert.name} className="w-24 h-24 rounded-2xl object-cover" />
                        {expert.online && (
                          <div className="absolute -top-2 -right-2 bg-green-500 border-4 border-white w-6 h-6 rounded-full" title="Online now" />
                        )}
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                          <h4 className="text-lg font-bold text-slate-900">{expert.name}</h4>
                          <BadgeCheck size={18} className="text-blue-500 fill-blue-50" />
                        </div>
                        <p className="text-sm text-slate-500 mb-4">{expert.category} Specialist • {expert.consultations}+ Consultations</p>
                        
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                          <div className="flex items-center gap-1.5 bg-yellow-50 px-2 py-1 rounded-lg">
                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                            <span className="text-xs font-bold text-yellow-700">{expert.rating}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <Clock size={14} />
                            <span className="text-xs font-medium">Wait: {expert.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                            <span className="text-xs">₹</span>
                            <span className="text-base">{expert.price}</span>
                            <span className="text-[10px] text-slate-400 font-normal uppercase">/ session</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 w-full md:w-auto">
                        <Button 
                          onClick={() => handleBooking(expert)}
                          className="w-full md:w-40 flex items-center justify-center gap-2"
                        >
                          <Zap size={16} /> Talk Now
                        </Button>
                        <Button 
                          onClick={() => handleBooking(expert)}
                          variant="outline" 
                          className="w-full md:w-40"
                        >
                          Schedule Later
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Urgent connect banner */}
                <div className="bg-slate-900 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                  <div className="relative z-10 mb-6 md:mb-0">
                    <h3 className="text-xl font-bold mb-2">Need urgent legal advice?</h3>
                    <p className="text-slate-400 text-sm max-w-sm">Connect with our on-call expert team in under 60 seconds.</p>
                  </div>
                  <button className="relative z-10 bg-white text-slate-900 px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-100 transition-all active:scale-95 shadow-xl shadow-white/5">
                    <Phone size={20} className="fill-slate-900" />
                    Connect Instantly
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Verified Experts', desc: 'All professionals go through a 5-step background check and license verification.', icon: ShieldCheck },
            { title: '100% Confidential', desc: 'Your consultations are protected by attorney-client privilege and 256-bit encryption.', icon: Zap },
            { title: 'Transparent Pricing', desc: 'No hidden charges. Pay per session with upfront pricing before you book.', icon: CreditCardIcon }
          ].map((benefit, i) => (
            <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary mb-6">
                <benefit.icon size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">{benefit.title}</h4>
              <p className="text-sm text-slate-500">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Expert Onboarding CTA */}
        <div className="mt-24 bg-slate-900 rounded-[60px] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 opacity-20 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck size={12} /> For Professionals
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">
                Are you a <span className="text-blue-400">Professional</span> Practitioner?
              </h2>
              <p className="text-slate-400 font-medium leading-relaxed max-w-md">
                Join India's fastest growing legal tech platform. Get premium clients, manage your practice digitally, and grow your brand with a dedicated professional profile.
              </p>
              <Link to="/expert/join">
                <Button className="h-16 px-10 rounded-2xl bg-blue-600 font-black uppercase italic tracking-tighter mt-4 hover:scale-105 transition-transform">
                  Register as Expert <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Listing Fee', value: '0%', icon: Award },
                { label: 'Daily Queries', value: '500+', icon: MessageSquare },
                { label: 'Fast Payouts', value: '24h', icon: Zap },
                { label: 'Global Practice', value: 'Digital', icon: Globe }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 p-8 rounded-[40px] border border-white/5 backdrop-blur-sm group hover:bg-white/10 transition-colors">
                  <stat.icon className="text-blue-400 mb-4 opacity-40" size={24} />
                  <div className="text-3xl font-black italic text-white mb-1 tracking-tighter">{stat.value}</div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedExpert && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExpert(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-3xl shadow-2xl z-[70] overflow-hidden"
            >
              {isBookingSuccess ? (
                <div className="p-10 text-center space-y-4">
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
                    <BadgeCheck size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Booking Confirmed!</h3>
                  <p className="text-slate-500">Your session with {selectedExpert.name} is scheduled. You will receive a meeting link shortly.</p>
                </div>
              ) : (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-slate-900">Confirm Consultation</h3>
                    <button onClick={() => setSelectedExpert(null)} className="p-2 hover:bg-slate-50 rounded-full">
                      <Search className="rotate-45" size={20} />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50 rounded-2xl">
                    <img src={selectedExpert.photo} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900">{selectedExpert.name}</h4>
                      <p className="text-sm text-slate-500">{selectedExpert.category} Specialist</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Choose Mode</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'CHAT', icon: MessageSquare, label: 'Chat' },
                          { id: 'CALL', icon: Phone, label: 'Call' },
                          { id: 'VIDEO', icon: Video, label: 'Video' },
                        ].map((mode) => (
                          <button
                            key={mode.id}
                            onClick={() => setBookingMode(mode.id as any)}
                            className={cn(
                              "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all",
                              bookingMode === mode.id 
                                ? "border-primary bg-primary/5 text-primary" 
                                : "border-slate-100 text-slate-400 hover:border-slate-200"
                            )}
                          >
                            <mode.icon size={24} />
                            <span className="text-xs font-bold">{mode.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-4 border-t border-slate-100">
                      <span className="text-slate-500 font-medium">Session Fee</span>
                      <span className="text-xl font-black text-slate-900">₹{selectedExpert.price}</span>
                    </div>

                    <Button 
                      onClick={confirmBooking}
                      disabled={!bookingMode}
                      className="w-full py-4 rounded-2xl text-base"
                    >
                      Process Payment & Book
                    </Button>
                    <p className="text-[10px] text-center text-slate-400">
                      By booking, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
}

function CreditCardIcon(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}
