import React from 'react';
import { ShieldCheck, Layers, RefreshCw, Smartphone, Eye, Sparkles } from 'lucide-react';

export function TechFeatures() {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Đệm Khí Góc 4D Ultra Bounce',
      description: 'Hệ thống túi khí phân tán lực chấn động đa hướng theo tiêu chuẩn rơi vỡ MIL-STD-810G quân sự.',
      stat: '3.5 Mét',
      statLabel: 'Độ cao chống rơi thử nghiệm',
    },
    {
      icon: Eye,
      title: 'Vòng Bảo Vệ Camera Signature',
      description: 'Gờ nhôm anot hoá dập chìm thương hiệu NEKO CASE nhô cao 2.2mm bảo vệ cụm ống kính iPhone khỏi trầy xước.',
      stat: '+2.2mm',
      statLabel: 'Gờ nổi bảo vệ ống kính',
    },
    {
      icon: RefreshCw,
      title: 'Vật Liệu Tái Chế Eco-Shock™',
      description: 'Sử dụng 65% hạt nhựa tái chế từ ốp lưng cũ thu gom, thân thiện với môi trường và giảm thiểu rác thải carbon.',
      stat: '65%',
      statLabel: 'Vật liệu tái chế bền vững',
    },
    {
      icon: Sparkles,
      title: 'Kháng Ố Vàng & Kháng Khuẩn',
      description: 'Lớp phủ công nghệ nano phân tử ngăn chặn 99% vi khuẩn bám dính và giữ ốp trong trẻo lâu dài dưới nắng gắt.',
      stat: '99.9%',
      statLabel: 'Kháng vi khuẩn bề mặt',
    },
  ];

  return (
    <section id="tech" className="py-16 bg-neutral-900 text-white relative overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-pink-400 uppercase tracking-widest mb-2">
            <span>KỸ THUẬT & VẬT LIỆU CAO CẤP</span>
            <span aria-hidden="true">·</span>
            <span>ECO-SHOCK™ LAB</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight [text-wrap:balance]">
            Bảo Vệ Tối Đa Cho Chiếc iPhone Của Bạn
          </h2>
          <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
            Chúng tôi thử nghiệm rơi tự do hàng trăm lần từ nhiều góc độ khác nhau để đảm bảo điện thoại của bạn
            luôn an toàn dù là trong phòng tập, trên phố hay những chuyến dã ngoại.
          </p>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-neutral-800/80 rounded-3xl p-6 border border-neutral-700/60 flex flex-col justify-between hover:border-pink-500/40 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-700/50">
                  <span className="block text-2xl font-extrabold text-pink-400 font-mono tabular-nums">
                    {item.stat}
                  </span>
                  <span className="text-[11px] text-neutral-400">{item.statLabel}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
