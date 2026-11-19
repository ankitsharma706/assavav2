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

const ReturnsPolicyPage: React.FC<PolicyPageProps> = ({ cartCount, wishlistCount, onOpenCart, onOpenCategories }) => {
  useEffect(() => applySEO({ title: 'Returns & Refunds Policy', description: 'Review Assava returns and refund terms for coffee, equipment, and damaged deliveries.', canonical: '/returns' }), []);
  return (
    <div className="min-h-screen bg-coffee-dark text-cream">
      <Navbar cartCount={cartCount} wishlistCount={wishlistCount} onOpenCart={onOpenCart} onOpenCategories={onOpenCategories} />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-40">
        <h1 className="mb-10 text-5xl font-bold">Returns &amp; Refunds</h1>
        <section className="space-y-5 text-lg leading-relaxed text-cream/75">
          <p>Opened coffee cannot be returned because it is a fresh-roasted perishable product.</p>
          <p>If an order arrives damaged, contact Assava within 24 hours so the issue can be reviewed and a replacement arranged where applicable.</p>
          <p>Unused equipment in its original packaging may be returned within 14 days. Contact <a className="underline" href="mailto:hello@assavacoffee.com">hello@assavacoffee.com</a> before sending a return.</p>
          <p>Event ticket cancellation terms are listed in the <Link className="underline" to="/terms">terms of service</Link>.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ReturnsPolicyPage;
