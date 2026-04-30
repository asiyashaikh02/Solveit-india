import React, { useState } from 'react';
import { Gift, Share2, Copy, Check, X, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import Button from './Button';

export default function ReferralWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const referralCode = 'SOLVEIT-PRO-2024';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[100] flex items-center">
      {/* Vertical Tab */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={cn(
          "w-10 h-36 bg-blue-600 rounded-r-2xl flex flex-col items-center justify-center gap-4 shadow-2xl text-white transition-all transform hover:w-11 group",
          isOpen && "opacity-0 pointer-events-none"
        )}
      >
        <Gift size={18} className="group-hover:scale-110 transition-transform" />
        <span className="[writing-mode:vertical-lr] rotate-180 text-[8px] font-black uppercase tracking-[0.2em] italic">
          Refer & Earn ₹500
        </span>
        <Sparkles size={14} className="animate-pulse text-blue-200" />
      </motion.button>

      {/* Vertical Slide-out Form */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="w-full max-w-[280px] bg-slate-900 text-white rounded-r-[40px] shadow-[32px_0_64px_-12px_rgba(0,0,0,0.5)] border-r border-y border-white/10 p-6 pt-10 relative"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all border border-white/5"
            >
              <X size={14} />
            </button>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-xl shadow-blue-500/20">
                  <Gift size={24} />
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none">
                  Invite <span className="text-blue-500">Business</span> Partners
                </h3>
                <p className="text-slate-400 text-[10px] font-medium italic">Refer a founder and earn ₹500 credits.</p>
              </div>

              <div className="space-y-4">
                 <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Your Code</label>
                    <div className="relative group">
                       <input 
                         readOnly 
                         value={referralCode}
                         className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 font-black text-blue-400 text-xs italic outline-none"
                       />
                       <button 
                         onClick={handleCopy}
                         className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center transition-all hover:bg-blue-500 active:scale-90 shadow-lg shadow-blue-500/20"
                       >
                         {copied ? <Check size={12} /> : <Copy size={12} />}
                       </button>
                    </div>
                 </div>

                 <form onSubmit={handleSend} className="space-y-3 pt-2">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Invite Email</label>
                      <input 
                        type="email"
                        required
                        placeholder="founder@partner.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-xs font-bold placeholder:italic outline-none focus:border-blue-600 transition-all"
                      />
                    </div>
                    <Button 
                      loading={isSent}
                      className={cn(
                        "w-full h-11 rounded-xl text-xs font-black uppercase italic tracking-tighter",
                        isSent ? "bg-emerald-500 hover:bg-emerald-500" : "bg-white text-slate-900"
                      )}
                    >
                      {isSent ? <><Check className="mr-2" size={12} /> Sent</> : <><Share2 className="mr-2" size={12} /> Send Invite</>}
                    </Button>
                 </form>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-[8px] font-black uppercase tracking-[0.1em] text-slate-500">Rewards</p>
                  <p className="text-lg font-black italic tracking-tighter">₹2,500</p>
                </div>
                <div className="w-8 h-8 rounded-full border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
