import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { NekoLogo } from './NekoSvgStickers';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateCustomizer: () => void;
  onNavigateCatalog: () => void;
  onNavigateTech: () => void;
  onNavigateReviews: () => void;
}

export function Navbar({
  cartCount,
  onOpenCart,
  onNavigateCustomizer,
  onNavigateCatalog,
  onNavigateTech,
  onNavigateReviews,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pink-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single Brand element */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 text-slate-900 whitespace-nowrap shrink-0 group"
          >
            <div className="w-9 h-9 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center p-1.5 transition-transform group-hover:scale-105 group-hover:rotate-6">
              <NekoLogo className="w-full h-full text-pink-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-neutral-900 font-['Plus_Jakarta_Sans'] leading-none">
                NEKO<span className="text-pink-500">CASE</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-mono font-semibold">
                Drop Tested
              </span>
            </div>
          </a>

          {/* Zone 2: 4 Clean Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-neutral-600">
            <button
              onClick={onNavigateCatalog}
              className="hover:text-pink-600 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Bộ Sưu Tập
            </button>
            <button
              onClick={onNavigateCustomizer}
              className="text-pink-600 hover:text-pink-700 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
              Tự Thiết Kế Ốp
            </button>
            <button
              onClick={onNavigateTech}
              className="hover:text-pink-600 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Công Nghệ Viền
            </button>
            <button
              onClick={onNavigateReviews}
              className="hover:text-pink-600 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Đánh Giá Khách Hàng
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action (Cart Drawer Trigger) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCart}
              className="relative px-4 py-2.5 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-all active:scale-95 whitespace-nowrap shrink-0 flex items-center gap-2 shadow-sm"
              aria-label="Xem giỏ hàng"
            >
              <ShoppingBag className="w-4 h-4 text-pink-300" />
              <span className="hidden sm:inline">Giỏ Hàng</span>
              <span className="w-5 h-5 rounded-full bg-pink-500 text-white font-mono text-[11px] flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-neutral-600 hover:bg-pink-50 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-pink-100 bg-white px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2">
          <button
            onClick={() => {
              onNavigateCatalog();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-semibold text-neutral-800 hover:text-pink-600"
          >
            Bộ Sưu Tập iPhone
          </button>
          <button
            onClick={() => {
              onNavigateCustomizer();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-semibold text-pink-600"
          >
            Tự Thiết Kế Ốp (Studio Lab)
          </button>
          <button
            onClick={() => {
              onNavigateTech();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-semibold text-neutral-800 hover:text-pink-600"
          >
            Công Nghệ Chống Sốc
          </button>
          <button
            onClick={() => {
              onNavigateReviews();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-semibold text-neutral-800 hover:text-pink-600"
          >
            Đánh Giá & Feedback
          </button>
        </div>
      )}
    </header>
  );
}
