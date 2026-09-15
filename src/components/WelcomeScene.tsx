"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LotusPetals } from "./LotusPetals";
import { NamasteWoman } from "./NamasteWoman";

type WelcomeSceneProps = {
  name: string;
};

export function WelcomeScene({ name }: WelcomeSceneProps) {
  const router = useRouter();
  const [playId, setPlayId] = useState(0);
  const displayName = name.trim() || "Guest";

  return (
    <main key={playId} className="scene-bg grain relative flex min-h-dvh flex-col overflow-hidden">
      <LotusPetals />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-8">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.42em] text-gold/70">
          Namastay
        </p>

        <div className="relative mx-auto mt-1 h-[min(46vh,420px)] w-full max-w-[380px] sm:h-[min(52vh,480px)]">
          <NamasteWoman />
        </div>

        <div className="mt-2 flex flex-col items-center text-center">
          <p className="welcome-namaste font-deva text-4xl font-semibold text-gold sm:text-5xl">
            नमस्ते
          </p>
          <div className="gold-rule mt-3 h-px w-24 origin-center bg-linear-to-r from-transparent via-gold to-transparent" />
          <h1 className="welcome-name font-serif mt-3 text-3xl font-semibold tracking-tight text-cream sm:mt-4 sm:text-5xl">
            Welcome, {displayName}
          </h1>
          <p className="welcome-sub mt-3 max-w-xs text-sm font-light leading-6 text-cream/65">
            You are received with a Namaste.
          </p>

          <div className="replay-fade mt-6 flex flex-wrap items-center justify-center gap-2 sm:mt-8 sm:gap-3">
            <button
              type="button"
              onClick={() => setPlayId((value) => value + 1)}
              className="rounded-full border border-gold/30 px-5 py-2 text-xs uppercase tracking-[0.22em] text-gold/80 transition hover:border-gold hover:text-gold"
            >
              Play again
            </button>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="rounded-full border border-gold/30 px-5 py-2 text-xs uppercase tracking-[0.22em] text-gold/80 transition hover:border-gold hover:text-gold"
            >
              New scan
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
