import { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle2, Sparkles, ChevronRight, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = ["Meetings", "Job Applications", "Networking", "Declining Requests"];

export const WaitlistModal = ({ isOpen, onClose }: WaitlistModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    challenge: '', 
    frequency: '6-15', 
    categories: [] as string[] 
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const toggleCategory = (cat: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(cat) 
        ? prev.categories.filter(c => c !== cat) 
        : [...prev.categories, cat]
    }));
  };

  const handleSubmit = async () => {
    setStatus('loading');
    try {
      // 1. Save to Supabase
      const { error: supabaseError } = await supabase
        .from('waitlist')
        .insert([{ 
          full_name: formData.name, 
          email: formData.email,
          challenge: formData.challenge,
          frequency: formData.frequency,
          categories: formData.categories
        }]);
      
      if (supabaseError) throw supabaseError;

      // 2. Send to n8n Webhook
      const WEBHOOK_URL = 'https://hook.us2.make.com/npoz8hv11euq2t388uhdkz99c8ddsyll';
      
      const dynamicPrompt = `New MailDraft Waitlist Signup:
- Name: ${formData.name}
- Email: ${formData.email}
- Daily Emails: ${formData.frequency}
- Interested Categories: ${formData.categories.join(', ') || 'None selected'}
- Biggest Challenge: ${formData.challenge || 'No challenge provided'}`;

      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          prompt_context: dynamicPrompt,
          submitted_at: new Date().toISOString()
        }),
      });

      setStatus('success');
    } catch (err: unknown) {
      console.error('Submission Error:', err);
      const error = err as { code?: string };
      if (error.code === '23505') { // Unique violation
        setStatus('duplicate');
      } else {
        setStatus('error');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto pt-20 pb-10">
      <div 
        className="fixed inset-0 bg-[#020617]/80 backdrop-blur-xl animate-fade-in" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-4xl glass-panel shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] overflow-hidden animate-slide-up flex flex-col md:flex-row min-h-[600px]">
        {/* Decorative Background Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-60 h-60 bg-brand-primary/10 rounded-full blur-[80px] -z-10" />
        <div className="absolute bottom-[-10%] left-[-10%] w-60 h-60 bg-brand-secondary/10 rounded-full blur-[80px] -z-10" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] transition-all z-20 group"
        >
          <X className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
        </button>

        {/* Sidebar / Progress */}
        <div className="w-full md:w-80 bg-white/[0.02] border-r border-white/5 p-10 flex flex-col">
          <div className="flex items-center gap-3 mb-16 group">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110">
              <img src="/logo.png" alt="MailDraft Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">MailDraft</span>
          </div>
          
          <div className="space-y-10">
            <div className={`relative transition-all duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-30'}`}>
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-primary rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <div className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] mb-2">Step 01</div>
              <div className="text-lg font-bold text-white">Contact Details</div>
              <div className="text-sm text-slate-500 font-medium">Your professional identity</div>
            </div>
            
            <div className={`transition-all duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-30'}`}>
              <div className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] mb-2">Step 02</div>
              <div className="text-lg font-bold text-white">Preference Survey</div>
              <div className="text-sm text-slate-500 font-medium">Tailoring your experience</div>
            </div>
          </div>

          <div className="mt-auto pt-16">
            <div className="glass-panel !rounded-2xl p-6 bg-white/[0.02]">
              <p className="text-sm text-slate-400 leading-relaxed font-medium italic">
                "We're building the future of email communication. Join us on this journey."
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
          {status === 'success' || status === 'duplicate' ? (
            <div className="text-center animate-fade-in max-w-sm mx-auto">
              <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-10 mx-auto ${status === 'duplicate' ? 'bg-brand-primary/10' : 'bg-emerald-500/10'} shadow-2xl`}>
                {status === 'duplicate' ? (
                  <Sparkles className="w-12 h-12 text-brand-primary" />
                ) : (
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                )}
              </div>
              <h2 className="text-3xl font-black mb-4 tracking-tight text-white">
                {status === 'duplicate' ? "Welcome Back!" : "You're on the list!"}
              </h2>
              <p className="text-slate-400 text-lg font-medium mb-12 leading-relaxed">
                {status === 'duplicate' 
                  ? "You're already registered for early access. Keep an eye on your inbox for the invitation!"
                  : "Thanks for joining. We'll be in touch soon with your exclusive early access invite."
                }
              </p>
              <button 
                onClick={onClose} 
                className="btn-primary w-full text-lg"
              >
                Return to Site
              </button>
            </div>
          ) : (
            <div className="max-w-md mx-auto w-full">
              <div className="mb-12">
                <h2 className="text-4xl font-black mb-4 tracking-tight text-white">
                  {step === 1 ? "Join the Waitlist" : "Tell us more"}
                </h2>
                <p className="text-slate-400 font-medium text-lg">
                  {step === 1 
                    ? "Get early access to our curated template library." 
                    : "Help us customize MailDraft for your workflow."}
                </p>
              </div>

              {step === 1 ? (
                <div className="space-y-8 animate-fade-in">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Jane Cooper"
                      className="glass-input w-full text-lg"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Professional Email</label>
                    <input 
                      required
                      type="email" 
                      placeholder="jane@company.com"
                      className="glass-input w-full text-lg"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <button 
                    onClick={() => setStep(2)}
                    disabled={!formData.name || !formData.email}
                    className="btn-primary w-full flex items-center justify-center gap-3 mt-8 text-lg"
                  >
                    Continue
                    <ChevronRight className="w-6 h-6 border-l border-white/20 pl-2" />
                  </button>
                </div>
              ) : (
                <div className="space-y-10 animate-fade-in">
                  <div className="space-y-4">
                    <h4 className="text-sm font-black text-slate-300 uppercase tracking-widest">Main Scenario?</h4>
                    <div className="flex flex-wrap gap-3">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className={`px-5 py-2.5 rounded-2xl border text-sm font-bold transition-all duration-300 ${
                            formData.categories.includes(cat)
                              ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/30'
                              : 'bg-white/[0.03] border-white/[0.08] text-slate-400 hover:border-white/20 hover:bg-white/[0.05]'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-black text-slate-300 uppercase tracking-widest">Daily Volume?</h4>
                    <div className="flex gap-4">
                      {['1-5', '6-15', '15+'].map(val => (
                        <button
                          key={val}
                          onClick={() => setFormData({ ...formData, frequency: val })}
                          className={`flex-1 py-4 rounded-2xl border text-base font-black transition-all duration-300 ${
                            formData.frequency === val 
                              ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/30' 
                              : 'bg-white/[0.03] border-white/[0.08] text-slate-400 hover:border-white/20 hover:bg-white/[0.05]'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mt-12">
                    <button 
                      onClick={handleSubmit}
                      disabled={status === 'loading'}
                      className="btn-primary w-full flex items-center justify-center gap-3 text-lg"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Processing...
                        </>
                      ) : "Claim Your Spot"}
                    </button>
                    <button 
                      onClick={() => setStep(1)}
                      className="flex items-center justify-center gap-2 text-slate-500 font-bold hover:text-white transition-colors py-3 group"
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      Back to Contact Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
