import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ArrowRight, 
  ChevronRight, 
  Building2, 
  FileText, 
  Gavel, 
  ShieldCheck, 
  Copyright, 
  Utensils, 
  TrendingUp,
  X,
  Sparkles,
  Scale,
  Gem,
  Cpu,
  Heart
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Button from '@/src/components/Button';
import Logo from '@/src/components/Logo';
import { useNavigate } from 'react-router-dom';

interface Service {
  id: string;
  name: string;
  description: string;
  popular?: boolean;
}

interface Category {
  id: string;
  title: string;
  description: string;
  icon: any;
  services: Service[];
}

const CATEGORIES: Category[] = [
  {
    id: 'incorp',
    title: 'Business Formation',
    description: 'Start your journey with the right legal structure.',
    icon: Building2,
    services: [
      { id: 'pvt-ltd', name: 'Private Limited Company', description: 'Most popular for startups', popular: true },
      { id: 'llp', name: 'Limited Liability Partnership', description: 'Flexible partnership model' },
      { id: 'opc', name: 'One Person Company', description: 'Solo founder registration' },
      { id: 'section-8', name: 'Section 8 Company', description: 'For non-profit organizations' }
    ]
  },
  {
    id: 'gst',
    title: 'GST Services',
    description: 'Compliant tax registrations and periodic filings.',
    icon: FileText,
    services: [
      { id: 'gst-reg', name: 'GST Registration', description: 'Get your GSTIN in 5 days', popular: true },
      { id: 'gst-filing', name: 'Monthly GST Filings', description: 'Stay compliant always' },
      { id: 'gst-lut', name: 'LUT Filing', description: 'Export without tax payment' }
    ]
  },
  {
    id: 'ip',
    title: 'Intellectual Property',
    description: 'Protect your brand, ideas, and creations.',
    icon: Copyright,
    services: [
      { id: 'tm-reg', name: 'Trademark Registration', description: 'Protect your brand name', popular: true },
      { id: 'tm-objection', name: 'Trademark Objection', description: 'Legal reply to registry' },
      { id: 'patent', name: 'Patent Filing', description: 'Secure your inventions' }
    ]
  },
  {
    id: 'roc',
    title: 'ROC Compliance',
    description: 'Mandatory annual filings and secretarial audits.',
    icon: ShieldCheck,
    services: [
      { id: 'annual-compliance', name: 'Annual Compliance Kit', description: 'All-inclusive packages', popular: true },
      { id: 'kyc-dir', name: 'Director KYC', description: 'Annual mandatory update' }
    ]
  },
  {
    id: 'licenses',
    title: 'Licenses & Food',
    description: 'Sector-specific government permits.',
    icon: Utensils,
    services: [
      { id: 'fssai', name: 'FSSAI Registration', description: 'For all food businesses', popular: true },
      { id: 'shop-est', name: 'Shop & Establishment', description: 'Mandatory state license' }
    ]
  }
];

export default function ServicesExplorer() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return CATEGORIES;
    return CATEGORIES.map(cat => ({
      ...cat,
      services: cat.services.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(cat => cat.services.length > 0);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans selection:bg-blue-100 italic-text overflow-x-hidden">
       {/* Navigation */}
       <nav className="p-6 md:p-8 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-50">
          <Logo />
          <div className="flex items-center gap-4">
             <Button 
               variant="ghost" 
               onClick={() => navigate('/')}
               className="text-[11px] font-black uppercase tracking-widest text-slate-400"
             >
               Go Back
             </Button>
          </div>
       </nav>

       <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          {/* Hero Search Section */}
          <div className="text-center mb-16 space-y-8">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] italic border border-blue-100"
             >
               <Sparkles size={14} className="animate-pulse" /> Global Service Directory
             </motion.div>
             
             <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9] italic">
                All Legal <span className="text-blue-600">Operations</span> <br /> In One Place.
             </h1>

             <div className="max-w-2xl mx-auto relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                  type="text"
                  placeholder="What legal help do you need?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-20 pl-16 pr-8 bg-white rounded-3xl border-2 border-slate-100 focus:border-blue-600 outline-none transition-all shadow-xl shadow-slate-200/20 text-lg font-black italic placeholder:text-slate-300"
                />
                <AnimatePresence>
                   {searchQuery && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => setSearchQuery('')}
                        className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-all"
                      >
                         <X size={16} />
                      </motion.button>
                   )}
                </AnimatePresence>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
             {/* Sidebar Categories */}
             <aside className="md:col-span-3 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 ml-4">Explore by Role</p>
                {CATEGORIES.map(cat => (
                   <button
                     key={cat.id}
                     onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                     className={cn(
                       "w-full flex items-center justify-between p-4 rounded-2xl transition-all group",
                       selectedCategory === cat.id 
                        ? "bg-slate-900 text-white shadow-xl shadow-black/10" 
                        : "text-slate-500 hover:bg-white hover:shadow-lg hover:shadow-slate-200/30"
                     )}
                   >
                      <div className="flex items-center gap-4">
                         <cat.icon size={18} className={selectedCategory === cat.id ? "text-blue-400" : "group-hover:text-blue-600 transition-colors"} />
                         <span className="text-[11px] font-black uppercase tracking-widest italic">{cat.title}</span>
                      </div>
                      <ChevronRight size={14} className={cn("transition-transform", selectedCategory === cat.id && "rotate-90")} />
                   </button>
                ))}
             </aside>

             {/* Service Grid */}
             <div className="md:col-span-9">
                <div className="space-y-16">
                   {filteredCategories.map((category) => (
                      <section 
                        key={category.id} 
                        id={category.id}
                        className={cn(
                          "transition-opacity duration-500",
                          selectedCategory && selectedCategory !== category.id && "opacity-20 blur-[2px] pointer-events-none scale-95"
                        )}
                      >
                         <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-lg shadow-slate-200/50 border border-slate-50">
                               <category.icon size={24} />
                            </div>
                            <div>
                               <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">{category.title}</h2>
                               <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1 italic">{category.description}</p>
                            </div>
                         </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {category.services.map((service) => (
                               <motion.div
                                 key={service.id}
                                 whileHover={{ y: -5 }}
                                 className="group bg-white p-8 rounded-[32px] border border-slate-100 hover:border-blue-100 transition-all shadow-sm hover:shadow-2xl hover:shadow-slate-200/40 relative overflow-hidden flex flex-col"
                               >
                                  {service.popular && (
                                     <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                                        <TrendingUp size={10} />
                                        <span className="text-[8px] font-black uppercase tracking-widest italic">Top Choice</span>
                                     </div>
                                  )}
                                  
                                  <div className="flex-1">
                                     <h3 className="text-lg font-black italic uppercase tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-2">
                                        {service.name}
                                     </h3>
                                     <p className="text-slate-400 text-[10px] font-medium italic mb-8">
                                        {service.description}
                                     </p>
                                  </div>

                                  <Button 
                                    className="w-full bg-slate-900 h-14 rounded-xl group-hover:bg-blue-600 transition-all"
                                  >
                                     <span className="text-[10px] font-black uppercase tracking-widest italic text-white text-xs">Start Now</span>
                                     <ArrowRight size={14} className="ml-2 text-blue-400" />
                                  </Button>
                               </motion.div>
                            ))}
                         </div>
                      </section>
                   ))}
                </div>
             </div>
          </div>
       </main>

       <footer className="py-20 px-8 bg-slate-50 italic border-t border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center mb-12">
              <Logo className="inline-flex opacity-50 grayscale hover:grayscale-0 transition-all duration-700" />
              <p className="mt-4 text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Simplifying Compliance for Founders India-Wide</p>
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
