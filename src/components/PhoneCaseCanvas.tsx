import React, { useRef } from 'react';
import { CustomDesign, PhoneModel } from '../types';
import { PHONE_MODELS, PHONE_COLORS, BUMPER_TYPES, BUMPER_COLORS } from '../data/constants';
import { StickerSvgRenderer } from './NekoSvgStickers';

interface PhoneCaseCanvasProps {
  design: CustomDesign;
  onRemoveSticker?: (id: string) => void;
  interactive?: boolean;
}

export function PhoneCaseCanvas({ design, onRemoveSticker, interactive = true }: PhoneCaseCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const currentModel = PHONE_MODELS.find((m) => m.name === design.phoneModel) || PHONE_MODELS[0];
  const currentPhoneColor = PHONE_COLORS.find((c) => c.name === design.phoneColor) || PHONE_COLORS[0];
  const currentBumper = BUMPER_TYPES.find((b) => b.id === design.bumperType) || BUMPER_TYPES[1];
  const currentBumperColor = BUMPER_COLORS.find((b) => b.name === design.bumperColor) || BUMPER_COLORS[0];

  const isUltraBounce = design.bumperType === 'ultra-bounce';
  const isMirror = design.bumperType === 'mirror';
  const isClear = design.bumperType === 'clear';

  return (
    <div className="relative flex items-center justify-center select-none py-6">
      {/* Outer Phone Case Shadow */}
      <div
        ref={containerRef}
        style={{
          width: '320px',
          height: '640px',
          borderRadius: '52px',
        }}
        className="relative transition-all duration-300 shadow-2xl overflow-visible"
      >
        {/* ULTRA BOUNCE 4-CORNER AIR CUSHIONS */}
        {isUltraBounce && (
          <>
            {/* Top-Left Corner Bumper */}
            <div
              style={{ backgroundColor: currentBumperColor.accentHex }}
              className="absolute -top-3 -left-3 w-14 h-14 rounded-2xl border-2 border-white/60 shadow-md flex items-center justify-center z-10 rotate-[-12deg]"
            >
              <div className="w-5 h-5 rounded-md bg-white/30 border border-white/40" />
            </div>
            {/* Top-Right Corner Bumper */}
            <div
              style={{ backgroundColor: currentBumperColor.accentHex }}
              className="absolute -top-3 -right-3 w-14 h-14 rounded-2xl border-2 border-white/60 shadow-md flex items-center justify-center z-10 rotate-[12deg]"
            >
              <div className="w-5 h-5 rounded-md bg-white/30 border border-white/40" />
            </div>
            {/* Bottom-Left Corner Bumper */}
            <div
              style={{ backgroundColor: currentBumperColor.accentHex }}
              className="absolute -bottom-3 -left-3 w-14 h-14 rounded-2xl border-2 border-white/60 shadow-md flex items-center justify-center z-10 rotate-[12deg]"
            >
              <div className="w-5 h-5 rounded-md bg-white/30 border border-white/40" />
            </div>
            {/* Bottom-Right Corner Bumper */}
            <div
              style={{ backgroundColor: currentBumperColor.accentHex }}
              className="absolute -bottom-3 -right-3 w-14 h-14 rounded-2xl border-2 border-white/60 shadow-md flex items-center justify-center z-10 rotate-[-12deg]"
            >
              <div className="w-5 h-5 rounded-md bg-white/30 border border-white/40" />
            </div>
          </>
        )}

        {/* Bumper Outer Frame */}
        <div
          style={{
            backgroundColor: currentBumperColor.colorHex,
            border: `6px solid ${currentBumperColor.accentHex}`,
            borderRadius: '52px',
          }}
          className="absolute inset-0 shadow-inner overflow-hidden"
        >
          {/* Internal phone back surface */}
          <div
            style={{
              backgroundColor: isClear ? 'transparent' : isMirror ? 'transparent' : currentPhoneColor.hex,
              borderRadius: '44px',
            }}
            className={`absolute inset-1.5 overflow-hidden ${
              isMirror
                ? 'bg-gradient-to-tr from-slate-200 via-white to-slate-300'
                : isClear
                ? 'bg-gradient-to-br from-white/70 to-pink-50/50 backdrop-blur-sm'
                : ''
            }`}
          >
            {/* Mirror Sheen Overlay for Mirror Case */}
            {isMirror && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 opacity-80 pointer-events-none" />
            )}

            {/* Clear Case Inner Phone Color Preview */}
            {isClear && (
              <div
                style={{ backgroundColor: currentPhoneColor.hex }}
                className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none"
              />
            )}

            {/* User Uploaded Image Layer */}
            {design.userImage && (
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <img
                  src={design.userImage}
                  alt="User artwork"
                  style={{
                    transform: `translate(${design.imagePosition.x}px, ${design.imagePosition.y}px) scale(${design.imageScale}) rotate(${design.imageRotate}deg)`,
                    maxWidth: 'none',
                  }}
                  className="w-full h-auto object-cover opacity-95 transition-transform duration-75"
                />
              </div>
            )}

            {/* Default decorative watermark when no image uploaded */}
            {!design.userImage && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20">
                <div className="w-24 h-24 text-slate-800">
                  <StickerSvgRenderer type="cat-silhouette" />
                </div>
                <p className="text-xs uppercase tracking-widest font-mono text-slate-700 mt-2">
                  NEKO CASE LAB
                </p>
              </div>
            )}

            {/* Placed Stickers Layer */}
            {design.placedStickers.map((sticker) => (
              <div
                key={sticker.id}
                style={{
                  left: `${sticker.x}%`,
                  top: `${sticker.y}%`,
                  transform: `translate(-50%, -50%) scale(${sticker.scale}) rotate(${sticker.rotation}deg)`,
                }}
                className="absolute group z-20 cursor-pointer"
              >
                <div className="w-16 h-16 drop-shadow-lg filter">
                  <StickerSvgRenderer type={sticker.stickerId} />
                </div>
                {interactive && onRemoveSticker && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveSticker(sticker.id);
                    }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 text-white rounded-full text-xs font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    title="Xóa sticker"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}

            {/* Custom Text / Monogram Layer */}
            {design.customText && (
              <div
                className={`absolute z-20 pointer-events-none ${
                  design.textLayout === 'center'
                    ? 'inset-x-0 bottom-28 text-center px-4'
                    : design.textLayout === 'bottom-right'
                    ? 'bottom-12 right-6 text-right'
                    : design.textLayout === 'side-vertical'
                    ? 'bottom-24 right-3 -rotate-90 origin-bottom-right'
                    : 'inset-x-0 bottom-16 text-center'
                }`}
              >
                <span
                  style={{ color: design.textColor }}
                  className={`text-2xl drop-shadow-md inline-block px-3 py-1 ${design.textFont}`}
                >
                  {design.customText}
                </span>
              </div>
            )}

            {/* SIGNATURE CASETiFY CAMERA RING WITH "NEKO CASE" */}
            <div
              style={{
                width: currentModel.cameraType === 'triple' ? '128px' : '96px',
                height: currentModel.cameraType === 'triple' ? '134px' : currentModel.cameraType === 'pill' ? '146px' : '106px',
              }}
              className="absolute top-4 left-4 z-30 rounded-3xl bg-neutral-900 border-[3px] border-neutral-700 shadow-xl p-2.5 flex flex-col justify-between"
            >
              {/* Printed Ring Text Around Bezel */}
              <div className="absolute inset-0 rounded-3xl border border-neutral-800 pointer-events-none flex items-center justify-center">
                <span className="absolute top-1 text-[7px] font-mono tracking-wider font-semibold text-neutral-300 uppercase">
                  NEKO CASE · DROP TESTED
                </span>
                <span className="absolute bottom-1 text-[6.5px] font-mono tracking-widest text-pink-400 font-semibold uppercase">
                  TOKYO / SEOUL
                </span>
              </div>

              {/* Lenses Grid */}
              {currentModel.cameraType === 'triple' ? (
                <div className="relative w-full h-full flex flex-col justify-between items-center py-1">
                  {/* Top Left Lens */}
                  <div className="absolute top-2 left-1.5 w-11 h-11 rounded-full bg-black border-2 border-neutral-700 flex items-center justify-center shadow-inner">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-sky-950 via-slate-900 to-indigo-900 border border-neutral-600 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-sky-300/60" />
                    </div>
                  </div>
                  {/* Bottom Left Lens */}
                  <div className="absolute bottom-2 left-1.5 w-11 h-11 rounded-full bg-black border-2 border-neutral-700 flex items-center justify-center shadow-inner">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-sky-950 via-slate-900 to-indigo-900 border border-neutral-600 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-sky-300/60" />
                    </div>
                  </div>
                  {/* Right Middle Lens */}
                  <div className="absolute top-7 right-1.5 w-11 h-11 rounded-full bg-black border-2 border-neutral-700 flex items-center justify-center shadow-inner">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-sky-950 via-slate-900 to-indigo-900 border border-neutral-600 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-sky-300/60" />
                    </div>
                  </div>
                  {/* Flash */}
                  <div className="absolute top-2.5 right-4 w-4 h-4 rounded-full bg-amber-100 border border-amber-300 shadow-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  </div>
                  {/* LiDAR Scanner */}
                  <div className="absolute bottom-3 right-4 w-3.5 h-3.5 rounded-full bg-neutral-800 border border-neutral-600" />
                </div>
              ) : (
                /* Dual / Pill camera for base iPhones */
                <div className="relative w-full h-full flex flex-col justify-around items-center">
                  <div className="w-10 h-10 rounded-full bg-black border-2 border-neutral-700 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-indigo-950 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-sky-300/60" />
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-black border-2 border-neutral-700 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-indigo-950 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-sky-300/60" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* MagSafe Magnet Alignment Ring (subtle outline indicator) */}
            <div className="absolute top-44 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full border-2 border-dashed border-white/20 pointer-events-none flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border border-white/20" />
              <div className="absolute -bottom-8 w-1.5 h-6 rounded-full bg-white/20" />
            </div>

            {/* Subtle Brand Watermark at Bottom */}
            <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none">
              <span className="text-[9px] font-mono tracking-widest text-neutral-800/60 uppercase font-semibold">
                NEKO CASE · MIL-STD-810G
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
