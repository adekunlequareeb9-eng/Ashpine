import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [App, setApp] = useState<ComponentType | null>(null);

  useEffect(() => {
    let live = true;
    void import("@/game/GameApp").then((mod) => {
      if (live) setApp(() => mod.GameApp);
    });
    return () => {
      live = false;
    };
  }, []);

  if (!App) {
    return (
      <main className="grid h-screen place-items-center bg-bg px-6 text-fg">
        <div className="text-center">
          <p className="text-xs tracking-[0.28em] text-brass uppercase">Lantern Ward</p>
          <h1 className="mt-2 font-display text-6xl font-medium">Ashpine</h1>
          <p className="mt-3 text-sm text-muted">The yard is waking.</p>
        </div>
      </main>
    );
  }

  return <App />;
}
