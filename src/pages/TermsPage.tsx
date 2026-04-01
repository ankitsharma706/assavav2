import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowUp, Mail, ShieldCheck, FileText, Scale, ShoppingBag, CreditCard, Truck, RefreshCcw, Landmark, Calendar, UserCheck, AlertCircle, Lock, Edit3 } from 'lucide-react';
import { Navbar, Footer, ScrollIndicator } from '../components/CoffeeComponents';
import { cn } from '../lib/utils';

// --- Types ---
type TermsProps = {
  cartCount: number;
  wishlistCount?: number;
  onOpenCart: () => void;
  onOpenCategories: () => void;
};

const SECTIONS = [
  { id: 'introduction', title: '1. Introduction', icon: FileText },
  { id: 'website-use', title: '2. Use of Website', icon: UserCheck },
  { id: 'products', title: '3. Products & Orders', icon: ShoppingBag },
  { id: 'payments', title: '4. Payments', icon: CreditCard },
  { id: 'shipping', title: '5. Shipping & Delivery', icon: Truck },
  { id: 'returns', title: '6. Returns & Refunds', icon: RefreshCcw },
  { id: 'intellectual-property', title: '7. Intellectual Property', icon: Landmark },
  { id: 'events', title: '8. Events & Experiences', icon: Calendar },
  { id: 'user-content', title: '9. User Content', icon: Edit3 },
  { id: 'liability', title: '10. Limitation of Liability', icon: AlertCircle },
  { id: 'privacy', title: '11. Privacy', icon: Lock },
  { id: 'changes', title: '12. Changes to Terms', icon: ShieldCheck },
  { id: 'contact', title: '13. Contact Information', icon: Mail },
];

