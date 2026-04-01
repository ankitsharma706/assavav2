import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Minus, Plus, User, Mail, Phone, MessageSquare, ArrowRight, Loader2, Calendar, MapPin, Clock, Ticket as TicketIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { CoffeeEvent } from '../types';

// --- Shared Components ---

const QuantitySelector = ({ value, onChange, max }: { value: number, onChange: (v: number) => void, max: number }) => (
  <div className="flex items-center gap-6 bg-white/5 rounded-2xl p-2 border border-white/5">
    <button 
      onClick={() => onChange(Math.max(1, value - 1))}
      className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors text-cream/50 hover:text-white"
    >
      <Minus className="w-4 h-4" />
    </button>
    <span className="font-mono text-lg font-bold w-6 text-center tabular-nums">{value}</span>
    <button 
      onClick={() => onChange(Math.min(max, value + 1))}
      className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors text-cream/50 hover:text-white"
    >
      <Plus className="w-4 h-4" />
    </button>
  </div>
);

// --- Ticket Card ---

const TicketCard = ({ 
  ticket, 
  isActive, 
  onSelect 
}: { 
  ticket: any, 
  isActive: boolean, 
  onSelect: () => void 
}) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -4 }}
    onClick={onSelect}
    className={cn(
      "relative p-8 rounded-[32px] cursor-pointer transition-all duration-500 border overflow-hidden group",
      isActive 
        ? "bg-caramel/10 border-caramel shadow-[0_0_40px_rgba(198,142,93,0.15)] ring-1 ring-caramel/50" 
        : "bg-white/[0.02] border-white/5 hover:border-white/20"
    )}
  >
    {/* Active Glow */}
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-caramel pointer-events-none"
        />
      )}
    </AnimatePresence>

    <div className="relative z-10 space-y-6">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-2xl font-serif text-white uppercase italic tracking-tight">{ticket.name}</h3>
          <p className="text-xs text-cream/40 italic font-serif">{ticket.description}</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-caramel font-mono tracking-tighter">₹{ticket.price}</span>
        </div>
      </div>

      <div className="space-y-3">
        {ticket.features.map((feature: string, i: number) => (
          <div key={i} className="flex items-center gap-3 text-xs text-cream/60">
            <Check className="w-3 h-3 text-caramel" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      {ticket.spotsLeft && ticket.spotsLeft < 10 && (
        <div className="pt-2">
          <span className="text-[10px] uppercase tracking-widest text-caramel font-bold animate-pulse">
            Only {ticket.spotsLeft} spots left
          </span>
        </div>
      )}
    </div>
  </motion.div>
);

// --- Success Modal ---

const SuccessModal = ({ 
  onClose, 
  details 
}: { 
  onClose: () => void, 
  details: { event: CoffeeEvent, ticketType: string, quantity: number, total: number } 
}) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 z-[1000] flex items-center justify-center px-6"
  >
    <div className="absolute inset-0 bg-coffee-dark/95 backdrop-blur-2xl" onClick={onClose} />
    
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 40 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      className="relative w-full max-w-xl bg-white/[0.03] border border-white/5 rounded-[60px] p-12 overflow-hidden shadow-2xl"
    >
      <div className="absolute top-0 right-0 p-12 opacity-[0.03] scale-150 rotate-12 pointer-events-none">
        <div className="w-64 h-64 border-4 border-caramel rounded-full flex items-center justify-center">
            <Check className="w-32 h-32" />
        </div>
      </div>

      <div className="relative z-10 text-center space-y-12">
        <div className="w-24 h-24 bg-caramel text-coffee-dark rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(198,142,93,0.3)]">
          <Check className="w-12 h-12 stroke-[3]" />
        </div>

        <div className="space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold font-serif text-white uppercase italic tracking-tighter">
            Booking <br /> <span className="text-caramel font-light lowercase">Confirmed</span>
          </h2>
          <p className="text-cream/50 italic font-serif text-lg leading-relaxed">
            Your ritual is reserved. A digital pass has been dispatched to your sanctuary.
          </p>
        </div>

        <div className="bg-white/5 rounded-[40px] p-8 space-y-6 text-left border border-white/5">
          <div className="flex justify-between items-center pb-6 border-b border-white/5">
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-caramel font-bold mb-1">Event</span>
              <span className="text-xl font-serif text-white uppercase">{details.event.title}</span>
            </div>
            <div className="text-right">
              <span className="block text-[10px] uppercase tracking-widest text-caramel font-bold mb-1">Passes</span>
              <span className="text-xl font-mono text-white tabular-nums">{details.quantity}x</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-caramel font-bold mb-1">Pass Type</span>
              <span className="text-sm text-cream">{details.ticketType}</span>
            </div>
            <div className="text-right">
              <span className="block text-[10px] uppercase tracking-widest text-caramel font-bold mb-1">Total Paid</span>
              <span className="text-sm text-white font-bold">₹{details.total}</span>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex gap-4">
             <Calendar className="w-4 h-4 text-caramel" />
             <span className="text-xs text-cream/60">{details.event.date} • {details.event.time}</span>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-6 bg-cream text-coffee-dark rounded-full font-black uppercase tracking-[0.5em] text-xs hover:bg-white transition-colors"
        >
          Return to Narrative
        </button>
      </div>
    </motion.div>
  </motion.div>
);

// --- Main Booking Panel ---

export const BookingSystem = ({ event }: { event: CoffeeEvent }) => {
  const [selectedTicket, setSelectedTicket] = useState(event.ticketTypes?.[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const activeTicket = event.ticketTypes?.find(t => t.name === selectedTicket);
  const total = (activeTicket?.price || 0) * quantity;
  const progress = (event.booked / event.capacity) * 100;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(true);
    // Simulate API call
    setTimeout(() => {
      setIsBooking(false);
      setShowSuccess(true);
    }, 2000);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-20 items-start">
        
        {/* Left Side: Ticket Selection */}
        <div className="space-y-16">
          <div className="space-y-4">
            <span className="text-caramel font-mono text-[10px] uppercase tracking-[0.5em] font-bold">Step 01</span>
            <h2 className="text-5xl md:text-7xl font-bold font-serif text-white uppercase italic tracking-tighter">Choose Your <br /> <span className="text-caramel italic font-light lowercase">Chapter</span></h2>
            <p className="text-cream/50 italic font-serif text-lg leading-relaxed max-w-xl">
              From general access to premium ritualist passes, select the depth of your experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {event.ticketTypes?.map((ticket, i) => (
              <TicketCard 
                key={i}
                ticket={ticket}
                isActive={selectedTicket === ticket.name}
                onSelect={() => setSelectedTicket(ticket.name)}
              />
            ))}
          </div>

          <div className="space-y-12 pt-12 border-t border-white/5">
             <div className="space-y-4">
                <span className="text-caramel font-mono text-[10px] uppercase tracking-[0.5em] font-bold">Step 02</span>
                <h2 className="text-4xl md:text-6xl font-bold font-serif text-white uppercase italic tracking-tighter">Your <br /> <span className="text-caramel italic font-light lowercase">Identity</span></h2>
             </div>

             <form onSubmit={handleBooking} id="booking-form" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/20 group-focus-within:text-caramel transition-colors" />
                    <input 
                      required
                      type="text" 
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/[0.02] border border-white/5 rounded-3xl py-5 pl-14 pr-6 text-white placeholder:text-cream/20 focus:outline-none focus:border-caramel/50 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/20 group-focus-within:text-caramel transition-colors" />
                    <input 
                      required
                      type="email" 
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/[0.02] border border-white/5 rounded-3xl py-5 pl-14 pr-6 text-white placeholder:text-cream/20 focus:outline-none focus:border-caramel/50 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                </div>
                <div className="relative group">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/20 group-focus-within:text-caramel transition-colors" />
                  <input 
                    required
                    type="tel" 
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/5 rounded-3xl py-5 pl-14 pr-6 text-white placeholder:text-cream/20 focus:outline-none focus:border-caramel/50 focus:bg-white/[0.05] transition-all"
                  />
                </div>
                <div className="relative group">
                  <MessageSquare className="absolute left-6 top-6 w-4 h-4 text-cream/20 group-focus-within:text-caramel transition-colors" />
                  <textarea 
                    placeholder="Notes / Special Requests (Optional)"
                    rows={4}
                    className="w-full bg-white/[0.02] border border-white/5 rounded-3xl py-6 pl-14 pr-6 text-white placeholder:text-cream/20 focus:outline-none focus:border-caramel/50 focus:bg-white/[0.05] transition-all resize-none"
                  />
                </div>
             </form>
          </div>
        </div>

        {/* Right Side: Sticky Booking Panel */}
        <div className="sticky top-32 space-y-8">
          <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-[60px] p-10 space-y-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none scale-150">
               <TicketIcon className="w-20 h-20 text-caramel" />
            </div>

            <div className="space-y-6">
              <span className="text-caramel font-mono text-[10px] uppercase tracking-[0.5em] font-bold">Summary</span>
              <div className="space-y-4">
                 <h3 className="text-3xl font-serif text-white uppercase italic tracking-tighter leading-none">{event.title}</h3>
                 <div className="flex flex-col gap-3 text-sm text-cream/50 italic font-serif">
                   <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-caramel/50" />
                      <span>{event.date}</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-caramel/50" />
                      <span>{event.time}</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-caramel/50" />
                      <span>{event.location}</span>
                   </div>
                 </div>
              </div>
            </div>

            <div className="space-y-6 pt-10 border-t border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest text-caramel font-bold">Passes</span>
                <QuantitySelector value={quantity} onChange={setQuantity} max={Math.min(5, activeTicket?.spotsLeft || 5)} />
              </div>
              
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                   <span className="text-xs text-cream/40 italic font-serif">Total Ritual Fee</span>
                   <div className="text-4xl font-bold text-white font-mono tracking-tighter tabular-nums">
                      ₹{total}
                   </div>
                </div>
                <div className="text-right">
                   <span className="text-[10px] text-cream/30 uppercase tracking-widest">Calculated Live</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <button 
                form="booking-form"
                disabled={isBooking}
                className={cn(
                  "w-full py-8 rounded-full font-black uppercase tracking-[0.5em] text-xs transition-all duration-500 flex items-center justify-center gap-4 relative overflow-hidden group",
                  isBooking ? "bg-white/10 text-cream/50" : "bg-caramel text-coffee-dark hover:shadow-[0_20px_50px_rgba(198,142,93,0.3)]"
                )}
              >
                <span className="relative z-10">{isBooking ? 'Dispatching Pass...' : 'Confirm Reservation'}</span>
                {!isBooking && <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-2 transition-transform" />}
                {isBooking && <Loader2 className="w-4 h-4 animate-spin relative z-10" />}
              </button>

              <div className="space-y-3">
                 <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest">
                    <span className="text-caramel/50">Experience Scarcity</span>
                    <span className="text-cream/50">{Math.round(progress)}% Occupied</span>
                 </div>
                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-caramel shadow-[0_0_10px_#C68E5D]" 
                    />
                 </div>
                 <p className="text-[10px] text-cream/30 italic text-center">Join 82 other ritualists in this cultural chapter.</p>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-8 flex items-center gap-6">
             <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-caramel">
                <Clock className="w-6 h-6" />
             </div>
             <div className="space-y-1">
                <span className="block text-[10px] uppercase font-bold tracking-widest text-white">Temporary Lock</span>
                <p className="text-xs text-cream/40 italic">Selection held for 15:00 minutes.</p>
             </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <SuccessModal 
            onClose={() => setShowSuccess(false)}
            details={{
              event,
              ticketType: selectedTicket,
              quantity,
              total
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};
