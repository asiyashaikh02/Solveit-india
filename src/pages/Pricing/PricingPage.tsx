import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  X, 
  ShieldCheck, 
  Zap, 
  Crown, 
  ArrowRight, 
  ShieldQuestion, 
  MessageCircle,
  Clock,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Button from '@/src/components/Button';
import Logo from '@/src/components/Logo';
import { useNavigate } from 'react-router-dom';

type ServiceType = 'GST' | 'PVT_LTD' | 'TRADEMARK';

interface Plan {
  id: string;
  name: string;
  tagline: string;
  professionalFee: number;
  govtFee: number;
  timeline: string;
  support: string;
  isPopular?: boolean;
  features: { name: string; included: boolean }[];
}

const SERVICE_DATA: Record<ServiceType, { title: string; plans: Plan[] }> = {
  GST: {
    title: 'GST Registration',
    plans: [
      {
        id: 'gst-basic',
        name: 'Basic',
        tagline: 'Self-service with AI assist',
        professionalFee: 499,
        govtFee: 0,
        timeline: '10-12 Days',
        support: 'Email Only',
        features: [
          { name: 'Application Filing', included: true },
          { name: 'Document Checklist', included: true },
          { name: 'GST Portal Login', included: true },
          { name: 'Expert Review', included: false },
          { name: 'Dedicated Manager', included: false },
        ]
      },
      {
        id: 'gst-standard',
        name: 'Standard',
        tagline: 'Expert-led for fast approval',
        professionalFee: 1499,
        govtFee: 0,
        isPopular: true,
        timeline: '5-7 Days',
        support: 'Priority Chat',
        features: [
          { name: 'Application Filing', included: true },
          { name: 'Document Checklist', included: true },
          { name: 'GST Portal Login', included: true },
          { name: 'Expert Review', included: true },
          { name: 'Dedicated Manager', included: false },
        ]
      },
      {
        id: 'gst-premium',
        name: 'Premium',
        tagline: 'VVIP treatment & priority',
        professionalFee: 2999,
        govtFee: 0,
        timeline: '3-4 Days',
        support: 'Call + Dedicated Pro',
        features: [
          { name: 'Application Filing', included: true },
          { name: 'Document Checklist', included: true },
          { name: 'GST Portal Login', included: true },
          { name: 'Expert Review', included: true },
          { name: 'Dedicated Manager', included: true },
        ]
      }
    ]
  },
  PVT_LTD: {
    title: 'Pvt Ltd Incroporation',
    plans: [
      {
        id: 'pvt-basic',
        name: 'Basic',
        tagline: 'Registration Essentials',
        professionalFee: 1999,
        govtFee: 5000,
        timeline: '15 Days',
        support: 'Email',
        features: [
          { name: '2 DIN & DSC', included: true },
          { name: 'Name Approval', included: true },
          { name: 'Standard MOA/AOA', included: true },
          { name: 'Tax Planning', included: false },
          { name: 'Full Compliance Kit', included: false },
        ]
      },
      {
        id: 'pvt-standard',
        name: 'Standard',
        tagline: 'Most Startup Choice',
        professionalFee: 4999,
        govtFee: 5000,
        isPopular: true,
        timeline: '10 Days',
        support: 'WhatsApp Expert',
        features: [
          { name: '2 DIN & DSC', included: true },
          { name: 'Name Approval', included: true },
          { name: 'Standard MOA/AOA', included: true },
          { name: 'Tax Planning', included: true },
          { name: 'Full Compliance Kit', included: false },
        ]
      },
      {
        id: 'pvt-premium',
        name: 'Premium',
        tagline: 'Zero-Hassle Package',
        professionalFee: 9999,
        govtFee: 5000,
        timeline: '7 Days',
        support: 'Personalized Concierge',
        features: [
          { name: '2 DIN & DSC', included: true },
          { name: 'Name Approval', included: true },
          { name: 'Standard MOA/AOA', included: true },
          { name: 'Tax Planning', included: true },
          { name: 'Full Compliance Kit', included: true },
        ]
      }
    ]
  },
  TRADEMARK: {
    title: 'Trademark Registration',
    plans: [
      {
        id: 'tm-basic',
        name: 'Basic',
        tagline: 'Quick Filing',
        professionalFee: 999,
        govtFee: 4500,
        timeline: '2 Days',
        support: 'Ticket System',
        features: [
          { name: 'TM Search', included: true },
          { name: 'Classification', included: true },
          { name: 'Government Filing', included: true },
          { name: 'Opposition Strategy', included: false },
          { name: 'Registry Follow-ups', included: false },
        ]
      },
      {
        id: 'tm-standard',
        name: 'Standard',
        tagline: 'Brand Protection Plus',
        professionalFee: 2499,
        govtFee: 4500,
        isPopular: true,
        timeline: '1 Day',
        support: 'Expert Voice Call',
        features: [
          { name: 'TM Search', included: true },
          { name: 'Classification', included: true },
          { name: 'Government Filing', included: true },
          { name: 'Opposition Strategy', included: true },
          { name: 'Registry Follow-ups', included: false },
        ]
      },
      {
        id: 'tm-premium',
        name: 'Premium',
        tagline: 'Global Brand Guardian',
        professionalFee: 4999,
        govtFee: 4500,
        timeline: 'Same Day',
        support: 'IP Consultant',
        features: [
          { name: 'TM Search', included: true },
          { name: 'Classification', included: true },
          { name: 'Government Filing', included: true },
          { name: 'Opposition Strategy', included: true },
          { name: 'Registry Follow-ups', included: true },
        ]
      }
    ]
  }
};

