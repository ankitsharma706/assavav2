import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  image: string;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

/**
 * A reusable cinematic Parallax Section.
 * Implements smooth background translation, foreground acceleration, 
 * and interactive 3D depth using Framer Motion.
 */
export function ParallaxSection({ image, title, subtitle, children }: ParallaxSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  
  // Track scroll position of THIS specific element within the viewport.
  // "start end" = top of element hits bottom of viewport
  // "end start" = bottom of element hits top of viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Background Image Effects (Moves slightly slower, zooms in slightly)
  // The absolute inset matches the motion bounds to prevent white space.
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  
  // Foreground Content Effects (Moves faster, adding subtle 3D Z-depth)
  const contentY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const contentZ = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      style={{ perspective: "1200px" }} // Required to render Z-axis translations
      className="relative w-full min-h-[120vh] flex items-center justify-center overflow-hidden bg-coffee-dark"
    >
      {/* 1. Background Image Layer (Parallax Slower) */}
      <motion.div 
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-[-25%] -z-10"
      >
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* 2. Layered Gradient Overlays for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark via-transparent to-coffee-dark/80 -z-10" />
      <div className="absolute inset-0 bg-black/30 -z-10" />

      {/* 3. Foreground Content Layer (Parallax Faster + 3D Depth) */}
      <motion.div 
        style={{ y: contentY, z: contentZ, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto"
      >
        <h2 className="text-5xl md:text-8xl font-bold mb-6 text-cream uppercase tracking-tighter drop-shadow-2xl">
          {title}
        </h2>
        <p className="text-xl md:text-3xl text-cream/90 font-light leading-relaxed tracking-wide mb-10 drop-shadow-md">
          {subtitle}
        </p>
        {children}
      </motion.div>
    </section>
  );
}
