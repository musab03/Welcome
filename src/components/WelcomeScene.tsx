"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { LotusPetals } from "./LotusPetals";
import { NamasteWoman } from "./NamasteWoman";

type WelcomeSceneProps = {
  name: string;
};

export function WelcomeScene({ name }: WelcomeSceneProps) {
  const router = useRouter();
  const [playId, setPlayId] = useState(0);
  const [greetingOn, setGreetingOn] = useState(false);
  const displayName = name.trim() || "Guest";

  const handleBowComplete = useCallback(() => {
    setGreetingOn(true);
  }, []);

  return (
    <main className="scene-bg grain relative flex h-dvh flex-col overflow-hidden">
      <LotusPetals />

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-md flex-1 flex-col px-5 pt-8 pb-16">
        <p className="shrink-0 text-center text-[11px] font-medium uppercase tracking-[0.42em] text-gold/70">
          Namastay
        </p>

        <div className="relative mx-auto mt-3 flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden">
          <div className="figure-enter h-full max-h-full w-auto" style={{ aspectRatio: "400 / 680" }}>
            <NamasteWoman key={playId} onComplete={handleBowComplete} />
          </div>
        </div>

        <div className="mt-1 flex shrink-0 flex-col items-center justify-start text-center">
          <div
            className={`flex flex-col items-center ${
              greetingOn ? "" : "pointer-events-none invisible"
            }`}
          >
            <p
              className={`font-deva text-3xl font-semibold text-gold sm:text-4xl ${
                greetingOn ? "welcome-namaste" : ""
              }`}
            >
              नमस्ते
            </p>
            <div
              className={`mt-2 h-px w-24 origin-center bg-linear-to-r from-transparent via-gold to-transparent ${
                greetingOn ? "gold-rule" : ""
              }`}
            />
            <h1
              className={`font-serif mt-2 text-2xl font-semibold tracking-tight text-cream sm:text-4xl ${
                greetingOn ? "welcome-name" : ""
              }`}
            >
              Welcome, {displayName}
            </h1>
            <p
              className={`mt-2 max-w-xs text-sm font-light leading-5 text-cream/65 ${
                greetingOn ? "welcome-sub" : ""
              }`}
            >
              You are received with a Namaste.
            </p>

            <div
              className={`mt-3 flex flex-wrap items-center justify-center gap-2 ${
                greetingOn ? "replay-fade" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  setGreetingOn(false);
                  setPlayId((value) => value + 1);
                }}
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
      </div>
    </main>
  );
}
