import React, { useState, useEffect } from 'react';
import { 
  ArrowRight,
  ShieldCheck, 
  Award, 
  Search, 
  Menu, 
  X, 
  BadgeCheck,
  CreditCard,
  MessageSquare,
  Lock,
  Mic,
  Sparkles,
  UserCheck,
  Clock,
  PhoneCall,
  Receipt,
  FileSearch,
  Zap,
  ShieldAlert,
  XCircle,
  Users,
  ChevronDown,
  Bot,
  Heart,
  Briefcase,
  Wallet,
  Building2,
  Rocket,
  ClipboardCheck,
  Globe,
  TrendingUp,
  Scale,
  CheckCircle2,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import Button from '@/src/components/Button';
import { cn } from '@/src/lib/utils';

// --- MOCK DATA FOR AI SEARCH ---
const SEARCH_DATABASE = [
  {
    id: 'gst',
    type: 'service',
    intent: ['gst', 'registration', 'tax', 'gstin', 'mumbai'],
    title: 'GST Registration',
    price: '₹1,499',
    breakdown: '₹1,499 (Pro) + ₹0 (Govt)',
    timeline: '3–5 Days',
    expert: { name: 'Rahul Sharma', role: 'CA', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop', response: '5 mins' },
    description: 'Complete registration with ARN tracking and certificate issuance.'
  },
  {
    id: 'pvt-ltd',
    type: 'service',
    intent: ['company', 'startup', 'pvt ltd', 'incorporation', 'business', 'start'],
    title: 'Pvt Ltd Incorporation',
    price: '₹5,999',
    breakdown: '₹3,499 (Pro) + ₹2,500 (Govt)',
    timeline: '7–10 Days',
    expert: { name: 'Priya S.', role: 'CS', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop', response: '12 mins' },
    description: 'Includes DIN, DSC, PAN, TAN, and MoA/AoA drafting.'
  },
  {
    id: 'trademark',
    type: 'service',
    intent: ['trademark', 'logo', 'brand', 'ipr', 'copyright', 'name'],
    title: 'Trademark Filing',
    price: '₹9,999',
    breakdown: '₹5,499 (Pro) +  ₹4,500 (Govt)',
    timeline: '24 Hours (Filing)',
    expert: { name: 'Adv. Sameer', role: 'IP Attorney', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', response: '8 mins' },
    description: 'Public search report and class consultation included.'
  },
  {
    id: 'cs-services',
    type: 'service',
    intent: ['cs', 'company secretary', 'compliance', 'roc', 'secretarial'],
    title: 'CS Services Online',
    price: '₹2,499',
    breakdown: '₹2,499 (Pro) + Variable (Govt)',
    timeline: '2–7 Days',
    expert: { name: 'CS Amit Verma', role: 'CS', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', response: '3 mins' },
    description: 'Annual filings, ROC compliance, and board resolutions managed by professionals.',
    link: '/cs-services'
  }
];

const EXAMPLES = [
  "I want to start a Pvt Ltd company",
  "How much for GST registration?",
  "Trademark my brand name",
  "Mera certificate kaha tak pahucha?",
  "Talk to a lawyer for divorce"
];

import Logo from '@/src/components/Logo';
import ReferralWidget from '@/src/components/ReferralWidget';
import DynamicHeroText from '@/src/components/Campaigns/DynamicHeroText';

import { useCampaign } from '@/src/services/CampaignContext';
import { useAuth } from '@/src/context/AuthContext';
import { isMock } from '@/src/lib/firebase';

export default function LandingPage() {
  const { recordSearch } = useCampaign();
  const { user, loginWithOTP, login } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [activeExpertCategory, setActiveExpertCategory] = useState<string | null>(null);
  const [isConsultDropdownOpen, setIsConsultDropdownOpen] = useState(false);
  const [selectedExpertType, setSelectedExpertType] = useState<'CA' | 'CS' | 'Lawyer'>('Lawyer');
  const [viewState, setViewState] = useState<'home' | 'experts' | 'booking'>('home');
  const [selectedExpert, setSelectedExpert] = useState<any>(null);
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(1); // 1: Slot, 2: Payment, 3: Success
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 30 Apr');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const DATES = ['Today, 29 Apr', 'Tomorrow, 30 Apr', '01 May', '02 May'];
  const SLOTS = {
    Morning: ['09:00 AM', '10:00 AM', '11:00 AM'],
    Afternoon: ['01:00 PM', '02:00 PM', '04:00 PM'],
    Evening: ['06:00 PM', '07:00 PM', '08:00 PM']
  };

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [authStep, setAuthStep] = useState<1 | 2>(1); // 1: Input, 2: OTP
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSendOtp = () => {
    if (phoneNumber.length >= 10) {
      setAuthError(null);
      setAuthStep(2);
      // In real mode, we should ideally trigger authService.sendOTP here
      // But for this demo, we'll let handleVerifyOtp deal with the actual auth call
    }
  };

  const handleVerifyOtp = async () => {
    setIsVerifying(true);
    setAuthError(null);
    try {
      const otpCode = otp.join('');
      await loginWithOTP(phoneNumber, otpCode);
      setIsAuthModalOpen(false);
      window.location.href = '/dashboard';
    } catch (error: any) {
      console.error("Auth error:", error);
      setAuthError(error.message || "Invalid OTP. Use 123456 for demo.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await login();
      setIsAuthModalOpen(false);
      window.location.href = '/dashboard';
    } catch (error: any) {
      setAuthError("Google Login failed. Please try again.");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Auto-focus next
      if (value && index < 5) {
        (document.getElementById(`otp-${index + 1}`) as HTMLInputElement)?.focus();
      }
    }
  };

  function startBooking(expert: any) {
    setSelectedExpert(expert);
    setViewState('booking');
    setBookingStep(1);
    setSelectedSlot(null);
  }

  // --- MOCK DATABASE FOR EXPERTS ---
  const EXPERTS_DB = [
    {
      id: 1,
      name: 'CA Rahul Sharma',
      role: 'Chartered Accountant',
      exp: '12 Years',
      rating: 4.8,
      reviews: 1240,
      price: '₹499',
      response: '2 mins',
      tags: ['GST', 'Income Tax', 'Audit'],
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop',
      online: true,
      category: 'CA'
    },
    {
      id: 2,
      name: 'Adv. Priya Malhotra',
      role: 'Corporate Lawyer',
      exp: '8 Years',
      rating: 4.9,
      reviews: 850,
      price: '₹999',
      response: '5 mins',
      tags: ['Business', 'Contracts', 'IPR'],
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
      online: true,
      category: 'Lawyer'
    },
    {
      id: 3,
      name: 'CS Amit Verma',
      role: 'Company Secretary',
      exp: '10 Years',
      rating: 4.7,
      reviews: 620,
      price: '₹799',
      response: '3 mins',
      tags: ['ROC', 'Compliance', 'Pvt Ltd'],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
      online: false,
      category: 'CS'
    }
  ];

  const EXPERT_CATEGORIES = {
    Lawyer: [
      { name: 'Property & Real Estate', icon: ShieldCheck },
      { name: 'Family & Divorce Law', icon: Heart },
      { name: 'Criminal Defense', icon: ShieldAlert },
      { name: 'Business & Corporate', icon: Briefcase },
      { name: 'Consumer & Civil', icon: Scale },
      { name: 'Intellectual Property', icon: BadgeCheck },
      { name: 'Employment Law', icon: Users }
    ],
    CA: [
      { name: 'GST & Indirect Tax', icon: Receipt },
      { name: 'Income Tax Planning', icon: Wallet },
      { name: 'Audit & Assurance', icon: FileSearch },
      { name: 'Corporate Taxation', icon: Building2 },
      { name: 'Wealth Management', icon: TrendingUp }
    ],
    CS: [
      { name: 'Company Incorporation', icon: Rocket },
      { name: 'ROC Compliance', icon: ClipboardCheck },
      { name: 'Foreign Investment', icon: Globe },
      { name: 'Secretarial Audit', icon: ShieldCheck },
      { name: 'FEMA Compliance', icon: Zap }
    ]
  };

  // Handle Search Interaction (Simple Intent Matcher)
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (query.length > 3) {
      const match = SEARCH_DATABASE.find(item => 
        item.intent.some(i => query.includes(i)) || 
        item.title.toLowerCase().includes(query)
      );
      setSearchResult(match || null);
      if (match) {
        recordSearch(match.id); // Record the specific service search
      }
    } else {
      setSearchResult(null);
    }
  }, [searchQuery]);

  const TITLE_OBJECTIVES = ["STARTUP", "FILINGS", "TAXES", "CONTRACTS", "TRADEMARK", "MSME", "FSSAI", "ADVISORY"];
  const [titleComplianceWord, setTitleComplianceWord] = useState(TITLE_OBJECTIVES[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleComplianceWord(prev => {
        const nextIndex = (TITLE_OBJECTIVES.indexOf(prev) + 1) % TITLE_OBJECTIVES.length;
        return TITLE_OBJECTIVES[nextIndex];
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  const COMPLIANCE_OBJECTIVES = [
    "Register a new Startup...",
    "Submit Annual Filings...",
    "Apply for Trademark...",
    "Resolve Consumer Disputes...",
    "Draft Business Contracts...",
    "FSSAI License registration...",
    "Shop & Establishment Act...",
    "Import-Export Code (IEC)..."
  ];

  useEffect(() => {
    let objectiveIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const currentObjective = COMPLIANCE_OBJECTIVES[objectiveIndex];
      
      if (isDeleting) {
        setCurrentPlaceholder(currentObjective.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setCurrentPlaceholder(currentObjective.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentObjective.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        objectiveIndex = (objectiveIndex + 1) % COMPLIANCE_OBJECTIVES.length;
        typeSpeed = 500; // Pause before next
      }

      timeoutId = setTimeout(type, typeSpeed);
    };

    type();
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* --- MINIMAL HEADER --- */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <Logo />
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              {/* CONSULT EXPERT DROPDOWN */}
              <div 
                className="relative group/consult"
                onMouseEnter={() => setIsConsultDropdownOpen(true)}
                onMouseLeave={() => setIsConsultDropdownOpen(false)}
              >
                <button className={cn(
                  "flex items-center gap-1 h-20 text-[11px] font-black uppercase tracking-widest transition-colors",
                  isConsultDropdownOpen ? "text-blue-600" : "text-slate-400"
                )}>
                  Consult an Expert <ChevronDown size={14} className={cn("transition-transform", isConsultDropdownOpen && "rotate-180")} />
                </button>

                {/* MEGA MENU */}
                <AnimatePresence>
                  {isConsultDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-20 left-0 w-[800px] bg-white rounded-3xl shadow-3xl border border-slate-100 overflow-hidden ring-1 ring-black/5"
                    >
                      <div className="flex divide-x divide-slate-100">
                        {/* Left Panel: Expert Types */}
                        <div className="w-64 bg-slate-50 p-6 space-y-2">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">Choose Expert Type</p>
                          {(['CA', 'CS', 'Lawyer'] as const).map(type => (
                            <button
                              key={type}
                              onClick={() => setSelectedExpertType(type)}
                              className={cn(
                                "w-full flex items-center justify-between px-5 py-4 rounded-2xl text-left transition-all",
                                selectedExpertType === type 
                                  ? "bg-white text-blue-600 shadow-xl shadow-blue-500/5 ring-1 ring-blue-100" 
                                  : "text-slate-500 hover:bg-slate-100"
                              )}
                            >
                              <span className="text-sm font-black italic uppercase tracking-tight">Talk to {type}</span>
                              {selectedExpertType === type && <ArrowRight size={14} />}
                            </button>
                          ))}
                          
                          <div className="mt-12 p-5 bg-blue-600 rounded-2xl text-white">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 italic mb-2">Can't decide?</p>
                            <p className="text-xs font-bold leading-relaxed mb-4">Let our AI match the right expert for your problem.</p>
                            <button className="w-full py-2 bg-white text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-xl">Ask AI Assistant</button>
                          </div>
                        </div>

                        {/* Right Panel: Service Grid */}
                        <div className="flex-1 p-8">
                           <div className="mb-8">
                              <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-blue-500" size={18} />
                                <input 
                                  type="text" 
                                  placeholder={`Describe your problem for a ${selectedExpertType}...`} 
                                  className="w-full h-14 pl-12 pr-6 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-100 text-sm font-bold placeholder:text-slate-300 italic"
                                />
                              </div>
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                              {EXPERT_CATEGORIES[selectedExpertType].map((cat, i) => (
                                <Link 
                                  key={i} 
                                  to={cat.name === 'Company Incorporation' ? '/business-setup' : '/cs-services'}
                                  className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all text-left"
                                >
                                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-blue-600 group-hover:shadow-lg transition-all">
                                    <cat.icon size={20} />
                                  </div>
                                  <div>
                                    <p className="text-xs font-black text-slate-900 uppercase italic tracking-tighter transition-colors group-hover:text-blue-700">{cat.name}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Connect Instantly</p>
                                  </div>
                                </Link>
                              ))}
                           </div>
                           
                           <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Network of 2,400+ Verified Pros</p>
                              <div className="flex gap-6 items-center">
                                <Link to="/expert/join" className="text-xs font-black text-blue-600 uppercase tracking-widest italic group bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                                  Join as Expert <ArrowRight size={14} className="inline ml-1 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <a href="#" className="text-xs font-black text-slate-400 uppercase tracking-widest italic group">View All Categories</a>
                              </div>
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/business-setup" className="h-20 flex items-center text-[11px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Business Setup</Link>
              <Link to="/cs-services" className="h-20 flex items-center text-[11px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Compliance</Link>
              <Link to="/expert/join" className="h-20 flex items-center text-[11px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest transition-colors gap-2">
                 <ShieldCheck size={14} /> Professional Hub
              </Link>
              <Link to="/pricing" className="h-20 flex items-center text-[11px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Pricing</Link>
              <Link to="/services" className="h-20 flex items-center text-[11px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Services</Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Button onClick={() => setIsAuthModalOpen(true)} variant="ghost" className="hidden sm:block font-black text-[11px] uppercase tracking-widest">Login</Button>
            <Button onClick={() => setIsAuthModalOpen(true)} className="font-black text-[11px] uppercase tracking-widest h-12 px-6 rounded-xl shadow-xl shadow-blue-500/10 active:scale-95 transition-all">My Dashboard</Button>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-slate-900">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="p-6 space-y-6">
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">Talk to Experts</p>
                   <div className="grid grid-cols-1 gap-2">
                      {(['Lawyer', 'CA', 'CS'] as const).map(type => (
                        <button 
                          key={type}
                          onClick={() => {
                            setSelectedExpertType(type);
                            setViewState('experts');
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl text-left"
                        >
                          <span className="text-sm font-black uppercase italic tracking-tighter">Talk to {type}</span>
                          <ArrowRight size={14} className="text-blue-600" />
                        </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                   <Link to="/business-setup" className="block text-sm font-black text-slate-900 uppercase italic tracking-tighter">Business Setup</Link>
                   <Link to="/cs-services" className="block text-sm font-black text-slate-900 uppercase italic tracking-tighter">Compliance</Link>
                   <a href="#" className="block text-sm font-black text-slate-900 uppercase italic tracking-tighter">Pricing</a>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                   <Button onClick={() => setIsAuthModalOpen(true)} variant="outline" className="h-12 rounded-xl font-black text-[10px] uppercase tracking-widest">Login</Button>
                   <Button onClick={() => setIsAuthModalOpen(true)} className="h-12 rounded-xl font-black text-[10px] uppercase tracking-widest bg-blue-600">Start Now</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {viewState === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* --- AI HERO SECTION --- */}
              <section className="relative pt-24 pb-48 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/20 -skew-x-12 translate-x-1/4 pointer-events-none" />
                <div className="absolute -top-24 left-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-md border border-blue-100 italic">
                      <ShieldCheck size={12} /> Truth-First Compliance Firm
                    </div>
                    
                    <DynamicHeroText 
                      defaultTitle={
                        <>
                          Solve It <br/>
                          <span className="text-blue-600 inline-flex items-center justify-center h-[1.1em] overflow-hidden relative">
                            <AnimatePresence mode="wait">
                              <motion.span
                                key={titleComplianceWord}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -50, opacity: 0 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="inline-block"
                              >
                                {titleComplianceWord}.
                              </motion.span>
                            </AnimatePresence>
                          </span>
                        </>
                      }
                      defaultSubtitle="Indian business compliance is broken. We fixed it with a smart AI system that understands your problem and assigns experts in 2 minutes."
                    />
                  </motion.div>

                  {/* AI UNIVERSAL SEARCH BOX */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative max-w-2xl mx-auto"
                  >
                    <div className={cn(
                      "bg-white p-2 rounded-[32px] shadow-2xl transition-all duration-500 border-2",
                      isSearchFocused ? "border-blue-600 ring-[12px] ring-blue-500/5" : "border-slate-100"
                    )}>
                      <div className="flex items-center gap-4 px-6 py-4">
                        <div className="text-blue-600">
                          <Search size={28} />
                        </div>
                        <input 
                          id="hero-ai-search-input"
                          type="text" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onFocus={() => setIsSearchFocused(true)}
                          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                          placeholder={currentPlaceholder}
                          className="w-full bg-transparent border-none focus:ring-0 outline-none text-xl text-slate-900 font-bold placeholder:text-slate-300 placeholder:font-medium italic transition-all duration-300"
                        />
                        <button className="p-3 bg-slate-50 hover:bg-blue-50 rounded-2xl text-slate-400 hover:text-blue-600 transition-all group">
                          <Mic size={24} className="group-active:scale-95" />
                        </button>
                      </div>
                    </div>

                    {/* Suggestions / Prompt Examples */}
                    <AnimatePresence>
                      {!searchResult && searchQuery.length < 4 && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-wrap justify-center gap-3 mt-8"
                        >
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest py-1.5 italic">Try:</span>
                          {EXAMPLES.slice(0, 3).map((ex, i) => (
                            <button 
                              key={i} 
                              onClick={() => setSearchQuery(ex)}
                              className="text-[11px] font-black text-slate-600 bg-white hover:bg-blue-600 hover:text-white px-5 py-2 rounded-full border border-slate-200/60 shadow-sm transition-all uppercase tracking-tight italic"
                            >
                              {ex}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* SMART RESPONSE PANEL (Inline Results) */}
                    <AnimatePresence>
                      {searchResult && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 15, scale: 0.95 }}
                          className="absolute top-full left-0 w-full mt-6 text-left z-20"
                        >
                          <div className="bg-white rounded-[40px] shadow-3xl border border-slate-200 overflow-hidden ring-1 ring-black/5">
                            <div className="p-10 space-y-10">
                              <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-blue-600">
                                    <Sparkles size={16} fill="currentColor" className="opacity-20" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">AI Recommended Service</span>
                                  </div>
                                  <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">{searchResult.title}</h3>
                                  <p className="text-slate-400 text-sm font-medium">{searchResult.description}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-5xl font-black text-slate-900 tracking-tighter italic">{searchResult.price}</p>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Flat Package Fee</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-6">
                                   <div className="grid grid-cols-2 gap-4">
                                      <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-white transition-colors">
                                         <Clock size={20} className="text-blue-500 mb-3" />
                                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Timeline</p>
                                         <p className="text-base font-black text-slate-900 uppercase italic">{searchResult.timeline}</p>
                                      </div>
                                      <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-white transition-colors">
                                         <Receipt size={20} className="text-blue-500 mb-3" />
                                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Transparency</p>
                                         <p className="text-xs font-black text-slate-600 uppercase italic opacity-70 leading-tight">{searchResult.breakdown}</p>
                                      </div>
                                   </div>
                                   <div className="flex items-center gap-2 p-4 bg-green-50 rounded-2xl border border-green-100 text-green-700">
                                      <ShieldCheck size={16} />
                                      <span className="text-[10px] font-black uppercase tracking-widest">100% Refundable if rejection persists</span>
                                   </div>
                                </div>

                                <div className="p-7 bg-slate-900 rounded-[32px] text-white space-y-6 relative overflow-hidden group">
                                   <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-all" />
                                   <div className="flex items-center gap-4 relative z-10">
                                      <div className="relative">
                                        <img src={searchResult.expert.avatar} className="w-16 h-16 rounded-2xl border-4 border-slate-800 object-cover shadow-lg" alt="Expert" />
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                                          <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                                        </div>
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Assigned Specialist</p>
                                        <p className="text-xl font-black uppercase italic tracking-tighter">{searchResult.expert.name}</p>
                                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Responds in {searchResult.expert.response}</p>
                                      </div>
                                   </div>
                                   <button className="w-full flex items-center justify-between px-6 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group/btn">
                                      <span className="text-xs font-black uppercase tracking-widest text-slate-400">View Professional Profile</span>
                                      <ArrowRight size={16} className="text-slate-600 group-hover/btn:translate-x-1 transition-transform" />
                                   </button>
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button className="flex-[2] h-20 rounded-[20px] text-xl font-black italic uppercase italic tracking-tighter shadow-2xl shadow-blue-500/30 bg-blue-600 hover:bg-blue-700">
                                  Apply Instantly <ArrowRight className="ml-2" />
                                </Button>
                                <Button variant="outline" className="flex-1 h-20 rounded-[20px] text-xl font-black italic uppercase italic tracking-tighter border-2 border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all">
                                  Talk to {searchResult.expert.name.split(' ')[0]}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </section>

              {/* --- STATS / SOCIAL PROOF --- */}
              <section className="bg-white py-16 border-y border-slate-100 overflow-hidden">
                 <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">TRUSTED BY BUSINESSES REGISTERED ACROSS PLATFORMS</p>
                 </div>
                 
                 <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                    
                    <motion.div 
                      className="flex items-center gap-24 whitespace-nowrap"
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{ 
                        duration: 30, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                    >
                      {[
                        { name: "Razorpay", url: "https://www.logo.wine/a/logo/Razorpay/Razorpay-Logo.wine.svg" },
                        { name: "ICICI Bank", url: "https://www.logo.wine/a/logo/ICICI_Bank/ICICI_Bank-Logo.wine.svg" },
                        { name: "HDFC Bank", url: "https://www.logo.wine/a/logo/HDFC_Bank/HDFC_Bank-Logo.wine.svg" },
                        { name: "Amazon", url: "https://www.logo.wine/a/logo/Amazon_(company)/Amazon_(company)-Logo.wine.svg" },
                        { name: "Flipkart", url: "https://www.logo.wine/a/logo/Flipkart/Flipkart-Logo.wine.svg" },
                        { name: "Hostinger", url: "https://www.logo.wine/a/logo/Hostinger/Hostinger-Logo.wine.svg" },
                        { name: "Google", url: "https://www.logo.wine/a/logo/Google/Google-Logo.wine.svg" },
                        { name: "Zoho", url: "https://www.logo.wine/a/logo/Zoho_Corporation/Zoho_Corporation-Logo.wine.svg" }
                      ].concat([
                        { name: "Razorpay", url: "https://www.logo.wine/a/logo/Razorpay/Razorpay-Logo.wine.svg" },
                        { name: "ICICI Bank", url: "https://www.logo.wine/a/logo/ICICI_Bank/ICICI_Bank-Logo.wine.svg" },
                        { name: "HDFC Bank", url: "https://www.logo.wine/a/logo/HDFC_Bank/HDFC_Bank-Logo.wine.svg" },
                        { name: "Amazon", url: "https://www.logo.wine/a/logo/Amazon_(company)/Amazon_(company)-Logo.wine.svg" },
                        { name: "Flipkart", url: "https://www.logo.wine/a/logo/Flipkart/Flipkart-Logo.wine.svg" },
                        { name: "Hostinger", url: "https://www.logo.wine/a/logo/Hostinger/Hostinger-Logo.wine.svg" },
                        { name: "Google", url: "https://www.logo.wine/a/logo/Google/Google-Logo.wine.svg" },
                        { name: "Zoho", url: "https://www.logo.wine/a/logo/Zoho_Corporation/Zoho_Corporation-Logo.wine.svg" }
                      ]).map((logo, i) => (
                        <div key={i} className="flex items-center gap-4 group cursor-default">
                           <div className="h-10 md:h-12 w-auto flex items-center justify-center">
                              <img 
                                src={logo.url} 
                                alt={logo.name}
                                referrerPolicy="no-referrer"
                                className="h-full w-auto object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                                }}
                              />
                           </div>
                           <span className="text-xs font-black uppercase italic tracking-tighter text-slate-300 group-hover:text-slate-900 transition-colors">
                              {logo.name}
                           </span>
                        </div>
                      ))}
                    </motion.div>
                 </div>

                 <div className="max-w-7xl mx-auto px-6 mt-16 flex justify-center gap-16 border-t border-slate-50 pt-12">
                    <div className="text-center">
                       <p className="text-4xl font-black text-slate-900 tracking-tighter mb-1">240+</p>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Cities Covered</p>
                    </div>
                    <div className="text-center">
                       <p className="text-4xl font-black text-slate-900 tracking-tighter mb-1">98%</p>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Trust Rating</p>
                    </div>
                    <div className="text-center">
                       <p className="text-4xl font-black text-slate-900 tracking-tighter mb-1">10k+</p>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Businesses</p>
                    </div>
                 </div>
              </section>
            </motion.div>
          ) : viewState === 'experts' ? (
            <motion.div
              key="experts"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-7xl mx-auto px-10 py-12"
            >
              <div className="flex items-center gap-4 mb-12">
                <button onClick={() => setViewState('home')} className="p-3 bg-slate-100 rounded-2xl text-slate-900 hover:bg-slate-200 transition-colors">
                  <X size={20} />
                </button>
                <div>
                  <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Available {selectedExpertType}s</h2>
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Matched based on your problem</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {EXPERTS_DB.filter(e => e.category === selectedExpertType).map(expert => (
                  <div key={expert.id} className="bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden group hover:-translate-y-2 transition-all p-8 space-y-8">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <img src={expert.avatar} className="w-24 h-24 rounded-3xl border-4 border-slate-50 object-cover shadow-xl" alt={expert.name} />
                        {expert.online && (
                          <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase border-4 border-white">Online</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest italic">{expert.role}</p>
                          <BadgeCheck size={14} className="text-blue-500" />
                        </div>
                        <h4 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter leading-tight">{expert.name}</h4>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded text-[10px] font-black">
                            <Sparkles size={10} fill="currentColor" /> {expert.rating}
                          </div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">({expert.reviews} Reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 py-6 border-y border-slate-50">
                       <div className="text-center">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Experience</p>
                          <p className="text-sm font-black text-slate-900">{expert.exp}</p>
                       </div>
                       <div className="text-center border-x border-slate-50">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Response</p>
                          <p className="text-sm font-black text-blue-600">{expert.response}</p>
                       </div>
                       <div className="text-center">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Price/Session</p>
                          <p className="text-sm font-black text-slate-900">{expert.price}</p>
                       </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                       {expert.tags.map(tag => (
                         <span key={tag} className="text-[9px] font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 uppercase tracking-widest italic">{tag}</span>
                       ))}
                    </div>

                    <div className="flex gap-4 pt-4">
                       <Button onClick={() => startBooking(expert)} className="flex-1 h-16 rounded-2xl bg-blue-600 font-black italic uppercase tracking-tighter shadow-lg shadow-blue-500/20 active:scale-95 transition-all">Talk Now</Button>
                       <Button onClick={() => startBooking(expert)} variant="outline" className="flex-1 h-16 rounded-2xl border-2 border-slate-200 font-black italic uppercase tracking-tighter hover:bg-slate-50 active:scale-95 transition-all text-slate-600">Book Slot</Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : viewState === 'booking' ? (
            <motion.div
              key="booking"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto px-6 py-12"
            >
              <div className="bg-white rounded-[40px] border border-slate-100 shadow-3xl overflow-hidden">
                {/* FLOW HEADER */}
                <div className="bg-slate-50 px-10 py-6 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setViewState('experts')} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                      <X size={20} />
                    </button>
                    <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">
                      Booking with {selectedExpert?.name.split(' ')[1]}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3].map(step => (
                      <div 
                        key={step} 
                        className={cn(
                          "w-8 h-1.5 rounded-full transition-all",
                          bookingStep >= step ? "bg-blue-600" : "bg-slate-200"
                        )} 
                      />
                    ))}
                  </div>
                </div>

                <div className="p-10">
                  <AnimatePresence mode="wait">
                    {/* STEP 1: SLOT SELECTION */}
                    {bookingStep === 1 && (
                      <motion.div 
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                      >
                        <div className="space-y-6">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">1. Select Appointment Date</p>
                           <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                              {DATES.map(date => (
                                <button
                                  key={date}
                                  onClick={() => setSelectedDate(date)}
                                  className={cn(
                                    "px-6 py-4 rounded-2xl font-black text-xs uppercase italic tracking-widest transition-all whitespace-nowrap border-2",
                                    selectedDate === date ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20" : "bg-slate-50 text-slate-400 border-transparent hover:border-slate-200"
                                  )}
                                >
                                  {date}
                                </button>
                              ))}
                           </div>
                        </div>

                        <div className="space-y-8">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">2. Select Preferred Time Slot</p>
                           {Object.entries(SLOTS).map(([category, times]) => (
                             <div key={category} className="space-y-4">
                                <div className="flex items-center gap-2">
                                   <div className="w-1 h-4 bg-slate-200 rounded-full" />
                                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{category}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                   {times.map(time => (
                                     <button
                                       key={time}
                                       onClick={() => setSelectedSlot(time)}
                                       className={cn(
                                         "p-4 rounded-xl font-bold text-sm transition-all border-2",
                                         selectedSlot === time ? "bg-blue-50 text-blue-600 border-blue-600" : "bg-white text-slate-900 border-slate-100 hover:border-blue-100"
                                       )}
                                     >
                                       {time}
                                     </button>
                                   ))}
                                </div>
                             </div>
                           ))}
                        </div>

                        <div className="pt-6">
                           <Button 
                             disabled={!selectedSlot}
                             onClick={() => setBookingStep(2)}
                             className="w-full h-16 rounded-2xl bg-blue-600 text-lg font-black italic uppercase tracking-tighter shadow-xl shadow-blue-500/20 disabled:opacity-50 disabled:grayscale"
                           >
                             Continue to Payment <ArrowRight className="ml-2" />
                           </Button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: PAYMENT integration */}
                    {bookingStep === 2 && (
                      <motion.div 
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                      >
                         <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl" />
                            <div className="relative z-10 space-y-6">
                               <div className="flex justify-between items-start">
                                  <div>
                                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Consultation with</p>
                                     <p className="text-2xl font-black italic uppercase tracking-tighter">{selectedExpert?.name}</p>
                                  </div>
                                  <div className="text-right">
                                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Fee</p>
                                     <p className="text-2xl font-black text-blue-400 italic tracking-tighter">{selectedExpert?.price}</p>
                                  </div>
                               </div>
                               <div className="h-px bg-white/10" />
                               <div className="flex items-center gap-3">
                                  <Clock size={16} className="text-blue-500" />
                                  <p className="text-sm font-bold text-slate-400">{selectedDate} at {selectedSlot}</p>
                               </div>
                            </div>
                         </div>

                         <div className="space-y-6">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Secure Payment Methods</p>
                             <div className="grid grid-cols-1 gap-4">
                                {[
                                  { name: 'UPI (GPay, PhonePe)', icon: Zap },
                                  { name: 'Credit / Debit Card', icon: CreditCard },
                                  { name: 'Net Banking', icon: Wallet }
                                ].map((method, i) => (
                                  <button key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border-2 border-transparent hover:border-blue-600 hover:bg-blue-50 transition-all group">
                                     <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-blue-600 shadow-sm">
                                           <method.icon size={20} />
                                        </div>
                                        <span className="text-sm font-black uppercase italic tracking-tighter text-slate-700">{method.name}</span>
                                     </div>
                                     <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-blue-600 group-hover:bg-blue-600 flex items-center justify-center transition-all">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100" />
                                     </div>
                                  </button>
                                ))}
                             </div>
                         </div>

                         <div className="pt-6">
                            <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl mb-6">
                               <Lock size={14} />
                               <span className="text-[10px] font-black uppercase tracking-widest italic">256-Bit SSL Encrypted Secure Checkout</span>
                            </div>
                            <Button 
                              onClick={() => {
                                // Simulate API call to notifications
                                console.log('Booking confirmed. Sending SMS to user and expert...');
                                setBookingStep(3);
                              }}
                              className="w-full h-20 rounded-2xl bg-blue-600 text-xl font-black italic uppercase tracking-tighter shadow-3xl shadow-blue-500/30 active:scale-95 transition-all"
                            >
                              Confirm & Pay {selectedExpert?.price}
                            </Button>
                         </div>
                      </motion.div>
                    )}

                    {/* STEP 3: SUCCESS & NOTIFICATIONS */}
                    {bookingStep === 3 && (
                      <motion.div 
                        key="step3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-10 py-10"
                      >
                         <div className="relative mx-auto w-32 h-32 bg-green-500 rounded-full flex items-center justify-center shadow-3xl shadow-green-500/20">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.2 }}
                            >
                              <BadgeCheck size={64} className="text-white" />
                            </motion.div>
                            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20" />
                         </div>

                         <div className="space-y-4">
                            <h3 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">Booking Confirmed!</h3>
                            <p className="text-slate-500 font-medium max-w-sm mx-auto italic leading-relaxed">
                              You session with {selectedExpert?.name} is locked for <span className="text-slate-900 font-black">{selectedDate}</span> at <span className="text-slate-900 font-black">{selectedSlot}</span>.
                            </p>
                         </div>

                         <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 max-w-sm mx-auto space-y-6">
                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Automated Notifications Sent</p>
                            <div className="space-y-3">
                               {[
                                 { l: 'WhatsApp Confirmation', sent: true },
                                 { l: 'Expert SMS Alert', sent: true },
                                 { l: 'Calendar Invite (.ics)', sent: true }
                               ].map((n, i) => (
                                 <div key={i} className="flex items-center justify-between">
                                    <span className="text-[11px] font-bold text-slate-600 italic uppercase">{n.l}</span>
                                    <CheckCircle2 size={14} className="text-green-500" />
                                 </div>
                               ))}
                            </div>
                         </div>

                         <div className="pt-10 flex flex-col gap-4">
                            <Button onClick={() => setViewState('home')} className="h-16 rounded-2xl bg-slate-900 text-white font-black italic uppercase tracking-tighter shadow-3xl shadow-black/10">Go to Dashboard</Button>
                            <Button variant="ghost" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">View Booking History</Button>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* AUTH MODAL */}
        <AnimatePresence>
          {isAuthModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAuthModalOpen(false)}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md bg-white rounded-[40px] shadow-3xl overflow-hidden"
              >
                <div className="p-10 space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <Logo size="lg" showTagline />
                    </div>
                    <button onClick={() => setIsAuthModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                      <X size={20} />
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {authStep === 1 ? (
                      <motion.div
                        key="step-login"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="space-y-4">
                          <p className="text-xl font-black italic uppercase tracking-tight leading-tight">
                            Access Your <span className="text-blue-600">Compliance Portal</span> Instantly.
                          </p>
                          <div className="relative">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2 pr-4 border-r border-slate-100">
                              <Globe size={14} className="text-slate-400" />
                              <span className="text-xs font-black italic tracking-tighter text-slate-900">+91</span>
                            </div>
                            <input 
                              type="tel"
                              placeholder="Mobile Number"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                              className="w-full h-16 pl-24 pr-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white transition-all font-black italic text-lg outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Button 
                            onClick={handleSendOtp}
                            disabled={phoneNumber.length < 10}
                            className="w-full h-16 rounded-2xl bg-blue-600 font-black italic uppercase tracking-tighter shadow-xl shadow-blue-500/20 disabled:grayscale disabled:opacity-50"
                          >
                            Send Verification OTP
                          </Button>
                          {authError && <p className="text-[10px] text-red-500 font-bold bg-red-50 p-2 rounded-lg text-center uppercase tracking-widest">{authError}</p>}
                          <div className="flex items-center gap-4 py-2">
                             <div className="h-px flex-1 bg-slate-100" />
                             <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Or Continue With</span>
                             <div className="h-px flex-1 bg-slate-100" />
                          </div>
                          <button 
                            onClick={handleGoogleLogin}
                            className="w-full h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center gap-3 hover:bg-white hover:border-slate-200 transition-all active:scale-95"
                          >
                             <div className="w-6 h-6 bg-white rounded-md shadow-sm flex items-center justify-center">
                                <Mail size={14} className="text-slate-900" />
                             </div>
                             <span className="text-[11px] font-black italic uppercase tracking-tight">Login with Google</span>
                          </button>
                        </div>

                        <p className="text-[9px] text-center text-slate-400 font-medium px-4 leading-relaxed italic">
                          By continuing, you agree to SolveItIndia's <span className="text-slate-900 underline">Terms of Service</span> and <span className="text-slate-900 underline">Privacy Policy</span>.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="step-otp"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="space-y-2">
                          <p className="text-xl font-black italic uppercase tracking-tight">Verify Your Account</p>
                          <p className="text-xs text-slate-500 font-medium italic">Enter the 6-digit code sent to +91 {phoneNumber}</p>
                        </div>

                        <div className="flex justify-between gap-2">
                          {otp.map((digit, i) => (
                            <input
                              key={i}
                              id={`otp-${i}`}
                              type="text"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleOtpChange(i, e.target.value)}
                              className="w-full h-14 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white text-center font-black text-lg outline-none transition-all"
                            />
                          ))}
                        </div>

                        <div className="space-y-6">
                           <Button 
                             onClick={handleVerifyOtp}
                             disabled={otp.some(d => !d) || isVerifying}
                             className="w-full h-16 rounded-2xl bg-blue-600 font-black italic uppercase tracking-tighter shadow-xl shadow-blue-500/20"
                           >
                             {isVerifying ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                >
                                  <Rocket size={20} />
                                </motion.div>
                             ) : (
                               'Verify & Enter Portal'
                             )}
                           </Button>
                           
                           <div className="text-center">
                              <button onClick={() => setAuthStep(1)} className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic hover:text-blue-600 transition-colors">
                                Didn't get code? <span className="text-blue-600 underline">Resend SMS</span>
                              </button>
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* --- COMPARISON SECTION --- */}
        <section id="comparison" className="py-32 max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-5xl font-black text-slate-900 leading-[0.95] tracking-tight italic uppercase">Truth <br/><span className="text-blue-600">vs. Tradition</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">Most platforms take your money and disappear. We take ownership.</p>
          </div>

          <div className="overflow-x-auto rounded-[40px] border border-slate-200 shadow-xl bg-white">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 uppercase text-[10px] font-black tracking-[0.2em] text-slate-400">
                  <th className="p-10">Comparison Metric</th>
                  <th className="p-10 text-blue-600 bg-blue-50/20 italic">SolveIt India (AI-First)</th>
                  <th className="p-10">Most Competitors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-bold text-sm">
                {[
                  { metric: 'Hidden charges after payment', solve: 'Zero. Locked pricing.', others: 'Frequent "Govt Fee" surprises', icon: ShieldAlert },
                  { metric: 'Assigned Expert', solve: 'One dedicated human specialist', others: 'Random automated generic bot', icon: Users },
                  { metric: 'Response time', solve: 'Under 15 mins guaranteed', others: '3-10 days of chasing', icon: Clock },
                  { metric: 'Transparency', solve: 'Live Zomato-style order tracking', others: 'Black box. No clue where files are.', icon: FileSearch },
                  { metric: 'Refund Policy', solve: 'Automatic if timeline missed', others: 'Impossible. Trap after payment.', icon: Zap },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="p-10 flex items-center gap-4 text-slate-500 group-hover:text-slate-900 transition-colors uppercase italic tracking-tighter">
                      <row.icon size={18} className="text-blue-500/50" /> {row.metric}
                    </td>
                    <td className="p-10 text-blue-600 bg-blue-50/5 underline decoration-blue-500/10">
                      <div className="flex items-center gap-3">
                        <BadgeCheck size={18} className="text-blue-600" /> {row.solve}
                      </div>
                    </td>
                    <td className="p-10 text-slate-400 italic font-medium">
                      <div className="flex items-center gap-3 opacity-40">
                        <XCircle size={18} className="text-red-400" /> {row.others}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* --- HOW IT WORKS (LIVE TRACKER PREVIEW) --- */}
        <section id="how-it-works" className="bg-slate-900 py-32 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600 rounded-full blur-[120px]" />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
            <div className="flex flex-col lg:flex-row gap-24 items-center">
              <div className="flex-1 space-y-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-md border border-white/10 italic">
                  Transparency Engine v2.0
                </div>
                <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase italic">The Black Box <br/><span className="text-blue-500 underline underline-offset-8">is now Open.</span></h2>
                <p className="text-slate-400 text-xl leading-relaxed font-medium max-w-xl italic">
                  Compliance anxiety usually starts <span className="text-white">after</span> you pay. 
                  We give you a Zomato-style live dashboard with 4-hourly auto-updates from gov portals.
                </p>
                <div className="space-y-10">
                  {[
                    { t: 'Secure Payment & Data Vault', d: 'Finish onboarding in 60 seconds. ISO 27001 encrypted storage.' },
                    { t: 'Verified Specialist Audit', d: 'Your dedicated CA (not a junior) audits every document personally.' },
                    { t: 'Real-time Portal Sync', d: 'Direct API status pulls from MCA, GST & Trademark portals.' }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-8 group">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-2xl font-black italic text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl">
                        0{i + 1}
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-white tracking-tighter uppercase italic">{step.t}</h4>
                        <p className="text-slate-500 text-lg font-medium mt-1 italic">{step.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 w-full max-w-md">
                <div className="bg-white/5 rounded-[56px] border border-white/10 p-4 backdrop-blur-md shadow-3xl rotate-2">
                   <div className="bg-slate-800 rounded-[44px] p-10 space-y-10">
                      <div className="flex items-center justify-between">
                        <BadgeCheck className="text-blue-400" size={48} />
                        <div className="text-right">
                          <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest bg-blue-400/10 px-4 py-2 rounded-full border border-blue-400/20">Active Filing</span>
                          <p className="text-[10px] font-bold text-slate-500 mt-3 uppercase tracking-widest">SII-992-TX</p>
                        </div>
                      </div>
                      <div className="space-y-12 relative">
                        <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-slate-700/50" />
                        {[
                          { l: 'Expert Assigned (Rahul S.)', active: true, time: '2m ago' },
                          { l: 'Doc Audit Complete', active: true, time: '1h ago' },
                          { l: 'Gov Portal Submission', active: false, time: 'Pending' },
                          { l: 'Certificate Issue', active: false, time: '---' }
                        ].map((s, i) => (
                          <div key={i} className="flex gap-8 relative z-10 items-center">
                            <div className={cn(
                              "w-10 h-10 rounded-full border-4 border-slate-800 flex items-center justify-center transition-all", 
                              s.active ? "bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)]" : "bg-slate-700"
                            )}>
                               {s.active && <ShieldCheck size={14} className="text-white" />}
                            </div>
                            <div className="flex-1">
                              <span className={cn("text-base font-black uppercase tracking-tight italic", s.active ? "text-white" : "text-slate-500")}>{s.l}</span>
                              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-1">{s.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-6 bg-slate-900 rounded-3xl border border-white/5 flex items-center gap-5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" className="w-14 h-14 rounded-2xl border-2 border-slate-700 relative z-10" alt="expert" />
                        <div className="relative z-10">
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Live Specialist Callback</p>
                          <p className="text-lg font-black text-white uppercase italic tracking-tighter underline decoration-blue-500/30">Connect in 2m</p>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- PRICING SECTION --- */}
        <section id="pricing" className="py-40 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
              <h2 className="text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase italic">No "Surprise" <br/><span className="text-blue-600 underline">Add-on Bills.</span></h2>
              <p className="text-slate-500 text-xl font-medium leading-relaxed italic">
                Most platforms lure you with "Free" and bomb you with "Government Fees" 
                at checkout. We reveal every single Paisa upfront—locked and guaranteed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {SEARCH_DATABASE.map((plan, i) => (
                <div key={i} className={cn(
                  "p-12 rounded-[56px] border relative transition-all duration-500 hover:-translate-y-2",
                  i === 1 ? "bg-slate-900 text-white border-blue-600/30 shadow-3xl z-10 scale-105" : "bg-[#F8F9FF] border-slate-200"
                )}>
                  <h3 className={cn("text-4xl font-black italic uppercase tracking-tighter mb-4", i === 1 ? "text-white" : "text-slate-900")}>{plan.title}</h3>
                  <div className="flex items-baseline gap-2 mb-10">
                    <span className="text-6xl font-black tracking-tighter">{plan.price}</span>
                    <span className={cn("text-[10px] font-black uppercase tracking-widest", i === 1 ? "text-slate-500" : "text-slate-400")}>Total Package</span>
                  </div>
                  
                  <div className="space-y-5 mb-12">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                       <span className={i === 1 ? "text-slate-500" : "text-slate-400"}>Fee Breakdown</span>
                       <span className={i === 1 ? "text-blue-400" : "text-blue-600"}>{plan.breakdown}</span>
                    </div>
                    <div className="h-px bg-slate-200/20" />
                    <div className="space-y-4">
                      {['ISO Certified Audit', 'Dedicated RM', 'Portal Auto-updates', '100% Refundable'].map(f => (
                        <div key={f} className="flex gap-3 items-center">
                          <ShieldCheck size={16} className="text-blue-500" />
                          <span className={cn("text-[11px] font-black uppercase tracking-tight italic", i === 1 ? "text-slate-300" : "text-slate-600")}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className={cn(
                    "w-full h-16 rounded-[24px] text-lg font-black italic uppercase tracking-tighter shadow-2xl",
                    i === 1 ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/40" : "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-slate-200/50"
                  )}>
                    Select Package
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- GLOBAL CTA --- */}
        <section className="py-40 bg-blue-600 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500 skew-x-12 translate-x-1/4 pointer-events-none" />
           <div className="max-w-4xl mx-auto px-6 text-center space-y-10 relative z-10">
              <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase italic">Ready to <br/>solve it?</h2>
              <p className="text-blue-100 text-xl font-medium max-w-xl mx-auto italic">
                Join 2,400+ entrepreneurs who chose transparency over tradition this month. 
                Talk to an expert in under 120 seconds.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                 <Button onClick={() => setIsAuthModalOpen(true)} className="h-20 px-12 bg-white text-blue-600 hover:bg-blue-50 rounded-[28px] text-xl font-black uppercase italic tracking-tighter shadow-3xl">Talk to Expert Now</Button>
                 <Button onClick={() => setIsAuthModalOpen(true)} variant="outline" className="h-20 px-12 border-white/30 bg-transparent text-white hover:bg-white/10 rounded-[28px] text-xl font-black uppercase italic tracking-tighter">View All Services</Button>
              </div>
           </div>
        </section>

        {/* --- EXPERT ONBOARDING SECTION --- */}
        <section className="py-32 bg-slate-50 border-t border-slate-200 overflow-hidden relative">
           <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                 <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-md border border-blue-200 italic">
                      <ShieldCheck size={12} /> Work with us
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase italic">Are you a <br/><span className="text-blue-600">Professional?</span></h2>
                    <p className="text-slate-500 text-xl font-medium leading-relaxed italic">
                      Join India's most advanced digital legal firm. Get a dedicated profile, manage clients seamlessly, and grow your practice with our AI-powered platform.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                       {[
                         { l: '0% Listing Fee', d: 'Pay only on successful leads' },
                         { l: 'Daily Queries', d: 'Receive high-quality business leads' },
                         { l: 'Easy Payouts', d: 'Settlements within 24 hours' },
                         { l: 'Tech First', d: 'Digital diary & case management' }
                       ].map((f, i) => (
                         <div key={i} className="space-y-1">
                            <p className="text-[11px] font-black uppercase tracking-widest text-slate-900">{f.l}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">{f.d}</p>
                         </div>
                       ))}
                    </div>
                    <Link to="/expert/join">
                      <Button className="h-16 px-10 rounded-2xl bg-slate-900 text-white font-black uppercase italic tracking-tighter shadow-2xl mt-4">
                        Register as Expert <ArrowRight className="ml-2" />
                      </Button>
                    </Link>
                 </div>
                 <div className="relative">
                    <div className="bg-white rounded-[60px] p-12 border border-slate-200 shadow-3xl relative z-10 rotate-3">
                       <div className="space-y-8">
                          <div className="flex items-center gap-4">
                             <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                <Users size={32} />
                             </div>
                             <div>
                                <p className="text-2xl font-black uppercase italic tracking-tighter">500+ Experts Joined</p>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">Last 30 Days</p>
                             </div>
                          </div>
                          <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 italic space-y-4">
                             <p className="text-slate-600 font-medium leading-relaxed font-serif text-lg">
                               "SolveIt India has completely changed how I manage my CA practice. The client quality is exceptional and the dashboard is miles ahead of anything else."
                             </p>
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-200" />
                                <div>
                                   <p className="text-xs font-black uppercase italic tracking-tighter">CA Vineet Agarwal</p>
                                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Mumbai, IN</p>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600 rounded-full blur-[100px] opacity-20" />
                 </div>
              </div>
           </div>
        </section>
        <ReferralWidget />
        <div className="fixed bottom-6 right-6 z-[100]">
           <AnimatePresence>
              {isAiOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  className="absolute bottom-16 right-0 w-[calc(100vw-32px)] sm:w-[340px] bg-white rounded-[24px] shadow-4xl border border-slate-100 overflow-hidden flex flex-col"
                >
                   <div className="bg-slate-900 p-4 text-white flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                         <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                            <Bot size={16} />
                         </div>
                         <div>
                            <p className="text-[10px] font-black italic uppercase tracking-tight">SolveIt AI</p>
                            <div className="flex items-center gap-1">
                               <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
                               <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest italic">Live</p>
                            </div>
                         </div>
                      </div>
                      <button onClick={() => setIsAiOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                         <X size={14} />
                      </button>
                   </div>
  
                   <div className="h-64 p-5 overflow-y-auto space-y-3">
                      <div className="flex gap-2.5">
                         <div className="w-6 h-6 rounded-md bg-slate-50 flex-shrink-0 flex items-center justify-center text-blue-600">
                            <Bot size={12} />
                         </div>
                         <div className="p-3 bg-slate-50 rounded-xl rounded-tl-none">
                            <p className="text-[10px] font-medium text-slate-700 italic leading-relaxed">
                              Hello! Assistant here. How can I help?
                            </p>
                         </div>
                      </div>
                   </div>
  
                   <div className="p-4 border-t border-slate-50 bg-slate-50/30">
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
             className="bg-slate-900 text-white flex items-center gap-2.5 pr-4 pl-1.5 py-1.5 rounded-full shadow-3xl border border-white/10 hover:scale-105 active:scale-95 transition-all group"
           >
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40 relative">
                {isAiOpen ? <X size={16} /> : <Bot size={16} className="group-hover:rotate-12 transition-transform" /> }
                {!isAiOpen && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse" />
                )}
              </div>
              <div className="text-left">
                <p className="text-[7px] font-black uppercase tracking-widest text-blue-400 leading-none mb-1">AI Assistant</p>
                <p className="text-[8px] font-black uppercase tracking-widest leading-none">SolveIt Pulse</p>
              </div>
           </button>
        </div>
      </main>

      <footer className="bg-slate-900 text-white pt-32 pb-20 overflow-hidden relative">
         <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
         <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
               <div className="space-y-8">
                  <Logo variant="light" size="lg" showTagline />
                  <p className="text-slate-500 text-sm font-medium leading-relaxed italic">
                    The anti-CA firm. Built for founders who hate paperwork, hidden fees, and chasing progress. ISO 27001 Certified Security.
                  </p>
               </div>
               <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-8 italic">Popular Services</h4>
                  <nav className="flex flex-col gap-4">
                     {['GST Registration', 'Pvt Ltd Setup', 'Trademark Search', 'Audit & Tax'].map(link => (
                        <a key={link} href="#" className="font-black text-sm uppercase italic tracking-tighter hover:text-blue-400 transition-colors">{link}</a>
                     ))}
                  </nav>
               </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-8 italic">Professionals</h4>
                  <nav className="flex flex-col gap-4">
                     <Link to="/expert/join" className="font-black text-sm uppercase italic tracking-tighter hover:text-blue-400 transition-colors">Register as Expert</Link>
                     <button onClick={() => setIsAuthModalOpen(true)} className="text-left font-black text-sm uppercase italic tracking-tighter hover:text-blue-400 transition-colors">Expert Login</button>
                     <a href="#" className="font-black text-sm uppercase italic tracking-tighter hover:text-blue-400 transition-colors">Partner Program</a>
                     <Link to="/expert/join" className="font-black text-sm uppercase italic tracking-tighter hover:text-blue-400 transition-colors">Join our Network</Link>
                  </nav>
               </div>
               <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-8 italic">Office HQ</h4>
                  <p className="text-slate-500 text-sm font-bold uppercase italic tracking-tighter">Indiranagar, Bangalore, Karnataka<br/>India — 560038</p>
                  <div className="mt-8 flex gap-4">
                     <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity border border-white/10">
                        <MessageSquare size={20} />
                     </div>
                     <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity border border-white/10">
                        <PhoneCall size={20} />
                     </div>
                  </div>
               </div>
            </div>
            <div className="pt-16 border-t border-white/5 flex flex-col items-center text-center">
               <div className="max-w-4xl space-y-6 text-[11px] font-medium leading-relaxed italic text-slate-500">
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">SolveItIndia is a part of Synckraft Technologies Pvt. Ltd., a company registered under the Companies Act, 2013.</p>
                  <p>
                    <span className="font-black uppercase tracking-widest text-[#FF4D4D] block mb-2">Disclaimer:</span>
                    This website is privately operated and is not affiliated with, endorsed by, or connected to any government authority or department. The information and forms provided on this platform are intended to collect details from users to better understand their requirements and facilitate services.
                  </p>
                  <p>
                    We act as a service platform offering assistance based on user requests. The fees charged on this website are platform and service fees. We may engage third-party professionals or partners to deliver certain services where necessary.
                  </p>
                  <p>
                    This platform does not provide legal advice or legal representation. For legal matters, users are advised to consult a qualified legal professional or law firm.
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-[0.1em]">
                    By using this website, you acknowledge and agree to the above terms.
                  </p>
               </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-10 border-t border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
               <span>&copy; 2026 SolveIt India Private Limited</span>
               <div className="flex gap-10 italic">
                  <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
                  <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
                  <a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
