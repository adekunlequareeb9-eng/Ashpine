import { create } from "zustand";
import { JOURNAL, inspectFor, scriptFor } from "@/game/dialogue";
import { economy } from "@/game/layout";
import { ADLER_SPAWN_Z, FLASH_SPAWN, PRESENT_SPAWN } from "@/game/layout";
import { tick, unlockAudio } from "@/game/audio";
import { runtime } from "@/game/runtime";
import { minutesUntilOpen } from "@/game/objectives";
import {
  SAVE_KEY,
  nextRank,
  type BondId,
  type Decision,
  type HudSnap,
  type InspectCopy,
  type ModalCopy,
  type Phase,
  type Profile,
  type Save,
  type Script,
} from "@/game/types";
import { emptyHud } from "@/game/runtime";

export type GameStore = {
  phase: Phase;
  resume: Phase;
  save: Save | null;
  hasSave: boolean;
  talk: { id: string; node: string; script: Script } | null;
  inspect: InspectCopy | null;
  modal: ModalCopy | null;
  toast: string | null;
  hud: HudSnap;
  pausePage: "root" | "cult" | "journal" | "help";
  boot: () => void;
  toCreate: () => void;
  toTitle: () => void;
  startOrContinue: () => void;
  newStory: () => void;
  confirmProfile: (profile: Profile) => void;
  beginPresent: () => void;
  interact: () => void;
  enterNode: (nodeId: string) => void;
  advance: () => void;
  pick: (index: number) => void;
  closeTalk: () => void;
  openLedger: () => void;
  closePanel: () => void;
  chooseSupply: (decision: Exclude<Decision, null>) => void;
  startTraining: () => void;
  finishTraining: (session: number, perfect: number, good: number) => void;
  startSpar: () => void;
  finishSpar: (result: "win" | "loss" | "draw", info: { punished: boolean; sawHeavy: boolean; blocks: number; dodges: number }) => void;
  togglePause: () => void;
  setPausePage: (page: GameStore["pausePage"]) => void;
  openInspect: (id: string) => void;
  closeInspect: () => void;
  dismissModal: () => void;
  stayEvening: () => void;
  beginDawn: () => void;
  notePos: (x: number, z: number, yaw: number) => void;
  addMinute: (minutes: number) => void;
  setHud: (hud: HudSnap) => void;
  visitorArrived: () => void;
  persist: () => void;
};

function blankBonds(): Save["bonds"] {
  return {
    lin: { regard: 2, line: "Watching whether you treat the books as a duty or a costume." },
    ren: { regard: 2, line: "Will keep the hall honest, and will say if you don't." },
    sable: { regard: 2, line: "Trusts you with an unfinished fact. Will not sit on it forever." },
    jonah: { regard: 2, line: "Counting the five of you before he counts the till." },
  };
}

export function blankSave(profile: Profile): Save {
  return {
    version: 1,
    profile,
    era: "flashback",
    minute: 0,
    x: FLASH_SPAWN.x,
    z: FLASH_SPAWN.z,
    yaw: FLASH_SPAWN.yaw,
    martialLevel: 2,
    form: 2,
    breath: 1,
    insight: 0,
    cash: 18400,
    decision: null,
    visitor: "none",
    met: [],
    flags: {
      seal: false,
      study: false,
      board: false,
      holding: false,
      trained: false,
      sparred: false,
      punished: false,
      chapter: false,
      adler: false,
      council: false,
      evening: false,
      epilogueSeen: false,
      dawn: false,
      branch: false,
      second: false,
      arcSeen: false,
    },
    sparResult: null,
    posture: null,
    exhibit: null,
    bonds: blankBonds(),
    journal: [],
    trainSessions: 0,
    pendingModal: null,
  };
}

function readSave(): Save | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const data = hydrate(JSON.parse(raw) as Save);
    if (data.version !== 1 || !data.profile?.name) return null;
    return data;
  } catch {
    return null;
  }
}

