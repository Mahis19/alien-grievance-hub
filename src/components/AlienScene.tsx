/** Pure-CSS illustration: a frustrated green alien at a terminal. */
export function AlienScene() {
  return (
    <div className="relative mx-auto w-full max-w-sm" aria-hidden="true">
      <div className="absolute -top-6 right-2 animate-float">
        <div className="relative">
          <div className="h-3 w-20 rounded-full bg-secondary shadow-[0_0_18px_var(--glow)]" />
          <div className="mx-auto -mt-3 h-6 w-10 rounded-t-full border border-primary/60 bg-primary/20" />
        </div>
      </div>

      <div className="panel scanlines relative overflow-hidden p-8 pb-0">
        {/* alien */}
        <div className="relative mx-auto w-40">
          {/* head */}
          <div className="relative mx-auto h-24 w-32 rounded-[50%_50%_46%_46%/60%_60%_40%_40%] bg-primary/80 shadow-[0_0_28px_var(--glow)]">
            <span className="absolute top-3 left-3 h-2 w-6 -rotate-12 rounded-full bg-secondary/70" />
            <span className="absolute top-3 right-3 h-2 w-6 rotate-12 rounded-full bg-secondary/70" />
            <span className="absolute top-8 left-5 h-7 w-9 rotate-12 rounded-[50%] bg-background" />
            <span className="absolute top-8 right-5 h-7 w-9 -rotate-12 rounded-[50%] bg-background" />
            <span className="absolute bottom-4 left-1/2 h-1.5 w-8 -translate-x-1/2 rounded-full bg-background/80" />
            {/* antennae */}
            <span className="absolute -top-5 left-6 h-5 w-0.5 rotate-[-20deg] bg-primary/80" />
            <span className="absolute -top-7 left-4 size-2 rounded-full bg-primary shadow-[0_0_12px_var(--glow)]" />
            <span className="absolute -top-5 right-6 h-5 w-0.5 rotate-[20deg] bg-primary/80" />
            <span className="absolute -top-7 right-4 size-2 rounded-full bg-primary shadow-[0_0_12px_var(--glow)]" />
          </div>
          {/* body */}
          <div className="mx-auto -mt-2 h-14 w-20 rounded-t-2xl bg-primary/70" />
        </div>

        {/* monitor */}
        <div className="relative -mt-8 rounded-t-md border border-primary/50 bg-background/90 p-3">
          <div className="space-y-2">
            <div className="h-1.5 w-3/4 rounded-full bg-primary/70" />
            <div className="h-1.5 w-1/2 rounded-full bg-muted-foreground/50" />
            <div className="h-1.5 w-2/3 rounded-full bg-muted-foreground/40" />
            <div className="h-1.5 w-1/3 rounded-full bg-status-error/70" />
          </div>
          <p className="label-mono mt-3 text-primary">
            ERR: HUMAN_SUPPORT_NOT_FOUND
          </p>
        </div>
      </div>
      <div className="mx-auto h-2 w-2/3 rounded-b-lg bg-secondary/70" />
    </div>
  );
}
