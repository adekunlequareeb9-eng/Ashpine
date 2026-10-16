import { BookOpen, Eye, Leaf, Pause, ScrollText, Shield, Swords } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GameCanvas } from "@/game/GameCanvas";
import { economy } from "@/game/layout";
import { formatMinute, objectives, pounds, regardWord, arcNotes, closingNotes } from "@/game/objectives";
import { setMuted } from "@/game/audio";
import { runtime } from "@/game/runtime";
import { useGame } from "@/game/store";
import { nextRank, type Decision, type Presentation, type Pronouns, type Profile } from "@/game/types";

const primary = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-fg";
const ghost = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-line bg-surface-2 px-4 py-2 text-sm font-medium text-fg";

export function GameApp() {
  return (
    <div className="game-root relative w-full overflow-hidden bg-bg text-fg">
      <GameCanvas />
      <div className="vignette pointer-events-none absolute inset-0" />
      <div id="world-fade" className="pointer-events-none absolute inset-0 bg-bg opacity-0" />
      <div id="hit-flash" className="pointer-events-none absolute inset-0 bg-primary opacity-0" />
      <Hud />
      <Title />
      <Create />
      <Handover />
      <Talk />
      <Ledger />
      <Train />
      <Inspect />
      <Result />
      <Epilogue />
      <PauseMenu />
      <TouchControls />
    </div>
  );
}

function Title() {
  const phase = useGame((s) => s.phase);
  const hasSave = useGame((s) => s.hasSave);
  if (phase !== "title") return null;
  return (
    <div className="absolute inset-0 z-20 flex items-end justify-center overflow-y-auto p-4 sm:items-center">
      <div className="panel w-full max-w-xl p-6 sm:p-8">
        <div className="flex items-center gap-3 text-brass">
          <span className="grid size-11 place-items-center rounded-full border border-brass font-display text-xl">A</span>
          <span className="text-xs tracking-[0.28em] uppercase">Lantern Ward</span>
        </div>
        <h1 className="mt-4 font-display text-5xl font-medium sm:text-7xl">Ashpine</h1>
        <p className="mt-2 font-display text-xl text-muted italic">A house, a hall, and a man who did not come back.</p>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
          Five friends have kept a trading house and a training hall standing for six months. This morning the invoices, the floor, and a locked study all want an answer. The hidden world can wait until you notice it.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button className={primary} onClick={() => useGame.getState().startOrContinue()}>
            Start
          </button>
          {hasSave ? (
            <button className={ghost} onClick={() => useGame.getState().newStory()}>
              New story
            </button>
          ) : null}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted">
          {hasSave ? "Start returns you to the same minute you left. " : ""}
          The house waits. Nothing here advances while you are away.
        </p>
      </div>
    </div>
  );
}

