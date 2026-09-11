import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { StatusBadge } from "@/components/ComplaintCard";
import {
  complaintStore,
  formatDate,
  OFFICIAL_NONSENSE,
  type Complaint,
} from "@/lib/complaints";

export const Route = createFileRoute("/track")({
  validateSearch: z.object({ id: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Track a Complaint — Alien Complaint Portal" },
      {
        name: "description",
        content:
          "Enter your complaint reference to follow its journey through the Galactic Council bureaucracy.",
      },
      { property: "og:title", content: "Track a Complaint — ACP" },
      {
        property: "og:description",
        content: "Follow your grievance through intergalactic bureaucracy.",
      },
    ],
  }),
  component: TrackPage,
});

const STEPS = [
  "COMPLAINT SUBMITTED",
  "EARTH SUPPORT RECEIVED IT",
  "HUMAN DEPARTMENT NOTIFIED",
  "GALACTIC COUNCIL CONTACTED",
];

function TrackPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [value, setValue] = useState(search.id ?? "");
  const [result, setResult] = useState<Complaint | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!search.id) return;
    setValue(search.id);
    void lookup(search.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.id]);

  async function lookup(id: string) {
    const found = await complaintStore.get(id);
    setResult(found ?? null);
    setNotFound(!found);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <p className="label-mono">Form 9-D / Grievance Tracking</p>
      <h1 className="mt-2 text-3xl text-foreground sm:text-4xl">
        TRACK <span className="text-primary glow-text">COMPLAINT</span>
      </h1>
      <p className="mt-3 text-muted-foreground">
        Enter your complaint reference. Progress is not guaranteed, implied, or
        likely.
      </p>

      <form
        className="panel mt-8 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/track", search: { id: value.trim() } });
          void lookup(value);
        }}
      >
        <label className="label-mono" htmlFor="acp-id">
          Enter Complaint ID
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input
            id="acp-id"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="ALN-2026-48291"
            className="w-full min-w-0 rounded-md border border-input bg-background/70 px-4 py-3 font-mono text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:shadow-[0_0_15px_var(--glow)]"
          />
          <button
            type="submit"
            className="shrink-0 rounded-md bg-primary px-6 py-3 font-display text-xs tracking-widest text-primary-foreground uppercase transition hover:shadow-[0_0_20px_var(--glow)]"
          >
            Trace
          </button>
        </div>
      </form>

      {notFound && !result && (
        <div className="panel mt-6 border-destructive/40 p-8 text-center">
          <p className="font-display text-lg text-destructive-foreground">
            Complaint not found in this dimension.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Verify the reference or try an adjacent timeline.
          </p>
        </div>
      )}

      {result && (
        <div className="panel scanlines animate-fade-in mt-6 p-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
            <div className="min-w-0">
              <p className="label-mono text-primary">{result.id}</p>
              <h2 className="mt-1 text-xl leading-snug text-foreground">
                {result.title}
              </h2>
              <p className="label-mono mt-2">
                {result.alienName} · {result.planet} · {formatDate(result.createdAt)}
              </p>
            </div>
            <span className="shrink-0">
              <StatusBadge status={result.status} />
            </span>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">{result.description}</p>

          <ol className="mt-8 space-y-0">
            {[...STEPS, `CURRENT STATUS: ${result.status}`].map((step, i, arr) => (
              <li key={step} className="relative flex gap-4 pb-8 last:pb-0">
                {i < arr.length - 1 && (
                  <span className="absolute top-6 left-[11px] h-full w-px bg-primary/30" />
                )}
                <span
                  className={`relative z-10 mt-1 size-6 shrink-0 rounded-full border ${
                    i === arr.length - 1
                      ? "border-primary bg-primary shadow-[0_0_16px_var(--glow)]"
                      : "border-primary/60 bg-background"
                  }`}
                />
                <div className="min-w-0">
                  <p className="font-display text-xs tracking-widest text-foreground uppercase">
                    {step}
                  </p>
                  <p className="label-mono mt-1">
                    {OFFICIAL_NONSENSE[i % OFFICIAL_NONSENSE.length]}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {result.evidence && (
            <div className="mt-4 overflow-hidden rounded-md border border-primary/40">
              <img
                src={result.evidence}
                alt={`Evidence attached to complaint ${result.id}`}
                className="max-h-72 w-full object-contain"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
