export type PhoneSeries = '16' | '15' | '14' | '13';

export interface PhoneModel {
  id: string;
  name: string;
  series: PhoneSeries;
  cameraType: 'triple' | 'dual' | 'pill';
  dimensions: { width: number; height: number; radius: number };
}

export interface PhoneColor {
  id: string;
  name: string;
  hex: string;
  borderColor: string;
}

export type BumperTypeId = 'ultra-bounce' | 'impact' | 'mirror' | 'clear';

export interface BumperType {
  id: BumperTypeId;
  name: string;
  dropRating: string;
  priceDelta: number;
  description: string;
  badge: string;
  features: string[];
}

export interface BumperColor {
  id: string;
  name: string;
  colorHex: string;
  accentHex: string;
}

export interface PlacedSticker {
  id: string;
  stickerId: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  scale: number;
  rotation: number;
}

export interface CustomDesign {
  phoneModel: string;
  phoneColor: string;
  bumperType: BumperTypeId;
  bumperColor: string;
  userImage: string | null;
  imageScale: number;
  imageRotate: number;
  imagePosition: { x: number; y: number };
  placedStickers: PlacedSticker[];
  customText: string;
  textFont: string;
  textColor: string;
  textLayout: 'center' | 'bottom-right' | 'side-vertical' | 'arc';
  totalPrice: number;
  previewThumbnail?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  category: 'Y2K Cyber' | 'Tokyo Pastel' | 'Minimal Neko' | 'Chrome Stars';
  bumperType: BumperTypeId;
  tag?: string;
  description: string;
  dropProtection: string;
  isBestSeller?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  id: string;
  productId?: string;
  customDesign?: CustomDesign;
  name: string;
  phoneModel: string;
  bumperType: string;
  bumperColor: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderCustomerInfo {
  fullName: string;
  phoneNumber: string;
  shippingAddress: string;
  districtCity: string;
  note?: string;
}

export type PaymentMethod = 'cod' | 'bank_qr' | 'card';

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  customerInfo: OrderCustomerInfo;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  status: 'confirmed' | 'shipping' | 'delivered';
}
