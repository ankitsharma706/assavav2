import React, { Suspense, useEffect, useRef } from 'react';
import { Navbar, Hero } from '../components/CoffeeComponents';
import Collection from '../components/Collection';
import Events from '../components/Events';
import Instagram from '../components/Instagram';
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';
import { Canvas } from '@react-three/fiber';
import { BeanCluster } from '../components/ThreeScene';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { 
  ScrollTransitionSection, 
  ManifestoSection, 
  BrewingRitualSection, 
  OriginExperienceSection, 
  CinematicVideoSection, 
  FlavorJourneySection, 
  CommunityCultureSection, 
  FeaturedExperienceSection, 
  CraftsmanshipSection, 
  SubscriptionSection 
} from '../components/HomeSections';

const Home = ({ cartCount, wishlistCount, wishlist, onToggleWishlist, onOpenCart, onOpenCategories, onAddToCart }: { cartCount: number, wishlistCount: number, wishlist: any[], onToggleWishlist: (item: any) => void, onOpenCart: () => void, onOpenCategories: () => void, onAddToCart: (item: any) => void }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Correct Lenis + GSAP sync (Fixing jitter/double RAF)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 2. Global Scroll Storytelling Timeline
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
      }
    });

    masterTl.to('body', {
      backgroundColor: '#0a0705',
      duration: 1
    });

    masterTl.to('.grain', {
      opacity: 0.08,
      duration: 1
    }, 0);

    // 3. Global Depth Parallax
    gsap.utils.toArray('.parallax').forEach((el: any) => {
      gsap.to(el, {
        y: -100,
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // 4. Magnetic Buttons
    const magnets = document.querySelectorAll('.magnetic');
    magnets.forEach((btn: any) => {
      btn.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      });
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative bg-black text-white selection:bg-caramel selection:text-black">
      <div className="grain pointer-events-none opacity-[0.03] fixed inset-0 z-[100]" />
      
      <div className="relative z-10 overflow-x-hidden">
        <Navbar 
          onOpenCart={onOpenCart} 
          onOpenCategories={onOpenCategories} 
          cartCount={cartCount}
          wishlistCount={wishlistCount}
        />
        <Hero />
        
        <ScrollTransitionSection />
        <ManifestoSection />
        <BrewingRitualSection />
        <OriginExperienceSection />
        
        <Collection onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} wishlist={wishlist} />
        
        <CinematicVideoSection />
        <FlavorJourneySection />
        <CommunityCultureSection />
        <CraftsmanshipSection />
        <FeaturedExperienceSection />
        
        <Reviews />
        
        <SubscriptionSection />
        <Events />
        <Instagram />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
