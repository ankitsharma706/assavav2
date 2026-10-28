import React, { Suspense, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar, CoffeeDetailPage } from '../components/CoffeeComponents';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { BeanCluster } from '../components/ThreeScene';
import { PRODUCTS } from '../constants';
import { applySEO } from '../lib/seo';
import JsonLd from '../components/JsonLd';
import { generateProductSchema } from '../lib/schema';
import Breadcrumb from '../components/Breadcrumb';
import AdUnit from '../components/AdSense/AdUnit';

const ProductDetail = ({
  cartCount,
  wishlistCount,
  wishlist,
  onToggleWishlist,
  onOpenCart,
  onOpenCategories,
  onAddToCart,
}: {
  cartCount: number;
  wishlistCount: number;
  wishlist: any[];
  onToggleWishlist: (item: any) => void;
  onOpenCart: () => void;
  onOpenCategories: () => void;
  onAddToCart: (item: any) => void;
}) => {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  useEffect(() => {
    if (product) {
      applySEO({
        title: `${product.name} | Single Origin Reserve`,
        description: product.description,
        canonical: `/coffeeDetail/${product.id}`,
        ogType: 'product',
        ogImage: product.image,
      });
    }
  }, [product]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen bg-coffee-dark"
    >
      {product && (
        <JsonLd
          id={`product-schema-${product.id}`}
          data={generateProductSchema({
            id: product.id,
            name: product.name,
            description: product.description,
            image: product.image,
            price: product.price,
            rating: product.rating,
            reviewCount: product.reviews,
            availability: 'InStock',
          })}
        />
      )}

      <div className="grain" />

      {/* Global Immersive Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
        <Suspense fallback={null}>
          <Canvas gl={{ alpha: true }} camera={{ position: [0, 0, 15] }}>
            <BeanCluster />
          </Canvas>
        </Suspense>
      </div>

      <div className="relative z-10">
        <Navbar
          onOpenCart={onOpenCart}
          onOpenCategories={onOpenCategories}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
        />

        <div className="max-w-7xl mx-auto px-6 pt-32 -mb-24">
          <Breadcrumb
            items={[
              { name: 'Shop', path: '/shopping' },
              { name: product.name, path: `/coffeeDetail/${product.id}` },
            ]}
          />
        </div>

        <CoffeeDetailPage
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          wishlist={wishlist}
        />

        <div className="max-w-7xl mx-auto px-6 pb-12">
          <AdUnit slotId="product-detail-bottom" format="horizontal" minHeight={120} />
        </div>

        <Footer />
      </div>
    </motion.main>
  );
};

export default ProductDetail;
