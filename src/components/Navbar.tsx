import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 lg:px-24 flex items-center justify-between pointer-events-none">
      <Link to="/" className="flex items-center gap-3 group pointer-events-auto">
        <div className="w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-500 overflow-hidden relative border border-[#C68E5D]/20 bg-[#1A120B]/80 backdrop-blur-xl shadow-2xl">
          <img 
            src="/logo.png" 
            alt="Assava Logo" 
            className="w-full h-full object-cover scale-[0.8] transition-transform duration-700" 
          />
        </div>
        <span className="text-3xl font-bold tracking-tighter text-[#F5F5DC] group-hover:text-[#C68E5D] transition-colors uppercase font-serif italic">ASSAVA</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-[#A67C52] pointer-events-auto">
        <Link to="/" className="hover:text-[#F5F5DC] transition-colors">Experience</Link>
        <Link to="/shop" className="hover:text-[#F5F5DC] transition-colors">Collection</Link>
        <Link to="/about" className="hover:text-[#F5F5DC] transition-colors">Archive</Link>
      </div>
      
      <div className="flex items-center gap-6 pointer-events-auto">
        <Link to="/cart" className="relative p-3 bg-[#1A120B]/60 backdrop-blur-xl border border-[#C68E5D]/10 rounded-full transition-all group hover:bg-[#3B2A1E]">
          <ShoppingCart className="w-5 h-5 text-[#F5F5DC]" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C68E5D] text-[#1A120B] text-[10px] font-black rounded-full flex items-center justify-center shadow-lg">2</span>
        </Link>
        <Link to="/account" className="flex items-center gap-3 bg-[#1A120B]/80 backdrop-blur-xl border border-[#C68E5D]/10 px-6 py-3 rounded-full text-xs font-black uppercase tracking-[0.2em] text-[#F5F5DC] hover:bg-[#3B2A1E] transition-all">
          <User className="w-4 h-4 text-[#C68E5D]" />
          <span className="hidden sm:inline">Account</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
