import { Mail, Twitter, Github, ArrowRight } from 'lucide-react';

interface FooterProps {
  onJoinClick: () => void;
}

export const Footer = ({ onJoinClick }: FooterProps) => {
  return (
    <footer className="py-24 px-6 border-t border-white/5 bg-black/20">
      {/* Footer CTA */}
      <div className="max-w-6xl mx-auto mb-24">
        <div className="glass-card p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full -z-10" />
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-4xl font-bold mb-4">Ready to perfect your emails?</h3>
            <p className="text-slate-400">Join 2,000+ professionals using MailDraft templates.</p>
          </div>
          <button 
            onClick={onJoinClick}
            className="btn-primary flex items-center gap-2 whitespace-nowrap group"
          >
            Join Waitlist
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <Mail className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold tracking-tight text-white">MailDraft</span>
          </div>
          <p className="text-slate-400 max-w-sm">
            MailDraft is a smart template library that helps professionals stop staring at blank drafts and start sounding like experts.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
              <Twitter className="w-5 h-5 text-slate-300" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
              <Github className="w-5 h-5 text-slate-300" />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-wider">Product</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><a href="#" className="hover:text-blue-500 transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">API Reference</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Integrations</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-wider">Company</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
        <p>© 2024 MailDraft Inc. Built for high-growth teams.</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Built with MailDraft Library</span>
        </div>
      </div>
    </footer>
  );
};
