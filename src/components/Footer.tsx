
interface FooterProps {
  onJoinClick: () => void;
}

export const Footer = ({ onJoinClick }: FooterProps) => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-24 px-6 border-t border-white/[0.05] bg-[#020617]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 text-sm">
        <div className="flex gap-16 flex-1">
          <div>
            <h4 className="font-bold mb-6 text-white text-xs uppercase tracking-[0.2em]">Links</h4>
            <ul className="space-y-4 text-slate-400 font-medium">
              <li><a href="#features" onClick={(e) => handleScrollTo(e, 'features')} className="hover:text-brand-primary transition-colors">Features</a></li>
              <li><a href="#benefits" onClick={(e) => handleScrollTo(e, 'benefits')} className="hover:text-brand-primary transition-colors">Benefits</a></li>
              <li><a href="#how-it-works" onClick={(e) => handleScrollTo(e, 'how-it-works')} className="hover:text-brand-primary transition-colors">How it Works</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="MailDraft Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white mb-0">MailDraft</span>
          </div>
          <p className="text-slate-400 mb-6 max-w-xs md:text-right">
            The premium way to craft professional emails.
          </p>
          <button 
            onClick={onJoinClick}
            className="btn-primary py-2.5! px-6! text-sm!"
          >
            Get Early Access
          </button>
        </div>
      </div>
    </footer>
  );
};
