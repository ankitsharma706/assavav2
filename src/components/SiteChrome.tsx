import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Menu, ShoppingCart, User, X } from 'lucide-react';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenCategories: () => void;
  cartCount: number;
  wishlistCount?: number;
}

export function Navbar({ onOpenCart, onOpenCategories, cartCount, wishlistCount = 0 }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { label: 'Shop', to: '/shop' },
    { label: 'Categories', action: onOpenCategories },
    { label: 'Events', to: '/events' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#140D08]/80 px-5 py-4 text-cream backdrop-blur-xl">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center gap-3" aria-label="Assava home">
          <img src="/logo.png" alt="" aria-hidden="true" width="48" height="48" className="h-12 w-12 rounded-full object-cover" />
          <span className="font-serif text-2xl font-bold italic tracking-tight">ASSAVA</span>
        </Link>
        <div className="hidden items-center gap-7 text-xs font-bold uppercase tracking-widest md:flex">
          {links.map(({ label, to, action }) => to
            ? <Link key={label} to={to} className="hover:text-[#C68E5D]">{label}</Link>
            : <button key={label} type="button" onClick={action} className="hover:text-[#C68E5D]">{label}</button>)}
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onOpenCart} aria-label={`Open cart, ${cartCount} items`} className="relative rounded-full p-3 hover:bg-white/10">
            <ShoppingCart aria-hidden="true" className="h-5 w-5" />
            <span className="sr-only">{cartCount} items</span>
          </button>
          <Link to="/account" aria-label={`Account, ${wishlistCount} saved items`} className="rounded-full p-3 hover:bg-white/10">
            <Heart aria-hidden="true" className="h-5 w-5" />
            <span className="sr-only">{wishlistCount} saved items</span>
          </Link>
          <Link to="/account" className="hidden items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-bold uppercase sm:flex">
            <User aria-hidden="true" className="h-4 w-4" /> Account
          </Link>
          <button type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="rounded-full p-3 hover:bg-white/10 md:hidden">
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>
      {menuOpen && <div className="mx-auto flex max-w-7xl flex-col gap-4 py-5 md:hidden">
        {links.map(({ label, to, action }) => to
          ? <Link key={label} to={to} onClick={() => setMenuOpen(false)}>{label}</Link>
          : <button key={label} type="button" onClick={() => { action?.(); setMenuOpen(false); }} className="text-left">{label}</button>)}
      </div>}
    </header>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-[#050505] px-6 pt-24 text-center text-white">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(90,62,43,0.25),#000_75%)]" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.8em] text-[#A67C52]">Specialty coffee, thoughtfully sourced</p>
        <h1 className="mb-8 text-6xl font-black uppercase italic tracking-tighter text-[#C68E5D] md:text-9xl">
          Assava <span className="font-light lowercase text-[#F5F5DC]">Collective</span>
        </h1>
        <p className="mx-auto mb-10 max-w-xl font-serif text-xl italic text-[#F5F5DC]/75">
          Every bean a ritual. Every cup a translation of terroir.
        </p>
        <Link to="/shop" className="inline-flex rounded-full border border-[#C68E5D]/50 bg-[#1A120B] px-10 py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#3B2A1E]">
          Explore the collection
        </Link>
      </div>
    </section>
  );
}
