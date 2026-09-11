import { useEffect, useState } from "react";

/** Shows a nagging notification after 20 seconds of inactivity. */
export function IdleNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const reset = () => {
      setVisible(false);
      clearTimeout(timer);
      timer = setTimeout(() => setVisible(true), 20000);
    };

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();

    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="panel animate-fade-in fixed right-4 bottom-4 z-40 max-w-[19rem] p-4">
      <p className="label-mono text-primary">Incoming transmission</p>
      <p className="mt-2 text-sm text-foreground">
        👽 Are you still there? Your complaint is probably still unresolved.
      </p>
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="label-mono mt-3 hover:text-primary"
      >
        Dismiss
      </button>
    </div>
  );
}
