import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Cookie,
  Eye,
  FileText,
  Mail,
  UserCheck,
  Server,
  Globe,
  ArrowUp,
  AlertCircle
} from 'lucide-react';
import { Navbar, Footer } from '../components/CoffeeComponents';
import Breadcrumb from '../components/Breadcrumb';
import { applySEO } from '../lib/seo';
import JsonLd from '../components/JsonLd';
import { generateOrganizationSchema } from '../lib/schema';
import AdUnit from '../components/AdSense/AdUnit';

type PrivacyProps = {
  cartCount: number;
  wishlistCount?: number;
  onOpenCart: () => void;
  onOpenCategories: () => void;
};

const PRIVACY_SECTIONS = [
  { id: 'overview', title: '1. Overview & Commitment', icon: ShieldCheck },
  { id: 'cookies-adsense', title: '2. Google AdSense & Cookies', icon: Cookie },
  { id: 'data-collection', title: '3. Information We Collect', icon: Eye },
  { id: 'usage', title: '4. How We Use Data', icon: Server },
  { id: 'gdpr-ccpa', title: '5. GDPR & CCPA Rights', icon: UserCheck },
  { id: 'opt-out', title: '6. Opt-Out & Preferences', icon: Lock },
  { id: 'security', title: '7. Data Security & Retention', icon: FileText },
  { id: 'contact', title: '8. Contact Our Officer', icon: Mail },
];

