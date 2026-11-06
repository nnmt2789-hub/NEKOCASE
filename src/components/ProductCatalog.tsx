import React, { useState } from 'react';
import { Product, PhoneSeries, BumperTypeId } from '../types';
import { PRODUCTS, PHONE_MODELS } from '../data/constants';
import { Star, ShieldCheck, Eye, Plus, Check } from 'lucide-react';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, modelName: string) => void;
  onOpenCustomizer: () => void;
}

export function ProductCatalog({ onSelectProduct, onQuickAdd, onOpenCustomizer }: ProductCatalogProps) {
  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const [selectedBumper, setSelectedBumper] = useState<string>('all');
  const [selectedModelPerProduct, setSelectedModelPerProduct] = useState<{ [productId: string]: string }>({
    'prod-01': 'iPhone 16 Pro Max',
    'prod-02': 'iPhone 16 Pro',
    'prod-03': 'iPhone 16 Pro Max',
    'prod-04': 'iPhone 15 Pro Max',
    'prod-05': 'iPhone 16 Pro Max',
    'prod-06': 'iPhone 15',
  });
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedBumper !== 'all' && p.bumperType !== selectedBumper) {
      return false;
    }
    return true;
  });

  const handleQuickAddClick = (p: Product) => {
    const model = selectedModelPerProduct[p.id] || 'iPhone 16 Pro Max';
    onQuickAdd(p, model);
    setAddedIds((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [p.id]: false }));
    }, 1800);
  };

  return (
    <section id="catalog" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-pink-600 uppercase tracking-widest mb-1.5">
              <span>BỘ SƯU TẬP CAO CẤP</span>
              <span aria-hidden="true">·</span>
              <span>IPHONE 13 ĐẾN 16 PRO MAX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
              Mẫu Ốp Lưng Neko Hot Nhất
            </h2>
          </div>

          <button
            onClick={onOpenCustomizer}
            className="text-xs font-bold text-pink-600 hover:text-pink-700 underline underline-offset-4 self-start md:self-auto"
          >
            Hoặc tự tải ảnh để tự thiết kế ốp riêng &rarr;
          </button>
        </div>

        {/* Filters Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100 mb-8">
          {/* Bumper Type Segmented Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'Tất Cả Mẫu' },
              { id: 'ultra-bounce', label: 'Ultra Bounce (10x)' },
              { id: 'impact', label: 'Impact Case' },
              { id: 'mirror', label: 'Gương Y2K Mirror' },
              { id: 'clear', label: 'Clear Trong Suốt' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedBumper(btn.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap shrink-0 transition-colors ${
                  selectedBumper === btn.id
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'bg-pink-50/60 text-neutral-700 hover:bg-pink-100/70'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Result Count */}
          <div className="text-xs text-neutral-500 font-medium shrink-0">
            Hiển thị <span className="font-bold text-neutral-900 font-mono">{filteredProducts.length}</span> sản phẩm
          </div>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isAdded = addedIds[product.id];
            const currentSelectedModel = selectedModelPerProduct[product.id] || 'iPhone 16 Pro Max';

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-white rounded-3xl border border-pink-100/80 hover:border-pink-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Product Image Area */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-[4/3] bg-pink-50/40 overflow-hidden cursor-pointer flex items-center justify-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Subtle Label (Max 1 subtle tag, no pill clutter) */}
                  {product.tag && (
                    <div className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-neutral-900 shadow-sm">
                      {product.tag}
                    </div>
                  )}

                  {/* Quick View Button on Hover */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-xl bg-white/95 backdrop-blur-sm text-neutral-900 text-xs font-bold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5" />
                      Xem Chi Tiết
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  {/* Clean unboxed metadata */}
                  <div>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                      <span className="font-semibold text-pink-600">{product.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                        {product.dropProtection}
                      </span>
                    </div>

                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="text-lg font-bold text-neutral-900 group-hover:text-pink-600 transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">{product.subtitle}</p>
                  </div>

                  {/* Rating & Price */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1 text-xs text-neutral-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-neutral-900 font-mono">{product.rating.toFixed(1)}</span>
                      <span className="text-neutral-400">({product.reviewsCount})</span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-extrabold text-neutral-900 font-mono tabular-nums">
                        {product.price.toLocaleString('vi-VN')}₫
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-neutral-400 line-through font-mono">
                          {product.originalPrice.toLocaleString('vi-VN')}₫
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Device Selector & Quick Add Button */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center gap-2">
                    <select
                      value={currentSelectedModel}
                      onChange={(e) =>
                        setSelectedModelPerProduct((prev) => ({
                          ...prev,
                          [product.id]: e.target.value,
                        }))
                      }
                      className="flex-1 bg-pink-50/40 border border-pink-200 text-neutral-800 text-xs rounded-xl px-2.5 py-2.5 font-medium focus:outline-none focus:ring-1 focus:ring-pink-500 truncate"
                    >
                      {PHONE_MODELS.map((m) => (
                        <option key={m.id} value={m.name}>
                          {m.name}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => handleQuickAddClick(product)}
                      className={`px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-neutral-900 hover:bg-neutral-800 text-white active:scale-95'
                      }`}
                      title="Thêm vào giỏ hàng"
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Đã Thêm</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Mua Ngay</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
