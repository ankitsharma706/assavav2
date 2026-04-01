import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CoffeeEvent } from '../types';
import { Calendar, Clock, MapPin, Ticket, Users, Check, Sparkles, Star, Instagram, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

// ─── EVENT HERO ──────────────────────────────────────────────
export const EventHero: React.FC<{ event: CoffeeEvent }> = ({ event }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <img
          src={event.heroImage || event.images[0]}
          alt={event.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-coffee-dark/40 via-coffee-dark/30 to-coffee-dark" />
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="block font-mono text-[10px] uppercase text-caramel mb-6 tracking-[0.6em] font-bold"
        >
          {event.category}
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="text-6xl md:text-9xl font-bold tracking-tighter text-white font-serif mb-6 uppercase"
        >
          {event.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-white/80 text-xl md:text-3xl italic font-light font-serif"
        >
          {event.tagline}
        </motion.p>
      </div>
    </section>
  );
};

// ─── EVENT CARD ──────────────────────────────────────────────
export const EventCard: React.FC<{ event: CoffeeEvent }> = ({ event }) => {
  return (
    <Link to={`/events/${event.id}`} className="group relative block aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl bg-coffee-dark border border-white/5">
      <motion.img
        src={event.heroImage || event.images[0]}
        alt={event.title}
        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark via-coffee-dark/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
      
      {/* Category Tag */}
      <div className="absolute top-6 left-6 px-4 py-2 rounded-full glass border border-white/10 text-[8px] font-bold uppercase tracking-widest text-caramel">
        {event.category}
      </div>

      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-mono text-[10px] tracking-[0.4em] uppercase text-caramel/80 mb-2"
        >
          {event.date}
        </motion.span>
        <h3 className="text-3xl font-bold tracking-tighter text-white font-serif mb-1 uppercase group-hover:text-glow transition-all duration-500">
          {event.title}
        </h3>
        <p className="text-white/60 text-sm font-light italic font-serif leading-tight opacity-0 -translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          {event.tagline}
        </p>
      </div>
    </Link>
  );
};

// ─── EVENT FILTERS ──────────────────────────────────────────
export const EventCategoryFilter: React.FC<{
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}> = ({ categories, active, onChange }) => (
  <div className="flex flex-wrap gap-4 items-center justify-center">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => onChange(cat)}
        className={cn(
          "px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 border",
          active === cat 
            ? "bg-caramel text-coffee-dark border-caramel shadow-xl scale-110" 
            : "glass border-white/5 text-white/40 hover:text-white hover:border-white/20"
        )}
      >
        {cat}
      </button>
    ))}
  </div>
);

