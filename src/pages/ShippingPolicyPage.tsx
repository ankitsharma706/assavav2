import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/CoffeeComponents';
import Footer from '../components/Footer';
import { applySEO } from '../lib/seo';

interface PolicyPageProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenCategories: () => void;
}

const ShippingPolicyPage: React.FC<PolicyPageProps> = ({ cartCount, wishlistCount, onOpenCart, onOpenCategories }) => {
  useEffect(() => applySEO({ title: 'Shipping & Delivery Policy', description: 'Shipping and delivery information for Assava orders.', canonical: '/shipping' }), []);
  return (
    <div className="min-h-screen bg-coffee-dark text-cream">
      <Navbar cartCount={cartCount} wishlistCount={wishlistCount} onOpenCart={onOpenCart} onOpenCategories={onOpenCategories} />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-40">
        <h1 className="mb-10 text-5xl font-bold">Shipping &amp; Delivery</h1>
        <section className="space-y-5 text-lg leading-relaxed text-cream/75">
          <p>Shipping is free on every order delivered within India.</p>
          <p>Orders are handled within 1–2 days and typically take 3–5 days in transit. Actual delivery dates may vary by destination and carrier conditions.</p>
          <p>Order tracking information is sent by email when available. For delivery assistance, contact <a className="underline" href="mailto:hello@assavacoffee.com">hello@assavacoffee.com</a>.</p>
        </section>
        <p className="mt-10"><Link className="underline" to="/terms">See the full terms of service</Link></p>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingPolicyPage;
