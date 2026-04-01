import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EVENTS } from '../data/events';
import { EventCard, EventCategoryFilter } from '../components/EventComponents';
import { Navbar } from '../components/CoffeeComponents';
import Footer from '../components/Footer';

const CATEGORIES = ['All', 'Cultural', 'Workshop', 'Community', 'Pop-up', 'Launch'];

type EventsListingProps = {
  cartCount: number;
  wishlistCount?: number;
  onOpenCart: () => void;
  onOpenCategories: () => void;
};

const EventsListing: React.FC<EventsListingProps> = ({ cartCount, wishlistCount = 0, onOpenCart, onOpenCategories }) => {
  const [activeCategory, setActiveCategory] = React.useState('All');
  
  const filteredEvents = React.useMemo(() => {
    if (activeCategory === 'All') return EVENTS;
    return EVENTS.filter(e => e.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="relative min-h-screen bg-coffee-dark bg-grain overflow-x-hidden pt-20">
      <Navbar
        onOpenCart={onOpenCart}
        onOpenCategories={onOpenCategories}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      <div className="max-w-7xl mx-auto px-6 py-28 md:py-40">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="space-y-6">
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.3em' }}
              animate={{ opacity: 1, letterSpacing: '0.6em' }}
              transition={{ duration: 1.5 }}
              className="block font-mono text-[10px] uppercase text-caramel tracking-[0.6em] font-bold"
            >
              Experiences by Assava
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-bold tracking-tighter text-white font-serif uppercase leading-[0.9]"
            >
              Coffee. Culture.<br />
              <span className="text-caramel italic font-light lowercase">Community.</span>
            </motion.h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-md text-xl md:text-2xl text-cream/60 italic font-serif leading-snug"
          >
            "Explore our curated series of tastings, cuppings, and cultural takeovers. Where the ritual of brewing meets the energy of culture."
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-24 flex justify-center sticky top-24 z-20">
           <div className="glass p-4 rounded-full border-white/5 shadow-2xl">
             <EventCategoryFilter categories={CATEGORIES} active={activeCategory} onChange={setActiveCategory} />
           </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, i) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
};

export default EventsListing;
