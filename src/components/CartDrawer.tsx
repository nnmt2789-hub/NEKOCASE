import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ArrowRight, ShoppingBag, Sparkles, Tag, Check, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedCheckout: (discountAmount: number, promoCode: string) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>('NEKOFIRST');
  const [promoError, setPromoError] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Discount calculation
  let discount = 0;
  if (appliedPromo === 'NEKOFIRST') {
    discount = Math.round(subtotal * 0.1); // 10% off
  }

  // Free shipping threshold: 499,000 VND
  const freeShippingThreshold = 499000;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = isFreeShipping || subtotal === 0 ? 0 : 30000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShip = Math.max(0, freeShippingThreshold - subtotal);

  const total = Math.max(0, subtotal - discount + shippingFee);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'NEKOFIRST') {
      setAppliedPromo('NEKOFIRST');
      setPromoError('');
    } else if (promoCode.trim().toUpperCase() === 'VIPNEKO') {
      setAppliedPromo('VIPNEKO');
      setPromoError('');
    } else {
      setPromoError('Mã không hợp lệ (Thử NEKOFIRST)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-pink-100 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-pink-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-pink-600" />
              <h2 className="text-lg font-extrabold text-neutral-900">Giỏ Hàng Của Bạn</h2>
              <span className="text-xs font-mono font-semibold text-neutral-500">
                ({items.reduce((s, i) => s + i.quantity, 0)} món)
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-pink-50/70 border-b border-pink-100/60">
            <div className="flex items-center justify-between text-xs text-neutral-700 mb-1.5 font-medium">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-pink-600" />
                {isFreeShipping ? (
                  <span className="text-pink-600 font-bold">Bạn đã được Miễn Phí Vận Chuyển!</span>
                ) : (
                  <span>
                    Mua thêm{' '}
                    <strong className="text-pink-600 font-mono">
                      {remainingForFreeShip.toLocaleString('vi-VN')}₫
                    </strong>{' '}
                    để Freeship
                  </span>
                )}
              </span>
              <span className="font-mono text-[11px] text-neutral-500">{progressPercent}%</span>
            </div>
            <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-pink-200/50">
              <div
                style={{ width: `${progressPercent}%` }}
                className="bg-gradient-to-r from-pink-400 to-rose-500 h-full rounded-full transition-all duration-500"
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center text-pink-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-neutral-800">Giỏ hàng đang trống</h3>
                <p className="text-xs text-neutral-500 max-w-xs mt-1">
                  Hãy chọn một mẫu ốp yêu thích hoặc bắt đầu tự thiết kế ốp riêng của bạn ngay!
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
                >
                  Khám Phá Cửa Hàng
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 rounded-2xl bg-neutral-50/70 border border-neutral-100 hover:border-pink-200 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-pink-100/50 rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-pink-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">{item.name}</h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-neutral-400 hover:text-rose-500 transition-colors p-1"
                          title="Xóa món này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        {item.phoneModel} · {item.bumperType}
                      </p>
                      <p className="text-[10px] text-pink-600 font-medium">Viền: {item.bumperColor}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-neutral-200 rounded-lg bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-neutral-600 hover:text-neutral-900 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono text-xs font-semibold text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-neutral-600 hover:text-neutral-900 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-xs font-extrabold text-neutral-900 font-mono tabular-nums">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-neutral-100 bg-neutral-50/50 space-y-4">
              {/* Promo code box */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Nhập mã ưu đãi (NEKOFIRST)"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-neutral-200 text-xs rounded-xl uppercase font-mono focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Áp Dụng
                </button>
              </div>

              {promoError && <p className="text-[11px] text-rose-500">{promoError}</p>}

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs text-pink-700 bg-pink-100/60 px-3 py-1.5 rounded-xl font-medium">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    Đã áp mã {appliedPromo} (-10%)
                  </span>
                  <button
                    onClick={() => setAppliedPromo(null)}
                    className="text-[11px] text-neutral-400 hover:text-neutral-700 underline"
                  >
                    Bỏ mã
                  </button>
                </div>
              )}

              {/* Cost Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-600 pt-2 border-t border-neutral-200/60">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span className="font-mono tabular-nums">{subtotal.toLocaleString('vi-VN')}₫</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-pink-600">
                    <span>Ưu đãi giảm giá:</span>
                    <span className="font-mono tabular-nums">-{discount.toLocaleString('vi-VN')}₫</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Phí giao hàng:</span>
                  <span className="font-mono tabular-nums">
                    {shippingFee === 0 ? 'Miễn Phí' : `${shippingFee.toLocaleString('vi-VN')}₫`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-neutral-900 pt-2 border-t border-neutral-200">
                  <span>Tổng thanh toán:</span>
                  <span className="font-mono tabular-nums text-pink-600 text-base">
                    {total.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => onProceedCheckout(discount, appliedPromo || '')}
                className="w-full py-3.5 px-6 rounded-2xl bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-bold text-sm shadow-lg shadow-pink-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Tiến Hành Đặt Hàng</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
