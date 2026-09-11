import { useMemo } from "react";

/** Subtle animated star/particle backdrop. Purely decorative. */
export function StarField({ count = 60 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
        green: Math.random() > 0.75,
      })),
    [count],
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {stars.map((s) => (
        <span
          key={s.id}
          className={`animate-twinkle absolute rounded-full ${
            s.green ? "bg-primary" : "bg-foreground"
          }`}
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