function writeSave(save: Save | null) {
  if (typeof localStorage === "undefined") return;
  if (!save) {
    localStorage.removeItem(SAVE_KEY);
    return;
  }
  localStorage.setItem(SAVE_KEY, JSON.stringify(save));
}

function blankFlags(): Save["flags"] {
  return {
    seal: false,
    study: false,
    board: false,
    holding: false,
    trained: false,
    sparred: false,
    punished: false,
    chapter: false,
    adler: false,
    council: false,
    evening: false,
    epilogueSeen: false,
    dawn: false,
    branch: false,
    second: false,
    arcSeen: false,
  };
}

function hydrate(data: Save): Save {
  return {
    ...data,
    posture: data.posture ?? null,
    exhibit: data.exhibit ?? null,
    journal: data.journal ?? [],
    bonds: data.bonds?.lin ? data.bonds : blankBonds(),
    flags: { ...blankFlags(), ...data.flags },
  };
}

function addJournal(save: Save, id: string) {
  if (save.journal.some((entry) => entry.id === id)) return;
  const entry = JOURNAL[id];
  if (entry) save.journal = [...save.journal, entry];
}

function pushJournal(save: Save, entry: { id: string; title: string; text: string }) {
  if (save.journal.some((item) => item.id === entry.id)) return;
  save.journal = [...save.journal, entry];
}

function addMet(save: Save, id: string) {
  if (!save.met.includes(id)) save.met = [...save.met, id];
}

function setBond(save: Save, id: BondId, delta: number, line: string) {
  const current = save.bonds[id];
  save.bonds = {
    ...save.bonds,
    [id]: { regard: Math.max(-1, Math.min(5, current.regard + delta)), line },
  };
}

