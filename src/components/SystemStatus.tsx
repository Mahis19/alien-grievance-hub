const ITEMS = [
  { label: "Alien Database", state: "ok" },
  { label: "UFO Communication", state: "ok" },
  { label: "Human Cooperation", state: "warn" },
  { label: "Common Sense", state: "down" },
] as const;

const DOT: Record<string, string> = {
  ok: "bg-status-resolved",
  warn: "bg-status-received",
  down: "bg-status-error",
};

/** Fake infrastructure status board. */
export function SystemStatus() {
  return (
    <div className="panel p-5">
      <p className="label-mono">System Status</p>
      <ul className="mt-4 space-y-3">
        {ITEMS.map((i) => (
          <li
            key={i.label}
            className="flex items-center justify-between gap-3 border-b border-border/50 pb-2 text-sm last:border-0 last:pb-0"
          >
            <span className="min-w-0 truncate text-foreground">{i.label}</span>
            <span className="flex shrink-0 items-center gap-2">
              <span className={`size-2 rounded-full ${DOT[i.state]}`} />
              <span className="label-mono">
                {i.state === "ok"
                  ? "Nominal"
                  : i.state === "warn"
                    ? "Degraded"
                    : "Offline"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