function Create() {
  const phase = useGame((s) => s.phase);
  const [name, setName] = useState("");
  const [presentation, setPresentation] = useState<Presentation>("plain");
  const [pronouns, setPronouns] = useState<Pronouns>("they");
  const [complexion, setComplexion] = useState<Profile["complexion"]>(1);
  if (phase !== "create") return null;

  const choosePresentation = (next: Presentation) => {
    setPresentation(next);
    setPronouns(next === "tailored" ? "he" : next === "soft" ? "she" : "they");
  };

  return (
    <div className="absolute inset-0 z-20 flex items-end justify-center overflow-y-auto p-4 sm:items-center">
      <form
        className="panel w-full max-w-xl p-6 sm:p-8"
        onSubmit={(event) => {
          event.preventDefault();
          const clean = name.trim().slice(0, 18);
          if (clean.length < 2) return;
          useGame.getState().confirmProfile({ name: clean, presentation, pronouns, complexion });
        }}
      >
        <p className="text-xs tracking-[0.22em] text-brass uppercase">Who carries the seal</p>
        <h2 className="mt-2 font-display text-4xl">You are nineteen. They already call you Captain.</h2>
        <label className="mt-5 block text-sm text-muted" htmlFor="captain-name">
          Name
        </label>
        <input
          id="captain-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={18}
          autoComplete="off"
          placeholder="Your name"
          className="mt-2 w-full rounded-xl border border-line bg-bg px-3 py-3 text-fg select-text outline-none"
        />
        <p className="mt-5 text-sm text-muted">Presentation. It changes your coat and hair, not your rank.</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {(
            [
              ["plain", "Plain", "Work jacket, jaw-length hair"],
              ["tailored", "Tailored", "Sharper coat, short hair"],
              ["soft", "Soft", "Longer coat, hair down"],
            ] as const
          ).map(([id, label, detail]) => (
            <button
              key={id}
              type="button"
              onClick={() => choosePresentation(id)}
              className={`min-h-11 rounded-xl border px-3 py-3 text-left ${presentation === id ? "border-brass bg-surface-2" : "border-line bg-bg"}`}
            >
              <span className="block text-sm font-medium">{label}</span>
              <span className="mt-1 block text-xs text-muted">{detail}</span>
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">Narration pronouns</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["they", "she", "he"] as const).map((p) => (
            <button key={p} type="button" className={pronouns === p ? primary : ghost} onClick={() => setPronouns(p)}>
              {p === "they" ? "they" : p === "she" ? "she" : "he"}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">Complexion</p>
        <div className="mt-2 flex gap-2">
          {[0, 1, 2, 3].map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`Complexion ${n + 1}`}
              onClick={() => setComplexion(n as Profile["complexion"])}
              className={`size-11 rounded-full border-2 ${complexion === n ? "border-brass" : "border-line"} ${["bg-skin-0", "bg-skin-1", "bg-skin-2", "bg-skin-3"][n]}`}
            />
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button className={primary} type="submit" disabled={name.trim().length < 2}>
            Enter the courtyard
          </button>
          <button className={ghost} type="button" onClick={() => useGame.getState().toTitle()}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

function Handover() {
  const phase = useGame((s) => s.phase);
  if (phase !== "handover") return null;
  return (
    <div className="absolute inset-0 z-20 flex items-end justify-center p-4 sm:items-center">
      <div className="panel w-full max-w-lg p-6 sm:p-8">
        <p className="text-xs tracking-[0.22em] text-brass uppercase">Six months later</p>
        <h2 className="mt-2 font-display text-4xl">Thursday morning</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          The papers were already in your name. Payroll was met. The hall opened every dawn. He did not come back, and the usual hour became a habit of looking at the door.
        </p>
        <button className={`${primary} mt-6`} onClick={() => useGame.getState().beginPresent()}>
          Open the house
        </button>
      </div>
    </div>
  );
}

function Hud() {
  const phase = useGame((s) => s.phase);
  const save = useGame((s) => s.save);
  const hud = useGame((s) => s.hud);
  const toast = useGame((s) => s.toast);
  const touch = useTouchLayout();
  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => useGame.setState({ toast: null }), 4600);
    return () => window.clearTimeout(id);
  }, [toast]);

  if (!save || phase === "title" || phase === "create" || phase === "handover" || phase === "epilogue") return null;
  const goals = objectives(save);
  const showExplore = phase === "play" || phase === "flashback" || phase === "spar";

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {toast ? (
        <div className="absolute top-3 left-1/2 w-[min(92vw,34rem)] -translate-x-1/2 rounded-xl border border-line bg-surface px-4 py-3 text-sm leading-relaxed">
          {toast}
        </div>
      ) : null}

      <div className="absolute top-3 left-3 max-w-[70vw] sm:max-w-sm">
        <div className="rounded-xl border border-line bg-surface/90 px-3 py-2 backdrop-blur-sm">
          <p className="text-[11px] tracking-[0.16em] text-brass uppercase">
            {save.era === "flashback" ? "Six months ago · dusk" : `${formatMinute(save.minute)} · month six`}
          </p>
          <p className="font-display text-xl leading-tight">{hud.place}</p>
        </div>
        {phase !== "spar" ? (
          <ul className="mt-2 space-y-1 rounded-xl border border-line bg-surface/90 p-3 text-sm backdrop-blur-sm">
            {goals.map((goal) => (
              <li key={goal.id} className={goal.done ? "text-muted line-through" : "text-fg"}>
                {goal.text}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {phase !== "spar" && !touch ? (
        <div className="absolute right-3 bottom-3 hidden rounded-xl border border-line bg-surface/90 p-2 sm:block">
          <MiniMap />
        </div>
      ) : null}

      {showExplore && hud.prompt && phase !== "spar" ? (
        <div className="absolute bottom-6 left-1/2 w-[min(92vw,28rem)] -translate-x-1/2">
          <button className={`${primary} pointer-events-auto w-full`} onClick={() => (runtime.edge.interact = true)}>
            {hud.prompt}
          </button>
        </div>
      ) : null}

      {phase === "spar" && hud.spar ? <SparHud /> : null}

      {showExplore ? (
        <div className="absolute top-3 right-3 flex gap-2">
          <button className={`${ghost} pointer-events-auto size-11 px-0`} aria-label="Pause" onClick={() => useGame.getState().togglePause()}>
            <Pause className="size-5" />
          </button>
          {save.era === "present" ? (
            <button className={`${ghost} pointer-events-auto size-11 px-0`} aria-label="Ledger" onClick={() => useGame.getState().openLedger()}>
              <ScrollText className="size-5" />
            </button>
          ) : null}
        </div>
      ) : null}

      {save.era === "flashback" && phase === "flashback" ? (
        <button className={`${ghost} pointer-events-auto absolute bottom-6 left-3`} onClick={() => useGame.getState().beginPresent()}>
          Skip to this morning
        </button>
      ) : null}
    </div>
  );
}

function SparHud() {
  const spar = useGame((s) => s.hud.spar);
  const level = useGame((s) => s.save?.martialLevel ?? 2);
  if (!spar) return null;
  return (
    <div className="absolute right-3 bottom-24 left-3 sm:bottom-6">
      <div className="pointer-events-none mx-auto w-full max-w-3xl rounded-xl border border-line bg-surface/90 p-3 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3 text-xs tracking-[0.14em] uppercase">
          <span>You · Martial {level}</span>
          <span className="text-muted">{Math.max(0, 70 - Math.floor(spar.time))}s</span>
          <span>Ren · Martial 3</span>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <Bar label="Composure" value={spar.php} max={spar.pmax} />
          <Bar label="His composure" value={spar.rhp} max={spar.rmax} align="right" />
        </div>
        <Bar label="Breath" value={spar.pstam} max={spar.pstamMax} />
        <p className="mt-2 text-sm leading-relaxed">{spar.text}</p>
      </div>
      <div className="pointer-events-auto mx-auto mt-2 flex max-w-3xl flex-wrap justify-center gap-2">
        <FightButton label="Light" hint="J" onPress={() => (runtime.edge.light = true)} icon={<Swords className="size-4" />} />
        <FightButton label="Heavy" hint="K" onPress={() => (runtime.edge.heavy = true)} icon={<Swords className="size-4" />} />
        <FightButton label="Dodge" hint="Space" onPress={() => (runtime.edge.dodge = true)} icon={<Leaf className="size-4" />} />
        <FightButton
          label="Guard"
          hint="F"
          hold
          onPress={() => (runtime.hold.guard = true)}
          onRelease={() => (runtime.hold.guard = false)}
          icon={<Shield className="size-4" />}
        />
      </div>
    </div>
  );
}

function FightButton({
  label,
  hint,
  onPress,
  onRelease,
  hold,
  icon,
}: {
  label: string;
  hint: string;
  onPress: () => void;
  onRelease?: () => void;
  hold?: boolean;
  icon: React.ReactNode;
}) {
  return (
    <button
      className={`${ghost} min-w-20 flex-1`}
      onPointerDown={(event) => {
        event.preventDefault();
        onPress();
      }}
      onPointerUp={() => onRelease?.()}
      onPointerLeave={() => hold && onRelease?.()}
    >
      {icon}
      <span>{label}</span>
      <span className="text-xs text-muted">{hint}</span>
    </button>
  );
}

function Bar({ label, value, max, align }: { label: string; value: number; max: number; align?: "right" }) {
  const pct = Math.max(0, Math.min(100, (value / Math.max(1, max)) * 100));
  return (
    <div className={align === "right" ? "text-right" : ""}>
      <div className="mb-1 flex justify-between text-[11px] tracking-wide text-muted uppercase">
        <span>{label}</span>
        <span>{Math.ceil(value)}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-bg">
        <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function MiniMap() {
  const hud = useGame((s) => s.hud);
  const save = useGame((s) => s.save);
  if (!save) return null;
  const fx = -Math.sin(hud.yaw);
  const fz = -Math.cos(hud.yaw);
  return (
    <svg viewBox="-24 -24 50 56" className="h-36 w-40">
      <rect x="-22" y="-21" width="30" height="13" fill="#3a302a" />
      <rect x="-22" y="-6" width="12" height="18" fill="#d7cfc3" />
      <rect x="10" y="-6" width="12" height="18" fill="#d7cfc3" />
      <rect x="-10" y="-9" width="20" height="21" fill="#cfc6b8" />
      <rect x="11" y="18" width="8" height="6" fill="#d7cfc3" />
      <circle cx={hud.x} cy={hud.z} r="1.1" fill="#c4452d" />
      <line x1={hud.x} y1={hud.z} x2={hud.x + fx * 2.4} y2={hud.z + fz * 2.4} stroke="#f3eadf" strokeWidth="0.4" />
    </svg>
  );
}

function Talk() {
  const phase = useGame((s) => s.phase);
  const talk = useGame((s) => s.talk);
  if (phase !== "talk" || !talk) return null;
  const node = talk.script.nodes[talk.node];
  if (!node) return null;
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 p-3 sm:p-6">
      <div className="panel mx-auto max-h-96 w-full max-w-3xl overflow-y-auto p-5">
        <p className="font-display text-2xl text-brass">{node.speaker}</p>
        <p className="mt-2 text-base leading-relaxed">{node.text}</p>
        {node.choices?.length ? (
          <div className="mt-4 flex flex-col gap-2">
            {node.choices.map((choice, index) => (
              <button key={choice.label} className={`${ghost} justify-start text-left`} onClick={() => useGame.getState().pick(index)}>
                {choice.label}
              </button>
            ))}
          </div>
        ) : (
          <button className={`${primary} mt-4`} onClick={() => useGame.getState().advance()}>
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

function Ledger() {
  const phase = useGame((s) => s.phase);
  const save = useGame((s) => s.save);
  const [pick, setPick] = useState<Exclude<Decision, null> | null>(null);
  if (phase !== "ledger" || !save) return null;
  const book = economy(save.decision);
  const options: { id: Exclude<Decision, null>; title: string; body: string }[] = [
    {
      id: "pay",
      title: "Pay Gao's increase",
      body: "£2,860 now. The shelf tastes the same. Supplier trust stays. The week stays thin.",
    },
    {
      id: "exclusive",
      title: "Old price, exclusive season",
      body: "£2,200, and you don't buy this root elsewhere until spring. Jonah's way. The harvest becomes your risk.",
    },
    {
      id: "dock",
      title: "Buy the dock blend",
      body: "£1,400. Tomas will not pretend. Expect trade to fall toward £5,400 once regulars notice.",
    },
  ];
  return (
    <div className="absolute inset-0 z-20 flex items-end justify-center overflow-y-auto p-3 sm:items-center">
      <div className="panel max-h-[90vh] w-full max-w-3xl overflow-y-auto p-5 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs tracking-[0.2em] text-brass uppercase">House ledger</p>
            <h2 className="font-display text-4xl">This week, before Gao</h2>
          </div>
          <button className={ghost} onClick={() => useGame.getState().closePanel()}>
            Close
          </button>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Stat label="Cash" value={pounds(save.cash)} />
          <Stat label="Trade" value={pounds(book.trade)} />
          <Stat label="Tuition" value={pounds(book.tuition)} />
          <Stat label="Wages" value={pounds(book.wages)} />
          <Stat label="Upkeep" value={pounds(book.upkeep)} />
          <Stat label="Supply" value={save.decision ? pounds(book.supply) : "Unsettled"} />
        </div>
        <p className="mt-3 text-sm text-muted">
          Students on the book: 22. Hana teaches. The four of you still draw no wage. Projected week after supply: {pounds(book.net)} if the trade number holds.
        </p>
        <div className="mt-4 rounded-xl border border-line bg-bg p-4">
          <p className="text-xs tracking-[0.16em] text-brass uppercase">Irregular</p>
          <p className="mt-1 text-sm leading-relaxed">
            P. Meridian holding. Quarterly, marked personal, stopped the month Shen left. Iris has not written to the bank.
          </p>
        </div>
        {save.decision ? (
          <p className="mt-4 text-sm leading-relaxed">The morning's supply is already chosen. Live with it long enough to see who notices.</p>
        ) : (
          <div className="mt-4 grid gap-3">
            {options.map((option) => (
              <button
                key={option.id}
                className={`rounded-xl border p-4 text-left ${pick === option.id ? "border-brass bg-surface-2" : "border-line bg-bg"}`}
                onClick={() => setPick(option.id)}
              >
                <span className="block font-medium">{option.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">{option.body}</span>
              </button>
            ))}
            <button className={primary} disabled={!pick} onClick={() => pick && useGame.getState().chooseSupply(pick)}>
              Record this choice
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-bg px-3 py-3">
      <p className="text-[11px] tracking-[0.14em] text-muted uppercase">{label}</p>
      <p className="mt-1 font-display text-2xl">{value}</p>
    </div>
  );
}

function Train() {
  const phase = useGame((s) => s.phase);
  const sessions = useGame((s) => s.save?.trainSessions ?? 0);
  const [view, setView] = useState({ beat: "inhale", t: 0, round: 0, note: "Do not press." });
  const done = useRef(false);

  useEffect(() => {
    if (phase !== "train") {
      done.current = false;
      return;
    }
    done.current = false;
    const session = sessions + 1;
    let perfect = 0;
    let good = 0;
    let spoiled = false;
    let beat: "inhale" | "hold" | "strike" = "inhale";
    let t = 0;
    let round = 0;
    let last = performance.now();
    let raf = 0;
    const lengths = { inhale: 2.15, hold: 1.35, strike: 1.05 };

    const finishRound = (hit: "perfect" | "good" | "miss") => {
      if (spoiled || hit === "miss") {
        /* nothing */
      } else if (hit === "perfect") perfect += 1;
      else good += 1;
      spoiled = false;
      round += 1;
      beat = "inhale";
      t = 0;
      if (round >= 4 && !done.current) {
        done.current = true;
        useGame.getState().finishTraining(session, perfect, good);
      }
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.code !== "Space" && event.code !== "KeyJ") return;
      event.preventDefault();
      press();
    };
    const press = () => {
      if (done.current) return;
      if (beat !== "strike") {
        spoiled = true;
        setView((v) => ({ ...v, note: "Too soon. The hand waits for the end of the breath." }));
        return;
      }
      const perfectWindow = t > lengths.strike - 0.4;
      finishRound(perfectWindow ? "perfect" : "good");
      setView({ beat: "inhale", t: 0, round, note: perfectWindow ? "Settled." : "Early, but it was the strike." });
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!done.current) {
        t += dt;
        if (t >= lengths[beat]) {
          if (beat === "strike") finishRound(spoiled ? "miss" : "miss");
          else {
            beat = beat === "inhale" ? "hold" : "strike";
            t = 0;
            spoiled = false;
          }
        }
        const note = beat === "inhale" ? "Inhale. Do not press." : beat === "hold" ? "Hold. Still no hand." : "Strike — the last of the breath.";
        setView({ beat, t, round, note });
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("keydown", onKey);
    raf = requestAnimationFrame(loop);
    const api = { press };
    (window as unknown as { __ashpineStrike?: () => void }).__ashpineStrike = () => api.press();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
    };
  }, [phase, sessions]);

  if (phase !== "train") return null;
  const lengths = { inhale: 2.15, hold: 1.35, strike: 1.05 };
  const pct = Math.min(100, (view.t / lengths[view.beat as "inhale" | "hold" | "strike"]) * 100);
  return (
    <div className="absolute inset-0 z-20 flex items-end justify-center p-3 sm:items-center">
      <div className="panel w-full max-w-lg p-6">
        <p className="text-xs tracking-[0.2em] text-brass uppercase">Ash Breath</p>
        <h2 className="mt-1 font-display text-4xl capitalize">{view.beat}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{view.note}</p>
        <p className="mt-1 text-xs text-muted">Four counts, shortened. Round {Math.min(view.round + 1, 4)} of 4.</p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-bg">
          <div className={`h-full ${view.beat === "strike" ? "bg-primary" : "bg-brass"}`} style={{ width: `${pct}%` }} />
        </div>
        <button className={`${primary} mt-5 w-full`} onClick={() => (window as unknown as { __ashpineStrike?: () => void }).__ashpineStrike?.()}>
          Strike
        </button>
        <button className={`${ghost} mt-2 w-full`} onClick={() => useGame.getState().closePanel()}>
          Leave the ring
        </button>
      </div>
    </div>
  );
}

function Inspect() {
  const phase = useGame((s) => s.phase);
  const inspect = useGame((s) => s.inspect);
  if (phase !== "inspect" || !inspect) return null;
  return (
    <div className="absolute inset-0 z-20 flex items-end justify-center p-3 sm:items-center">
      <div className="panel w-full max-w-lg p-6">
        <div className="flex items-center gap-2 text-brass">
          <Eye className="size-4" />
          <p className="text-xs tracking-[0.18em] uppercase">{inspect.title}</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed">{inspect.body}</p>
        <button className={`${primary} mt-5`} onClick={() => useGame.getState().closeInspect()}>
          Step back
        </button>
      </div>
    </div>
  );
}

function Epilogue() {
  const phase = useGame((s) => s.phase);
  const save = useGame((s) => s.save);
  if (phase !== "epilogue" || !save) return null;
  const notes = save.flags.second && !save.flags.arcSeen ? arcNotes(save) : closingNotes(save);
  const chapterTwo = save.flags.second && !save.flags.arcSeen;
  return (
    <div className="absolute inset-0 z-20 flex items-end justify-center overflow-y-auto p-4 sm:items-center">
      <div className="panel max-h-[92vh] w-full max-w-xl overflow-y-auto p-6 sm:p-8">
        <p className="text-xs tracking-[0.22em] text-brass uppercase">{chapterTwo ? "Chapter two" : "Chapter one"}</p>
        <h2 className="mt-2 font-display text-5xl">{chapterTwo ? "The ninth is a door" : "The lamp is still on"}</h2>
        {notes.map((paragraph) => (
          <p key={paragraph} className="mt-3 text-sm leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
        <div className="mt-6 flex flex-wrap gap-3">
          {save.flags.second ? (
            <button className={primary} onClick={() => useGame.getState().stayEvening()}>
              Keep Friday
            </button>
          ) : (
            <button className={primary} onClick={() => useGame.getState().beginDawn()}>
              Sleep until the house opens
            </button>
          )}
          {chapterTwo ? null : (
            <button className={ghost} onClick={() => useGame.getState().stayEvening()}>
              Walk the yard tonight
            </button>
          )}
          <button
            className={ghost}
            onClick={() => {
              useGame.getState().stayEvening();
              useGame.getState().toTitle();
            }}
          >
            Title
          </button>
        </div>
      </div>
    </div>
  );
}
function Result() {
  const phase = useGame((s) => s.phase);
  const modal = useGame((s) => s.modal);
  if (phase !== "modal" || !modal) return null;
  return (
    <div className="absolute inset-0 z-20 flex items-end justify-center p-3 sm:items-center">
      <div className="panel w-full max-w-lg p-6">
        <h2 className="font-display text-4xl">{modal.title}</h2>
        <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap">{modal.body}</p>
        <button className={`${primary} mt-5`} onClick={() => useGame.getState().dismissModal()}>
          Continue
        </button>
      </div>
    </div>
  );
}

function PauseMenu() {
  const phase = useGame((s) => s.phase);
  const page = useGame((s) => s.pausePage);
  const save = useGame((s) => s.save);
  const [quiet, setQuiet] = useState(false);
  if (phase !== "pause" || !save) return null;
  return (
    <div className="absolute inset-0 z-30 flex items-end justify-center overflow-y-auto bg-bg/50 p-3 sm:items-center">
      <div className="panel max-h-[92vh] w-full max-w-xl overflow-y-auto p-6">
        {page === "root" ? (
          <>
            <p className="text-xs tracking-[0.2em] text-brass uppercase">Paused</p>
            <h2 className="font-display text-4xl">The house is holding still</h2>
            <p className="mt-2 text-sm text-muted">Time does not pass while this is open, and it does not pass while the game is closed.</p>
            <div className="mt-4 grid gap-2">
              <button className={primary} onClick={() => useGame.getState().togglePause()}>
                Resume
              </button>
              <button className={ghost} onClick={() => useGame.getState().setPausePage("cult")}>
                <BookOpen className="size-4" /> Cultivation
              </button>
              <button className={ghost} onClick={() => useGame.getState().setPausePage("journal")}>
                Journal
              </button>
              <button className={ghost} onClick={() => useGame.getState().setPausePage("help")}>
                How the morning works
              </button>
              {save.era === "present" ? (
                <button className={ghost} onClick={() => useGame.getState().openLedger()}>
                  Ledger
                </button>
              ) : null}
              <button
                className={ghost}
                onClick={() => {
                  const next = !quiet;
                  setQuiet(next);
                  setMuted(next);
                }}
              >
                {quiet ? "Sound is off" : "Sound is on"}
              </button>
              <button
                className={ghost}
                onClick={() => {
                  useGame.getState().persist();
                  useGame.getState().toTitle();
                }}
              >
                Save and return to the title
              </button>
            </div>
          </>
        ) : null}
        {page === "cult" ? <Cultivation /> : null}
        {page === "journal" ? <Journal /> : null}
        {page === "help" ? <Help /> : null}
        {page !== "root" ? (
          <button className={`${ghost} mt-4`} onClick={() => useGame.getState().setPausePage("root")}>
            Back
          </button>
        ) : null}
      </div>
    </div>
  );
}

function Cultivation() {
  const save = useGame((s) => s.save);
  if (!save) return null;
  const need = nextRank(save.martialLevel);
  return (
    <div>
      <p className="text-xs tracking-[0.2em] text-brass uppercase">What the house teaches</p>
      <h2 className="font-display text-4xl">Martial {save.martialLevel}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Public ranks run from Martial 1 to Martial 9. Hana is 6 and does not advertise it. Ren is 3. You are {save.martialLevel}. Rank helps. It does not swing for you. The intact notes stop at Martial 4. The ninth is a door, not a bar.
      </p>
      {need ? (
        <div className="mt-4 space-y-3">
          <Bar label={`Form ${save.form}/${need.form}`} value={Math.min(save.form, need.form)} max={need.form} />
          <Bar label={`Breath ${save.breath}/${need.breath}`} value={Math.min(save.breath, need.breath)} max={need.breath} />
          <Bar label={`Insight ${save.insight}/${need.insight}`} value={Math.min(save.insight, need.insight)} max={need.insight} />
        </div>
      ) : (
        <p className="mt-4 text-sm leading-relaxed">Martial 4 is as far as the page that is still in the book. There is no count past it.</p>
      )}
      <p className="mt-3 text-sm leading-relaxed">
        You settle a form in about half the sessions Hana's best students need. That is not a reason to be careless. Insight does not come from the breath. It comes from seeing a person and still being fast enough to use what you saw.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        In the margin, in his hand: "The ninth is a door, not a ceiling." The rest of that page is the one missing from the notes.
      </p>
      <div className="mt-4 space-y-2">
        {(Object.keys(save.bonds) as (keyof typeof save.bonds)[]).map((id) => (
          <div key={id} className="rounded-xl border border-line bg-bg px-3 py-3">
            <p className="text-sm font-medium">
              {id === "lin" ? "Lin Mei" : id === "ren" ? "Ren Calder" : id === "sable" ? "Sable Quinn" : "Jonah Vale"}
              <span className="ml-2 text-xs tracking-wide text-brass uppercase">{regardWord(save.bonds[id].regard)}</span>
            </p>
            <p className="mt-1 text-sm text-muted">{save.bonds[id].line}</p>
          </div>
        ))}
      </div>
      {save.era === "present" ? (
        <button className={`${primary} mt-4`} onClick={() => useGame.getState().startTraining()}>
          Practise on the hall floor
        </button>
      ) : null}
    </div>
  );
}

function Journal() {
  const save = useGame((s) => s.save);
  if (!save) return null;
  return (
    <div>
      <h2 className="font-display text-4xl">What you are carrying</h2>
      <ul className="mt-3 space-y-3">
        {save.flags.seal ? <Item title="House seal" text="The papers are in your name. He said not to expect him." /> : null}
        {save.flags.adler ? <Item title="Adler & Co." text="14 Quay Stairs. Come with a better question than where he went." /> : null}
        {save.journal.length === 0 ? <p className="text-sm text-muted">The morning has not written anything down yet.</p> : null}
        {save.journal.map((entry) => (
          <Item key={entry.id} title={entry.title} text={entry.text} />
        ))}
      </ul>
    </div>
  );
}

function Item({ title, text }: { title: string; text: string }) {
  return (
    <li className="rounded-xl border border-line bg-bg px-3 py-3">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
    </li>
  );
}

function Help() {
  return (
    <div className="text-sm leading-relaxed text-muted">
      <h2 className="font-display text-4xl text-fg">Controls</h2>
      <p className="mt-3">Move with W A S D or the stick. A moves you left on screen, D moves you right. Drag to look around.</p>
      <p className="mt-2">E or the prompt speaks, reads, or practises. Tab opens the ledger. C opens this page's cultivation notes. Esc pauses. When the morning's work is done, the four wait in the courtyard. The day ends when the hall is locked. After that, sleep in the residence if you want Friday. Closing the game does not pass the night.</p>
      <p className="mt-2">In a spar: J light, K heavy, Space dodge, hold F to guard. Ren has a rhythm. Seeing it is not the same as being in time with it.</p>
      <p className="mt-2">Closing the game does not age the house. You will return to this minute.</p>
    </div>
  );
}

function TouchControls() {
  const phase = useGame((s) => s.phase);
  const touch = useTouchLayout();
  if (!touch) return null;
  if (phase !== "play" && phase !== "flashback") return null;
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-4">
      <Stick />
      <div className="pointer-events-auto mb-2 flex flex-col gap-2">
        <button className={`${primary} min-w-24`} onClick={() => (runtime.edge.interact = true)}>
          Act
        </button>
      </div>
    </div>
  );
}

function Stick() {
  const ref = useRef<HTMLDivElement>(null);
  const knob = useRef<HTMLDivElement>(null);
  const set = (clientX: number, clientY: number, active: boolean) => {
    const el = ref.current;
    const dot = knob.current;
    if (!el || !dot) return;
    if (!active) {
      runtime.move.active = false;
      runtime.move.x = 0;
      runtime.move.y = 0;
      dot.style.transform = "translate(-50%, -50%)";
      return;
    }
    const rect = el.getBoundingClientRect();
    let x = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    let y = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    const len = Math.hypot(x, y) || 1;
    if (len > 1) {
      x /= len;
      y /= len;
    }
    runtime.move.active = true;
    runtime.move.x = x;
    runtime.move.y = -y;
    dot.style.transform = `translate(calc(-50% + ${x * 28}px), calc(-50% + ${y * 28}px))`;
  };
  return (
    <div
      ref={ref}
      className="pointer-events-auto relative size-28 rounded-full border border-line bg-surface/80"
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        set(event.clientX, event.clientY, true);
      }}
      onPointerMove={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) set(event.clientX, event.clientY, true);
      }}
      onPointerUp={() => set(0, 0, false)}
      onPointerCancel={() => set(0, 0, false)}
    >
      <div ref={knob} className="absolute top-1/2 left-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass" />
    </div>
  );
}

function useTouchLayout() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse), (max-width: 820px)");
    const go = () => setOn(media.matches);
    go();
    media.addEventListener("change", go);
    return () => media.removeEventListener("change", go);
  }, []);
  return on;
}
