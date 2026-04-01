import React, { useState } from 'react';
import { Navbar } from '../components/CoffeeComponents';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, HelpCircle, ChevronDown, LogOut, Package, Settings, Heart, CheckCircle2, ShoppingBag } from 'lucide-react';

import { CoffeeCard } from '../components/CoffeeComponents';

const Account = ({ cartCount, wishlistCount, wishlist, onToggleWishlist, onOpenCart, onOpenCategories }: { cartCount: number, wishlistCount: number, wishlist: any[], onToggleWishlist: (item: any) => void, onOpenCart: () => void, onOpenCategories: () => void }) => {
  const [activeTab, setActiveTab] = useState('Wishlist');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const faqs = [
    { q: "How do you source your beans?", a: "We source our beans through direct trade with small-scale volcanic farmers in Ethiopia, Colombia, and Indonesia." },
    { q: "What is your roasting philosophy?", a: "We believe in precision. Each batch is roasted to highlight the unique cinematic profile of the origin." },
    { q: "Do you offer international shipping?", a: "Yes, we ship our cinematic coffee experiences to over 50 countries worldwide." }
  ];

  const handleUpdate = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const menuItems = [
    { icon: Package, label: "Orders" },
    { icon: Heart, label: "Wishlist" },
    { icon: Settings, label: "Settings" },
    { icon: LogOut, label: "Sign Out", color: "text-red-500" }
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen bg-coffee-dark"
    >
      <div className="grain" />
      <Navbar 
        onOpenCart={onOpenCart} 
        onOpenCategories={onOpenCategories} 
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />
      
      <section className="section-padding pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-caramel font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">Profile</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-glow uppercase">Your Account</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4 relative z-10">
              <div className="glass rounded-[40px] p-8 space-y-8 border-white/5">
                <div className="flex flex-col items-center gap-6 pb-8 border-b border-white/5">
                  <div className="w-24 h-24 rounded-full glass flex items-center justify-center border-white/10 group">
                    <User className="w-12 h-12 text-cream group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold tracking-tighter uppercase">Elena Vance</h3>
                    <p className="text-[10px] text-cream/60 uppercase tracking-[0.2em] font-bold">Member since 2024</p>
                  </div>
                </div>
                
                <nav className="space-y-2">
                  {menuItems.map((item, i) => (
                    <button 
                      key={i} 
                      onClick={() => item.label !== "Sign Out" ? setActiveTab(item.label) : alert("Signing out...")}
                      className={`w-full flex items-center gap-4 px-6 py-4 rounded-full glass border-white/5 hover:glow-border transition-all text-[10px] font-bold uppercase tracking-[0.4em] ${
                        activeTab === item.label ? 'bg-white/10 text-cream glow-border border-white/20' : item.color || 'text-cream/60 hover:text-cream'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12 relative z-10">
              <AnimatePresence mode="wait">
                {activeTab === 'Settings' && (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="glass rounded-[60px] p-12 space-y-12 border-white/5 relative overflow-hidden"
                  >
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-caramel/10 rounded-full blur-[100px] pointer-events-none" />
                    
                    <div className="flex items-center gap-4 text-cream relative z-10">
                      <MapPin className="w-6 h-6" />
                      <h3 className="text-2xl font-bold tracking-tighter uppercase">Ritual Delivery Address</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-[0.5em] text-cream/60">Full Name</label>
                        <input 
                          type="text" 
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          placeholder="Elena Vance" 
                          className="w-full glass rounded-[30px] px-8 py-5 border-white/10 focus:border-cream/50 outline-none text-cream/80 placeholder:text-cream/10" 
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-[0.5em] text-cream/60">Phone Number</label>
                        <input 
                          type="text"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+1 (555) 000-0000" 
                          className="w-full glass rounded-[30px] px-8 py-5 border-white/10 focus:border-cream/50 outline-none text-cream/80 placeholder:text-cream/10" 
                        />
                      </div>
                      <div className="md:col-span-2 space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-[0.5em] text-cream/60">Address</label>
                        <input 
                          type="text" 
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          placeholder="123 Ritual Lane, Apt 4B" 
                          className="w-full glass rounded-[30px] px-8 py-5 border-white/10 focus:border-cream/50 outline-none text-cream/80 placeholder:text-cream/10" 
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-[0.5em] text-cream/60">City</label>
                        <input 
                          type="text" 
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          placeholder="Brooklyn" 
                          className="w-full glass rounded-[30px] px-8 py-5 border-white/10 focus:border-cream/50 outline-none text-cream/80 placeholder:text-cream/10" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <label className="text-[10px] font-bold uppercase tracking-[0.5em] text-cream/60">State</label>
                          <input 
                            type="text" 
                            value={formData.state}
                            onChange={(e) => setFormData({...formData, state: e.target.value})}
                            placeholder="NY" 
                            className="w-full glass rounded-[30px] px-8 py-5 border-white/10 focus:border-cream/50 outline-none text-cream/80 placeholder:text-cream/10" 
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-bold uppercase tracking-[0.5em] text-cream/60">Pin Code</label>
                          <input 
                            type="text" 
                            value={formData.zip}
                            onChange={(e) => setFormData({...formData, zip: e.target.value})}
                            placeholder="11201" 
                            className="w-full glass rounded-[30px] px-8 py-5 border-white/10 focus:border-cream/50 outline-none text-cream/80 placeholder:text-cream/10" 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={handleUpdate}
                      className="group relative px-12 py-5 rounded-full overflow-hidden glass border-white/10 hover:glow-border transition-all duration-500 flex items-center justify-center gap-4 relative z-10"
                    >
                      <div className={`absolute inset-0 bg-caramel/20 transition-transform duration-500 ${isSaved ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`} />
                      <span className="relative z-10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-cream group-hover:text-cream transition-colors">
                        {isSaved ? <><CheckCircle2 className="w-4 h-4" /> Updated</> : 'Update Address'}
                      </span>
                    </button>
                  </motion.div>
                )}

                {activeTab === 'Orders' && (
                  <motion.div
                    key="orders"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="glass rounded-[60px] p-12 space-y-8 border-white/5 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]"
                  >
                    <ShoppingBag className="w-16 h-16 text-cream/20 mb-4" />
                    <h3 className="text-2xl font-bold tracking-tighter uppercase text-cream/60">No recent orders</h3>
                    <p className="text-sm font-light text-cream/40">Your cinematic coffee journey awaits.</p>
                  </motion.div>
                )}

                {activeTab === 'Wishlist' && (
                  <motion.div
                    key="wishlist"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-12"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-cream">
                        <Heart className="w-6 h-6 text-caramel fill-caramel" />
                        <h3 className="text-2xl font-bold tracking-tighter uppercase">Saved Rituals</h3>
                      </div>
                      <span className="text-[10px] text-cream/40 uppercase tracking-[0.3em] font-bold">{wishlist.length} Items</span>
                    </div>

                    {wishlist.length === 0 ? (
                      <div className="glass rounded-[40px] p-20 flex flex-col items-center justify-center min-h-[300px] border-white/5 bg-white/2">
                        <Heart className="w-16 h-16 text-cream/10 mb-6" />
                        <h3 className="text-xl font-bold tracking-tighter uppercase text-cream/40 px-10 text-center">Your wishlist is empty</h3>
                        <p className="text-[10px] text-cream/20 uppercase tracking-[0.4em] font-bold mt-2">Save your favorite blends for later.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {wishlist.map((item) => (
                          <CoffeeCard 
                            key={item.id} 
                            {...item} 
                            title={item.name || item.title}
                            onToggleWishlist={onToggleWishlist}
                            isWishlisted={true}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* FAQ Section */}
              <div className="glass rounded-[60px] p-12 space-y-12 border-white/5">
                <div className="flex items-center gap-4 text-cream">
                  <HelpCircle className="w-6 h-6" />
                  <h3 className="text-2xl font-bold tracking-tighter uppercase">Ritual FAQ</h3>
                </div>
                
                <div className="space-y-6">
                  {faqs.map((faq, i) => (
                    <div 
                      key={i} 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="glass rounded-[40px] p-8 border-white/5 space-y-4 group cursor-pointer hover:bg-white/5 transition-all overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-bold tracking-tighter uppercase text-cream/80 group-hover:text-cream transition-colors">{faq.q}</h4>
                        <ChevronDown className={`w-5 h-5 text-cream/20 group-hover:text-cream transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                      </div>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.p 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="text-sm font-light text-cream/60 leading-relaxed overflow-hidden"
                          >
                            {faq.a}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </motion.main>
  );
};

export default Account;
