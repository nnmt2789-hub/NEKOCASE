import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface HeroProps {
  onGoCustomizer: () => void;
  onGoCatalog: () => void;
}

export function Hero({ onGoCustomizer, onGoCatalog }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-pink-50/70 via-white to-pink-50/30 pt-10 pb-16 lg:py-20 border-b border-pink-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            {/* Clean unboxed kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-pink-600 uppercase tracking-widest">
              <span>Y2K PASTEL EDITION 2026</span>
              <span aria-hidden="true">·</span>
              <span>INSPIRED BY CASETiFY</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.08] [text-wrap:balance]">
              Ốp Lưng Mèo Neko <br />
              <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-pink-600 bg-clip-text text-transparent">
                Hồng Pastel Y2K
              </span>{' '}
              Cá Tính
            </h1>

            {/* Body Prose */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl">
              Sự kết hợp tinh tế giữa viền camera signature chống sốc chuẩn quân sự và phong cách mèo Neko tối giản.
              Tự do sáng tạo mẫu ốp độc bản cho chiếc iPhone của riêng bạn với xưởng thiết kế trực tuyến.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <button
                onClick={onGoCustomizer}
                className="px-7 py-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2.5 group"
              >
                <Sparkles className="w-4 h-4 text-pink-300 group-hover:rotate-12 transition-transform" />
                <span>Tự Thiết Kế Ngay</span>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onGoCatalog}
                className="px-7 py-3.5 rounded-2xl bg-white hover:bg-pink-50 text-neutral-800 border border-pink-200 font-bold text-sm transition-all active:scale-95 flex items-center justify-center"
              >
                Xem Bộ Sưu Tập iPhone
              </button>
            </div>

            {/* Adjacent Proof Badges (Claim-to-Proof Adjacency) */}
            <div className="pt-6 border-t border-pink-200/60 w-full grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="block text-2xl font-extrabold text-neutral-900 font-mono tabular-nums">
                  3.5M
                </span>
                <span className="text-xs text-neutral-500 font-medium">Chống Rơi Quân Sự</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-neutral-900 font-mono tabular-nums">
                  65%
                </span>
                <span className="text-xs text-neutral-500 font-medium">Nhựa Tái Chế Eco</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-neutral-900 font-mono tabular-nums">
                  50.000+
                </span>
                <span className="text-xs text-neutral-500 font-medium">Khách Hàng Hài Lòng</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Campaign Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/10] sm:aspect-[16/9] group bg-pink-100">
              <img
                src="/src/assets/images/hero_neko_campaign_1793850572544.jpg"
                alt="NEKO CASE Signature Pastel Pink iPhone Case"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle glass brand tag */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-white/60 shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-neutral-900 block">
                    NEKO SIGNATURE EMBLEM
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    iPhone 16 Pro Max · Viền Eco-Shock hồng pastel
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-pink-600 font-mono tabular-nums">
                  <span>549.000₫</span>
                </div>
              </div>
            </div>

            {/* Decorative background element */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-pink-300/30 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
