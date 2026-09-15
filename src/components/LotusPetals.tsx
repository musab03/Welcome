const PETALS = [
  { left: "8%", delay: "0s", duration: "14s", drift: "40px", spin: "120deg", size: 18 },
  { left: "18%", delay: "3s", duration: "16s", drift: "-30px", spin: "-160deg", size: 14 },
  { left: "32%", delay: "1.2s", duration: "13s", drift: "55px", spin: "200deg", size: 16 },
  { left: "48%", delay: "5s", duration: "18s", drift: "-20px", spin: "-90deg", size: 20 },
  { left: "62%", delay: "2.4s", duration: "15s", drift: "35px", spin: "150deg", size: 13 },
  { left: "74%", delay: "6s", duration: "17s", drift: "-50px", spin: "-210deg", size: 17 },
  { left: "88%", delay: "0.8s", duration: "14s", drift: "25px", spin: "80deg", size: 15 },
  { left: "41%", delay: "8s", duration: "16s", drift: "-40px", spin: "170deg", size: 12 },
];

function Petal({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 24 28" fill="none">
      <path
        d="M12 2 C16 8, 20 14, 12 26 C4 14, 8 8, 12 2 Z"
        fill="#c45c6a"
        opacity="0.85"
      />
      <path
        d="M12 4 C14.5 10, 16 15, 12 24"
        stroke="#f0d48a"
        strokeWidth="0.7"
        opacity="0.7"
      />
    </svg>
  );
}

export function LotusPetals() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {PETALS.map((petal, i) => (
        <span
          key={i}
          className="petal absolute bottom-[-40px]"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            ["--drift" as string]: petal.drift,
            ["--spin" as string]: petal.spin,
          }}
        >
          <Petal size={petal.size} />
        </span>
      ))}
    </div>
  );
}
