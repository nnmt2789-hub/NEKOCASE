import React, { useState } from 'react';
import { CartItem, PaymentMethod, Order } from '../types';
import { X, CheckCircle2, ShieldCheck, QrCode, CreditCard, Banknote, ArrowLeft, PackageCheck } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discount: number;
  promoCode: string;
  onOrderSuccess: (order: Order) => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  items,
  discount,
  promoCode,
  onOrderSuccess,
}: CheckoutModalProps) {
  if (!isOpen) return null;

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

  const [form, setForm] = useState({
    fullName: '',
    phoneNumber: '',
    shippingAddress: '',
    districtCity: 'Hà Nội',
    note: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 499000 || subtotal === 0 ? 0 : 30000;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const validateForm = () => {
    const errs: { [key: string]: string } = {};
    if (!form.fullName.trim()) errs.fullName = 'Vui lòng nhập họ và tên';
    if (!form.phoneNumber.trim()) {
      errs.phoneNumber = 'Vui lòng nhập số điện thoại';
    } else if (!/(0[3|5|7|8|9])+([0-9]{8})\b/.test(form.phoneNumber.replace(/\s/g, ''))) {
      errs.phoneNumber = 'Số điện thoại không hợp lệ (10 chữ số)';
    }
    if (!form.shippingAddress.trim()) errs.shippingAddress = 'Vui lòng nhập địa chỉ nhận hàng';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newOrder: Order = {
      id: `NEKO-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      items: [...items],
      customerInfo: { ...form },
      paymentMethod,
      subtotal,
      discount,
      shippingFee,
      total,
      status: 'confirmed',
    };

    setCreatedOrder(newOrder);
    setStep('success');
    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-pink-100 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-pink-100 flex items-center justify-between bg-pink-50/40">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-neutral-900 uppercase tracking-wider font-mono">
              NEKO CHECKOUT
            </span>
            <span className="text-neutral-400">·</span>
            <span className="text-xs text-pink-600 font-semibold">Thanh Toán An Toàn</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: FORM & PAYMENT */}
        {step === 'form' && (
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
            {/* Delivery Information */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-3 flex items-center gap-2">
                <span>1. Thông Tin Nhận Hàng</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Họ và tên người nhận *
                  </label>
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border ${
                      errors.fullName ? 'border-rose-500 bg-rose-50/30' : 'border-neutral-200 bg-neutral-50/50'
                    } focus:outline-none focus:ring-1 focus:ring-pink-500`}
                  />
                  {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Số điện thoại liên hệ *
                  </label>
                  <input
                    type="tel"
                    placeholder="0912 345 678"
                    value={form.phoneNumber}
                    onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border ${
                      errors.phoneNumber ? 'border-rose-500 bg-rose-50/30' : 'border-neutral-200 bg-neutral-50/50'
                    } focus:outline-none focus:ring-1 focus:ring-pink-500 font-mono`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.phoneNumber}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Địa chỉ nhận hàng chi tiết (Số nhà, đường/phố) *
                  </label>
                  <input
                    type="text"
                    placeholder="Số 25 ngõ 102 phố Kim Mã, Ba Đình"
                    value={form.shippingAddress}
                    onChange={(e) => setForm({ ...form, shippingAddress: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border ${
                      errors.shippingAddress ? 'border-rose-500 bg-rose-50/30' : 'border-neutral-200 bg-neutral-50/50'
                    } focus:outline-none focus:ring-1 focus:ring-pink-500`}
                  />
                  {errors.shippingAddress && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.shippingAddress}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Tỉnh / Thành phố
                  </label>
                  <select
                    value={form.districtCity}
                    onChange={(e) => setForm({ ...form, districtCity: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-200 bg-neutral-50/50 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  >
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Bình Dương">Bình Dương</option>
                    <option value="Đồng Nai">Đồng Nai</option>
                    <option value="Tỉnh thành khác">Tỉnh thành khác...</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Ghi chú đơn hàng (Tuỳ chọn)
                  </label>
                  <input
                    type="text"
                    placeholder="Giao giờ hành chính, gọi trước khi đến..."
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-200 bg-neutral-50/50 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-3 flex items-center gap-2">
                <span>2. Phương Thức Thanh Toán</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Option 1: COD */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-pink-500 bg-pink-50/60 ring-2 ring-pink-500/20'
                      : 'border-neutral-200 hover:border-pink-200'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-neutral-800 mb-2" />
                  <div>
                    <span className="block text-xs font-bold text-neutral-900">COD Tiền Mặt</span>
                    <span className="text-[11px] text-neutral-500">Thanh toán khi nhận kiện hàng</span>
                  </div>
                </button>

                {/* Option 2: VietQR Transfer */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank_qr')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'bank_qr'
                      ? 'border-pink-500 bg-pink-50/60 ring-2 ring-pink-500/20'
                      : 'border-neutral-200 hover:border-pink-200'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-neutral-800 mb-2" />
                  <div>
                    <span className="block text-xs font-bold text-neutral-900">QR Ngân Hàng</span>
                    <span className="text-[11px] text-neutral-500">Quét mã Napas 24/7 tức thì</span>
                  </div>
                </button>

                {/* Option 3: Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'card'
                      ? 'border-pink-500 bg-pink-50/60 ring-2 ring-pink-500/20'
                      : 'border-neutral-200 hover:border-pink-200'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-neutral-800 mb-2" />
                  <div>
                    <span className="block text-xs font-bold text-neutral-900">Thẻ Quốc Tế</span>
                    <span className="text-[11px] text-neutral-500">Visa / Mastercard / JCB</span>
                  </div>
                </button>
              </div>

              {/* QR Code preview when bank_qr selected */}
              {paymentMethod === 'bank_qr' && (
                <div className="mt-4 p-4 rounded-2xl bg-neutral-900 text-white flex items-center gap-4">
                  <div className="w-20 h-20 bg-white rounded-xl p-1 shrink-0 flex items-center justify-center">
                    {/* Simulated QR Pattern */}
                    <div className="w-full h-full border-2 border-neutral-900 rounded p-1 flex flex-col justify-between">
                      <div className="flex justify-between">
                        <div className="w-3.5 h-3.5 bg-black" />
                        <div className="w-3.5 h-3.5 bg-black" />
                      </div>
                      <div className="text-[7px] text-center font-bold text-black font-mono">NEKO QR</div>
                      <div className="flex justify-between">
                        <div className="w-3.5 h-3.5 bg-black" />
                        <div className="w-2 h-2 bg-pink-500" />
                      </div>
                    </div>
                  </div>
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-pink-300">Ngân hàng MB Bank (Quân Đội)</p>
                    <p className="font-mono text-[11px] text-neutral-300">STK: 8888 9999 NEKO</p>
                    <p className="text-[11px] text-neutral-400">Chủ TK: NEKO CASE VIETNAM</p>
                    <p className="text-[11px] text-neutral-400">Nội dung: SĐT Đặt Hàng</p>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary & Submit Button */}
            <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-neutral-500 block">Tổng số tiền thanh toán:</span>
                <span className="text-2xl font-extrabold text-neutral-900 font-mono tabular-nums">
                  {total.toLocaleString('vi-VN')}₫
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs shadow-lg shadow-pink-500/25 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Xác Nhận Đặt Hàng</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: ORDER CONFIRMATION RECEIPT */}
        {step === 'success' && createdOrder && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-neutral-900">
                Đặt Hàng Thành Công!
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Cảm ơn bạn đã lựa chọn NEKO CASE. Đơn hàng của bạn đang được chuyển đến studio chuẩn bị.
              </p>
            </div>

            {/* Receipt Box */}
            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <div>
                  <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">MÃ ĐƠN HÀNG</span>
                  <span className="text-sm font-extrabold text-pink-600 font-mono">{createdOrder.id}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">THỜI GIAN</span>
                  <span className="text-xs font-medium text-neutral-700 font-mono">{createdOrder.createdAt}</span>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="text-xs space-y-1 text-neutral-700">
                <p>
                  <strong>Người nhận:</strong> {createdOrder.customerInfo.fullName} (
                  <span className="font-mono">{createdOrder.customerInfo.phoneNumber}</span>)
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {createdOrder.customerInfo.shippingAddress},{' '}
                  {createdOrder.customerInfo.districtCity}
                </p>
                <p>
                  <strong>Phương thức:</strong>{' '}
                  {createdOrder.paymentMethod === 'cod'
                    ? 'Thanh toán khi nhận hàng (COD)'
                    : createdOrder.paymentMethod === 'bank_qr'
                    ? 'Chuyển khoản QR Napas'
                    : 'Thẻ Quốc Tế'}
                </p>
              </div>

              {/* Items summary */}
              <div className="border-t border-neutral-200 pt-3 space-y-2">
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider block font-bold">
                  SẢN PHẨM TRONG ĐƠN ({createdOrder.items.length})
                </span>
                {createdOrder.items.map((it) => (
                  <div key={it.id} className="flex justify-between text-xs text-neutral-800">
                    <span className="truncate max-w-[280px]">
                      {it.quantity}x {it.name} ({it.phoneModel})
                    </span>
                    <span className="font-mono tabular-nums font-semibold">
                      {(it.price * it.quantity).toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Paid */}
              <div className="border-t border-neutral-200 pt-3 flex justify-between items-baseline">
                <span className="text-xs font-bold text-neutral-900">Tổng thanh toán:</span>
                <span className="text-lg font-extrabold text-pink-600 font-mono tabular-nums">
                  {createdOrder.total.toLocaleString('vi-VN')}₫
                </span>
              </div>
            </div>

            {/* Shipment Tracking Timeline */}
            <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-pink-700 font-semibold">
                <PackageCheck className="w-4 h-4" />
                <span>Trạng thái: Đang chuẩn bị và in tại Studio Lab</span>
              </div>
              <span className="text-[11px] text-neutral-500">Dự kiến giao: 2-3 ngày</span>
            </div>

            {/* Return Button */}
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Tiếp Tục Mua Sắm</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
