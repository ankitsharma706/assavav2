import React, { useState, useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, ArrowRight, CheckCircle2, ChevronDown, Send } from 'lucide-react';
import { Navbar, Footer, ScrollIndicator } from '../components/CoffeeComponents';

// --- Types ---
type ContactProps = {
  cartCount: number;
  wishlistCount?: number;
  onOpenCart: () => void;
  onOpenCategories: () => void;
};

// --- Animations ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
};

// --- UI Sub-components ---
const SectionLabel = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`block font-mono text-[10px] uppercase tracking-[0.4em] mb-4 text-olive font-bold ${className}`}>
    {children}
  </span>
);

const GlassInput = ({ label, type = "text", placeholder, options, isTextArea }: { 
  label: string, 
  type?: string, 
  placeholder?: string, 
  options?: string[],
  isTextArea?: boolean
}) => (
  <div className="relative group mb-8">
    <label className="block text-[10px] uppercase font-bold tracking-widest text-caramel/60 mb-2 group-focus-within:text-caramel transition-colors">
      {label}
    </label>
    {options ? (
      <div className="relative">
        <select className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-sm outline-none focus:border-caramel/40 transition-all appearance-none text-cream font-serif">
          <option value="" disabled selected className="bg-coffee-dark">{placeholder}</option>
          {options.map(o => <option key={o} value={o} className="bg-coffee-dark">{o}</option>)}
        </select>
        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/40 pointer-events-none" />
      </div>
    ) : isTextArea ? (
      <textarea 
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-sm outline-none focus:border-caramel/40 hover:border-white/20 transition-all text-cream placeholder-cream/30 font-serif min-h-[150px] resize-none"
      />
    ) : (
      <input 
        type={type}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-sm outline-none focus:border-caramel/40 hover:border-white/20 transition-all text-cream placeholder-cream/30 font-serif"
      />
    )}
    <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-caramel/40 group-focus-within:w-full transition-all duration-700 ease-in-out" />
  </div>
);

