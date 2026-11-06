import React from 'react';
import { Sparkles, Truck, Shield } from 'lucide-react';

export function PromoBanner() {
  return (
    <div className="bg-[#18181B] text-white py-2 px-4 text-xs font-medium tracking-wide">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] sm:text-xs">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="text-pink-400 font-bold uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Y2K NEKO DROP
          </span>
          <span className="hidden sm:inline text-neutral-400">|</span>
          <span className="truncate">Miễn phí vận chuyển toàn quốc cho đơn từ 499.000₫</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-neutral-300 shrink-0">
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-pink-400" />
            Bảo hành 1 đổi 1 trong 6 tháng
          </span>
          <span className="text-neutral-600">·</span>
          <span className="text-pink-300 font-mono">CODE: NEKOFIRST (-10%)</span>
        </div>
      </div>
    </div>
  );
}
