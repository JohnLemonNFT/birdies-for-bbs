// Birdies for BBS Logo Components
// Clean, professional logo combining golf (birdie) + heart (charity) elements

export function LogoIcon({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle - emerald gradient */}
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="flagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      {/* Main circle */}
      <circle cx="32" cy="32" r="30" fill="url(#logoGrad)" />

      {/* Golf flag pole */}
      <rect x="30" y="14" width="2.5" height="32" fill="white" rx="1" />

      {/* Flag - stylized bird wing shape */}
      <path
        d="M32.5 14 L50 22 C50 22 45 26 32.5 26 Z"
        fill="url(#flagGrad)"
      />

      {/* Golf ball at base */}
      <circle cx="31" cy="48" r="6" fill="white" />
      <circle cx="29" cy="46" r="1" fill="#e5e7eb" />
      <circle cx="33" cy="47" r="1" fill="#e5e7eb" />
      <circle cx="30" cy="50" r="1" fill="#e5e7eb" />

      {/* Small heart accent */}
      <path
        d="M46 38 C46 36 48 35 49 36.5 C50 35 52 36 52 38 C52 40 49 43 49 43 C49 43 46 40 46 38Z"
        fill="#f87171"
      />
    </svg>
  );
}

export function LogoFull({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoIcon className="w-12 h-12" />
      <div className="flex flex-col">
        <span className="font-black text-xl text-gray-800 leading-tight tracking-tight">
          Birdies for BBS
        </span>
        <span className="text-xs text-emerald-600 font-semibold -mt-0.5">
          Wyatt's Golf Tournament
        </span>
      </div>
    </div>
  );
}

export function LogoStacked({ className = "", dark = false }) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <LogoIcon className="w-20 h-20 mb-3" />
      <span className={`font-black text-2xl leading-tight tracking-tight ${dark ? 'text-white' : 'text-gray-800'}`}>
        Birdies for BBS
      </span>
      <span className={`text-sm font-semibold mt-1 ${dark ? 'text-emerald-300' : 'text-emerald-600'}`}>
        Wyatt's Golf Tournament
      </span>
    </div>
  );
}

// Simplified emblem for small sizes (favicon, badges)
export function LogoEmblem({ className = "w-8 h-8" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="emblemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      <circle cx="16" cy="16" r="15" fill="url(#emblemGrad)" />

      {/* Simplified flag */}
      <rect x="14.5" y="7" width="2" height="16" fill="white" rx="1" />
      <path d="M16.5 7 L26 11 L16.5 15 Z" fill="#fbbf24" />

      {/* Simplified ball */}
      <circle cx="15.5" cy="24" r="3.5" fill="white" />
    </svg>
  );
}

// White version for dark backgrounds
export function LogoIconWhite({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outline circle */}
      <circle cx="32" cy="32" r="29" stroke="white" strokeWidth="2" fill="none" />

      {/* Golf flag pole */}
      <rect x="30" y="14" width="2.5" height="32" fill="white" rx="1" />

      {/* Flag */}
      <path d="M32.5 14 L50 22 C50 22 45 26 32.5 26 Z" fill="white" fillOpacity="0.9" />

      {/* Golf ball at base */}
      <circle cx="31" cy="48" r="6" stroke="white" strokeWidth="2" fill="none" />

      {/* Heart accent */}
      <path
        d="M46 38 C46 36 48 35 49 36.5 C50 35 52 36 52 38 C52 40 49 43 49 43 C49 43 46 40 46 38Z"
        fill="#f87171"
      />
    </svg>
  );
}
