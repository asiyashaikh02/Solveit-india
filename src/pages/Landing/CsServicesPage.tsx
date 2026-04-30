import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Star, 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  Users, 
  Scale, 
  Briefcase,
  ChevronDown,
  Building2,
  Globe,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Search,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import Button from '@/src/components/Button';
import Logo from '@/src/components/Logo';
import { cn } from '@/src/lib/utils';

export default function CsServicesPage() {
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    city: ''
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const stats = [
    { label: 'Trusted by', value: '50k+', sub: 'Businesses' },
    { label: 'Rating', value: '4.8/5', sub: 'Google & Trustpilot' },
    { label: 'Response', value: '24hrs', sub: 'Guaranteed' }
  ];

  const services = [
    {
      title: "Company Incorporation",
      description: "Fast-track your startup journey with seamless Pvt Ltd, OPC, or LLP formation.",
      icon: Building2,
      price: "From ₹4,999"
    },
    {
      title: "ROC Compliance",
      description: "Manage annual filings, board resolutions, and statutory registers without stress.",
      icon: FileText,
      price: "From ₹2,499"
    },
    {
      title: "Secretarial Audit",
      description: "In-depth audit ensuring your corporate governance meets all legal benchmarks.",
      icon: Search,
      price: "Custom Quote"
    },
    {
      title: "FEMA Compliance",
      description: "Expert guidance on foreign investment, NRI business setups, and RBI reporting.",
      icon: Globe,
      price: "Expert Consultation"
    }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Reach out to us",
      description: "Fill the form or call our experts to initiate the process."
    },
    {
      step: "02",
      title: "Explain your needs",
      description: "Our senior CS will analyze your business requirements."
    },
    {
      step: "03",
      title: "Talk to our experts",
      description: "Get dedicated 1-on-1 time to clarify all doubts."
    },
    {
      step: "04",
      title: "Problem Resolved",
      description: "We handle the paperwork while you focus on growth."
    }
  ];

  const checklist = [
    "Digital Signature Certificate (DSC)",
    "Director Identification Number (DIN)",
    "Charter Documents (MoA & AoA)",
    "PAN and TAN registration",
    "Company Name Reservation (RUN)",
    "Certificate of Incorporation"
  ];

  const faqs = [
    {
      question: "What are the benefits of hiring a Company Secretary?",
      answer: "A Company Secretary ensures that your business stays compliant with the Companies Act, manages all ROC filings, drafts critical legal documents, and provides strategic advice on corporate governance, saving you from heavy penalties and legal risks."
    },
    {
      question: "Is it mandatory to have a CS for my company?",
      answer: "While every company needs to comply with secretarial standards, only companies with a paid-up share capital of ₹10 Crores or more are legally required to appoint a whole-time CS. However, small companies' compliance is usually managed by practicing CS firms on a retainer basis."
    },
    {
      question: "How long does company incorporation take?",
      answer: "With our fast-track process, company incorporation typically takes 7–10 working days, depending on government approval timelines for the name reservation and ROC registration."
    },
    {
      question: "What happens if we miss an ROC filing deadline?",
      answer: "Missing ROC filing deadlines can lead to heavy daily penalties (often ₹100/day) and can eventually lead to the disqualification of directors or the company being 'struck off' from the register."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-slate-100 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <Logo />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Services</a>
            <a href="#process" className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Process</a>
            <a href="#faq" className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">FAQ</a>
            <Button className="h-12 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest">Talk to Expert</Button>
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
              <ShieldCheck size={12} /> Premier CS Firm in India
            </div>
            <h1 className="text-6xl lg:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase italic">
              Company <br/> Secretary <br/>
              <span className="text-blue-600">Services Online.</span>
            </h1>
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center gap-2 text-slate-600">
                <CheckCircle2 size={16} className="text-blue-500" />
                <span className="text-xs font-bold uppercase tracking-tight italic">200+ Experienced Experts</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <CheckCircle2 size={16} className="text-blue-500" />
                <span className="text-xs font-bold uppercase tracking-tight italic">No Hidden Costs</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <CheckCircle2 size={16} className="text-blue-500" />
                <span className="text-xs font-bold uppercase tracking-tight italic">Guaranteed Satisfaction</span>
              </div>
            </div>

            <div className="flex items-center gap-12 pt-8">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">{stat.value}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">{stat.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="bg-white p-10 rounded-[40px] shadow-3xl border border-slate-100 relative z-10 w-full max-w-md mx-auto">
              <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter mb-2">Schedule a Free Call</h3>
              <p className="text-slate-400 text-sm font-medium mb-8">Our experts will get back to you in 30 mins.</p>
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="email" 
                      placeholder="e.g. rahul@company.com"
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-100 text-sm font-bold placeholder:text-slate-300 italic transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="tel" 
                      placeholder="+91 00000 00000"
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-100 text-sm font-bold placeholder:text-slate-300 italic transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">City/Pincode</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="text" 
                      placeholder="e.g. Mumbai 400001"
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-100 text-sm font-bold placeholder:text-slate-300 italic transition-all"
                    />
                  </div>
                </div>
                <Button className="w-full h-16 rounded-2xl text-lg font-black uppercase italic tracking-tighter bg-blue-600 shadow-xl shadow-blue-500/20 mt-4 group">
                  Submit Request <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-center text-[10px] font-medium text-slate-400 mt-4">By clicking you agree to our <Link to="/terms" className="text-blue-600 underline">Terms of Service</Link></p>
              </form>
            </div>
            
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Ratings Trust Section */}
      <section className="bg-white border-y border-slate-100 py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-12 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="flex gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <div>
              <p className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">4.8 Average Rating</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">on Google, Trustpilot & Facebook</p>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-slate-100" />
          <div className="flex flex-wrap justify-center gap-10 grayscale opacity-40 hover:opacity-100 transition-opacity">
            <span className="text-xl font-black uppercase italic tracking-tighter">StartupIndia</span>
            <span className="text-xl font-black uppercase italic tracking-tighter">Razorpay</span>
            <span className="text-xl font-black uppercase italic tracking-tighter">Economic Times</span>
            <span className="text-xl font-black uppercase italic tracking-tighter">Forbes</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] italic">Full Comprehensive Support</p>
          <h2 className="text-5xl font-black text-slate-900 uppercase italic tracking-tighter">Our CS Specializations</h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">From incorporation to annual compliance, we handle every aspect of your company's secretarial needs.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => {
            const isIncorporation = service.title === "Company Incorporation";
            const CardWrapper = isIncorporation ? Link : 'div';
            
            return (
              <CardWrapper 
                key={i} 
                to={isIncorporation ? "/business-setup" : undefined}
                className="group bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all block"
              >
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-6 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg transition-all">
                  <service.icon size={24} />
                </div>
                <h4 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter mb-2 group-hover:text-blue-600 transition-colors">{service.title}</h4>
                <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6">{service.description}</p>
                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                  <p className="text-sm font-black text-slate-900 tracking-tighter">{service.price}</p>
                  <div className="text-blue-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section id="process" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl opacity-50" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-end justify-between mb-20 text-center md:text-left">
            <div className="space-y-4">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] italic">Streamlined Process</p>
              <h2 className="text-5xl font-black uppercase italic tracking-tighter">How We Solve It.</h2>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                <Clock size={20} className="text-blue-400" />
              </div>
              <p className="text-xs font-bold uppercase tracking-tight text-slate-400 max-w-[150px] leading-tight">Average Resolution Time: 2 Business Days</p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[60px] left-24 right-24 h-px bg-white/10" />
            
            {howItWorks.map((step, i) => (
              <div key={i} className="relative z-10 p-8 space-y-6 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center text-2xl font-black italic tracking-tighter transition-all group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:scale-110">
                  {step.step}
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-black uppercase italic tracking-tighter group-hover:text-blue-400 transition-colors">{step.title}</h4>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 flex justify-center">
            <Button className="h-16 px-10 rounded-2xl bg-white text-slate-900 font-black uppercase italic tracking-tight shadow-2xl hover:bg-slate-100 transition-all">
              Initiate My Process Now <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Info Sections (Mechanism) */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
         <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-tight">Hiring a CS doesn't <br/> have to be complicated.</h2>
              <p className="text-slate-500 font-medium">Traditional firms are slow, expensive, and opaque. We've built a platform that puts you in direct control of your compliances with real-time tracking.</p>
            </div>
            
            <div className="space-y-6">
               <div className="flex gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 shrink-0">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h5 className="font-black uppercase italic tracking-tight text-slate-900">Compliance Efficiency</h5>
                    <p className="text-xs text-slate-500 font-medium mt-1">Our automated trackers notify you 15 days before any ROC deadline.</p>
                  </div>
               </div>
               <div className="flex gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 shrink-0">
                    <Award size={24} />
                  </div>
                  <div>
                    <h5 className="font-black uppercase italic tracking-tight text-slate-900">Verified Practitioners</h5>
                    <p className="text-xs text-slate-500 font-medium mt-1">Every expert is verified against ICSI membership and has 5+ years experience.</p>
                  </div>
               </div>
            </div>

            <div className="pt-6">
               <div className="flex items-center gap-4 mb-8">
                  <div className="flex -space-x-4">
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" className="w-12 h-12 rounded-full border-4 border-white shadow-lg" alt="Avatar" />
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" className="w-12 h-12 rounded-full border-4 border-white shadow-lg" alt="Avatar" />
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" className="w-12 h-12 rounded-full border-4 border-white shadow-lg" alt="Avatar" />
                    <div className="w-12 h-12 rounded-full bg-blue-600 border-4 border-white shadow-lg flex items-center justify-center text-[10px] font-black text-white italic">+2k</div>
                  </div>
                  <p className="text-sm font-bold text-slate-900 tracking-tight italic">Join 2,400+ businesses registered this month.</p>
               </div>
            </div>
         </div>

         <div className="bg-white p-12 rounded-[50px] shadow-3xl border border-slate-100 relative">
            <div className="absolute -top-6 -left-6 bg-blue-600 text-white p-6 rounded-3xl shadow-xl rotate-[-4deg]">
               <h3 className="text-4xl font-black italic tracking-tighter">98%</h3>
               <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Approval Rate</p>
            </div>
            
            <div className="space-y-8">
               <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">What You'll Need</h3>
               <div className="grid gap-4">
                  {checklist.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <CheckCircle2 size={14} className="text-blue-500 group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-sm font-bold text-slate-600 uppercase italic tracking-tighter group-hover:text-slate-900 transition-colors">{item}</span>
                    </div>
                  ))}
               </div>
               
               <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <HelpCircle className="text-blue-600" />
                    <div>
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Confused?</p>
                      <p className="text-xs font-bold text-slate-900 uppercase italic tracking-tighter">Download Checklist PDF</p>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-blue-600 group-hover:translate-x-1 transition-transform" />
               </div>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-blue-600 rounded-[50px] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-3xl shadow-blue-500/20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />
          
          <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">Get Started with SolveIt Today.</h2>
            <p className="text-blue-50 text-base font-medium opacity-80">Stop worrying about ROC, compliance, and legal frameworks. Let our team of professional Company Secretaries handle the heavy lifting while you scale your business.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button className="h-20 px-12 rounded-2xl bg-white text-blue-600 text-xl font-black italic uppercase tracking-tighter shadow-2xl hover:scale-105 transition-all">Start Registration</Button>
              <Button variant="outline" className="h-20 px-12 rounded-2xl border-2 border-white/30 text-white text-xl font-black italic uppercase tracking-tighter hover:bg-white/10 transition-all font-bold">Talk to a CS</Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] italic">Knowledge Base</p>
          <h2 className="text-5xl font-black text-slate-900 uppercase italic tracking-tighter">Frequently Asked</h2>
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

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Logo />
            <p className="text-slate-400 text-xs font-medium leading-relaxed">Simplifying business compliance for 50,000+ startups and established firms across India since 2012.</p>
            <div className="flex gap-4">
               {/* Social Icons Placeholder */}
               {[MessageSquare, Mail, Phone].map((Icon, i) => (
                 <a key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white border border-slate-100 transition-all">
                   <Icon size={18} />
                 </a>
               ))}
            </div>
          </div>

          {[
            { title: "Services", links: ["GST Registration", "Pvt Ltd Setup", "Trademark Filing", "Consult Experts"] },
            { title: "Company", links: ["About Us", "Our Team", "Network", "Careers"] },
            { title: "Legal", links: ["Privacy Policy", "Terms of Use", "Refund Policy", "Disclaimer"] }
          ].map((col, i) => (
            <div key={i} className="space-y-6">
              <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest italic">{col.title}</h5>
              <div className="flex flex-col gap-4">
                {col.links.map(link => (
                  <a key={link} href="#" className="text-xs font-bold text-slate-400 hover:text-blue-600 uppercase italic tracking-tighter transition-colors">{link}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-16 mt-16 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">© 2026 SolveIt India. All Rights Reserved.</p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic flex items-center gap-2">Built with <Star size={10} fill="currentColor" className="text-blue-600" /> by Industry Experts</p>
        </div>
      </footer>
    </div>
  );
}
