import { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle2, Sparkles, ChevronRight } from 'lucide-react';
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
    } catch (err: any) {
      console.error('Submission Error:', err);
      if (err.code === '23505') { // Unique violation
        setStatus('duplicate');
      } else {
        setStatus('error');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-5 min-h-[500px]">
          {/* Sidebar */}
          <div className="hidden md:block col-span-2 bg-blue-600/10 border-r border-white/5 p-8">
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <span className="font-bold tracking-tight">MailDraft</span>
            </div>
            
            <div className="space-y-6">
              <div className={`transition-all duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-40'}`}>
                <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">Step 01</div>
                <div className="text-sm font-semibold">Contact Info</div>
              </div>
              <div className={`transition-all duration-300 ${step >= 2 ? 'opacity-100' : 'opacity-40'}`}>
                <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">Step 02</div>
                <div className="text-sm font-semibold">User Survey</div>
              </div>
            </div>

            <div className="mt-auto pt-12">
              <p className="text-xs text-slate-500 leading-relaxed italic">
                "Stop staring at blank drafts and start sounding like an expert."
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="col-span-1 md:col-span-3 p-8 md:p-12 flex flex-col">
            {status === 'success' || status === 'duplicate' ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${status === 'duplicate' ? 'bg-blue-500/10' : 'bg-emerald-500/10'}`}>
                  {status === 'duplicate' ? (
                    <Sparkles className="w-10 h-10 text-blue-500" />
                  ) : (
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  )}
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  {status === 'duplicate' ? "You're already on the list!" : "You're on the list!"}
                </h2>
                <p className="text-slate-400 text-sm mb-8">
                  {status === 'duplicate' 
                    ? "We've already saved your spot. Watch your inbox for updates!"
                    : "Thanks for joining the MailDraft waitlist. We'll be in touch soon with your early access invite."
                  }
                </p>
                <button onClick={onClose} className="btn-primary w-full">Got it</button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Join the Waitlist</h2>
                  <p className="text-slate-400 text-sm">Be the first to know when we launch.</p>
                </div>

                {step === 1 ? (
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-400">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        className="glass-input w-full"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-400">Business Email</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@company.com"
                        className="glass-input w-full"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <button 
                      onClick={() => setStep(2)}
                      disabled={!formData.name || !formData.email}
                      className="btn-primary w-full flex items-center justify-center gap-2 mt-4"
                    >
                      Next Step
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6 animate-fade-in flex-1">
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Biggest challenge?</h4>
                      <textarea 
                        className="glass-input w-full h-20 resize-none text-sm"
                        placeholder="Finding the right tone..."
                        value={formData.challenge}
                        onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Daily email volume?</h4>
                      <div className="flex gap-2">
                        {['1-5', '6-15', '15+'].map(val => (
                          <button
                            key={val}
                            onClick={() => setFormData({ ...formData, frequency: val })}
                            className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-all ${
                              formData.frequency === val 
                                ? 'bg-blue-600 border-blue-500 text-white' 
                                : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/30'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Categories?</h4>
                      <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                          <button
                            key={cat}
                            onClick={() => toggleCategory(cat)}
                            className={`px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all ${
                              formData.categories.includes(cat)
                                ? 'bg-blue-600/20 border-blue-500/50 text-blue-400'
                                : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 mt-auto">
                      <button 
                        onClick={handleSubmit}
                        disabled={status === 'loading'}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                      >
                        {status === 'loading' ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : "Complete Registration"}
                      </button>
                      <button 
                        onClick={() => setStep(1)}
                        className="w-full text-slate-500 text-xs mt-4 hover:text-slate-300 transition-colors"
                      >
                        Back to Contact Info
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
