"use client";

import { useEffect, useRef } from "react";
import { BOW_RISE, BOW_STEPS, RISE_AFTER_MS, type BowStep } from "./bowSteps";

function Gradients({ id }: { id: string }) {
  return (
    <defs>
      <radialGradient id={`${id}-halo`} cx="50%" cy="38%" r="48%">
        <stop offset="0%" stopColor="#f0d48a" stopOpacity="0.42" />
        <stop offset="55%" stopColor="#c45c6a" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#14080d" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${id}-sari`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#b33852" />
        <stop offset="45%" stopColor="#7a2438" />
        <stop offset="100%" stopColor="#4c1524" />
      </linearGradient>
      <linearGradient id={`${id}-fold`} x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#d25a6e" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#3d101c" stopOpacity="0.5" />
      </linearGradient>
      <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f8e7b0" />
        <stop offset="50%" stopColor="#e0b84c" />
        <stop offset="100%" stopColor="#b8862a" />
      </linearGradient>
      <linearGradient id={`${id}-choli`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f0d48a" />
        <stop offset="100%" stopColor="#c4922a" />
      </linearGradient>
      <linearGradient id={`${id}-skin`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f0c4a0" />
        <stop offset="100%" stopColor="#d19a72" />
      </linearGradient>
      <linearGradient id={`${id}-hair`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3a2418" />
        <stop offset="100%" stopColor="#140c08" />
      </linearGradient>
      <filter id={`${id}-soft`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.1" />
      </filter>
    </defs>
  );
}

type NamasteWomanProps = {
  onComplete?: () => void;
};

const BOW_EASING = "cubic-bezier(0.37, 0.0, 0.15, 1)";

function bowOffsets(steps: BowStep[]) {
  const total = steps.reduce((sum, step) => sum + step.durationMs, 0) || 1;
  let elapsed = 0;
  return steps.map((step) => {
    elapsed += step.durationMs;
    return elapsed / total;
  });
}

function bowDuration(steps: BowStep[]) {
  return Math.max(
    steps.reduce((sum, step) => sum + step.durationMs, 0),
    1,
  );
}

function playPoses(stage: HTMLElement, steps: BowStep[], easing: string) {
  const offsets = bowOffsets(steps);
  const options: KeyframeAnimationOptions = {
    duration: bowDuration(steps),
    easing,
    fill: "forwards",
  };

  const bow = stage.querySelector<HTMLElement>(".figure-bow");
  const face = stage.querySelector<HTMLElement>(".bow-face");
  const crown = stage.querySelector<HTMLElement>(".bow-crown");
  const hang = stage.querySelector<HTMLElement>(".bow-hang");
  const skirt = stage.querySelector<HTMLElement>(".skirt-sway");
  const shadow = stage.querySelector<HTMLElement>(".shadow-bow");

  const animations: Animation[] = [];

  if (bow) {
    animations.push(
      bow.animate(
        steps.map((step, index) => ({
          offset: offsets[index],
          transform: `rotateX(${step.rotateX}deg) scaleY(${step.scaleY}) translateY(${step.translateY}px)`,
        })),
        options,
      ),
    );
  }

  if (face) {
    animations.push(
      face.animate(
        steps.map((step, index) => ({
          offset: offsets[index],
          opacity: step.face,
        })),
        options,
      ),
    );
  }

  if (crown) {
    animations.push(
      crown.animate(
        steps.map((step, index) => ({
          offset: offsets[index],
          opacity: step.crown,
        })),
        options,
      ),
    );
  }

  if (hang) {
    animations.push(
      hang.animate(
        steps.map((step, index) => ({
          offset: offsets[index],
          opacity: step.hang,
        })),
        options,
      ),
    );
  }

  if (skirt) {
    animations.push(
      skirt.animate(
        steps.map((step, index) => ({
          offset: offsets[index],
          transform: `scaleX(${step.skirt})`,
        })),
        options,
      ),
    );
  }

  if (shadow) {
    animations.push(
      shadow.animate(
        steps.map((step, index) => ({
          offset: offsets[index],
          transform: `scaleX(${step.skirt})`,
        })),
        options,
      ),
    );
  }

  return animations;
}

function applyPose(stage: HTMLElement, step: BowStep) {
  const bow = stage.querySelector<HTMLElement>(".figure-bow");
  const face = stage.querySelector<SVGElement>(".bow-face");
  const crown = stage.querySelector<SVGElement>(".bow-crown");
  const hang = stage.querySelector<SVGElement>(".bow-hang");
  const skirt = stage.querySelector<SVGElement>(".skirt-sway");
  const shadow = stage.querySelector<SVGElement>(".shadow-bow");

  if (bow) {
    bow.style.transform = `rotateX(${step.rotateX}deg) scaleY(${step.scaleY}) translateY(${step.translateY}px)`;
  }
  if (face) face.style.opacity = String(step.face);
  if (crown) crown.style.opacity = String(step.crown);
  if (hang) hang.style.opacity = String(step.hang);
  if (skirt) skirt.style.transform = `scaleX(${step.skirt})`;
  if (shadow) shadow.style.transform = `scaleX(${step.skirt})`;
}

export function NamasteWoman({ onComplete }: NamasteWomanProps) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || BOW_STEPS.length === 0) return;

    const lastBow = BOW_STEPS[BOW_STEPS.length - 1];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      applyPose(stage, lastBow);
      onComplete?.();
      return;
    }

    const down = playPoses(stage, BOW_STEPS, BOW_EASING);
    const lead = down[0];
    let riseTimer = 0;
    let riseAnims: Animation[] = [];

    const handleFinish = () => {
      onComplete?.();
      riseTimer = window.setTimeout(() => {
        riseAnims = playPoses(
          stage,
          [{ ...lastBow, durationMs: 0 }, BOW_RISE],
          "cubic-bezier(0.22, 1, 0.36, 1)",
        );
      }, RISE_AFTER_MS);
    };

    lead?.addEventListener("finish", handleFinish);

    return () => {
      lead?.removeEventListener("finish", handleFinish);
      window.clearTimeout(riseTimer);
      down.forEach((animation) => animation.cancel());
      riseAnims.forEach((animation) => animation.cancel());
    };
  }, [onComplete]);

  return (
    <div ref={stageRef} className="namaste-stage">
      <svg viewBox="0 0 400 680" className="absolute inset-0 h-full w-full overflow-visible">
        <Gradients id="bg" />
        <ellipse cx="200" cy="250" rx="170" ry="190" fill="url(#bg-halo)" />
        <g className="mandala" opacity="0.38">
          <circle cx="200" cy="250" r="168" fill="none" stroke="#f0d48a" strokeWidth="0.7" />
          <circle cx="200" cy="250" r="148" fill="none" stroke="#f0d48a" strokeWidth="0.45" />
          <circle cx="200" cy="250" r="72" fill="none" stroke="#f0d48a" strokeWidth="0.45" />
          <circle cx="200" cy="250" r="28" fill="none" stroke="#f0d48a" strokeWidth="0.7" />
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i / 16) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={200 + Math.cos(a) * 72}
                y1={250 + Math.sin(a) * 72}
                x2={200 + Math.cos(a) * 168}
                y2={250 + Math.sin(a) * 168}
                stroke="#f0d48a"
                strokeWidth="0.5"
              />
            );
          })}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
            const x = 200 + Math.cos(a) * 110;
            const y = 250 + Math.sin(a) * 110;
            return (
              <ellipse
                key={`p-${i}`}
                cx={x}
                cy={y}
                rx="13"
                ry="22"
                fill="none"
                stroke="#f0d48a"
                strokeWidth="0.7"
                transform={`rotate(${(a * 180) / Math.PI + 90} ${x} ${y})`}
              />
            );
          })}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2 - Math.PI / 2 + Math.PI / 8;
            const x = 200 + Math.cos(a) * 48;
            const y = 250 + Math.sin(a) * 48;
            return (
              <ellipse
                key={`inner-${i}`}
                cx={x}
                cy={y}
                rx="7"
                ry="12"
                fill="none"
                stroke="#f0d48a"
                strokeWidth="0.55"
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
            fill="url(#bg-sari)"
          />
          <path
            d="M168 372 C158 450, 148 530, 142 628 L186 628 C180 520, 176 430, 200 372 Z"
            fill="url(#bg-fold)"
          />
          <path
            d="M232 372 C224 430, 220 520, 214 628 L258 628 C252 530, 242 450, 232 372 Z"
            fill="url(#bg-fold)"
            opacity="0.7"
          />
          <path
            d="M84 612 C120 600, 200 618, 316 612 L322 628 L78 628 Z"
            fill="url(#bg-gold)"
          />
        </g>
      </svg>

      <div className="figure-bow">
        <svg viewBox="0 0 400 680" className="h-full w-full overflow-visible">
          <Gradients id="fg" />
          <path
            d="M248 220 C300 250, 318 340, 292 430 C270 390, 250 340, 238 292 C232 260, 236 232, 248 220 Z"
            fill="url(#fg-sari)"
            opacity="0.92"
          />
          <path
            d="M248 220 C300 250, 310 320, 286 400"
            fill="none"
            stroke="url(#fg-gold)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M146 216 C118 248, 102 292, 124 328 C138 312, 160 294, 182 278 C168 268, 150 248, 160 222 Z"
            fill="url(#fg-skin)"
          />
          <path
            d="M254 216 C282 248, 298 292, 276 328 C262 312, 240 294, 218 278 C232 268, 250 248, 240 222 Z"
            fill="url(#fg-skin)"
          />
          <path
            d="M148 208 C140 248, 146 312, 200 360 C254 312, 260 248, 252 208 C236 228, 164 228, 148 208 Z"
            fill="url(#fg-choli)"
          />
          <rect x="150" y="338" width="100" height="28" rx="8" fill="url(#fg-gold)" />
          <ellipse cx="142" cy="304" rx="7" ry="5" fill="url(#fg-gold)" />
          <ellipse cx="258" cy="304" rx="7" ry="5" fill="url(#fg-gold)" />

          <g className="bow-crown">
            <ellipse cx="200" cy="118" rx="48" ry="40" fill="url(#fg-hair)" />
            <ellipse cx="200" cy="96" rx="34" ry="28" fill="url(#fg-hair)" />
            <ellipse cx="200" cy="88" rx="13" ry="9" fill="url(#fg-gold)" />
          </g>

          <g className="bow-hang">
            <path
              d="M168 120 C160 180, 166 250, 200 310 C234 250, 240 180, 232 120 C220 150, 180 150, 168 120 Z"
              fill="url(#fg-hair)"
            />
          </g>

          <g className="bow-face">
            <ellipse cx="200" cy="92" rx="36" ry="32" fill="url(#fg-hair)" />
            <ellipse cx="200" cy="86" rx="14" ry="10" fill="url(#fg-gold)" />
            <circle cx="200" cy="86" r="4.5" fill="#7a2438" />
            <path
              d="M148 150 C142 108, 158 78, 200 74 C242 78, 258 108, 252 150 C258 196, 142 196, 148 150 Z"
              fill="url(#fg-hair)"
            />
            <rect x="188" y="196" width="24" height="28" rx="10" fill="url(#fg-skin)" />
            <ellipse cx="200" cy="158" rx="46" ry="54" fill="url(#fg-skin)" />
            <path d="M160 118 C176 98, 224 98, 240 118 C226 108, 174 108, 160 118 Z" fill="url(#fg-hair)" />
            <circle cx="148" cy="168" r="8" fill="url(#fg-gold)" />
            <circle cx="252" cy="168" r="8" fill="url(#fg-gold)" />
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
            <circle cx="200" cy="146" r="3.4" fill="#9b2438" />
            <path
              d="M188 186 Q200 194 212 186"
              fill="none"
              stroke="#b34858"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M176 204 Q200 218 224 204"
              fill="none"
              stroke="url(#fg-gold)"
              strokeWidth="2.4"
            />
          </g>

          <ellipse
            className="hands-glow"
            cx="200"
            cy="268"
            rx="42"
            ry="36"
            fill="#f0d48a"
            opacity="0.35"
            filter="url(#fg-soft)"
          />
          <path
            d="M186 292 C176 276, 174 248, 186 226 C192 214, 198 208, 200 204 C202 208, 208 214, 214 226 C226 248, 224 276, 214 292 C208 302, 192 302, 186 292 Z"
            fill="url(#fg-skin)"
          />
          <path d="M200 206 L200 292" stroke="#c98a62" strokeWidth="1" opacity="0.45" />
        </svg>
      </div>
    </div>
  );
}