// ─── EVENT TIMELINE ─────────────────────────────────────────
export const EventTimeline: React.FC<{ timeline: { time: string; activity: string }[] }> = ({ timeline }) => (
  <div className="space-y-12 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-[1px] before:bg-white/5">
    {timeline.map((item, i) => (
      <motion.div 
        key={i} 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.1 }}
        className="flex items-start gap-12 relative"
      >
        <div className="w-8 h-8 rounded-full bg-coffee-dark border border-caramel flex items-center justify-center shrink-0 relative z-10">
           <div className="w-2 h-2 rounded-full bg-caramel animate-pulse" />
        </div>
        <div className="space-y-2">
           <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-caramel/60">{item.time}</span>
           <p className="text-2xl font-bold font-serif text-white uppercase tracking-tight">{item.activity}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

// ─── EVENT TICKETS ──────────────────────────────────────────
export const EventTicketTypes: React.FC<{
  ticketTypes: { name: string; price: number; features: string[]; spotsLeft?: number }[];
  onSelect: (name: string) => void;
}> = ({ ticketTypes, onSelect }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {ticketTypes.map((ticket, i) => (
      <motion.div 
        key={i}
        whileHover={{ y: -10 }}
        className="p-12 rounded-[48px] glass border border-white/5 space-y-10 group hover:glow-border transition-all duration-700 bg-white/2 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5"><Ticket className="w-32 h-32 rotate-12" /></div>
        
        <div className="space-y-6">
           <div className="flex justify-between items-start">
             <h4 className="text-3xl font-bold font-serif uppercase text-white tracking-tight">{ticket.name}</h4>
             <span className="text-2xl font-mono font-bold text-caramel">Rs{ticket.price}</span>
           </div>
           {ticket.spotsLeft !== undefined && (
             <div className="flex items-center gap-3">
               <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                 <motion.div initial={{ width: 0 }} whileInView={{ width: `${(ticket.spotsLeft / 20) * 100}%` }} className="h-full bg-caramel" />
               </div>
               <span className="text-[10px] font-bold text-caramel/60 uppercase tracking-widest">{ticket.spotsLeft} SPOTS LEFT</span>
             </div>
           )}
        </div>

        <ul className="space-y-4">
           {ticket.features.map((f, idx) => (
             <li key={idx} className="flex items-center gap-4 text-white/50 text-sm italic font-serif">
               <Check className="w-4 h-4 text-caramel" /> {f}
             </li>
           ))}
        </ul>

        <button 
          onClick={() => onSelect(ticket.name)}
          className="w-full py-6 rounded-full bg-caramel text-coffee-dark font-bold uppercase tracking-[0.4em] text-[10px] shadow-2xl hover:scale-105 transition-all"
        >
          Select Option
        </button>
      </motion.div>
    ))}
  </div>
);

// ─── EVENT SPEAKER ──────────────────────────────────────────
export const EventSpeakerCard: React.FC<{ name: string; role: string; image: string }> = ({ name, role, image }) => (
  <div className="flex items-center gap-6 p-8 rounded-[40px] glass border border-white/5 hover:border-caramel/30 transition-all">
    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-caramel/20 p-2">
       <img src={image} className="w-full h-full object-cover rounded-full" />
    </div>
    <div>
       <h4 className="text-xl font-bold text-white uppercase tracking-tight">{name}</h4>
       <p className="text-[10px] font-bold uppercase tracking-widest text-caramel/60">{role}</p>
    </div>
  </div>
);

// ─── EVENT SECTION ─────────────────────────────────────────────
export const EventSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => {
  return (
    <section className={cn("py-24 px-6 max-w-7xl mx-auto", className)}>
      <div className="mb-16 border-b border-caramel/10 pb-6 flex items-end justify-between">
        <h2 className="text-[10px] font-mono tracking-[0.5em] uppercase text-caramel font-bold italic">/ {title}</h2>
      </div>
      {children}
    </section>
  );
};

// ─── INFO ITEM ──────────────────────────────────────────────
export const InfoItem: React.FC<{ icon: any; label: string; value: string }> = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-6 p-6 rounded-[32px] glass border border-white/5 group hover:border-caramel/30 transition-all bg-white/2">
    <div className="p-4 rounded-2xl bg-caramel/10 text-caramel group-hover:bg-caramel transition-colors group-hover:text-coffee-dark">
      <Icon className="w-6 h-6" />
    </div>
    <div>
       <p className="text-[10px] uppercase font-mono tracking-widest text-caramel/50 mb-1">{label}</p>
       <p className="text-xl font-bold text-cream font-serif">{value}</p>
    </div>
  </div>
);

// ─── EVENT GALLERY (IG STYLE) ──────────────────────────────────
export const EventGallery: React.FC<{ images: string[]; handle: string }> = ({ images, handle }) => (
  <div className="space-y-12">
    <div className="flex items-center justify-between">
       <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden glass p-1 shadow-xl"><div className="w-full h-full rounded-full bg-caramel/20 flex items-center justify-center text-caramel font-black">A</div></div>
          <div><h4 className="text-sm font-bold text-white leading-none">{handle}</h4><span className="text-[10px] text-white/30 tracking-widest uppercase">Cultural Archive</span></div>
       </div>
       <Link to="/social" className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-caramel hover:text-white transition-all">Follow Experience <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" /></Link>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
       {images.map((img, i) => (
         <motion.div 
           key={i} 
           whileHover={{ scale: 0.98 }}
           className={cn("relative aspect-square overflow-hidden rounded-[32px] glass", i % 3 === 0 ? "lg:col-span-1" : "")}
         >
            <img src={img} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-caramel/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"><ChevronRight className="text-white w-8 h-8" /></div>
         </motion.div>
       ))}
    </div>
  </div>
);
