import { useState } from "react";

/** Suspicious emergency escalation button + confirmation modal. */
export function EmergencyButton({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [escalated, setEscalated] = useState(false);

  function close() {
    setOpen(false);
    setEscalated(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`animate-pulse-ring inline-flex items-center justify-center gap-2 rounded-md border border-destructive/60 bg-destructive/15 px-4 py-3 font-display text-xs tracking-widest text-destructive-foreground uppercase transition hover:bg-destructive/30 ${className}`}
      >
        🚨 Emergency: Contact Galactic Support
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Emergency escalation"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 px-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="panel scanlines animate-scale-in w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {!escalated ? (
              <>
                <p className="label-mono">Form 7-B / Emergency Protocol</p>
                <h3 className="mt-2 text-xl text-foreground">
                  Are you absolutely sure?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  False emergencies are punishable under the Galactic
                  Constitution, Article 12, Subsection "Don't".
                </p>
                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEscalated(true)}
                    className="flex-1 rounded-md bg-primary px-4 py-2.5 font-display text-xs tracking-widest text-primary-foreground uppercase transition hover:shadow-[0_0_18px_var(--glow)]"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    className="flex-1 rounded-md border border-border px-4 py-2.5 font-display text-xs tracking-widest text-foreground uppercase transition hover:bg-secondary/40"
                  >
                    No
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="label-mono text-primary">Escalation confirmed</p>
                <h3 className="mt-2 text-lg text-foreground">
                  Please remain calm.
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Your emergency has been escalated to:
                </p>
                <p className="mt-1 font-display text-sm text-primary glow-text">
                  Department of Intergalactic Minor Inconveniences
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Estimated response time:
                </p>
                <p className="font-display text-2xl text-foreground">47 years</p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-6 w-full rounded-md border border-border px-4 py-2.5 font-display text-xs tracking-widest uppercase transition hover:bg-secondary/40"
                >
                  Acknowledge
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
