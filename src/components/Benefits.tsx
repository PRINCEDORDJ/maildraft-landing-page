import { Clock, ShieldCheck, Zap, Library } from 'lucide-react';

const benefits = [
  {
    title: "Save Hours of Time",
    description: "No more agonizing over phrasing or tone. Get the right words instantly.",
    icon: Clock,
    color: "text-blue-500"
  },
  {
    title: "Always Sound Professional",
    description: "Templates written by experts for high-stakes workplace communication.",
    icon: ShieldCheck,
    color: "text-emerald-500"
  },
  {
    title: "Smart Personalization",
    description: "Intelligent placeholders make every template feel unique to your recipient.",
    icon: Zap,
    color: "text-amber-500"
  },
  {
    title: "Your Own Library",
    description: "Save, organize, and customize templates to build your personal brand voice.",
    icon: Library,
    color: "text-purple-500"
  }
];

export const Benefits = () => {
  return (
    <section id="benefits" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Built for Professionals</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            MailDraft is designed to streamline your communication workflow, ensuring you never miss a beat.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="glass-card p-8 group hover:border-blue-500/30 transition-all duration-300">
              <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${benefit.color}`}>
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{benefit.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
