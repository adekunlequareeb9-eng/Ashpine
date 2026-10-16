/**
 * Ashpine — chapter 1 canon. Do not contradict this in later chapters.
 *
 * Fictional Lantern Ward, modern city. Ashpine is a tea-and-herb trading
 * house with a real training hall, not a front.
 * The player ("Captain") is 19 and legally owns the house. Gender presentation
 * is chosen; it does not change stats.
 * Friends, all 19, all with their own aims: Lin Mei (books), Ren Calder (hall),
 * Sable Quinn (records), Jonah Vale (people).
 * Mentor: Shen Wei. He transferred the house six months ago and is absent.
 * He is dead. Nobody in the game knows that yet. Do not reveal it.
 * Public cultivation in this chapter is Martial 1–9 only. A margin note says
 * the ninth is a door. No Heavenly or Divine interface yet.
 * Chapter one ends when the hall is locked. Chapter two is the next morning.
 * Do not reveal that Shen is dead. The ninth martial rank is a door, not a
 * level the player can finish in this arc. Public ranks shown here stop at
 * Martial 4. No Heavenly or Divine rank interface.
 * Understanding a counter is not the same as being able to land it.
 * Hana Okabe is Martial 6 and still the strongest person in the building.
 * Time advances only while the session is running and play is unpaused.
 * Loading a save restores the same minute. Never simulate time away.
 */

export type Presentation = "tailored" | "soft" | "plain";
export type Pronouns = "he" | "she" | "they";
export type Complexion = 0 | 1 | 2 | 3;
export type Era = "flashback" | "present";
export type Decision = "pay" | "exclusive" | "dock" | null;
export type Visitor = "none" | "walking" | "waiting" | "met";
export type Phase =
  | "title"
  | "create"
  | "flashback"
  | "handover"
  | "play"
  | "talk"
  | "ledger"
  | "train"
  | "spar"
  | "pause"
  | "inspect"
  | "modal"
  | "epilogue";

export type Profile = {
  name: string;
  presentation: Presentation;
  pronouns: Pronouns;
  complexion: Complexion;
};

export type Bond = { regard: number; line: string };
export type BondId = "lin" | "ren" | "sable" | "jonah";

export type JournalEntry = { id: string; title: string; text: string };

export type ModalCopy = { title: string; body: string };

export type Posture = "receive" | "refuse" | "stairs" | null;
export type Exhibit = "enter" | "hold" | null;

export type Flags = {
  seal: boolean;
  study: boolean;
  board: boolean;
  holding: boolean;
  trained: boolean;
  sparred: boolean;
  punished: boolean;
  chapter: boolean;
  adler: boolean;
  /** The four have decided what to do with Adler's card. */
  council: boolean;
  /** The hall is locked. Chapter one can end. */
  evening: boolean;
  /** The player has read the chapter card. */
  epilogueSeen: boolean;
  /** Friday morning. In-game rest, never an offline skip. */
  dawn: boolean;
  /** The posture from the courtyard has been followed through. */
  branch: boolean;
  /** Hana has named the door. Chapter two can end. */
  second: boolean;
  /** The player has read the second chapter card. */
  arcSeen: boolean;
};

export type Save = {
  version: 1;
  profile: Profile;
  era: Era;
  minute: number;
  x: number;
  z: number;
  yaw: number;
  martialLevel: number;
  form: number;
  breath: number;
  insight: number;
  cash: number;
  decision: Decision;
  visitor: Visitor;
  met: string[];
  flags: Flags;
  sparResult: "win" | "loss" | "draw" | null;
  posture: Posture;
  exhibit: Exhibit;
  bonds: Record<BondId, Bond>;
  journal: JournalEntry[];
  trainSessions: number;
  pendingModal: ModalCopy | null;
};

export type TalkChoice = { label: string; goto?: string; effect?: string };

export type TalkNode = {
  speaker: string;
  text: string;
  next?: string;
  choices?: TalkChoice[];
  effect?: string;
  /** What happens when the player continues off a terminal node. */
  close?: "talk" | "handover" | "epilogue" | "arc";
};

export type Script = { id: string; start: string; nodes: Record<string, TalkNode> };

export type InspectCopy = { title: string; body: string };

export type HudSnap = {
  prompt: string;
  promptId: string;
  place: string;
  x: number;
  z: number;
  yaw: number;
  spar: null | {
    php: number;
    pmax: number;
    pstam: number;
    pstamMax: number;
    rhp: number;
    rmax: number;
    time: number;
    text: string;
  };
};

export const FORM_NEED = 6;
export const BREATH_NEED = 6;
export const INSIGHT_NEED = 2;
export const FORM_FOUR = 12;
export const BREATH_FOUR = 12;
export const INSIGHT_FOUR = 4;

export function nextRank(level: number) {
  if (level < 3) return { next: 3, form: FORM_NEED, breath: BREATH_NEED, insight: INSIGHT_NEED };
  if (level === 3) return { next: 4, form: FORM_FOUR, breath: BREATH_FOUR, insight: INSIGHT_FOUR };
  return null;
}

export const SAVE_KEY = "ashpine.v1";
