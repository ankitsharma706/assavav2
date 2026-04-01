import React from 'react';
import { Navbar, Hero } from '../components/CoffeeComponents';
import Collection from '../components/Collection';
import Events from '../components/Events';
import Instagram from '../components/Instagram';
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';

const Home = ({ cartCount, onOpenCart, onOpenCategories, onAddToCart }: {
  cartCount: number;
  onOpenCart: () => void;
  onOpenCategories: () => void;
  onAddToCart: (item: any) => void;
}) => {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#008080',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='2' height='2' fill='%23007070' /%3E%3Crect x='2' y='2' width='2' height='2' fill='%23007070' /%3E%3C/svg%3E")`,
        fontFamily: 'Tahoma, Verdana, Arial, sans-serif',
        paddingBottom: 32,
      }}
    >
      {/* Hero / Desktop section */}
      <Hero />

      {/* Sections below rendered as Win2K panel pages */}
      <div style={{ background: '#d4d0c8' }}>
        <Collection onAddToCart={onAddToCart} />
        <Events />
        <Reviews />
        <Instagram />
        <Footer />
      </div>

      {/* Taskbar fixed at bottom */}
      <Navbar
        onOpenCart={onOpenCart}
        onOpenCategories={onOpenCategories}
        cartCount={cartCount}
      />
    </main>
  );
};

export default Home;