export function applyEffect(save: Save, effect?: string): Save {
  if (!effect) return save;
  const next: Save = structuredClone(save);
  if (effect.startsWith("met:")) {
    addMet(next, effect.slice(4));
    return next;
  }
  if (effect.startsWith("bond:")) {
    const [, id, delta, ...rest] = effect.split(":");
    if (id === "lin" || id === "ren" || id === "sable" || id === "jonah") {
      setBond(next, id, Number(delta), rest.join(":"));
    }
    return next;
  }
  if (effect === "seal") {
    next.flags.seal = true;
    addMet(next, "shen");
    addJournal(next, "seal");
    return next;
  }
  if (effect === "holding") {
    next.flags.holding = true;
    addJournal(next, "holding");
    return next;
  }
  if (effect === "adler") {
    next.flags.adler = true;
    addMet(next, "adler");
    addJournal(next, "adler");
    if (next.flags.study) addJournal(next, "paper");
    return next;
  }
  if (effect.startsWith("posture:")) {
    const posture = effect.slice(8);
    if (posture !== "receive" && posture !== "refuse" && posture !== "stairs") return next;
    next.posture = posture;
    if (posture === "receive") {
      setBond(next, "jonah", 1, "You asked him to be the second person in the room. He will notice when a guest stops being a guest.");
      setBond(next, "sable", 1, "You didn't hand the house to strangers, and you didn't slam the door.");
      setBond(next, "lin", 0, "She will write a rule for who is allowed in. She wanted one anyway.");
      setBond(next, "ren", 0, "He wanted the door shut. He will live with a rule.");
    } else if (posture === "refuse") {
      setBond(next, "ren", 1, "You kept the hall from becoming a waiting room.");
      setBond(next, "lin", 1, "A clientele you can't name is not a revenue line. She is relieved you agree.");
      setBond(next, "jonah", 0, "He would have poured the tea. He understands why you didn't.");
      setBond(next, "sable", 0, "The card is still in the journal. Refusal is not the same as forgetting.");
    } else {
      setBond(next, "sable", 1, "You gave her the walk, not just the theory.");
      setBond(next, "jonah", 0, "He wanted to come. You asked Sable. He is pretending that is fine.");
      setBond(next, "lin", 0, "She wants the address written down before you leave the ward.");
      setBond(next, "ren", 0, "He thinks questions are slower than fists. He did not say you were wrong.");
    }
    return next;
  }
  if (effect === "council") {
    next.flags.council = true;
    const text =
      next.posture === "receive"
        ? "The four met in the courtyard. Private visitors will be received one at a time, never alone. Jonah stays in the room."
        : next.posture === "refuse"
          ? "The four met in the courtyard. The house will not open for a clientele it cannot name. Fourteen Quay Stairs stays in the journal."
          : "The four met in the courtyard. You and Sable will walk to Quay Stairs with a better question than where he went.";
    pushJournal(next, { id: "council", title: "The courtyard", text });
    return next;
  }
  if (effect === "evening") {
    next.flags.evening = true;
    pushJournal(next, {
      id: "evening",
      title: "The hall, locked",
      text: "Hana took the front door. You took the side. The study lamp was still on. You left it.",
    });
    return next;
  }
  if (effect.startsWith("branch:")) {
    next.flags.branch = true;
    const kind = effect.slice(7);
    if (kind === "hale") {
      next.cash += 480;
      setBond(next, "jonah", 1, "He stayed through the hour. Hale paid, asked nothing about the absence, and left while the tea was still warm.");
      pushJournal(next, {
        id: "hale",
        title: "Forty minutes",
        text: "Mr Hale paid £480 for a private hour. Jonah stayed in the room. Hale looked at the ash-leaf stationery, did not ask where Shen went, and did not ask to see the study.",
      });
    } else if (kind === "hale-wait") {
      setBond(next, "jonah", 1, "You kept the rule and still sent the man home. Jonah would rather a closed hour than a careless one.");
      pushJournal(next, {
        id: "hale",
        title: "The hour can wait",
        text: "Hale came as the one visitor. You did not take the fee. He left without the wasted question, and the rule is still a rule.",
      });
    } else if (kind === "letter") {
      setBond(next, "lin", 1, "A clientele you cannot name stayed unnamed. She can live with a letter. She could not have lived with a queue.");
      pushJournal(next, {
        id: "letter",
        title: "Under the stone",
        text: "Adler wrote that she will not send people to test a door you closed. The address remains. The first question is still wasted.",
      });
    } else {
      setBond(next, "sable", 1, "You asked about the paper, in the place the paper came from. She has something to set beside the study, and she did not have to kick a door.");
      pushJournal(next, {
        id: "quay",
        title: "14 Quay Stairs",
        text: "Adler said the pine needle is stationery used by people who do not put their names on circuit posters. She called Martial 9 a door, in rooms that do not print notices. She has not walked through it. She did not say where Shen is.",
      });
    }
    return next;
  }
  if (effect === "exhibit:enter") {
    next.exhibit = "enter";
    next.cash -= 600;
    setBond(next, "ren", 1, "The hall is on the list. He wanted proof, and you paid for the kind of proof a poster understands.");
    setBond(next, "lin", 0, "Six hundred pounds, written down. She can explain it. She would have preferred to wait.");
    pushJournal(next, {
      id: "exhibit",
      title: "Winter list",
      text: "Ashpine is entered. Open class, empty hands, three weeks. The fee was £600. Ren's name is not the only one that will be read out.",
    });
    return next;
  }
  if (effect === "exhibit:hold") {
    next.exhibit = "hold";
    setBond(next, "ren", 0, "You told him he is early, not wrong. He is annoyed. He is still in the hall.");
    setBond(next, "lin", 1, "The poster can wait. She would rather the house be serious than famous for a week.");
    pushJournal(next, {
      id: "exhibit",
      title: "Not this season",
      text: "You held the exhibition. The pencilled line still says serious houses only. Ashpine is not on the list. Ren has been told he is early, not wrong.",
    });
    return next;
  }
  if (effect === "second") {
    next.flags.second = true;
    pushJournal(next, {
      id: "door",
      title: "The ninth",
      text: "Hana named it without decorating it. Martial 9 is a door, not a ceiling. The city has no public rank past nine, and she will not invent one. The intact notes stop where the page is torn.",
    });
    return next;
  }
  return next;
}

