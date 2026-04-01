import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  ChevronDown, 
  Star, 
  ArrowRight, 
  MapPin, 
  Clock, 
  Wind, 
  Flame, 
  Coffee,
  X,
  Plus,
  Sparkles
} from 'lucide-react';
import { Navbar } from '../components/CoffeeComponents';
import Footer from '../components/Footer';
import { CATEGORY_DATA } from '../data/categoryData';
import productsData from '../../data/coffee.json';
import { cn } from '../lib/utils';
import { Product } from '../types';

// --- Shared Components for Category Detail ---

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="h-[1px] w-12 bg-caramel/30" />
    <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-caramel">
      {children}
    </span>
  </div>
);

const EditorialProductCard = ({ product, index }: { product: Product, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.8 }}
    viewport={{ once: true }}
    className="group relative"
  >
    <Link to={`/coffeeDetail/${product.id}`} className="block h-full">
      <div className="relative aspect-[3/4] overflow-hidden rounded-[40px] bg-coffee-dark/40 border border-white/5 shadow-2xl mb-8">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark via-coffee-dark/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
        
        {/* Floating Details on Hover */}
        <div className="absolute bottom-10 inset-x-8 flex justify-between items-end translate-y-12 group-hover:translate-y-0 transition-transform duration-700">
           <div className="bg-caramel/90 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-black text-coffee-dark">Explore Origin</span>
              <ArrowRight className="w-4 h-4 text-coffee-dark" />
           </div>
           <div className="text-right">
              <span className="block text-[8px] uppercase tracking-[0.3em] font-bold text-cream mb-2 underline decoration-caramel underline-offset-4 tracking-widest">Registry No.</span>
              <span className="text-xs font-mono text-caramel">#AV-{product.id.slice(0, 4)}</span>
           </div>
        </div>

        {/* Floating Label */}
        {product.label && (
           <div className="absolute top-8 right-8 bg-caramel text-coffee-dark px-4 py-1 rounded-full text-[8px] uppercase font-black tracking-widest shadow-lg shadow-caramel/20">
              {product.label}
           </div>
        )}
      </div>

      <div className="space-y-3 px-2">
        <div className="flex justify-between items-start gap-4">
           <div className="space-y-1">
             <h3 className="text-2xl font-serif text-cream italic group-hover:text-caramel transition-colors">{product.name}</h3>
             <p className="text-[10px] font-bold uppercase tracking-widest text-caramel/50">{product.profile?.origin || 'Single Estate Artifact'}</p>
           </div>
           <span className="text-lg font-mono font-bold text-caramel tabular-nums">₹{product.price}</span>
        </div>
        
        <p className="text-sm text-cream/50 italic font-serif leading-relaxed line-clamp-2">
           {product.description}
        </p>

        <div className="pt-4 flex items-center justify-between border-t border-white/5">
           <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("w-3 h-3 fill-caramel text-caramel", i >= (product.rating || 5) && "fill-none text-white/10")} />
              ))}
           </div>
           <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-widest font-black text-cream/20 text-right">Extraction: Optimized</span>
           </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

// --- Main Category Detail Page ---

