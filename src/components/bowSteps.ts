/**
 * Front-facing Namaste bow.
 * Played as one smooth animation through these poses.
 * durationMs is time spent moving into that pose from the previous one.
 * Stand should stay at 0. To skip a pose later, delete or comment out that object.
 *
 * She holds the last bow pose until the greeting text is in, then rises.
 */
export type BowStep = {
  id: "stand" | "begin" | "further" | "lower" | "rise";
  label: string;
  durationMs: number;
  rotateX: number;
  scaleY: number;
  translateY: number;
  face: number;
  crown: number;
  hang: number;
  skirt: number;
};

export const BOW_STEPS: BowStep[] = [
  {
    id: "stand",
    label: "1. Stand",
    durationMs: 0,
    rotateX: 0,
    scaleY: 1,
    translateY: 0,
    face: 1,
    crown: 0,
    hang: 0,
    skirt: 1,
  },
  {
    id: "begin",
    label: "2. Begin to bend",
    durationMs: 900,
    rotateX: 24,
    scaleY: 0.86,
    translateY: 4,
    face: 1,
    crown: 0.2,
    hang: 0,
    skirt: 1.03,
  },
  {
    id: "lower",
    label: "3. Upper body lower",
    durationMs: 1100,
    rotateX: 80,
    scaleY: 0.42,
    translateY: 6,
    face: 0,
    crown: 1,
    hang: 1,
    skirt: 1.12,
  },
];

export const BOW_RISE: BowStep = {
  id: "rise",
  label: "4. Return to stand",
  durationMs: 1000,
  rotateX: 0,
  scaleY: 1,
  translateY: 0,
  face: 1,
  crown: 0,
  hang: 0,
  skirt: 1,
};

/** Wait until "You are received with a Namaste." has popped in. */
export const RISE_AFTER_MS = 1800;
