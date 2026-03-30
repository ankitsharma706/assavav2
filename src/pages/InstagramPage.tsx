import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/CoffeeComponents';
import Footer from '../components/Footer';
import Instagram from '../components/Instagram';

const InstagramPage = ({ cartCount, onOpenCart, onOpenCategories }: any) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen bg-coffee-dark flex flex-col pt-32"
    >
      <Navbar onOpenCart={onOpenCart} onOpenCategories={onOpenCategories} cartCount={cartCount} />
      <div className="flex-grow">
        <Instagram />
      </div>
      <Footer />
    </motion.main>
  );
};

export default InstagramPage;
