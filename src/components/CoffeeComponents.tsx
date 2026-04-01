import React, { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Search, Coffee, MapPin, Star, ArrowRight, Menu, X, User, ShoppingCart, Settings, Package, LogOut, ChevronRight, ChevronLeft, Filter, Check, Droplets, Zap, FlaskConical, Wind, Cylinder, Flame, ChevronDown, Plus, Info, Clock, ExternalLink, Heart, CheckCircle } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture, Preload } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';
import { CoffeeBean, CoffeeDust, CoffeeSteam, LiquidBlob, BeanCluster, ExplodingHeroBean } from './ThreeScene';
import { cn } from '../lib/utils';
import { Link, useLocation, useParams } from 'react-router-dom';
import { PRODUCTS, COFFEE_COLLECTIONS, STORY_STEPS, STORY_CHAPTERS, COFFEE_VARIANTS, REVIEWS, PRODUCT_FAQS } from '../constants';
import { Product, StoryStep, StoryChapter } from '../types';
import Footer from './Footer';
import ScrollIndicator from './ScrollIndicator';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export { Footer, ScrollIndicator };

// --- Navbar ---
export function Navbar({ onOpenCart, onOpenCategories, cartCount, wishlistCount, className }: { onOpenCart: () => void, onOpenCategories: () => void, cartCount: number, wishlistCount?: number, className?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/${id}`;
    } else {
      setTimeout(() => {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const navLinks: Array<{ name: string; path?: string; href?: string; onClick?: () => void }> = [
    // { name: 'Experience', path: '/' },
    // { name: 'Collections', href: '#collection' },
    { name: 'Shop', path: '/shopping' },
    { name: 'Category', path: '/category' },
    { name: 'Events', path: '/events' },
    { name: 'Story', path: '/story' },
    { name: 'About', path: '/about' },
    // { name: 'Reviews', path: '/reviews' },
    // { name: 'Social', path: '/social' },
    { name: 'Account', path: '/account' },
  ];

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4",
        isScrolled ? "glass py-3" : "bg-transparent",
        className
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(198,142,93,0.5)] group-hover:scale-110 transition-all duration-500 overflow-hidden relative border border-white/10">
              <img 
                src="/logo.png" 
                alt="Assava Logo" 
                className="w-full h-full object-cover scale-[1] transition-transform duration-700" 
              />
            </div>
            <span className={cn("text-3xl font-bold tracking-tighter group-hover:text-caramel transition-colors uppercase font-serif italic", !className || !className.includes('text-') ? "text-white" : "")}>ASSAVA</span>
          </Link>

          <div className={cn("hidden lg:flex items-center gap-6 xl:gap-8 text-[9px] font-bold uppercase tracking-[0.3em]", !className || !className.includes('text-') ? "text-cream/80" : "")}>
            {navLinks.filter(l => l.name !== 'Account').map((link) => {
              if (link.path) {
                return (
                  <Link 
                    key={link.name}
                    to={link.path} 
                    className={cn("hover:text-cream transition-colors", location.pathname === link.path && "text-cream")}
                  >
                    {link.name}
                  </Link>
                );
              }
              if (link.href) {
                return (
                  <button 
                    key={link.name}
                    onClick={() => handleScrollTo(link.href as string)}
                    className="hover:text-cream transition-colors flex items-center gap-1"
                  >
                    {link.name}
                  </button>
                );
              }
              return (
                <button 
                  key={link.name}
                  onClick={link.onClick} 
                  className="hover:text-cream transition-colors flex items-center gap-1"
                >
                  {link.name} <Filter className="w-3 h-3" />
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 hover:bg-cream/10 rounded-full transition-colors group">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-caramel text-coffee-dark text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
            <Link to="/account" className="relative p-2 hover:bg-cream/10 rounded-full transition-colors group">
              <Heart className="w-5 h-5" />
              {wishlistCount !== undefined && wishlistCount >= 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-caramel text-coffee-dark text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/account" className="hidden sm:flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-semibold hover:glow-border transition-all">
              <User className="w-4 h-4" />
              <span>Account</span>
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-cream/10 rounded-full transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] mobile-nav flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-20">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(198,142,93,0.5)] overflow-hidden relative border border-white/10">
                <img src="/logo.png" alt="Assava Logo" className="w-full h-full object-cover scale-[0.8]" />
              </div>
              <span className="text-3xl font-bold tracking-tighter text-white uppercase font-serif italic">ASSAVA</span>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 hover:bg-cream/10 rounded-full transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.path ? (
                    <Link 
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-3xl md:text-4xl font-bold tracking-tighter uppercase hover:text-caramel transition-colors block"
                    >
                      {link.name}
                    </Link>
                  ) : link.href ? (
                    <button 
                      onClick={() => {
                        handleScrollTo(link.href as string);
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-3xl md:text-4xl font-bold tracking-tighter uppercase hover:text-caramel transition-colors text-left block"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        link.onClick?.();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-3xl md:text-4xl font-bold tracking-tighter uppercase hover:text-caramel transition-colors text-left block"
                    >
                      {link.name}
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- AddToCart Notification Ritual ---
export function RitualToast({ item, isVisible }: { item: any, isVisible: boolean }) {
  if (!item) return null;
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-12 right-12 z-[200] glass px-8 py-6 rounded-[32px] flex items-center gap-6 glow-border shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/10"
        >
          <div className="w-16 h-16 rounded-[20px] overflow-hidden glass border border-white/10 flex-shrink-0">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-1">
            <span className="text-caramel font-mono text-[8px] uppercase tracking-widest font-bold">Added to Ritual</span>
            <h4 className="text-lg font-bold tracking-tight text-white uppercase">{item.name}</h4>
            <div className="flex items-center gap-2 text-[10px] text-cream/40 font-bold uppercase tracking-widest">
              <CheckCircle className="w-3 h-3 text-caramel" /> Successfully Secured
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- Hero Section ---
function FloatingBeans() {
  const beanTexture = useTexture('https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=500');
  
  return (
    <>
      <CoffeeBean position={[-4, 2, -2]} rotation={[0.4, 0.2, 0.5]} scale={0.2} texture={beanTexture} />
      <CoffeeBean position={[5, -3, -1]} rotation={[1.2, 0.5, 0.1]} scale={0.25} texture={beanTexture} />
      <CoffeeBean position={[-6, -4, -3]} rotation={[0.1, 0.8, 0.9]} scale={0.18} texture={beanTexture} />
      <CoffeeBean position={[7, 4, -5]} rotation={[0.5, 0.5, 0.5]} scale={0.22} texture={beanTexture} />
      <CoffeeBean position={[-8, 1, -4]} rotation={[0.2, 0.9, 0.1]} scale={0.15} texture={beanTexture} />
      <CoffeeBean position={[2, 5, -6]} rotation={[0.8, 0.1, 0.4]} scale={0.2} texture={beanTexture} />
    </>
  );
}

// --- Hero Section (UPGRADED MASSIVELY WITH GSAP & R3F) ---
export function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subtextRef = useRef(null);

  useGSAP(() => {
     const tl = gsap.timeline({
        scrollTrigger: {
           trigger: containerRef.current,
           start: 'top top',
           end: 'bottom top',
           scrub: true,
        }
     });

     tl.to(textRef.current, {
        scale: 1.5,
        opacity: 0,
        y: -100,
        ease: 'none'
     }, 0);

     tl.to(subtextRef.current, {
        opacity: 0,
        y: 50,
        ease: 'none'
     }, 0);

     tl.to('.hero-beans-container', {
        scale: 2,
        z: 100,
        ease: 'none'
     }, 0);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-[160vh] w-full bg-[#000000]">
      {/* Apple-Level Minimalist Background Ritual */}
      <div 
        className="absolute inset-0 z-0 opacity-100" 
        style={{
          background: 'radial-gradient(circle at center, rgba(90, 62, 43, 0.15) 0%, #000000 80%)'
        }}
      />
      
      {/* Stick the scene */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Cinematic 3D Engine (Minimalist recalibrated) */}
        <div className="hero-beans-container absolute inset-0 z-0">
          <Suspense fallback={null}>
            <Canvas 
              shadows
              gl={{ 
                antialias: true, 
                alpha: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                powerPreference: "high-performance"
              }} 
              camera={{ position: [0, 0, 12], fov: 26 }}
            >
              <BeanCluster />
              
              {/* Post-Processing Ritual (Cine-Lux Minimalism) */}
              <EffectComposer multisampling={4}>
                <Bloom 
                   luminanceThreshold={0.6} 
                   luminanceSmoothing={0.9} 
                   intensity={0.2} 
                   radius={0.7} 
                />
                <DepthOfField 
                   focusDistance={0.015} 
                   focalLength={0.035} 
                   bokehScale={5} 
                   height={480} 
                />
                <Vignette 
                   offset={0.4} 
                   darkness={0.8} 
                   eskil={false} 
                />
              </EffectComposer>
              
              <Preload all />
            </Canvas>
          </Suspense>
        </div>

        {/* Cinematic Narrative Mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60 z-[1]" />
        
        {/* Text Layer (Sun-Drenched Contrast Protocol) */}
        <div className="relative z-10 text-center px-6">
           <div ref={textRef} className="space-y-4">
              <span className="text-[#A67C52] font-mono text-[10px] uppercase tracking-[1.5em] block animate-pulse opacity-60">/ EST. 2021 ARCHIVE</span>
              <h1 className="text-5xl md:text-9xl font-serif font-black text-[#C68E5D] tracking-tighter leading-none uppercase italic parallax">
                 ASSAVA <br /> <span className="text-[#F5F5DC] font-light lowercase md:text-8xl">Collective</span>
              </h1>
           </div>
           
           <div ref={subtextRef} className="mt-20 flex flex-col md:flex-row items-center justify-center gap-12">
              <p className="text-lg md:text-xl text-[#F5F5DC]/70 italic font-serif max-w-sm parallax leading-relaxed">Every bean a ritual. <br /> Every cup a translation of terroir.</p>
              <div className="w-[1px] h-20 bg-[#C68E5D]/20 hidden md:block" />
              <button className="px-16 py-6 bg-[#1A120B] text-[#F5F5DC] border border-[#C68E5D]/20 rounded-full font-black uppercase tracking-[0.5em] text-[10px] shadow-2xl hover:bg-[#3B2A1E] hover:border-[#C68E5D] transition-all magnetic">
                 Explore Archive
              </button>
           </div>
        </div>

        {/* Scroll Ritual Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 opacity-30">
           <div className="w-[1px] h-20 bg-gradient-to-b from-[#C68E5D] to-transparent animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// --- Category Modal ---
export function CategoryModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const categories = [
    { name: "Single Origin", icon: "🌍", count: 24 },
    { name: "House Blends", icon: "🏠", count: 12 },
    { name: "Rare Finds", icon: "💎", count: 5 },
    { name: "Brewing Gear", icon: "⚖️", count: 18 },
    { name: "Coffee Spaces", icon: "🏢", count: 8 },
    { name: "Workshops", icon: "🎓", count: 4 },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-coffee-dark/90 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="relative glass w-full max-w-4xl rounded-[60px] p-12 glow-border overflow-hidden bg-white/5 border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]"
          >
            {/* Background Glow */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-caramel/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cream/5 rounded-full blur-[120px] pointer-events-none" />

            <button onClick={onClose} className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-full transition-all group z-20">
              <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500" />
            </button>

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <span className="text-caramel font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">Discovery</span>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-glow uppercase">Collections</h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map((cat, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="glass p-8 rounded-[40px] text-left group hover:glow-border transition-all bg-white/5 border-white/5 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-caramel/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-5xl mb-6 block drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500">{cat.icon}</span>
                    <h3 className="font-bold text-xl mb-2 group-hover:text-cream transition-colors tracking-tighter uppercase">{cat.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-cream/40 uppercase tracking-[0.3em] font-bold">{cat.count} Items</span>
                      <ChevronRight className="w-4 h-4 text-caramel opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// --- Cart Panel ---
export function CartPanel({ isOpen, onClose, items, onRemove, onUpdateQty }: { 
  isOpen: boolean, 
  onClose: () => void, 
  items: any[],
  onRemove: (id: string) => void,
  onUpdateQty: (id: string, delta: number) => void
}) {
  const subtotal = items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-coffee-dark/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.8 }}
            className="relative w-full max-w-md h-full glass border-l border-white/10 p-10 flex flex-col bg-coffee-dark/95 backdrop-blur-2xl shadow-[-50px_0_100px_rgba(0,0,0,0.5)]"
          >
            {/* Background Glow */}
            <div className="absolute top-1/4 -right-20 w-64 h-64 bg-caramel/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex items-center justify-between mb-12 relative z-10">
              <div>
                <span className="text-caramel font-mono text-[10px] uppercase tracking-[0.5em] mb-2 block font-bold">Your Ritual</span>
                <h2 className="text-4xl font-bold tracking-tighter uppercase">Cart</h2>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition-all group">
                <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar relative z-10">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-cream/20 space-y-6">
                  <div className="w-24 h-24 rounded-full glass flex items-center justify-center border-white/5">
                    <ShoppingCart className="w-10 h-10 opacity-20" />
                  </div>
                  <p className="uppercase tracking-[0.4em] text-[10px] font-bold">Your ritual is empty</p>
                </div>
              ) : (
                items.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 items-center group relative"
                  >
                    <div className="w-24 h-24 rounded-[32px] overflow-hidden glass border-white/10 group-hover:glow-border transition-all duration-500 flex-shrink-0">
                      <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-cream group-hover:text-cream transition-colors tracking-tight text-lg mb-1">{item.name}</h3>
                      <span className="text-caramel font-mono text-xs font-bold tracking-wider">${item.price.toFixed(2)}</span>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-3 glass px-3 py-1.5 rounded-full border-white/5">
                          <button 
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs hover:text-cream transition-all"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity || 1}</span>
                          <button 
                            onClick={() => onUpdateQty(item.id, 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs hover:text-cream transition-all"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="absolute top-0 right-0 p-2 text-cream/10 hover:text-destructive transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="mt-10 pt-10 border-t border-white/10 space-y-6 relative z-10">
                <div className="space-y-3">
                  <div className="flex justify-between text-cream/40 text-xs uppercase tracking-widest font-bold">
                    <span>Subtotal</span>
                    <span className="font-mono">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold tracking-tighter">
                    <span className="uppercase">Total</span>
                    <span className="text-cream font-mono">Rs{subtotal.toFixed(2)}</span>
                  </div>
                </div>
                <Link to="/thankyou" onClick={onClose} className="block">
                  <button className="w-full bg-caramel text-coffee-dark py-6 rounded-[32px] font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-caramel/90 transition-all shadow-[0_20px_40px_rgba(198,142,93,0.2)] hover:shadow-[0_20px_50px_rgba(198,142,93,0.3)] active:scale-[0.98]">
                    Complete Ritual
                  </button>
                </Link>
                <p className="text-center text-[8px] text-cream/20 uppercase tracking-[0.4em] font-bold">Secure Checkout Powered by Caffeina</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// --- Account Dashboard ---
export function AccountDashboard() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-coffee-dark pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Canvas gl={{ antialias: false, alpha: true, powerPreference: "low-power" }} camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]}>
          <CoffeeDust />
          <LiquidBlob />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 relative z-10">
        {/* Sidebar */}
        <div className="lg:w-80 space-y-4">
          <div className="mb-10">
            <span className="text-caramel font-mono text-xs uppercase tracking-[0.4em] mb-4 block font-bold">Member Portal</span>
            <h2 className="text-5xl font-bold tracking-tighter text-glow uppercase">Account</h2>
          </div>
          
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-4 px-8 py-5 rounded-3xl transition-all font-bold uppercase tracking-widest text-xs border border-white/5",
                activeTab === tab.id 
                  ? "bg-caramel text-coffee-dark shadow-[0_0_30px_rgba(198,142,93,0.3)]" 
                  : "glass text-cream/60 hover:text-cream hover:bg-white/5"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
          <button className="w-full flex items-center gap-4 px-8 py-5 rounded-3xl glass text-destructive hover:bg-destructive/10 transition-all font-bold uppercase tracking-widest text-xs mt-10 border border-destructive/20">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass rounded-[48px] p-12 glow-border bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl"
            >
              {activeTab === 'profile' && (
                <div className="space-y-12">
                  <div className="flex items-center gap-8">
                    <div className="w-32 h-32 rounded-full glass border-2 border-caramel p-1 relative group">
                      <img src="https://picsum.photos/seed/user/200/200" alt="avatar" loading="lazy" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-coffee-dark/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Settings className="w-6 h-6 text-cream" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold tracking-tighter uppercase mb-2">Ankit Kumar</h2>
                      <p className="text-cream font-mono text-sm">ankitkumar999090@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-cream/60 font-bold">Full Name</label>
                      <div className="glass px-8 py-5 rounded-2xl text-cream/80 border border-white/5">Ankit Kumar</div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-cream/60 font-bold">Member Since</label>
                      <div className="glass px-8 py-5 rounded-2xl text-cream/80 border border-white/5">March 2026</div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-cream/60 font-bold">Preferred Roast</label>
                      <div className="glass px-8 py-5 rounded-2xl text-cream border border-white/20 font-bold">Light-Medium</div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-cream/60 font-bold">Total Rituals</label>
                      <div className="glass px-8 py-5 rounded-2xl text-cream/80 border border-white/5">12 Brews</div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold mb-6 uppercase tracking-widest">Recent Orders</h3>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="glass p-8 rounded-[32px] flex items-center justify-between group hover:glow-border transition-all bg-white/5 border border-white/5">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-caramel/10 flex items-center justify-center border border-caramel/20">
                          <Package className="text-caramel w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg uppercase tracking-tight">Order #CF-928{i}</h4>
                          <p className="text-xs text-cream/40 uppercase tracking-widest">Delivered on March {20 + i}, 2026</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <span className="block font-mono text-cream text-xl font-bold">$84.00</span>
                          <span className="text-[10px] text-cream/20 uppercase font-bold">3 Items</span>
                        </div>
                        <Link to="/tracking" className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:bg-caramel group-hover:text-coffee-dark transition-all">
                          <ChevronRight className="w-6 h-6" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'settings' && (
                <div className="space-y-8">
                  <h3 className="text-xl font-bold mb-6 uppercase tracking-widest">Preferences</h3>
                  <div className="flex items-center justify-between p-8 glass rounded-[32px] bg-white/5 border border-white/5">
                    <div>
                      <h4 className="font-bold text-lg">Email Notifications</h4>
                      <p className="text-sm text-cream/40">Receive updates about new roasts and rare finds</p>
                    </div>
                    <div className="w-14 h-7 bg-caramel rounded-full relative p-1 cursor-pointer shadow-[0_0_20px_rgba(198,142,93,0.3)]">
                      <div className="w-5 h-5 bg-coffee-dark rounded-full absolute right-1" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-8 glass rounded-[32px] bg-white/5 border border-white/5">
                    <div>
                      <h4 className="font-bold text-lg">Two-Factor Authentication</h4>
                      <p className="text-sm text-cream/40">Secure your account with biometric verification</p>
                    </div>
                    <div className="w-14 h-7 bg-white/10 rounded-full relative p-1 cursor-pointer">
                      <div className="w-5 h-5 bg-cream/20 rounded-full absolute left-1" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-8 glass rounded-[32px] bg-white/5 border border-white/5">
                    <div>
                      <h4 className="font-bold text-lg">Privacy Mode</h4>
                      <p className="text-sm text-cream/40">Hide your brewing history from the community</p>
                    </div>
                    <div className="w-14 h-7 bg-white/10 rounded-full relative p-1 cursor-pointer">
                      <div className="w-5 h-5 bg-cream/20 rounded-full absolute left-1" />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// --- Card Component ---
export function CoffeeCard({ title, location, rating, image, price, oldPrice, tag, description, id = "1", onAddToCart, onToggleWishlist, isWishlisted }: any) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.04, boxShadow: "0px 10px 30px rgba(198,142,93,0.4)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass rounded-[40px] overflow-hidden group cursor-pointer relative glow-border-hover z-0"
    >
      <Link to={`/coffeeDetail/${id}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-coffee-dark/20">
          {!isImageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-coffee-dark via-coffee-dark/40 to-coffee-dark flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-2 border-caramel/20 border-t-caramel animate-spin" />
            </div>
          )}
          <img 
            src={image} 
            alt={title} 
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
            className={cn(
              "w-full h-full object-cover transition-all duration-1000",
              isImageLoaded ? "opacity-100 scale-100 group-hover:scale-110" : "opacity-0 scale-110"
            )}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 card-gradient" />
          
          {/* Tag */}
          <div className="absolute top-6 left-6">
            <div className="glass px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-cream glow-border bg-coffee-dark/40 backdrop-blur-md">
              {tag || "Premium"}
            </div>
          </div>

          <div className="absolute top-6 right-6 flex items-center gap-2">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleWishlist && onToggleWishlist({ id, title, price, image, location, rating, description });
              }}
              className={cn(
                "glass p-2 rounded-full transition-all duration-300 hover:scale-110",
                isWishlisted ? "bg-caramel text-coffee-dark" : "hover:bg-white/10"
              )}
            >
              <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
            </button>
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold glow-border">
              <Star className="w-3 h-3 text-gold fill-gold" />
              <span>{rating}</span>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-8">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/coffeeDetail/${id}`}>
            <h3 className="text-2xl font-bold text-cream group-hover:text-cream transition-colors tracking-tighter uppercase">
              {title}
            </h3>
          </Link>
          <div className="flex flex-col items-end">
            <span className="text-gold font-bold text-xl">{price}</span>
            {oldPrice && (
              <span className="text-cream/30 text-xs line-through">{oldPrice}</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-cream/60 text-sm mb-4">
          <MapPin className="w-4 h-4 text-caramel" />
          <span>{location}</span>
        </div>

        <p className="text-cream/70 text-xs line-clamp-2 mb-6 leading-relaxed italic">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-coffee-dark overflow-hidden glass">
                <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="user" loading="lazy" referrerPolicy="no-referrer" />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-coffee-dark bg-espresso flex items-center justify-center text-[10px] font-bold text-cream/40">
              +12
            </div>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              onAddToCart && onAddToCart({ id, title, price, image });
            }}
            className="px-6 py-3 rounded-full bg-caramel text-coffee-dark font-bold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(198,142,93,0.3)] hover:opacity-90 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// --- Search Page ---