export default function PricingPage() {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState<ServiceType>('GST');
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const currentService = SERVICE_DATA[activeService];

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans selection:bg-blue-100 italic-text overflow-x-hidden">
      {/* Navigation Header */}
      <nav className="p-6 md:p-8 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-50">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => navigate('/')} className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">Home</button>
          <a href="#comparison" className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">Comparison</a>
          <button onClick={() => navigate('/expert/join')} className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">Apply as Expert</button>
        </div>
        <Button onClick={() => window.open('tel:+91XXXXXXXXXX')} className="bg-slate-900 h-12 px-6 rounded-xl hidden md:flex items-center gap-2">
          <MessageCircle size={14} className="text-blue-400" />
          <span className="text-[11px] font-black uppercase tracking-widest italic">Free Consultation</span>
        </Button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        {/* SEO Header */}
        <div className="text-center mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] italic border border-blue-100"
          >
            <ShieldCheck size={14} /> Transparent Pricing Guarantee
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9] italic">
            Know Your <span className="text-blue-600">Exact</span> Cost <br /> Before You Pay
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto italic">
            No hidden charges. No upselling later. No surprises. Just honest legal support for Indian startups.
          </p>
        </div>

        {/* Service Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {(Object.keys(SERVICE_DATA) as ServiceType[]).map((service) => (
            <button
              key={service}
              onClick={() => setActiveService(service)}
              className={cn(
                "px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                activeService === service 
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20 scale-105" 
                  : "bg-white text-slate-400 border border-slate-100 hover:border-blue-100 hover:text-blue-600"
              )}
            >
              {SERVICE_DATA[service].title}
            </button>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 relative">
          <AnimatePresence mode="wait">
            {currentService.plans.map((plan, idx) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={cn(
                  "relative group flex flex-col bg-white rounded-[40px] p-10 border-2 transition-all duration-500",
                  plan.isPopular ? "border-blue-600/20 shadow-2xl scale-[1.02] z-10" : "border-slate-50 hover:border-slate-100",
                  hoveredPlan === plan.id && !plan.isPopular && "scale-[1.01] border-slate-200"
                )}
              >
                {plan.isPopular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] italic shadow-xl shadow-blue-500/30 whitespace-nowrap">
                    Most Popular Choice
                  </div>
                )}

                <div className="mb-8">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center mb-6",
                    idx === 0 ? "bg-slate-50 text-slate-400" : idx === 1 ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                  )}>
                    {idx === 0 ? <Zap size={24} /> : idx === 1 ? <ShieldCheck size={24} /> : <Crown size={24} />}
                  </div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">{plan.name}</h3>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1 italic">{plan.tagline}</p>
                </div>

                <div className="mb-8 space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total All-Inclusive</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black italic tracking-tighter text-slate-900">₹{plan.professionalFee + plan.govtFee}</span>
                    <span className="text-slate-400 text-xs font-semibold">one-time</span>
                  </div>
                </div>

                <div className="mb-8 p-6 bg-slate-50 rounded-3xl space-y-3">
                   <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Government Fee</span>
                      <span className="text-xs font-bold text-slate-900">₹{plan.govtFee}</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Professional Fee</span>
                      <span className="text-xs font-bold text-slate-900">₹{plan.professionalFee}</span>
                   </div>
                   <div className="h-px bg-slate-100" />
                   <p className="text-[8px] font-black italic uppercase text-blue-600 text-center tracking-tighter">100% Tax Deductible Receipt</p>
                </div>

                <div className="flex-1 space-y-4 mb-10 text-[11px] font-medium italic text-slate-600">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <X size={14} className="text-slate-300 shrink-0 mt-0.5" />
                      )}
                      <span className={cn(!feature.included && "text-slate-300 line-through")}>{feature.name}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto space-y-4">
                  <div className="flex items-center gap-6 pb-4 border-b border-slate-50">
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-slate-400" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{plan.timeline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCheck size={12} className="text-slate-400" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{plan.support}</span>
                    </div>
                  </div>
                  <Button 
                    className={cn(
                      "w-full h-16 rounded-2xl font-black uppercase italic tracking-tighter text-xs group",
                      plan.isPopular ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-slate-900 text-white hover:bg-slate-800"
                    )}
                  >
                    Get Started <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <p className="text-[8px] text-center text-slate-400 font-bold uppercase tracking-widest">No progress? Full Refund.</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-32">
          {[
            { icon: AlertCircle, title: "No Hidden Costs", desc: "Know exact fees upfront" },
            { icon: UserCheck, title: "Verified Experts", desc: "CAs & CSs with 10+ yrs exp" },
            { icon: ShieldQuestion, title: "Full Transparency", desc: "Track progress in realtime" },
            { icon: ShieldCheck, title: "Refund Policy", desc: "Safety first for startups" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-slate-50 shadow-sm transition-all hover:bg-slate-50/50">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                <item.icon size={22} />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">{item.title}</h4>
                <p className="text-[10px] font-medium italic text-slate-500 leading-tight mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table Section */}
        <div id="comparison" className="bg-slate-900 rounded-[60px] p-10 md:p-20 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-16 text-center leading-none">
              Side-by-Side Breakdown
            </h2>
            
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10 uppercase tracking-widest text-[10px] font-black">
                    <th className="py-8 text-slate-500 px-4">Core Feature</th>
                    <th className="py-8 text-white px-4">Basic</th>
                    <th className="py-8 text-blue-400 px-4">Standard</th>
                    <th className="py-8 text-amber-400 px-4">Premium</th>
                  </tr>
                </thead>
                <tbody className="italic">
                  {[
                    { label: 'Consultation with Expert', basic: false, standard: true, premium: true },
                    { label: 'Document Verification', basic: 'AI Check', standard: 'Expert Check', premium: 'Double Review' },
                    { label: 'Response Time', basic: '24-48 Hours', standard: '4-8 Hours', premium: 'Instant (15m)' },
                    { label: 'Compliance Dashboard', basic: true, standard: true, premium: true },
                    { label: 'Post-Registration Kit', basic: false, standard: false, premium: true },
                    { label: 'Business Address Support', basic: false, standard: 'Self', premium: 'Concierge' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5 group hover:bg-white/5 transition-colors">
                      <td className="py-6 px-4 text-xs font-bold text-slate-400 tracking-tight">{row.label}</td>
                      <td className="py-6 px-4 text-xs font-bold">
                        {typeof row.basic === 'boolean' ? (row.basic ? <Check size={14} className="text-white" /> : <X size={14} className="text-white/20" />) : row.basic}
                      </td>
                      <td className="py-6 px-4 text-xs font-bold text-blue-400">
                        {typeof row.standard === 'boolean' ? (row.standard ? <Check size={14} className="text-blue-500" /> : <X size={14} className="text-white/20" />) : row.standard}
                      </td>
                      <td className="py-6 px-4 text-xs font-bold text-amber-400">
                        {typeof row.premium === 'boolean' ? (row.premium ? <Check size={14} className="text-amber-500" /> : <X size={14} className="text-white/20" />) : row.premium}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-16 text-center">
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8 italic">👉 Know your exact cost before you pay — no surprises later</p>
               <Button className="h-16 px-12 bg-white text-slate-900 rounded-2xl font-black uppercase italic tracking-tighter text-sm shadow-2xl shadow-blue-500/20 active:scale-95 transition-all">
                  Chat with Expert Now
               </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
        <Button onClick={() => window.open('https://wa.me/91XXXXXXXXXX')} className="w-full h-16 bg-blue-600 text-white rounded-2xl font-black uppercase italic tracking-tighter text-sm shadow-3xl shadow-blue-500/40 border border-blue-400/30 flex items-center justify-center gap-3 active:scale-90 transition-all backdrop-blur-md">
          <MessageCircle size={18} />
          <span>Talk to Expert (₹499)</span>
        </Button>
      </div>

      <footer className="py-20 px-8 bg-slate-50 italic border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <Logo className="inline-flex opacity-50 grayscale hover:grayscale-0 transition-all duration-700" />
            <p className="mt-4 text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Trusted by 10,000+ Founders India-Wide</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6 text-[10px] font-medium leading-relaxed text-slate-500 border-t border-slate-200 pt-12 text-center">
             <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">SolveItIndia is a part of Synckraft Technologies Pvt. Ltd., a company registered under the Companies Act, 2013.</p>
             <p>
               <span className="font-black uppercase tracking-widest text-[#FF4D4D] block mb-1">Disclaimer:</span>
               This website is privately operated and is not affiliated with, endorsed by, or connected to any government authority or department. The information and forms provided on this platform are intended to collect details from users to better understand their requirements and facilitate services.
             </p>
             <p>
               We act as a service platform offering assistance based on user requests. The fees charged on this website are platform and service fees. We may engage third-party professionals or partners to deliver certain services where necessary.
             </p>
             <p>
               This platform does not provide legal advice or legal representation. For legal matters, users are advised to consult a qualified legal professional or law firm.
             </p>
             <p className="text-[9px] font-black uppercase tracking-[0.1em]">By using this website, you acknowledge and agree to the above terms.</p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black uppercase tracking-widest text-slate-400">
             <span>&copy; 2026 SolveIt India Private Limited</span>
             <div className="flex gap-8">
                <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Refund Policy</a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
