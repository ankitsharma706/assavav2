import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Account from './pages/Account';
import About from './pages/About';
import ReviewsPage from './pages/ReviewsPage';
import EventsListing from './pages/EventsListing';
import EventDetail from './pages/EventDetail';
import EventRouter from './pages/EventRouter';
import CinematicEventDetail from './pages/CinematicEventDetail';
import InstagramPage from './pages/InstagramPage';
import Contact from './pages/Contact';
import TermsPage from './pages/TermsPage';
import CategoryDetail from './pages/CategoryDetail';
import { ShoppingPage, CategoryPage, ThankYouPage, OrderHistoryPage, TrackingPage, SearchPage, ScrollStory, CartPanel, CategoryModal, RitualToast } from './components/CoffeeComponents';
import Lenis from '@studio-freight/lenis';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [cart, setCart] = React.useState<any[]>(() => {
    const saved = localStorage.getItem('caffeina-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = React.useState<any[]>(() => {
    const saved = localStorage.getItem('caffeina-wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = React.useState(false);
  const [latestAddedItem, setLatestAddedItem] = React.useState<any>(null);
  const [showToast, setShowToast] = React.useState(false);

  useEffect(() => {
    localStorage.setItem('caffeina-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('caffeina-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleAddToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setLatestAddedItem(item);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, (item.quantity || 1) + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleToggleWishlist = (item: any) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <CartPanel 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={handleRemoveFromCart}
        onUpdateQty={handleUpdateQuantity}
      />
      <CategoryModal 
        isOpen={isCategoriesOpen} 
        onClose={() => setIsCategoriesOpen(false)} 
      />
      <RitualToast 
        item={latestAddedItem} 
        isVisible={showToast} 
      />
      <Routes>
        <Route path="/" element={<Home cartCount={cartCount} wishlistCount={wishlist.length} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} wishlist={wishlist} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
        <Route path="/home" element={<Home cartCount={cartCount} wishlistCount={wishlist.length} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} wishlist={wishlist} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
        <Route path="/shop" element={<Shop cartCount={cartCount} wishlistCount={wishlist.length} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} wishlist={wishlist} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
        <Route path="/shopping" element={<Shop cartCount={cartCount} wishlistCount={wishlist.length} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} wishlist={wishlist} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
        <Route path="/category" element={<CategoryPage cartCount={cartCount} wishlistCount={wishlist.length} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
        <Route path="/category/:id" element={<CategoryDetail cartCount={cartCount} wishlistCount={wishlist.length} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
        <Route path="/coffeeDetail/:id" element={<ProductDetail cartCount={cartCount} wishlistCount={wishlist.length} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} wishlist={wishlist} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
        <Route path="/cart" element={<Cart cartCount={cartCount} cart={cart} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemoveFromCart} cartTotal={cartTotal} wishlistCount={wishlist.length} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
        <Route path="/payment" element={<Payment cartCount={cartCount} cart={cart} cartTotal={cartTotal} wishlistCount={wishlist.length} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
        <Route path="/account" element={<Account cartCount={cartCount} wishlistCount={wishlist.length} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
        <Route path="/orderHistory" element={<OrderHistoryPage cartCount={cartCount} wishlistCount={wishlist.length} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
        <Route path="/tracking" element={<TrackingPage cartCount={cartCount} wishlistCount={wishlist.length} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
        <Route path="/thankyou" element={<ThankYouPage cartCount={cartCount} wishlistCount={wishlist.length} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
        <Route path="/search" element={<SearchPage cartCount={cartCount} wishlistCount={wishlist.length} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} wishlist={wishlist} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
        <Route path="/story" element={<ScrollStory cartCount={cartCount} wishlistCount={wishlist.length} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
        <Route path="/about" element={<About cartCount={cartCount} wishlistCount={wishlist.length} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
        <Route path="/reviews" element={<ReviewsPage cartCount={cartCount} wishlistCount={wishlist.length} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
        <Route path="/events" element={<EventsListing cartCount={cartCount} wishlistCount={wishlist.length} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
        <Route path="/events/:id" element={<EventRouter cartCount={cartCount} wishlistCount={wishlist.length} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
        <Route path="/social" element={<InstagramPage cartCount={cartCount} wishlistCount={wishlist.length} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
        <Route path="/contact" element={<Contact cartCount={cartCount} wishlistCount={wishlist.length} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
        <Route path="/terms" element={<TermsPage cartCount={cartCount} wishlistCount={wishlist.length} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
      </Routes>
    </Router>
  );
}

export default App;
