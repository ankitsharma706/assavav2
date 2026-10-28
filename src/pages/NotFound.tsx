import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, ArrowRight, Coffee, Home, ShoppingBag } from 'lucide-react';
import { Navbar, Footer } from '../components/CoffeeComponents';
import { applySEO } from '../lib/seo';

type NotFoundProps = {
  cartCount: number;
  wishlistCount?: number;
  onOpenCart: () => void;
  onOpenCategories: () => void;
};

export const NotFound: React.FC<NotFoundProps> = ({
  cartCount,
  onOpenCart,
  onOpenCategories,
  wishlistCount = 0,
}) => {
  useEffect(() => {
    // Technical SEO: Error routes must strictly be noindex, nofollow
    applySEO({
      title: '404 - Page Not Found',
      description: 'The requested luxury coffee experience or narrative could not be located.',
      noindex: true,
    });
  }, []);

  return (
    <div className="bg-[#1A120B] text-[#F5F5DC] min-h-screen flex flex-col justify-between selection:bg-[#C68E5D]/20 selection:text-[#C68E5D]">
      <Navbar
        onOpenCart={onOpenCart}
        onOpenCategories={onOpenCategories}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      <main className="flex-1 flex items-center justify-center px-6 pt-36 pb-20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-24 h-24 mx-auto rounded-full bg-[#140D08] border border-[#C68E5D]/20 flex items-center justify-center text-[#C68E5D] shadow-2xl shadow-[#C68E5D]/10"
          >
            <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '20s' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#C68E5D] font-bold">
              404 • Destination Uncharted
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter font-serif text-white uppercase italic">
              Lost In The <span className="text-[#C68E5D] font-light lowercase">Terroir</span>
            </h1>
            <p className="text-base md:text-lg text-[#F5F5DC]/60 max-w-lg mx-auto font-serif italic">
              The coordinates you requested do not correspond to an active coffee lot, story, or ritual screen.
            </p>
          </motion.div>

          {/* Recovery Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/"
              className="flex items-center gap-2 bg-[#C68E5D] text-[#1A120B] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#F5F5DC] transition-all shadow-lg shadow-[#C68E5D]/10 hover:scale-105"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>

            <Link
              to="/shopping"
              className="flex items-center gap-2 bg-white/5 border border-[#C68E5D]/20 text-[#F5F5DC] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:border-[#C68E5D] hover:bg-white/10 transition-all hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4 text-[#C68E5D]" />
              <span>Explore Collection</span>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
