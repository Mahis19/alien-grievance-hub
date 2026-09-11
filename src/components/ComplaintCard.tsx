import { Link } from "@tanstack/react-router";
import { STATUS_META, formatDate, type Complaint } from "@/lib/complaints";

const PRIORITY_CLASS: Record<string, string> = {
  LOW: "text-muted-foreground border-border",
  MEDIUM: "text-status-received border-status-received/40",
  HIGH: "text-status-error border-status-error/40",
  "GALAXY-ENDING": "text-primary border-primary/50",
};

export function StatusBadge({ status }: { status: Complaint["status"] }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1 font-mono text-[0.65rem] tracking-widest uppercase ${meta.badge} ${meta.text}`}
    >
      <span className={`size-1.5 rounded-full ${meta.dot}`} />
      {status}
    </span>
  );
}

export function ComplaintCard({ complaint: c }: { complaint: Complaint }) {
  return (
    <article className="panel panel-hover scanlines flex flex-col gap-4 p-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <p className="label-mono text-primary">{c.id}</p>
          <h3 className="mt-1 text-base leading-snug text-foreground">
            {c.title}
          </h3>
        </div>
        <span
          className={`shrink-0 rounded-md border px-2 py-1 font-mono text-[0.6rem] tracking-widest uppercase ${
            PRIORITY_CLASS[c.priority] ?? "text-muted-foreground border-border"
          }`}
        >
          {c.priority}
        </span>
      </div>

      <p className="line-clamp-3 text-sm text-muted-foreground">{c.description}</p>

      <dl className="grid grid-cols-2 gap-3 border-t border-border/60 pt-3 text-sm">
        <div className="min-w-0">
          <dt className="label-mono">Filed by</dt>
          <dd className="truncate text-foreground">{c.alienName}</dd>
        </div>
        <div className="min-w-0">
          <dt className="label-mono">Origin</dt>
          <dd className="truncate text-foreground">{c.planet}</dd>
        </div>
        <div className="min-w-0">
          <dt className="label-mono">Category</dt>
          <dd className="truncate text-foreground">{c.category}</dd>
        </div>
        <div className="min-w-0">
          <dt className="label-mono">Logged</dt>
          <dd className="truncate text-foreground">{formatDate(c.createdAt)}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <StatusBadge status={c.status} />
        <Link
          to="/track"
          search={{ id: c.id }}
          className="label-mono hover:text-primary"
        >
          Track →
        </Link>
      </div>
    </article>
  );
}
