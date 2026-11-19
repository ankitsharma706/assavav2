import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Product } from '../types';

interface ShowcaseCardProps {
  item: Product;
  onAddToCart: (item: Product) => void;
  onToggleWishlist?: (item: Product) => void;
  isWishlisted?: boolean;
}

export default function ShowcaseCard({ item, onAddToCart, onToggleWishlist, isWishlisted }: ShowcaseCardProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.article
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        setRotation({
          x: (event.clientY - bounds.top - bounds.height / 2) / 20,
          y: (bounds.width / 2 - (event.clientX - bounds.left)) / 20,
        });
      }}
      onMouseLeave={() => setRotation({ x: 0, y: 0 })}
      style={{ perspective: 1500, rotateX: rotation.x, rotateY: rotation.y }}
      className="group relative"
    >
      <Link to={`/coffeeDetail/${item.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[50px] border border-white/5 bg-coffee-dark shadow-2xl">
          {!imageLoaded && <div aria-hidden="true" className="absolute inset-0 animate-pulse bg-coffee-dark" />}
          <img src={item.image} alt={item.name} width="800" height="1067" loading="lazy" onLoad={() => setImageLoaded(true)} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute inset-x-8 bottom-8 text-white">
            <p className="mb-2 font-mono text-[9px] uppercase tracking-widest text-[#C68E5D]">{item.profile?.origin} / {item.profile?.roast}</p>
            <h2 className="text-3xl font-bold uppercase">{item.name}</h2>
            <p className="mt-2 text-lg font-bold text-[#C68E5D]">₹{item.price.toFixed(2)}</p>
          </div>
        </div>
      </Link>
      <button
        type="button"
        aria-label={`${isWishlisted ? 'Remove' : 'Add'} ${item.name} ${isWishlisted ? 'from' : 'to'} wishlist`}
        aria-pressed={Boolean(isWishlisted)}
        onClick={() => onToggleWishlist?.(item)}
        className={cn('absolute right-6 top-6 rounded-full bg-black/70 p-3 text-white', isWishlisted && 'text-[#C68E5D]')}
      >
        <Heart aria-hidden="true" className={cn('h-5 w-5', isWishlisted && 'fill-current')} />
      </button>
      <button type="button" onClick={() => onAddToCart(item)} className="mt-4 w-full rounded-2xl bg-[#C68E5D] py-4 text-xs font-bold uppercase tracking-widest text-[#1A120B]">
        Add to collection
      </button>
    </motion.article>
  );
}
