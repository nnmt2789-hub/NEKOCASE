import { PhoneModel, PhoneColor, BumperType, BumperColor, Product } from '../types';

export const PHONE_MODELS: PhoneModel[] = [
  { id: 'ip16pm', name: 'iPhone 16 Pro Max', series: '16', cameraType: 'triple', dimensions: { width: 340, height: 680, radius: 46 } },
  { id: 'ip16p', name: 'iPhone 16 Pro', series: '16', cameraType: 'triple', dimensions: { width: 320, height: 640, radius: 44 } },
  { id: 'ip16plus', name: 'iPhone 16 Plus', series: '16', cameraType: 'pill', dimensions: { width: 335, height: 670, radius: 44 } },
  { id: 'ip16', name: 'iPhone 16', series: '16', cameraType: 'pill', dimensions: { width: 315, height: 630, radius: 42 } },
  { id: 'ip15pm', name: 'iPhone 15 Pro Max', series: '15', cameraType: 'triple', dimensions: { width: 340, height: 678, radius: 44 } },
  { id: 'ip15p', name: 'iPhone 15 Pro', series: '15', cameraType: 'triple', dimensions: { width: 320, height: 638, radius: 42 } },
  { id: 'ip15', name: 'iPhone 15', series: '15', cameraType: 'dual', dimensions: { width: 315, height: 628, radius: 42 } },
  { id: 'ip14pm', name: 'iPhone 14 Pro Max', series: '14', cameraType: 'triple', dimensions: { width: 340, height: 676, radius: 44 } },
  { id: 'ip14p', name: 'iPhone 14 Pro', series: '14', cameraType: 'triple', dimensions: { width: 320, height: 636, radius: 42 } },
  { id: 'ip14', name: 'iPhone 14', series: '14', cameraType: 'dual', dimensions: { width: 315, height: 626, radius: 40 } },
  { id: 'ip13pm', name: 'iPhone 13 Pro Max', series: '13', cameraType: 'triple', dimensions: { width: 340, height: 676, radius: 42 } },
  { id: 'ip13', name: 'iPhone 13', series: '13', cameraType: 'dual', dimensions: { width: 315, height: 626, radius: 40 } },
];

export const PHONE_COLORS: PhoneColor[] = [
  { id: 'desert_titanium', name: 'Desert Titanium', hex: '#c5b49e', borderColor: '#a3937e' },
  { id: 'natural_titanium', name: 'Natural Titanium', hex: '#9e9b94', borderColor: '#83807a' },
  { id: 'black_titanium', name: 'Black Titanium', hex: '#242526', borderColor: '#151617' },
  { id: 'white_titanium', name: 'White Pearl', hex: '#f7f7f8', borderColor: '#dedfe1' },
  { id: 'sakura_pink', name: 'Sakura Blush', hex: '#ffd7e2', borderColor: '#f4adc3' },
];

export const BUMPER_TYPES: BumperType[] = [
  {
    id: 'ultra-bounce',
    name: 'Ultra Bounce Case',
    dropRating: '10x Chuẩn Quân Sự (3.5m)',
    priceDelta: 150000,
    description: 'Bảo vệ cấp độ tối cao với 4 đệm khí góc Eco-Shock™ bo vát chuẩn Y2K.',
    badge: '10x MIL-STD',
    features: ['Đệm khí Ultra Bounce góc 4D', 'Chống rơi vỡ 3.5 mét', 'Chống trầy ống kính 2.5mm', 'Vật liệu tái chế 65%'],
  },
  {
    id: 'impact',
    name: 'Impact Case',
    dropRating: '4x Chuẩn Quân Sự (2.5m)',
    priceDelta: 0,
    description: 'Thiết kế bán chạy nhất thế giới: viền mỏng nhẹ, cầm đầm tay, chống sốc bền bỉ.',
    badge: 'Best Seller',
    features: ['Viền đệm qì-tech™ 2.0', 'Chống rơi vỡ 2.5 mét', 'Trọng lượng chỉ 32g', 'Kháng ố vàng tia UV'],
  },
  {
    id: 'mirror',
    name: 'Y2K Mirror Case',
    dropRating: 'Chuẩn Chống Sốc (1.8m)',
    priceDelta: 80000,
    description: 'Mặt lưng tráng bạc phản chiếu như gương thật, sẵn sàng để check-in và soi gương.',
    badge: 'Y2K Chrome',
    features: ['Mặt gương điện giải chống vỡ', 'Gờ bảo vệ nổi 1.6mm', 'Vừa làm gương vừa là phụ kiện', 'Lớp phủ nano chống bám vân tay'],
  },
  {
    id: 'clear',
    name: 'Clear Frosted Case',
    dropRating: 'Chuẩn Chống Sốc (2.0m)',
    priceDelta: 50000,
    description: 'Mặt lưng trong suốt mịn mờ khoe trọn màu máy iPhone cao cấp, không lo ố vàng.',
    badge: 'Không Ố Vàng',
    features: ['Công nghệ UV Defend kháng ố', 'Trong suốt như pha lê', 'Mỏng chỉ 1.8mm', 'Tương thích MagSafe nam châm mạnh'],
  },
];

