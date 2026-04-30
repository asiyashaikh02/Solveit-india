import React, { useState } from 'react';
import { 
  Rocket, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  FileText, 
  Zap, 
  Building2, 
  Users,
  ScrollText,
  ChevronDown,
  Star,
  Search,
  MessageSquare,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import Button from '@/src/components/Button';
import Logo from '@/src/components/Logo';
import { cn } from '@/src/lib/utils';

export default function BusinessSetupPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const packages = [
    {
      name: "Pvt Ltd Incorporation",
      price: "₹6,499",
      description: "The gold standard for startups. Best for raising investment and building a brand.",
      features: [
        "2 DSC & 2 DIN",
        "Name Reservation",
        "MoA & AoA Drafting",
        "Certificate of Incorporation",
        "PAN & TAN Registration",
        "Bank Account Assistance"
      ],
      popular: true,
      icon: Building2
    },
    {
      name: "LLP Registration",
      price: "₹4,999",
      description: "Low compliance alternative. Best for service-based businesses and small teams.",
      features: [
        "2 Partner DSCs",
        "Partnership Deed Drafting",
        "FiLLiP Form Submission",
        "Certificate of Incorporation",
        "PAN & TAN for LLP",
        "ROC Compliance"
      ],
      popular: false,
      icon: Users
    },
    {
      name: "OPC (One Person)",
      price: "₹5,499",
      description: "Sole founder with corporate benefits. Limit your liability without a partner.",
      features: [
        "1 Director DSC & DIN",
        "Nominee Consent Form",
        "Corporate Charter Drafing",
        "PAN & TAN Application",
        "Single Founder Benefit",
        "Digital Vault Access"
      ],
      popular: false,
      icon: Rocket
    }
  ];

  const faqs = [
    {
      question: "Which business structure should I choose?",
      answer: "If you plan to raise venture capital, Private Limited is the best. If you are a small team of 2+ looking for low maintenance, go for LLP. If you are a solo founder wanting limited liability, OPC is ideal."
    },
    {
      question: "What documents are required for registration?",
      answer: "We typically need PAN cards, Aadhaar cards, and bank statements of directors/partners, along with a utility bill (Electricity/Gas) for the registered office address."
    },
    {
      question: "How long does the whole process take?",
      answer: "Standard incorporation takes 7–10 business days. It depends on how quickly the ROC (Registrar of Companies) approves the name reservation and incorporation forms."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-slate-100 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#packages" className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Packages</a>
            <a href="#why-us" className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Why SolveIt</a>
            <a href="#faq" className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">FAQ</a>
            <Button className="h-12 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest">Expert Help</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/30 -skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-md border border-blue-100 italic">
              <Rocket size={12} className="animate-pulse" /> Launch Your Startup Faster
            </div>
            <h1 className="text-6xl lg:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase italic">
              Business <br/> Setup made <br/>
              <span className="text-blue-600">Frictionless.</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-md">
              From name approval to GST registration, we handle the entire legal bureaucracy so you can focus on building your product.
            </p>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-slate-600">
                <CheckCircle2 size={16} className="text-blue-500" />
                <span className="text-xs font-bold uppercase tracking-tight italic">99.8% Approval Rate</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <CheckCircle2 size={16} className="text-blue-500" />
                <span className="text-xs font-bold uppercase tracking-tight italic">No Hidden Charges</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="bg-white p-10 rounded-[40px] shadow-3xl border border-slate-100 relative z-10 w-full max-w-md mx-auto">
                <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter mb-8">Quick Application</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input type="text" placeholder="Full Name" className="w-full h-14 pl-12 bg-slate-50 rounded-2xl border-none text-sm font-bold placeholder:italic" />
                    </div>
                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input type="tel" placeholder="Mobile Number" className="w-full h-14 pl-12 bg-slate-50 rounded-2xl border-none text-sm font-bold placeholder:italic" />
                    </div>
                    <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <select className="w-full h-14 pl-12 bg-slate-50 rounded-2xl border-none text-sm font-bold appearance-none uppercase tracking-widest italic">
                            <option>Pvt Ltd Company</option>
                            <option>LLP Formation</option>
                            <option>One Person Company</option>
                        </select>
                    </div>
                    <Button className="w-full h-16 rounded-2xl text-lg font-black uppercase italic tracking-tighter bg-blue-600 shadow-xl shadow-blue-500/20 mt-4 group">
                        Get Experts Call <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </form>
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl opacity-50" />
          </motion.div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section id="packages" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] italic">Transparent Pricing</p>
          <h2 className="text-5xl font-black text-slate-900 uppercase italic tracking-tighter">Incorporation Packages</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <div key={i} className={cn(
              "p-10 rounded-[50px] transition-all relative flex flex-col",
              pkg.popular 
                ? "bg-slate-900 text-white shadow-3xl scale-105 z-10 border-blue-500/30" 
                : "bg-white border border-slate-100 shadow-xl hover:shadow-2xl"
            )}>
              {pkg.popular && (
                <div className="absolute -top-4 right-10 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest italic shadow-lg">Most Recommended</div>
              )}
              
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mb-6",
                pkg.popular ? "bg-blue-600/20 text-blue-400" : "bg-slate-50 text-slate-400"
              )}>
                <pkg.icon size={24} />
              </div>

              <h4 className="text-2xl font-black uppercase italic tracking-tighter mb-2">{pkg.name}</h4>
              <div className="flex items-baseline gap-1 mb-4">
                <span className={cn("text-4xl font-black italic tracking-tighter", pkg.popular ? "text-white" : "text-slate-900")}>
                  {pkg.price}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">+Govt Fees</span>
              </div>
              <p className={cn("text-xs font-medium leading-relaxed mb-8", pkg.popular ? "text-slate-400" : "text-slate-500")}>
                {pkg.description}
              </p>

              <div className="space-y-4 mb-10 flex-grow">
                {pkg.features.map((feat, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                    <span className="text-[10px] font-black uppercase tracking-widest italic">{feat}</span>
                  </div>
                ))}
              </div>

              <Button className={cn(
                "w-full h-14 rounded-2xl font-black uppercase italic tracking-tighter transition-all",
                pkg.popular ? "bg-blue-600 hover:scale-105" : "bg-slate-100 text-slate-900 hover:bg-slate-200"
              )}>
                Select Package
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] italic">Knowledge Base</p>
          <h2 className="text-5xl font-black text-slate-900 uppercase italic tracking-tighter">Your Questions Answered</h2>
        </div>

        <div className="space-y-4">
           {faqs.map((faq, i) => (
             <div key={i} className="bg-white rounded-3xl border border-slate-100 overflow-hidden transition-all hover:shadow-lg">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-8 text-left group"
                >
                  <span className={cn(
                    "text-lg font-black uppercase italic tracking-tighter transition-colors",
                    activeFaq === i ? "text-blue-600" : "text-slate-900 group-hover:text-blue-600"
                  )}>
                    {faq.question}
                  </span>
                  <div className={cn(
                    "p-2 rounded-xl transition-all",
                    activeFaq === i ? "bg-blue-600 text-white rotate-180" : "bg-slate-50 text-slate-400 group-hover:bg-blue-100"
                  )}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <div className="px-8 pb-8 text-slate-500 font-medium leading-relaxed italic">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
           ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-blue-600 rounded-[60px] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-3xl shadow-blue-500/20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />
          
          <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.9]">Start Your Corporate Journey Today.</h2>
            <p className="text-blue-50 text-base font-medium opacity-80">Join 5,000+ startups registered this financial year with SolveItIndia.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button className="h-20 px-12 rounded-2xl bg-white text-blue-600 text-xl font-black italic uppercase tracking-tighter shadow-2xl hover:scale-105 transition-all">Register Pvt Ltd</Button>
              <Button variant="outline" className="h-20 px-12 rounded-2xl border-2 border-white/30 text-white text-xl font-black italic uppercase tracking-tighter hover:bg-white/10 transition-all">Free Consultation</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (Reused) */}
      <footer className="bg-white border-t border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Logo />
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest italic">Empowering India's Founders.</p>
          </div>
          {[
            { title: "Incorporation", links: ["Pvt Ltd", "LLP", "OPC", "Trust/NGO"] },
            { title: "Post-Setup", links: ["FSSAI", "Trademark", "IEC Code", "GST"] },
            { title: "Links", links: ["Pricing", "Reviews", "Dashboard", "Login"] }
          ].map((col, i) => (
            <div key={i} className="space-y-6">
              <h5 className="text-[11px] font-black text-slate-900 uppercase tracking-widest italic">{col.title}</h5>
              <div className="flex flex-col gap-3">
                {col.links.map(link => (
                  <a key={link} href="#" className="text-[10px] font-bold text-slate-400 hover:text-blue-600 uppercase tracking-widest italic transition-colors">{link}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
