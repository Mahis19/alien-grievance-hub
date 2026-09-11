import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AlienScene } from "@/components/AlienScene";
import { RadarScanner } from "@/components/RadarScanner";
import { SystemStatus } from "@/components/SystemStatus";
import { ComplaintCard } from "@/components/ComplaintCard";
import { useComplaints } from "@/hooks/useComplaints";
import { OFFICIAL_NONSENSE, USELESS_COMPLAINTS } from "@/lib/complaints";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alien Complaint Portal 👽 — File an Off-World Grievance" },
      {
        name: "description",
        content:
          "The official-looking complaint portal for aliens living on Earth. File a grievance, track it, and wait 3–500 business years.",
      },
      { property: "og:title", content: "Alien Complaint Portal 👽" },
      {
        property: "og:description",
        content: "Because even extraterrestrials deserve customer support.",
      },
    ],
  }),
  component: Index,
});

const MARQUEE = [
  "TRANSMISSION RECEIVED FROM PLANET ZORP...",
  "HUMAN AFFAIRS DEPARTMENT HAS BEEN NOTIFIED",
  "RESOLUTION DELAYED DUE TO MERCURY BEING IN RETROGRADE",
  "COMPLAINT FORWARDED TO PLANETARY GRIEVANCE MANAGEMENT",
];

function Index() {
  const { complaints } = useComplaints();
  const [useless, setUseless] = useState(USELESS_COMPLAINTS[0]);
  const [score, setScore] = useState(97);

  const recent = complaints.slice(0, 3);
  const marqueeText = useMemo(() => MARQUEE.join("   ///   "), []);

  function generate() {
    const pick =
      USELESS_COMPLAINTS[Math.floor(Math.random() * USELESS_COMPLAINTS.length)];
    setUseless(pick);
    setScore(Math.floor(88 + Math.random() * 12));
  }

  return (
    <div>
      {/* Marquee */}
      <div className="overflow-hidden border-b border-border bg-secondary/25 py-2">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          <span className="label-mono text-primary">{marqueeText}</span>
          <span className="label-mono text-primary">{marqueeText}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="hero-bg scanlines relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-md border border-primary/50 bg-primary/10 px-3 py-1.5">
              <span className="size-2 animate-pulse rounded-full bg-primary" />
              <span className="label-mono text-primary">
                Earth Operations: Active
              </span>
            </span>

            <h1 className="mt-6 text-4xl leading-[1.05] font-black text-foreground sm:text-5xl xl:text-6xl">
              ALIEN
              <br />
              <span className="text-primary glow-text">COMPLAINT</span>
              <br />
              PORTAL
            </h1>

            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Because even extraterrestrials deserve customer support.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/file-complaint"
                className="rounded-md bg-primary px-6 py-3.5 text-center font-display text-xs tracking-widest text-primary-foreground uppercase transition hover:shadow-[0_0_24px_var(--glow)]"
              >
                File a Complaint
              </Link>
              <Link
                to="/complaints"
                className="rounded-md border border-primary/50 px-6 py-3.5 text-center font-display text-xs tracking-widest text-primary uppercase transition hover:bg-primary/10 hover:shadow-[0_0_18px_var(--glow)]"
              >
                View Galactic Complaints
              </Link>
            </div>

            <p className="label-mono mt-6">
              Officially recognized by absolutely nobody.
            </p>
          </div>

          <div className="lg:pl-8">
            <AlienScene />
          </div>
        </div>
      </section>

      {/* Complaint of the day + status */}
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 lg:grid-cols-3 lg:px-8">
        <div className="panel scanlines p-6 lg:col-span-2">
          <p className="label-mono">🏆 Complaint of the Day</p>
          <h2 className="mt-3 text-2xl leading-snug text-foreground">
            "{useless}"
          </h2>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <div className="min-w-[10rem] flex-1">
              <div className="flex items-center justify-between">
                <span className="label-mono">Uselessness score</span>
                <span className="font-display text-sm text-primary">
                  {score}%
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary/50">
                <div
                  className="h-full rounded-full bg-primary shadow-[0_0_12px_var(--glow)] transition-all duration-700"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={generate}
              className="rounded-md border border-primary/50 px-5 py-3 font-display text-[0.7rem] tracking-widest text-primary uppercase transition hover:bg-primary/10"
            >
              Generate Useless Complaint
            </button>
          </div>
          <p className="mt-5 border-t border-border/60 pt-4 text-sm text-muted-foreground">
            {OFFICIAL_NONSENSE[score % OFFICIAL_NONSENSE.length]}
          </p>
        </div>

        <div className="grid gap-6">
          <RadarScanner />
          <SystemStatus />
        </div>
      </section>

      {/* Recent filings */}
      <section className="mx-auto max-w-7xl px-4 pb-6 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <p className="label-mono">Live from the grievance uplink</p>
            <h2 className="mt-1 text-2xl text-foreground">Recent Filings</h2>
          </div>
          <Link to="/complaints" className="label-mono shrink-0 hover:text-primary">
            View all →
          </Link>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {recent.map((c) => (
            <ComplaintCard key={c.id} complaint={c} />
          ))}
        </div>
      </section>
    </div>
  );
}