export default function CategoryDetail({ cartCount, wishlistCount = 0, onOpenCart, onOpenCategories }: any) {
  const { id } = useParams<{ id: string }>();
  const containerRef = useRef<HTMLDivElement>(null!);
  const data = CATEGORY_DATA[id || ''];
  
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);
  
  const filteredProducts = useMemo(() => {
    const products = (productsData as any).products.filter((p: any) => p.category === id);
    if (activeFilter === 'All') return products;
    return products.filter((p: any) => p.profile?.roast === activeFilter || p.profile?.origin === activeFilter);
  }, [id, activeFilter]);

  // Parallax Hero
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, 50]);

  if (!data) return <div className="min-h-screen bg-coffee-dark" />;

  return (
    <div ref={containerRef} className="relative bg-[#0f0a07] text-cream min-h-screen selection:bg-caramel selection:text-coffee-dark overflow-x-hidden">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Background Radial Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_50%_0%,_#2B1B12_0%,_#0f0a07_60%)]" />

      <Navbar 
        onOpenCart={onOpenCart} 
        onOpenCategories={onOpenCategories} 
        cartCount={cartCount} 
        wishlistCount={wishlistCount}
      />

      {/* ─── SECTION 1: CINEMATIC HERO ─────────────────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden z-10 sticky top-0">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 z-0">
          <img 
            src={data.heroImage} 
            alt={data.name} 
            className="w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-[2s]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-coffee-dark/60 via-transparent to-coffee-dark" />
        </motion.div>

        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 text-center px-6 max-w-7xl"
        >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: '0.4em' }}
            animate={{ opacity: 1, letterSpacing: '0.6em' }}
            transition={{ duration: 1.5 }}
            className="block text-[10px] uppercase font-black text-caramel mb-8 tracking-[0.6em] drop-shadow-[0_0_15px_rgba(198,142,93,0.5)]"
          >
            EXPERIENCE REGISTRY
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-[10rem] font-bold font-serif italic text-white leading-none uppercase drop-shadow-2xl mb-12 tracking-tighter"
          >
             {data.name.split(' ').slice(0, 2).join(' ')} <br />
             <span className="text-caramel italic font-light lowercase md:text-[8rem]">{data.name.split(' ').slice(2).join(' ')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-xl md:text-3xl text-cream/80 italic font-serif max-w-3xl mx-auto drop-shadow-lg"
          >
            "{data.tagline}"
          </motion.p>
        </motion.div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
           <span className="text-[8px] uppercase tracking-[0.5em] font-black text-caramel/50 animate-pulse">Explore Narrative</span>
           <div className="w-[1px] h-20 bg-gradient-to-b from-caramel to-transparent" />
        </div>
      </section>

      {/* ─── SECTION 2: EDITORIAL NARRATIVE ───────────────── */}
      <section className="relative z-20 bg-coffee-dark py-40 md:py-60 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
           <div className="lg:col-span-4 lg:sticky lg:top-40 space-y-12">
              <SectionLabel>Ritual Chapter</SectionLabel>
              <h2 className="text-6xl md:text-8xl font-serif font-bold text-white tracking-tighter leading-none italic uppercase">
                 From <br /> Soil <br /> To <br /> <span className="text-caramel font-light italic lowercase">Spirit</span>
              </h2>
              <div className="space-y-6">
                 <div className="h-0.5 w-12 bg-caramel" />
                 <p className="text-xs uppercase tracking-widest font-black text-white/20 font-mono">Archive Code: {id?.toUpperCase()}-001X</p>
              </div>
           </div>

           <div className="lg:col-span-8 space-y-16">
              <p className="text-3xl md:text-5xl font-serif text-cream leading-tight [text-indent:40px] first-letter:text-9xl first-letter:font-bold first-letter:text-caramel first-letter:mr-4 first-letter:float-left first-letter:leading-none">
                 {data.intro}
              </p>
              
              <div className="space-y-12 text-lg md:text-xl font-serif text-cream/60 leading-relaxed italic border-l border-white/5 pl-12 py-10 hover:text-cream/90 transition-colors duration-700">
                 {data.story.split('\n\n').map((para, i) => (
                   <p key={i}>{para}</p>
                 ))}
              </div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative h-[600px] rounded-[60px] overflow-hidden group shadow-2xl border border-white/5"
              >
                 <img src={data.origin.image} className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[3s] group-hover:scale-110" alt="Process" />
                 <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark via-coffee-dark/40 to-transparent flex flex-col justify-end p-16">
                    <h3 className="text-4xl font-serif text-white font-bold mb-4 italic uppercase tracking-tighter">{data.origin.title}</h3>
                    <p className="text-cream/60 text-lg max-w-xl italic font-serif leading-relaxed line-clamp-3">{data.origin.description}</p>
                 </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* ─── SECTION 3: EDITORIAL GRID ────────────────────── */}
      <section className="py-40 px-6 bg-[#0f0a07] z-20 relative ">
        <div className="max-w-7xl mx-auto space-y-24">
           <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-white/5 pb-16">
              <div className="space-y-6">
                <SectionLabel>Curated Selections</SectionLabel>
                <h2 className="text-6xl md:text-8xl font-serif font-bold text-white tracking-tighter uppercase italic leading-none">
                   The Prime <br /> <span className="text-caramel font-light lowercase">Registry</span>
                </h2>
              </div>
              
              {/* Filter Panel */}
              <div className="flex items-center gap-4 flex-wrap">
                 <div className="bg-white/2 p-2 rounded-full flex items-center gap-2 border border-white/5 backdrop-blur-3xl">
                    {['All', 'Light', 'Medium', 'Dark'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={cn(
                          "px-8 py-3 rounded-full text-[10px] uppercase font-black tracking-widest transition-all",
                          activeFilter === filter ? "bg-caramel text-coffee-dark shadow-[0_0_20px_rgba(198,142,93,0.3)]" : "text-white/30 hover:text-caramel"
                        )}
                      >
                        {filter}
                      </button>
                    ))}
                 </div>
                 <button className="w-14 h-14 rounded-full bg-caramel text-coffee-dark flex items-center justify-center hover:bg-white transition-colors group shadow-lg shadow-caramel/20">
                    <Filter className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
              {filteredProducts.map((p: Product, i: number) => (
                <EditorialProductCard key={p.id} product={p} index={i} />
              ))}
           </div>
           
           {filteredProducts.length === 0 && (
             <div className="py-40 text-center space-y-8">
                <div className="relative inline-block">
                  <Coffee className="w-20 h-20 text-caramel mx-auto opacity-10 animate-bounce" />
                  <Sparkles className="absolute -top-4 -right-4 w-10 h-10 text-caramel/20 animate-pulse" />
                </div>
                <h3 className="text-4xl font-serif italic text-white/10 uppercase tracking-widest font-black">Archive Empty</h3>
                <p className="text-white/20 italic font-serif">Awaiting the next seasonal harvest ritual cycles.</p>
             </div>
           )}
        </div>
      </section>

      {/* ─── SECTION 4: VISUAL GALLERY ────────────────────── */}
      {data.gallery.length > 0 && (
        <section className="py-40 px-6 bg-[#0f0a07] z-20 relative overflow-hidden">
           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-2 space-y-12 flex flex-col justify-center pr-12">
                 <SectionLabel>Visual Chronicles</SectionLabel>
                 <h2 className="text-6xl md:text-8xl font-serif font-bold text-white tracking-tighter uppercase italic leading-none">
                   The Art of <br /> <span className="text-caramel font-light lowercase">Observation</span>
                 </h2>
                 <p className="text-lg text-cream/40 italic font-serif leading-relaxed">
                   Wordless reflections on the tactile heart of our daily devotion. Captured in the still moments between bean and cup.
                 </p>
                 <div className="w-20 h-[1px] bg-caramel/20" />
              </div>
              {data.gallery.map((img, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -20, rotate: i % 2 === 0 ? 2 : -2 }}
                  className={cn(
                    "relative aspect-square rounded-[40px] overflow-hidden shadow-2xl border border-white/5 grayscale hover:grayscale-0 transition-all duration-700",
                    i === 0 ? "lg:mt-32" : ""
                  )}
                >
                   <img src={img} className="w-full h-full object-cover" alt="Gallery" />
                   <div className="absolute inset-0 bg-coffee-dark/20 hover:bg-transparent transition-colors" />
                </motion.div>
              ))}
           </div>
        </section>
      )}

      {/* ─── SECTION 5: TESTIMONIALS ─────────────────────── */}
      {data.testimonials.length > 0 && (
        <section className="py-60 px-6 bg-coffee-dark z-20 relative overflow-hidden border-y border-white/5">
           {/* Floating Icons Background */}
           <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
              <div className="absolute top-20 left-40 rotate-12"><Star className="w-40 h-40" /></div>
              <div className="absolute bottom-40 right-20 -rotate-45"><Star className="w-64 h-64" /></div>
           </div>

           <div className="max-w-5xl mx-auto space-y-40">
              {data.testimonials.map((t, i) => (
                <div key={i} className="text-center space-y-16 max-w-4xl mx-auto">
                   <div className="flex justify-center gap-2">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-caramel text-caramel shadow-[0_0_10px_rgba(198,142,93,0.5)]" />)}
                   </div>
                   <h3 className="text-4xl md:text-7xl font-serif italic text-cream leading-tight drop-shadow-2xl">
                      "{t.text}"
                   </h3>
                   <div className="space-y-4">
                      <div className="w-12 h-[1px] bg-caramel/30 mx-auto" />
                      <span className="block text-[10px] uppercase tracking-[0.5em] font-black text-caramel/60">{t.author} • DEVOTED RITUALIST</span>
                   </div>
                </div>
              ))}
           </div>
        </section>
      )}

      {/* ─── SECTION 6: CTA ──────────────────────────────── */}
      <section className="h-screen flex items-center justify-center bg-[#0f0a07] z-20 relative">
         <div className="text-center space-y-12">
            <SectionLabel>Ritual Discovery</SectionLabel>
            <h2 className="text-7xl md:text-[14rem] font-bold font-serif text-white tracking-tighter uppercase italic leading-none">
               Explore <br /> <span className="text-caramel font-light lowercase">Deeply</span>
            </h2>
            <div className="flex gap-8 justify-center flex-wrap px-6">
               <Link 
                 to="/events"
                 className="px-16 py-8 rounded-full border border-white/10 text-cream text-[10px] uppercase font-black tracking-[0.5em] hover:bg-caramel hover:text-coffee-dark transition-all duration-500 shadow-xl"
               >
                 Ritual Events
               </Link>
               <Link 
                 to="/story"
                 className="px-16 py-8 rounded-full bg-caramel text-coffee-dark text-[10px] uppercase font-black tracking-[0.5em] shadow-2xl shadow-caramel/20 hover:shadow-caramel/40 transition-all duration-500"
               >
                 Discover Story
               </Link>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}
