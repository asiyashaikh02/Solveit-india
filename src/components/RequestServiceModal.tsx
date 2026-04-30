import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ChevronRight, Briefcase, FileText, ShieldCheck, CreditCard, Clock } from 'lucide-react';
import Button from './Button';
import { cn } from '../lib/utils';

interface RequestServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVAILABLE_SERVICES = [
  { id: 'gst-reg', name: 'GST Registration', icon: FileText, description: 'New GST registration for your business.' },
  { id: 'gst-fill', name: 'GST Filing (GSTR-1/3B)', icon: CreditCard, description: 'Monthly/Quarterly compliance filing.' },
  { id: 'itr', name: 'Income Tax Filing', icon: ShieldCheck, description: 'Annual income tax return for individuals/firms.' },
  { id: 'pvt-ltd', name: 'Private Limited Company', icon: Briefcase, description: 'Setup a new Pvt Ltd company from scratch.' },
  { id: 'trademark', name: 'Trademark Registration', icon: ShieldCheck, description: 'Protect your brand identity.' },
  { id: 'msme', name: 'MSME/Udyam Registration', icon: Clock, description: 'Get benefits of MSME schemes.' },
];

export default function RequestServiceModal({ isOpen, onClose }: RequestServiceModalProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    
    // Simulate API call
    console.log('Requesting service:', { selectedService, description });
    setIsSubmitted(true);
    
    // Reset after success
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedService(null);
      setDescription('');
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-3xl shadow-2xl z-[70] overflow-hidden"
          >
            {isSubmitted ? (
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 12, stiffness: 200 }}
                  className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h2>
                <p className="text-slate-500 max-w-sm">
                  Our expert will review your request and get back to you within 4 business hours.
                </p>
              </div>
            ) : (
              <div className="flex flex-col h-full max-h-[90vh]">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Request New Service</h2>
                    <p className="text-sm text-slate-500">Fast and reliable business compliance help</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                        Select Service
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {AVAILABLE_SERVICES.map((service) => (
                          <div
                            key={service.id}
                            onClick={() => setSelectedService(service.id)}
                            className={cn(
                              "relative p-4 rounded-2xl border transition-all cursor-pointer group",
                              selectedService === service.id
                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                : "border-slate-100 bg-white hover:border-slate-300"
                            )}
                          >
                            <div className="flex gap-4">
                              <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                                selectedService === service.id ? "bg-primary text-white" : "bg-slate-50 text-slate-600"
                              )}>
                                <service.icon size={20} />
                              </div>
                              <div className="pr-4">
                                <h4 className="font-bold text-sm text-slate-900 mb-0.5">{service.name}</h4>
                                <p className="text-[11px] text-slate-500 leading-tight">{service.description}</p>
                              </div>
                            </div>
                            {selectedService === service.id && (
                              <div className="absolute top-4 right-4 text-primary">
                                <CheckCircle2 size={16} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Brief Description (Optional)
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tell us a bit more about your requirements..."
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none min-h-[120px] transition-all"
                      />
                    </div>

                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        disabled={!selectedService}
                        className="w-full text-base py-4 rounded-2xl"
                      >
                        Submit Request
                        <ChevronRight size={20} className="ml-2" />
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
