import React from 'react';

export function NekoLogo({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Sleek Minimalist Y2K Cat Head Silhouette */}
      <path
        d="M8 18L13 6L20 12C22.5 11.3 25.5 11.3 28 12L35 6L40 18C42 23 41.5 30 38 36C34 42 27 44 24 44C21 44 14 42 10 36C6.5 30 6 23 8 18Z"
        fill="currentColor"
      />
      {/* Sleek eyes */}
      <path d="M16 24C18 24 19 22 19 22" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 24C30 24 29 22 29 22" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      {/* Cute nose */}
      <path d="M23 27L25 27L24 28.5L23 27Z" fill="#ffffff" />
      {/* Whiskers */}
      <path d="M12 28L6 27M12 31L7 32" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M36 28L42 27M36 31L41 32" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function StickerSvgRenderer({ type, className = 'w-full h-full' }: { type: string; className?: string }) {
  switch (type) {
    case 'cat-silhouette':
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className}>
          <path
            d="M20 40L30 15L45 28C48 27 52 27 55 28L70 15L80 40C86 52 83 68 76 78C68 90 54 94 50 94C46 94 32 90 24 78C17 68 14 52 20 40Z"
            fill="#18181b"
          />
          <path d="M35 50Q42 46 44 54" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <path d="M65 50Q58 46 56 54" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <polygon points="48,60 52,60 50,63" fill="#ffffff" />
          <path d="M47 64Q50 67 53 64" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          {/* Y2K chrome collar */}
          <rect x="36" y="76" width="28" height="6" rx="3" fill="#f472b6" />
          <circle cx="50" cy="85" r="4" fill="#fb7185" />
        </svg>
      );

    case 'cat-sleep':
      return (
        <svg viewBox="0 0 120 80" fill="none" className={className}>
          <ellipse cx="60" cy="48" rx="42" ry="24" fill="#18181b" />
          {/* Head tucked in */}
          <circle cx="34" cy="40" r="20" fill="#18181b" />
          <polygon points="20,24 28,14 34,22" fill="#18181b" />
          <polygon points="36,22 44,14 48,25" fill="#18181b" />
          {/* Closed peaceful eyes */}
          <path d="M26 40C28 43 32 43 34 40" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
          {/* Curled tail */}
          <path d="M96 52C106 50 110 38 102 32C96 28 88 32 90 38" stroke="#18181b" strokeWidth="7" strokeLinecap="round" />
          {/* Cute pink ears interior */}
          <polygon points="23,23 28,17 32,22" fill="#f472b6" />
          {/* Zzz sparkles */}
          <text x="75" y="24" fill="#f472b6" fontSize="14" fontWeight="bold" fontFamily="monospace">z</text>
          <text x="86" y="16" fill="#ec4899" fontSize="16" fontWeight="bold" fontFamily="monospace">Z</text>
        </svg>
      );

    case 'cat-wink':
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="52" r="36" fill="#fdf2f8" stroke="#18181b" strokeWidth="4" />
          {/* Ears */}
          <polygon points="22,34 32,10 46,20" fill="#fdf2f8" stroke="#18181b" strokeWidth="4" />
          <polygon points="54,20 68,10 78,34" fill="#fdf2f8" stroke="#18181b" strokeWidth="4" />
          <polygon points="28,30 33,16 41,22" fill="#f472b6" />
          <polygon points="59,22 67,16 72,30" fill="#f472b6" />
          {/* Wink eye & open round eye */}
          <path d="M32 50C36 46 42 46 44 50" stroke="#18181b" strokeWidth="4" strokeLinecap="round" />
          <circle cx="64" cy="50" r="5" fill="#18181b" />
          <circle cx="66" cy="48" r="1.5" fill="#ffffff" />
          {/* Blush */}
          <ellipse cx="28" cy="58" rx="5" ry="3" fill="#f472b6" opacity="0.6" />
          <ellipse cx="72" cy="58" rx="5" ry="3" fill="#f472b6" opacity="0.6" />
          {/* Mouth */}
          <path d="M46 58C48 61 50 61 50 58C50 61 52 61 54 58" stroke="#18181b" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'cat-paw':
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className}>
          <ellipse cx="50" cy="62" rx="26" ry="20" fill="#f472b6" />
          <ellipse cx="24" cy="38" rx="10" ry="14" fill="#f472b6" />
          <ellipse cx="42" cy="26" rx="10" ry="15" fill="#f472b6" />
          <ellipse cx="58" cy="26" rx="10" ry="15" fill="#f472b6" />
          <ellipse cx="76" cy="38" rx="10" ry="14" fill="#f472b6" />
        </svg>
      );

    case 'star-4':
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className}>
          <path
            d="M50 0C50 27.6 27.6 50 0 50C27.6 50 50 72.4 50 100C50 72.4 72.4 50 100 50C72.4 50 50 27.6 50 0Z"
            fill="url(#chromeGrad)"
          />
          <defs>
            <linearGradient id="chromeGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fdf2f8" />
              <stop offset="0.4" stopColor="#f472b6" />
              <stop offset="0.7" stopColor="#38bdf8" />
              <stop offset="1" stopColor="#18181b" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'star-burst':
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className}>
          <path
            d="M50 4C52 32 68 48 96 50C68 52 52 68 50 96C48 68 32 52 4 50C32 48 48 32 50 4Z"
            fill="#ec4899"
          />
          <circle cx="50" cy="50" r="10" fill="#ffffff" />
        </svg>
      );

    case 'cyber-heart':
      return (
        <svg viewBox="0 0 120 80" fill="none" className={className}>
          {/* Wings */}
          <path d="M40 40C20 30 5 15 0 35C15 45 25 50 40 46" fill="#fbcfe8" stroke="#ec4899" strokeWidth="2" />
          <path d="M80 40C100 30 115 15 120 35C105 45 95 50 80 46" fill="#fbcfe8" stroke="#ec4899" strokeWidth="2" />
          {/* Heart */}
          <path
            d="M60 68L56 64C42 51 32 42 32 30C32 20 40 12 50 12C56 12 61 15 64 20C67 15 72 12 78 12C88 12 96 20 96 30C96 42 86 51 72 64L60 68Z"
            fill="#ec4899"
          />
          <path d="M44 26C42 28 42 34 46 38" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'barcode':
      return (
        <svg viewBox="0 0 140 60" fill="none" className={className}>
          <rect width="140" height="60" fill="#ffffff" rx="4" />
          {/* Barcode lines */}
          <g fill="#18181b">
            <rect x="12" y="8" width="4" height="34" />
            <rect x="20" y="8" width="2" height="34" />
            <rect x="25" y="8" width="6" height="34" />
            <rect x="35" y="8" width="3" height="34" />
            <rect x="42" y="8" width="1" height="34" />
            <rect x="46" y="8" width="5" height="34" />
            <rect x="55" y="8" width="2" height="34" />
            <rect x="61" y="8" width="7" height="34" />
            <rect x="72" y="8" width="3" height="34" />
            <rect x="78" y="8" width="5" height="34" />
            <rect x="86" y="8" width="1" height="34" />
            <rect x="91" y="8" width="6" height="34" />
            <rect x="100" y="8" width="2" height="34" />
            <rect x="106" y="8" width="4" height="34" />
            <rect x="114" y="8" width="8" height="34" />
            <rect x="125" y="8" width="3" height="34" />
          </g>
          <text x="70" y="52" fill="#18181b" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="2">
            NEKO-Y2K-2026
          </text>
        </svg>
      );

    case 'sparkles':
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M40 10C40 22 30 30 20 30C30 30 40 38 40 50C40 38 50 30 60 30C50 30 40 22 40 10Z" fill="#f472b6" />
          <path d="M75 50C75 58 68 64 60 64C68 64 75 70 75 78C75 70 82 64 90 64C82 64 75 58 75 50Z" fill="#38bdf8" />
          <circle cx="30" cy="70" r="4" fill="#fb7185" />
          <circle cx="65" cy="20" r="3" fill="#a855f7" />
        </svg>
      );

    default:
      return null;
  }
}
