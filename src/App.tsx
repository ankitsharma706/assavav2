import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
const Home = React.lazy(() => import('./pages/Home'));
const Shop = React.lazy(() => import('./pages/Shop'));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Payment = React.lazy(() => import('./pages/Payment'));
const Account = React.lazy(() => import('./pages/Account'));
const About = React.lazy(() => import('./pages/About'));
const ReviewsPage = React.lazy(() => import('./pages/ReviewsPage'));
const EventsListing = React.lazy(() => import('./pages/EventsListing'));
const EventDetail = React.lazy(() => import('./pages/EventDetail'));
const EventRouter = React.lazy(() => import('./pages/EventRouter'));
const CinematicEventDetail = React.lazy(() => import('./pages/CinematicEventDetail'));
const InstagramPage = React.lazy(() => import('./pages/InstagramPage'));
const Contact = React.lazy(() => import('./pages/Contact'));
const TermsPage = React.lazy(() => import('./pages/TermsPage'));
const ShippingPolicyPage = React.lazy(() => import('./pages/ShippingPolicyPage'));
const ReturnsPolicyPage = React.lazy(() => import('./pages/ReturnsPolicyPage'));
const CategoryDetail = React.lazy(() => import('./pages/CategoryDetail'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const FAQPage = React.lazy(() => import('./pages/FAQPage'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
import AdSenseGuard from './components/AdSense/AdSenseGuard';
const CategoryPage = React.lazy(() => import('./components/CoffeeComponents').then((module) => ({ default: module.CategoryPage })));
const ThankYouPage = React.lazy(() => import('./components/CoffeeComponents').then((module) => ({ default: module.ThankYouPage })));
const OrderHistoryPage = React.lazy(() => import('./components/CoffeeComponents').then((module) => ({ default: module.OrderHistoryPage })));
const TrackingPage = React.lazy(() => import('./components/CoffeeComponents').then((module) => ({ default: module.TrackingPage })));
const SearchPage = React.lazy(() => import('./components/CoffeeComponents').then((module) => ({ default: module.SearchPage })));
const ScrollStory = React.lazy(() => import('./components/CoffeeComponents').then((module) => ({ default: module.ScrollStory })));
const AppOverlays = React.lazy(() => import('./components/AppOverlays'));
import ErrorBoundary from './components/ErrorBoundary';
import CookieConsent from './components/CookieConsent';
import RouteMetadata from './components/RouteMetadata';
import { PRODUCTS } from './constants';
import type { CartItem, Product } from './types';

function readStoredProducts(key: string, withQuantity: true): CartItem[];
function readStoredProducts(key: string, withQuantity: false): Product[];
function readStoredProducts(key: string, withQuantity: boolean): (CartItem | Product)[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(key) || '[]');
    if (!Array.isArray(stored)) return [];
    return stored.flatMap((entry): (CartItem | Product)[] => {
      if (!entry || typeof entry !== 'object' || typeof entry.id !== 'string') return [];
      const product = PRODUCTS.find((item) => item.id === entry.id);
      if (!product) return [];
      if (!withQuantity) return [product];
      const quantity = Number.isInteger(entry.quantity) && entry.quantity > 0 && entry.quantity <= 99
        ? entry.quantity
        : 1;
      return [{ ...product, quantity }];
    });
  } catch {
    return [];
  }
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [cart, setCart] = React.useState<CartItem[]>(() => readStoredProducts('caffeina-cart', true) as CartItem[]);
  const [wishlist, setWishlist] = React.useState<Product[]>(() => readStoredProducts('caffeina-wishlist', false) as Product[]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = React.useState(false);
  const [latestAddedItem, setLatestAddedItem] = React.useState<Product | null>(null);
  const [showToast, setShowToast] = React.useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('caffeina-cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Unable to persist cart state', error);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('caffeina-wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error('Unable to persist wishlist state', error);
    }
  }, [wishlist]);

  const handleAddToCart = (item: Product) => {
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

  const handleToggleWishlist = (item: Product) => {
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

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <AdSenseGuard>
        <RouteMetadata />
        <CookieConsent />
        <React.Suspense fallback={<div className="min-h-screen bg-[#1A120B]" aria-busy="true" />}>
          {(isCartOpen || isCategoriesOpen || showToast) && <AppOverlays
            isCartOpen={isCartOpen}
            onCloseCart={() => setIsCartOpen(false)}
            items={cart}
            onRemove={handleRemoveFromCart}
            onUpdateQty={handleUpdateQuantity}
            isCategoriesOpen={isCategoriesOpen}
            onCloseCategories={() => setIsCategoriesOpen(false)}
            latestAddedItem={latestAddedItem}
            showToast={showToast}
          />}
        <Routes>
          <Route path="/" element={<Home cartCount={cartCount} wishlistCount={wishlist.length} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} wishlist={wishlist} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
          <Route path="/home" element={<Navigate replace to="/" />} />
          <Route path="/shop" element={<Shop cartCount={cartCount} wishlistCount={wishlist.length} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} wishlist={wishlist} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
          <Route path="/shopping" element={<Navigate replace to="/shop" />} />
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
          <Route path="/terms-of-service" element={<Navigate replace to="/terms" />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy cartCount={cartCount} wishlistCount={wishlist.length} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
          <Route path="/privacy" element={<Navigate replace to="/privacy-policy" />} />
          <Route path="/faq" element={<FAQPage cartCount={cartCount} wishlistCount={wishlist.length} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
          <Route path="/shipping" element={<ShippingPolicyPage cartCount={cartCount} wishlistCount={wishlist.length} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
          <Route path="/returns" element={<ReturnsPolicyPage cartCount={cartCount} wishlistCount={wishlist.length} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
          {/* Strict 404 Catch-All Route with Ad Suppression & Noindex */}
          <Route path="*" element={<NotFound cartCount={cartCount} wishlistCount={wishlist.length} onOpenCart={() => setIsCartOpen(true)} onOpenCategories={() => setIsCategoriesOpen(true)} />} />
        </Routes>
        </React.Suspense>
      </AdSenseGuard>
    </ErrorBoundary>
  );
}

export default App;
