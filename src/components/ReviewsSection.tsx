import React from 'react';
import { Star, CheckCircle, Heart } from 'lucide-react';

export function ReviewsSection() {
  const reviews = [
    {
      id: 'rev-1',
      name: 'Khánh Linh (Hà Nội)',
      device: 'iPhone 16 Pro Max · Ultra Bounce',
      rating: 5,
      date: 'Tháng 10, 2026',
      content:
        'Ốp xinh xỉu luôn! Màu hồng pastel ngọt ngào mà viền đệm 4 góc cầm rất chắc tay. Mình làm rơi cầu thang 1 lần máy không hề bị trầy một vết nào!',
      designChoice: 'Mèo Y2K Starburst + Khắc tên K.LINH',
    },
    {
      id: 'rev-2',
      name: 'Minh Trang (TP.HCM)',
      device: 'iPhone 15 Pro · Y2K Mirror Case',
      rating: 5,
      date: 'Tháng 10, 2026',
      content:
        'Mặt gương tráng bạc soi gương cực nét, check-in gương quán cafe bạn bè ai cũng hỏi mua ở đâu. Vòng camera chữ NEKO CASE trông rất chất chơi.',
      designChoice: 'Tokyo Cyber Kitty Mirror',
    },
    {
      id: 'rev-3',
      name: 'Hải Đăng (Đà Nẵng)',
      device: 'iPhone 16 · Impact Case',
      rating: 5,
      date: 'Tháng 9, 2026',
      content:
        'Studio tự thiết kế trên web rất mượt, mình tự tải ảnh chú mèo cưng của mình lên in ra màu sắc cực chuẩn, không bị vỡ hạt.',
      designChoice: 'Tự Tải Ảnh Cưng + Sticker Neko',
    },
  ];

  return (
    <section id="reviews" className="py-16 bg-[#FFF8FA] border-t border-pink-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-pink-600 uppercase tracking-widest mb-1.5">
            <span>ĐÁNH GIÁ THỰC TẾ</span>
            <span aria-hidden="true">·</span>
            <span>COMMUNITY #NEKOCASE</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900">
            Khách Hàng Nói Gì Về NEKO CASE?
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-neutral-600">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-neutral-900 font-mono">4.9 / 5.0</span>
            <span className="text-neutral-400">từ hơn 2.400 lượt đánh giá</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-400 font-mono">{r.date}</span>
                </div>

                <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                  "{r.content}"
                </p>

                <div className="bg-pink-50/60 rounded-xl p-2.5 text-[11px] text-pink-700 font-medium mb-4 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 shrink-0" />
                  <span className="truncate">Thiết kế: {r.designChoice}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 flex items-center gap-1">
                    {r.name}
                    <CheckCircle className="w-3.5 h-3.5 text-pink-500 fill-pink-50" />
                  </h4>
                  <span className="text-[11px] text-neutral-500">{r.device}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
