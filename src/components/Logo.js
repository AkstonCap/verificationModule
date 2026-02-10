export default function Logo({ size = 40 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4568" stopOpacity="1" />
          <stop offset="100%" stopColor="#f0aa21" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="checkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff5e0" stopOpacity="1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer ring */}
      <circle cx="50" cy="50" r="46" fill="none" stroke="url(#shieldGrad)" strokeWidth="2.5" opacity="0.35" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="url(#shieldGrad)" strokeWidth="0.8" strokeDasharray="6 4" opacity="0.25" />

      {/* Shield body */}
      <path
        d="M 50 10 L 84 26 C 84 26 86 58 72 76 C 62 88 50 93 50 93 C 50 93 38 88 28 76 C 14 58 16 26 16 26 Z"
        fill="url(#shieldGrad)"
        opacity="0.9"
      />

      {/* Shield inner highlight */}
      <path
        d="M 50 16 L 78 30 C 78 30 80 56 68 72 C 60 82 50 86 50 86 C 50 86 40 82 32 72 C 20 56 22 30 22 30 Z"
        fill="none"
        stroke="#fff5e0"
        strokeWidth="0.8"
        opacity="0.4"
      />

      {/* Checkmark */}
      <polyline
        points="35,52 46,64 67,38"
        fill="none"
        stroke="url(#checkGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
      />

      {/* Chain-link dots */}
      <circle cx="50" cy="4" r="2" fill="#ef4568" opacity="0.6" />
      <circle cx="80" cy="14" r="1.5" fill="#f0aa21" opacity="0.5" />
      <circle cx="96" cy="50" r="2" fill="#ef4568" opacity="0.6" />
      <circle cx="80" cy="86" r="1.5" fill="#f0aa21" opacity="0.5" />
      <circle cx="50" cy="96" r="2" fill="#ef4568" opacity="0.6" />
      <circle cx="20" cy="86" r="1.5" fill="#f0aa21" opacity="0.5" />
      <circle cx="4" cy="50" r="2" fill="#ef4568" opacity="0.6" />
      <circle cx="20" cy="14" r="1.5" fill="#f0aa21" opacity="0.5" />
    </svg>
  );
}
