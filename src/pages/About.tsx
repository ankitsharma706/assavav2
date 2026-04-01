import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, Variants } from 'motion/react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/CoffeeComponents';
import Footer from '../components/Footer';
import ScrollIndicator from '../components/ScrollIndicator';

// ─── Types ───────────────────────────────────────────────────
type AboutProps = {
  cartCount: number;
  wishlistCount?: number;
  onOpenCart: () => void;
  onOpenCategories: () => void;
};

// ─── Image constants — Unsplash stable IDs ───────────────────
const IMG = {
  hero:      '/aboutpage.jpg',
  origin:    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=85&w=900&h=1100',
  roast:     'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=85&w=900&h=1100',
  ethiopia:  'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=85&w=700&h=500',
  colombia:  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=85&w=700&h=500',
  yemen:     'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=85&w=700&h=500',
  sumatra:   'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=85&w=700&h=500',
  cupping:   'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=85&w=900&h=700',
  hands:     'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=85&w=900&h=700',
  pour:      'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=85&w=1400&h=800',
  community: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=85&w=1400&h=800',
  beans:     'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=85&w=900&h=700',
  pledge:    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=85&w=1400&h=900',
  team1:     'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=85&w=600&h=600',
  team2:     'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&q=85&w=600&h=600',
  team3:     'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?auto=format&fit=crop&q=85&w=600&h=600',
};

// ─── Reusable animation variant ──────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Section label component ─────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block font-mono text-[10px] tracking-[0.5em] uppercase text-caramel mb-6">
      {children}
    </span>
  );
}

// ─── Divider line ─────────────────────────────────────────────
function Divider() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-caramel/20 to-transparent" />
    </div>
  );
}

// ─── AnimatedNumber helper ──────────────────────────────────
function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const total = 60;
    const tick = () => {
      frame++;
      setCount(Math.round((frame / total) * target));
      if (frame < total) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target]);

  return (
    <div ref={ref} className="font-mono font-bold text-caramel leading-none" style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}>
      {count.toLocaleString()}{suffix}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────
