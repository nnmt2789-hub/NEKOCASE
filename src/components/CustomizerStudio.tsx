import React, { useState } from 'react';
import { CustomDesign, PlacedSticker, BumperTypeId } from '../types';
import { PHONE_MODELS, PHONE_COLORS, BUMPER_TYPES, BUMPER_COLORS, STICKER_LIBRARY, FONT_OPTIONS } from '../data/constants';
import { PhoneCaseCanvas } from './PhoneCaseCanvas';
import { StickerSvgRenderer } from './NekoSvgStickers';
import { Upload, RotateCcw, Sparkles, Sliders, Type, ShieldCheck, Check, ShoppingBag, ZoomIn } from 'lucide-react';

interface CustomizerStudioProps {
  onAddToCart: (design: CustomDesign) => void;
}

export function CustomizerStudio({ onAddToCart }: CustomizerStudioProps) {
  const [activeTab, setActiveTab] = useState<'device' | 'upload' | 'stickers' | 'text'>('device');
  const [addedNotice, setAddedNotice] = useState(false);

  const [design, setDesign] = useState<CustomDesign>({
    phoneModel: 'iPhone 16 Pro Max',
    phoneColor: 'Desert Titanium',
    bumperType: 'ultra-bounce',
    bumperColor: 'Pastel Neko Pink',
    userImage: null,
    imageScale: 1.0,
    imageRotate: 0,
    imagePosition: { x: 0, y: 0 },
    placedStickers: [
      { id: 'init-1', stickerId: 'neko-minimal', x: 50, y: 60, scale: 1.1, rotation: 0 },
      { id: 'init-2', stickerId: 'star-burst', x: 28, y: 75, scale: 0.8, rotation: 15 },
      { id: 'init-3', stickerId: 'star-4', x: 74, y: 45, scale: 0.7, rotation: -10 },
    ],
    customText: 'NEKO Y2K',
    textFont: 'font-["Space_Grotesk"] tracking-wider uppercase font-bold',
    textColor: '#18181b',
    textLayout: 'center',
    totalPrice: 649000,
  });

  // Calculate live total price
  const basePrice = 499000;
  const currentBumper = BUMPER_TYPES.find((b) => b.id === design.bumperType) || BUMPER_TYPES[0];
  const calculatedTotal = basePrice + currentBumper.priceDelta;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setDesign((prev) => ({
          ...prev,
          userImage: reader.result as string,
          imageScale: 1.0,
          imageRotate: 0,
          imagePosition: { x: 0, y: 0 },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSticker = (stickerId: string) => {
    const newSticker: PlacedSticker = {
      id: `sticker-${Date.now()}`,
      stickerId,
      x: 35 + Math.floor(Math.random() * 30),
      y: 40 + Math.floor(Math.random() * 30),
      scale: 1.0,
      rotation: Math.floor(Math.random() * 20) - 10,
    };
    setDesign((prev) => ({
      ...prev,
      placedStickers: [...prev.placedStickers, newSticker],
    }));
  };

  const handleRemoveSticker = (id: string) => {
    setDesign((prev) => ({
      ...prev,
      placedStickers: prev.placedStickers.filter((s) => s.id !== id),
    }));
  };

  const handleResetDesign = () => {
    setDesign({
      phoneModel: 'iPhone 16 Pro Max',
      phoneColor: 'Desert Titanium',
      bumperType: 'ultra-bounce',
      bumperColor: 'Pastel Neko Pink',
      userImage: null,
      imageScale: 1.0,
      imageRotate: 0,
      imagePosition: { x: 0, y: 0 },
      placedStickers: [],
      customText: '',
      textFont: 'font-["Space_Grotesk"] tracking-wider uppercase font-bold',
      textColor: '#18181b',
      textLayout: 'center',
      totalPrice: 649000,
    });
  };

  const handleAddToCartClick = () => {
    onAddToCart({
      ...design,
      totalPrice: calculatedTotal,
    });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2400);
  };

  return (
    <section id="customizer" className="py-16 bg-[#FFF9FA] border-y border-pink-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Studio Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-pink-500 mb-2">
            <span>NEKO STUDIO LAB</span>
            <span aria-hidden="true">·</span>
            <span>TỰ THIẾT KẾ ỐP LƯNG</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Cá Nhân Hoá Ốp Lưng Y2K Độc Bản
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Tuỳ chỉnh từ loại viền chống sốc, tải ảnh cá nhân, dán sticker mèo Neko và khắc tên monogram sắc nét.
          </p>
        </div>

        {/* Studio Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Center: Interactive Phone Canvas Showcase */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm flex flex-col items-center justify-center relative min-h-[640px]">
            {/* Model Badge */}
            <div className="absolute top-6 left-6 text-xs text-neutral-500 flex items-center gap-2">
              <span className="font-semibold text-neutral-900">{design.phoneModel}</span>
              <span aria-hidden="true">·</span>
              <span>{currentBumper.name}</span>
            </div>

            {/* Quick Reset Button */}
            <button
              onClick={handleResetDesign}
              className="absolute top-6 right-6 p-2 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-pink-50 transition-colors flex items-center gap-1 text-xs"
              title="Làm mới thiết kế"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đặt lại</span>
            </button>

            {/* The Canvas */}
            <PhoneCaseCanvas design={design} onRemoveSticker={handleRemoveSticker} interactive={true} />

            {/* Canvas Hint */}
            <p className="text-[11px] text-neutral-400 mt-2 text-center">
              Nhấp vào dấu × đỏ trên sticker để xoá. Mọi chi tiết in chuẩn HD kháng trầy xước.
            </p>
          </div>

          {/* Right: Customization Controls Panel */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Control Tabs */}
            <div className="flex items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-pink-100 shadow-sm">
              <button
                onClick={() => setActiveTab('device')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-xl transition-all ${
                  activeTab === 'device' ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Thiết Bị & Viền</span>
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-xl transition-all ${
                  activeTab === 'upload' ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>Tải Ảnh Lên</span>
              </button>
              <button
                onClick={() => setActiveTab('stickers')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-xl transition-all ${
                  activeTab === 'stickers' ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Sticker Mèo Y2K</span>
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-xl transition-all ${
                  activeTab === 'text' ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Type className="w-4 h-4" />
                <span>Khắc Chữ</span>
              </button>
            </div>

            {/* TAB CONTENT 1: DEVICE & BUMPER SELECTION */}
            {activeTab === 'device' && (
              <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm space-y-6">
                {/* iPhone Model Dropdown */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2">
                    1. Chọn Dòng iPhone (iPhone 13 - iPhone 16 Pro Max)
                  </label>
                  <select
                    value={design.phoneModel}
                    onChange={(e) => setDesign({ ...design, phoneModel: e.target.value })}
                    className="w-full bg-pink-50/50 border border-pink-200 text-neutral-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 font-medium"
                  >
                    {PHONE_MODELS.map((model) => (
                      <option key={model.id} value={model.name}>
                        {model.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* iPhone Body Color (For clear case / background preview) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2">
                    2. Màu Lưng Máy iPhone
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {PHONE_COLORS.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setDesign({ ...design, phoneColor: color.name })}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-center transition-all ${
                          design.phoneColor === color.name
                            ? 'border-neutral-900 bg-pink-50/50 ring-1 ring-neutral-900'
                            : 'border-neutral-200 hover:border-pink-300'
                        }`}
                      >
                        <span
                          style={{ backgroundColor: color.hex }}
                          className="w-6 h-6 rounded-full border border-neutral-300 shadow-inner"
                        />
                        <span className="text-[10px] text-neutral-600 font-medium leading-tight truncate w-full">
                          {color.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shock Protection Bumper Type */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2">
                    3. Loại Viền Chống Sốc Công Nghệ
                  </label>
                  <div className="space-y-2.5">
                    {BUMPER_TYPES.map((bumper) => {
                      const isSelected = design.bumperType === bumper.id;
                      return (
                        <div
                          key={bumper.id}
                          onClick={() => setDesign({ ...design, bumperType: bumper.id as BumperTypeId })}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                            isSelected
                              ? 'border-pink-500 bg-pink-50/60 ring-2 ring-pink-500/20'
                              : 'border-neutral-200 hover:border-pink-200 bg-white'
                          }`}
                        >
                          <div className="flex-1 pr-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-neutral-900">{bumper.name}</span>
                              <span className="text-[10px] font-semibold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-md">
                                {bumper.badge}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-600 mt-0.5">{bumper.description}</p>
                            <div className="flex items-center gap-3 text-[11px] text-neutral-500 mt-2 font-mono">
                              <span>{bumper.dropRating}</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs font-bold text-neutral-900 font-mono tabular-nums">
                              {bumper.priceDelta === 0 ? 'Giá chuẩn' : `+${bumper.priceDelta.toLocaleString('vi-VN')}₫`}
                            </span>
                            {isSelected && (
                              <div className="mt-2 w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center ml-auto">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bumper Color */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2">
                    4. Màu Sắc Viền Ốp
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {BUMPER_COLORS.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setDesign({ ...design, bumperColor: c.name })}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                          design.bumperColor === c.name
                            ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                            : 'border-neutral-200 text-neutral-700 hover:border-pink-300'
                        }`}
                      >
                        <span
                          style={{ backgroundColor: c.colorHex }}
                          className="w-3.5 h-3.5 rounded-full border border-neutral-300"
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: UPLOAD USER PHOTO */}
            {activeTab === 'upload' && (
              <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2">
                    Tải Ảnh Của Bạn Lên Ốp Lưng
                  </label>
                  <p className="text-xs text-neutral-500 mb-4">
                    Hỗ trợ định dạng JPG, PNG, WEBP. Ảnh của bạn sẽ được in trực tiếp với công nghệ kháng tia UV sắc nét.
                  </p>

                  <label className="border-2 border-dashed border-pink-300 hover:border-pink-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-pink-50/30 transition-colors">
                    <Upload className="w-8 h-8 text-pink-500 mb-2" />
                    <span className="text-xs font-semibold text-neutral-800">Bấm để chọn ảnh từ thiết bị</span>
                    <span className="text-[11px] text-neutral-500 mt-1">Hoặc kéo thả ảnh vào đây</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>

                {design.userImage && (
                  <div className="space-y-4 pt-4 border-t border-neutral-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-neutral-800">Tinh Chỉnh Ảnh</span>
                      <button
                        onClick={() => setDesign({ ...design, userImage: null })}
                        className="text-xs text-rose-500 hover:underline"
                      >
                        Gỡ bỏ ảnh
                      </button>
                    </div>

                    {/* Scale */}
                    <div>
                      <div className="flex justify-between text-xs text-neutral-600 mb-1">
                        <span>Phóng to / Thu nhỏ:</span>
                        <span className="font-mono">{Math.round(design.imageScale * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="2.5"
                        step="0.05"
                        value={design.imageScale}
                        onChange={(e) => setDesign({ ...design, imageScale: parseFloat(e.target.value) })}
                        className="w-full accent-pink-500"
                      />
                    </div>

                    {/* Rotate */}
                    <div>
                      <div className="flex justify-between text-xs text-neutral-600 mb-1">
                        <span>Xoay góc:</span>
                        <span className="font-mono">{design.imageRotate}°</span>
                      </div>
                      <input
                        type="range"
                        min="-180"
                        max="180"
                        step="5"
                        value={design.imageRotate}
                        onChange={(e) => setDesign({ ...design, imageRotate: parseInt(e.target.value) })}
                        className="w-full accent-pink-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 3: STICKERS */}
            {activeTab === 'stickers' && (
              <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                      Kho Sticker Mèo Neko & Sao Y2K Độc Quyền
                    </label>
                    <span className="text-xs text-pink-600 font-medium">
                      Đã dán: {design.placedStickers.length}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mb-4">
                    Nhấp vào bất kỳ sticker nào dưới đây để dán lên ốp. Bạn có thể dán nhiều sticker tuỳ thích.
                  </p>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {STICKER_LIBRARY.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleAddSticker(item.svgType)}
                        className="flex flex-col items-center p-3 rounded-2xl border border-pink-100 hover:border-pink-400 bg-pink-50/20 hover:bg-pink-50/70 transition-all group"
                      >
                        <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <StickerSvgRenderer type={item.svgType} />
                        </div>
                        <span className="text-[10px] text-neutral-700 font-medium mt-2 text-center line-clamp-1">
                          {item.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: CUSTOM TEXT & MONOGRAM */}
            {activeTab === 'text' && (
              <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2">
                    Nhập Chữ Hoặc Tên Khắc (Monogram)
                  </label>
                  <input
                    type="text"
                    maxLength={16}
                    value={design.customText}
                    placeholder="Ví dụ: NEKO, JENNIE, 2026..."
                    onChange={(e) => setDesign({ ...design, customText: e.target.value })}
                    className="w-full bg-pink-50/50 border border-pink-200 text-neutral-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 font-bold tracking-wider"
                  >
                  </input>
                  <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                    <span>Tối đa 16 ký tự</span>
                    <span>{design.customText.length}/16</span>
                  </div>
                </div>

                {/* Typography Style */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2">
                    Phong Cách Phông Chữ
                  </label>
                  <div className="space-y-2">
                    {FONT_OPTIONS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setDesign({ ...design, textFont: f.className })}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                          design.textFont === f.className
                            ? 'border-neutral-900 bg-pink-50/60 ring-1 ring-neutral-900'
                            : 'border-neutral-200 hover:border-pink-300'
                        }`}
                      >
                        <span className="font-medium text-neutral-700">{f.name}</span>
                        <span className={`text-sm ${f.className} text-neutral-900`}>NEKO 26</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Color */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2">
                    Màu Sắc Chữ
                  </label>
                  <div className="flex gap-2">
                    {[
                      { name: 'Đen Obsidian', hex: '#18181b' },
                      { name: 'Trắng Ngọc', hex: '#ffffff' },
                      { name: 'Hồng Neko', hex: '#ec4899' },
                      { name: 'Bạc Ánh Kim', hex: '#94a3b8' },
                    ].map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => setDesign({ ...design, textColor: c.hex })}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs ${
                          design.textColor === c.hex
                            ? 'border-neutral-900 ring-1 ring-neutral-900 bg-neutral-50 font-bold'
                            : 'border-neutral-200'
                        }`}
                      >
                        <span
                          style={{ backgroundColor: c.hex }}
                          className="w-3.5 h-3.5 rounded-full border border-neutral-300 shadow-inner"
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Layout */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2">
                    Vị Trí Đặt Chữ
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'center', label: 'Chính Giữa' },
                      { id: 'bottom-right', label: 'Góc Dưới Phải' },
                      { id: 'side-vertical', label: 'Dọc Cạnh Viền' },
                    ].map((pos) => (
                      <button
                        key={pos.id}
                        onClick={() => setDesign({ ...design, textLayout: pos.id as any })}
                        className={`py-2 text-xs rounded-xl border transition-all ${
                          design.textLayout === pos.id
                            ? 'border-neutral-900 bg-neutral-900 text-white font-medium'
                            : 'border-neutral-200 hover:border-pink-300'
                        }`}
                      >
                        {pos.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Checkout Card with Live Total Price */}
            <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-neutral-500 font-medium block">Tổng giá trị ốp thiết kế:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-neutral-900 font-mono tabular-nums">
                    {calculatedTotal.toLocaleString('vi-VN')}₫
                  </span>
                  <span className="text-xs text-neutral-400 line-through font-mono">
                    {(calculatedTotal + 100000).toLocaleString('vi-VN')}₫
                  </span>
                </div>
                <span className="text-[11px] text-pink-600 font-medium">
                  ✓ Miễn phí giao hàng toàn quốc & tặng kèm sticker pack
                </span>
              </div>

              <button
                onClick={handleAddToCartClick}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-bold text-sm shadow-lg shadow-pink-500/25 transition-all flex items-center justify-center gap-2"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Đã Thêm Vào Giỏ!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Thêm Vào Giỏ Hàng</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