function chapterModal(): ModalCopy {
  return {
    title: "The morning's work is done",
    body: "Supply is settled, the hall has been used, and a woman who is not a customer knows the door. The four of them are in the courtyard. They are not waiting for a speech. They are waiting to decide what the house does with the card.",
  };
}

function maybeChapter(save: Save): Save {
  if (save.era !== "present" || save.flags.chapter || save.pendingModal) return save;
  const friends = ["lin", "ren", "sable", "jonah"].filter((id) => save.met.includes(id)).length;
  if (friends >= 3 && save.decision && (save.flags.trained || save.flags.sparred) && save.flags.adler) {
    save.flags.chapter = true;
    save.pendingModal = chapterModal();
  }
  return save;
}

function tryAdvance(save: Save) {
  const need = nextRank(save.martialLevel);
  if (!need) return "";
  if (save.form >= need.form && save.breath >= need.breath && save.insight >= need.insight) {
    save.martialLevel = need.next;
    if (need.next === 4) {
      return "\n\nMartial 4. The strike is yours when you are tired, not only when you are watching yourself do it. This is as far as the intact notes go. The ninth is still a door, and a progress count is not a key.";
    }
    return "\n\nMartial 3. The strike settles, and your balance is still there when it ends. Hana would notice. Ren will. This does not make his rank a rumour, and it does not make the locked study any less locked.";
  }
  return "";
}

function missingLine(save: Save) {
  const need = nextRank(save.martialLevel);
  if (!need) return "\n\nMartial 4 is as far as the intact page goes. Further ranks are not a bar you can fill.";
  const bits = [];
  if (save.form < need.form) bits.push(`Form ${save.form}/${need.form}`);
  if (save.breath < need.breath) bits.push(`Breath ${save.breath}/${need.breath}`);
  if (save.insight < need.insight) bits.push(`Insight ${save.insight}/${need.insight}`);
  if (!bits.length) return "";
  return `\n\nStill short of Martial ${need.next}: ${bits.join(", ")}. Insight comes from sparring with your eyes open, not from repeating the breath.`;
}

function placeRuntime(save: Save) {
  runtime.player.x = save.x;
  runtime.player.z = save.z;
  runtime.player.yaw = save.yaw;
  runtime.camYaw = save.yaw;
  runtime.overrideSnapped = false;
  runtime.adlerZ = save.visitor === "walking" ? ADLER_SPAWN_Z : 14.55;
}

function decisionCopy(decision: Exclude<Decision, null>, save: Save) {
  const book = economy(decision);
  if (decision === "pay") {
    return {
      toast: "Gao's price is paid. The shelf stays honest.",
      body: `You paid £2,860. Cash is now ${save.cash.toLocaleString("en-GB")}. The week's trade holds at £6,200 if the regulars taste what they expect. Lin can defend the number. Jonah would have talked; he will not call this a betrayal.`,
      net: book.net,
    };
  }
  if (decision === "exclusive") {
    return {
      toast: "Gao keeps the season. You keep the old price.",
      body: `£2,200, and the root is his alone until spring. Cash is ${save.cash.toLocaleString("en-GB")}. If a better crate appears, you have already said no. Jonah will walk the conversation this afternoon so the paper has a face.`,
      net: book.net,
    };
  }
  return {
    toast: "Dock stock is cheaper. Tomas will not lie about it.",
    body: `You spent £1,400. Cash is ${save.cash.toLocaleString("en-GB")}. Expect the week's trade to sag toward £5,400 once the Wednesday regulars notice. The margin looks clever for seven days.`,
    net: book.net,
  };
}

