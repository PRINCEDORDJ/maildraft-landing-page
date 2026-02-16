import { Search, Copy, Send, LayoutPanelLeft } from 'lucide-react';

const steps = [
  {
    title: "Browse Templates",
    description: "Explore our library of hundreds of expert-crafted templates for any workplace scenario.",
    icon: Search,
    color: "blue"
  },
  {
    title: "Customize Instantly",
    description: "Use smart placeholders to automatically fill in names, dates, and key details.",
    icon: LayoutPanelLeft,
    color: "purple"
  },
  {
    title: "Copy & Send",
    description: "One click to copy to your clipboard, then paste into your email provider of choice.",
    icon: Copy,
    color: "emerald"
  },
  {
    title: "Send with Confidence",
    description: "Hit send knowing your message has the perfect tone, grammar, and impact.",
    icon: Send,
    color: "amber"
  }
];

const colorMap: Record<string, { bg: string, text: string, border: string }> = {
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/20' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/20' },
};

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 text-slate-100">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">How it works</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Stop wasting time drafting from scratch. MailDraft transforms your email workflow in four simple steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent -z-10" />
          
          {steps.map((step, index) => {
            const colors = colorMap[step.color];
            return (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 relative z-10 transition-all duration-500 ${colors.bg} border ${colors.border} shadow-2xl group-hover:scale-110 group-hover:bg-opacity-20`}>
                  <step.icon className={`w-8 h-8 ${colors.text}`} strokeWidth={2} />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#0f172a] border border-white/10 flex items-center justify-center text-sm font-bold text-slate-400">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed px-4">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
