import React from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../constants';
import ShowcaseCard from './ShowcaseCard';

const Collection = ({ onAddToCart, onToggleWishlist, wishlist }: { onAddToCart: (item: any) => void, onToggleWishlist: (item: any) => void, wishlist: any[] }) => {
  return (
    <section id="collection" className="section-padding bg-coffee-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-caramel font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold"
          >
            Discovery
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter text-glow uppercase leading-none"
          >
            Coffee {  }
            <span className="text-caramel italic serif lowercase">Collection</span>
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
          {PRODUCTS.map((product, i) => (
            <ShowcaseCard 
              key={product.id} 
              item={product} 
              onAddToCart={onAddToCart} 
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.some(i => i.id === product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
