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
    <section id='features' className="relative pt-40 pb-20 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[160px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>Smart Template Library</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-slide-up leading-[1.1]">
            Stop Staring at <br />
            <span className="text-blue-500">Blank Email Drafts.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-slide-up animation-delay-200">
            Get instant access to a curated library of professionally-written email templates for every workplace scenario. Copy, paste, and send in seconds.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 animate-slide-up animation-delay-300">
            {highlights.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-slide-up animation-delay-400">
            <button 
              onClick={onJoinClick}
              className="btn-primary flex items-center gap-2 group"
            >
              Get Early Access
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#how-it-works" className="text-slate-300 hover:text-white font-medium px-6 py-3 transition-colors border border-transparent hover:border-white/10 rounded-full">
              See how it works
            </a>
          </div>
        </div>
        
        <div className="flex-[0.8] w-full max-w-2xl animate-float lg:translate-y-4">
          <div className="relative group">
            {/* Mockup Frame */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[32px] blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
            <div className="relative glass-card overflow-hidden shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] border-white/20 aspect-[16/10]">
              <img 
                src="/mockup.png" 
                alt="MailDraft Mockup" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
