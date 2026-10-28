import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Package, Truck, RefreshCw, Flame, Shield, Sparkles } from 'lucide-react';
import { Navbar, Footer } from '../components/CoffeeComponents';
import Breadcrumb from '../components/Breadcrumb';
import { applySEO } from '../lib/seo';
import JsonLd from '../components/JsonLd';
import { generateFAQSchema, FAQItem } from '../lib/schema';
import AdUnit from '../components/AdSense/AdUnit';

type FAQProps = {
  cartCount: number;
  wishlistCount?: number;
  onOpenCart: () => void;
  onOpenCategories: () => void;
};

interface FAQCategory {
  title: string;
  icon: any;
  items: FAQItem[];
}

const FAQ_DATA: FAQCategory[] = [
  {
    title: 'Roasting & Freshness Ritual',
    icon: Flame,
    items: [
      {
        question: 'When is my coffee roasted and shipped?',
        answer: 'Every ASSAVA micro-lot is roasted in small batches (under 12kg) within 48 hours of your dispatch date. We seal each lot with a one-way degassing valve and nitrogen flush to protect volatile aromatics.',
      },
      {
        question: 'What is the optimal resting period before brewing?',
        answer: 'We recommend resting light-to-medium roasts for 7 to 10 days post-roast date for optimal flavor development. Dark roasts like Assava Noir are ready for espresso extraction after 5 days.',
      },
      {
        question: 'How should I properly store my whole bean coffee?',
        answer: 'Store your coffee in our airtight, nitrogen-sealed pouch or an opaque vacuum canister at ambient room temperature (18°C–22°C). Never store coffee in the refrigerator or freezer, as moisture condensation degrades delicate coffee oils.',
      },
    ],
  },
  {
    title: 'Shipping, Delivery & Tracking',
    icon: Truck,
    items: [
      {
        question: 'What are your shipping destinations and estimated transit times?',
        answer: 'We ship domestically across India via expedited courier partners (typically 2-4 business days to metropolitan hubs, and 4-6 days to regional areas). International priority shipping is available upon checkout.',
      },
      {
        question: 'How do I track my order in real-time?',
        answer: 'Once your lot leaves our roastery, you will receive an automated tracking notification via email and SMS containing your live courier tracking link.',
      },
      {
        question: 'Is free shipping available?',
        answer: 'Complimentary expedited shipping is automatically applied to all domestic orders over ₹1,500 ($25 USD).',
      },
    ],
  },
  {
    title: 'Returns, Refunds & Freshness Guarantee',
    icon: RefreshCw,
    items: [
      {
        question: 'What is the ASSAVA Freshness Guarantee and return policy?',
        answer: 'Because freshly roasted coffee is a perishable artisanal food product, we cannot accept returns on opened coffee bags. However, if your order arrives damaged, defective, or in error, notify us within 48 hours at hello@assavacoffee.com with photographic evidence and we will immediately issue a replacement roast or 100% refund.',
      },
      {
        question: 'Can brewing gear and hardware be returned?',
        answer: 'Unused brewing gear in original unopened packaging may be returned within 14 days of delivery. Return shipping is borne by the patron unless the instrument arrived with a verified manufacturing defect.',
      },
    ],
  },
  {
    title: 'Orders, Subscriptions & Concierge',
    icon: Package,
    items: [
      {
        question: 'Can I customize my grind size for different brewing devices?',
        answer: 'Yes. You can select Whole Beans, Extra Fine (Espresso/Ibrik), Medium-Fine (AeroPress/Moka Pot), Medium (V60/Chemex/Drip), or Coarse (French Press/Cold Brew) directly on any product page.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit/debit cards (Visa, MasterCard, Amex), UPI, Net Banking, and international payment methods processed through Razorpay.',
      },
    ],
  },
];

const allFaqs: FAQItem[] = FAQ_DATA.flatMap(cat => cat.items);

