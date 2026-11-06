import React, { useState } from 'react';
import { Product, BumperTypeId } from '../types';
import { PHONE_MODELS, BUMPER_TYPES, BUMPER_COLORS } from '../data/constants';
import { X, Star, ShieldCheck, Check, ShoppingBag, Truck, RefreshCw } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: {
    productId: string;
    name: string;
    phoneModel: string;
    bumperType: string;
    bumperColor: string;
    price: number;
    quantity: number;
    image: string;
  }) => void;
}

export function QuickViewModal({ product, onClose, onAddToCart }: QuickViewModalProps) {
  if (!product) return null;

  const [selectedModel, setSelectedModel] = useState<string>('iPhone 16 Pro Max');
  const [selectedBumper, setSelectedBumper] = useState<BumperTypeId>(product.bumperType);
  const [selectedBumperColor, setSelectedBumperColor] = useState<string>('Pastel Neko Pink');
  const [quantity, setQuantity] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const bumperObj = BUMPER_TYPES.find((b) => b.id === selectedBumper) || BUMPER_TYPES[0];
  const unitPrice = product.price + bumperObj.priceDelta;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart({
      productId: product.id,
      name: product.name,
      phoneModel: selectedModel,
      bumperType: bumperObj.name,
      bumperColor: selectedBumperColor,
      price: unitPrice,
      quantity,
      image: product.image,
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-pink-100 overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-neutral-100 text-neutral-600 transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="md:w-1/2 bg-pink-50/40 p-6 flex items-center justify-center relative">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[420px] object-cover rounded-2xl shadow-md"
          />
          {product.tag && (
            <div className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-neutral-900 shadow-sm">
              {product.tag}
            </div>
          )}
        </div>

        {/* Right: Details & Purchase Options */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            {/* Category & Protection */}
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span className="font-semibold text-pink-600">{product.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                {product.dropProtection}
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-neutral-900 leading-tight">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-extrabold text-neutral-900 font-mono tabular-nums">
                {unitPrice.toLocaleString('vi-VN')}₫
              </span>
              {product.originalPrice && (
                <span className="text-sm text-neutral-400 line-through font-mono">
                  {(product.originalPrice + bumperObj.priceDelta).toLocaleString('vi-VN')}₫
                </span>
              )}
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              {product.description}
            </p>

            {/* Select iPhone Model */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1.5">
                Dòng iPhone Tương Thích
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-pink-50/40 border border-pink-200 text-neutral-900 text-xs rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:ring-1 focus:ring-pink-500"
              >
                {PHONE_MODELS.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Bumper Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1.5">
                Cấp Độ Viền Chống Sốc
              </label>
              <div className="grid grid-cols-2 gap-2">
                {BUMPER_TYPES.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBumper(b.id)}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      selectedBumper === b.id
                        ? 'border-pink-500 bg-pink-50/60 ring-1 ring-pink-500 font-semibold'
                        : 'border-neutral-200 hover:border-pink-200'
                    }`}
                  >
                    <span className="block text-xs text-neutral-900 leading-tight">{b.name}</span>
                    <span className="text-[10px] text-pink-600 font-mono">
                      {b.priceDelta === 0 ? 'Giá chuẩn' : `+${b.priceDelta.toLocaleString('vi-VN')}₫`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Select Bumper Color */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1.5">
                Màu Sắc Viền Ốp
              </label>
              <div className="flex flex-wrap gap-2">
                {BUMPER_COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedBumperColor(c.name)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] transition-all ${
                      selectedBumperColor === c.name
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 text-neutral-700'
                    }`}
                  >
                    <span
                      style={{ backgroundColor: c.colorHex }}
                      className="w-3 h-3 rounded-full border border-neutral-300"
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity & CTA */}
          <div className="pt-6 border-t border-neutral-100 space-y-3 mt-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-pink-200 rounded-xl bg-pink-50/30">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-neutral-600 hover:text-neutral-900 font-bold"
                >
                  -
                </button>
                <span className="px-2 font-mono text-xs font-bold text-neutral-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-neutral-600 hover:text-neutral-900 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 py-3 px-6 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {isSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                    <span>Đã Thêm Vào Giỏ!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-pink-300" />
                    <span>Thêm Vào Giỏ ({totalPrice.toLocaleString('vi-VN')}₫)</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-pink-500" />
                Giao hàng nhanh 2-3 ngày
              </span>
              <span className="flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5 text-pink-500" />
                Đổi trả trong 10 ngày
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