export const BUMPER_COLORS: BumperColor[] = [
  { id: 'pastel_pink', name: 'Pastel Neko Pink', colorHex: '#fbcfe8', accentHex: '#f472b6' },
  { id: 'stealth_black', name: 'Stealth Obsidian', colorHex: '#18181b', accentHex: '#27272a' },
  { id: 'lilac_breeze', name: 'Lilac Lavender', colorHex: '#e9d5ff', accentHex: '#c084fc' },
  { id: 'ice_frost', name: 'Ice Frost Clear', colorHex: '#f1f5f9', accentHex: '#cbd5e1' },
  { id: 'cyber_silver', name: 'Y2K Cyber Silver', colorHex: '#e2e8f0', accentHex: '#94a3b8' },
];

export interface StickerPreset {
  id: string;
  name: string;
  category: 'neko' | 'y2k' | 'stars';
  svgType: string;
}

export const STICKER_LIBRARY: StickerPreset[] = [
  { id: 'neko-minimal', name: 'Mèo Y2K Tối Giản', category: 'neko', svgType: 'cat-silhouette' },
  { id: 'neko-sleepy', name: 'Mèo Ngủ Nơ Hồng', category: 'neko', svgType: 'cat-sleep' },
  { id: 'neko-wink', name: 'Mèo Neko Nháy Mắt', category: 'neko', svgType: 'cat-wink' },
  { id: 'neko-paws', name: 'Dấu Chân Mèo', category: 'neko', svgType: 'cat-paw' },
  { id: 'chrome-star-4', name: 'Ngôi Sao Chrome 4 Cánh', category: 'stars', svgType: 'star-4' },
  { id: 'chrome-starburst', name: 'Ngôi Sao Bừng Sáng Y2K', category: 'stars', svgType: 'star-burst' },
  { id: 'cyber-heart', name: 'Trái Tim Cyber Wings', category: 'y2k', svgType: 'cyber-heart' },
  { id: 'y2k-barcode', name: 'Mã Vạch Tokyo Neko', category: 'y2k', svgType: 'barcode' },
  { id: 'sparkles-cluster', name: 'Lấp Lánh Sparkles', category: 'stars', svgType: 'sparkles' },
];