const TermsPage: React.FC<TermsProps> = ({ cartCount, onOpenCart, onOpenCategories, wishlistCount = 0 }) => {
  const [activeSection, setActiveSection] = useState('introduction');
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of SECTIONS) {
        const element = sectionRefs.current[section.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      const offset = element.offsetTop - 100;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-coffee-dark text-cream min-h-screen relative selection:bg-caramel/20 selection:text-caramel">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.04] mix-blend-overlay grain" />
      
      <Navbar 
        onOpenCart={onOpenCart} 
        onOpenCategories={onOpenCategories} 
        cartCount={cartCount} 
        wishlistCount={wishlistCount} 
      />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-48 pb-32 px-6 border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="block font-mono text-[10px] uppercase tracking-[0.5em] text-caramel mb-8 font-bold">The Legal Framework</span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 font-serif text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)] uppercase italic">
              Terms & <br /> <span className="text-caramel italic font-light lowercase">Conditions</span>
            </h1>
            <p className="text-xl md:text-2xl text-cream/60 max-w-2xl mx-auto font-light leading-relaxed tracking-wide italic font-serif">
              "Transparency, trust, and clarity in every interaction."
            </p>
          </motion.div>
        </div>

        {/* Decorative Background Image (Faded) */}
        <div className="absolute inset-0 z-0 opacity-[0.1] grayscale scale-110 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1502462041640-b3d7e50d0662?auto=format&fit=crop&q=80&w=2400" 
            alt="Old Paper Texture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark via-transparent to-coffee-dark" />
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-20 items-start">
        
        {/* Sticky Sidebar Navigation */}
        <aside className="hidden lg:block sticky top-32 max-h-[80vh] overflow-y-auto pr-8 scrollbar-hide border-r border-white/5">
          <nav className="space-y-3">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "flex items-center gap-4 w-full text-left py-3 px-4 rounded-xl transition-all duration-500 group border-l-2",
                  activeSection === section.id 
                    ? "bg-white/[0.05] text-caramel border-caramel shadow-[0_0_20px_rgba(198,142,93,0.1)] transform scale-105" 
                    : "text-cream/30 border-transparent hover:bg-white/[0.02] hover:text-cream/60"
                )}
              >
                <section.icon className={cn(
                  "w-4 h-4 transition-transform duration-500",
                  activeSection === section.id ? "scale-110 text-caramel" : "group-hover:scale-110"
                )} />
                <span className="text-[10px] uppercase tracking-widest font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                  {section.title}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Terms Content */}
        <main className="space-y-32">
          
          {/* 1. Introduction */}
          <section id="introduction" ref={(el) => { sectionRefs.current['introduction'] = el; }} className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-caramel">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-serif italic text-white uppercase italic">1. Introduction</h2>
            </div>
            <div className="prose prose-invert max-w-none text-lg text-cream/70 font-serif italic leading-[1.8]">
              <p className="mb-6">
                Welcome to ASSAVA. These Terms & Conditions govern your use of our platform and the purchase of our artisanal coffee products and experiences. By accessing our website, you agree to be bound by these legal frameworks.
              </p>
              <p>
                Our mission is to provide more than just coffee—we aim to deliver a cinematic ritual. These terms ensure that the relationship between ASSAVA and our devoted community remains respectful, transparent, and legally sound.
              </p>
            </div>
          </section>

          {/* 2. Use of Website */}
          <section id="website-use" ref={(el) => { sectionRefs.current['website-use'] = el; }} className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-caramel">
                <UserCheck className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-serif italic text-white uppercase italic">2. Use of Website</h2>
            </div>
            <div className="prose prose-invert max-w-none text-lg text-cream/70 font-serif italic leading-[1.8]">
              <p className="mb-6">
                Eligibility: By using this site, you represent that you are at least the age of majority in your jurisdiction.
              </p>
              <ul className="list-disc pl-6 space-y-4 marker:text-caramel">
                <li>User Responsibilities: You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>Acceptable Use: You agree not to use the platform for any unlawful purpose or to transmit any harmful code or content.</li>
                <li>Account Termination: ASSAVA reserves the right to terminate accounts that violate these guidelines without prior notice.</li>
              </ul>
            </div>
          </section>

          {/* 3. Products & Orders */}
          <section id="products" ref={(el) => { sectionRefs.current['products'] = el; }} className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-caramel">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-serif italic text-white uppercase italic">3. Products & Orders</h2>
            </div>
            <div className="prose prose-invert max-w-none text-lg text-cream/70 font-serif italic leading-[1.8]">
              <p className="mb-6">
                Artisanal Accuracy: We make every effort to display product colors and textures accurately. However, as coffee is a natural crop, slight variations are part of the artisanal journey.
              </p>
              <ul className="list-disc pl-6 space-y-4 marker:text-caramel">
                <li>Pricing: All prices are subject to change based on market conditions, though we strive for absolute transparency.</li>
                <li>Order Acceptance: We reserve the right to refuse or cancel any order for reasons including stock availability or concerns of fraudulent activity.</li>
                <li>Bulk Orders: Large volume orders may be subject to specific separate agreements.</li>
              </ul>
            </div>
          </section>

          {/* 4. Payments */}
          <section id="payments" ref={(el) => { sectionRefs.current['payments'] = el; }} className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-caramel">
                <CreditCard className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-serif italic text-white uppercase italic">4. Payments</h2>
            </div>
            <div className="prose prose-invert max-w-none text-lg text-cream/70 font-serif italic leading-[1.8]">
              <p className="mb-6">
                Secure Rituals: Your financial safety is paramount. We use encrypted payment gateways to process all transactions.
              </p>
              <p>
                Methods: We accept all major credit cards, UPI, and digital wallets as displayed during checkout. All taxes are calculated based on region and will be clearly shown before finalization.
              </p>
            </div>
          </section>

          {/* 5. Shipping & Delivery */}
          <section id="shipping" ref={(el) => { sectionRefs.current['shipping'] = el; }} className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-caramel">
                <Truck className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-serif italic text-white uppercase italic">5. Shipping & Delivery</h2>
            </div>
            <div className="prose prose-invert max-w-none text-lg text-cream/70 font-serif italic leading-[1.8]">
              <p className="mb-6">
                Freshness Priority: We ship within 24-48 hours of roasting to ensure you receive the peak profile of the bean.
              </p>
              <ul className="list-disc pl-6 space-y-4 marker:text-caramel">
                <li>Timelines: Expect delivery within 3-7 business days depending on your location.</li>
                <li>Delays: While we partner with premium carriers, we are not responsible for delays caused by atmospheric conditions or regional logistical hurdles.</li>
                <li>Tracking: Every order includes a cinematic tracking link sent via email.</li>
              </ul>
            </div>
          </section>

          {/* 6. Returns & Refunds */}
          <section id="returns" ref={(el) => { sectionRefs.current['returns'] = el; }} className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-caramel">
                <RefreshCcw className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-serif italic text-white uppercase italic">6. Returns & Refunds</h2>
            </div>
            <div className="prose prose-invert max-w-none text-lg text-cream/70 font-serif italic leading-[1.8]">
              <p className="mb-6">
                Perishable Policy: Due to the fresh-roasted and perishable nature of coffee beans, we do not accept returns on coffee once opened.
              </p>
              <ul className="list-disc pl-6 space-y-4 marker:text-caramel">
                <li>Damaged Goods: If your package arrives compromised, contact us within 24 hours for a full replacement.</li>
                <li>Equipment: Non-perishable hardware (drippers, kettles) can be returned within 14 days if in original, unused packaging.</li>
              </ul>
            </div>
          </section>

          {/* 7. Intellectual Property */}
          <section id="intellectual-property" ref={(el) => { sectionRefs.current['intellectual-property'] = el; }} className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-caramel">
                <Landmark className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-serif italic text-white uppercase italic">7. Intellectual Property</h2>
            </div>
            <div className="prose prose-invert max-w-none text-lg text-cream/70 font-serif italic leading-[1.8]">
              <p>
                The visual identity of ASSAVA, including all logos, cinematic photography, illustrations, and narrative textures, is the exclusive property of our brand. Reproduction, imitation, or unauthorized digital extraction is strictly prohibited.
              </p>
            </div>
          </section>

          {/* 8. Events & Experiences */}
          <section id="events" ref={(el) => { sectionRefs.current['events'] = el; }} className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-caramel">
                <Calendar className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-serif italic text-white uppercase italic">8. Events & Experiences</h2>
            </div>
            <div className="prose prose-invert max-w-none text-lg text-cream/70 font-serif italic leading-[1.8]">
              <ul className="list-disc pl-6 space-y-4 marker:text-caramel">
                <li>Registration: Event tickets are valid only for the specified date and session.</li>
                <li>Cancellation: Refunds for event cancellations are available up to 48 hours before the start time.</li>
                <li>Conduct: Attendees are expected to respect the sanctuary of our café spaces. We reserve the right to escort guests out if conduct is disruptive.</li>
              </ul>
            </div>
          </section>

          {/* 9. User Content */}
          <section id="user-content" ref={(el) => { sectionRefs.current['user-content'] = el; }} className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-caramel">
                <Edit3 className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-serif italic text-white uppercase italic">9. User Content</h2>
            </div>
            <div className="prose prose-invert max-w-none text-lg text-cream/70 font-serif italic leading-[1.8]">
              <p>
                By submitting reviews or photography tagged with our brand identifiers, you grant ASSAVA a non-exclusive license to use that material in our digital narratives. We reserve the right to moderate or remove content that violates our community aesthetic or values.
              </p>
            </div>
          </section>

          {/* 10. Liability */}
          <section id="liability" ref={(el) => { sectionRefs.current['liability'] = el; }} className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-caramel">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-serif italic text-white uppercase italic">10. Limitation of Liability</h2>
            </div>
            <div className="prose prose-invert max-w-none text-lg text-cream/70 font-serif italic leading-[1.8]">
              <p>
                ASSAVA is not liable for indirect, incidental, or consequential damages arising from the use of our website or products. We do not guarantee that the platform will be 100% interruption-free due to the nature of global networks.
              </p>
            </div>
          </section>

          {/* 11. Privacy */}
          <section id="privacy" ref={(el) => { sectionRefs.current['privacy'] = el; }} className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-caramel">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-serif italic text-white uppercase italic">11. Privacy</h2>
            </div>
            <div className="prose prose-invert max-w-none text-lg text-cream/70 font-serif italic leading-[1.8]">
              <p>
                Your privacy is integrated into our platform's DNA. Please review our full <strong>Privacy Policy</strong> to understand how we protect and manage your data with zero compromise.
              </p>
            </div>
          </section>

          {/* 12. Changes to Terms */}
          <section id="changes" ref={(el) => { sectionRefs.current['changes'] = el; }} className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-caramel">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-serif italic text-white uppercase italic">12. Changes to Terms</h2>
            </div>
            <div className="prose prose-invert max-w-none text-lg text-cream/70 font-serif italic leading-[1.8]">
              <p>
                We reserve the right to update these terms at any time as our brand evolves. Major changes will be communicated via our digital narrative feed or email. Continued use of the platform constitutes agreement to updated terms.
              </p>
            </div>
          </section>

          {/* 13. Contact Information */}
          <section id="contact" ref={(el) => { sectionRefs.current['contact'] = el; }} className="py-20 scroll-mt-32 border-t border-white/5">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-caramel">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-serif italic text-white uppercase italic">13. Contact</h2>
            </div>
            <div className="prose prose-invert max-w-none text-lg text-cream/70 font-serif italic leading-[1.8]">
              <p className="mb-10">
                If you seek clarity on any aspect of our terms, we welcome your inquiry at:
              </p>
              <a href="mailto:hello@assavacoffee.com" className="text-3xl md:text-4xl font-serif text-white hover:text-caramel transition-colors underline underline-offset-8 decoration-caramel/30">
                hello@assavacoffee.com
              </a>
            </div>
          </section>

        </main>
      </div>

      {/* --- BACK TO TOP BUTTON --- */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-10 right-10 z-[110] w-14 h-14 bg-caramel text-coffee-dark rounded-full flex items-center justify-center shadow-2xl shadow-caramel/20 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        <ArrowUp className="w-6 h-6 relative z-10" />
      </motion.button>

      <Footer />
    </div>
  );
};

export default TermsPage;
