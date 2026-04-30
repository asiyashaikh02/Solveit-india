import React, { useState } from 'react';
import { 
  Briefcase, 
  ShieldCheck, 
  FileText, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  MapPin, 
  Award,
  BookOpen,
  Scale,
  Calculator,
  UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import Button from '@/src/components/Button';
import Logo from '@/src/components/Logo';
import { auth, db, isMock } from '@/src/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function ExpertJoinPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Lawyer',
    membershipId: '',
    experience: '',
    description: '',
    tags: [] as string[]
  });

  const roles = [
    { id: 'Lawyer', icon: Scale, label: 'Legal Professional' },
    { id: 'CA', icon: Calculator, label: 'Chartered Accountant' },
    { id: 'CS', icon: Briefcase, label: 'Company Secretary' }
  ];

  const handleSubmit = async () => {
    if (!auth || !auth.currentUser) {
        if (isMock) {
          console.log("Mock Mode: Expert profile created locally");
          navigate('/expert');
          return;
        }
        alert("Please login first to create a professional profile");
        return;
    }

    if (!db) {
      if (isMock) {
        navigate('/expert');
        return;
      }
      return;
    }

    try {
      const expertData = {
        ...formData,
        userId: auth.currentUser.uid,
        experience: parseInt(formData.experience),
        isVerified: false,
        rating: 5.0,
        slug: formData.name.toLowerCase().replace(/ /g, '-'),
        createdAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'experts', auth.currentUser.uid), expertData);
      navigate('/expert');
    } catch (error) {
      console.error(error);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans selection:bg-blue-100 italic-text">
       <nav className="p-8 flex items-center justify-between">
         <div className="flex items-center gap-6">
           <button 
             onClick={() => navigate(-1)}
             className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm group"
           >
             <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
           </button>
           <Logo />
         </div>
       </nav>

       <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="space-y-4 mb-12 text-center">
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 uppercase italic tracking-tighter">
                Join our <span className="text-blue-600">Expert Network</span>
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Build your digital legal practice in minutes</p>
          </div>

          {/* Stepper */}
          <div className="flex justify-center gap-4 mb-12">
            {[1, 2, 3].map(s => (
                <div key={s} className={`w-12 h-1.5 rounded-full transition-all ${step >= s ? 'bg-blue-600' : 'bg-slate-100'}`} />
            ))}
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[50px] border border-slate-100 shadow-3xl">
             <div className="flex justify-between items-center mb-8">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Join as Practitioner</p>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                >
                  Already registered? Login here
                </button>
             </div>
             <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-6">
                        <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Choose your domain</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {roles.map(r => (
                                <button
                                    key={r.id}
                                    onClick={() => setFormData({...formData, role: r.id as any})}
                                    className={`p-8 rounded-[32px] border-2 transition-all flex flex-col items-center gap-4 text-center group ${formData.role === r.id ? 'border-blue-600 bg-blue-50/50' : 'border-slate-50 hover:border-blue-100'}`}
                                >
                                    <div className={`w-16 h-16 rounded-[22px] flex items-center justify-center transition-all ${formData.role === r.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'bg-slate-50 text-slate-300'}`}>
                                        <r.icon size={28} />
                                    </div>
                                    <span className="text-sm font-black uppercase tracking-tight italic">{r.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <Button onClick={() => setStep(2)} className="w-full h-16 rounded-2xl text-lg font-black uppercase italic tracking-tighter bg-blue-600">
                        Continue Registration <ArrowRight className="ml-2" />
                    </Button>
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
                    <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Professional Credentials</h3>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                            <input 
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                className="w-full h-14 px-6 bg-slate-50 rounded-2xl border-none font-bold text-slate-900" 
                                placeholder="e.g. Adv. Rahul Mehra"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Membership/COP ID</label>
                                <input 
                                    value={formData.membershipId}
                                    onChange={e => setFormData({...formData, membershipId: e.target.value})}
                                    className="w-full h-14 px-6 bg-slate-50 rounded-2xl border-none font-bold" 
                                    placeholder="Reg No"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Exp (Years)</label>
                                <input 
                                    type="number"
                                    value={formData.experience}
                                    onChange={e => setFormData({...formData, experience: e.target.value})}
                                    className="w-full h-14 px-6 bg-slate-50 rounded-2xl border-none font-bold" 
                                    placeholder="Years"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button onClick={() => setStep(1)} variant="outline" className="h-16 flex-1 rounded-2xl font-black uppercase">Back</Button>
                        <Button onClick={() => setStep(3)} className="h-16 flex-1 rounded-2xl font-black uppercase bg-blue-600">Next Step</Button>
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
                    <div className="text-center space-y-2 mb-8">
                        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-100">
                            <ShieldCheck size={40} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Final Review</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase">Our team will verify your credentials within 24 hours.</p>
                    </div>
                    
                    <div className="bg-slate-50 p-6 rounded-3xl space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                            <span className="text-slate-400">Professional Role</span>
                            <span className="text-blue-600 italic">{formData.role}</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                            <span className="text-slate-400">Full Name</span>
                            <span className="text-slate-900">{formData.name}</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                            <span className="text-slate-400">Credentials</span>
                            <span className="text-slate-900">{formData.membershipId}</span>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button onClick={() => setStep(2)} variant="outline" className="h-16 flex-1 rounded-2xl font-black uppercase">Back</Button>
                        <Button onClick={handleSubmit} className="h-16 flex-1 rounded-2xl font-black uppercase bg-slate-900 text-white">Create Profile</Button>
                    </div>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>
       </div>
    </div>
  );
}
