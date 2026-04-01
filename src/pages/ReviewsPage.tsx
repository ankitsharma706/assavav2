import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/CoffeeComponents';
import Footer from '../components/Footer';
import Reviews from '../components/Reviews';

const ReviewsPage = ({ cartCount, wishlistCount, onOpenCart, onOpenCategories }: any) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen bg-coffee-dark flex flex-col pt-32"
    >
      <Navbar onOpenCart={onOpenCart} onOpenCategories={onOpenCategories} cartCount={cartCount} wishlistCount={wishlistCount} />
      <div className="flex-grow">
        <Reviews />
      </div>
      <Footer />
    </motion.main>
  );
};

export default ReviewsPage;
