import React from 'react';
import { 
  ChevronRight, 
  ArrowRight,
  ShieldCheck, 
  Award, 
  Search, 
  UserSquare2, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  FileCheck, 
  FileText,
  HelpCircle,
  Receipt,
  BadgeCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Button from '@/src/components/Button';
import { cn } from '@/src/lib/utils';

export default function GstRegistrationPage() {
  const steps = [
    { title: 'Submit Docs', icon: FileText, desc: 'Upload basic details via secure portal.' },
    { title: 'Expert Verification', icon: UserSquare2, desc: 'Our CAs audit files for compliance.' },
    { title: 'ARN Generation', icon: Receipt, desc: 'Application filed and tracked.' },
    { title: 'GST Certificate', icon: FileCheck, desc: 'Final certificate delivered.' },
  ];

  const faqs = [
    { q: 'What documents are strictly required?', icon: FileText, a: 'PAN Card, Aadhaar Card, valid Proof of Business Address (Utility bill or Rent Agreement), and a canceled cheque or bank statement.' },
    { q: 'Is the 5-day guarantee absolute?', icon: Clock, a: 'The 5-working-day timeline begins from the moment all documents are verified by our team. Government portal delays are tracked and communicated instantly.' },
    { q: 'Do I need to visit any office?', icon: HelpCircle, a: 'No. Our process is 100% digital. Physical verifications by the department only occur in rare exceptions, which we guide you through.' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold tracking-tighter text-primary uppercase">solveit</span>
              <span className="text-xl font-bold tracking-tighter text-secondary uppercase ml-1">India</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-semibold text-primary border-b-2 border-primary pb-1">Services</a>
              <a href="#" className="text-sm font-medium text-slate-500 hover:text-primary">Pricing</a>
              <a href="#" className="text-sm font-medium text-slate-500 hover:text-primary">Resources</a>
              <a href="#" className="text-sm font-medium text-slate-500 hover:text-primary">About</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/client" className="text-sm font-medium text-slate-600 hover:text-primary">Login</Link>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-16">
        {/* Service Hero */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-100 rounded-lg text-[10px] font-black uppercase tracking-widest text-blue-600">
                <BadgeCheck className="w-3 h-3" /> Zero Hidden Fees
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-100 rounded-lg text-[10px] font-black uppercase tracking-widest text-green-600">
                <ShieldCheck className="w-3 h-3" /> ISO 27001 Certified
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 uppercase italic">
              GST Filing <br/><span className="text-blue-600">Without the Chasing.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-xl font-medium">
              Tired of your CA not picking up calls? We assign a dedicated expert to your file 
              and provide Zomato-style live tracking until your certificate is in hand.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="h-16 px-10 text-lg">Start for ₹499 <ArrowRight className="ml-2" /></Button>
              <div className="flex flex-col justify-center">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Response Guarantee</p>
                 <p className="text-xs font-bold text-slate-900 mt-0.5">Expert callback in 90 seconds</p>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-2xl p-10 space-y-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary" />
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Standard Filing</h3>
                  <p className="text-slate-400 text-sm font-medium">Complete end-to-end registration</p>
                </div>
                <Receipt className="w-10 h-10 text-slate-100" />
              </div>

              <div className="border-b border-slate-50 pb-8">
                <div className="text-4xl font-black text-slate-900 flex items-baseline gap-2">
                  ₹999 <span className="text-sm font-bold text-slate-400">one-time</span>
                </div>
              </div>

              <ul className="space-y-4">
                {['Dedicated compliance manager', 'Document preparation & audit', 'ARN Generation & Tracking'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                    {item}
                  </li>
                ))}
              </ul>

              <Button size="lg" className="w-full" variant="secondary">Buy Now</Button>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-slate-50 py-24 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight text-center mb-16">Transparent Process</h2>
            <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-sm relative backdrop-blur-3xl overflow-hidden">
               <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-px bg-slate-100 -translate-y-1/2 z-0" />
               <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                 {steps.map((step, i) => (
                   <div key={i} className="flex flex-col items-center text-center space-y-4 bg-white px-4">
                     <div className={cn(
                       "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm border-2",
                       i === 0 ? "bg-primary text-white border-primary" : "bg-slate-50 text-slate-400 border-slate-100"
                     )}>
                       {i + 1}
                     </div>
                     <h4 className="font-bold text-slate-900">{step.title}</h4>
                     <p className="text-xs text-slate-500 leading-relaxed font-medium">{step.desc}</p>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </section>

        {/* FAQ Grid */}
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
              <p className="text-lg text-slate-500 leading-relaxed">Clear answers to streamline your compliance journey. For complex scenarios, our experts are available on chat.</p>
              <div className="aspect-video rounded-3xl overflow-hidden relative border border-slate-100 shadow-lg group">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAV2uI3vvbZUedLQtANBnhRFN5aKr0mklLH-K_-Lx9sQX1Ud0LAc_G61MT-W8hyg8OA9JV97zC01QNrO-JQ5Wy1nSLxovoo3nOoQM-G79zTYUsQCjW77avhK5x1fYuyf6VNVKWbwPJnWim8g-TuYsJCbLof4QMrDEgdji9jqGOgoktrWFG_BBvg0JFVxR48lYNK-SSHxjrOv8pX-wlpLGFX89g6AELVp6FgpmEodp0BGVpGKYiUHoOwG2X_vVNuM2ICKE0ZmTNj1J4" 
                  alt="FAQ support" 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              </div>
            </div>

            <div className="flex-[1.5] space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-3 group hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-1 text-slate-300 group-hover:text-primary transition-colors">
                      <faq.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 tracking-tight">{faq.q}</h4>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium pl-8">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 py-12 px-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="text-xl font-bold text-slate-900 tracking-tighter">SolveItIndia</span>
          <nav className="flex flex-wrap justify-center gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-accent-teal">Privacy Policy</a>
            <a href="#" className="hover:text-accent-teal">Terms of Service</a>
            <a href="#" className="hover:text-accent-teal">Refund Policy</a>
            <a href="#" className="hover:text-accent-teal">Contact Us</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