export const FONT_OPTIONS = [
  { id: 'font-sans', name: 'Modern Sans (CASETiFY)', className: 'font-sans tracking-wide uppercase font-bold' },
  { id: 'font-space', name: 'Y2K Cyber Bold', className: 'font-["Space_Grotesk"] tracking-wider uppercase font-bold' },
  { id: 'font-mono', name: 'Tech Mono Numeric', className: 'font-mono tracking-tight font-semibold' },
  { id: 'font-serif', name: 'Editorial Chic', className: 'font-serif italic font-normal tracking-wide' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Y2K Neko Starburst Case',
    subtitle: 'Phiên bản mèo Y2K ánh kim holographic kết hợp sao đa cánh',
    price: 499000,
    originalPrice: 599000,
    rating: 4.9,
    reviewsCount: 348,
    image: '/src/assets/images/product_y2k_star_cat_1793850575165.jpg',
    category: 'Y2K Cyber',
    bumperType: 'impact',
    tag: 'Best Seller',
    description: 'Mẫu ốp hot nhất mùa hè với hình tượng chú mèo tối giản Y2K nằm ngủ giữa dải ngân hà sao chrome lấp lánh trên nền hồng pastel dịu ngọt.',
    dropProtection: '4x Chuẩn Quân Sự (2.5m)',
    isBestSeller: true,
  },
  {
    id: 'prod-02',
    name: 'Tokyo Cyber Kitty Mirror',
    subtitle: 'Mặt gương tráng bạc phản chiếu kèm mã vạch Y2K sắc nét',
    price: 579000,
    originalPrice: 650000,
    rating: 5.0,
    reviewsCount: 219,
    image: '/src/assets/images/product_tokyo_cyber_mirror_1793850574471.jpg',
    category: 'Chrome Stars',
    bumperType: 'mirror',
    tag: 'Trending',
    description: 'Ốp gương chống va đập viền đen stealth bo góc thể thao. Lưng tráng bạc sáng bóng in hình bóng mèo Neko sắc nét và barcode Tokyo độc quyền.',
    dropProtection: 'Chuẩn Chống Sốc (1.8m)',
    isNew: true,
  },
  {
    id: 'prod-03',
    name: 'Ultra Bounce Eco-Paw Case',
    subtitle: 'Bảo vệ cấp độ quân sự 10x đệm khí 4 góc chống vỡ tối đa',
    price: 649000,
    originalPrice: 750000,
    rating: 4.9,
    reviewsCount: 182,
    image: '/src/assets/images/product_ultra_bounce_neko_1793850575007.jpg',
    category: 'Tokyo Pastel',
    bumperType: 'ultra-bounce',
    tag: 'Drop Test 10x',
    description: 'Đỉnh cao chống va đập cho người thích vận động và du lịch. 4 góc đệm khí hình học bảo vệ hoàn hảo cụm camera 3 mắt của iPhone 16 Pro Max.',
    dropProtection: '10x Chuẩn Quân Sự (3.5m)',
    isBestSeller: true,
  },
  {
    id: 'prod-04',
    name: 'Sleepy Neko Crystal Clear',
    subtitle: 'Mặt lưng trong suốt pha lê nét vẽ chỉ bạc ánh sao',
    price: 529000,
    originalPrice: 590000,
    rating: 4.8,
    reviewsCount: 164,
    image: '/src/assets/images/product_clear_line_neko_1793850575686.jpg',
    category: 'Minimal Neko',
    bumperType: 'clear',
    tag: 'Kháng Ố Vàng',
    description: 'Dành riêng cho những ai muốn giữ nguyên màu sắc Titanium sang trọng của máy. Nét vẽ mèo ngủ viền bạc mảnh mai phản chiếu ánh hồng pastel.',
    dropProtection: 'Chuẩn Chống Sốc (2.0m)',
    isNew: true,
  },
  {
    id: 'prod-05',
    name: 'Signature Neko Metal Emblem',
    subtitle: 'Ốp viền hồng pastel mềm mại kèm huy hiệu mèo kim loại dập nổi',
    price: 549000,
    originalPrice: 620000,
    rating: 4.9,
    reviewsCount: 298,
    image: '/src/assets/images/hero_neko_campaign_1793850572544.jpg',
    category: 'Tokyo Pastel',
    bumperType: 'impact',
    tag: 'Signature Drop',
    description: 'Mẫu ốp đại diện cho thương hiệu NEKO CASE với biểu tượng chú mèo mặt tròn mạ bạc 3D nổi bật trên nền hồng phấn matte mượt như da em bé.',
    dropProtection: '4x Chuẩn Quân Sự (2.5m)',
    isBestSeller: true,
  },
  {
    id: 'prod-06',
    name: 'Cyber Neon Stars Neko',
    subtitle: 'Phong cách Y2K đường phố với họa tiết sticker sao đan xen',
    price: 499000,
    originalPrice: 580000,
    rating: 4.8,
    reviewsCount: 145,
    image: '/src/assets/images/product_y2k_star_cat_1793850575165.jpg',
    category: 'Y2K Cyber',
    bumperType: 'impact',
    tag: 'Limited Edition',
    description: 'Sự pha trộn phá cách giữa màu hồng pastel dịu dàng và năng lượng Y2K mạnh mẽ, tôn trọn vẻ đẹp của các dòng iPhone từ 13 đến 16 Pro Max.',
    dropProtection: '4x Chuẩn Quân Sự (2.5m)',
  },
];
