import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SystemStatus } from "@/components/SystemStatus";
import { EmergencyButton } from "@/components/EmergencyButton";
import { useComplaints } from "@/hooks/useComplaints";
import { STATUSES, STATUS_META } from "@/lib/complaints";

export const Route = createFileRoute("/stats")({
  head: () => ({
    meta: [
      { title: "Galactic Statistics — Alien Complaint Portal" },
      {
        name: "description",
        content:
          "Official metrics on extraterrestrial grievances: complaint volume, satisfaction rate and infinite resolution times.",
      },
      { property: "og:title", content: "Galactic Statistics — ACP" },
      {
        property: "og:description",
        content: "Complaint volume, satisfaction (2.3%) and resolution time (∞).",
      },
    ],
  }),
  component: StatsPage,
});

const CHART_CATEGORIES = [
  "Humans",
  "WiFi",
  "Food",
  "Traffic",
  "Weather",
  "Gravity",
];

/** Counts up to a target value once on mount. */
function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return value;
}

function StatCard({
  label,
  target,
  suffix = "",
  decimals = 0,
  literal,
}: {
  label: string;
  target: number;
  suffix?: string;
  decimals?: number;
  literal?: string;
}) {
  const value = useCountUp(target);
  return (
    <div className="panel panel-hover scanlines p-6">
      <p className="label-mono">{label}</p>
      <p className="mt-3 font-display text-3xl text-primary glow-text">
        {literal ??
          `${value.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}${suffix}`}
      </p>
    </div>
  );
}

function StatsPage() {
  const { complaints } = useComplaints();

  const byCategory = useMemo(() => {
    const map: Record<string, number> = {};
    CHART_CATEGORIES.forEach((c) => (map[c] = 0));
    complaints.forEach((c) => {
      if (c.category in map) map[c.category] += 1;
    });
    // seed the chart with baseline archive volume so it never looks empty
    const baseline: Record<string, number> = {
      Humans: 41,
      WiFi: 33,
      Food: 24,
      Traffic: 19,
      Weather: 15,
      Gravity: 11,
    };
    return CHART_CATEGORIES.map((c) => ({
      category: c,
      count: baseline[c] + map[c] * 3,
    }));
  }, [complaints]);

  const max = Math.max(...byCategory.map((b) => b.count));

  const statusCounts = useMemo(() => {
    const map: Record<string, number> = {};
    STATUSES.forEach((s) => (map[s] = 0));
    complaints.forEach((c) => (map[c.status] += 1));
    return map;
  }, [complaints]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <p className="label-mono">Bureau of Statistical Denial</p>
      <h1 className="mt-2 text-3xl text-foreground sm:text-4xl">
        GALACTIC <span className="text-primary glow-text">STATISTICS</span>
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Figures verified by nobody and audited never. Live registry volume:{" "}
        {complaints.length} complaints.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Complaints" target={1337 + complaints.length} />
        <StatCard label="Aliens Helped" target={42} />
        <StatCard label="Complaints About Humans" target={87} suffix="%" />
        <StatCard label="Galactic Satisfaction" target={2.3} suffix="%" decimals={1} />
        <StatCard label="Average Resolution Time" target={0} literal="∞ years" />
        <StatCard label="Open Investigations" target={statusCounts["UNDER INVESTIGATION"] ?? 0} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="panel p-6 lg:col-span-2">
          <p className="label-mono">Complaints by Category</p>
          <ul className="mt-6 space-y-4">
            {byCategory.map((b, i) => (
              <li key={b.category}>
                <div className="flex items-center justify-between gap-3">
                  <span className="min-w-0 truncate text-sm text-foreground">
                    {b.category}
                  </span>
                  <span className="label-mono shrink-0">{b.count}</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-sm bg-secondary/50">
                  <div
                    className={`h-full rounded-sm transition-[width] duration-1000 ease-out ${
                      i % 2 === 0
                        ? "bg-primary shadow-[0_0_14px_var(--glow)]"
                        : "bg-status-forwarded"
                    }`}
                    style={{ width: `${(b.count / max) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="panel p-6">
            <p className="label-mono">Registry by Status</p>
            <ul className="mt-4 space-y-3">
              {STATUSES.map((s) => (
                <li key={s} className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex min-w-0 items-center gap-2">
                    <span className={`size-2 shrink-0 rounded-full ${STATUS_META[s].dot}`} />
                    <span className="truncate text-muted-foreground">{s}</span>
                  </span>
                  <span className="shrink-0 font-display text-sm text-foreground">
                    {statusCounts[s]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <SystemStatus />
        </div>
      </div>

      <div className="panel mt-6 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-sm text-foreground">
            Statistical anomaly detected?
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Escalate directly to the Department of Intergalactic Minor
            Inconveniences.
          </p>
        </div>
        <EmergencyButton />
      </div>
    </div>
  );
}
