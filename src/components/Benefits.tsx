import { Clock, ShieldCheck, Zap, Library } from 'lucide-react';

const benefits = [
  {
    title: "Save Hours of Time",
    description: "No more agonizing over phrasing or tone. Get the right words instantly.",
    icon: Clock,
    color: "text-brand-primary",
    bgColor: "bg-brand-primary/10"
  },
  {
    title: "Always Sound Professional",
    description: "Templates written by experts for high-stakes workplace communication.",
    icon: ShieldCheck,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10"
  },
  {
    title: "Smart Personalization",
    description: "Intelligent placeholders make every template feel unique to your recipient.",
    icon: Zap,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10"
  },
  {
    title: "Your Own Library",
    description: "Save, organize, and customize templates to build your personal brand voice.",
    icon: Library,
    color: "text-brand-secondary",
    bgColor: "bg-brand-secondary/10"
  }
];

export const Benefits = () => {
  return (
    <section id="benefits" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-grid -z-10 opacity-20" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white">Built for Professionals</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">
            MailDraft is designed to streamline your communication workflow, ensuring you never miss a beat with premium grade templates.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="glass-panel p-10 group relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-brand-primary/10 transition-colors duration-500" />
              
              <div className={`w-14 h-14 rounded-2xl ${benefit.bgColor} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-white/5`}>
                <benefit.icon className={`w-7 h-7 ${benefit.color}`} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">{benefit.title}</h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
