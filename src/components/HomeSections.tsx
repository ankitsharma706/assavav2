import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  ArrowRight, 
  Play, 
  Volume2, 
  VolumeX, 
  MapPin, 
  Wind, 
  Flame, 
  Coffee, 
  Droplets, 
  Sparkles, 
  CheckCircle, 
  ChevronRight,
  Filter,
  MoveUpRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// --- Grain Overlay ---
const GrainOverlay = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.4] mix-blend-overlay z-0 overflow-hidden">
     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat scale-150 animate-grain" />
  </div>
);

// --- Flavor Particles ---
const FlavorParticles = ({ color, isActive }: { color: string, isActive: boolean }) => {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!isActive) return;
    const particles = container.current?.querySelectorAll('.particle');
    if (particles) {
       gsap.to(particles, {
          y: -100,
          x: 'random(-40, 40)',
          opacity: 0,
          scale: 'random(0.5, 1.5)',
          duration: 'random(1.5, 2.5)',
          repeat: -1,
          stagger: 0.1,
          ease: 'power1.out'
       });
    }
  }, [isActive]);

  return (
    <div ref={container} className="absolute inset-0 pointer-events-none z-0">
       {[...Array(10)].map((_, i) => (
         <div 
           key={i} 
           className="particle absolute bottom-0 left-1/2 w-1.5 h-1.5 rounded-full"
           style={{ backgroundColor: color, opacity: isActive ? 0.6 : 0 }}
         />
       ))}
    </div>
  );
};

// --- Single Flavor Card ---
const FlavorCard = ({ note, i }: { note: any, i: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const innerGlowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Continuous random floating motion
    gsap.to(cardRef.current, {
       x: 'random(-10, 10)',
       y: 'random(-20, 20)',
       rotation: 'random(-2, 2)',
       duration: 'random(4, 6)',
       repeat: -1,
       yoyo: true,
       ease: 'sine.inOut',
       delay: i * 0.5
    });

    // Parallax entering
    gsap.from(cardRef.current, {
       opacity: 0,
       y: 100,
       scale: 0.9,
       scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom',
          scrub: true,
          end: 'top center'
       }
    });
  }, { scope: cardRef });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotateX = ((y / rect.height) - 0.5) * 15;
    const rotateY = ((x / rect.width) - 0.5) * -15;

    gsap.to(cardRef.current, {
       rotateX,
       rotateY,
       y: -20,
       duration: 0.5,
       ease: 'power3.out'
    });

    if (innerGlowRef.current) {
       gsap.to(innerGlowRef.current, {
          x: x - rect.width / 2,
          y: y - rect.height / 2,
          opacity: 0.8,
          scale: 1.5,
          duration: 0.5
       });
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    gsap.to(cardRef.current, {
       rotateX: 0,
       rotateY: 0,
       y: 0,
       duration: 1,
       ease: 'elastic.out(1, 0.3)'
    });
    if (innerGlowRef.current) {
       gsap.to(innerGlowRef.current, {
          opacity: 0,
          scale: 1,
          duration: 1
       });
    }
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative p-12 aspect-[4/5] md:aspect-square rounded-[60px] cursor-pointer group transition-all duration-[1s]"
      style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(198, 142, 93, 0.2)',
        backdropFilter: hovered ? 'blur(40px)' : 'blur(20px)',
        transformStyle: 'preserve-3d'
      }}
    >
       {/* Inner Shadow Ritual */}
       <div className="absolute inset-0 rounded-[60px] shadow-[inset_0_0_80px_rgba(0,0,0,0.5)] z-0" />
       
       {/* Background Radial Glow */}
       <div 
         ref={innerGlowRef}
         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] opacity-0 pointer-events-none transition-colors duration-1000 z-0" 
         style={{ backgroundColor: `${note.glowColor}40` }}
       />

       <FlavorParticles color={note.glowColor} isActive={hovered} />

       <div className="relative z-10 h-full flex flex-col justify-between items-center text-center py-6 translate-z-20">
          <div className="space-y-4">
             <span className="text-[10px] uppercase tracking-[0.5em] text-[#A67C52] font-black opacity-60 block group-hover:text-[#C68E5D] transition-colors">/ {note.type}</span>
             <h3 className="text-3xl md:text-5xl font-serif font-black italic tracking-tighter text-[#E6D3B3] transition-all duration-700 group-hover:scale-110 group-hover:text-white">
                {note.name}
             </h3>
          </div>
          
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#C68E5D]/30 to-transparent group-hover:via-[#C68E5D] transition-all duration-1000" />
       </div>

       {/* Reflection Artifact */}
       <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br from-white via-transparent to-transparent z-[1]" />
    </div>
  );
};