const Contact: React.FC<ContactProps> = ({ cartCount, onOpenCart, onOpenCategories, wishlistCount = 0 }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  // Parallax for hero
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '20%']);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.05]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 2000);
  };

  return (
    <div className="bg-coffee-dark text-cream min-h-screen relative selection:bg-caramel/20 selection:text-caramel">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.04] mix-blend-overlay grain" />
      
      <Navbar 
        onOpenCart={onOpenCart} 
        onOpenCategories={onOpenCategories} 
        cartCount={cartCount} 
        wishlistCount={wishlistCount} 
      />

      {/* --- SECTION 1: HERO (EMOTIONAL ENTRY) --- */}
      <section ref={heroRef} className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=85&w=2400" 
            alt="Artisanal Harvest" 
            className="w-full h-full object-cover grayscale-[40%] brightness-[0.6]"
          />
          {/* Overlays */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-coffee-dark via-coffee-dark/80 to-transparent" />
          <div className="absolute inset-0 bg-coffee-dark/40" />
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="inline-block px-4 py-1 border border-caramel/20 rounded-full mb-8"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-caramel font-bold">Connecting Through Ritual</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85] mb-8 font-serif text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)] uppercase italic">
            Let’s Start a<br />
            <span className="text-caramel italic font-light lowercase">Conversation</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-cream/70 max-w-2xl mx-auto font-light leading-relaxed tracking-wide italic font-serif">
            "Whether it’s coffee, collaboration, or culture — we’re here."
          </p>

          <ScrollIndicator 
            className="mt-16 mx-auto opacity-60 hover:opacity-100 transition-opacity"
            onClick={() => window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' })}
          />
        </motion.div>
      </section>

      {/* --- SECTION 2: CONTACT PHILOSOPHY --- */}
      <section className="py-32 md:py-48 px-6">
        <motion.div 
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="w-16 h-[1px] bg-caramel/30 mx-auto mb-10" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 font-serif logout italic">
            intentional, warm, and crafted with care.
          </h2>
          <div className="space-y-8 text-xl text-cream/70 font-light leading-relaxed font-serif italic text-balance">
            <p>
              At ASSAVA, every conversation begins like a perfect cup — intentional, warm, and crafted with care.
            </p>
            <p>
              Whether you're reaching out for collaboration, partnership, or simply to share your love for coffee, we welcome every message as part of our journey.
            </p>
          </div>
          <div className="mt-16 flex justify-center gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-1 h-1 rounded-full bg-caramel/20" />
            ))}
          </div>
        </motion.div>
      </section>

      {/* --- SECTION 3: CONTACT FORM (PREMIUM UI) --- */}
      <section className="py-24 md:py-40 bg-white/[0.02] relative overflow-hidden">
        {/* Soft Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] border border-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] border border-white/5 rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start relative z-10">
          <motion.div 
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="lg:sticky lg:top-32"
          >
            <SectionLabel>Reach Out</SectionLabel>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-10 leading-tight font-serif text-white uppercase italic">
              Inquiry<br /><span className="text-caramel italic font-light lowercase">Assistance</span>
            </h2>
            <p className="text-lg text-cream/60 max-w-md font-serif italic leading-relaxed">
              If you have specific needs regarding bulk orders, events, or brand collaborations, please use the form or reach out directly via our secure channel.
            </p>
            
            <div className="mt-16 space-y-8">
              <div className="group flex items-start gap-6 cursor-pointer">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-caramel group-hover:bg-white/10 transition-all duration-500 shadow-sm">
                  <Mail className="w-5 h-5 text-caramel" />
                </div>
                <div>
                  <span className="block text-[8px] uppercase tracking-widest text-caramel/50 font-bold mb-1">Electronic Mail</span>
                  <span className="text-lg font-serif text-cream border-b border-transparent group-hover:border-caramel transition-all">hello@assavacoffee.com</span>
                </div>
              </div>
              <div className="group flex items-start gap-6 cursor-pointer">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-caramel group-hover:bg-white/10 transition-all duration-500 shadow-sm">
                  <Phone className="w-5 h-5 text-caramel" />
                </div>
                <div>
                  <span className="block text-[8px] uppercase tracking-widest text-caramel/50 font-bold mb-1">Voice Communication</span>
                  <span className="text-lg font-serif text-cream border-b border-transparent group-hover:border-caramel transition-all">+91 9000 8000 12</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-10 md:p-16 rounded-[40px] shadow-[0_40px_80px_rgba(0,0,0,0.3)]"
          >
            {formStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-caramel/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-10 h-10 text-caramel" />
                </div>
                <h3 className="text-3xl font-serif text-white mb-4 italic">Message Received</h3>
                <p className="text-cream/50 font-serif italic">We'll get back to you with the same warmth we brew our coffee. Usually within 24 hours.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-10 text-[10px] uppercase tracking-widest font-bold text-caramel border-b border-caramel/30 pb-2 hover:text-white transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <GlassInput label="Full Name" placeholder="E.g. Arjun Mehta" />
                  <GlassInput label="Email Address" type="email" placeholder="arjun@ritual.com" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <GlassInput label="Phone Number (Optional)" type="tel" placeholder="+91 ..." />
                  <GlassInput 
                    label="Inquiry Type" 
                    placeholder="General Inquiry" 
                    options={["General Inquiry", "Collaboration", "Events", "Bulk Orders", "Partnerships"]} 
                  />
                </div>
                <GlassInput label="Your Message" isTextArea placeholder="How can we help you start your journey?" />
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={formStatus === 'submitting'}
                  className="w-full h-20 bg-caramel text-coffee-dark rounded-2xl flex items-center justify-center gap-4 group overflow-hidden relative shadow-2xl shadow-caramel/20"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 font-bold uppercase tracking-[0.2em] text-[11px]">
                    {formStatus === 'submitting' ? 'Authenticating...' : 'Submit Inquiry'}
                  </span>
                  <Send className={`relative z-10 w-4 h-4 transition-transform duration-500 ${formStatus === 'submitting' ? 'animate-bounce' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 4: COLLABORATION INVITE --- */}
      <section className="py-32 md:py-48 bg-transparent">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <SectionLabel className="mb-8 font-bold">Collaboration</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-12 font-serif leading-tight uppercase italic">
              Let’s Build Something<br /><span className="text-caramel italic font-light lowercase">Together</span>
            </h2>
            <p className="text-xl text-cream/60 font-serif italic leading-relaxed mb-16 text-balance">
              We collaborate with creators, cafés, brands, and storytellers. If you believe coffee is more than a beverage — we want to hear your vision.
            </p>
            
            <button className="inline-flex items-center gap-6 group">
              <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-white group-hover:text-caramel transition-colors underline underline-offset-8">
                Propose a Collaboration
              </span>
              <div className="w-14 h-14 bg-caramel text-coffee-dark rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 5: SOCIAL / INSTAGRAM FEED --- */}
      <section className="py-24 md:py-40 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <SectionLabel>Follow the Journey</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white font-serif lowercase italic">
                Our Narrative Feed
              </h2>
            </div>
            <a href="#" className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-caramel hover:gap-5 transition-all">
              @ASSAVACOFFEE <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&q=80&w=800"
            ].map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer"
              >
                <img src={img} alt="Instagram Moment" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-caramel/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                  <Instagram className="w-8 h-8 text-white scale-90 group-hover:scale-100 transition-transform duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 6: LOCATION / MAP --- */}
      <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-coffee-dark via-transparent to-transparent" />
        <div className="absolute inset-x-12 top-12 z-20 md:w-96">
          <div className="bg-coffee-dark/80 backdrop-blur-xl p-10 border border-white/5 rounded-[32px] shadow-2xl">
            <SectionLabel>Our Sanctuary</SectionLabel>
            <h3 className="text-3xl font-serif text-white mb-6 uppercase italic">Flagship Café<br /><span className="text-caramel italic font-light lowercase text-2xl">Bhubaneswar Base</span></h3>
            <div className="space-y-4 text-sm text-cream/70 font-serif italic">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-caramel shrink-0" />
                <span>Plot No- 429B, Saheed Nagar, <br />Bhubaneswar, Odisha 751007</span>
              </div>
              <div className="pt-6">
                <span className="block text-[8px] uppercase tracking-widest text-caramel/50 font-bold mb-1">Operating Hours</span>
                <span className="text-white not-italic font-bold">11:00 — 23:00 Daily</span>
              </div>
            </div>
          </div>
        </div>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.66879!2d85.8545719!3d20.2800272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a1d63ba5aa71%3A0xfc8fe5924f0b81ac!2zQXNzYXZhIENvZmZlZSBSb2FzdGVycw!5e0!3m2!1sen!2sin!4v1700000000000" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy"
          className="filter brightness-[0.7] contrast-[1.2] invert-[0.9] hue-rotate-[180deg] grayscale-[0.8]"
        ></iframe>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