export const PrivacyPolicy: React.FC<PrivacyProps> = ({
  cartCount,
  onOpenCart,
  onOpenCategories,
  wishlistCount = 0,
}) => {
  const [activeSection, setActiveSection] = useState('overview');
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    applySEO({
      title: 'Privacy Policy & Cookie Disclosures',
      description: 'Comprehensive Privacy Policy for Assava Specialty Coffee. Read our disclosures regarding Google AdSense, DART cookies, analytics, GDPR, and consumer rights.',
      canonical: '/privacy-policy',
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (const section of PRIVACY_SECTIONS) {
        const el = sectionRefs.current[section.id];
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const offset = el.offsetTop - 120;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#1A120B] text-[#F5F5DC] min-h-screen relative selection:bg-[#C68E5D]/20 selection:text-[#C68E5D]">
      <JsonLd id="privacy-org-schema" data={generateOrganizationSchema()} />
      <Navbar
        onOpenCart={onOpenCart}
        onOpenCategories={onOpenCategories}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      {/* Hero Section */}
      <header className="relative pt-44 pb-20 px-6 border-b border-[#C68E5D]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Breadcrumb items={[{ name: 'Privacy Policy', path: '/privacy-policy' }]} className="justify-center mb-6" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block font-mono text-[10px] uppercase tracking-[0.5em] text-[#C68E5D] mb-4 font-bold">
              Legal Transparency
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 font-serif text-white uppercase italic">
              Privacy <span className="text-[#C68E5D] font-light lowercase">Policy</span>
            </h1>
            <p className="text-lg md:text-xl text-[#F5F5DC]/60 max-w-2xl mx-auto font-serif italic">
              "Respecting your digital sovereignty with the same care we pour into our roasts."
            </p>
            <div className="mt-6 text-xs font-mono text-[#C68E5D]/60 uppercase tracking-widest">
              Last Updated: October 2026 • Effective Immediately
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content Layout with Sidebar Spy */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Sticky Table of Contents */}
        <aside className="hidden lg:block lg:col-span-4">
          <div className="sticky top-32 bg-[#140D08]/60 backdrop-blur-xl border border-[#C68E5D]/10 rounded-3xl p-8 space-y-6">
            <span className="block font-mono text-[10px] uppercase tracking-[0.4em] text-[#C68E5D] font-bold">
              Policy Table of Contents
            </span>
            <nav className="space-y-2">
              {PRIVACY_SECTIONS.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs uppercase tracking-wider font-bold transition-all ${
                      isActive
                        ? 'bg-[#C68E5D] text-[#1A120B] shadow-lg shadow-[#C68E5D]/20 translate-x-1'
                        : 'text-[#F5F5DC]/50 hover:text-[#F5F5DC] hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{sec.title}</span>
                  </button>
                );
              })}
            </nav>
            <div className="pt-6 border-t border-[#C68E5D]/10 text-[11px] text-[#F5F5DC]/40 font-serif italic">
              Need assistance? Email{' '}
              <a href="mailto:hello@assavacoffee.com" className="text-[#C68E5D] underline">
                hello@assavacoffee.com
              </a>
            </div>
          </div>
        </aside>

        {/* Legal Text Column */}
        <main className="lg:col-span-8 space-y-16">
          {/* Section 1 */}
          <section
            id="overview"
            ref={(el) => { sectionRefs.current['overview'] = el; }}
            className="scroll-mt-32 space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#C68E5D] border border-[#C68E5D]/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-white uppercase italic">
                1. Overview & Commitment
              </h2>
            </div>
            <div className="prose prose-invert text-base md:text-lg text-[#F5F5DC]/70 font-serif leading-relaxed space-y-4">
              <p>
                At ASSAVA ("we", "our", or "us"), we operate the luxury coffee catalog, online platform, and ritual experience at <strong>https://maxcnfront.vercel.app</strong>. We understand that your privacy is sacred. This Privacy Policy details our practices concerning the collection, storage, use, and disclosure of your personal information when using our services.
              </p>
              <p>
                By accessing or using ASSAVA, you acknowledge and agree to the policies described herein. If you disagree with any segment of this disclosure, please discontinue use of our site.
              </p>
            </div>
          </section>

          {/* Section 2 - CRITICAL FOR GOOGLE ADSENSE COMPLIANCE */}
          <section
            id="cookies-adsense"
            ref={(el) => { sectionRefs.current['cookies-adsense'] = el; }}
            className="scroll-mt-32 space-y-6 border-t border-[#C68E5D]/10 pt-16"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#C68E5D]/10 rounded-2xl flex items-center justify-center text-[#C68E5D] border border-[#C68E5D]/30">
                <Cookie className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-white uppercase italic">
                2. Google AdSense & Advertising Cookies
              </h2>
            </div>

            <div className="bg-[#140D08] border border-[#C68E5D]/30 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-[#C68E5D] text-xs font-mono font-bold uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                <span>Mandatory AdSense Compliance Notice</span>
              </div>
              <p className="text-sm font-serif text-[#F5F5DC]/80 leading-relaxed">
                Google, as a third-party advertising vendor, serves advertisements across approved content sections of ASSAVA. Please review our exact advertising and cookie operational disclosures below:
              </p>
            </div>

            <div className="prose prose-invert text-base md:text-lg text-[#F5F5DC]/70 font-serif leading-relaxed space-y-4">
              <p>
                <strong>Third-Party Vendor Disclosures:</strong> Third-party vendors, including Google, use cookies to serve ads based on your prior visits to our website or other websites across the Internet.
              </p>
              <p>
                <strong>DoubleClick & Advertising Cookies:</strong> Google's use of advertising cookies (including the DoubleClick DART cookie) enables Google and its partners to serve ads to our visitors based on their visits to ASSAVA and/or other sites on the Internet.
              </p>
              <p>
                <strong>User Opt-Out Choices:</strong> You may opt out of personalized advertising by visiting Google's official Ad Settings page at{' '}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C68E5D] underline font-bold"
                >
                  https://adssettings.google.com
                </a>
                . Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting the Digital Advertising Alliance Consumer Choice page at{' '}
                <a
                  href="https://optout.aboutads.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C68E5D] underline font-bold"
                >
                  www.aboutads.info
                </a>{' '}
                or the Network Advertising Initiative opt-out page at{' '}
                <a
                  href="https://optout.networkadvertising.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C68E5D] underline font-bold"
                >
                  optout.networkadvertising.org
                </a>.
              </p>
              <p>
                <strong>Publisher Ad Guardrails:</strong> In accordance with Google AdSense program policies, ads are strictly prohibited and technically isolated from loading on blank screens, loading placeholders, error pages, authentication views, and transactional checkouts.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section
            id="data-collection"
            ref={(el) => { sectionRefs.current['data-collection'] = el; }}
            className="scroll-mt-32 space-y-6 border-t border-[#C68E5D]/10 pt-16"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#C68E5D] border border-[#C68E5D]/20">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-white uppercase italic">
                3. Information We Collect
              </h2>
            </div>
            <div className="prose prose-invert text-base md:text-lg text-[#F5F5DC]/70 font-serif leading-relaxed space-y-4">
              <p>We collect information you explicitly provide and automated technical metrics:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Personal Identity:</strong> Name, email address, phone number, and physical shipping address when completing an inquiry or creating an account profile.
                </li>
                <li>
                  <strong>Order & Transaction Records:</strong> Order items, roast grind selections, and payment confirmation tokens processed securely through certified gateway partners (Razorpay). We do not store raw card numbers.
                </li>
                <li>
                  <strong>Log Data:</strong> Internet Protocol (IP) addresses, browser type, Internet Service Provider (ISP), referring/exit pages, date/time stamps, and clickstream analysis.
                </li>
              </ul>
            </div>
          </section>

          {/* Contextual Ad Placement between legal blocks */}
          <AdUnit slotId="privacy-policy-mid" format="horizontal" minHeight={120} />

          {/* Section 4 */}
          <section
            id="usage"
            ref={(el) => { sectionRefs.current['usage'] = el; }}
            className="scroll-mt-32 space-y-6 border-t border-[#C68E5D]/10 pt-16"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#C68E5D] border border-[#C68E5D]/20">
                <Server className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-white uppercase italic">
                4. How We Use Your Data
              </h2>
            </div>
            <div className="prose prose-invert text-base md:text-lg text-[#F5F5DC]/70 font-serif leading-relaxed space-y-4">
              <p>We process collected information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fulfill coffee shipments, brew workshops, and concierge inquiries.</li>
                <li>Operate, audit, and improve site speed and accessibility.</li>
                <li>Prevent fraudulent transactions and protect digital infrastructure.</li>
                <li>Comply with statutory commercial and taxation regulations.</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section
            id="gdpr-ccpa"
            ref={(el) => { sectionRefs.current['gdpr-ccpa'] = el; }}
            className="scroll-mt-32 space-y-6 border-t border-[#C68E5D]/10 pt-16"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#C68E5D] border border-[#C68E5D]/20">
                <UserCheck className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-white uppercase italic">
                5. GDPR & CCPA / CPRA Consumer Rights
              </h2>
            </div>
            <div className="prose prose-invert text-base md:text-lg text-[#F5F5DC]/70 font-serif leading-relaxed space-y-4">
              <p>
                <strong>European Union (GDPR):</strong> If you reside within the European Economic Area (EEA), you enjoy explicit statutory rights including the Right to Access, Rectification, Erasure ("Right to be Forgotten"), Data Portability, and Restriction of Processing.
              </p>
              <p>
                <strong>California Consumer Privacy (CCPA / CPRA):</strong> California residents have the right to request disclosure of personal information categories collected, request deletion of personal information, and opt out of the sale or sharing of personal data. ASSAVA does not sell personal data for monetary consideration.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section
            id="opt-out"
            ref={(el) => { sectionRefs.current['opt-out'] = el; }}
            className="scroll-mt-32 space-y-6 border-t border-[#C68E5D]/10 pt-16"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#C68E5D] border border-[#C68E5D]/20">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-white uppercase italic">
                6. Cookie Preferences & Browser Controls
              </h2>
            </div>
            <div className="prose prose-invert text-base md:text-lg text-[#F5F5DC]/70 font-serif leading-relaxed space-y-4">
              <p>
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent via your browser preferences (Chrome, Safari, Firefox, Edge). If you choose to reject cookies, some features such as persistent cart preservation or custom grind recommendations may operate with reduced functionality.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section
            id="security"
            ref={(el) => { sectionRefs.current['security'] = el; }}
            className="scroll-mt-32 space-y-6 border-t border-[#C68E5D]/10 pt-16"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#C68E5D] border border-[#C68E5D]/20">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-white uppercase italic">
                7. Data Security & Storage
              </h2>
            </div>
            <div className="prose prose-invert text-base md:text-lg text-[#F5F5DC]/70 font-serif leading-relaxed space-y-4">
              <p>
                We employ industry-standard TLS 1.3 encryption across all communication endpoints. Access to patron records is strictly partitioned and restricted to authorized operational personnel bound by non-disclosure agreements.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section
            id="contact"
            ref={(el) => { sectionRefs.current['contact'] = el; }}
            className="scroll-mt-32 space-y-6 border-t border-[#C68E5D]/10 pt-16 pb-12"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#C68E5D] border border-[#C68E5D]/20">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-white uppercase italic">
                8. Contact Our Privacy Officer
              </h2>
            </div>
            <div className="prose prose-invert text-base md:text-lg text-[#F5F5DC]/70 font-serif leading-relaxed space-y-4">
              <p>
                For privacy inquiries, GDPR/CCPA data requests, or compliance verifications, please contact our designated Data Protection Officer:
              </p>
              <div className="p-8 bg-[#140D08] border border-[#C68E5D]/20 rounded-2xl space-y-3">
                <div className="text-xl font-bold font-serif text-white">ASSAVA Coffee Compliance Team</div>
                <div className="text-sm font-mono text-[#C68E5D]">Attn: Data Protection Officer</div>
                <div className="text-sm text-[#F5F5DC]/70">District Centre, Chandrasekharpur, Bhubaneswar, Odisha 751024, India</div>
                <div className="text-sm">
                  Email:{' '}
                  <a
                    href="mailto:hello@assavacoffee.com"
                    className="text-[#C68E5D] underline font-bold"
                  >
                    hello@assavacoffee.com
                  </a>
                </div>
                <div className="text-sm">Phone: +91 9000 8000 12</div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
