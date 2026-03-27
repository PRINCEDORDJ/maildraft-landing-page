import { ArrowRight } from 'lucide-react';

interface CTAProps {
  onJoinClick: () => void;
}

export const CTA = ({ onJoinClick }: CTAProps) => {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-[#020617]">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center glass-panel p-12 md:p-20 rounded-3xl border border-white/10 shadow-premium">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Ready to elevate your emails?
        </h2>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-medium">
          Join thousands of professionals creating perfectly crafted, impactful emails in seconds.
        </p>
        
        <button 
          onClick={onJoinClick}
          className="btn-primary inline-flex items-center"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Get Early Access <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </section>
  );
};