// --- Main Section ---
export const FlavorJourneySection = () => {
  const container = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  const notes = [
     { name: "Velvet Cacao", type: "Earth Core", glowColor: "#8D6E63" },
     { name: "Wild Citrus", type: "Acid Pulse", glowColor: "#F4D03F" },
     { name: "Damask Rose", type: "Floral Drift", glowColor: "#F1948A" },
     { name: "Burnt Toffee", type: "Sweet Origin", glowColor: "#C68E5D" }
  ];

  useGSAP(() => {
    // Parallax Title
    gsap.fromTo(titleRef.current, 
      { y: 50, opacity: 0 },
      { 
        y: -100, 
        opacity: 1, 
        scrollTrigger: {
          trigger: container.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      }
    );

    // Fade-in Stagger
    gsap.from('.flavor-card-item', {
       opacity: 0,
       scale: 0.8,
       stagger: 0.1,
       duration: 1.5,
       ease: 'power4.out',
       scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%'
       }
    });

  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="py-60 bg-[#1A120B] relative z-20 overflow-hidden [perspective:2000px]"
    >
       <GrainOverlay />
       
       {/* Background Radiant Heat */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-gradient-radial from-[#C68E5D]/10 to-transparent blur-[200px] z-0" />

       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-24 items-center relative z-10">
          
          <div ref={titleRef} className="lg:col-span-5 space-y-10">
             <span className="text-[#A67C52] font-mono text-[10px] uppercase tracking-[1.5em] font-black italic opacity-60 block">/ Sensory Dialect</span>
             <h2 className="text-6xl md:text-9xl font-serif font-black tracking-tighter capitalize italic leading-none">
                <span className="text-[#C68E5D] block">Flavor</span>
                <span className="text-[#E6D3B3] font-light lowercase">notes</span>
             </h2>
             <p className="text-xl md:text-2xl text-[#A67C52] italic font-serif leading-relaxed opacity-60">
                A dictionary of terroir. Each note is a memory written in volcanic soil.
             </p>
          </div>

          <div ref={gridRef} className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-10">
             {notes.map((n, i) => (
               <div key={i} className="flavor-card-item">
                  <FlavorCard note={n} i={i} />
               </div>
             ))}
          </div>
       </div>
    </section>
  );
};


// --- Original Sections ---

export const ScrollTransitionSection = () => {
  const container = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.to(textRef.current, {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1
      }
    });

    gsap.to(container.current, {
       backgroundColor: '#1a120b',
       scrollTrigger: {
          trigger: container.current,
          start: 'top center',
          scrub: true
       }
    });
  }, { scope: container });

  return (
    <section ref={container} className="h-[80vh] flex items-center justify-center relative z-10 overflow-hidden bg-transparent">
      <div 
        ref={textRef}
        className="text-center opacity-0 -translate-y-10"
      >
        <span className="text-[10px] uppercase tracking-[1em] font-black text-[#A67C52]/60 mb-12 block">/ Discovery Ritual</span>
        <h2 className="text-4xl md:text-7xl font-serif italic text-[#C68E5D] tracking-tighter leading-none capitalize">
          Every cup <br /> <span className="text-[#F5F5DC] font-light md:text-6xl">has a story</span>
        </h2>
      </div>
      
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
         <div className="w-[1px] h-20 bg-gradient-to-b from-[#C68E5D] to-transparent" />
      </div>
    </section>
  );
};

