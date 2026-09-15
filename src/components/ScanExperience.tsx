"use client";

import { QRCodeSVG } from "qrcode.react";
import { useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

const SAMPLE_NAMES = ["Priya", "Arjun", "Ananya", "Musab"];

function subscribe() {
  return () => {};
}

function getOrigin() {
  return window.location.origin;
}

function getServerOrigin() {
  return "";
}

function welcomeUrl(origin: string, name: string) {
  const params = new URLSearchParams({ name: name.trim() || "Guest" });
  return `${origin}/welcome?${params.toString()}`;
}

export function ScanExperience() {
  const router = useRouter();
  const origin = useSyncExternalStore(subscribe, getOrigin, getServerOrigin);
  const [name, setName] = useState("");
  const [scanning, setScanning] = useState(false);

  const qrOrigin = origin || "http://localhost:3000";
  const target = useMemo(() => welcomeUrl(qrOrigin, name), [qrOrigin, name]);
  const canScan = name.trim().length > 0;

  function goToWelcome() {
    const guest = name.trim();
    if (!guest) return;
    setScanning(true);
    window.setTimeout(() => {
      router.push(`/welcome?name=${encodeURIComponent(guest)}`);
    }, 1100);
  }

  return (
    <main className="scene-bg grain relative flex min-h-dvh flex-col overflow-hidden">
      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-8">
        <header className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-gold/75">
            Gandhi Consultants
          </p>
          <h1 className="font-serif mt-3 text-4xl font-semibold text-cream">Namastay</h1>
          <p className="mt-2 text-sm font-light text-cream/65">
            Scan the invitation to be welcomed by name
          </p>
        </header>

        <section className="relative mx-auto mt-8 aspect-square w-full max-w-[320px]">
          <div className="absolute inset-0 rounded-[2rem] bg-plum/80 shadow-[0_0_80px_rgba(240,212,138,0.08)] ring-1 ring-gold/15" />

          <span className="corner-pulse absolute left-3 top-3 h-9 w-9 rounded-tl-xl border-l-2 border-t-2 border-gold" />
          <span className="corner-pulse absolute right-3 top-3 h-9 w-9 rounded-tr-xl border-r-2 border-t-2 border-gold" />
          <span className="corner-pulse absolute bottom-3 left-3 h-9 w-9 rounded-bl-xl border-b-2 border-l-2 border-gold" />
          <span className="corner-pulse absolute bottom-3 right-3 h-9 w-9 rounded-br-xl border-b-2 border-r-2 border-gold" />

          <div className="absolute inset-10 flex items-center justify-center rounded-2xl bg-cream p-4">
            <QRCodeSVG
              value={target}
              size={256}
              bgColor="#f7ead6"
              fgColor="#2a1018"
              level="M"
              className="h-full w-full"
            />
          </div>

          <div
            className={`scan-line pointer-events-none absolute right-10 left-10 h-0.5 rounded-full bg-linear-to-r from-transparent via-saffron to-transparent shadow-[0_0_16px_#e8a317] ${
              scanning ? "fast" : ""
            }`}
          />

          {scanning && (
            <div className="absolute inset-0 flex items-center justify-center rounded-[2rem] bg-night/40 backdrop-blur-[1px]">
              <p className="text-xs uppercase tracking-[0.28em] text-gold">Recognized</p>
            </div>
          )}
        </section>

        <form
          className="mt-8 flex flex-1 flex-col"
          onSubmit={(event) => {
            event.preventDefault();
            goToWelcome();
          }}
        >
          <label htmlFor="guest-name" className="text-[11px] uppercase tracking-[0.22em] text-gold/70">
            Guest name
          </label>
          <input
            id="guest-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter the name on the invitation"
            autoComplete="name"
            className="mt-2 w-full rounded-2xl border border-gold/20 bg-plum/60 px-4 py-3.5 text-base text-cream outline-none placeholder:text-cream/35 focus:border-gold/60"
          />

          <div className="mt-3 flex flex-wrap gap-2">
            {SAMPLE_NAMES.map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => setName(sample)}
                className="rounded-full border border-gold/20 px-3 py-1 text-xs text-cream/80 transition hover:border-gold/50 hover:text-cream"
              >
                {sample}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={!canScan || scanning}
            className="mt-6 w-full rounded-full bg-linear-to-r from-gold-deep via-gold to-saffron py-3.5 text-sm font-semibold tracking-wide text-night transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {scanning ? "Opening welcome…" : "Scan to enter"}
          </button>

          <p className="mt-4 text-center text-xs leading-5 text-cream/45">
            On a phone, scan this QR to open the Namaste greeting. On this screen, enter a name and tap scan.
          </p>
        </form>
      </div>
    </main>
  );
}
