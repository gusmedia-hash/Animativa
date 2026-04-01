import React, { useState } from "react";
import { motion } from "motion/react";
import { Menu, X, Globe, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const LogoSmall = () => (
  <div className="flex items-center gap-1">
    <span className="text-2xl font-black text-white lowercase tracking-tighter flex items-baseline">
      an
      <span className="relative inline-flex flex-col items-center">
        <span className="absolute -top-[0.2em] w-[0.18em] h-[0.18em] rounded-full bg-brand-orange" />
        ı
      </span>
      mat
      <span className="relative inline-flex flex-col items-center">
        <span className="absolute -top-[0.2em] w-[0.18em] h-[0.18em] rounded-full bg-brand-blue" />
        ı
      </span>
      va
    </span>
  </div>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Iniciativas", href: "/iniciativas" },
    { name: "Voluntários", href: "/voluntarios" },
    { name: "Projetos", href: "/projetos" },
    { name: "Eventos", href: "/eventos" },
  ];

  return (
    <div className="min-h-screen bg-brand-purple selection:bg-brand-orange/30 text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-purple/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2">
              <LogoSmall />
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href}
                  className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                    location.pathname === link.href ? "text-brand-orange" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button className="bg-white text-brand-purple hover:bg-brand-orange hover:text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95">
                Participar
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-white">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-brand-purple border-b border-white/10 px-4 pt-2 pb-8"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-4 text-sm font-bold uppercase tracking-widest ${
                  location.pathname === link.href ? "text-brand-orange" : "text-white/70 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button className="w-full mt-6 bg-brand-orange text-white py-4 rounded-full font-black uppercase tracking-widest">
              Participar
            </button>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-brand-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <Link to="/" className="flex items-center gap-2">
                <LogoSmall />
              </Link>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-white/30">Conexões Vivas</p>
              <Link to="/admin" className="text-[10px] font-black uppercase tracking-widest text-white/10 hover:text-brand-orange transition-colors mt-4">Painel de Manutenção</Link>
            </div>
            
            <div className="flex gap-12 text-xs font-black uppercase tracking-widest text-white/40">
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos</a>
              <a href="#" className="hover:text-white transition-colors">Contato</a>
            </div>

            <div className="flex gap-6">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-orange transition-all cursor-pointer">
                <Globe className="w-4 h-4" />
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-blue transition-all cursor-pointer">
                <Users className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
              &copy; 2026 Animativa. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
