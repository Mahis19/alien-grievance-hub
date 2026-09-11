import { useMemo } from "react";

interface Blip {
  id: number;
  top: number;
  left: number;
  delay: number;
  label?: string;
}

/** Pure-CSS radar sweep with detected "alien activity" blips. */
export function RadarScanner() {
  const blips = useMemo<Blip[]>(
    () => [
      { id: 1, top: 22, left: 64, delay: 0.4, label: "UFO-7" },
      { id: 2, top: 58, left: 30, delay: 1.6 },
      { id: 3, top: 70, left: 72, delay: 2.5 },
      { id: 4, top: 38, left: 44, delay: 3.2 },
    ],
    [],
  );

  return (
    <div className="panel scanlines p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="label-mono">Orbital Radar</p>
        <span className="flex items-center gap-2">
          <span className="size-2 animate-pulse rounded-full bg-primary" />
          <span className="label-mono text-primary">Scanning…</span>
        </span>
      </div>

      <div className="relative mx-auto mt-5 aspect-square w-full max-w-64 overflow-hidden rounded-full border border-primary/40 bg-background/60 shadow-[inset_0_0_40px_var(--glow)]">
        {/* range rings */}
        <span className="absolute inset-[16%] rounded-full border border-primary/25" />
        <span className="absolute inset-[33%] rounded-full border border-primary/25" />
        <span className="absolute inset-1/2 -translate-1/2 size-1 rounded-full bg-primary" />
        {/* crosshairs */}
        <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-primary/20" />
        <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-primary/20" />

        {/* sweep */}
        <span
          className="animate-radar-sweep absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, var(--glow) 0deg, transparent 70deg)",
          }}
        />

        {/* blips */}
        {blips.map((b) => (
          <span
            key={b.id}
            className="animate-blip absolute"
            style={{
              top: `${b.top}%`,
              left: `${b.left}%`,
              animationDelay: `${b.delay}s`,
            }}
          >
            <span className="block size-2 rounded-full bg-primary shadow-[0_0_10px_var(--glow)]" />
            {b.label && (
              <span className="label-mono absolute top-3 left-0 -translate-x-1/3 text-primary">
                {b.label}
              </span>
            )}
          </span>
        ))}
      </div>

      <p className="label-mono mt-4 text-center">
        4 anomalies detected · 0 investigated
      </p>
    </div>
  );
}
