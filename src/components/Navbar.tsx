import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onJoinClick: () => void;
}

export const Navbar = ({ onJoinClick }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'How it Works', href: '#how-it-works' },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-black/10 border-b border-white/5">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="MailDraft Logo" className="w-8 h-8 object-contain" />
        <span className="text-xl font-bold tracking-tight text-white">MailDraft</span>
      </div>
      
      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            className="hover:text-white transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onJoinClick}
          className="hidden md:block bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          Join Waitlist
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-slate-300 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0f172a] border-b border-white/5 p-6 space-y-4 animate-fade-in md:hidden">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="block text-lg font-medium text-slate-300 hover:text-white"
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
            className="w-full bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-full text-sm font-semibold transition-all"
          >
            Join Waitlist
          </button>
        </div>
      )}
    </nav>
  );
};