export const FAQPage: React.FC<FAQProps> = ({
  cartCount,
  onOpenCart,
  onOpenCategories,
  wishlistCount = 0,
}) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    '0-0': true, // Open first item by default
  });

  useEffect(() => {
    applySEO({
      title: 'Frequently Asked Questions (FAQ) | Shipping, Returns & Roasts',
      description: 'Frequently asked questions about Assava Specialty Coffee: artisanal roasting schedules, brewing gear, domestic & international shipping, and our freshness guarantee.',
      canonical: '/faq',
    });
  }, []);

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-[#1A120B] text-[#F5F5DC] min-h-screen relative selection:bg-[#C68E5D]/20 selection:text-[#C68E5D]">
      <JsonLd id="faq-schema" data={generateFAQSchema(allFaqs)} />
      <Navbar
        onOpenCart={onOpenCart}
        onOpenCategories={onOpenCategories}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      <header className="relative pt-44 pb-20 px-6 border-b border-[#C68E5D]/10 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Breadcrumb items={[{ name: 'FAQ & Guidance', path: '/faq' }]} className="justify-center mb-6" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block font-mono text-[10px] uppercase tracking-[0.5em] text-[#C68E5D] mb-4 font-bold">
              Knowledge & Concierge
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 font-serif text-white uppercase italic">
              Frequently <span className="text-[#C68E5D] font-light lowercase">Asked Questions</span>
            </h1>
            <p className="text-lg md:text-xl text-[#F5F5DC]/60 max-w-2xl mx-auto font-serif italic">
              "Clarity on every bean, brew ratio, roast profile, and harvest delivery."
            </p>
          </motion.div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-20 space-y-16">
        {FAQ_DATA.map((category, catIdx) => {
          const Icon = category.icon;
          return (
            <section key={category.title} className="space-y-6">
              <div className="flex items-center gap-4 pb-4 border-b border-[#C68E5D]/10">
                <div className="w-10 h-10 rounded-xl bg-[#C68E5D]/10 flex items-center justify-center text-[#C68E5D] border border-[#C68E5D]/20">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white uppercase italic">
                  {category.title}
                </h2>
              </div>

              <div className="space-y-4">
                {category.items.map((item, itemIdx) => {
                  const key = `${catIdx}-${itemIdx}`;
                  const isOpen = !!openItems[key];

                  return (
                    <div
                      key={item.question}
                      className="bg-[#140D08]/60 border border-[#C68E5D]/10 rounded-2xl overflow-hidden transition-all hover:border-[#C68E5D]/30"
                    >
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-1 focus:ring-[#C68E5D]"
                        aria-expanded={isOpen}
                      >
                        <span className="text-base md:text-lg font-serif text-white font-medium">
                          {item.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#C68E5D] transition-transform duration-300 flex-shrink-0 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-6 pt-2 text-sm md:text-base text-[#F5F5DC]/70 font-serif leading-relaxed border-t border-white/5">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {catIdx === 1 && (
                <AdUnit slotId="faq-mid-content" format="horizontal" minHeight={120} />
              )}
            </section>
          );
        })}

        {/* Concierge Contact Card */}
        <div className="mt-16 p-8 md:p-12 bg-gradient-to-br from-[#140D08] to-[#251810] border border-[#C68E5D]/20 rounded-3xl text-center space-y-4">
          <Sparkles className="w-8 h-8 text-[#C68E5D] mx-auto" />
          <h3 className="text-2xl font-serif text-white uppercase italic">
            Have a Specific Question?
          </h3>
          <p className="text-sm text-[#F5F5DC]/60 max-w-lg mx-auto font-serif italic">
            Our master roasters and brew specialists are always at your disposal for recipe guidance and tasting notes.
          </p>
          <div className="pt-2">
            <a
              href="mailto:hello@assavacoffee.com"
              className="inline-block bg-[#C68E5D] text-[#1A120B] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#F5F5DC] transition-colors"
            >
              Write to Concierge
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
