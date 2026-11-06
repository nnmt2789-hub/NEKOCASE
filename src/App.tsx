import React, { useState } from 'react';
import { Product, CartItem, CustomDesign, Order } from './types';
import { PromoBanner } from './components/PromoBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CustomizerStudio } from './components/CustomizerStudio';
import { ProductCatalog } from './components/ProductCatalog';
import { TechFeatures } from './components/TechFeatures';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { QuickViewModal } from './components/QuickViewModal';

export default function App() {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-sample-1',
      productId: 'prod-01',
      name: 'Y2K Neko Starburst Case',
      phoneModel: 'iPhone 16 Pro Max',
      bumperType: 'Impact Case',
      bumperColor: 'Pastel Neko Pink',
      price: 499000,
      quantity: 1,
      image: '/src/assets/images/product_y2k_star_cat_1793850575165.jpg',
    },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutPromoCode, setCheckoutPromoCode] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart Handlers
  const handleAddToCart = (item: {
    productId?: string;
    name: string;
    phoneModel: string;
    bumperType: string;
    bumperColor: string;
    price: number;
    quantity: number;
    image: string;
    customDesign?: CustomDesign;
  }) => {
    const newItem: CartItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      productId: item.productId,
      name: item.name,
      phoneModel: item.phoneModel,
      bumperType: item.bumperType,
      bumperColor: item.bumperColor,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      customDesign: item.customDesign,
    };

    setCartItems((prev) => [newItem, ...prev]);
    setIsCartOpen(true);
  };

  const handleCustomizerAddToCart = (design: CustomDesign) => {
    handleAddToCart({
      name: `Custom Neko Case (${design.customText || 'Y2K Edition'})`,
      phoneModel: design.phoneModel,
      bumperType:
        design.bumperType === 'ultra-bounce'
          ? 'Ultra Bounce Case'
          : design.bumperType === 'mirror'
          ? 'Y2K Mirror Case'
          : design.bumperType === 'clear'
          ? 'Clear Frosted Case'
          : 'Impact Case',
      bumperColor: design.bumperColor,
      price: design.totalPrice,
      quantity: 1,
      image: '/src/assets/images/product_y2k_star_cat_1793850575165.jpg',
      customDesign: design,
    });
  };

  const handleQuickAdd = (product: Product, modelName: string) => {
    handleAddToCart({
      productId: product.id,
      name: product.name,
      phoneModel: modelName,
      bumperType: product.bumperType === 'ultra-bounce' ? 'Ultra Bounce' : 'Impact Case',
      bumperColor: 'Pastel Neko Pink',
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter((it): it is CartItem => it !== null)
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleProceedCheckout = (discount: number, promo: string) => {
    setCheckoutDiscount(discount);
    setCheckoutPromoCode(promo);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: Order) => {
    // Clear cart upon successful order
    setCartItems([]);
  };

  // Smooth scroll helpers
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-white flex flex-col font-['Plus_Jakarta_Sans'] text-neutral-900 selection:bg-pink-200 selection:text-pink-900">
      {/* Top Banner */}
      <PromoBanner />

      {/* Top Bar Navigation (Contract: 3 Zones) */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateCatalog={() => scrollTo('catalog')}
        onNavigateCustomizer={() => scrollTo('customizer')}
        onNavigateTech={() => scrollTo('tech')}
        onNavigateReviews={() => scrollTo('reviews')}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onGoCustomizer={() => scrollTo('customizer')}
          onGoCatalog={() => scrollTo('catalog')}
        />

        {/* NEKO Customizer Studio Lab */}
        <CustomizerStudio onAddToCart={handleCustomizerAddToCart} />

        {/* iPhone Collection Catalog & Filters */}
        <ProductCatalog
          onSelectProduct={(p) => setQuickViewProduct(p)}
          onQuickAdd={handleQuickAdd}
          onOpenCustomizer={() => scrollTo('customizer')}
        />

        {/* Shock Protection & Materials Engineering */}
        <TechFeatures />

        {/* Verified Community Reviews */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedCheckout={handleProceedCheckout}
      />

      {/* Interactive Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discount={checkoutDiscount}
        promoCode={checkoutPromoCode}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Product Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
