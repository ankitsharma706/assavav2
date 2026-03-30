import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/CoffeeComponents';
import Footer from '../components/Footer';

const About = ({ cartCount, onOpenCart, onOpenCategories }: { cartCount: number, onOpenCart: () => void, onOpenCategories: () => void }) => {
  const scrollVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  return (
    <main className="relative min-h-screen bg-coffee-dark flex flex-col text-cream font-sans overflow-x-hidden">
      <Navbar onOpenCart={onOpenCart} onOpenCategories={onOpenCategories} cartCount={cartCount} />

      <div className="flex-grow w-full">
        
        {/* SECTION 1 — Hero */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollVariant}
          className="min-h-screen flex flex-col items-center justify-center text-center px-6"
        >
          <h1 className="text-cream font-bold text-5xl md:text-7xl mb-6">Where Coffee Becomes Ritual</h1>
          <p className="text-cream/75 text-xl md:text-2xl italic">Born from obsession. Brewed for the devoted.</p>
        </motion.section>

        {/* SECTION 2 — Origin Story */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollVariant}
          className="max-w-6xl mx-auto px-6 py-24 md:py-32"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-caramel text-3xl font-bold mb-8">The Beginning</h2>
              <div className="space-y-6 text-cream/80 text-lg leading-relaxed">
                <p>In the highlands of a forgotten valley, where mist clings to the trees until noon and the soil runs deep amber, ASSAVA was born — not as a brand, but as a belief.</p>
                <p>It started with a single question: Why does most coffee taste like a compromise?</p>
                <p>Our founder spent three years traveling — Ethiopia, Colombia, Sumatra, Yemen — not as a tourist, but as a student. Learning from farmers who had tended the same trees their grandparents planted. Tasting cup after cup until the difference between ordinary and extraordinary became undeniable.</p>
                <p>ASSAVA is the result of that journey.</p>
              </div>
            </div>
            {/* Decorative placeholder right column */}
            <div className="hidden md:block w-full h-full min-h-[400px] bg-[#2B1B12]/40 rounded-2xl border border-white/5 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-caramel/5 to-transparent"></div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 3 — Philosophy */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollVariant}
          className="max-w-3xl mx-auto px-6 py-24 md:py-32 text-center"
        >
          <div className="border-t border-caramel/30 w-16 mb-6 mx-auto"></div>
          <h2 className="text-cream text-3xl font-bold mb-8">The Ritual Philosophy</h2>
          <div className="space-y-6 text-cream/75 text-lg leading-relaxed">
            <p>Coffee is not a beverage. It is a daily ceremony — a moment carved out from the noise of the world where you return to yourself.</p>
            <p>We believe every cup should be an event. Not rushed. Not automated. Intentional.</p>
            <p>That's why we source every bean with obsessive care, roast every batch in small quantities, and package every order as if it were a gift. Because for the person receiving it, it is.</p>
          </div>
        </motion.section>

        {/* SECTION 4 — Sourcing */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollVariant}
          className="max-w-6xl mx-auto px-6 py-24 md:py-32"
        >
          <h2 className="text-caramel text-3xl font-bold mb-12 text-center">From Altitude to Cup</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🤝', title: 'Direct Trade', body: 'We work directly with farmers, cutting out brokers entirely. Farmers earn 40–60% above commodity price.' },
              { icon: '⛰️', title: 'Altitude Selection', body: 'All beans sourced from 1,400m+ elevation. High altitude means slower cherry development, more complex sugars, better flavor.' },
              { icon: '🌱', title: 'Seasonal Harvesting', body: 'We only buy peak-season harvests. No year-round sourcing. No compromises.' }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut", delay: idx * 0.1 }}
                className="bg-[#2B1B12] rounded-2xl p-6 glow-border-hover border border-white/5"
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="text-caramel font-bold text-lg mb-3">{card.title}</h3>
                <p className="text-cream/70 text-sm leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-cream/60 text-sm tracking-widest text-center mt-8 uppercase">
            Ethiopia Yirgacheffe &middot; Colombia Huila &middot; Sumatra Mandheling &middot; Yemen Haraaz &middot; Guatemala Antigua
          </p>
        </motion.section>

        {/* SECTION 5 — Roasting */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollVariant}
          className="max-w-6xl mx-auto px-6 py-24 md:py-32"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Decorative placeholder left column */}
            <div className="hidden md:block w-full h-full min-h-[400px] bg-[#2B1B12]/40 rounded-2xl border border-white/5 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-bl from-caramel/5 to-transparent"></div>
            </div>
            <div>
              <h2 className="text-caramel text-3xl font-bold mb-8">The Roast Is Everything</h2>
              <div className="space-y-6 text-cream/75 text-lg leading-relaxed">
                <p>Most roasters hide bad beans behind dark roasts. We do the opposite.</p>
                <p>Our light-to-medium roast philosophy is a bet on quality — if the bean isn't extraordinary, light roasting will expose every flaw. We only roast what we're proud to serve transparent.</p>
                <p>Every batch is roasted in-house, in 12kg drum roasters, monitored by hand. No automated profiles. Just attention.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 6 — The Name */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollVariant}
          className="max-w-2xl mx-auto px-6 py-24 md:py-32 text-center relative"
        >
          <div className="glass rounded-3xl p-12 glow-border-hover relative overflow-hidden bg-white/5">
            <h2 className="text-cream text-4xl font-bold mb-8">What is ASSAVA?</h2>
            <div className="space-y-6 text-cream/75 text-xl leading-relaxed">
              <p>
                Assava is derived from an ancient word meaning <span className="text-caramel italic">"the first light."</span> The light before sunrise — when the world is still, the air is cold, and the only warmth comes from a cup held in both hands.
              </p>
              <p>That's the moment we're designing for. Every. Single. Time.</p>
            </div>
          </div>
        </motion.section>

        {/* SECTION 7 — Stats */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollVariant}
          className="max-w-6xl mx-auto px-6 py-24 md:py-32"
        >
          <h2 className="text-center text-cream text-3xl font-bold mb-16">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {[
              { num: '12', label: 'Origin countries visited' },
              { num: '4', label: 'Years of sourcing experience' },
              { num: '3,200+', label: 'Members in the Ritual Club' },
              { num: '18', label: 'Active farm partnerships' },
              { num: '100%', label: 'Direct trade, zero brokers' },
              { num: '6', label: 'Roast profiles perfected' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut", delay: idx * 0.1 }}
                className="p-6"
              >
                <div className="text-caramel text-5xl font-bold font-mono">{stat.num}</div>
                <div className="text-cream/65 text-sm tracking-wide mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SECTION 8 — CTA */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollVariant}
          className="max-w-6xl mx-auto px-6 py-24 text-center"
        >
          <h2 className="text-cream text-4xl md:text-5xl font-bold mb-4">Join the Ritual</h2>
          <p className="text-cream/70 text-lg mb-12">The best cup you've ever had is still ahead of you.</p>
          <Link 
            to="/shopping" 
            className="inline-block bg-caramel text-coffee-dark font-bold px-10 py-4 rounded-full hover:opacity-90 transition-opacity"
          >
            Explore the Collection &rarr;
          </Link>
        </motion.section>

      </div>
      <Footer />
    </main>
  );
};

export default About;
