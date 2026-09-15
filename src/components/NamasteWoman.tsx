export function NamasteWoman() {
  return (
    <svg
      viewBox="0 0 400 680"
      className="figure-enter h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="halo" cx="50%" cy="38%" r="48%">
          <stop offset="0%" stopColor="#f0d48a" stopOpacity="0.42" />
          <stop offset="55%" stopColor="#c45c6a" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#14080d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sari" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b33852" />
          <stop offset="45%" stopColor="#7a2438" />
          <stop offset="100%" stopColor="#4c1524" />
        </linearGradient>
        <linearGradient id="sariFold" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#d25a6e" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#3d101c" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8e7b0" />
          <stop offset="50%" stopColor="#e0b84c" />
          <stop offset="100%" stopColor="#b8862a" />
        </linearGradient>
        <linearGradient id="choli" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0d48a" />
          <stop offset="100%" stopColor="#c4922a" />
        </linearGradient>
        <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0c4a0" />
          <stop offset="100%" stopColor="#d19a72" />
        </linearGradient>
        <linearGradient id="hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2418" />
          <stop offset="100%" stopColor="#140c08" />
        </linearGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
      </defs>

      <ellipse cx="200" cy="250" rx="170" ry="190" fill="url(#halo)" />

      <g className="mandala" opacity="0.35">
        <circle cx="200" cy="280" r="168" fill="none" stroke="#f0d48a" strokeWidth="0.6" />
        <circle cx="200" cy="280" r="148" fill="none" stroke="#f0d48a" strokeWidth="0.4" />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2;
          const x1 = 200 + Math.cos(a) * 70;
          const y1 = 280 + Math.sin(a) * 70;
          const x2 = 200 + Math.cos(a) * 168;
          const y2 = 280 + Math.sin(a) * 168;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#f0d48a"
              strokeWidth="0.5"
            />
          );
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
          const x = 200 + Math.cos(a) * 118;
          const y = 280 + Math.sin(a) * 118;
          return (
            <ellipse
              key={`p-${i}`}
              cx={x}
              cy={y}
              rx="14"
              ry="22"
              fill="none"
              stroke="#f0d48a"
              strokeWidth="0.7"
              transform={`rotate(${(a * 180) / Math.PI + 90} ${x} ${y})`}
            />
          );
        })}
      </g>

      <ellipse
        className="shadow-bow"
        cx="200"
        cy="638"
        rx="92"
        ry="14"
        fill="#0a0406"
        opacity="0.45"
      />

      <g className="skirt-sway">
        <path
          d="M132 368 C118 430, 86 520, 78 628 L322 628 C314 520, 282 430, 268 368 Z"
          fill="url(#sari)"
        />
        <path
          d="M168 372 C158 450, 148 530, 142 628 L186 628 C180 520, 176 430, 200 372 Z"
          fill="url(#sariFold)"
        />
        <path
          d="M232 372 C224 430, 220 520, 214 628 L258 628 C252 530, 242 450, 232 372 Z"
          fill="url(#sariFold)"
          opacity="0.7"
        />
        <path
          d="M84 612 C120 600, 200 618, 316 612 L322 628 L78 628 Z"
          fill="url(#gold)"
        />
        <path
          d="M90 608 C130 598, 200 612, 310 608"
          fill="none"
          stroke="#7a2438"
          strokeWidth="1.2"
          opacity="0.4"
        />
      </g>

      <g className="figure-bow">
        <path
          d="M248 220 C300 250, 318 340, 292 430 C270 390, 250 340, 238 292 C232 260, 236 232, 248 220 Z"
          fill="url(#sari)"
          opacity="0.92"
        />
        <path
          d="M248 220 C300 250, 310 320, 286 400"
          fill="none"
          stroke="url(#gold)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        <path
          d="M146 216 C118 248, 102 292, 124 328 C138 312, 160 294, 182 278 C168 268, 150 248, 160 222 Z"
          fill="url(#skin)"
        />
        <path
          d="M254 216 C282 248, 298 292, 276 328 C262 312, 240 294, 218 278 C232 268, 250 248, 240 222 Z"
          fill="url(#skin)"
        />

        <path
          d="M148 208 C140 248, 146 312, 200 352 C254 312, 260 248, 252 208 C236 228, 164 228, 148 208 Z"
          fill="url(#choli)"
        />
        <path
          d="M168 236 C184 250, 216 250, 232 236"
          fill="none"
          stroke="#9a6a18"
          strokeWidth="1.1"
          opacity="0.45"
        />

        <rect x="150" y="338" width="100" height="22" rx="8" fill="url(#gold)" />
        <rect x="158" y="344" width="84" height="6" rx="3" fill="#7a2438" opacity="0.25" />

        <ellipse cx="142" cy="304" rx="7" ry="5" fill="url(#gold)" />
        <ellipse cx="138" cy="314" rx="7" ry="5" fill="url(#gold)" />
        <ellipse cx="258" cy="304" rx="7" ry="5" fill="url(#gold)" />
        <ellipse cx="262" cy="314" rx="7" ry="5" fill="url(#gold)" />

        <g className="figure-head">
          <ellipse cx="200" cy="92" rx="36" ry="32" fill="url(#hair)" />
          <ellipse cx="200" cy="86" rx="14" ry="10" fill="url(#gold)" />
          <circle cx="200" cy="86" r="4.5" fill="#7a2438" />

          <path
            d="M148 150 C142 108, 158 78, 200 74 C242 78, 258 108, 252 150 C258 196, 142 196, 148 150 Z"
            fill="url(#hair)"
          />

          <rect x="188" y="196" width="24" height="28" rx="10" fill="url(#skin)" />

          <ellipse cx="200" cy="158" rx="46" ry="54" fill="url(#skin)" />
          <ellipse cx="186" cy="168" rx="10" ry="7" fill="#e0a07a" opacity="0.35" />
          <ellipse cx="214" cy="168" rx="10" ry="7" fill="#e0a07a" opacity="0.35" />

          <path
            d="M160 118 C176 98, 224 98, 240 118 C226 108, 174 108, 160 118 Z"
            fill="url(#hair)"
          />
          <path
            d="M150 148 C148 168, 152 186, 162 196 C158 170, 156 152, 166 136 Z"
            fill="url(#hair)"
          />
          <path
            d="M250 148 C252 168, 248 186, 238 196 C242 170, 244 152, 234 136 Z"
            fill="url(#hair)"
          />
          <path
            d="M186 86 C194 108, 200 118, 200 128"
            fill="none"
            stroke="#f0d48a"
            strokeWidth="1.1"
            opacity="0.35"
          />

          <circle cx="148" cy="168" r="8" fill="url(#gold)" />
          <circle cx="252" cy="168" r="8" fill="url(#gold)" />
          <circle cx="148" cy="186" r="3.2" fill="url(#gold)" />
          <circle cx="252" cy="186" r="3.2" fill="url(#gold)" />

          <path
            d="M176 132 Q188 126 198 132"
            fill="none"
            stroke="#3a2418"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
          <path
            d="M204 132 Q212 126 224 132"
            fill="none"
            stroke="#3a2418"
            strokeWidth="2.1"
            strokeLinecap="round"
          />

          <path
            d="M178 156 Q188 162 196 156"
            fill="none"
            stroke="#3a2418"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M204 156 Q212 162 222 156"
            fill="none"
            stroke="#3a2418"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M180 157 Q188 159 195 157"
            fill="none"
            stroke="#f7ead6"
            strokeWidth="0.7"
            opacity="0.5"
          />
          <path
            d="M205 157 Q213 159 220 157"
            fill="none"
            stroke="#f7ead6"
            strokeWidth="0.7"
            opacity="0.5"
          />

          <circle cx="200" cy="146" r="3.4" fill="#9b2438" />
          <circle cx="200" cy="146" r="1.4" fill="#f0d48a" />

          <path
            d="M188 186 Q200 194 212 186"
            fill="none"
            stroke="#b34858"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M191 185 Q200 190 209 185"
            fill="none"
            stroke="#e8b892"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          <path
            d="M176 204 Q200 218 224 204"
            fill="none"
            stroke="url(#gold)"
            strokeWidth="2.4"
          />
          <path
            d="M180 210 Q200 226 220 210"
            fill="none"
            stroke="url(#gold)"
            strokeWidth="2"
          />
          <circle cx="200" cy="228" r="5" fill="url(#gold)" />
          <circle cx="200" cy="228" r="2.2" fill="#7a2438" />
        </g>

        <g>
          <ellipse className="hands-glow" cx="200" cy="268" rx="42" ry="36" fill="#f0d48a" opacity="0.35" filter="url(#soft)" />
          <path
            d="M186 292 C176 276, 174 248, 186 226 C192 214, 198 208, 200 204 C202 208, 208 214, 214 226 C226 248, 224 276, 214 292 C208 302, 192 302, 186 292 Z"
            fill="url(#skin)"
          />
          <path
            d="M200 206 L200 292"
            stroke="#c98a62"
            strokeWidth="1"
            opacity="0.45"
          />
          <path
            d="M191 230 C196 222, 204 222, 209 230"
            fill="none"
            stroke="#c98a62"
            strokeWidth="0.8"
            opacity="0.5"
          />
          <path
            d="M190 248 C196 242, 204 242, 210 248"
            fill="none"
            stroke="#c98a62"
            strokeWidth="0.8"
            opacity="0.4"
          />
        </g>
      </g>
    </svg>
  );
}