const About: React.FC<AboutProps> = ({ cartCount, wishlistCount = 0, onOpenCart, onOpenCategories }) => {

  // Parallax for hero
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef, offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <main className="relative min-h-screen bg-coffee-dark text-cream overflow-x-hidden">
      <Navbar
        onOpenCart={onOpenCart}
        onOpenCategories={onOpenCategories}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      {/* SECTION 1 — CINEMATIC HERO */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax image */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img
            src={IMG.hero}
            alt="Misty coffee farm at altitude"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-coffee-dark/30 via-coffee-dark/50 to-coffee-dark" />
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.3em' }}
            animate={{ opacity: 1, letterSpacing: '0.55em' }}
            transition={{ duration: 2, delay: 0.3 }}
            className="block font-mono text-[10px] uppercase text-caramel mb-8 tracking-[0.55em]"
          >
            The ASSAVA Story
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 font-serif"
          >
            Where Coffee<br />
            <span className="text-caramel italic font-light">Becomes Ritual</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-cream/70 text-xl md:text-2xl italic font-light font-serif"
          >
            Born from obsession. Brewed for the devoted.
          </motion.p>
        </motion.div>

        <ScrollIndicator 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[20] cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        />
      </section>

      {/* SECTION 2 — THE FOUNDING STORY */}
      <section className="max-w-7xl mx-auto px-6 py-28 md:py-40">
        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Text */}
          <motion.div variants={fadeUp}>
            <SectionLabel>Chapter 01 — Origin</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-10 leading-tight">
              A Question That<br /><span className="text-caramel italic font-serif">Changed Everything</span>
            </h2>
            <div className="space-y-6 text-cream/75 text-lg leading-relaxed">
              <p>
                In the highlands of a forgotten valley — where mist clings to the trees until noon and the soil runs deep amber — ASSAVA was born. Not as a brand, but as a belief.
              </p>
              <p>
                It started with a single question: <em className="text-cream/95 not-italic font-semibold">Why does most coffee taste like a compromise?</em>
              </p>
              <p>
                Our founder spent three years travelling — Ethiopia, Colombia, Sumatra, Yemen — not as a tourist, but as a student. Learning from farmers who had tended the same trees their grandparents planted.
              </p>
              <p>
                ASSAVA is the result of that journey. Every product we sell is a direct line back to a specific farm, a specific altitude, a specific person who chose to do things differently.
              </p>
            </div>

            <div className="mt-12 pl-6 border-l-2 border-caramel/50">
              <p className="text-cream/90 text-xl italic leading-relaxed font-serif">
                "There is no finish line in the pursuit of a perfect cup. There is only the next harvest."
              </p>
              <span className="block mt-3 font-mono text-[10px] tracking-widest uppercase text-caramel">
                — Founder, ASSAVA
              </span>
            </div>
          </motion.div>

          {/* Portrait image */}
          <motion.div variants={fadeUp} className="relative">
            <div className="relative overflow-hidden rounded-3xl aspect-[3/4] shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
              <img
                src={IMG.origin}
                alt="Founder walking through coffee trees"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border border-caramel/25 rounded-2xl px-6 py-5 backdrop-blur-xl shadow-2xl">
              <div className="font-mono text-2xl font-bold text-gold">2021</div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-cream/50 mt-1">Founded</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-card border border-white/10 rounded-2xl px-6 py-5 backdrop-blur-xl shadow-2xl">
              <div className="font-mono text-2xl font-bold text-caramel">3 yrs</div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-cream/50 mt-1">Of Research</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Divider />

      {/* SECTION 3 — WHAT IS ASSAVA? */}
      <section className="py-28 md:py-40 px-6">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl mx-auto text-center"
        >
          <SectionLabel>The Name</SectionLabel>
          <div className="bg-card/60 border border-white/8 backdrop-blur-2xl rounded-3xl p-10 md:p-16 relative overflow-hidden shadow-[0_0_80px_rgba(198,142,93,0.08)]">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-caramel/6 blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gold/5 blur-[80px] pointer-events-none" />

            <h2 className="text-cream text-4xl md:text-5xl font-bold tracking-tighter mb-8 relative z-10">
              What is <span className="text-gold">ASSAVA</span>?
            </h2>
            <div className="space-y-6 text-cream/75 text-lg leading-relaxed relative z-10">
              <p>
                Assava is derived from an ancient root word meaning{' '}
                <span className="text-caramel italic font-serif">"the first light"</span> — the light before sunrise. When the world is still. The air is cold. And the only warmth comes from a cup held in both hands.
              </p>
              <p>
                That specific moment — quiet, unhurried, entirely yours — is what we design every product around. The cup should earn that moment. Not interrupt it.
              </p>
              <p className="text-cream/90 font-medium">
                That's the moment we're designing for. Every. Single. Time.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <Divider />

      {/* SECTION 4 — THE PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-6 py-28 md:py-40">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SectionLabel>Chapter 02 — Belief</SectionLabel>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-20 max-w-2xl leading-tight">
            The Ritual<br /><span className="text-caramel italic font-serif">Philosophy</span>
          </h2>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-1"
        >
          {[
            {
              num: '01',
              title: 'Coffee Is Ceremony',
              body: 'Not a beverage. Not a habit. A daily ceremony — a moment carved out from the noise of the world where you return to yourself.',
            },
            {
              num: '02',
              title: 'Intentional Over Instant',
              body: 'We believe every cup should be an event. Not rushed. Not automated. Intentional. The 4 minutes it takes to brew a V60 properly are 4 minutes entirely yours.',
            },
            {
              num: '03',
              title: 'Quality Is Non-Negotiable',
              body: 'We source every bean with obsessive care. We roast in small batches. We package every order as if it were a gift.',
            },
          ].map((p, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="p-10 border border-white/5 hover:border-caramel/20 transition-colors duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-caramel/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="text-[80px] font-bold font-mono text-white/4 leading-none mb-6 select-none">{p.num}</div>
              <h3 className="text-xl font-bold text-cream mb-5 group-hover:text-gold transition-colors duration-300">{p.title}</h3>
              <p className="text-cream/65 text-base leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Divider />

      {/* SECTION 5 — ORIGIN REGIONS */}
      <section className="max-w-7xl mx-auto px-6 py-28 md:py-40">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SectionLabel>Chapter 03 — Origin</SectionLabel>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight max-w-lg">
              Four Regions.<br /><span className="text-caramel italic font-serif">Infinite Character.</span>
            </h2>
            <p className="text-cream/60 text-base max-w-sm leading-relaxed">
              Every growing region imparts a completely different personality to its beans. We source from four of the world's most distinctive terroirs.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            {
              region: 'Ethiopia',
              sub: 'Yirgacheffe',
              altitude: '1,900–2,200m',
              notes: 'Jasmine · Blueberry · Lemon Zest',
              body: 'The birthplace of coffee. Heirloom varieties grown wild in a forest-garden system unchanged for centuries.',
              img: IMG.ethiopia,
              badge: 'Single Origin',
            },
            {
              region: 'Colombia',
              sub: 'Huila',
              altitude: '1,600–1,900m',
              notes: 'Red Apple · Brown Sugar · Caramel',
              body: 'Volcanic soils and year-round harvest windows give us access to perfectly ripened cherries twelve months a year.',
              img: IMG.colombia,
              badge: 'Direct Trade',
            },
            {
              region: 'Yemen',
              sub: 'Haraaz',
              altitude: '1,500–2,500m',
              notes: 'Dark Fruit · Tamarind · Spice',
              body: 'The most ancient coffee-producing country on earth. Wild-grown on cliff-face terraces at extraordinary altitude.',
              img: IMG.yemen,
              badge: 'Rare Harvest',
            },
            {
              region: 'Sumatra',
              sub: 'Mandheling',
              altitude: '1,100–1,600m',
              notes: 'Dark Chocolate · Cedar · Earth',
              body: 'Wet-hulled in the traditional method. This produces Sumatra signature low-acid, full-bodied character.',
              img: IMG.sumatra,
              badge: 'Micro Lot',
            },
          ].map((r, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={r.img}
                  alt={r.region}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark via-coffee-dark/40 to-transparent" />
              </div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-caramel/30 rounded-full px-3 py-1 font-mono text-[9px] tracking-widest uppercase text-caramel">
                  {r.badge}
                </div>
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 font-mono text-[9px] tracking-widest uppercase text-cream/60">
                  {r.altitude}
                </div>
                <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-caramel mb-1">{r.sub}</span>
                <h3 className="text-2xl font-bold tracking-tighter text-cream mb-2">{r.region}</h3>
                <p className="text-gold font-mono text-[10px] tracking-wide mb-3">{r.notes}</p>
                <p className="text-cream/70 text-sm leading-relaxed max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500 ease-out italic">
                  {r.body}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Divider />

      {/* SECTION 6 — SOURCING */}
      <section className="max-w-7xl mx-auto px-6 py-28 md:py-40">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SectionLabel>How We Source</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 max-w-xl font-serif">
            From Altitude<br /><span className="text-caramel italic">to Cup</span>
          </h2>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: '🤝',
              title: 'Direct Trade',
              sub: 'Zero brokers. Always.',
              body: 'We work directly with farm owners and cooperatives, eliminating intermediaries. Our farmers earn 40–60% above commodity price.',
              stat: '18 farms', statLabel: 'Active partnerships',
            },
            {
              icon: '⛰️',
              title: 'Altitude Selection',
              sub: '1,400m+ only.',
              body: 'All beans sit above 1,400 meters elevation. High altitude means lower temperatures, slower cherry development, more complexity.',
              stat: '1,400m+', statLabel: 'Minimum elevation',
            },
            {
              icon: '🌱',
              title: 'Seasonal Harvesting',
              sub: 'Peak season only.',
              body: 'We only buy peak-season harvests. If a harvest isn exception that year, we don buy it. We wait for next year.',
              stat: '100%', statLabel: 'Seasonal sourcing',
            },
          ].map((c, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-card/70 border border-white/6 rounded-2xl p-8 group hover:border-caramel/25 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-caramel/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="text-4xl mb-5">{c.icon}</div>
                <h3 className="text-xl font-bold text-cream mb-1 group-hover:text-gold transition-colors duration-300">{c.title}</h3>
                <p className="font-mono text-[10px] tracking-widest uppercase text-caramel mb-5">{c.sub}</p>
                <p className="text-cream/65 text-sm leading-relaxed mb-8">{c.body}</p>
                <div className="border-t border-white/8 pt-5 flex items-end gap-2">
                  <span className="font-mono text-2xl font-bold text-gold">{c.stat}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-cream/40 mb-1">{c.statLabel}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Divider />

      {/* SECTION 7 — THE ROAST */}
      <section className="max-w-7xl mx-auto px-6 py-28 md:py-40">
        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          <motion.div variants={fadeUp} className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-3xl aspect-[4/5] shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
              <img src={IMG.roast} alt="Roaster" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-card border border-caramel/25 rounded-2xl px-6 py-4 backdrop-blur-xl">
              <div className="font-mono text-xl font-bold text-gold">12 kg</div>
              <div className="font-mono text-[9px] tracking-widest uppercase text-cream/45 mt-1">Per batch</div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="order-1 lg:order-2">
            <SectionLabel>Chapter 04 — Craft</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-10 leading-tight font-serif">
              The Roast<br /><span className="text-caramel italic">Is Everything</span>
            </h2>
            <div className="space-y-6 text-cream/75 text-lg leading-relaxed">
              <p>Most roasters hide bad beans behind dark roasts. We do the opposite.</p>
              <p>Our light-to-medium roast philosophy is a deliberate bet on bean quality. Every batch is roasted in-house in 12 kg drum roasters, monitored entirely by hand.</p>
              <p>Then we wait. We rest every batch for 48–96 hours before it ships. The wait is always worth it.</p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { label: 'Batch size', value: '12 kg' },
                { label: 'Roast style', value: 'Light–Medium' },
                { label: 'Rest period', value: '48–96 hrs' },
                { label: 'Daily output', value: 'Made to order' },
              ].map((s, i) => (
                <div key={i} className="bg-card/50 border border-white/6 rounded-xl px-5 py-4">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-cream/40 mb-1">{s.label}</div>
                  <div className="font-bold text-cream text-base">{s.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 8 — IMAGE BREAK */}
      <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden my-4">
        <motion.img
          src={IMG.pour}
          alt="Pour-over"
          className="w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-coffee-dark/40 via-transparent to-coffee-dark/60" />
        <motion.div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <p className="text-3xl md:text-5xl font-light italic text-cream leading-tight max-w-3xl font-serif">
            "Every variable is a choice.<br />Every choice is a cup."
          </p>
        </motion.div>
      </section>

      {/* SECTION 9 — QUALITY PROMISE */}
      <section className="max-w-7xl mx-auto px-6 py-28 md:py-40">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SectionLabel>The Standard</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 max-w-xl leading-tight font-serif">
            Five Things We<br /><span className="text-caramel italic">Never Compromise</span>
          </h2>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="space-y-0">
          {[
            { num: '01', title: 'The SCA Score Floor', body: 'Every lot must score 85+ on the SCA scale. 85, or we wait for next harvest.' },
            { num: '02', title: 'The Farm Visit Rule', body: 'We do not source from any farm we have not personally visited. No exceptions.' },
            { num: '03', title: 'The Batch Size Cap', body: 'We will not exceed 12 kg drum batches. Smaller batches mean more attention.' },
            { num: '04', title: 'The Freshness Window', body: 'Every order is roasted within 5 days of dispatch. Fresh means fresh.' },
            { num: '05', title: 'The Honest Label', body: 'We tell you exactly what in every bag — farm, altitude, process, date, score.' },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="group grid grid-cols-[80px_1fr] gap-8 py-10 border-t border-white/6 hover:border-caramel/20 transition-all font-serif">
              <div className="font-mono text-5xl font-bold text-white/8 group-hover:text-caramel/20 transition-colors duration-500 leading-none pt-1">
                {item.num}
              </div>
              <div>
                <h3 className="text-xl font-bold text-cream mb-3 group-hover:text-gold transition-colors duration-300">{item.title}</h3>
                <p className="text-cream/65 text-base leading-relaxed max-w-2xl">{item.body}</p>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-white/6" />
        </motion.div>
      </section>

      <Divider />

      {/* SECTION 10 — NUMBERS */}
      <section className="max-w-7xl mx-auto px-6 py-28 md:py-40">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SectionLabel>By the Numbers</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-20 font-serif">
            The Work,<br /><span className="text-caramel italic">Quantified</span>
          </h2>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5">
          {[
            { target: 12, suffix: '', label: 'Countries visited' },
            { target: 4, suffix: '+', label: 'Years of sourcing' },
            { target: 3200, suffix: '+', label: 'Club members' },
            { target: 18, suffix: '', label: 'Farm partnerships' },
            { target: 100, suffix: '%', label: 'Direct trade' },
            { target: 6, suffix: '', label: 'Roast profiles' },
          ].map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-coffee-dark p-8 text-center flex flex-col items-center justify-center gap-3">
              <AnimatedNumber target={s.target} suffix={s.suffix} />
              <div className="font-mono text-[10px] uppercase tracking-widest text-cream/45">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Divider />

      {/* SECTION 11 — TEAM */}
      <section className="max-w-7xl mx-auto px-6 py-28 md:py-40">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SectionLabel>The People</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 max-w-xl font-serif">
            Three Obsessives.<br /><span className="text-caramel italic">One Standard.</span>
          </h2>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Arjun Mehta', role: 'Founder', bio: 'Spent 3 years visiting farms across 12 countries. Tasting every cup first.', detail: '12 countries', img: IMG.team1 },
            { name: 'Priya Kapoor', role: 'Head Roaster', bio: 'Former Q-Grader with 8 years experience. Refuses to use automation.', detail: 'Q-Grader', img: IMG.team2 },
            { name: 'Rahul Desai', role: 'Ritual Guide', bio: 'Manages the Club. Believes the gap is education, not equipment.', detail: '3,200+ Guided', img: IMG.team3 },
          ].map((person, i) => (
            <motion.div key={i} variants={fadeUp} className="group">
              <div className="relative overflow-hidden rounded-2xl aspect-square mb-6">
                <img src={person.img} alt={person.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/80 to-transparent" />
                <div className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-widest bg-caramel/15 border border-caramel/25 rounded-full px-3 py-1 text-caramel backdrop-blur-sm">
                  {person.detail}
                </div>
              </div>
              <h3 className="text-lg font-bold text-cream mb-1 group-hover:text-gold transition-colors duration-300">{person.name}</h3>
              <p className="font-mono text-[10px] uppercase tracking-widest text-caramel mb-4">{person.role}</p>
              <p className="text-cream/60 text-sm leading-relaxed italic">{person.bio}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Divider />

      {/* SECTION 12 — SUSTAINABILITY */}
      <section className="max-w-7xl mx-auto px-6 py-28 md:py-40">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div variants={fadeUp}>
            <SectionLabel>Chapter 05 — Legacy</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-10 leading-tight font-serif">
              The Cup You Drink<br /><span className="text-caramel italic">Plants a Tree</span>
            </h2>
            <div className="space-y-6 text-cream/75 text-lg leading-relaxed">
              <p>5% of every order goes to our Farm Future Fund — financing equipment and reforestation.</p>
              <p>Since 2021, we have planted over 14,000 shade trees. They lower temperatures, improve quality, and sequester carbon.</p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[ { num: '14,000+', label: 'Trees' }, { num: '38', label: 'Children' }, { num: '5%', label: 'Revenue' } ].map((s, i) => (
                <div key={i} className="text-center bg-card/50 border border-white/6 rounded-xl p-4">
                  <div className="font-mono text-2xl font-bold text-gold">{s.num}</div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-cream/45 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="relative">
            <div className="relative overflow-hidden rounded-3xl aspect-[4/5] shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
              <img src={IMG.pledge} alt="Pledge" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/50 to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Divider />

      {/* SECTION 13 — COMMUNITY */}
      <section className="py-28 md:py-40">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="max-w-7xl mx-auto px-6 mb-16">
            <SectionLabel>Chapter 06 — Community</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter max-w-xl leading-tight font-serif">
              The Ritual Club —<br /><span className="text-caramel italic">Where Obsessives Meet</span>
            </h2>
          </div>
        </motion.div>
        <div className="relative w-full h-[50vh] overflow-hidden mb-16">
          <img src={IMG.community} alt="Community" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark via-coffee-dark/20 to-coffee-dark/40" />
        </div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '📦', title: 'Monthly Drops', body: 'Exclusive selections shipped every month.' },
            { icon: '🔒', title: 'Early Access', body: 'Rare micro-lots available 48 hours early.' },
            { icon: '📖', title: 'Ritual Guide', body: 'Complete brewing guides and water chemistry.' },
            { icon: '🌐', title: 'Private Group', body: '3,200+ members sharing brewed scores.' },
          ].map((p, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-card/60 border border-white/6 rounded-2xl p-6 hover:border-caramel/25 transition-all">
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="text-base font-bold text-cream mb-3">{p.title}</h3>
              <p className="text-cream/60 text-sm leading-relaxed italic">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Divider />

      {/* SECTION 14 — CTA */}
      <section className="py-28 md:py-40 px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} className="max-w-4xl mx-auto text-center">
          <SectionLabel>Begin Your Ritual</SectionLabel>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight font-serif">Join the Ritual</h2>
          <p className="text-cream/65 text-xl mb-4 italic font-serif">The best cup you ve ever had is still ahead of you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Link to="/shopping" className="inline-flex items-center gap-3 bg-caramel text-coffee-dark font-bold px-10 py-5 rounded-full hover:bg-gold transition-colors duration-300 font-mono text-[11px] tracking-[0.3em] uppercase">
              Explore the Collection →
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
