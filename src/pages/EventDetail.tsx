import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { EVENTS } from '../data/events';
import { EventHero, EventSection, InfoItem, EventTimeline, EventTicketTypes, EventSpeakerCard, EventGallery } from '../components/EventComponents';
import { Navbar } from '../components/CoffeeComponents';
import Footer from '../components/Footer';
import { Calendar, Clock, MapPin, Ticket, Share2, Sparkles, ArrowRight, Star } from 'lucide-react';
import { cn } from '../lib/utils';

type EventDetailProps = {
  cartCount: number;
  wishlistCount?: number;
  onOpenCart: () => void;
  onOpenCategories: () => void;
};

// ─── Animation Variants ─────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const EventDetail: React.FC<EventDetailProps> = ({ cartCount, wishlistCount = 0, onOpenCart, onOpenCategories }) => {
  const { id } = useParams<{ id: string }>();
  const event = EVENTS.find(e => e.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!event) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-coffee-dark font-serif">
      <h1 className="text-4xl font-bold mb-6 text-cream">Event Not Found</h1>
      <Link to="/events" className="text-caramel hover:underline uppercase font-mono tracking-widest text-[10px]">Back to Registry</Link>
    </div>
  );

  return (
    <main className="relative min-h-screen bg-coffee-dark bg-grain overflow-x-hidden pt-20">
      <Navbar
        onOpenCart={onOpenCart}
        onOpenCategories={onOpenCategories}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      <EventHero event={event} />

      {/* SECTION 1: STORY / EXPERIENCE */}
      <section className="py-28 md:py-40 px-6 max-w-4xl mx-auto text-center border-b border-white/10">
        <motion.div
           variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
           className="space-y-12"
        >
          <motion.span className="block font-mono text-[10px] uppercase text-caramel tracking-[0.5em] font-bold">The Experience</motion.span>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white font-serif uppercase leading-[0.9]">
            The <span className="text-caramel italic font-light lowercase">{event.title.split(' ')[0]}</span> Narrative
          </h2>
          <div className="space-y-8 text-cream/70 text-xl md:text-3xl leading-relaxed italic font-serif">
            "{event.story}"
          </div>
          <div className="flex flex-wrap gap-4 justify-center pt-8">
            {event.audience.map((a, i) => (
              <span key={i} className="px-6 py-3 rounded-full border border-caramel/20 text-[10px] font-mono uppercase tracking-widest text-caramel bg-caramel/5">
                {a}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: EVENT HIGHLIGHTS */}
      <EventSection title="Immersive Chapters">
        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {event.highlights.map((h, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group p-10 rounded-[48px] glass border border-white/5 transition-all duration-700 hover:border-caramel/30 bg-coffee-dark relative overflow-hidden"
            >
              {h.image && (
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                   <img src={h.image} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="relative z-10">
                <div className="p-5 rounded-[32px] bg-caramel/10 text-caramel transition-colors mb-8 w-fit text-3xl">
                  {h.icon || '☕'}
                </div>
                <h3 className="text-2xl font-bold font-serif mb-4 uppercase tracking-tight text-white">{h.title}</h3>
                <p className="text-sm font-light italic leading-relaxed font-serif text-white/50 group-hover:text-white/80 transition-colors">{h.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </EventSection>

      {/* SECTION 3: TIMELINE & SPEAKERS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 px-6 max-w-7xl mx-auto py-24 border-t border-white/5">
         <div className="space-y-16">
            <div className="space-y-4">
               <span className="text-caramel font-mono text-[10px] uppercase font-bold tracking-[0.5em]">The Sequence</span>
               <h2 className="text-5xl font-bold font-serif uppercase text-white tracking-tighter">Event Timeline</h2>
            </div>
            {event.timeline && <EventTimeline timeline={event.timeline} />}
         </div>
         <div className="space-y-16">
            <div className="space-y-4">
               <span className="text-caramel font-mono text-[10px] uppercase font-bold tracking-[0.5em]">The Curators</span>
               <h2 className="text-5xl font-bold font-serif uppercase text-white tracking-tighter">Featured Voices</h2>
            </div>
            <div className="space-y-6">
               {event.speakers?.map((s, i) => (
                 <EventSpeakerCard key={i} {...s} />
               ))}
            </div>
            {event.learning && (
               <div className="p-12 rounded-[48px] glass border border-white/5 space-y-8">
                  <h4 className="text-xl font-bold font-serif uppercase text-white">What You'll Experience</h4>
                  <ul className="space-y-4">
                    {event.learning.map((l, i) => (
                      <li key={i} className="flex items-center gap-4 text-white/40 text-sm italic font-serif">
                        <Star className="w-4 h-4 text-caramel fill-caramel" /> {l}
                      </li>
                    ))}
                  </ul>
               </div>
            )}
         </div>
      </div>

      {/* SECTION 4: TICKETS / OPTIONS */}
      {event.ticketTypes && (
        <EventSection title="Secure Your Portal" className="bg-white/2 rounded-[80px]">
          <EventTicketTypes 
            ticketTypes={event.ticketTypes} 
            onSelect={(name) => alert(`Selected ${name}. Redirecting to checkout...`)} 
          />
        </EventSection>
      )}

      {/* SECTION 5: SOCIAL ARCHIVE */}
      <EventSection title="Digital Footprint">
         <EventGallery images={event.images} handle={event.socialFeed?.handle || '@assava_coffee'} />
      </EventSection>

      {/* SECTION 6: LOGISTICS */}
      <div className="bg-caramel/5 py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <div className="space-y-12">
             <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
               <span className="block font-mono text-[10px] uppercase text-caramel tracking-[0.5em] mb-4 font-bold">The Logistics</span>
               <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white font-serif mb-4 uppercase leading-none">Assemble for the <span className="text-caramel italic font-light lowercase">Ritual</span></h2>
             </motion.div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoItem icon={Calendar} label="Coordinate" value={event.date} />
                <InfoItem icon={Clock} label="Temporal Window" value={event.time} />
                <InfoItem icon={MapPin} label="Quadrant" value={event.location} />
                <InfoItem icon={Ticket} label="Mechanism" value={event.entryType} />
             </div>
           </div>

           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="relative p-16 rounded-[80px] glass overflow-hidden border border-white/10 shadow-2xl"
           >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Share2 className="w-40 h-40 text-caramel rotate-12" />
              </div>
              <div className="relative z-10 space-y-12 text-center">
                 <Sparkles className="w-12 h-12 text-caramel mx-auto mb-8" />
                 <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-white font-serif uppercase">Reserve Your<br />Spot in Line</h3>
                 <motion.button 
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   className="w-full px-12 py-8 bg-caramel text-coffee-dark rounded-full font-bold uppercase tracking-[0.4em] text-sm shadow-[0_20px_50px_rgba(198,142,93,0.3)] hover:glow-border transition-all flex items-center justify-center gap-4 group"
                 >
                   Join Experience
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                 </motion.button>
              </div>
           </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default EventDetail;
