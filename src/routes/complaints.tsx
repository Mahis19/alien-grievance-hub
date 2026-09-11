import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ComplaintCard } from "@/components/ComplaintCard";
import { useComplaints } from "@/hooks/useComplaints";
import { CATEGORIES, STATUSES, type ComplaintStatus } from "@/lib/complaints";

export const Route = createFileRoute("/complaints")({
  head: () => ({
    meta: [
      { title: "Galactic Complaints Registry — Alien Complaint Portal" },
      {
        name: "description",
        content:
          "Browse, search and filter every extraterrestrial complaint logged against planet Earth.",
      },
      { property: "og:title", content: "Galactic Complaints Registry" },
      {
        property: "og:description",
        content: "Every alien grievance filed against Earth, in one registry.",
      },
    ],
  }),
  component: ComplaintsPage,
});

const FILTERS: { label: string; match: ComplaintStatus[] | null }[] = [
  { label: "All", match: null },
  { label: "Received", match: ["RECEIVED"] },
  { label: "Investigating", match: ["UNDER INVESTIGATION"] },
  { label: "Forwarded", match: ["FORWARDED TO GALACTIC COUNCIL"] },
  { label: "Resolved", match: ["SOMEHOW RESOLVED"] },
  { label: "Human Error", match: ["HUMAN ERROR"] },
];

function ComplaintsPage() {
  const { complaints, loading } = useComplaints();
  const [filter, setFilter] = useState("All");
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const active = FILTERS.find((f) => f.label === filter)?.match ?? null;
    const q = query.trim().toLowerCase();
    return complaints.filter((c) => {
      if (active && !active.includes(c.status)) return false;
      if (category !== "All" && c.category !== category) return false;
      if (!q) return true;
      return [c.id, c.alienName, c.planet, c.category, c.title, c.description]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [complaints, filter, category, query]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    STATUSES.forEach((s) => (map[s] = 0));
    complaints.forEach((c) => (map[c.status] = (map[c.status] ?? 0) + 1));
    return map;
  }, [complaints]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <p className="label-mono">Registry / Form 12-C</p>
      <h1 className="mt-2 text-3xl text-foreground sm:text-4xl">
        GALACTIC <span className="text-primary glow-text">COMPLAINTS</span>
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        {complaints.length} grievances currently orbiting the appropriate
        department. None of them are being handled.
      </p>

      {/* Controls */}
      <div className="panel mt-8 p-5">
        <label className="label-mono" htmlFor="acp-search">
          Search
        </label>
        <input
          id="acp-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search complaints across the universe..."
          className="mt-2 w-full rounded-md border border-input bg-background/70 px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:shadow-[0_0_15px_var(--glow)]"
        />

        <div className="mt-5 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.label}
              type="button"
              onClick={() => setFilter(f.label)}
              className={`rounded-md border px-3 py-2 font-display text-[0.65rem] tracking-widest uppercase transition ${
                filter === f.label
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:text-primary"
              }`}
            >
              {f.label}
              {f.match ? ` (${f.match.reduce((n, s) => n + (counts[s] ?? 0), 0)})` : ` (${complaints.length})`}
            </button>
          ))}
        </div>

        <div className="mt-5">
          <label className="label-mono" htmlFor="acp-category">
            Category filter
          </label>
          <select
            id="acp-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 w-full rounded-md border border-input bg-background/70 px-4 py-3 text-foreground outline-none focus:border-primary sm:max-w-xs"
          >
            <option value="All">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <p className="label-mono mt-10">Decrypting transmissions...</p>
      ) : filtered.length === 0 ? (
        <div className="panel mt-8 p-10 text-center">
          <p className="font-display text-lg text-foreground">
            No complaints match this dimension.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try widening your search radius by several galaxies.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((c) => (
            <ComplaintCard key={c.id} complaint={c} />
          ))}
        </div>
      )}
    </div>
  );
}
