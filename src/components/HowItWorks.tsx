import { Search, Copy, Send, LayoutPanelLeft, ArrowRight } from 'lucide-react';

const steps = [
  {
    title: "Browse Templates",
    description: "Explore our library of hundreds of expert-crafted templates for any workplace scenario.",
    icon: Search,
    color: "brand-primary",
    accent: "#3b82f6"
  },
  {
    title: "Customize Instantly",
    description: "Use smart placeholders to automatically fill in names, dates, and key details.",
    icon: LayoutPanelLeft,
    color: "brand-secondary",
    accent: "#8b5cf6"
  },
  {
    title: "Copy & Send",
    description: "One click to copy to your clipboard, then paste into your email provider of choice.",
    icon: Copy,
    color: "brand-accent",
    accent: "#06b6d4"
  },
  {
    title: "Perfect Response",
    description: "Hit send knowing your message has the perfect tone, grammar, and impact.",
    icon: Send,
    color: "brand-primary",
    accent: "#3b82f6"
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-40 px-6 relative overflow-hidden bg-brand-bg/50">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-28">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight text-white">How it works</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            Stop wasting time drafting from scratch. MailDraft transforms your email workflow in four simple steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-14 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10" />
          
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center group cursor-default">
              <div className="relative mb-10">
                <div className={`w-28 h-28 glass-panel !rounded-[2.5rem] flex items-center justify-center relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)] shadow-2xl`}>
                  <step.icon className={`w-10 h-10 text-${step.color}`} strokeWidth={1.5} />
                  <div className="absolute -top-4 -right-4 w-10 h-10 rounded-2xl bg-brand-bg border border-white/10 flex items-center justify-center text-sm font-black text-white shadow-xl">
                    0{index + 1}
                  </div>
                </div>
                
                {/* Desktop Arrow */}
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-10 transform -translate-y-1/2 w-6 h-6 text-white/10 group-hover:text-brand-primary/30 transition-colors duration-500" />
                )}
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">{step.title}</h3>
              <p className="text-slate-400 font-medium leading-relaxed px-6">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
