import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/CoffeeComponents';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, ShieldCheck, Lock } from 'lucide-react';
import { cn } from '../lib/utils';

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID; // Precision Token Sync

const Payment = ({ cartCount, wishlistCount, cart, cartTotal, onOpenCart, onOpenCategories }: { 
  cartCount: number, 
  wishlistCount: number, 
  cart: any[], 
  cartTotal: number, 
  onOpenCart: () => void, 
  onOpenCategories: () => void 
}) => {
  const navigate = useNavigate();
  const shipping = cartTotal > 150 ? 0 : 15.00;
  const total = cartTotal + shipping;
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleRazorpayPayment = () => {
    if (!RAZORPAY_KEY_ID || RAZORPAY_KEY_ID === "rzp_test_placeholder") {
      alert("Razorpay Key ID is not configured. Please check your environment ritual.");
      return;
    }
    if ((window as any).Razorpay) {
      setIsProcessing(true);
      
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: Math.round(total * 100), // Amount in paise
        currency: "INR",
        name: "ASSAVA",
        description: "Luxury Coffee Ritual",
        image: "/logo.png",
        handler: function (response: any) {
          setIsProcessing(false);
          // console.log("Payment Successful!", response);
          navigate('/thankyou');
        },
        prefill: {
          name: "Ankit Kumar",
          email: "ankitkumar999090@gmail.com",
          contact: "9999999999"
        },
        theme: {
          color: "#C68E5D" // Assava Caramel
        }
      };

      const rzp = new (window as any).Razorpay(options);
      
      rzp.on('payment.failed', function (response: any) {
        setIsProcessing(false);
        alert(response.error.description);
      });

      rzp.open();
    } else {
      alert("Razorpay script not loaded. Please try again.");
    }
  };

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
        <div className="max-w-3xl mx-auto">
          <Link to="/cart" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-cream hover:text-cream transition-colors mb-12 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Back to Ritual
          </Link>
          
          <div className="mb-16">
            <span className="text-caramel font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">Secure Checkout</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-glow uppercase">Payment Ritual</h1>
          </div>
          
          <div className="glass rounded-[60px] p-12 space-y-12 border-white/5 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-caramel/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="space-y-8 relative z-10 text-center">
              <div className="flex flex-col items-center gap-6 text-cream">
                <div className="w-24 h-24 rounded-full glass flex items-center justify-center border border-caramel/30 shadow-[0_0_40px_rgba(198,142,93,0.3)]">
                  <CreditCard className="w-10 h-10 text-caramel" />
                </div>
                <h3 className="text-3xl font-bold tracking-tighter uppercase">Initiate Secure Payment</h3>
                <p className="text-cream/40 text-sm max-w-sm italic">"The final step in your sensory journey. Secure your ritual with precision-calibrated payment rituals."</p>
              </div>
            </div>
            
            <div className="pt-12 border-t border-white/5 space-y-8 relative z-10">
              <div className="flex items-center justify-between text-xl font-bold text-cream">
                <span className="uppercase tracking-tighter">Total Ritual Value</span>
                <span className="text-cream">Rs{total.toFixed(2)}</span>
              </div>
              
              <button 
                onClick={handleRazorpayPayment}
                disabled={isProcessing}
                className="w-full group relative px-12 py-6 rounded-full overflow-hidden glass border-white/10 hover:glow-border transition-all duration-500 flex items-center justify-center gap-4 bg-caramel/5 active:scale-[0.98] disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-caramel/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <Lock className={cn("w-5 h-5 text-caramel group-hover:text-cream transition-colors", isProcessing && "animate-spin")} />
                <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.4em] text-cream group-hover:text-cream transition-colors">
                  {isProcessing ? "Processing Discovery..." : "Complete Discovery with Razorpay"}
                </span>
              </button>
              
              <div className="flex items-center justify-center gap-8 text-cream/20">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">UPI Ready</span>
                </div>
              </div>
              
              <div className="pt-8 flex justify-center items-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="h-6" />
                <div className="w-[1px] h-4 bg-white/10" />
                <span className="text-[8px] font-bold uppercase tracking-[0.3em]">Official Payment Partner</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </motion.main>
  );
};

export default Payment;
