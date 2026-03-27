import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onJoinClick: () => void;
}

export const Navbar = ({ onJoinClick }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'How it Works', href: '#how-it-works' },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${
      isScrolled ? 'md:py-4' : 'md:py-6'
    }`}>
      <div className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-3 transition-all duration-500 ${
        isScrolled ? 'glass-panel !rounded-full py-3 shadow-premium bg-white/[0.05]' : 'bg-transparent'
      }`}>
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110">
            <img src="/logo.png" alt="MailDraft Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">MailDraft</span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-slate-400">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onJoinClick}
            className="hidden md:block btn-primary !py-2.5 !px-6 !text-sm"
          >
            Get Early Access
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-6 right-6 mt-4 glass-panel p-8 space-y-6 animate-fade-in md:hidden bg-[#0f172a]/95 backdrop-blur-3xl shadow-2xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="block text-xl font-bold text-slate-200 hover:text-brand-primary transition-colors"
              onClick={handleLinkClick}
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => {
              onJoinClick();
              handleLinkClick();
            }}
            className="w-full btn-primary"
          >
            Join Waitlist
          </button>
        </div>
      )}
    </nav>
  );
};
