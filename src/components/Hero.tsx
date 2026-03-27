import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onJoinClick: () => void;
}

const highlights = [
  "100+ Expert-written templates",
  "Instant personalization",
  "Copy-paste to any platform",
  "Professional tone guaranteed"
];

export const Hero = ({ onJoinClick }: HeroProps) => {
  return (
    <section id='features' className="relative pt-32 md:pt-48 pb-20 md:pb-32 px-4 md:px-6 overflow-hidden bg-grid">
      {/* Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-secondary/10 rounded-full blur-[120px] animate-pulse-glow stagger-2" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-brand-primary text-sm font-bold mb-10 transition-transform hover:scale-105 cursor-default">
            <Sparkles className="w-4 h-4" />
            <span className="tracking-wide uppercase text-[10px]">v1.0 Early Access</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
            Stop Staring at <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-accent"> Blank Email Drafts.</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium px-4 lg:px-0">
            MailDraft is the world's most curated library of professionally-written email templates for every workplace scenario.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-10 px-4 lg:px-0">
            {highlights.map((item, i) => (
              <div key={i} className={`flex items-center gap-3 text-slate-300 transition-all duration-500 stagger-${(i % 3) + 1}`}>
                <div className="w-6 h-6 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0 border border-brand-primary/20">
                  <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                </div>
                <span className="text-sm font-semibold tracking-tight">{item}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 w-full px-4 lg:px-0">
            <button 
              onClick={onJoinClick}
              className="btn-primary flex justify-center items-center gap-3 group px-8 sm:px-12 w-full sm:w-auto"
            >
              Get Early Access
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
            <a href="#how-it-works" className="text-center w-full sm:w-auto text-slate-400 hover:text-white font-bold px-8 py-4 transition-all border border-white/5 hover:border-white/20 rounded-full hover:bg-white/[0.03]">
              Watch Tutorial
            </a>
          </div>
        </div>
        
        <div className="flex-1 w-full max-w-2xl animate-float">
          <div className="relative group">
            {/* Dynamic Glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-[40px] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000" />
            
            <div className="relative glass-panel p-3 overflow-hidden shadow-premium !rounded-[40px]">
              <div className="relative rounded-[32px] overflow-hidden aspect-[16/10] bg-[#020617]">
                <img 
                  src="/mockup.png" 
                  alt="MailDraft Professional Interface" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-10 -right-10 glass-panel p-6 shadow-2xl hidden xl:block animate-float stagger-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-white">Live Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
