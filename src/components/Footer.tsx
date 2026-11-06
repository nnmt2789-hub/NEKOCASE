import React, { useState } from 'react';
import { NekoLogo } from './NekoSvgStickers';
import { ShieldCheck, Truck, RotateCcw, Check, ArrowRight } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-white border-t border-pink-100 text-neutral-600 text-xs">
      {/* 3 Trust pillars */}
      <div className="border-b border-pink-100/60 py-8 bg-[#FFF9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 text-xs">Miễn Phí Vận Chuyển</h4>
              <p className="text-[11px] text-neutral-500">Đơn hàng từ 499.000₫ toàn quốc</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 text-xs">Bảo Hành Rơi Vỡ 6 Tháng</h4>
              <p className="text-[11px] text-neutral-500">Cam kết 1 đổi 1 nếu nứt vỡ viền</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 text-xs">Đổi Trả Dễ Dàng 10 Ngày</h4>
              <p className="text-[11px] text-neutral-500">Hỗ trợ đổi mẫu và size linh hoạt</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center p-1">
                <NekoLogo className="w-full h-full text-pink-600" />
              </div>
              <span className="font-extrabold text-neutral-900 text-base">NEKO CASE</span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Thương hiệu ốp lưng công nghệ cao phong cách Y2K và mèo Neko tối giản, lấy cảm hứng từ chuẩn mực quốc tế CASETiFY.
            </p>
            <p className="text-[11px] text-neutral-400 font-mono">
              Tokyo // Seoul // Ho Chi Minh City
            </p>
          </div>

          {/* Column 2: Products */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
              Dòng iPhone Hỗ Trợ
            </h4>
            <ul className="space-y-2 text-xs text-neutral-500">
              <li><a href="#catalog" className="hover:text-pink-600 transition-colors">iPhone 16 Pro Max & 16 Pro</a></li>
              <li><a href="#catalog" className="hover:text-pink-600 transition-colors">iPhone 16 & 16 Plus</a></li>
              <li><a href="#catalog" className="hover:text-pink-600 transition-colors">iPhone 15 Pro Max & 15 Pro</a></li>
              <li><a href="#catalog" className="hover:text-pink-600 transition-colors">iPhone 14 Series</a></li>
              <li><a href="#catalog" className="hover:text-pink-600 transition-colors">iPhone 13 Series</a></li>
            </ul>
          </div>

          {/* Column 3: Customizer & Tech */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
              Công Nghệ & Dịch Vụ
            </h4>
            <ul className="space-y-2 text-xs text-neutral-500">
              <li><a href="#customizer" className="hover:text-pink-600 transition-colors">Studio Tự Thiết Kế Ốp</a></li>
              <li><a href="#tech" className="hover:text-pink-600 transition-colors">Đệm Khí Ultra Bounce 10x</a></li>
              <li><a href="#tech" className="hover:text-pink-600 transition-colors">Vật Liệu Eco-Shock™ Tái Chế</a></li>
              <li><a href="#reviews" className="hover:text-pink-600 transition-colors">Hình Ảnh Khách Hàng #NekoCase</a></li>
              <li><a href="#catalog" className="hover:text-pink-600 transition-colors">Ốp Gương Y2K Mirror</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
              Tham Gia Neko Club
            </h4>
            <p className="text-xs text-neutral-500 mb-3">
              Nhận voucher 10% cho đơn hàng đầu tiên và thông báo sớm các đợt collab giới hạn.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Email của bạn..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-pink-200 bg-pink-50/30 focus:outline-none focus:ring-1 focus:ring-pink-500 text-neutral-800"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold shrink-0 transition-colors flex items-center justify-center"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-pink-600 flex items-center gap-1 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  Đã đăng ký! Mã NEKOFIRST đã sẵn sàng.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 gap-3">
          <p>© 2026 NEKO CASE. All rights reserved. Inspired by CASETiFY.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-600 cursor-pointer">Chính sách bảo mật</span>
            <span>·</span>
            <span className="hover:text-neutral-600 cursor-pointer">Điều khoản dịch vụ</span>
            <span>·</span>
            <span className="hover:text-neutral-600 cursor-pointer">Chứng nhận MIL-STD-810G</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