export function SearchPage({ onOpenCart, onOpenCategories, cartCount, wishlistCount, onAddToCart, onToggleWishlist, wishlist }: { onOpenCart: () => void, onOpenCategories: () => void, cartCount: number, wishlistCount: number, onAddToCart: (item: any) => void, onToggleWishlist: (item: any) => void, wishlist: any[] }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const results = PRODUCTS.slice(0, 3);

  return (
    <div className="min-h-screen bg-coffee-dark pt-32 pb-20 px-6 relative overflow-hidden">
      <Navbar onOpenCart={onOpenCart} onOpenCategories={onOpenCategories} cartCount={cartCount} wishlistCount={wishlistCount} />
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Canvas gl={{ antialias: false, alpha: true, powerPreference: "low-power" }} camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]}>
          <CoffeeDust />
          <LiquidBlob />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-caramel font-mono text-xs uppercase tracking-[0.4em] mb-6 block font-bold">Discovery</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-glow uppercase">Search Results</h2>
          </motion.div>
          
          <button className="glass px-8 py-4 rounded-full flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:glow-border transition-all bg-white/5 backdrop-blur-xl border border-white/10">
            <Filter className="w-4 h-4 text-caramel" /> 
            <span>Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="glass h-[500px] rounded-[40px] animate-pulse bg-white/5 border border-white/10" />
            ))
          ) : (
            results.map((item, index) => (
              <CoffeeCard 
                key={index} 
                {...item} 
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.some(i => i.id === item.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// --- Shopping Page ---
// --- Tilt Wrapper ---
export function TiltWrapper({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX: rotate.x,
        rotateY: rotate.y,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --- Showcase Card ---
export function ShowcaseCard({ item, onAddToCart, onToggleWishlist, isWishlisted }: { item: any, onAddToCart: (item: any) => void, onToggleWishlist?: (item: any) => void, isWishlisted?: boolean }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        perspective: 1500,
        rotateX: rotate.x,
        rotateY: rotate.y,
      }}
      className="relative group cursor-pointer"
    >
      <Link to={`/coffeeDetail/${item.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-[50px] bg-coffee-dark border border-white/5 transition-all duration-700 group-hover:glow-border group-hover:-translate-y-6 shadow-[0_30px_60px_rgba(0,0,0,0.5)] group-hover:shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
          {/* Wishlist Button */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleWishlist && onToggleWishlist(item);
            }}
            className={cn(
              "absolute top-8 right-8 z-20 glass p-3 rounded-full transition-all duration-300 hover:scale-110",
              isWishlisted ? "bg-caramel text-coffee-dark" : "hover:bg-white/10 opacity-0 group-hover:opacity-100"
            )}
          >
            <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
          </button>
          {/* Image */}
          {!isImageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-coffee-dark via-coffee-dark/40 to-coffee-dark flex items-center justify-center z-10">
              <div className="w-16 h-16 rounded-full border-2 border-caramel/20 border-t-caramel animate-spin" />
            </div>
          )}
          <motion.img
            src={item.image}
            alt={item.name}
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
            className={cn(
              "w-full h-full object-cover transition-all duration-1000",
              isImageLoaded ? "opacity-100 scale-100 group-hover:scale-110 group-hover:opacity-40" : "opacity-0 scale-110"
            )}
            referrerPolicy="no-referrer"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 card-gradient opacity-70 group-hover:opacity-95 transition-opacity duration-700" />
          
          {/* Content */}
          <div className="absolute inset-0 p-12 flex flex-col justify-end">
            <motion.div
              className="space-y-6"
            >
              <div className="flex justify-between items-end gap-4 w-full">
                <div className="flex-1 min-w-0">
                  <span className="text-cream font-mono text-[9px] uppercase tracking-[0.5em] mb-4 block font-bold opacity-60 group-hover:opacity-100 transition-opacity">
                    {item.profile?.origin} / {item.profile?.roast}
                  </span>
                  <h3 className="text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tighter text-white group-hover:text-cream transition-colors duration-500 uppercase leading-[0.9] break-words">
                    {item.name}
                  </h3>
                  <div className="text-[10px] text-caramel uppercase tracking-widest font-bold mt-4 inline-block hover:text-white transition-colors">
                    View Details
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-2xl md:text-3xl font-bold text-caramel font-mono tracking-tighter block drop-shadow-md pb-1">Rs{item.price.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 pt-2 space-y-8">
                <p className="text-cream/50 text-sm leading-relaxed font-light italic">
                  "{item.description}"
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.flavorNotes?.slice(0, 3).map((note: string, i: number) => (
                    <span key={i} className="text-[8px] uppercase tracking-widest px-3 py-1 rounded-full glass border-white/5 text-cream/60">{note}</span>
                  ))}
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    onAddToCart(item);
                  }}
                  className="w-full py-6 bg-caramel text-coffee-dark rounded-3xl text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-caramel/90 transition-all duration-500 shadow-[0_0_40px_rgba(198,142,93,0.2)]"
                >
                  Add to Collection
                </button>
              </div>
            </motion.div>
          </div>
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );
}

export function ShoppingPage({ onAddToCart, onToggleWishlist, wishlist }: { onAddToCart: (item: any) => void, onToggleWishlist: (item: any) => void, wishlist: any[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLocation, setActiveLocation] = useState('All');
  const [activeTime, setActiveTime] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = ['All', 'Instant', 'Brew', 'Espresso', 'Special Reserve', 'Artisan'];
  const locations = ['All', 'home', 'office', 'cafe'];
  const times = ['All', 'quick', 'medium', 'slow'];

  // Smart combined search logic
  const filteredItems = useMemo(() => {
    return PRODUCTS.filter(item => {
      // 1. Basic Category Filter
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesLocationChip = activeLocation === 'All' || item.location === activeLocation;
      const matchesTimeChip = activeTime === 'All' || item.prepTime === activeTime;

      // 2. Smart Search Query Parsing
      const query = searchQuery.toLowerCase().trim();
      const queryWords = query.split(/\s+/);
      
      let matchesSearch = true;
      if (query) {
        matchesSearch = queryWords.every(word => {
          // Check name, description, category
          if (item.name.toLowerCase().includes(word)) return true;
          if (item.description.toLowerCase().includes(word)) return true;
          if (item.category.toLowerCase().includes(word)) return true;
          
          // Check flavor notes
          if (item.flavorNotes?.some(note => note.toLowerCase().includes(word))) return true;
          
          // Check location keywords
          if (item.location?.toLowerCase().includes(word)) return true;
          
          // Check time keywords
          if (word === 'quick' || word === 'fast') return item.prepTime === 'quick';
          if (word === 'medium') return item.prepTime === 'medium';
          if (word === 'slow' || word === 'manual') return item.prepTime === 'slow';
          
          return false;
        });
      }

      return matchesCategory && matchesLocationChip && matchesTimeChip && matchesSearch;
    });
  }, [activeCategory, activeLocation, activeTime, searchQuery]);

  return (
    <div className="min-h-screen bg-coffee-dark pt-40 pb-32 px-6 relative">
      {/* Background Grain & Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        <Canvas gl={{ alpha: true }} camera={{ position: [0, 0, 5] }}>
          <CoffeeDust count={100} />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-cream font-mono text-xs uppercase tracking-[0.5em] mb-6 block font-bold"
            >
              Search Result: {filteredItems.length} Blends
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[0.9] mb-8"
            >
              Smart Discovery. <br />
              <span className="text-caramel italic serif lowercase">Personalized Ritual.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-cream/70 text-xl font-light max-w-lg"
            >
              Try: "fruity coffee for office", "quick chocolate coffee", or "slow brew premium".
            </motion.p>
          </div>

          <div className="w-full lg:w-auto space-y-8">
            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/30 group-focus-within:text-cream transition-colors" />
              <input 
                type="text"
                placeholder="Search by flavour, location, or vibe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full lg:w-[500px] bg-white/5 border border-white/10 rounded-full py-5 pl-16 pr-8 text-sm text-cream focus:glow-border outline-none transition-all placeholder:text-cream/20 shadow-2xl"
              />
            </div>

            {/* Filter Facets Grid */}
            <div className="flex flex-col gap-4">
               {/* Category Chips */}
               <div className="flex flex-wrap gap-2">
                 {categories.map((cat) => (
                   <button
                     key={cat}
                     onClick={() => setActiveCategory(cat)}
                     className={cn(
                       "px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all duration-300",
                       activeCategory === cat ? "bg-caramel text-coffee-dark" : "glass text-cream/30 hover:text-cream/60"
                     )}
                   >
                     {cat}
                   </button>
                 ))}
               </div>
               
               <div className="flex flex-wrap gap-4">
                  {/* Location Chips */}
                  <div className="flex gap-2 items-center bg-white/5 p-1 rounded-full border border-white/5">
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => setActiveLocation(loc)}
                        className={cn(
                          "px-4 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-widest transition-all",
                          activeLocation === loc ? "bg-cream/10 text-cream" : "text-cream/20 hover:text-cream/40"
                        )}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>

                  {/* Time Chips */}
                  <div className="flex gap-2 items-center bg-white/5 p-1 rounded-full border border-white/5">
                    {times.map((time) => (
                      <button
                        key={time}
                        onClick={() => setActiveTime(time)}
                        className={cn(
                          "px-4 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-widest transition-all",
                          activeTime === time ? "bg-cream/10 text-cream" : "text-cream/20 hover:text-cream/40"
                        )}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <ShowcaseCard 
                  item={item} 
                  onAddToCart={onAddToCart} 
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlist.some(i => i.id === item.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredItems.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-40 text-center"
          >
            <p className="text-cream/20 font-mono text-sm uppercase tracking-[0.5em]">No blends found in this collection</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}


// --- FAQ Accordion Component ---
function FAQAccordion({ items }: { items: { question: string, answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="glass rounded-[32px] overflow-hidden border border-white/5 bg-white/2 backdrop-blur-3xl">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full px-8 py-6 flex items-center justify-between text-left group"
          >
            <span className="text-lg font-bold tracking-tight text-cream/90 group-hover:text-cream transition-colors">{item.question}</span>
            <ChevronDown className={cn("w-5 h-5 text-caramel transition-transform duration-500", openIndex === idx ? "rotate-180" : "")} />
          </button>
          <AnimatePresence>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="px-8 pb-8 text-cream/50 leading-relaxed font-light">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// --- Coffee Detail Page ---
export function CoffeeDetailPage({ onAddToCart, onToggleWishlist, wishlist }: { onAddToCart: (item: any) => void, onToggleWishlist: (item: any) => void, wishlist: any[] }) {
  const { id } = useParams();
  const item = PRODUCTS.find(l => l.id === id) || PRODUCTS[0];
  const [activeImage, setActiveImage] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const images = item.images || [item.image];

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + images.length) % images.length);

  const averageRating = 4.8;
  const ratingDistribution = [85, 10, 3, 2, 0]; // 5 stars to 1 star percentage

  return (
    <div className="min-h-screen bg-coffee-dark pt-32 pb-20 px-6 relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Canvas gl={{ antialias: false, alpha: true, powerPreference: "low-power" }} camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]}>
          <CoffeeDust />
          <LiquidBlob />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-32">
        {/* --- SECTION 1: HERO SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Hero Image Section */}
          <div className="lg:sticky lg:top-32 h-fit space-y-8">
            <div className="relative h-[500px] md:h-[600px] glass rounded-[60px] overflow-hidden group shadow-2xl bg-white/5 border border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  {!isImageLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-white/5 flex items-center justify-center z-10">
                       <div className="w-16 h-16 rounded-full border-2 border-caramel/20 border-t-caramel animate-spin" />
                    </div>
                  )}
                  <img 
                    src={images[activeImage]} 
                    alt={item.name}
                    loading="lazy"
                    onLoad={() => setIsImageLoaded(true)}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 card-gradient opacity-40" />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              {images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
                  <button 
                    onClick={(e) => { e.preventDefault(); prevImage(); }}
                    className="pointer-events-auto p-4 rounded-full glass hover:bg-caramel hover:text-coffee-dark transition-all duration-300 -translate-x-20 group-hover:translate-x-0 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={(e) => { e.preventDefault(); nextImage(); }}
                    className="pointer-events-auto p-4 rounded-full glass hover:bg-caramel hover:text-coffee-dark transition-all duration-300 translate-x-20 group-hover:translate-x-0 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}

              {/* Exclusive Badge */}
              <div className="absolute top-10 left-10 glass px-6 py-3 rounded-full border-white/10 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-caramel animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-cream">Reserve Batch</span>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex gap-4 justify-center py-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setActiveImage(idx); setIsImageLoaded(false); }}
                    className={cn(
                      "w-20 h-20 rounded-2xl overflow-hidden glass transition-all duration-500 border-2",
                      activeImage === idx ? "border-caramel scale-110 shadow-lg" : "border-transparent opacity-40 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- HERO CONTENT SECTION --- */}
          <div className="flex flex-col justify-center space-y-12 py-10">
            <div className="space-y-6">
              <span className="text-caramel font-mono text-[10px] uppercase tracking-[0.8em] font-bold">The Ultimate extraction</span>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-glow uppercase">{item.name}</h1>
              
              <div className="flex items-center gap-6">
                <div className="flex gap-1 text-caramel">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current fill-caramel text-caramel" />)}
                </div>
                <span className="text-cream text-lg font-bold">{item.rating || 4.9}</span>
                <span className="text-cream/30 text-xs font-bold uppercase tracking-widest">({item.reviews || 128} Reviews)</span>
              </div>

              <div className="flex items-end gap-6 pt-4">
                <span className="text-7xl font-bold text-cream font-mono tracking-tighter leading-none">Rs{item.price.toFixed(2)}</span>
              </div>

              <p className="text-xl text-cream/50 leading-relaxed font-light italic font-serif max-w-xl">"{item.description}"</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <motion.button 
                onClick={() => onAddToCart(item)}
                className="px-16 py-8 bg-caramel text-coffee-dark rounded-full font-bold uppercase tracking-[0.4em] text-sm shadow-[0_20px_50px_rgba(198,142,93,0.3)]"
              >
                Initiate Ritual
              </motion.button>
              <motion.button 
                onClick={() => onToggleWishlist(item)}
                className={cn("px-10 py-8 rounded-full border transition-all font-bold uppercase tracking-[0.4em] text-[10px]", wishlist.some(i => i.id === item.id) ? "bg-caramel text-coffee-dark border-caramel shadow-xl" : "glass border-white/10 text-cream")}
              >
                {wishlist.some(i => i.id === item.id) ? "Saved to Sanctuary" : "Save to Sanctuary"}
              </motion.button>
            </div>

            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/5">
              <div className="space-y-2">
                <span className="text-[10px] text-cream/30 font-bold uppercase tracking-widest">Roast Level</span>
                <span className="text-sm font-bold text-cream">{item.productDetails?.roastLevel || item.profile?.roast}</span>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] text-cream/30 font-bold uppercase tracking-widest">Weight</span>
                <span className="text-sm font-bold text-cream">{item.productDetails?.weight || "250g"}</span>
              </div>
            </div>
            
            <div className="pt-8">
              <ScrollIndicator text="Discover the Soul" onClick={() => window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' })} />
            </div>
          </div>
        </div>

        {/* --- SECTION 2: ELEMENTS (COFFEE DETAILS) --- */}
        <section className="space-y-40">
          <div className="text-center space-y-4">
            <span className="text-caramel font-mono text-[10px] uppercase tracking-[0.8em] font-bold">The Anatomy</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">The Elements</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {(item.coffeeDetails || COFFEE_VARIANTS).map((v, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="glass rounded-[60px] p-12 border border-white/5 grid md:grid-cols-[200px_1fr] gap-12 hover:glow-border transition-all duration-700 bg-white/2 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5"><Coffee className="w-32 h-32 rotate-12" /></div>
                <div className="aspect-square rounded-[40px] overflow-hidden glass border border-white/10">
                  <img src={'image' in v && v.image ? v.image : item.image} alt={v.title} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-8">
                  <div>
                    <span className="text-caramel font-mono text-[10px] uppercase tracking-widest font-bold block mb-2">{v.origin}</span>
                    <h3 className="text-4xl font-bold tracking-tight uppercase">{v.title}</h3>
                  </div>
                  <p className="text-cream/50 text-sm leading-relaxed italic">"{v.description}"</p>
                  <div className="flex flex-wrap gap-2">
                    {('notes' in v ? v.notes : (v as any).flavorNotes).map((n: string, idx: number) => (
                      <span key={idx} className="px-4 py-2 rounded-full glass border-white/5 text-[9px] font-bold uppercase tracking-widest text-cream/40">{n}</span>
                    ))}
                  </div>
                  <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4 text-[10px] font-bold uppercase tracking-widest">
                     <div><span className="text-cream/20 block mb-1">Process</span><span className="text-cream">{'process' in v ? v.process : (v as any).processing}</span></div>
                     <div><span className="text-cream/20 block mb-1">Roast</span><span className="text-cream">{'roast' in v ? v.roast : (v as any).roastLevel}</span></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- SECTION 3: STORY --- */}
        {item.story && (
          <section className="relative h-[80vh] flex items-center justify-center rounded-[80px] overflow-hidden glass border border-white/10">
            <div className="absolute inset-0">
               <img src={item.images?.[2] || item.image} className="w-full h-full object-cover opacity-20 scale-110" />
               <div className="absolute inset-0 bg-gradient-to-b from-coffee-dark via-transparent to-coffee-dark" />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12 px-6">
              <span className="text-caramel font-mono text-[10px] uppercase tracking-[0.8em] font-bold">The Origin Narrative</span>
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none">{item.story.title}</h2>
              <p className="text-2xl md:text-3xl text-cream/60 font-light italic leading-relaxed font-serif max-w-3xl mx-auto">
                "{item.story.description}"
              </p>
              <div className="w-[1px] h-24 bg-gradient-to-b from-caramel to-transparent mx-auto" />
            </div>
          </section>
        )}

        {/* --- SECTION 4: FLAVOR & BREWING --- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <div className="space-y-4"><span className="text-caramel font-mono text-[10px] uppercase tracking-[0.5em] font-bold">Sensory Profile</span><h2 className="text-5xl font-bold uppercase tracking-tighter">Flavor Matrix</h2></div>
            <div className="flex flex-wrap gap-6">
              {(item.flavorNotes || []).map((note, i) => (
                <motion.div key={i} whileInView={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.9 }} className="px-10 py-6 rounded-full glass border border-white/5 hover:border-caramel/30 transition-all cursor-default text-sm font-bold uppercase tracking-[0.3em] text-cream/70">{note}</motion.div>
              ))}
            </div>
          </div>
          <div className="space-y-12">
            <div className="space-y-4 text-right lg:text-left"><span className="text-caramel font-mono text-[10px] uppercase tracking-[0.5em] font-bold">The Extraction</span><h2 className="text-5xl font-bold uppercase tracking-tighter">Brewing Guide</h2></div>
            <div className="grid grid-cols-1 gap-4">
              {(item.brewingGuide || [ { method: "V60", grind: "Medium", time: "3:00 min" } ]).map((g, i) => (
                <div key={i} className="glass p-8 rounded-[32px] border border-white/5 flex items-center justify-between hover:bg-white/2 transition-colors">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-caramel"><Settings className="w-5 h-5" /></div>
                    <div><h4 className="text-xl font-bold uppercase tracking-tight">{g.method}</h4><span className="text-[10px] text-cream/30 uppercase font-bold tracking-widest">{g.grind} Grind</span></div>
                  </div>
                  <span className="text-2xl font-mono font-bold text-caramel">{g.time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 5: REVIEWS --- */}
        <section className="space-y-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="space-y-4"><span className="text-caramel font-mono text-[10px] uppercase tracking-[0.5em] font-bold">Archive</span><h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none">Customer <br /> Chronicles</h2></div>
            <div className="flex items-center gap-6 pb-2">
               <span className="text-6xl font-bold text-cream leading-none">{averageRating}</span>
               <div className="space-y-2"><div className="flex gap-1 text-caramel">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current fill-caramel text-caramel" />)}</div><span className="text-[10px] text-cream/30 uppercase font-bold tracking-widest">({item.reviews || 128} Cuppings)</span></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(item.productReviews || REVIEWS.slice(0, 3)).map((r, i) => (
              <div key={i} className="glass p-10 rounded-[48px] border border-white/5 space-y-8 bg-white/2 hover:glow-border transition-all duration-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden glass border border-white/10"><img src={'userImage' in r ? (r as any).userImage : '/default-user.jpg'} alt={r.userName} className="w-full h-full object-cover" /></div>
                    <div><h4 className="text-lg font-bold text-cream">{r.userName}</h4><span className="text-[9px] text-cream/30 uppercase tracking-widest">{r.date || 'April 2026'}</span></div>
                  </div>
                  <div className="flex gap-0.5 text-caramel">{[...Array(5)].map((_, idx) => <Star key={idx} className={cn("w-3 h-3 text-caramel fill-caramel", idx < r.rating ? "fill-current" : "opacity-10")} />)}</div>
                </div>
                <p className="text-cream/50 text-lg leading-relaxed italic font-light">"{r.text}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 6: FAQ --- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-start">
          <div className="space-y-8 lg:sticky lg:top-40">
            <span className="text-caramel font-mono text-[10px] uppercase tracking-[0.5em] font-bold">Support Base</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-tight">Query <br /> Resolution</h2>
            <p className="text-xl text-cream/40 leading-relaxed font-light italic font-serif">"Precision requires clarity. Find answers to the most nuanced aspects of the Assava ritual."</p>
          </div>
          <div className="lg:col-span-1"><FAQAccordion items={item.faqs || PRODUCT_FAQS} /></div>
        </section>

        {/* --- SECTION 7: CTA --- */}
        <section className="text-center py-40 relative px-6 glass rounded-[80px] border border-white/5 overflow-hidden">
           <div className="absolute inset-0 opacity-[0.02] -rotate-12 translate-x-20 scale-150 pointer-events-none"><span className="text-[400px] font-black uppercase tracking-tighter select-none">ASV</span></div>
           <div className="relative z-10 space-y-16">
              <h2 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase leading-none">The Ritual Awaits</h2>
              <div className="flex flex-col sm:flex-row gap-12 justify-center items-center">
                 <button onClick={() => onAddToCart(item)} className="px-20 py-10 bg-caramel text-coffee-dark rounded-full font-bold uppercase tracking-[0.6em] text-sm shadow-2xl hover:scale-105 transition-all">Secure Batch</button>
                 <Link to="/shopping" className="text-cream/40 hover:text-caramel transition-colors text-xs font-bold uppercase tracking-[0.5em] border-b border-white/10 pb-2">View Full Collection</Link>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
}


// --- Thank You Page ---
export function ThankYouPage({ onOpenCart, onOpenCategories, cartCount, wishlistCount }: { onOpenCart: () => void, onOpenCategories: () => void, cartCount: number, wishlistCount?: number }) {
  return (
    <div className="min-h-screen bg-coffee-dark flex items-center justify-center text-center px-6 relative overflow-hidden">
      <Navbar onOpenCart={onOpenCart} onOpenCategories={onOpenCategories} cartCount={cartCount} wishlistCount={wishlistCount} />
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Canvas gl={{ antialias: false, alpha: true, powerPreference: "low-power" }} camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]}>
          <CoffeeDust />
          <LiquidBlob />
        </Canvas>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl relative z-10 glass p-16 rounded-[60px] border border-white/10 shadow-2xl backdrop-blur-3xl"
      >
        <div className="relative w-48 h-48 mx-auto mb-12">
          <Canvas gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 5] }} dpr={[1, 2]}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#FFD700" />
              <CoffeeBean position={[0, 0, 0]} rotation={[0, 0, 0]} scale={2} />
              <CoffeeSteam count={20} />
            </Suspense>
          </Canvas>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute inset-0 bg-cream/10 rounded-full blur-3xl"
          />
        </div>

        <span className="text-caramel font-mono text-xs uppercase tracking-[0.5em] mb-6 block font-bold">Ritual Confirmed</span>
        <h1 className="text-6xl font-bold tracking-tighter text-glow mb-8 uppercase">Thank You</h1>
        <p className="text-xl text-cream/60 mb-12 leading-relaxed italic font-serif">
          "Your selection has been secured. Our master roasters are now preparing your beans for the ultimate extraction."
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link to="/tracking">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-caramel text-coffee-dark rounded-full font-bold uppercase tracking-widest text-xs shadow-lg"
            >
              Track Shipment
            </motion.button>
          </Link>
          <Link to="/shopping">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 glass text-cream rounded-full font-bold uppercase tracking-widest text-xs border border-white/10 hover:bg-white/5"
            >
              Back to Collection
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

// --- Order History Page ---
export function OrderHistoryPage({ onOpenCart, onOpenCategories, cartCount, wishlistCount }: { onOpenCart: () => void, onOpenCategories: () => void, cartCount: number, wishlistCount?: number }) {
  return (
    <div className="min-h-screen bg-coffee-dark pt-32 pb-20 px-6 relative overflow-hidden">
      <Navbar onOpenCart={onOpenCart} onOpenCategories={onOpenCategories} cartCount={cartCount} wishlistCount={wishlistCount} />
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Canvas gl={{ antialias: false, alpha: true, powerPreference: "low-power" }} camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]}>
          <CoffeeDust />
          <LiquidBlob />
        </Canvas>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <span className="text-caramel font-mono text-xs uppercase tracking-[0.4em] mb-6 block font-bold">Archive</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-glow uppercase">Order History</h2>
        </div>

        <div className="space-y-8">
          {[1, 2, 3, 4].map(i => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 rounded-[48px] border border-white/5 hover:glow-border-hover transition-all bg-white/5 backdrop-blur-3xl group"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 rounded-3xl bg-caramel/10 flex items-center justify-center border border-caramel/20">
                    <Package className="text-caramel w-10 h-10" />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <h4 className="text-2xl font-bold uppercase tracking-tight">Order #CF-928{i}</h4>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-cream text-[10px] font-bold uppercase tracking-widest border border-white/20">Delivered</span>
                    </div>
                    <p className="text-sm text-cream/50 uppercase tracking-widest font-bold">March {20 + i}, 2026 • 3 Items</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-10 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right">
                    <span className="block font-mono text-cream text-3xl font-bold">$84.00</span>
                    <span className="text-[10px] text-cream/50 uppercase font-bold">Total Ritual Cost</span>
                  </div>
                  <Link to="/tracking" className="px-8 py-4 rounded-full glass text-xs font-bold uppercase tracking-widest hover:bg-caramel hover:text-coffee-dark transition-all border border-white/10">
                    Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Tracking Page ---
export function TrackingPage({ onOpenCart, onOpenCategories, cartCount, wishlistCount }: { onOpenCart: () => void, onOpenCategories: () => void, cartCount: number, wishlistCount?: number }) {
  const steps = [
    { label: "Order Placed", date: "Mar 24, 10:30 AM", status: "completed" },
    { label: "Master Roasting", date: "Mar 24, 02:15 PM", status: "completed" },
    { label: "Quality Control", date: "Mar 25, 09:00 AM", status: "current" },
    { label: "In Transit", date: "Expected Mar 26", status: "pending" },
    { label: "Delivered", date: "Expected Mar 27", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-coffee-dark pt-32 pb-20 px-6 relative overflow-hidden">
      <Navbar onOpenCart={onOpenCart} onOpenCategories={onOpenCategories} cartCount={cartCount} wishlistCount={wishlistCount} />
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Canvas gl={{ antialias: false, alpha: true, powerPreference: "low-power" }} camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]}>
          <CoffeeDust />
          <LiquidBlob />
        </Canvas>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <span className="text-caramel font-mono text-xs uppercase tracking-[0.4em] mb-6 block font-bold">Real-time Logistics</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-glow uppercase">Track Ritual</h2>
        </div>

        <div className="glass p-12 rounded-[60px] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 pb-10 border-b border-white/5 gap-6">
            <div>
              <h3 className="text-3xl font-bold tracking-tighter uppercase mb-2">Order #CF-9284</h3>
              <p className="text-cream/40 text-sm uppercase tracking-widest font-bold">Estimated Delivery: March 27, 2026</p>
            </div>
            <div className="px-6 py-3 rounded-full bg-caramel/10 text-caramel text-xs font-bold uppercase tracking-widest border border-caramel/20">
              In Progress
            </div>
          </div>

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-white/5 rounded-full md:left-1/2 md:-translate-x-1/2" />
            
            <div className="space-y-12">
              {steps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    "relative flex items-center gap-8 md:gap-0",
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  <div className="flex-1 hidden md:block" />
                  
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center z-10 relative shadow-[0_0_20px_rgba(0,0,0,0.5)]",
                    step.status === 'completed' ? "bg-caramel text-coffee-dark" : 
                    step.status === 'current' ? "bg-cream text-coffee-dark animate-pulse" : "bg-white/10 text-cream/20"
                  )}>
                    {step.status === 'completed' ? <Check className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                  </div>

                  <div className={cn(
                    "flex-1 glass p-8 rounded-[32px] border border-white/5 hover:glow-border transition-all bg-white/5",
                    i % 2 === 0 ? "md:ml-12" : "md:mr-12"
                  )}>
                    <h4 className={cn(
                      "text-xl font-bold uppercase tracking-tight mb-1",
                      step.status === 'pending' ? "text-cream/20" : "text-cream"
                    )}>
                      {step.label}
                    </h4>
                    <p className="text-xs text-cream/40 uppercase tracking-widest font-bold">{step.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Loading Screen ---
export function LoadingScreen() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-coffee-dark flex flex-col items-center justify-center"
    >
      <div className="relative w-40 h-40 mb-8">
        {/* Steam Particles */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-2">
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              animate={{ 
                y: [-10, -40], 
                opacity: [0, 0.5, 0],
                scale: [0.5, 1.5]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                delay: i * 0.4,
                ease: "easeOut"
              }}
              className="w-2 h-8 bg-cream/20 rounded-full blur-sm"
            />
          ))}
        </div>

        {/* Cup Body */}
        <div className="absolute inset-0 border-4 border-caramel rounded-b-[40px] rounded-t-lg overflow-hidden">
          {/* Liquid Filling */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "20%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 bg-espresso"
          >
            {/* Liquid Surface Waves */}
            <motion.div
              animate={{ x: ["-10%", "10%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatType: "mirror" }}
              className="absolute -top-2 left-0 w-[120%] h-4 bg-caramel/30 blur-sm"
            />
          </motion.div>
        </div>
        
        {/* Cup Handle */}
        <div className="absolute top-1/2 -right-8 -translate-y-1/2 w-10 h-16 border-4 border-caramel rounded-r-full" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold tracking-tighter text-cream mb-2 uppercase tracking-[0.3em]">Brewing Ritual</h2>
        <div className="flex gap-1 justify-center">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
              className="w-1.5 h-1.5 bg-caramel rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- Category Card Sub-component ---
function CategoryCard({ cat, i }: { cat: any, i: number }) {
  return (
    <Link to={`/category/${cat.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="group relative h-[450px] md:h-[500px] rounded-[40px] overflow-hidden cursor-pointer bg-coffee-dark border border-white/5 h-full"
      >
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.img 
          src={cat.image} 
          alt={cat.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark via-coffee-dark/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-10 flex flex-col justify-end">
        <div className="relative z-10 transition-transform duration-700 group-hover:-translate-y-2">
          <div className="overflow-hidden h-6 mb-2">
            <motion.span 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-[10px] text-caramel uppercase tracking-[0.5em] font-bold block"
            >
              {cat.count} Artifacts
            </motion.span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tighter uppercase leading-none transition-all group-hover:text-glow">
            {cat.name}
          </h3>
          
          <p className="text-cream/50 text-sm font-light leading-relaxed max-w-[90%] line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 italic">
            {cat.desc}
          </p>
          
          <div className="mt-8 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
            <span className="text-[9px] uppercase tracking-[0.4em] text-white font-bold">Discover Collection</span>
            <div className="h-[1px] w-12 bg-caramel/50 group-hover:w-20 transition-all duration-700" />
          </div>
        </div>
      </div>

      {/* Soft Glow */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-caramel/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      </motion.div>
    </Link>
  );
}

// --- Category Page ---
export function CategoryPage({ onOpenCart, onOpenCategories, cartCount, wishlistCount }: { onOpenCart: () => void, onOpenCategories: () => void, cartCount: number, wishlistCount?: number }) {
  const categories = [
    { 
      id: "single-origin",
      name: "Single Origin", 
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000",
      count: 24, 
      desc: "An unapologetic exploration of terroir. Pure essence captured from the world's most distinct micro-climates."
    },
    { 
      id: "house-blends",
      name: "House Blends", 
      image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=1000",
      count: 12, 
      desc: "The alchemy of balance. Our signature orchestrations designed for the discerning daily ritual." 
    },
    { 
      id: "rare-finds",
      name: "Rare Finds", 
      image: "https://img.freepik.com/premium-photo/coffee-grinder-with-coffee-beans-counter_379823-34103.jpg?w=1480",
      count: 5, 
      desc: "Limited expressions of extraordinary character. Sourced from disappearing varietals and experimental lots." 
    },
    { 
      id: "brewing-gear",
      name: "Brewing Gear", 
      image: "https://img.freepik.com/premium-photo/coffee-cup-old-table_231794-1679.jpg",
      count: 18, 
      desc: "The tools of precision. Engineered instruments for the master of the manual extraction." 
    },
    { 
      id: "coffee-spaces",
      name: "Coffee Spaces", 
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000",
      count: 8, 
      desc: "Environment as ingredient. Curated elements to elevate your sanctuary of stillness." 
    },
    { 
      id: "workshops",
      name: "Workshops", 
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=1000",
      count: 4, 
      desc: "Knowledge refined. Immersive sessions focused on the science and soul of the perfect cup." 
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen bg-coffee-dark flex flex-col overflow-x-hidden"
    >
      <Navbar onOpenCart={onOpenCart} onOpenCategories={onOpenCategories} cartCount={cartCount} wishlistCount={wishlistCount} />

      {/* Grain Overlay */}
      <div className="grain pointer-events-none opacity-[0.03]" />

      {/* Global Background Scene */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Canvas gl={{ antialias: false, alpha: true }} camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]}>
          <CoffeeDust count={200} />
          <LiquidBlob />
        </Canvas>
      </div>

      <div className="flex-grow pt-48 pb-32 px-6 max-w-7xl mx-auto relative z-10 w-full">
        {/* Header Section */}
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-caramel font-mono text-[10px] uppercase tracking-[0.8em] mb-8 block font-bold">Discover</span>
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white uppercase leading-none drop-shadow-2xl">
              Categories
            </h1>
            <div className="h-[1px] w-24 bg-caramel/30 mx-auto mt-12 mb-8" />
            <p className="text-cream/40 text-lg md:text-xl font-light italic max-w-2xl mx-auto font-serif">
              "Every bean tells a story. Every category defines a ritual."
            </p>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.name} cat={cat} i={i} />
          ))}
        </div>
      </div>

      <Footer />
    </motion.main>
  );
}

// --- Scroll Story (About Page) ---
export function ScrollStory({ onOpenCart, onOpenCategories, cartCount, wishlistCount }: { onOpenCart: () => void, onOpenCategories: () => void, cartCount: number, wishlistCount?: number }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef, offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <div className="bg-coffee-dark font-sans text-cream min-h-screen relative">
      <Navbar onOpenCart={onOpenCart} onOpenCategories={onOpenCategories} cartCount={cartCount} wishlistCount={wishlistCount} />

      {/* SECTION 1 — CINEMATIC HERO (MATCHING ABOUT PAGE) */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=85&w=2400" 
            alt="The Assava Journey" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-coffee-dark/30 via-coffee-dark/50 to-coffee-dark" />
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl"
        >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: '0.3em' }}
            animate={{ opacity: 1, letterSpacing: '0.55em' }}
            transition={{ duration: 2, delay: 0.3 }}
            className="block font-mono text-[10px] uppercase text-caramel mb-8 tracking-[0.55em] font-bold"
          >
            The Assava Journey
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.9] mb-8 font-serif uppercase italic"
          >
            Soil to Soul <br /> 
            <span className="text-caramel italic font-light lowercase">The Narrative</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="relative text-xl md:text-3xl text-cream/70 max-w-3xl mx-auto font-light leading-relaxed tracking-wide italic font-serif"
          >
            "A 15-step ritual of precision, patience, and absolute obsession."
          </motion.p>
        </motion.div>

        <ScrollIndicator 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[20] cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        />
      </section>

      {/* Main Narrative Content */}
      <main className="relative z-10 py-32 px-6 max-w-7xl mx-auto flex flex-col gap-32 md:gap-64 overflow-x-hidden">

        {/* Story Steps */}
        <div className="space-y-32 md:space-y-64">
          {STORY_STEPS.map((step, index) => (
            <StoryStepBlock key={step.id} step={step} index={index} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function StoryStepBlock({ step, index }: { step: StoryStep, index: number }) {
  const isEven = index % 2 === 0;
  const chapter = STORY_CHAPTERS.find(c => c.id === step.chapterId);

  return (
    <div className="relative">
      {/* Chapter Divider */}
      {step.isChapterStart && (
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="mb-20 md:mb-40"
        >
          <div className="flex items-center gap-6 mb-4">
             <div className="h-[2px] w-12" style={{ backgroundColor: chapter?.accentColor }} />
             <span className="text-caramel font-mono text-sm uppercase tracking-widest font-bold">
               {chapter?.label}
             </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-cream uppercase mb-4 tracking-tighter italic">
            {chapter?.title}
          </h2>
          <p className="text-cream/50 text-lg md:text-xl max-w-2xl font-light italic">
            {chapter?.subtitle}
          </p>
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`relative grid md:grid-cols-2 gap-12 lg:gap-24 items-center min-h-[60vh]`}
      >
        {/* Background Image Panel */}
        <div className={`relative h-[60vh] md:h-[80vh] w-full rounded-3xl overflow-hidden glass shadow-2xl ${!isEven ? 'md:order-last' : ''}`}>
          <img 
            src={step.image} 
            loading="lazy"
            alt={step.imageAlt}
            className="w-full h-full object-cover opacity-80 transition-transform duration-1000 hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark via-coffee-dark/40 to-transparent" />
          
          {/* Badge */}
          <div className="absolute top-8 left-8">
            <span className="px-4 py-2 bg-coffee-dark/80 backdrop-blur-md rounded-full border border-white/10 text-[10px] uppercase font-bold tracking-widest text-cream">
              {step.badge}
            </span>
          </div>

          {/* Floating Icon */}
          <div className="absolute bottom-8 left-8">
            <motion.span 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: index * 0.2, ease: "easeInOut" }}
              className="block text-6xl drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              {step.icon}
            </motion.span>
          </div>

          {/* Stat Pill */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="absolute bottom-8 right-8 glass bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl md:min-w-[160px]"
          >
            <span className="block text-2xl md:text-3xl font-bold text-caramel mb-1 drop-shadow-sm">{step.stat}</span>
            <span className="text-[10px] uppercase tracking-widest text-cream/50 font-bold">{step.statLabel}</span>
          </motion.div>
        </div>

        {/* Content Panel */}
        <div className="relative z-10 flex flex-col justify-center">
          <div className="flex items-center gap-3 text-caramel font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] mb-6 font-bold">
            <span>{step.tag}</span>
            <span className="w-1 h-1 rounded-full bg-caramel/50" />
            <span className="text-cream/40">{chapter?.title}</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-cream uppercase tracking-tighter drop-shadow-md italic leading-tight">
            {step.title}
          </h2>
          
          <p className="text-xl md:text-2xl text-caramel font-serif italic mb-8 leading-snug">
            {step.desc}
          </p>

          <p className="text-sm md:text-lg text-cream/70 leading-relaxed font-light mb-12">
            {step.detail}
          </p>

          {/* Metadata Chips */}
          <div className="flex flex-wrap gap-4 pt-8 border-t border-white/10">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-cream/30 mb-1 font-bold">Region</span>
              <span className="text-xs md:text-sm text-cream/80 font-medium">{step.region}</span>
            </div>
            <div className="h-8 w-[1px] bg-white/10 self-center" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-cream/30 mb-1 font-bold">Process</span>
              <span className="text-xs md:text-sm text-cream/80 font-medium">{step.process}</span>
            </div>
            <div className="h-8 w-[1px] bg-white/10 self-center" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-cream/30 mb-1 font-bold">Impact</span>
              <span className="text-xs md:text-sm text-caramel font-medium">{step.impact}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
