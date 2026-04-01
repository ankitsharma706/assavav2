import React, { useEffect, useRef, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, PerspectiveCamera, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { EVENTS } from '../data/events';
import { Navbar } from '../components/CoffeeComponents';
import Footer from '../components/Footer';
import { Calendar, Clock, MapPin, Ticket, Share2, Sparkles as SparklesIcon, ArrowRight, Instagram, ChevronRight, Star, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { BookingSystem } from '../components/BookingSystem';

gsap.registerPlugin(ScrollTrigger);

// ─── 3D COFFEE BEAN SCENE ──────────────────────────────────
const CoffeeBean = ({ position }: { position: [number, number, number] }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={mesh} position={position} scale={0.4}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial color="#C68E5D" speed={1} distort={0.2} radius={1} />
      </mesh>
    </Float>
  );
};

const ThreeScene = () => (
  <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#C68E5D" />
      <Suspense fallback={null}>
        <CoffeeBean position={[-4, 2, 0]} />
        <CoffeeBean position={[5, -3, -2]} />
        <CoffeeBean position={[-2, -5, 1]} />
        <CoffeeBean position={[6, 4, -1]} />
        <Sparkles count={50} scale={10} size={1} speed={0.4} color="#C68E5D" />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  </div>
);

// ─── MAIN COMPONENT ──────────────────────────────────────────
const CinematicEventDetail = ({ cartCount, wishlistCount = 0, onOpenCart, onOpenCategories }: any) => {
  const { id } = useParams<{ id: string }>();
  const containerRef = useRef<HTMLDivElement>(null!);
  const storyRef = useRef<HTMLDivElement>(null!);
  const timelineRef = useRef<HTMLDivElement>(null!);
  const timelineProgressRef = useRef<HTMLDivElement>(null!);
  const bookingRef = useRef<HTMLDivElement>(null!);
  
  const event = EVENTS.find(e => e.id === id);

  // GSAP Scroll Animations
  useGSAP(() => {
    if (!event) return;

    // Text Reveal Animation (Story)
    const lines = storyRef.current.querySelectorAll('.reveal-line');
    lines.forEach((line) => {
      gsap.fromTo(line, 
        { opacity: 0.1, y: 20 },
        {
          opacity: 1, 
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: line,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          }
        }
      );
    });

    // Timeline Pinning
    if (timelineRef.current) {
        ScrollTrigger.create({
            trigger: timelineRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: ".timeline-sticky",
            pinSpacing: false,
            scrub: 1,
        });

        // Timeline Progress Line
        gsap.to(timelineProgressRef.current, {
           height: "100%",
           ease: "none",
           scrollTrigger: {
              trigger: timelineRef.current,
              start: "top center",
              end: "bottom center",
              scrub: true,
           }
        });
    }

  }, { scope: containerRef, dependencies: [event] });

  // Framer Motion Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!event) return <div className="min-h-screen bg-coffee-dark" />;

  return (
    <div ref={containerRef} className="relative bg-coffee-dark text-cream selection:bg-caramel selection:text-coffee-dark overflow-x-hidden pb-32">
      <ThreeScene />
      
      <Navbar
        onOpenCart={onOpenCart}
        onOpenCategories={onOpenCategories}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      {/* ─── HERO (PARALLAX + DEPTH) ─────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden z-10">
        <motion.div 
           style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
           className="absolute inset-0 z-0"
        >
          <img 
            src={event.heroImage || event.images[0]} 
            className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-[2s]" 
            alt={event.title}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-coffee-dark/20 via-transparent to-coffee-dark" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-7xl">
           <motion.div
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.5 }}
             className="space-y-4"
           >
              <span className="block font-mono text-[10px] uppercase text-caramel tracking-[0.8em] font-black">
                {event.category} • {event.date}
              </span>
              <h1 className="text-7xl md:text-[14rem] font-bold tracking-tighter text-white font-serif leading-none uppercase mix-blend-difference">
                 {event.title.split(' ')[0]}<br />
                 <span className="text-caramel italic font-light lowercase md:text-[12rem]">{event.title.split(' ')[1] || ''}</span>
              </h1>
              <p className="text-xl md:text-4xl italic font-serif text-white/80 max-w-3xl mx-auto py-12 border-y border-white/5 mt-12 bg-coffee-dark/40 backdrop-blur-3xl rounded-[60px]">
                 "{event.tagline}"
              </p>
           </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
           animate={{ y: [0, 10, 0] }} 
           transition={{ repeat: Infinity, duration: 2 }}
           className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer"
           onClick={() => storyRef.current.scrollIntoView({ behavior: 'smooth' })}
        >
           <span className="text-[8px] font-mono uppercase tracking-[0.5em] opacity-30">Scroll to Explore</span>
           <div className="w-[1px] h-20 bg-gradient-to-b from-caramel to-transparent" />
        </motion.div>
      </section>

      {/* ─── STORY (SCROLL REVEAL) ─────────────────────────── */}
      <section className="relative py-60 px-6 z-10">
        <div ref={storyRef} className="max-w-5xl mx-auto space-y-12">
           <h2 className="text-sm font-mono tracking-[0.5em] uppercase text-caramel mb-20 italic">/ The Cultural Narrative</h2>
           {event.story.split('. ').map((sentence, i) => (
             <p key={i} className="reveal-line text-4xl md:text-7xl font-serif leading-[1.1] text-white/20">
               {sentence}.
             </p>
           ))}
        </div>
      </section>

      {/* ─── EXPERIENCE CARDS (3D INTERACTION) ──────────────── */}
      <section className="py-40 px-6 z-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
           {event.highlights.map((h, i) => (
             <motion.div
               key={i}
               whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
               style={{ transformStyle: 'preserve-3d' }}
               className="group relative p-12 aspect-[4/5] rounded-[60px] glass border border-white/5 flex flex-col justify-end overflow-hidden"
             >
                <div className="absolute inset-0 z-0 scale-110 group-hover:scale-100 transition-transform duration-[1.5s]">
                   <img src={h.image || event.images[i]} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-opacity" alt={h.title} />
                   <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark via-coffee-dark/20 to-transparent" />
                </div>
                <div className="relative z-10 space-y-4" style={{ transform: 'translateZ(50px)' }}>
                   <div className="text-4xl text-caramel mb-6">{h.icon}</div>
                   <h3 className="text-3xl font-bold font-serif text-white uppercase tracking-tight leading-none">{h.title}</h3>
                   <p className="text-sm italic font-serif text-white/60 group-hover:text-white transition-colors">{h.description}</p>
                </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* ─── EVENT TIMELINE (SCROLL PIN) ───────────────────── */}
      <section ref={timelineRef} className="relative z-10 bg-white/2 overflow-hidden py-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 px-6 h-[150vh]">
           <div className="timeline-sticky h-screen flex flex-col justify-center">
              <span className="text-caramel font-mono text-[10px] uppercase font-bold tracking-[0.5em] mb-4">Chronology</span>
              <h2 className="text-6xl md:text-9xl font-bold font-serif uppercase text-white tracking-tighter leading-[0.8] mb-12">
                 The Ritual<br />
                 <span className="text-caramel italic lowercase">Sequence</span>
              </h2>
              <p className="text-cream/50 text-xl font-serif italic max-w-sm">From the first light to the terminal brew, catch every chapter of Kora Kulture.</p>
           </div>
           
           <div className="relative pt-40 pb-40">
              <div className="absolute left-6 top-40 bottom-40 w-[2px] bg-white/5">
                 <div ref={timelineProgressRef} className="w-full h-0 bg-caramel shadow-[0_0_20px_#C68E5D]" />
              </div>
              <div className="space-y-40 pl-24">
                 {event.timeline?.map((item, i) => (
                   <motion.div 
                     key={i} 
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     className="space-y-4"
                   >
                     <span className="text-[12px] font-bold uppercase tracking-[0.4em] text-caramel">{item.time}</span>
                     <h3 className="text-4xl md:text-6xl font-bold font-serif text-white uppercase tracking-tight">{item.activity}</h3>
                   </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* ─── BOOKING SECTION (IMMERIVE REGISTRY) ─────────────── */}
      <section ref={bookingRef} className="relative z-10 py-60 px-6 border-t border-white/5 bg-gradient-to-b from-coffee-dark to-black/50">
        <div className="max-w-7xl mx-auto">
           <div className="mb-24 space-y-4">
              <span className="text-caramel font-mono text-[10px] uppercase tracking-[0.8em] font-bold">Registry</span>
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold font-serif text-white uppercase italic tracking-tighter leading-none">
                 Secure Your <br /> <span className="text-caramel italic font-light lowercase">Presence</span>
              </h2>
           </div>
           
           <BookingSystem event={event} />
        </div>
      </section>

      {/* --- MOBILE STICKY CTA --- */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-6 lg:hidden"
      >
        <button 
          onClick={scrollToBooking}
          className="w-full py-6 bg-caramel text-coffee-dark rounded-full font-black uppercase tracking-[0.5em] text-xs shadow-2xl flex items-center justify-center gap-4"
        >
          Reserve Your Pass <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

      {/* ─── CTA (CINEMATIC END) ───────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden z-10 bg-coffee-dark">
         <div className="absolute inset-0 z-0 opacity-20">
            <Canvas>
               <Sparkles count={200} scale={20} size={2} speed={0.5} color="#C68E5D" />
            </Canvas>
         </div>
         <div className="relative z-10 text-center space-y-16">
            <h2 className="text-8xl md:text-[18rem] font-bold tracking-tighter text-white font-serif uppercase leading-none mix-blend-difference">
               Join The<br />
               <span className="text-caramel italic lowercase">Experience</span>
            </h2>
            
            <motion.button 
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
               onClick={scrollToBooking}
               className="px-20 py-10 bg-caramel text-coffee-dark rounded-full font-black uppercase tracking-[0.8em] text-sm shadow-[0_40px_100px_rgba(198,142,93,0.3)] hover:glow-border transition-all group overflow-hidden relative"
            >
               <span className="relative z-10">Reserve Registry</span>
               <motion.div 
                  className="absolute inset-0 bg-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.4 }}
               />
            </motion.button>
         </div>
      </section>

      <Footer />
    </div>
  );
};

export default CinematicEventDetail;
