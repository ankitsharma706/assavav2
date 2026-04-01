import React from 'react';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  Linkedin, 
  Twitter, 
  ArrowRight, 
  MapPin, 
  Mail, 
  Phone,
  Globe,
  Star,
  ChevronRight,
  Send
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Explore",
      links: [
        { name: "The Shop", path: "/shopping" },
        { name: "Categories", path: "/category" },
        { name: "Events", path: "/events" },
        { name: "The Story", path: "/story" },
        { name: "About", path: "/about" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Contact", path: "/contact" },
        { name: "FAQ", path: "/faq" },
        { name: "Shipping", path: "/shipping" },
        { name: "Returns", path: "/returns" },
        { name: "Terms & Conditions", path: "/terms" }
      ]
    },
    {
      title: "Connection",
      links: [
        { name: "Instagram", path: "https://instagram.com", external: true },
        { name: "LinkedIn", path: "https://linkedin.com", external: true },
        { name: "Twitter", path: "https://twitter.com", external: true }
      ]
    }
  ];

  return (
    <footer className="relative bg-[#1A120B] text-[#F5F5DC] pt-60 pb-20 px-6 overflow-hidden border-t border-[#C68E5D]/10">
      {/* Decorative Gradient Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C68E5D]/30 to-transparent" />
      
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] bg-[#C68E5D]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-12">
            <Link to="/" className="flex items-center gap-4 group">
               <div className="w-16 h-16 rounded-full border border-[#C68E5D]/20 flex items-center justify-center p-2 bg-[#140D08] group-hover:border-[#C68E5D] transition-colors overflow-hidden shadow-2xl">
                  <img src="/logo.png" className="w-full h-full object-cover p-2" alt="Assava" />
               </div>
               <span className="text-4xl font-serif font-black text-[#C68E5D] italic tracking-tighter uppercase">ASSAVA</span>
            </Link>
            <p className="text-xl text-[#F5F5DC]/60 italic font-serif leading-relaxed max-w-sm">
               "Crafting coffee experiences beyond the ordinary. A devotion to the outliers and the ritualists of the world."
            </p>
            <div className="flex gap-4">
               {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                 <motion.a
                   key={i}
                   href="#"
                   whileHover={{ y: -5, backgroundColor: '#3B2A1E', borderColor: '#C68E5D' }}
                   className="w-12 h-12 rounded-full border border-[#C68E5D]/10 bg-[#140D08] flex items-center justify-center text-[#A67C52] transition-all"
                 >
                   <Icon size={18} />
                 </motion.a>
               ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-12">
             {footerLinks.map((section, i) => (section.links && section.links.length > 0 && (
               <div key={i} className="space-y-10">
                  <h4 className="text-[10px] uppercase tracking-[0.5em] font-black text-[#A67C52] italic opacity-60">/ {section.title}</h4>
                  <ul className="space-y-6">
                     {section.links.map((link, j) => (
                       <li key={j}>
                          {link.external ? (
                            <a 
                              href={link.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs uppercase font-black tracking-widest text-[#F5F5DC]/30 hover:text-[#C68E5D] hover:pl-2 transition-all group flex items-center gap-2"
                            >
                               {link.name} <ChevronRight className="w-3 h-3 text-[#C68E5D] opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          ) : (
                            <Link 
                              to={link.path}
                              className="text-xs uppercase font-black tracking-widest text-[#F5F5DC]/30 hover:text-[#C68E5D] hover:pl-2 transition-all group flex items-center gap-2"
                            >
                               {link.name} <ChevronRight className="w-3 h-3 text-[#C68E5D] opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          )}
                       </li>
                     ))}
                  </ul>
               </div>
             )))}
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-10">
             <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.5em] font-black text-[#A67C52] italic opacity-60">/ Exclusive Registry</h4>
                <p className="text-sm italic font-serif text-[#F5F5DC]/40">Join the ritual for a monthly digest of disappearing lots and early registry access.</p>
             </div>
             
             <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Enter your devotion email"
                  className="w-full bg-[#140D08] border border-[#C68E5D]/10 rounded-full px-8 py-5 text-sm italic font-serif text-[#F5F5DC] focus:outline-none focus:border-[#C68E5D] focus:bg-[#1A120B] transition-all outline-none pr-20"
                />
                <button className="absolute right-2 top-2 bottom-2 w-16 bg-[#C68E5D] hover:bg-[#3B2A1E] rounded-full flex items-center justify-center text-[#1A120B] hover:text-[#F5F5DC] shadow-lg shadow-[#C68E5D]/10 transition-all hover:scale-105 active:scale-95">
                   <Send className="w-4 h-4" />
                </button>
             </div>
             
             <span className="block text-[8px] uppercase tracking-widest text-[#A67C52]/20 font-black">Designed for those who seek more than coffee.</span>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-20 border-t border-[#C68E5D]/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-8 text-[10px] uppercase tracking-widest font-black text-[#A67C52]/30">
              <span>© {currentYear} ASSAVA. ALL RIGHTS RESERVED.</span>
              <span className="hidden md:block w-[1px] h-4 bg-[#C68E5D]/10" />
              <span className="hidden md:block">Bhubaneswar, Odisha</span>
           </div>
           <div className="flex items-center gap-12">
              <span className="text-[10px] uppercase tracking-widest font-black text-[#A67C52]/30 hover:text-[#C68E5D] cursor-pointer transition-colors">Privacy Ritual</span>
              <span className="text-[10px] uppercase tracking-widest font-black text-[#A67C52]/30 hover:text-[#C68E5D] cursor-pointer transition-colors">Terms of Devotion</span>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