export const useGame = create<GameStore>((set, get) => ({
  phase: "title",
  resume: "play",
  save: null,
  hasSave: false,
  talk: null,
  inspect: null,
  modal: null,
  toast: null,
  hud: emptyHud(),
  pausePage: "root",

  boot: () => {
    const existing = readSave();
    set({ hasSave: !!existing });
  },

  toCreate: () => set({ phase: "create" }),

  toTitle: () => {
    const existing = readSave();
    set({ phase: "title", hasSave: !!existing, talk: null, inspect: null, modal: null, pausePage: "root" });
  },

  startOrContinue: () => {
    unlockAudio();
    tick(440);
    const existing = readSave();
    if (!existing) {
      set({ phase: "create" });
      return;
    }
    placeRuntime(existing);
    runtime.fade = 1;
    const phase =
      existing.flags.second && !existing.flags.arcSeen
        ? "epilogue"
        : existing.flags.evening && !existing.flags.epilogueSeen
          ? "epilogue"
          : existing.era === "flashback"
            ? "flashback"
            : "play";
    set({ save: existing, hasSave: true, phase, toast: null });
  },

  newStory: () => {
    unlockAudio();
    set({ phase: "create" });
  },

  confirmProfile: (profile) => {
    unlockAudio();
    tick(520);
    const save = blankSave(profile);
    placeRuntime(save);
    runtime.fade = 1;
    writeSave(save);
    set({ save, hasSave: true, phase: "flashback", toast: null, talk: null });
  },

  beginPresent: () => {
    const current = get().save;
    if (!current) return;
    const save: Save = {
      ...structuredClone(current),
      era: "present",
      minute: 0,
      x: PRESENT_SPAWN.x,
      z: PRESENT_SPAWN.z,
      yaw: PRESENT_SPAWN.yaw,
      flags: { ...current.flags, seal: true },
    };
    addJournal(save, "seal");
    placeRuntime(save);
    runtime.fade = 1;
    writeSave(save);
    set({
      save,
      phase: "play",
      toast: "Thursday morning. Six months since the seal.",
    });
  },

  interact: () => {
    const { phase, save } = get();
    if (!save || (phase !== "play" && phase !== "flashback")) return;
    const prompt = runtime.promptId;
    if (!prompt) return;
    let id = prompt;
    if (save.era === "present" && save.flags.chapter && !save.flags.council && (id === "lin" || id === "ren" || id === "sable" || id === "jonah")) {
      id = "council";
    }
    if (save.era === "present" && save.flags.council && !save.flags.evening && id === "hana") {
      id = "evening";
    }
    if (save.era === "present" && save.flags.dawn && save.flags.branch && save.exhibit && !save.flags.second && id === "hana") {
      id = "door";
    }
    if (id === "rest") {
      get().beginDawn();
      return;
    }
    if (id === "ledger") {
      get().openLedger();
      return;
    }
    if (id === "train") {
      get().startTraining();
      return;
    }
    if (id === "board" && save.flags.dawn && save.flags.branch && !save.exhibit) {
      id = "exhibit";
    } else if (id === "study" || id === "board") {
      get().openInspect(id);
      return;
    }
    const script = scriptFor(id, save);
    const node = script.nodes[script.start];
    const nextSave = node ? applyEffect(save, node.effect) : save;
    set({ phase: "talk", resume: phase, talk: { id, node: script.start, script }, save: nextSave });
  },

  enterNode: (nodeId) => {
    const talk = get().talk;
    const save = get().save;
    if (!talk || !save) return;
    const node = talk.script.nodes[nodeId];
    if (!node) return;
    const nextSave = node.close ? save : applyEffect(save, node.effect);
    set({ talk: { ...talk, node: nodeId }, save: nextSave });
  },

  advance: () => {
    const talk = get().talk;
    if (!talk) return;
    const node = talk.script.nodes[talk.node];
    if (!node || node.choices?.length) return;
    if (node.next) {
      get().enterNode(node.next);
      return;
    }
    let current = get().save;
    if (current && node.effect) {
      current = applyEffect(current, node.effect);
      set({ save: current });
    }
    if (node.close === "handover") {
      set({ phase: "handover", talk: null });
      get().persist();
      return;
    }
    if (node.close === "epilogue") {
      const current = get().save;
      if (!current) {
        set({ phase: "epilogue", talk: null });
        return;
      }
      const save = applyEffect(current, "evening");
      writeSave(save);
      set({ save, phase: "epilogue", talk: null, hasSave: true });
      return;
    }
    if (node.close === "arc") {
      const current = get().save;
      if (!current) {
        set({ phase: "epilogue", talk: null });
        return;
      }
      const save = current.flags.second ? current : applyEffect(current, "second");
      writeSave(save);
      set({ save, phase: "epilogue", talk: null, hasSave: true });
      return;
    }
    get().closeTalk();
  },

  pick: (index) => {
    const talk = get().talk;
    const save = get().save;
    if (!talk || !save) return;
    const node = talk.script.nodes[talk.node];
    const choice = node?.choices?.[index];
    if (!choice) return;
    tick(480);
    let nextSave = applyEffect(save, choice.effect);
    if (choice.effect === "spar") {
      addMet(nextSave, "ren");
      set({ save: nextSave, talk: null });
      get().startSpar();
      return;
    }
    if (choice.effect === "ledger") {
      addMet(nextSave, talk.id);
      set({ save: nextSave, talk: null });
      get().openLedger();
      return;
    }
    set({ save: nextSave });
    if (choice.goto) {
      get().enterNode(choice.goto);
      return;
    }
    get().closeTalk();
  },

  closeTalk: () => {
    const current = get().save;
    const resume = get().resume === "flashback" ? "flashback" : "play";
    if (!current) {
      set({ phase: resume, talk: null });
      return;
    }
    let save = structuredClone(current);
    if (save.flags.adler && save.visitor !== "met") save.visitor = "met";
    save = maybeChapter(save);
    const modal = save.pendingModal;
    if (modal) save.pendingModal = null;
    writeSave(save);
    set({
      save,
      talk: null,
      phase: modal ? "modal" : resume,
      modal: modal,
      resume,
    });
  },

  openLedger: () => {
    const current = get().save;
    if (!current || current.era !== "present") return;
    let save = structuredClone(current);
    if (!save.flags.holding) {
      save.flags.holding = true;
      addJournal(save, "holding");
    }
    writeSave(save);
    set({ save, phase: "ledger", resume: "play", talk: null });
  },

  closePanel: () => {
    const save = get().save;
    const back = save?.era === "flashback" ? "flashback" : "play";
    set({ phase: back, pausePage: "root" });
  },

  chooseSupply: (decision) => {
    const current = get().save;
    if (!current || current.decision) return;
    tick(560);
    let save = structuredClone(current);
    const cost = decision === "pay" ? 2860 : decision === "dock" ? 1400 : 2200;
    save.cash -= cost;
    save.decision = decision;
    if (decision === "pay") setBond(save, "lin", 1, "You kept the shelf honest. She can defend the number.");
    if (decision === "exclusive") {
      setBond(save, "jonah", 1, "You let him deal with Gao the way Gao requires.");
      setBond(save, "lin", 0, "She accepted the exclusive. She is already worrying about the harvest.");
    }
    if (decision === "dock") {
      setBond(save, "lin", -1, "She will have the conversation with the Wednesday regulars.");
      setBond(save, "jonah", -1, "He wanted you to speak to Gao. You went around him.");
    }
    if (save.visitor === "none") {
      save.visitor = "walking";
      runtime.adlerZ = ADLER_SPAWN_Z;
    }
    save = maybeChapter(save);
    const copy = decisionCopy(decision, save);
    writeSave(save);
    set({
      save,
      toast: copy.toast,
      phase: "modal",
      modal: { title: "The order is in", body: copy.body },
    });
  },

  startTraining: () => {
    const save = get().save;
    if (!save || save.era !== "present") return;
    if (runtime.player.z > -9 || Math.abs(runtime.player.x) > 14) {
      set({ toast: "The breath wants the hall floor. The brass ring is inside." });
      return;
    }
    unlockAudio();
    set({ phase: "train", resume: "play" });
  },

  finishTraining: (session, perfect, good) => {
    const current = get().save;
    if (!current) return;
    if (current.trainSessions >= session) return;
    let save = structuredClone(current);
    save.trainSessions = session;
    const base = perfect + good * 0.5;
    const doubled = base * 2;
    const formGain = Math.round(doubled / 2);
    const breathGain = Math.floor(doubled / 2);
    save.form += formGain;
    save.breath += breathGain;
    if (base >= 1) save.flags.trained = true;
    const advance = tryAdvance(save);
    const comparison =
      base <= 0
        ? "The set didn't settle. Pressing through the inhale spends the breath you meant to keep. Nothing was added, and that is a result, not a glitch."
        : `A comparable student of Hana's would take ${base} from this set. You take ${doubled}. Form +${formGain}, Breath +${breathGain}. Shen wrote that your measure runs ahead. The notes did not explain why.`;
    save = maybeChapter(save);
    writeSave(save);
    set({
      save,
      phase: "modal",
      modal: {
        title: base <= 0 ? "The breath scattered" : "Ash Breath",
        body: comparison + (advance || missingLine(save)),
      },
    });
  },

  startSpar: () => {
    const save = get().save;
    if (!save || get().phase === "spar") return;
    runtime.returnPos = { x: runtime.player.x, z: runtime.player.z, yaw: runtime.player.yaw };
    runtime.spar = null;
    set({ phase: "spar", resume: "play", talk: null, toast: null });
  },

  finishSpar: (result, info) => {
    const current = get().save;
    if (!current) return;
    let save = structuredClone(current);
    save.flags.sparred = true;
    save.sparResult = result;
    if (info.punished) save.flags.punished = true;
    let insight = 0;
    if (result === "win") insight = 2;
    else if (result === "draw" || info.blocks + info.dodges >= 2 || info.sawHeavy) insight = 1;
    save.insight += insight;
    const regardLine =
      result === "win"
        ? "You beat a higher rank in his own pattern. He is annoyed, which is his version of respect."
        : result === "draw"
          ? "You refused to fold. He will call that unfinished, and he will be back on the line."
          : insight > 0
            ? "You lost and still left with a picture of him. He noticed which one it was."
            : "You left with bruises and no clearer picture. He will spar again. Come back with your eyes open.";
    setBond(save, "ren", result === "loss" && insight === 0 ? 0 : 1, regardLine);
    const advance = tryAdvance(save);
    const rankLine =
      result === "win"
        ? "He is Martial 3. You were not, when the spar started. Rank is a fact. It was not the verdict. You found a rhythm and your body was in time with what you understood."
        : result === "draw"
          ? "Time ran out with both of you still up. A lower rank holding a higher one to a draw is not a speech. It is information."
          : info.sawHeavy
            ? "You saw the long windup. Understanding the counter did not put your feet there. That gap is the whole lesson, and it is allowed to sting."
            : "You were busy swinging. The pattern was on offer. It will be on offer again.";
    save = maybeChapter(save);
    runtime.player.x = -0.4;
    runtime.player.z = -12.4;
    runtime.player.yaw = 0;
    runtime.camYaw = 0;
    runtime.spar = null;
    writeSave(save);
    set({
      save,
      phase: "modal",
      modal: {
        title: result === "win" ? "Ren yields" : result === "draw" ? "Neither yields" : "Ren offers a hand",
        body: `${rankLine}\n\nInsight +${insight}. ${regardLine}${advance || missingLine(save)}`,
      },
    });
  },

  togglePause: () => {
    const phase = get().phase;
    if (phase === "pause") {
      const back = get().resume;
      set({ phase: back, pausePage: "root" });
      return;
    }
    if (phase === "talk") {
      get().closeTalk();
      return;
    }
    if (phase === "play" || phase === "flashback" || phase === "spar") {
      set({ phase: "pause", resume: phase, pausePage: "root" });
    }
  },

  setPausePage: (page) => set({ pausePage: page }),

  openInspect: (id) => {
    const current = get().save;
    if (!current) return;
    let save = structuredClone(current);
    if (id === "study") {
      save.flags.study = true;
      addJournal(save, "study");
      if (save.flags.adler) addJournal(save, "paper");
    }
    if (id === "board") {
      save.flags.board = true;
      addJournal(save, "board");
    }
    writeSave(save);
    set({
      save,
      phase: "inspect",
      resume: "play",
      inspect: inspectFor(id, save),
    });
  },

  closeInspect: () => {
    get().closePanel();
    set({ inspect: null });
  },

  dismissModal: () => {
    const save = get().save;
    if (save?.pendingModal) {
      const modal = save.pendingModal;
      const next = structuredClone(save);
      next.pendingModal = null;
      writeSave(next);
      set({ save: next, modal, phase: "modal" });
      return;
    }
    const back = save?.era === "flashback" ? "flashback" : "play";
    set({ phase: back, modal: null });
    get().persist();
  },

  stayEvening: () => {
    const current = get().save;
    if (!current) {
      set({ phase: "play" });
      return;
    }
    const save = structuredClone(current);
    if (save.flags.second) save.flags.arcSeen = true;
    else save.flags.epilogueSeen = true;
    writeSave(save);
    set({
      save,
      phase: "play",
      hasSave: true,
      toast: save.flags.second
        ? "Friday keeps going. The door has a name. It is not open."
        : "The lamps are lit. The residence is there when you want the night to end.",
    });
  },

  beginDawn: () => {
    const current = get().save;
    if (!current || current.era !== "present" || !current.flags.evening || current.flags.dawn) return;
    const save = structuredClone(current);
    save.flags.epilogueSeen = true;
    save.flags.dawn = true;
    save.minute = minutesUntilOpen(save.minute);
    save.x = -14.2;
    save.z = 6.4;
    save.yaw = -Math.PI / 2;
    pushJournal(save, {
      id: "dawn",
      title: "Friday",
      text: "You slept in the residence. The clock moved because you closed your eyes, not because the city ran while you were away. The study lamp was still on. You left it.",
    });
    placeRuntime(save);
    runtime.fade = 1;
    writeSave(save);
    const where =
      save.posture === "receive"
        ? "Hale is expected in the office. Jonah will stay."
        : save.posture === "refuse"
          ? "Something has been left under the stone at the gate."
          : "Sable is already at the water stairs.";
    set({ save, phase: "play", hasSave: true, talk: null, modal: null, toast: `Friday morning. ${where}` });
  },

  notePos: (x, z, yaw) => {
    const save = get().save;
    if (!save) return;
    if (save.x === x && save.z === z && save.yaw === yaw) return;
    set({ save: { ...save, x, z, yaw } });
  },

  addMinute: (minutes) => {
    const save = get().save;
    const phase = get().phase;
    if (!save || (phase !== "play" && phase !== "flashback")) return;
    set({ save: { ...save, minute: save.minute + minutes } });
  },

  setHud: (hud) => set({ hud }),

  visitorArrived: () => {
    const save = get().save;
    if (!save || save.visitor !== "walking") return;
    const next = { ...save, visitor: "waiting" as const };
    writeSave(next);
    set({ save: next, toast: "A woman in a grey coat has stopped at the gate." });
  },

  persist: () => {
    const save = get().save;
    if (!save) return;
    writeSave(save);
    set({ hasSave: true });
  },
}));