export const ManifestoSection = () => {
  const container = useRef(null);
  const wordsRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!wordsRef.current) return;
    
    const text = wordsRef.current;
    const splitWords = text.innerText.split(/\s+/);
    text.innerHTML = '';
    splitWords.forEach((word) => {
      const span = document.createElement('span');
      span.className = 'word inline-block opacity-0 translate-y-4';
      span.textContent = word;
      text.appendChild(span);
      text.appendChild(document.createTextNode(' '));
    });
    
    gsap.to('.word', {
      opacity: 1,
      y: 0,
      stagger: {
         each: 0.05,
         from: "start"
      },
      scrollTrigger: {
        trigger: container.current,
        start: 'top 70%',
        end: 'bottom 40%',
        scrub: 1,
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-40 px-6 relative z-10 overflow-hidden bg-[#1A120B]">
      <div className="max-w-7xl mx-auto text-center space-y-24">
        <span className="text-[#A67C52] font-mono text-[10px] uppercase tracking-[1em] font-black italic block opacity-60">/ Philosophy</span>
        
        <p ref={wordsRef} className="text-3xl md:text-5xl font-serif text-[#F5F5DC] leading-relaxed tracking-tighter italic">
           At ASSAVA, coffee is not just brewed — it is awakened. From volcanic soils to precise roasting, every step is intentional, designed for those who seek more than a drink.
        </p>

        <p className="text-lg md:text-xl text-[#A67C52] italic font-serif leading-relaxed max-w-4xl mx-auto opacity-70">
           "We hunt for the outliers, translating geography into liquid character, one devotion at a time."
        </p>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-[#C68E5D]/5 rounded-full blur-[200px] pointer-events-none" />
    </section>
  );
};

export const BrewingRitualSection = () => {
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const container = useRef(null);

  const rituals = [
    {
      name: "The V60 Protocol",
      image: "https://virtuoso-coffee.com/cdn/shop/articles/V60_coffee_brewing.jpg?v=1735099768&width=1500",
      desc: "Precision manual extraction. Clarifying the brightest notes of our single-origin lots through total flow control.",
      icon: <Wind />
    },
    {
      name: "The Espresso Pulse",
      image: "https://d2q01ftr6ua4w.cloudfront.net/assets/images/thumb_6132626_item_image_normal.jpeg?t=1677686287",
      desc: "Pressure and heat in perfect union. Concentrating the heart of the bean into a 30ml ritual of pure intensity.",
      icon: <Flame />
    },
    {
      name: "The Immersion Ritual",
      image: "https://cdn.shopify.com/s/files/1/0617/2891/5680/files/pexels-iitsbruna-22873658_480x480.jpg?v=1743486338",
      desc: "Raw, unhurried contact. Extracting deep body and chocolatey structure through patient full-immersion brewing.",
      icon: <Coffee />
    }
  ];

  useGSAP(() => {
    gsap.from(container.current, {
       clipPath: 'circle(0% at 50% 50%)',
       scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true
       }
    });

    cardRefs.current.forEach((card, i) => {
       if (card) {
          gsap.fromTo(card, 
            { rotateX: 45, z: -500, opacity: 0 },
            { 
              rotateX: 0, z: 0, opacity: 1,
              scrollTrigger: {
                 trigger: card,
                 start: 'top 90%',
                 end: 'top 40%',
                 scrub: 1
              }
            }
          );
       }
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-40 px-6 bg-[#1A120B] relative z-10 [perspective:2000px]">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
           <div className="space-y-6">
              <span className="text-[#A67C52] font-mono text-[10px] uppercase tracking-[1em] font-black italic opacity-60">/ The Archive</span>
              <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#C68E5D] tracking-tighter leading-none capitalize italic">
                 Brewing <span className="text-[#F5F5DC] font-light lowercase">Artifacts</span>
              </h2>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           {rituals.map((r, i) => (
             <div
               key={i}
               ref={(el) => { if (el) cardRefs.current[i] = el; }}
               className="group relative h-[600px] rounded-[60px] overflow-hidden border border-[#C68E5D]/10 bg-[#140D08]"
             >
                <img src={r.image} className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s]" alt={r.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B] via-transparent to-transparent" />
                
                <div className="absolute inset-0 p-12 flex flex-col justify-end gap-6">
                   <div className="w-16 h-16 rounded-full border border-[#C68E5D]/20 flex items-center justify-center text-[#C68E5D] bg-[#1A120B]/60 backdrop-blur-3xl">
                      {r.icon}
                   </div>
                   <h3 className="text-3xl font-serif font-bold text-[#C68E5D] tracking-tighter italic">{r.name}</h3>
                   <p className="text-sm italic font-serif text-[#F5F5DC]/70 leading-relaxed max-w-[90%]">{r.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export const OriginExperienceSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const origins = [
    { country: "Ethiopia", profile: "Citrus, Jasmime, Tea-like", lat: "9.1°N", long: "40.5°E" },
    { country: "Brazil", profile: "Nutty, Dark Cocoa, Honey", lat: "14.2°S", long: "51.9°W" },
    { country: "Panama", profile: "Tropical, Gesha, Ephemeral", lat: "8.5°N", long: "80.7°W" },
    { country: "Colombia", profile: "Red Berry, Silky, Bright", lat: "4.5°N", long: "74.2°W" },
    { country: "India", profile: "Spicy, Earthy, Monsooned", lat: "15.3°N", long: "75.7°E" }
  ];

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    const masterScroll = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth / 2 - 250), 
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${track.scrollWidth * 1.8}`, 
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    origins.forEach((_, i) => {
       const card = document.querySelector(`.origin-card-${i}`);
       const title = document.querySelector(`.origin-title-${i}`);
       const content = document.querySelector(`.origin-content-${i}`);
       const num = document.querySelector(`.origin-num-${i}`);

       if (!card) return;

       gsap.to(card, {
          scale: 1.15,
          scrollTrigger: {
             trigger: card,
             containerAnimation: masterScroll,
             start: 'left center',
             end: 'right center',
             toggleActions: 'play reverse play reverse',
             onEnter: () => {
                gsap.to(title, { color: '#F5F5DC', opacity: 1, duration: 0.6 });
                gsap.to(content, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
                gsap.to(num, { color: '#C68E5D', opacity: 0.6, duration: 0.6 });
             },
             onLeave: () => {
                if (i !== origins.length - 1) {
                   gsap.to(title, { color: '#A67C52', opacity: 0.2, duration: 0.6 });
                   gsap.to(content, { opacity: 0, y: 30, duration: 0.6 });
                   gsap.to(num, { color: '#C68E5D', opacity: 0.1, duration: 0.6 });
                }
             },
             onEnterBack: () => {
                gsap.to(title, { color: '#F5F5DC', opacity: 1, duration: 0.6 });
                gsap.to(content, { opacity: 1, y: 0, duration: 0.8 });
                gsap.to(num, { color: '#C68E5D', opacity: 0.6, duration: 0.6 });
             },
             onLeaveBack: () => {
                gsap.to(title, { color: '#A67C52', opacity: 0.2, duration: 0.6 });
                gsap.to(content, { opacity: 0, y: 30, duration: 0.6 });
                gsap.to(num, { color: '#C68E5D', opacity: 0.1, duration: 0.6 });
             }
          }
       });
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="h-screen bg-[#140D08] overflow-hidden flex flex-col justify-center">
      <div ref={trackRef} className="flex h-full items-center pl-[50vw] pr-[50vw] gap-[35vw] relative z-10 w-max">
         <div className="shrink-0 space-y-8 w-[400px]">
            <span className="text-[#A67C52] font-mono text-[10px] uppercase tracking-[1.5em] font-black italic opacity-60">/ The Terroir Archive</span>
            <h2 className="text-6xl md:text-9xl font-serif font-bold text-[#C68E5D] tracking-tighter capitalize italic leading-none">
               Global <br /> <span className="text-[#F5F5DC] font-light lowercase">collection</span>
            </h2>
         </div>

         {origins.map((o, i) => (
           <div 
             key={i} 
             className={cn(
               "shrink-0 w-[500px] flex flex-col justify-center origin-card",
               `origin-card-${i}`
             )}
           >
              <div className="space-y-10">
                 <div className="flex items-center gap-6 mb-4">
                    <span className={cn("origin-number text-4xl font-serif text-[#C68E5D]/10 font-black uppercase italic italic leading-none transition-all", `origin-num-${i}`)}>0{i+1}</span>
                    <div className="h-[1px] w-20 bg-[#C68E5D]/10" />
                 </div>
                 
                 <h3 className={cn(
                   "origin-title text-5xl md:text-8xl font-black font-serif text-[#A67C52]/20 lowercase italic transition-all duration-700 leading-none",
                   `origin-title-${i}`
                 )}>
                    {o.country}
                 </h3>
                 
                 <div className={cn(
                   "origin-content grid grid-cols-2 gap-8 border-t border-[#C68E5D]/5 pt-8 opacity-0 translate-y-20 transition-all",
                   `origin-content-${i}`
                 )}>
                    <div className="space-y-3">
                       <span className="text-[10px] uppercase tracking-widest text-[#A67C52] font-black opacity-60">Profile</span>
                       <p className="text-xl font-serif italic text-[#C68E5D]">{o.profile}</p>
                    </div>
                    <div className="space-y-3">
                       <span className="text-[10px] uppercase tracking-widest text-[#A67C52] font-black opacity-60">Origin</span>
                       <p className="text-sm font-mono text-[#A67C52]/40 italic">{o.lat} / {o.long}</p>
                    </div>
                 </div>
              </div>
           </div>
         ))}
      </div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center grayscale scale-110" />
    </section>
  );
};

export const CinematicVideoSection = () => {
  const container = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useGSAP(() => {
    gsap.fromTo(videoRef.current, 
      { scale: 1.5, opacity: 0 },
      { 
        scale: 1, opacity: 0.4,
        scrollTrigger: {
          trigger: container.current,
          start: 'top bottom',
          end: 'center center',
          scrub: true
        }
      }
    );

    gsap.to('.overlay-text', {
       y: 0,
       opacity: 1,
       scrollTrigger: {
          trigger: container.current,
          start: 'top 40%',
          scrub: true
       }
    });

    ScrollTrigger.create({
       trigger: container.current,
       start: 'top center',
       onEnter: () => {
          if (audioRef.current) {
             gsap.to(audioRef.current, { volume: 0.3, duration: 2 });
             audioRef.current.play().catch(() => {});
          }
       },
       onLeave: () => {
          if (audioRef.current) gsap.to(audioRef.current, { volume: 0, duration: 2 });
       }
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative h-[100vh] flex items-center justify-center overflow-hidden z-10 bg-[#050505]">
       <video 
         ref={videoRef}
         loop muted playsInline autoPlay
         className="absolute inset-0 w-full h-full object-cover"
       >
         <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27ee34529fe992389d0cba96e838" type="video/mp4" />
       </video>
       <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2022/10/14/audio_3231362e4f.mp3" loop />

       <div className="absolute inset-0 bg-[#1A120B]/60" />
       
       <div className="relative z-10 text-center overlay-text opacity-0 translate-y-32">
          <span className="text-[#A67C52] font-mono text-[10px] uppercase tracking-[1em] mb-8 block opacity-60">/ Sensory Stream</span>
          <h2 className="text-6xl md:text-9xl font-bold font-serif italic text-[#C68E5D] leading-none capitalize tracking-tighter">
             Bean to <span className="text-[#F5F5DC] italic font-light lowercase">ritual</span>
          </h2>
       </div>
    </section>
  );
};

export const CommunityCultureSection = () => {
  const container = useRef(null);
  const imgRef = useRef(null);

  useGSAP(() => {
     gsap.fromTo(imgRef.current, 
       { y: -100, scale: 1.1 },
       { 
         y: 50, scale: 1,
         scrollTrigger: {
            trigger: container.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
         }
       }
     );
  }, { scope: container });

  return (
    <section ref={container} className="py-40 px-6 bg-[#140D08] relative z-10 overflow-hidden">
       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-7 relative h-[600px] rounded-[60px] overflow-hidden shadow-2xl">
             <img 
               ref={imgRef}
               src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1600" 
               className="w-full h-full object-cover opacity-50 grayscale" 
               alt="Culture" 
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#140D08] via-transparent to-transparent" />
          </div>

          <div className="lg:col-span-5 space-y-12">
             <div className="space-y-6">
                <span className="text-[#A67C52] font-mono text-[10px] uppercase tracking-[0.8em] font-black italic opacity-60">/ The Culture</span>
                <h2 className="text-5xl md:text-8xl font-serif font-bold text-[#C68E5D] tracking-tighter capitalize italic leading-none">
                   beyond <br /> the <br /> <span className="text-[#F5F5DC] font-light lowercase">ritual</span>
                </h2>
             </div>
             
             <p className="text-xl md:text-3xl text-[#F5F5DC]/80 italic font-serif leading-relaxed font-light">
                Culture is the final roast. We host rituals, form collaborations with outliers, and build sanctuaries of stillness.
             </p>

             <button className="flex items-center gap-6 group magnetic">
                <div className="w-16 h-16 rounded-full border border-[#C68E5D]/20 flex items-center justify-center bg-[#1A120B] group-hover:bg-[#3B2A1E] transition-all">
                   <ArrowRight className="w-6 h-6 text-[#C68E5D]" />
                </div>
                <span className="text-xs uppercase font-black tracking-[0.3em] text-[#C68E5D] group-hover:text-[#F5F5DC] transition-colors">Experience Archive</span>
             </button>
          </div>
       </div>
    </section>
  );
};

export const FeaturedExperienceSection = () => {
  const container = useRef(null);

  useGSAP(() => {
     gsap.fromTo('.event-img', 
       { scale: 1.2 },
       { 
         scale: 1,
         scrollTrigger: { trigger: container.current, scrub: true }
       }
     );
     
     ScrollTrigger.create({
        trigger: container.current,
        pin: true,
        start: 'top top',
        end: '+=100%',
     });
  }, { scope: container });

  return (
    <section ref={container} className="h-screen bg-[#050505] relative z-20 overflow-hidden">
       <div className="h-full w-full relative">
          <img 
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=85&w=2000" 
            className="event-img absolute inset-0 w-full h-full object-cover opacity-20" 
            alt="Event" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B] via-[#1A120B]/40 to-transparent" />
          
          <div className="event-content relative z-10 h-full flex flex-col justify-center items-center text-center px-6 gap-12">
             <span className="text-[#A67C52] font-mono text-xs uppercase tracking-[1em] font-black italic opacity-60">/ Experience</span>
             <h2 className="text-6xl md:text-9xl font-bold font-serif text-[#C68E5D] tracking-tighter leading-none capitalize italic">
                Kora <br /> <span className="text-[#F5F5DC] font-light lowercase md:text-8xl">Kulture</span>
             </h2>
             <Link 
                to="/events/kora-kulture"
                className="px-16 py-6 bg-[#1A120B] text-[#F5F5DC] border border-[#C68E5D]/20 rounded-full font-black uppercase tracking-[0.5em] text-[10px] shadow-2xl hover:bg-[#3B2A1E] transition-all magnetic"
             >
                View Ritual
             </Link>
          </div>
       </div>
    </section>
  );
};

export const CraftsmanshipSection = () => {
  const lineRef = useRef<SVGPathElement>(null);
  const container = useRef(null);

  useGSAP(() => {
     if (!lineRef.current) return;
     const length = lineRef.current.getTotalLength();
     gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
     gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        scrollTrigger: {
           trigger: container.current,
           start: 'top center',
           end: 'bottom center',
           scrub: true
        }
     });
  }, { scope: container });

  const steps = [
     { num: "01", title: "Selective Harvest", desc: "Hunting for outliers at 4300ft." },
     { num: "02", title: "Micro-batch Roast", desc: "Scientific precision in the crucible." },
     { num: "03", title: "Artifact State", desc: "Cupping for sensory dominance." }
  ];

  return (
    <section ref={container} className="py-40 px-6 bg-[#1A120B] relative min-h-screen">
       <div className="max-w-7xl mx-auto space-y-32">
          <div className="text-center space-y-8">
             <span className="text-[#A67C52] font-mono text-[10px] uppercase tracking-[1em] font-black italic opacity-60">/ The Craft</span>
             <h2 className="text-6xl md:text-9xl font-serif font-bold text-[#C68E5D] tracking-tighter capitalize italic leading-none">Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 relative">
             <svg className="absolute top-16 left-0 w-full h-[2px] hidden md:block opacity-10" viewBox="0 0 1200 2">
                <path ref={lineRef} d="M0 1 L1200 1" stroke="#C68E5D" strokeWidth="2" fill="none" />
             </svg>
             
             {steps.map((s, i) => (
                <div key={i} className="step-card relative z-10 space-y-8 text-center">
                   <div className="w-24 h-24 rounded-full border border-[#C68E5D]/10 bg-[#140D08] flex items-center justify-center text-3xl font-black text-[#C68E5D] mx-auto shadow-xl">
                      {s.num}
                   </div>
                   <div className="space-y-4">
                      <h3 className="text-3xl font-serif font-bold text-[#C68E5D] italic capitalize">{s.title}</h3>
                      <p className="text-base text-[#F5F5DC]/60 italic font-serif leading-relaxed">{s.desc}</p>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};

export const SubscriptionSection = () => {
  const container = useRef(null);

  useGSAP(() => {
     gsap.to('.membership-panel', {
        rotationY: 5,
        scrollTrigger: { trigger: container.current, scrub: true }
     });
  }, { scope: container });

  return (
    <section ref={container} className="py-40 px-6 bg-[#140D08] relative overflow-hidden">
       <div className="max-w-7xl mx-auto">
          <div className="membership-panel relative rounded-[80px] overflow-hidden p-12 md:p-32 bg-[#1A120B]/80 border border-[#C68E5D]/10 backdrop-blur-3xl shadow-2xl">
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-12">
                   <span className="text-[#A67C52] font-mono text-xs uppercase tracking-[1em] font-black italic opacity-60">/ Membership</span>
                   <h2 className="text-5xl md:text-8xl font-serif font-bold text-[#C68E5D] tracking-tighter capitalize italic leading-none">
                      The Ritual <br /> <span className="text-[#F5F5DC] font-light lowercase">Registry</span>
                   </h2>
                   <p className="text-xl md:text-2xl text-[#F5F5DC]/80 italic font-serif leading-relaxed max-w-xl">
                      Exclusive monthly drops of disappearing lots. Early access to rituals. The ultimate devotion.
                   </p>
                </div>

                <div className="p-12 rounded-[50px] bg-[#140D08] border border-[#C68E5D]/5 space-y-10 shadow-2xl">
                   <div className="space-y-3">
                      <span className="text-[10px] uppercase font-black text-[#A67C52] tracking-widest opacity-40">Devotion Tier</span>
                      <h3 className="text-4xl font-serif font-black text-[#C68E5D] italic">Master Devotee</h3>
                   </div>
                   <div className="text-6xl md:text-7xl font-mono text-[#C68E5D] font-bold tracking-tighter">
                      ₹2,499<span className="text-base font-light text-[#A67C52] italic opacity-40"> / mo</span>
                   </div>
                   <button className="w-full py-8 bg-[#C68E5D] text-[#1A120B] rounded-full font-black uppercase tracking-[0.5em] text-[10px] shadow-2xl hover:bg-[#A67C52] transition-all magnetic">
                      Begin Ritual
                   </button>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
};
